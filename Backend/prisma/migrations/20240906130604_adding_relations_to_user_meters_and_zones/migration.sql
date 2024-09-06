/*
  Warnings:

  - A unique constraint covering the columns `[zone_id]` on the table `Customers_tb` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[zone_id]` on the table `meters_tb` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cust_id]` on the table `meters_tb` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `zone_id` to the `Customers_tb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cust_id` to the `meters_tb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zone_id` to the `meters_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customers_tb" ADD COLUMN     "zone_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "meters_tb" ADD COLUMN     "cust_id" TEXT NOT NULL,
ADD COLUMN     "zone_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customers_tb_zone_id_key" ON "Customers_tb"("zone_id");

-- CreateIndex
CREATE UNIQUE INDEX "meters_tb_zone_id_key" ON "meters_tb"("zone_id");

-- CreateIndex
CREATE UNIQUE INDEX "meters_tb_cust_id_key" ON "meters_tb"("cust_id");

-- AddForeignKey
ALTER TABLE "Customers_tb" ADD CONSTRAINT "Customers_tb_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "zone_tb"("zone_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meters_tb" ADD CONSTRAINT "meters_tb_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "zone_tb"("zone_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meters_tb" ADD CONSTRAINT "meters_tb_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "Customers_tb"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;
