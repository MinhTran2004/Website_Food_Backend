import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
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

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

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

    await this.prisma.address.updateMany({
      data: { isDefault: false },
      where: {
        idUser: idUser,
      },
    });

    const addressNew = await this.prisma.address.create({ data: payload });

    return HTTP_RESPONSE.CREATED('en', addressNew);
  }

  async getAddressByDefault(
    user: IUserJWT,
  ): Promise<IResponse<IAddress | null>> {
    const { idUser } = user;

    if (!idUser)
      throw new NotFoundException(Errors.ITEM_NOT_FOUND('User is not found'));

    const address = await this.prisma.address.findFirst({
      where: {
        idUser: idUser,
        isDefault: true,
        isActive: true,
      },
    });

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
      this.prisma.address.findMany({
        where: { idUser: idUser, isActive: true },
        skip,
        take: pageSize,
        orderBy: [
          {
            isDefault: 'desc',
          },
          { createdAt: 'desc' },
        ],
      }),
      this.prisma.address.count({
        where: {
          isActive: true,
          idUser: idUser,
        },
      }),
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
    const { id, nameAddress, addressDetail, city, district, phone } = body;
    const { id: idAddres, ...data } = body;

    const { idUser } = user;

    if (
      !idAddres ||
      !nameAddress ||
      !addressDetail ||
      !city ||
      !district ||
      !phone
    )
      throw new BadRequestException(
        Errors.BAD_REQUEST(
          'nanameAddress, addressDetail, city, district, phone is required',
        ),
      );

    if (!idUser)
      throw new NotFoundException(Errors.ITEM_NOT_FOUND('User is not found'));

    if (body.isDefault === true) {
      await this.prisma.address.updateMany({
        data: {
          isDefault: false,
        },
        where: {
          idUser,
          NOT: { id: idAddres },
        },
      });
    }

    const address = await this.prisma.address.update({
      data: { ...data },
      where: { idUser, id:idAddres },
    });

    return HTTP_RESPONSE.OK('en', address);
  }

  async delete(id: string) {
    return await this.prisma.address.delete({ where: { id } });
  }
}
