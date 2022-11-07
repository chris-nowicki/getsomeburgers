/*
  Warnings:

  - A unique constraint covering the columns `[restaurantId]` on the table `Burger` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Burger_restaurantId_key` ON `Burger`(`restaurantId`);
