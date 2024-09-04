-- CreateTable
CREATE TABLE "Customers_tb" (
    "cust_id" TEXT NOT NULL,
    "Meter_number" TEXT NOT NULL,
    "cust_zone" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "cust_ID" INTEGER NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "connection_type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',

    CONSTRAINT "Customers_tb_pkey" PRIMARY KEY ("cust_id")
);
