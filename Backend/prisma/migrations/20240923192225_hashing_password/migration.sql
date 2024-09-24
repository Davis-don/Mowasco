/*
  Warnings:

  - You are about to drop the `Agents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Agents";

-- CreateTable
CREATE TABLE "agents_tb" (
    "agent_id" TEXT NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "contact" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "status" "STATUS" NOT NULL DEFAULT 'INACTIVE',
    "role" "ROLE" NOT NULL DEFAULT 'AGENT',

    CONSTRAINT "agents_tb_pkey" PRIMARY KEY ("agent_id")
);
