/*
  Warnings:

  - You are about to drop the column `cust_id` on the `receipts_tb` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "receipts_tb" DROP CONSTRAINT "receipts_tb_cust_id_fkey";

-- DropIndex
DROP INDEX "receipts_tb_cust_id_key";

-- AlterTable
ALTER TABLE "receipts_tb" DROP COLUMN "cust_id";
