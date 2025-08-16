-- AlterTable
ALTER TABLE "psicologos" ADD COLUMN     "endereco" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "numero" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "atendimentos_disponiveis" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "psicologoId" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "atendimentos_disponiveis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "atendimentos_disponiveis" ADD CONSTRAINT "atendimentos_disponiveis_psicologoId_fkey" FOREIGN KEY ("psicologoId") REFERENCES "psicologos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
