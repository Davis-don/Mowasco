/*
  Warnings:

  - You are about to drop the column `Meter_number` on the `Customers_tb` table. All the data in the column will be lost.
  - You are about to drop the column `cust_zone` on the `Customers_tb` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Customers_tb_Meter_number_key";

-- AlterTable
ALTER TABLE "Customers_tb" DROP COLUMN "Meter_number",
DROP COLUMN "cust_zone";
