/*
  Warnings:

  - You are about to drop the `_PacienteToPsicologo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PacienteToPsicologo" DROP CONSTRAINT "_PacienteToPsicologo_A_fkey";

-- DropForeignKey
ALTER TABLE "_PacienteToPsicologo" DROP CONSTRAINT "_PacienteToPsicologo_B_fkey";

-- DropTable
DROP TABLE "_PacienteToPsicologo";

-- CreateTable
CREATE TABLE "PsicologoPaciente" (
    "id" TEXT NOT NULL,
    "psicologoId" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,

    CONSTRAINT "PsicologoPaciente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PsicologoPaciente_psicologoId_pacienteId_key" ON "PsicologoPaciente"("psicologoId", "pacienteId");

-- AddForeignKey
ALTER TABLE "PsicologoPaciente" ADD CONSTRAINT "PsicologoPaciente_psicologoId_fkey" FOREIGN KEY ("psicologoId") REFERENCES "psicologos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PsicologoPaciente" ADD CONSTRAINT "PsicologoPaciente_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
