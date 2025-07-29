/*
  Warnings:

  - You are about to drop the column `psicologoId` on the `pacientes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pacientes" DROP CONSTRAINT "pacientes_psicologoId_fkey";

-- AlterTable
ALTER TABLE "pacientes" DROP COLUMN "psicologoId";

-- CreateTable
CREATE TABLE "_PacienteToPsicologo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PacienteToPsicologo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PacienteToPsicologo_B_index" ON "_PacienteToPsicologo"("B");

-- AddForeignKey
ALTER TABLE "_PacienteToPsicologo" ADD CONSTRAINT "_PacienteToPsicologo_A_fkey" FOREIGN KEY ("A") REFERENCES "pacientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PacienteToPsicologo" ADD CONSTRAINT "_PacienteToPsicologo_B_fkey" FOREIGN KEY ("B") REFERENCES "psicologos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
