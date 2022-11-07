/*
  Warnings:

  - A unique constraint covering the columns `[burgerName]` on the table `Burger` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Burger_burgerName_key` ON `Burger`(`burgerName`);
