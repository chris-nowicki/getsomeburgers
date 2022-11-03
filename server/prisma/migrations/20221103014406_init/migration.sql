/*
  Warnings:

  - A unique constraint covering the columns `[burgerPicture]` on the table `burgerPicture` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `burgerPicture_burgerPicture_key` ON `burgerPicture`(`burgerPicture`);
