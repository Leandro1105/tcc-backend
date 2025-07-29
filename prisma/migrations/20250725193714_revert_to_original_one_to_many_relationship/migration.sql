/*
  Warnings:

  - You are about to drop the `_PacienteToPsicologo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PacienteToPsicologo" DROP CONSTRAINT "_PacienteToPsicologo_A_fkey";

-- DropForeignKey
ALTER TABLE "_PacienteToPsicologo" DROP CONSTRAINT "_PacienteToPsicologo_B_fkey";

-- AlterTable
ALTER TABLE "pacientes" ADD COLUMN     "psicologoId" TEXT;

-- DropTable
DROP TABLE "_PacienteToPsicologo";

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_psicologoId_fkey" FOREIGN KEY ("psicologoId") REFERENCES "psicologos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
