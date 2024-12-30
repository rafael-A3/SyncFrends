/*
  Warnings:

  - You are about to drop the column `hashedRt` on the `User` table. All the data in the column will be lost.
  - Added the required column `authUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_hashedRt_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashedRt",
ADD COLUMN     "authUserId" INTEGER NOT NULL,
ALTER COLUMN "type" SET DEFAULT 'STANDARD_AUTH';

-- CreateTable
CREATE TABLE "UserAuth" (
    "id" SERIAL NOT NULL,
    "refreshToken" VARCHAR(300),
    "otpCode" TEXT NOT NULL,
    "otpCodeExp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAuth_refreshToken_key" ON "UserAuth"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "UserAuth_userId_key" ON "UserAuth"("userId");

-- AddForeignKey
ALTER TABLE "UserAuth" ADD CONSTRAINT "UserAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
