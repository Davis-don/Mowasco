/*
  Warnings:

  - You are about to drop the column `custID` on the `water_reading_tb` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "water_reading_tb" DROP CONSTRAINT "water_reading_tb_custID_fkey";

-- AlterTable
ALTER TABLE "water_reading_tb" DROP COLUMN "custID";
