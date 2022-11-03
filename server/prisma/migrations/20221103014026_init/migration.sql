/*
  Warnings:

  - You are about to drop the column `picture` on the `Burger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Burger` DROP COLUMN `picture`;

-- CreateTable
CREATE TABLE `burgerPicture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `burgerPicture` VARCHAR(191) NULL,
    `burgerId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,

    UNIQUE INDEX `burgerPicture_id_key`(`id`),
    UNIQUE INDEX `burgerPicture_postId_key`(`postId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `burgerPicture` ADD CONSTRAINT `burgerPicture_burgerId_fkey` FOREIGN KEY (`burgerId`) REFERENCES `Burger`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `burgerPicture` ADD CONSTRAINT `burgerPicture_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
