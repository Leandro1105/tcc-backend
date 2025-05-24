/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `pacientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `psicologos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dataNascimento` to the `pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pacientes" ADD COLUMN     "dataNascimento" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_cpf_key" ON "pacientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "psicologos_cpf_key" ON "psicologos"("cpf");
