-- CreateEnum
CREATE TYPE "WATER_READING_STATUS" AS ENUM ('WATER_RECORDED', 'NOT_RECORDED');

-- CreateEnum
CREATE TYPE "BILLING_STATUS" AS ENUM ('PAID', 'PENDING', 'NOT_PAID');

-- DropForeignKey
ALTER TABLE "bills_tb" DROP CONSTRAINT "bills_tb_meter_id_fkey";

-- DropForeignKey
ALTER TABLE "meters_tb" DROP CONSTRAINT "meters_tb_cust_id_fkey";

-- DropForeignKey
ALTER TABLE "meters_tb" DROP CONSTRAINT "meters_tb_zone_id_fkey";

-- AlterTable
ALTER TABLE "bills_tb" ADD COLUMN     "billing_status" "BILLING_STATUS" NOT NULL DEFAULT 'NOT_PAID';

-- AlterTable
ALTER TABLE "customers_tb" ADD COLUMN     "customer_number" SERIAL NOT NULL,
ALTER COLUMN "phone_number" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "water_reading_tb" ADD COLUMN     "water_reading_status" "WATER_READING_STATUS" NOT NULL DEFAULT 'NOT_RECORDED';

-- AddForeignKey
ALTER TABLE "meters_tb" ADD CONSTRAINT "meters_tb_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "zone_tb"("zone_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meters_tb" ADD CONSTRAINT "meters_tb_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "customers_tb"("cust_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills_tb" ADD CONSTRAINT "bills_tb_meter_id_fkey" FOREIGN KEY ("meter_id") REFERENCES "meters_tb"("meter_id") ON DELETE CASCADE ON UPDATE CASCADE;
