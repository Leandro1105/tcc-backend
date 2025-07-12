import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  // Dados para dashboard do paciente
  async getPatientDashboard(pacienteId: string) {
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);

    // Consultas por mês (últimos 6 meses)
    const consultas = await this.getConsultasPorMes(pacienteId, sixMonthsAgo);

    // Distribuição de humores
    const humores = await this.getDistribuicaoHumores(pacienteId);

    // Tendência de humor (últimas 6 semanas)
    const humorTendencia = await this.getTendenciaHumor(pacienteId);

    // Atividades realizadas
    const atividades = await this.getAtividadesPorTipo(pacienteId);

    // Progresso semanal (últimas 4 semanas)
    const progressoSemanal = await this.getProgressoSemanal(pacienteId);

    return {
      consultas,
      humores,
      humorTendencia,
      atividades,
      progressoSemanal,
    };
  }

  // Dados para dashboard do psicólogo
  async getPsychologistDashboard(psicologoId: string) {
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);

    // Pacientes e receita por mês
    const pacientesPorMes = await this.getPacientesEReceitaPorMes(
      psicologoId,
      sixMonthsAgo,
    );

    // Distribuição de humores dos pacientes
    const humoresPacientes = await this.getHumoresPacientes(psicologoId);

    // Consultas por dia da semana
    const consultasPorDiaSemana =
      await this.getConsultasPorDiaSemana(psicologoId);

    // Evolução de pacientes
    const evolucaoPacientes = await this.getEvolucaoPacientes(
      psicologoId,
      sixMonthsAgo,
    );

    // Performance mensal (métricas calculadas)
    const performanceMensal = await this.getPerformanceMensal(psicologoId);

    return {
      pacientesPorMes,
      humoresPacientes,
      consultasPorDiaSemana,
      evolucaoPacientes,
      performanceMensal,
    };
  }

  // Métodos auxiliares para paciente
  private async getConsultasPorMes(pacienteId: string, desde: Date) {
    const consultas = await this.prisma.atendimento.groupBy({
      by: ['data'],
      where: {
        pacienteId,
        data: { gte: desde },
      },
      _count: { id: true },
    });

    // Agrupa por mês
    const consultasPorMes = new Map<string, number>();
    const meses = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];

    consultas.forEach((consulta) => {
      const mes = meses[consulta.data.getMonth()];
      consultasPorMes.set(
        mes,
        (consultasPorMes.get(mes) || 0) + consulta._count.id,
      );
    });

    return Array.from(consultasPorMes.entries()).map(([name, consultas]) => ({
      name,
      consultas,
    }));
  }

  private async getDistribuicaoHumores(pacienteId: string) {
    const humores = await this.prisma.humor.groupBy({
      by: ['escala'],
      where: { pacienteId },
      _count: { id: true },
    });

    const escalasHumor = {
      1: 'Muito Ruim',
      2: 'Ruim',
      3: 'Neutro',
      4: 'Bom',
      5: 'Muito Bom',
    };

    return humores.map((humor) => ({
      name: escalasHumor[humor.escala],
      value: humor._count.id,
    }));
  }

  private async getTendenciaHumor(pacienteId: string) {
    const sixWeeksAgo = new Date();
    sixWeeksAgo.setDate(sixWeeksAgo.getDate() - 42);

    const humores = await this.prisma.humor.findMany({
      where: {
        pacienteId,
        data: { gte: sixWeeksAgo },
      },
      orderBy: { data: 'asc' },
    });

    // Agrupa por semana
    const humoresPorSemana = new Map<string, number[]>();

    humores.forEach((humor) => {
      const weekNumber = Math.ceil(
        (humor.data.getTime() - sixWeeksAgo.getTime()) /
          (7 * 24 * 60 * 60 * 1000),
      );
      const semana = `Sem ${weekNumber}`;

      if (!humoresPorSemana.has(semana)) {
        humoresPorSemana.set(semana, []);
      }
      humoresPorSemana.get(semana).push(humor.escala);
    });

    return Array.from(humoresPorSemana.entries()).map(([data, escalas]) => ({
      data,
      humor: escalas.reduce((acc, val) => acc + val, 0) / escalas.length,
    }));
  }

  private async getAtividadesPorTipo(pacienteId: string) {
    const atividades = await this.prisma.atividade.groupBy({
      by: ['tipo'],
      where: { pacienteId },
      _count: { id: true },
      _avg: { impacto: true },
    });

    return atividades.map((atividade) => ({
      tipo: atividade.tipo,
      quantidade: atividade._count.id,
      impacto: Math.round(atividade._avg.impacto || 0),
    }));
  }

  private async getProgressoSemanal(pacienteId: string) {
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const atividades = await this.prisma.atividade.findMany({
      where: {
        pacienteId,
        data: { gte: fourWeeksAgo },
      },
    });

    const humores = await this.prisma.humor.findMany({
      where: {
        pacienteId,
        data: { gte: fourWeeksAgo },
      },
    });

    // Agrupa por semana
    const progressoPorSemana = new Map<
      string,
      { atividades: number; humores: number[] }
    >();

    atividades.forEach((atividade) => {
      const weekNumber = Math.ceil(
        (atividade.data.getTime() - fourWeeksAgo.getTime()) /
          (7 * 24 * 60 * 60 * 1000),
      );
      const semana = `S${weekNumber}`;

      if (!progressoPorSemana.has(semana)) {
        progressoPorSemana.set(semana, { atividades: 0, humores: [] });
      }
      progressoPorSemana.get(semana).atividades++;
    });

    humores.forEach((humor) => {
      const weekNumber = Math.ceil(
        (humor.data.getTime() - fourWeeksAgo.getTime()) /
          (7 * 24 * 60 * 60 * 1000),
      );
      const semana = `S${weekNumber}`;

      if (!progressoPorSemana.has(semana)) {
        progressoPorSemana.set(semana, { atividades: 0, humores: [] });
      }
      progressoPorSemana.get(semana).humores.push(humor.escala);
    });

    return Array.from(progressoPorSemana.entries()).map(([semana, data]) => ({
      semana,
      atividades: data.atividades,
      humor:
        data.humores.length > 0
          ? Math.round(
              data.humores.reduce((acc, val) => acc + val, 0) /
                data.humores.length,
            )
          : 0,
    }));
  }

  // Métodos auxiliares para psicólogo
  private async getPacientesEReceitaPorMes(psicologoId: string, desde: Date) {
    const atendimentos = await this.prisma.atendimento.findMany({
      where: {
        psicologoId,
        data: { gte: desde },
      },
      include: {
        pagamentos: true,
      },
    });

    const meses = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];
    const dadosPorMes = new Map<
      string,
      { pacientes: Set<string>; receita: number }
    >();

    atendimentos.forEach((atendimento) => {
      const mes = meses[atendimento.data.getMonth()];

      if (!dadosPorMes.has(mes)) {
        dadosPorMes.set(mes, { pacientes: new Set(), receita: 0 });
      }

      dadosPorMes.get(mes).pacientes.add(atendimento.pacienteId);

      const receitaAtendimento = atendimento.pagamentos.reduce(
        (acc, pag) => acc + pag.valor,
        0,
      );
      dadosPorMes.get(mes).receita += receitaAtendimento;
    });

    return Array.from(dadosPorMes.entries()).map(([name, data]) => ({
      name,
      pacientes: data.pacientes.size,
      receita: data.receita,
    }));
  }

  private async getHumoresPacientes(psicologoId: string) {
    const pacientes = await this.prisma.paciente.findMany({
      where: { psicologoId },
      include: { humor: true },
    });

    const escalasHumor = {
      1: 'Muito Ruim',
      2: 'Ruim',
      3: 'Neutro',
      4: 'Bom',
      5: 'Muito Bom',
    };

    const contadorHumores = new Map<string, number>();

    pacientes.forEach((paciente) => {
      paciente.humor.forEach((humor) => {
        const nomeHumor = escalasHumor[humor.escala];
        contadorHumores.set(
          nomeHumor,
          (contadorHumores.get(nomeHumor) || 0) + 1,
        );
      });
    });

    return Array.from(contadorHumores.entries()).map(([name, value]) => ({
      name,
      value,
    }));
  }

  private async getConsultasPorDiaSemana(psicologoId: string) {
    const atendimentos = await this.prisma.atendimento.findMany({
      where: { psicologoId },
    });

    const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const consultasPorDia = new Map<string, number>();

    atendimentos.forEach((atendimento) => {
      // JavaScript getDay(): Dom=0, Seg=1, Ter=2, Qua=3, Qui=4, Sex=5, Sáb=6
      // Mapeando para o formato do mock: Seg=0, Ter=1, Qua=2, Qui=3, Sex=4, Sáb=5, Dom=6
      const dayIndex = atendimento.data.getDay();
      const mappedIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Dom (0) -> 6, outros -1
      const dia = diasSemana[mappedIndex];
      consultasPorDia.set(dia, (consultasPorDia.get(dia) || 0) + 1);
    });

    return diasSemana.map((dia) => ({
      dia,
      consultas: consultasPorDia.get(dia) || 0,
    }));
  }

  private async getEvolucaoPacientes(psicologoId: string, desde: Date) {
    const pacientes = await this.prisma.paciente.findMany({
      where: { psicologoId },
      include: {
        consultas: {
          where: { data: { gte: desde } },
        },
      },
    });

    const meses = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];
    const evolucaoPorMes = new Map<
      string,
      { novos: Set<string>; ativos: Set<string> }
    >();

    pacientes.forEach((paciente) => {
      const primeiraConsulta = paciente.consultas.sort(
        (a, b) => a.data.getTime() - b.data.getTime(),
      )[0];

      if (primeiraConsulta) {
        const mes = meses[primeiraConsulta.data.getMonth()];

        if (!evolucaoPorMes.has(mes)) {
          evolucaoPorMes.set(mes, { novos: new Set(), ativos: new Set() });
        }

        // Se a primeira consulta foi neste mês, é um paciente novo
        if (primeiraConsulta.data >= desde) {
          evolucaoPorMes.get(mes).novos.add(paciente.id);
        }
      }

      // Verifica em quais meses o paciente teve consultas (pacientes ativos)
      paciente.consultas.forEach((consulta) => {
        const mes = meses[consulta.data.getMonth()];

        if (!evolucaoPorMes.has(mes)) {
          evolucaoPorMes.set(mes, { novos: new Set(), ativos: new Set() });
        }

        evolucaoPorMes.get(mes).ativos.add(paciente.id);
      });
    });

    let totalAcumulado = 0;

    return Array.from(evolucaoPorMes.entries()).map(([mes, data]) => {
      totalAcumulado += data.novos.size;

      return {
        mes,
        novos: data.novos.size,
        ativos: data.ativos.size,
        total: totalAcumulado,
      };
    });
  }

  private async getPerformanceMensal(psicologoId: string) {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const atendimentos = await this.prisma.atendimento.findMany({
      where: {
        psicologoId,
        data: { gte: lastMonth, lt: thisMonth },
      },
      include: {
        pagamentos: true,
      },
    });

    const pacientes = await this.prisma.paciente.findMany({
      where: { psicologoId },
      include: {
        humor: {
          where: { data: { gte: lastMonth, lt: thisMonth } },
        },
      },
    });

    // Cálculos de performance (simulados baseados nos dados disponíveis)
    const pontualidade = Math.min(
      95,
      Math.max(80, 95 - atendimentos.length * 0.1),
    ); // Simula pontualidade
    const satisfacao = Math.min(100, Math.max(70, 85 + pacientes.length * 0.5)); // Simula satisfação
    const frequencia = Math.min(100, Math.max(60, atendimentos.length * 2)); // Baseado no número de atendimentos

    // Melhoria baseada na evolução do humor dos pacientes
    const humoresPositivos = pacientes.reduce(
      (acc, p) => acc + p.humor.filter((h) => h.escala >= 4).length,
      0,
    );
    const totalHumores = pacientes.reduce((acc, p) => acc + p.humor.length, 0);
    const melhoria =
      totalHumores > 0 ? (humoresPositivos / totalHumores) * 100 : 80;

    const engajamento = Math.min(
      100,
      Math.max(70, (atendimentos.length / pacientes.length) * 20),
    );

    return [
      { categoria: 'Pontualidade', pontuacao: Math.round(pontualidade) },
      { categoria: 'Satisfação', pontuacao: Math.round(satisfacao) },
      { categoria: 'Frequência', pontuacao: Math.round(frequencia) },
      { categoria: 'Melhoria', pontuacao: Math.round(melhoria) },
      { categoria: 'Engajamento', pontuacao: Math.round(engajamento) },
    ];
  }
}
