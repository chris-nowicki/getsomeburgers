-- DropForeignKey
ALTER TABLE `Burger` DROP FOREIGN KEY `Burger_restaurantId_fkey`;

-- AddForeignKey
ALTER TABLE `Burger` ADD CONSTRAINT `Burger_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
