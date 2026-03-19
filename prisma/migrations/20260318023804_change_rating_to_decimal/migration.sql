/*
  Warnings:

  - You are about to alter the column `rating` on the `Viewing` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(2,1)`.

*/
-- AlterTable
ALTER TABLE `Viewing` MODIFY `rating` DECIMAL(2, 1) NULL;
