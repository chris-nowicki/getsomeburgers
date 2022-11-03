/*
  Warnings:

  - You are about to drop the column `postId` on the `burgerPicture` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[burgerPictureId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `burgerPictureId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `burgerPicture` DROP FOREIGN KEY `burgerPicture_postId_fkey`;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `burgerPictureId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `burgerPicture` DROP COLUMN `postId`;

-- CreateIndex
CREATE UNIQUE INDEX `Post_burgerPictureId_key` ON `Post`(`burgerPictureId`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_burgerPictureId_fkey` FOREIGN KEY (`burgerPictureId`) REFERENCES `burgerPicture`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
