/*
  Warnings:

  - You are about to drop the `Bills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bills" DROP CONSTRAINT "Bills_cust_id_fkey";

-- DropTable
DROP TABLE "Bills";

-- CreateTable
CREATE TABLE "bills_tb" (
    "bill_id" TEXT NOT NULL,
    "current_readings" INTEGER NOT NULL,
    "preb_readings" INTEGER NOT NULL,
    "consumption" INTEGER NOT NULL,
    "readingDate" TIMESTAMP(3) NOT NULL,
    "pending_balances" INTEGER NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "cust_id" TEXT NOT NULL,

    CONSTRAINT "bills_tb_pkey" PRIMARY KEY ("bill_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bills_tb_cust_id_key" ON "bills_tb"("cust_id");

-- AddForeignKey
ALTER TABLE "bills_tb" ADD CONSTRAINT "bills_tb_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "Customers_tb"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;
