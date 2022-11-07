/*
  Warnings:

  - You are about to drop the column `burgerId` on the `burgerPicture` table. All the data in the column will be lost.
  - Added the required column `relatedBurgerId` to the `burgerPicture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `burgerPicture` DROP FOREIGN KEY `burgerPicture_burgerId_fkey`;

-- AlterTable
ALTER TABLE `burgerPicture` DROP COLUMN `burgerId`,
    ADD COLUMN `relatedBurgerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `burgerPicture` ADD CONSTRAINT `burgerPicture_relatedBurgerId_fkey` FOREIGN KEY (`relatedBurgerId`) REFERENCES `Burger`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
