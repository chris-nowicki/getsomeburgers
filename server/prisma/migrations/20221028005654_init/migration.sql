-- DropForeignKey
ALTER TABLE `RestaurantAddress` DROP FOREIGN KEY `RestaurantAddress_restaurantId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `birthday` DATE NULL;
