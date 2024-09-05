/*
  Warnings:

  - A unique constraint covering the columns `[cust_id]` on the table `bills_tb` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[meter_id]` on the table `bills_tb` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bill_id]` on the table `receipts_tb` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[meter_id]` on the table `receipts_tb` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cust_id]` on the table `receipts_tb` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cust_id` to the `bills_tb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meter_id` to the `bills_tb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bill_id` to the `receipts_tb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cust_id` to the `receipts_tb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meter_id` to the `receipts_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bills_tb" ADD COLUMN     "cust_id" TEXT NOT NULL,
ADD COLUMN     "meter_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "receipts_tb" ADD COLUMN     "bill_id" TEXT NOT NULL,
ADD COLUMN     "cust_id" TEXT NOT NULL,
ADD COLUMN     "meter_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "bills_tb_cust_id_key" ON "bills_tb"("cust_id");

-- CreateIndex
CREATE UNIQUE INDEX "bills_tb_meter_id_key" ON "bills_tb"("meter_id");

-- CreateIndex
CREATE UNIQUE INDEX "receipts_tb_bill_id_key" ON "receipts_tb"("bill_id");

-- CreateIndex
CREATE UNIQUE INDEX "receipts_tb_meter_id_key" ON "receipts_tb"("meter_id");

-- CreateIndex
CREATE UNIQUE INDEX "receipts_tb_cust_id_key" ON "receipts_tb"("cust_id");

-- AddForeignKey
ALTER TABLE "bills_tb" ADD CONSTRAINT "bills_tb_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "Customers_tb"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills_tb" ADD CONSTRAINT "bills_tb_meter_id_fkey" FOREIGN KEY ("meter_id") REFERENCES "meters_tb"("meter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipts_tb" ADD CONSTRAINT "receipts_tb_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "bills_tb"("bill_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipts_tb" ADD CONSTRAINT "receipts_tb_meter_id_fkey" FOREIGN KEY ("meter_id") REFERENCES "meters_tb"("meter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipts_tb" ADD CONSTRAINT "receipts_tb_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "Customers_tb"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;
