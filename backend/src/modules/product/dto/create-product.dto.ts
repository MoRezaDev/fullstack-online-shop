
export class CreateProductDto {
  
    name : string
    description : string
    images? : string[]
    main_image :  string
    category_brand_url? : string

    title : string
    url : string
    categoryId : string

    brandId : string

    rate? : number
   
    
    // seo Seo?

    // colors Color[]
    
    // seller Seller[]

    // main_specs SpecAttrib[]
    // specifications Specification[]

    // commments_count Int @default(0)
    // comments Comment[]
    

    // orderItems OrderItem[]
  
}
