-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('TWO_FACTOR_AUTH', 'STANDARD_AUTH', 'GOOGLE_OAUTH');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ONLINE', 'OFFLINE');

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(36) NOT NULL,
    "photo" TEXT,
    "name" VARCHAR(50) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(16),
    "connection" "Status" NOT NULL DEFAULT 'OFFLINE',
    "type" "AuthType" NOT NULL,
    "hashedRt" VARCHAR(300),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_hashedRt_key" ON "User"("hashedRt");
