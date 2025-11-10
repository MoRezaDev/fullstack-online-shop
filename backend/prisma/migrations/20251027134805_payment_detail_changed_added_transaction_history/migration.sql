/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `PaymentDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "public"."TransactionHistory" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "transaction_date" TEXT NOT NULL,
    "paymentDetailId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentDetail_orderId_key" ON "public"."PaymentDetail"("orderId");

-- AddForeignKey
ALTER TABLE "public"."TransactionHistory" ADD CONSTRAINT "TransactionHistory_paymentDetailId_fkey" FOREIGN KEY ("paymentDetailId") REFERENCES "public"."PaymentDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
