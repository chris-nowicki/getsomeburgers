/*
  Warnings:

  - You are about to drop the column `connectedRestaurantId` on the `Burger` table. All the data in the column will be lost.
  - Added the required column `relatedRestaurantId` to the `Burger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Burger` DROP FOREIGN KEY `Burger_connectedRestaurantId_fkey`;

-- DropIndex
DROP INDEX `Burger_id_key` ON `Burger`;

-- DropIndex
DROP INDEX `Post_id_key` ON `Post`;

-- AlterTable
ALTER TABLE `Burger` DROP COLUMN `connectedRestaurantId`,
    ADD COLUMN `relatedRestaurantId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Burger` ADD CONSTRAINT `Burger_relatedRestaurantId_fkey` FOREIGN KEY (`relatedRestaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
