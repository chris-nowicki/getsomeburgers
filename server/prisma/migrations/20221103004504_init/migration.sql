/*
  Warnings:

  - A unique constraint covering the columns `[burgerPictureId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `burgerPicture` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `burgerPictureId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `burgerPicture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `burgerPictureId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `burgerPicture` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Post_burgerPictureId_key` ON `Post`(`burgerPictureId`);

-- CreateIndex
CREATE UNIQUE INDEX `burgerPicture_id_key` ON `burgerPicture`(`id`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_burgerPictureId_fkey` FOREIGN KEY (`burgerPictureId`) REFERENCES `burgerPicture`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
