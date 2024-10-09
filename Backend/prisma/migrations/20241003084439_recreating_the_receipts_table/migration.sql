/*
  Warnings:

  - Changed the type of `deadline_date` on the `receipts_tb` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "receipts_tb" DROP COLUMN "deadline_date",
ADD COLUMN     "deadline_date" TIMESTAMP(3) NOT NULL;
