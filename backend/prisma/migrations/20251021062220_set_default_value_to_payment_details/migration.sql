-- AlterTable
ALTER TABLE "public"."PaymentDetail" ALTER COLUMN "paid_price" SET DEFAULT 0,
ALTER COLUMN "paid_date" SET DEFAULT 'pending';
