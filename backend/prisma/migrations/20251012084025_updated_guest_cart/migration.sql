/*
  Warnings:

  - You are about to drop the column `guestCartId` on the `CartItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_guestCartId_fkey";

-- AlterTable
ALTER TABLE "public"."CartItem" DROP COLUMN "guestCartId";

-- CreateTable
CREATE TABLE "public"."GuestCartItem" (
    "id" TEXT NOT NULL,
    "item_price" INTEGER NOT NULL,
    "selling_price" INTEGER NOT NULL,
    "item_discount" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "guestCartId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuestCartItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."GuestCartItem" ADD CONSTRAINT "GuestCartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GuestCartItem" ADD CONSTRAINT "GuestCartItem_guestCartId_fkey" FOREIGN KEY ("guestCartId") REFERENCES "public"."GuestCart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
