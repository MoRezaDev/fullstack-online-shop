/*
  Warnings:

  - Added the required column `title_fa` to the `Color` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Color" ADD COLUMN     "title_fa" TEXT NOT NULL;
