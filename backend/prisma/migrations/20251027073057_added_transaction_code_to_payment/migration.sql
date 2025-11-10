/*
  Warnings:

  - A unique constraint covering the columns `[transaction_code]` on the table `PaymentDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."PaymentDetail" ADD COLUMN     "transaction_code" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "PaymentDetail_transaction_code_key" ON "public"."PaymentDetail"("transaction_code");
