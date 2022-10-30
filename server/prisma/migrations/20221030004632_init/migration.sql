/*
  Warnings:

  - You are about to alter the column `burgerRating` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `burgerRating` DOUBLE NOT NULL;
