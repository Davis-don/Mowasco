/*
  Warnings:

  - A unique constraint covering the columns `[custID]` on the table `water_reading_tb` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `custID` to the `water_reading_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "water_reading_tb" ADD COLUMN     "custID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "water_reading_tb_custID_key" ON "water_reading_tb"("custID");

-- AddForeignKey
ALTER TABLE "water_reading_tb" ADD CONSTRAINT "water_reading_tb_custID_fkey" FOREIGN KEY ("custID") REFERENCES "customers_tb"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;
