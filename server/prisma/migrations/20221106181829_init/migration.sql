/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Restaurant_id_key` ON `Restaurant`(`id`);
