/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `Burger` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Burger` DROP FOREIGN KEY `Burger_restaurantId_fkey`;

-- AlterTable
ALTER TABLE `Burger` DROP COLUMN `restaurantId`,
    ADD COLUMN `theId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Burger` ADD CONSTRAINT `Burger_theId_fkey` FOREIGN KEY (`theId`) REFERENCES `Restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
