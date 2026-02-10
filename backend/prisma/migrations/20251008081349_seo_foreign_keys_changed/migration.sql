/*
  Warnings:

  - You are about to drop the column `seoId` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `seoId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `seoId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryId]` on the table `Seo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[brandId]` on the table `Seo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `Seo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Brand" DROP CONSTRAINT "Brand_seoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_seoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_seoId_fkey";

-- DropIndex
DROP INDEX "public"."Brand_seoId_key";

-- DropIndex
DROP INDEX "public"."Category_seoId_key";

-- DropIndex
DROP INDEX "public"."Product_seoId_key";

-- AlterTable
ALTER TABLE "public"."Brand" DROP COLUMN "seoId";

-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "seoId";

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "seoId";

-- AlterTable
ALTER TABLE "public"."Seo" ADD COLUMN     "brandId" TEXT,
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "productId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Seo_categoryId_key" ON "public"."Seo"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Seo_brandId_key" ON "public"."Seo"("brandId");

-- CreateIndex
CREATE UNIQUE INDEX "Seo_productId_key" ON "public"."Seo"("productId");

-- AddForeignKey
ALTER TABLE "public"."Seo" ADD CONSTRAINT "Seo_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Seo" ADD CONSTRAINT "Seo_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Seo" ADD CONSTRAINT "Seo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
