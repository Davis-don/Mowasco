/*
  Warnings:

  - You are about to drop the column `billing_date` on the `bills_tb` table. All the data in the column will be lost.
  - You are about to drop the column `current_readings` on the `bills_tb` table. All the data in the column will be lost.
  - You are about to drop the column `cust_id` on the `bills_tb` table. All the data in the column will be lost.
  - You are about to drop the column `pending_balances` on the `bills_tb` table. All the data in the column will be lost.
  - You are about to drop the column `prev_readings` on the `bills_tb` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `bills_tb` table. All the data in the column will be lost.
  - You are about to alter the column `consumption` on the `bills_tb` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - Added the required column `amount_due` to the `bills_tb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingDate` to the `bills_tb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billing_period` to the `bills_tb` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bills_tb" DROP CONSTRAINT "bills_tb_cust_id_fkey";

-- DropIndex
DROP INDEX "bills_tb_cust_id_key";

-- AlterTable
ALTER TABLE "bills_tb" DROP COLUMN "billing_date",
DROP COLUMN "current_readings",
DROP COLUMN "cust_id",
DROP COLUMN "pending_balances",
DROP COLUMN "prev_readings",
DROP COLUMN "total_amount",
ADD COLUMN     "amount_due" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "billingDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "billing_period" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "consumption" SET DATA TYPE DECIMAL(10,2);

-- CreateTable
CREATE TABLE "meters_tb" (
    "meter_id" TEXT NOT NULL,
    "meter_number" INTEGER NOT NULL,
    "zone" TEXT NOT NULL,

    CONSTRAINT "meters_tb_pkey" PRIMARY KEY ("meter_id")
);

-- CreateTable
CREATE TABLE "zone_tb" (
    "zone_id" TEXT NOT NULL,
    "zone_name" INTEGER NOT NULL,

    CONSTRAINT "zone_tb_pkey" PRIMARY KEY ("zone_id")
);

-- CreateTable
CREATE TABLE "water_reading_tb" (
    "reading_id" TEXT NOT NULL,
    "current_reading" DECIMAL(10,2) NOT NULL,
    "prev_reading" DECIMAL(10,2) NOT NULL,
    "consumption" DECIMAL(10,2) NOT NULL,
    "reading date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "water_reading_tb_pkey" PRIMARY KEY ("reading_id")
);

-- CreateTable
CREATE TABLE "receipts_tb" (
    "receipt_id" TEXT NOT NULL,
    "receipt_number" INTEGER NOT NULL,
    "amount_paid" DECIMAL(10,2) NOT NULL,
    "deadline_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "receipts_tb_pkey" PRIMARY KEY ("receipt_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "meters_tb_meter_number_key" ON "meters_tb"("meter_number");

-- CreateIndex
CREATE UNIQUE INDEX "zone_tb_zone_name_key" ON "zone_tb"("zone_name");
