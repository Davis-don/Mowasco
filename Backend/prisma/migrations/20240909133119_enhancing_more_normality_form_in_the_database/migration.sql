/*
  Warnings:

  - You are about to drop the column `zone_id` on the `customers_tb` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "customers_tb" DROP CONSTRAINT "customers_tb_zone_id_fkey";

-- DropIndex
DROP INDEX "customers_tb_zone_id_key";

-- AlterTable
ALTER TABLE "customers_tb" DROP COLUMN "zone_id";
