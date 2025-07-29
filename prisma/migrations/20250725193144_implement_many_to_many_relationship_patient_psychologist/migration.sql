/*
  Warnings:

  - You are about to drop the column `psicologoId` on the `pacientes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pacientes" DROP CONSTRAINT "pacientes_psicologoId_fkey";

-- AlterTable
ALTER TABLE "pacientes" DROP COLUMN "psicologoId";

-- CreateTable
CREATE TABLE "paciente_psicologo" (
    "id" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "psicologoId" TEXT NOT NULL,
    "dataVinculo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paciente_psicologo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "paciente_psicologo_pacienteId_psicologoId_key" ON "paciente_psicologo"("pacienteId", "psicologoId");

-- AddForeignKey
ALTER TABLE "paciente_psicologo" ADD CONSTRAINT "paciente_psicologo_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paciente_psicologo" ADD CONSTRAINT "paciente_psicologo_psicologoId_fkey" FOREIGN KEY ("psicologoId") REFERENCES "psicologos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
