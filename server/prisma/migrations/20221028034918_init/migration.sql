/*
  Warnings:

  - You are about to drop the `RestaurantAddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `RestaurantAddress` DROP FOREIGN KEY `RestaurantAddress_restaurantId_fkey`;

-- DropTable
DROP TABLE `RestaurantAddress`;
