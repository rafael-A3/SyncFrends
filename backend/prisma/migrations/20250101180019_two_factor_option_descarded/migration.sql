/*
  Warnings:

  - The values [TWO_FACTOR_AUTH] on the enum `AuthType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AuthType_new" AS ENUM ('STANDARD_AUTH', 'GOOGLE_OAUTH');
ALTER TABLE "User" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "type" TYPE "AuthType_new" USING ("type"::text::"AuthType_new");
ALTER TYPE "AuthType" RENAME TO "AuthType_old";
ALTER TYPE "AuthType_new" RENAME TO "AuthType";
DROP TYPE "AuthType_old";
ALTER TABLE "User" ALTER COLUMN "type" SET DEFAULT 'STANDARD_AUTH';
COMMIT;
