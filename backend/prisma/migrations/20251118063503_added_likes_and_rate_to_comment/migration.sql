/*
  Warnings:

  - Added the required column `comment_date` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Comment" ADD COLUMN     "comment_date" TEXT NOT NULL,
ADD COLUMN     "rate" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."CommentReaction" (
    "id" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "dislikes" INTEGER NOT NULL DEFAULT 0,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "CommentReaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommentReaction_commentId_key" ON "public"."CommentReaction"("commentId");

-- AddForeignKey
ALTER TABLE "public"."CommentReaction" ADD CONSTRAINT "CommentReaction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "public"."Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
