/*
  Warnings:

  - You are about to drop the `Customers_tb` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Customers_tb" DROP CONSTRAINT "Customers_tb_zone_id_fkey";

-- DropForeignKey
ALTER TABLE "bills_tb" DROP CONSTRAINT "bills_tb_cust_id_fkey";

-- DropForeignKey
ALTER TABLE "meters_tb" DROP CONSTRAINT "meters_tb_cust_id_fkey";

-- DropForeignKey
ALTER TABLE "receipts_tb" DROP CONSTRAINT "receipts_tb_cust_id_fkey";

-- DropTable
DROP TABLE "Customers_tb";

-- CreateTable
CREATE TABLE "customers_tb" (
    "cust_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "cust_ID" INTEGER NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "connection_type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "zone_id" TEXT NOT NULL,

    CONSTRAINT "customers_tb_pkey" PRIMARY KEY ("cust_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_tb_zone_id_key" ON "customers_tb"("zone_id");

-- AddForeignKey
ALTER TABLE "customers_tb" ADD CONSTRAINT "customers_tb_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "zone_tb"("zone_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meters_tb" ADD CONSTRAINT "meters_tb_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "customers_tb"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills_tb" ADD CONSTRAINT "bills_tb_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "customers_tb"("cust_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipts_tb" ADD CONSTRAINT "receipts_tb_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "customers_tb"("cust_id") ON DELETE CASCADE ON UPDATE CASCADE;
