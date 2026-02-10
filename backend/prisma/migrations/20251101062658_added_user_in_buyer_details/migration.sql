/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `BuyerDetail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `BuyerDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BuyerDetail" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BuyerDetail_userId_key" ON "public"."BuyerDetail"("userId");

-- AddForeignKey
ALTER TABLE "public"."BuyerDetail" ADD CONSTRAINT "BuyerDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
