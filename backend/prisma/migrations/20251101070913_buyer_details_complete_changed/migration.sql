/*
  Warnings:

  - You are about to drop the column `orderId` on the `BuyerDetail` table. All the data in the column will be lost.
  - Added the required column `productId` to the `BuyerDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerId` to the `BuyerDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."BuyerDetail" DROP CONSTRAINT "BuyerDetail_orderId_fkey";

-- DropIndex
DROP INDEX "public"."BuyerDetail_orderId_key";

-- AlterTable
ALTER TABLE "public"."BuyerDetail" DROP COLUMN "orderId",
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "sellerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."BuyerDetail" ADD CONSTRAINT "BuyerDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BuyerDetail" ADD CONSTRAINT "BuyerDetail_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;
