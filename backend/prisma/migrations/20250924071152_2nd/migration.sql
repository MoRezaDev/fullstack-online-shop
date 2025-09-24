/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Brand" ADD COLUMN     "image_url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Brand_title_key" ON "public"."Brand"("title");
