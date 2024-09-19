/*
  Warnings:

  - You are about to drop the column `meter_id` on the `bills_tb` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bills_tb" DROP CONSTRAINT "bills_tb_meter_id_fkey";

-- DropIndex
DROP INDEX "bills_tb_meter_id_key";

-- AlterTable
ALTER TABLE "bills_tb" DROP COLUMN "meter_id";
