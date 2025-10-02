/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Price` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `item_price` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `items_count` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payable_price` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_discounts` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Cart" ADD COLUMN     "item_price" INTEGER NOT NULL,
ADD COLUMN     "items_count" INTEGER NOT NULL,
ADD COLUMN     "payable_price" INTEGER NOT NULL,
ADD COLUMN     "total_discounts" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Price" ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."CartItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "item_discount" INTEGER NOT NULL,
    "item_price" INTEGER NOT NULL,
    "payable_price" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Price_productId_key" ON "public"."Price"("productId");

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "public"."Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Price" ADD CONSTRAINT "Price_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
