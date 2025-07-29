//mock pacientes
export const mockConsultas = [
  { name: 'Jan', consultas: 2 },
  { name: 'Fev', consultas: 1 },
  { name: 'Mar', consultas: 3 },
  { name: 'Abr', consultas: 4 },
  { name: 'Mai', consultas: 2 },
  { name: 'Jun', consultas: 5 },
];

export const mockHumores = [
  { name: 'Muito Bom', value: 15 },
  { name: 'Bom', value: 8 },
  { name: 'Neutro', value: 12 },
  { name: 'Ruim', value: 10 },
  { name: 'Muito Ruim', value: 5 },
];

export const mockHumorTendencia = [
  { data: 'Sem 1', humor: 6 },
  { data: 'Sem 2', humor: 5 },
  { data: 'Sem 3', humor: 7 },
  { data: 'Sem 4', humor: 8 },
  { data: 'Sem 5', humor: 6 },
  { data: 'Sem 6', humor: 9 },
];

export const mockAtividades = [
  { tipo: 'Exercício', quantidade: 12, impacto: 8 },
  { tipo: 'Trabalho', quantidade: 8, impacto: 9 },
  { tipo: 'Social', quantidade: 15, impacto: 7 },
  { tipo: 'Lazer', quantidade: 20, impacto: 8 },
  { tipo: 'Estudo', quantidade: 6, impacto: 9 },
  { tipo: 'Autocuidado', quantidade: 10, impacto: 9 },
  { tipo: 'Outro', quantidade: 3, impacto: 6 },
];

export const mockProgressoSemanal = [
  { semana: 'S1', atividades: 3, humor: 6 },
  { semana: 'S2', atividades: 5, humor: 7 },
  { semana: 'S3', atividades: 4, humor: 6 },
  { semana: 'S4', atividades: 6, humor: 8 },
];

// Dados mockados para Psicólogo
export const mockPacientesPorMes = [
  { name: 'Jan', pacientes: 8, receita: 1200 },
  { name: 'Fev', receita: 1350, pacientes: 9 },
  { name: 'Mar', receita: 1500, pacientes: 10 },
  { name: 'Abr', receita: 1800, pacientes: 12 },
  { name: 'Mai', receita: 1650, pacientes: 11 },
  { name: 'Jun', receita: 2100, pacientes: 14 },
];

export const mockHumoresPacientes = [
  { name: 'Muito Bom', value: 35 },
  { name: 'Bom', value: 15 },
  { name: 'Neutro', value: 25 },
  { name: 'Ruim', value: 20 },
  { name: 'Muito Ruim', value: 5 },
];

export const mockConsultasPorDiaSemana = [
  { dia: 'Seg', consultas: 8 },
  { dia: 'Ter', consultas: 12 },
  { dia: 'Qua', consultas: 10 },
  { dia: 'Qui', consultas: 15 },
  { dia: 'Sex', consultas: 14 },
  { dia: 'Sáb', consultas: 6 },
  { dia: 'Dom', consultas: 2 },
];

export const mockEvolucaoPacientes = [
  { mes: 'Jan', novos: 3, ativos: 8, total: 8 },
  { mes: 'Fev', novos: 2, ativos: 9, total: 10 },
  { mes: 'Mar', novos: 4, ativos: 10, total: 14 },
  { mes: 'Abr', novos: 3, ativos: 12, total: 17 },
  { mes: 'Mai', novos: 1, ativos: 11, total: 18 },
  { mes: 'Jun', novos: 5, ativos: 14, total: 23 },
];

export const mockPerformanceMensal = [
  { categoria: 'Pontualidade', pontuacao: 95 },
  { categoria: 'Satisfação', pontuacao: 88 },
  { categoria: 'Frequência', pontuacao: 92 },
  { categoria: 'Melhoria', pontuacao: 85 },
  { categoria: 'Engajamento', pontuacao: 90 },
];
