/*
  Warnings:

  - Added the required column `startTime` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
