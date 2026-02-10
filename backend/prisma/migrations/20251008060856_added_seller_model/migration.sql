/*
  Warnings:

  - A unique constraint covering the columns `[seoId]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[seoId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_code]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[seoId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_code` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Brand" ADD COLUMN     "seoId" TEXT;

-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "seoId" TEXT;

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "avg_rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "badges" TEXT[],
ADD COLUMN     "images_url" TEXT[],
ADD COLUMN     "main_image_url" TEXT,
ADD COLUMN     "product_code" INTEGER NOT NULL,
ADD COLUMN     "rating_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "seoId" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "is_user_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."Warehouse" ADD COLUMN     "incredible_expire_date" TIMESTAMP(3),
ADD COLUMN     "incredible_sell_precentage" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "incredible_selled_quantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "incredible_total_quantity" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."Color" (
    "id" SERIAL NOT NULL,
    "hex_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Comment" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "text" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "is_buyer" BOOLEAN NOT NULL DEFAULT false,
    "pros" TEXT[],
    "cons" TEXT[],
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BuyerDetail" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "BuyerDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductRating" (
    "id" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Seller" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_fa" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Seo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" TEXT[],
    "slug" TEXT NOT NULL,
    "canonical" TEXT,
    "image" TEXT,
    "og_title" TEXT,
    "og_description" TEXT,
    "og_image" TEXT,
    "twitter_title" TEXT,
    "twitter_description" TEXT,
    "twitter_image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

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
CREATE TABLE "public"."Attribute" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "value" TEXT[],
    "specificationId" TEXT,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MainSpecification" (
    "id" TEXT NOT NULL,
    "attribiuteId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "MainSpecification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_BrandToSeller" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BrandToSeller_AB_pkey" PRIMARY KEY ("A","B")
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
CREATE UNIQUE INDEX "BuyerDetail_orderId_key" ON "public"."BuyerDetail"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "BuyerDetail_commentId_key" ON "public"."BuyerDetail"("commentId");

-- CreateIndex
CREATE UNIQUE INDEX "Seo_slug_key" ON "public"."Seo"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MainSpecification_attribiuteId_key" ON "public"."MainSpecification"("attribiuteId");

-- CreateIndex
CREATE UNIQUE INDEX "MainSpecification_productId_key" ON "public"."MainSpecification"("productId");

-- CreateIndex
CREATE INDEX "_BrandToSeller_B_index" ON "public"."_BrandToSeller"("B");

-- CreateIndex
CREATE INDEX "_ColorToProduct_B_index" ON "public"."_ColorToProduct"("B");

-- CreateIndex
CREATE INDEX "_ProductToSeller_B_index" ON "public"."_ProductToSeller"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_seoId_key" ON "public"."Brand"("seoId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_seoId_key" ON "public"."Category"("seoId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_product_code_key" ON "public"."Product"("product_code");

-- CreateIndex
CREATE UNIQUE INDEX "Product_seoId_key" ON "public"."Product"("seoId");

-- AddForeignKey
ALTER TABLE "public"."Brand" ADD CONSTRAINT "Brand_seoId_fkey" FOREIGN KEY ("seoId") REFERENCES "public"."Seo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_seoId_fkey" FOREIGN KEY ("seoId") REFERENCES "public"."Seo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BuyerDetail" ADD CONSTRAINT "BuyerDetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BuyerDetail" ADD CONSTRAINT "BuyerDetail_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "public"."Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_seoId_fkey" FOREIGN KEY ("seoId") REFERENCES "public"."Seo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductRating" ADD CONSTRAINT "ProductRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductRating" ADD CONSTRAINT "ProductRating_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Specification" ADD CONSTRAINT "Specification_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attribute" ADD CONSTRAINT "Attribute_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "public"."Specification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MainSpecification" ADD CONSTRAINT "MainSpecification_attribiuteId_fkey" FOREIGN KEY ("attribiuteId") REFERENCES "public"."Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MainSpecification" ADD CONSTRAINT "MainSpecification_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BrandToSeller" ADD CONSTRAINT "_BrandToSeller_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BrandToSeller" ADD CONSTRAINT "_BrandToSeller_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ColorToProduct" ADD CONSTRAINT "_ColorToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ColorToProduct" ADD CONSTRAINT "_ColorToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductToSeller" ADD CONSTRAINT "_ProductToSeller_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductToSeller" ADD CONSTRAINT "_ProductToSeller_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;
