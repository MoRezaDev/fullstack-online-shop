/*
  Warnings:

  - Added the required column `guestCartId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CartItem" ADD COLUMN     "guestCartId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."GuestCart" (
    "id" TEXT NOT NULL,
    "selling_price" INTEGER NOT NULL DEFAULT 0,
    "total_discounts" INTEGER NOT NULL DEFAULT 0,
    "total_price" INTEGER NOT NULL DEFAULT 0,
    "items_count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuestCart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_guestCartId_fkey" FOREIGN KEY ("guestCartId") REFERENCES "public"."GuestCart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
