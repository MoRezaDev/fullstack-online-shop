-- CreateEnum
CREATE TYPE "public"."Plan" AS ENUM ('one_month', 'three_month', 'one_year');

-- CreateTable
CREATE TABLE "public"."Delivery" (
    "id" TEXT NOT NULL,
    "delivery_date" TEXT NOT NULL,
    "delivery_status" TEXT NOT NULL,
    "is_delivered" BOOLEAN NOT NULL DEFAULT false,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Address" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zip_code" TEXT,
    "mobile" TEXT NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT,
    "full_name" TEXT NOT NULL,
    "map_images" TEXT[],
    "userId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Brand" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_fa" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image_url" TEXT,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Breadcrumb" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_fa" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "productId" TEXT,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Breadcrumb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cart" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_fa" TEXT NOT NULL,
    "parentId" TEXT,
    "parents" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Color" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "hex_code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Comment" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "advantages" TEXT[],
    "disadvantages" TEXT[],
    "created_at" TEXT NOT NULL,
    "is_buyer" BOOLEAN NOT NULL DEFAULT false,
    "rate" INTEGER,
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PurchasedItem" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT,
    "colorId" INTEGER,
    "commentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchasedItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommentReaction" (
    "id" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "dislikes" INTEGER NOT NULL DEFAULT 0,
    "commentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OpenGraph" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "seoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OpenGraph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,
    "order_number" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "is_user_paid" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "successful" BOOLEAN NOT NULL DEFAULT false,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Plus" (
    "id" TEXT NOT NULL,
    "is_activated" BOOLEAN NOT NULL DEFAULT false,
    "expire_date" TIMESTAMP(3),
    "plan" "public"."Plan",
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Price" (
    "id" TEXT NOT NULL,
    "discount_percent" INTEGER,
    "sold_percent" INTEGER,
    "actual_price" INTEGER NOT NULL,
    "selling_price" INTEGER NOT NULL,
    "is_incredible" BOOLEAN NOT NULL DEFAULT false,
    "order_limit" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PriceDetails" (
    "id" TEXT NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "ship_cost" INTEGER NOT NULL DEFAULT 0,
    "final_amount" INTEGER NOT NULL,
    "user_paid" INTEGER NOT NULL DEFAULT 0,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "main_image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "commments_count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category_brand_url" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."productRating" (
    "id" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "count" INTEGER NOT NULL DEFAULT 0,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Seller" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "stars" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title_fa" TEXT NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Grade" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SellerProperties" (
    "id" TEXT NOT NULL,
    "is_trusted" BOOLEAN NOT NULL DEFAULT false,
    "is_new" BOOLEAN NOT NULL DEFAULT true,
    "is_official" BOOLEAN NOT NULL DEFAULT false,
    "sellerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SellerProperties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Seo" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "canonical_url" TEXT NOT NULL,
    "productId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Seo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Specification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Specification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SpecAttrib" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "values" TEXT[],
    "specificationId" TEXT,
    "productId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpecAttrib_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "full_name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_BrandToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BrandToCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_ColorToProduct" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ColorToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_ProductToSeller" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductToSeller_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_orderId_key" ON "public"."Delivery"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "public"."Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_orderId_key" ON "public"."Address"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_title_key" ON "public"."Brand"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "public"."Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchasedItem_commentId_key" ON "public"."PurchasedItem"("commentId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentReaction_commentId_key" ON "public"."CommentReaction"("commentId");

-- CreateIndex
CREATE UNIQUE INDEX "OpenGraph_seoId_key" ON "public"."OpenGraph"("seoId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_order_number_key" ON "public"."Order"("order_number");

-- CreateIndex
CREATE UNIQUE INDEX "Plus_userId_key" ON "public"."Plus"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PriceDetails_orderId_key" ON "public"."PriceDetails"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "public"."Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "productRating_productId_key" ON "public"."productRating"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Grade_sellerId_key" ON "public"."Grade"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "SellerProperties_sellerId_key" ON "public"."SellerProperties"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "Seo_productId_key" ON "public"."Seo"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "public"."User"("mobile");

-- CreateIndex
CREATE INDEX "_BrandToCategory_B_index" ON "public"."_BrandToCategory"("B");

-- CreateIndex
CREATE INDEX "_ColorToProduct_B_index" ON "public"."_ColorToProduct"("B");

-- CreateIndex
CREATE INDEX "_ProductToSeller_B_index" ON "public"."_ProductToSeller"("B");

-- AddForeignKey
ALTER TABLE "public"."Delivery" ADD CONSTRAINT "Delivery_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Breadcrumb" ADD CONSTRAINT "Breadcrumb_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Breadcrumb" ADD CONSTRAINT "Breadcrumb_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PurchasedItem" ADD CONSTRAINT "PurchasedItem_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PurchasedItem" ADD CONSTRAINT "PurchasedItem_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "public"."Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PurchasedItem" ADD CONSTRAINT "PurchasedItem_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommentReaction" ADD CONSTRAINT "CommentReaction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "public"."Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OpenGraph" ADD CONSTRAINT "OpenGraph_seoId_fkey" FOREIGN KEY ("seoId") REFERENCES "public"."Seo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Plus" ADD CONSTRAINT "Plus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PriceDetails" ADD CONSTRAINT "PriceDetails_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."productRating" ADD CONSTRAINT "productRating_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Grade" ADD CONSTRAINT "Grade_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SellerProperties" ADD CONSTRAINT "SellerProperties_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Seo" ADD CONSTRAINT "Seo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Specification" ADD CONSTRAINT "Specification_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SpecAttrib" ADD CONSTRAINT "SpecAttrib_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SpecAttrib" ADD CONSTRAINT "SpecAttrib_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "public"."Specification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BrandToCategory" ADD CONSTRAINT "_BrandToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BrandToCategory" ADD CONSTRAINT "_BrandToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ColorToProduct" ADD CONSTRAINT "_ColorToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ColorToProduct" ADD CONSTRAINT "_ColorToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductToSeller" ADD CONSTRAINT "_ProductToSeller_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductToSeller" ADD CONSTRAINT "_ProductToSeller_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;
