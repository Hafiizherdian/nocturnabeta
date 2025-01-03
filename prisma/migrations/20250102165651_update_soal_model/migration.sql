/*
  Warnings:

  - The `pilihan` column on the `Soal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Soal" DROP COLUMN "pilihan",
ADD COLUMN     "pilihan" TEXT[];
