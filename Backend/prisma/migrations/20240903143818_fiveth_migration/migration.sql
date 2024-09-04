/*
  Warnings:

  - You are about to drop the column `createdAt` on the `bills_tb` table. All the data in the column will be lost.
  - You are about to drop the column `preb_readings` on the `bills_tb` table. All the data in the column will be lost.
  - Added the required column `prev_readings` to the `bills_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bills_tb" DROP COLUMN "createdAt",
DROP COLUMN "preb_readings",
ADD COLUMN     "billing_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "prev_readings" INTEGER NOT NULL;
