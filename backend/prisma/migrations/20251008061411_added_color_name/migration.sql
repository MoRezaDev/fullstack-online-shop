/*
  Warnings:

  - Added the required column `name_fa` to the `Color` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Color" ADD COLUMN     "name_fa" TEXT NOT NULL;
