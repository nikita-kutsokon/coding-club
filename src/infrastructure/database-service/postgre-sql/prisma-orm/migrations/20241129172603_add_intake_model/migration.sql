-- CreateEnum
CREATE TYPE "IntakeType" AS ENUM ('WEEKEND', 'WEEKDAY');

-- CreateTable
CREATE TABLE "Intake" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "launchDate" TIMESTAMP(3) NOT NULL,
    "type" "IntakeType" NOT NULL,
    "isOpened" BOOLEAN NOT NULL DEFAULT false,
    "applicationDeadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Intake_pkey" PRIMARY KEY ("id")
);
