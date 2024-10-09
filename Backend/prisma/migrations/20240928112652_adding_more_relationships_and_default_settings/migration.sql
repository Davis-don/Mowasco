/*
  Warnings:

  - You are about to alter the column `phone_number` on the `customers_tb` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "customers_tb" ALTER COLUMN "phone_number" SET DATA TYPE INTEGER;
