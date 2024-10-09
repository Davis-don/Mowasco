/*
  Warnings:

  - The `status` column on the `customers_tb` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CUSTOMER_STATUS" AS ENUM ('ACTIVE', 'DISCONNECTED', 'NEW_CUSTOMER');

-- AlterTable
ALTER TABLE "customers_tb" DROP COLUMN "status",
ADD COLUMN     "status" "CUSTOMER_STATUS" NOT NULL DEFAULT 'ACTIVE';
