-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'AGENT');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Agents" (
    "agent_id" TEXT NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "contact" INTEGER NOT NULL,
    "password" INTEGER NOT NULL,
    "status" "STATUS" NOT NULL DEFAULT 'INACTIVE',
    "role" "ROLE" NOT NULL DEFAULT 'AGENT',

    CONSTRAINT "Agents_pkey" PRIMARY KEY ("agent_id")
);
