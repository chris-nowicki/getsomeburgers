/*
  Warnings:

  - A unique constraint covering the columns `[burgerId]` on the table `burgerPicture` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `burgerPicture_burgerId_key` ON `burgerPicture`(`burgerId`);
