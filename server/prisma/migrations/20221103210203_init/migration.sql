/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `Burger` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[connectedRestaurantId]` on the table `Burger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `connectedRestaurantId` to the `Burger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Burger` DROP FOREIGN KEY `Burger_restaurantId_fkey`;

-- AlterTable
ALTER TABLE `Burger` DROP COLUMN `restaurantId`,
    ADD COLUMN `connectedRestaurantId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Burger_connectedRestaurantId_key` ON `Burger`(`connectedRestaurantId`);

-- AddForeignKey
ALTER TABLE `Burger` ADD CONSTRAINT `Burger_connectedRestaurantId_fkey` FOREIGN KEY (`connectedRestaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
