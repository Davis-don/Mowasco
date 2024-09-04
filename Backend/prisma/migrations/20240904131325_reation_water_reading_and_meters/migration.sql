/*
  Warnings:

  - A unique constraint covering the columns `[meter_id]` on the table `water_reading_tb` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `meter_id` to the `water_reading_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "water_reading_tb" ADD COLUMN     "meter_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "water_reading_tb_meter_id_key" ON "water_reading_tb"("meter_id");

-- AddForeignKey
ALTER TABLE "water_reading_tb" ADD CONSTRAINT "water_reading_tb_meter_id_fkey" FOREIGN KEY ("meter_id") REFERENCES "meters_tb"("meter_id") ON DELETE RESTRICT ON UPDATE CASCADE;
