/*
  Warnings:

  - You are about to drop the column `burgerPictureId` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[burgerPicId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `burgerPicId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_burgerPictureId_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `burgerPictureId`,
    ADD COLUMN `burgerPicId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Post_burgerPicId_key` ON `Post`(`burgerPicId`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_burgerPicId_fkey` FOREIGN KEY (`burgerPicId`) REFERENCES `burgerPicture`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
