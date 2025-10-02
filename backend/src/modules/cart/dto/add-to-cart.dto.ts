import { ApiProperty } from "@nestjs/swagger";

export class AddToCartDto {
    @ApiProperty({example: "387462423fsfds",required: true})
    userId: string

    @ApiProperty({example: "389492fksdnfsdkf",required: true})
    productId: string

    @ApiProperty({example: "389492fksdnfsdkf",required: true})
    priceId: string

}