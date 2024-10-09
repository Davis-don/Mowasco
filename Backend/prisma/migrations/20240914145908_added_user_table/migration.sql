-- CreateTable
CREATE TABLE "Employees_tbl" (
    "Employees_Id" SERIAL NOT NULL,
    "FullNames" TEXT NOT NULL,
    "Gender" VARCHAR(10) NOT NULL,
    "Age" INTEGER NOT NULL,
    "contact" VARCHAR(50) NOT NULL,
    "Status" VARCHAR(10) NOT NULL,
    "Role" VARCHAR(10) NOT NULL,
    "Password" VARCHAR(10) NOT NULL,

    CONSTRAINT "Employees_tbl_pkey" PRIMARY KEY ("Employees_Id")
);
