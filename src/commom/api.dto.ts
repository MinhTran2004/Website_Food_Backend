import { ApiProperty } from "@nestjs/swagger"

export class IFilterOptions {
    @ApiProperty({ type: Number, example: 1 })
    page: number

    @ApiProperty({ type: Number, example: 20 })
    pageSize: number
}