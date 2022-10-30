/*
  Warnings:

  - You are about to drop the column `theId` on the `Burger` table. All the data in the column will be lost.
  - Added the required column `restaurantId` to the `Burger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Burger` DROP FOREIGN KEY `Burger_theId_fkey`;

-- AlterTable
ALTER TABLE `Burger` DROP COLUMN `theId`,
    ADD COLUMN `restaurantId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Burger` ADD CONSTRAINT `Burger_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
