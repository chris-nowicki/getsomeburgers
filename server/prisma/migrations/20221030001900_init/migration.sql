/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Burger` MODIFY `restaurantId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Post_id_key` ON `Post`(`id`);
