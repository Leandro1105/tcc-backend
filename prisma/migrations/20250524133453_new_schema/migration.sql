/*
  Warnings:

  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "atendimentos" DROP CONSTRAINT "atendimentos_pacienteId_fkey";

-- DropForeignKey
ALTER TABLE "atendimentos" DROP CONSTRAINT "atendimentos_psicologoId_fkey";

-- DropForeignKey
ALTER TABLE "atividades" DROP CONSTRAINT "atividades_pacienteId_fkey";

-- DropForeignKey
ALTER TABLE "humor" DROP CONSTRAINT "humor_pacienteId_fkey";

-- DropTable
DROP TABLE "usuarios";

-- CreateTable
CREATE TABLE "psicologos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "crp" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "Tipo" NOT NULL DEFAULT 'Psicologo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "psicologos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "Tipo" NOT NULL DEFAULT 'Paciente',
    "psicologoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "psicologos_email_key" ON "psicologos"("email");

-- CreateIndex
CREATE INDEX "idx_email_psicologo" ON "psicologos"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_email_key" ON "pacientes"("email");

-- CreateIndex
CREATE INDEX "idx_email_paciente" ON "pacientes"("email");

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_psicologoId_fkey" FOREIGN KEY ("psicologoId") REFERENCES "psicologos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atendimentos" ADD CONSTRAINT "atendimentos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atendimentos" ADD CONSTRAINT "atendimentos_psicologoId_fkey" FOREIGN KEY ("psicologoId") REFERENCES "psicologos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "humor" ADD CONSTRAINT "humor_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atividades" ADD CONSTRAINT "atividades_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
