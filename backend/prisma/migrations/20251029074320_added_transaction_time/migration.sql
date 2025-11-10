/*
  Warnings:

  - Added the required column `transaction_time` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."TransactionHistory" ADD COLUMN     "transaction_time" TEXT NOT NULL;
