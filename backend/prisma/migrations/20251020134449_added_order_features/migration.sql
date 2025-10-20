/*
  Warnings:

  - A unique constraint covering the columns `[order_number]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_date` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_date` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_number` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selling_price` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_discounts` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "addressId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "delivery_date" TEXT NOT NULL,
ADD COLUMN     "order_date" TEXT NOT NULL,
ADD COLUMN     "order_number" INTEGER NOT NULL,
ADD COLUMN     "selling_price" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "total_discounts" INTEGER NOT NULL,
ADD COLUMN     "total_price" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."PaymentDetail" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "verify_code" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "paid_price" INTEGER NOT NULL,
    "paid_date" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "item_price" INTEGER NOT NULL,
    "item_discount" INTEGER NOT NULL,
    "total_discounts" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "selling_price" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentDetail_verify_code_key" ON "public"."PaymentDetail"("verify_code");

-- CreateIndex
CREATE UNIQUE INDEX "Order_order_number_key" ON "public"."Order"("order_number");

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "public"."Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PaymentDetail" ADD CONSTRAINT "PaymentDetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
