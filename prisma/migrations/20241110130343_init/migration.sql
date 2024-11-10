/*
  Warnings:

  - You are about to drop the column `desciption` on the `TodoTable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TodoTable" DROP COLUMN "desciption",
ADD COLUMN     "description" TEXT DEFAULT '';
