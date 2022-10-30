/*
  Warnings:

  - Made the column `restaurantId` on table `Burger` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Burger` DROP FOREIGN KEY `Burger_restaurantId_fkey`;

-- AlterTable
ALTER TABLE `Burger` MODIFY `restaurantId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Burger` ADD CONSTRAINT `Burger_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
