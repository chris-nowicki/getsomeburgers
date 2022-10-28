/*
  Warnings:

  - Made the column `birthday` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Burger` ADD COLUMN `picture` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `restaurantId` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `birthday` DATE NOT NULL,
    MODIFY `profilePic` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestaurantAddress` ADD CONSTRAINT `RestaurantAddress_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
