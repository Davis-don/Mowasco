-- CreateTable
CREATE TABLE "Bills" (
    "bill_id" TEXT NOT NULL,
    "current_readings" INTEGER NOT NULL,
    "preb_readings" INTEGER NOT NULL,
    "consumption" INTEGER NOT NULL,
    "readingDate" TIMESTAMP(3) NOT NULL,
    "pending_balances" INTEGER NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "cust_id" TEXT NOT NULL,

    CONSTRAINT "Bills_pkey" PRIMARY KEY ("bill_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bills_cust_id_key" ON "Bills"("cust_id");

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "Customers_tb"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;
