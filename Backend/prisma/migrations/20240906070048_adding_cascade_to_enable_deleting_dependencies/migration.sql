/*
  Warnings:

  - A unique constraint covering the columns `[Meter_number]` on the table `Customers_tb` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "bills_tb" DROP CONSTRAINT "bills_tb_cust_id_fkey";

-- DropForeignKey
ALTER TABLE "bills_tb" DROP CONSTRAINT "bills_tb_meter_id_fkey";

-- DropForeignKey
ALTER TABLE "receipts_tb" DROP CONSTRAINT "receipts_tb_bill_id_fkey";

-- DropForeignKey
ALTER TABLE "receipts_tb" DROP CONSTRAINT "receipts_tb_cust_id_fkey";

-- DropForeignKey
ALTER TABLE "receipts_tb" DROP CONSTRAINT "receipts_tb_meter_id_fkey";

-- DropForeignKey
ALTER TABLE "water_reading_tb" DROP CONSTRAINT "water_reading_tb_meter_id_fkey";

-- AlterTable
ALTER TABLE "Customers_tb" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "meters_tb" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Customers_tb_Meter_number_key" ON "Customers_tb"("Meter_number");

-- AddForeignKey
ALTER TABLE "water_reading_tb" ADD CONSTRAINT "water_reading_tb_meter_id_fkey" FOREIGN KEY ("meter_id") REFERENCES "meters_tb"("meter_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills_tb" ADD CONSTRAINT "bills_tb_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "Customers_tb"("cust_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills_tb" ADD CONSTRAINT "bills_tb_meter_id_fkey" FOREIGN KEY ("meter_id") REFERENCES "meters_tb"("meter_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipts_tb" ADD CONSTRAINT "receipts_tb_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "bills_tb"("bill_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipts_tb" ADD CONSTRAINT "receipts_tb_meter_id_fkey" FOREIGN KEY ("meter_id") REFERENCES "meters_tb"("meter_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipts_tb" ADD CONSTRAINT "receipts_tb_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "Customers_tb"("cust_id") ON DELETE CASCADE ON UPDATE CASCADE;
