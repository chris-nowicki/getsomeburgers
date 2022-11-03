/*
  Warnings:

  - You are about to drop the column `picture` on the `Burger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Burger` DROP COLUMN `picture`;

-- CreateTable
CREATE TABLE `ProfilePicture` (
    `profilePicture` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `ProfilePicture_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `burgerPicture` (
    `burgerPicture` INTEGER NOT NULL,
    `burgerId` INTEGER NOT NULL,

    UNIQUE INDEX `burgerPicture_burgerId_key`(`burgerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProfilePicture` ADD CONSTRAINT `ProfilePicture_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `burgerPicture` ADD CONSTRAINT `burgerPicture_burgerId_fkey` FOREIGN KEY (`burgerId`) REFERENCES `Burger`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
