/*
  Warnings:

  - You are about to drop the column `name` on the `Burger` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Restaurant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[restaurantName]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `burgerName` to the `Burger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantName` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Restaurant_name_key` ON `Restaurant`;

-- AlterTable
ALTER TABLE `Burger` DROP COLUMN `name`,
    ADD COLUMN `burgerName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Restaurant` DROP COLUMN `name`,
    ADD COLUMN `restaurantName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Restaurant_restaurantName_key` ON `Restaurant`(`restaurantName`);
