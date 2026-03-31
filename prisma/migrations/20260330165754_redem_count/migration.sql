/*
  Warnings:

  - You are about to drop the column `maxRedeems` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `redeemCount` on the `Redeem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Partner" DROP COLUMN "maxRedeems";

-- AlterTable
ALTER TABLE "Redeem" DROP COLUMN "redeemCount";
