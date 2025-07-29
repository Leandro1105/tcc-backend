/*
  Warnings:

  - You are about to drop the `paciente_psicologo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "paciente_psicologo" DROP CONSTRAINT "paciente_psicologo_pacienteId_fkey";

-- DropForeignKey
ALTER TABLE "paciente_psicologo" DROP CONSTRAINT "paciente_psicologo_psicologoId_fkey";

-- DropTable
DROP TABLE "paciente_psicologo";

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
