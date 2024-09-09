-- AlterTable
CREATE SEQUENCE receipts_tb_receipt_number_seq;
ALTER TABLE "receipts_tb" ALTER COLUMN "receipt_number" SET DEFAULT nextval('receipts_tb_receipt_number_seq'),
ALTER COLUMN "deadline_date" SET DEFAULT CURRENT_TIMESTAMP;
ALTER SEQUENCE receipts_tb_receipt_number_seq OWNED BY "receipts_tb"."receipt_number";
