/*
  Warnings:

  - You are about to drop the column `burgerPictureId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `burgerPicture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_burgerPictureId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `burgerPicture` DROP FOREIGN KEY `burgerPicture_burgerId_fkey`;

-- AlterTable
ALTER TABLE `Burger` ADD COLUMN `picture` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `burgerPictureId`;

-- DropTable
DROP TABLE `Profile`;

-- DropTable
DROP TABLE `burgerPicture`;
