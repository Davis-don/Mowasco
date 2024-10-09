-- AlterTable
ALTER TABLE "Employees_tbl" ALTER COLUMN "Employees_Id" DROP DEFAULT,
ALTER COLUMN "Password" SET DATA TYPE VARCHAR(255);
DROP SEQUENCE "Employees_tbl_Employees_Id_seq";
