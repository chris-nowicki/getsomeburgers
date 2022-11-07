/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Burger` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Burger_id_key` ON `Burger`(`id`);
