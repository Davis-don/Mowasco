/*
  Warnings:

  - Added the required column `meter_id` to the `bills_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bills_tb" ADD COLUMN     "meter_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "bills_tb" ADD CONSTRAINT "bills_tb_meter_id_fkey" FOREIGN KEY ("meter_id") REFERENCES "meters_tb"("meter_id") ON DELETE RESTRICT ON UPDATE CASCADE;
