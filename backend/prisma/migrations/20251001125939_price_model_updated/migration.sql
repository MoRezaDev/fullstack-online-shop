/*
  Warnings:

  - You are about to drop the column `item_discount` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `item_price` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `payable_price` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `CartItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[priceId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `priceId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CartItem" DROP COLUMN "item_discount",
DROP COLUMN "item_price",
DROP COLUMN "payable_price",
DROP COLUMN "quantity",
ADD COLUMN     "priceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_priceId_key" ON "public"."CartItem"("priceId");

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "public"."Price"("id") ON DELETE CASCADE ON UPDATE CASCADE;
