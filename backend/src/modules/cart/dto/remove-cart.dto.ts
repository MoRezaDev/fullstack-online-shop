import { ApiProperty } from "@nestjs/swagger";

export class RemoveCartDto {

    @ApiProperty({example: '395u3sdfsd',required: true})
    cartId: string

    @ApiProperty({example: '395u3sdfsd',required: true})
    itemId: string
}