/*
  Warnings:

  - The `billing_status` column on the `bills_tb` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `prev_reading` on the `water_reading_tb` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "bills_tb" DROP COLUMN "billing_status",
ADD COLUMN     "billing_status" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "water_reading_tb" ALTER COLUMN "prev_reading" SET DATA TYPE DECIMAL(10,2);

-- DropEnum
DROP TYPE "BILLING_STATUS";
