import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFilterOptions } from 'src/commom/api.dto';
import { HTTP_RESPONSE } from 'src/constants/api.constant';
import { IAddress } from 'src/model/address.module';
import { IResponse, IResponseListData } from 'src/model/api.model';
import { Errors } from 'src/model/error';
import { IUserJWT } from 'src/model/user.modal';
import {
  CreateAddressRequestDto,
  UpdateAddressRequestDto,
} from './dto/request.dto';
import { Address, AddressDocument } from './dto/schema.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private addressModel: Model<AddressDocument>,
  ) {}

  async create(
    body: CreateAddressRequestDto,
    user: IUserJWT,
  ): Promise<IResponse<IAddress | null>> {
    const { nameAddress, addressDetail, city, district, phone } = body;
    const { idUser } = user;

    if (!nameAddress || !addressDetail || !city || !district || !phone)
      throw new BadRequestException(
        Errors.BAD_REQUEST(
          ' nameAddress, addressDetail, city, district, phone is required',
        ),
      );

    if (!idUser)
      throw new NotFoundException(Errors.ITEM_NOT_FOUND('User is not found'));

    const payload = { idUser: idUser, ...body };

    await this.addressModel.updateMany(
      { idUser: idUser },
      { isDefault: false },
    );

    const addressNew = await this.addressModel.create(payload);

    if (!addressNew)
      throw new ConflictException(
        Errors.CONFLICT('Create address new is failed'),
      );

    return HTTP_RESPONSE.CREATED('en', addressNew);
  }

  async getAddressByDefault(
    user: IUserJWT,
  ): Promise<IResponse<IAddress | null>> {
    const { idUser } = user;

    if (!idUser)
      throw new NotFoundException(Errors.ITEM_NOT_FOUND('User is not found'));

    const address = await this.addressModel.findOne({
      idUser: idUser,
      isDefault: true,
      isActive: true,
    });

    if (!address)
      throw new BadRequestException(
        Errors.BAD_REQUEST('No addresses have a default status.'),
      );

    return HTTP_RESPONSE.OK('en', address);
  }

  async getListAddress(
    quey: IFilterOptions,
    user: IUserJWT,
  ): Promise<IResponseListData<IAddress | null>> {
    const { idUser } = user;

    const page = quey.page | 1;
    const pageSize = quey.pageSize | 20;
    const skip = (page - 1) * pageSize;

    if (!idUser)
      throw new BadRequestException(Errors.BAD_REQUEST('idUser is required'));

    const [items, total] = await Promise.all([
      this.addressModel
        .find({ idUser: idUser, isActive: true })
        .skip(skip)
        .limit(pageSize)
        .sort({ createAt: -1, default: -1 })
        .lean(),
      this.addressModel.countDocuments({ isActive: true }),
    ]);

    const totalPage = Math.ceil(total / pageSize);
    const nextPage = page < totalPage;
    const previousPage = page > 1;

    return HTTP_RESPONSE.OK('en', {
      items: items,
      pagination: {
        page,
        pageSize,
        total,
        totalPage,
        nextPage,
        previousPage,
      },
    });
  }

  async patch(
    body: UpdateAddressRequestDto,
    user: IUserJWT,
  ): Promise<IResponse<IAddress | null>> {
    const {
      _id,
      nameAddress,
      addressDetail,
      city,
      district,
      phone,
      isDefault,
    } = body;
    const { idUser } = user;

    if (
      !_id ||
      !nameAddress ||
      !addressDetail ||
      !city ||
      !district ||
      !phone ||
      !isDefault
    )
      throw new BadRequestException(
        Errors.BAD_REQUEST(
          'anameAddress, addressDetail, city, district, phone, isDefault is required',
        ),
      );

    if (!idUser)
      throw new NotFoundException(Errors.ITEM_NOT_FOUND('User is not found'));

    if (body.isDefault === true) {
      await this.addressModel.updateMany(
        { idUser: idUser },
        { isDefault: false },
      );
    }

    const address = await this.addressModel.findByIdAndUpdate(_id, body);

    return HTTP_RESPONSE.OK('en', address);
  }

  async delete(id: string) {
    return await this.addressModel.findByIdAndDelete(id);
  }
}
