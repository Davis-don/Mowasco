/*
  Warnings:

  - You are about to drop the column `meter_id` on the `receipts_tb` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "receipts_tb" DROP CONSTRAINT "receipts_tb_meter_id_fkey";

-- DropIndex
DROP INDEX "receipts_tb_meter_id_key";

-- AlterTable
ALTER TABLE "receipts_tb" DROP COLUMN "meter_id";
