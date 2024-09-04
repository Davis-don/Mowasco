/*
  Warnings:

  - You are about to drop the column `readingDate` on the `bills_tb` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bills_tb" DROP COLUMN "readingDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
