export const mockConfirmedAppointments = [
  {
    id: '1',
    data: '2025-06-08T14:00:00Z', // Passado
    observacoes: 'Sessão de acompanhamento - Ansiedade',
    pacienteId: 'pac1',
    psicologoId: 'psi1',
    psicologo: {
      id: 'psi1',
      nome: 'Dra. Ana Silva',
      crp: '06/12345',
      email: 'ana@email.com',
    },
    pagamentos: [
      {
        id: 'pag1',
        valor: 150.0,
        data: '2025-06-07T10:00:00Z',
        dataVencimento: '2025-06-08T14:00:00Z',
        parcela: 1,
        status: 'Pago',
        atendimentoId: '1',
      },
    ],
    createdAt: '2025-06-05T10:00:00Z',
    updatedAt: '2025-06-07T10:00:00Z',
  },
  {
    id: '2',
    data: '2025-06-22T16:00:00Z', // Futuro
    observacoes: 'Terapia cognitivo-comportamental',
    pacienteId: 'pac1',
    psicologoId: 'psi2',
    psicologo: {
      id: 'psi2',
      nome: 'Dr. Carlos Mendes',
      crp: '06/54321',
      email: 'carlos@email.com',
    },
    pagamentos: [
      {
        id: 'pag2',
        valor: 180.0,
        data: '2025-06-10T09:30:00Z',
        dataVencimento: '2025-06-22T16:00:00Z',
        parcela: 1,
        status: 'Pago',
        atendimentoId: '2',
      },
    ],
    createdAt: '2025-06-09T10:00:00Z',
    updatedAt: '2025-06-10T09:30:00Z',
  },
  {
    id: '3',
    data: '2025-06-29T11:00:00Z', // Futuro
    observacoes: 'Primeira consulta - Avaliação psicológica',
    pacienteId: 'pac1',
    psicologoId: 'psi3',
    psicologo: {
      id: 'psi3',
      nome: 'Dra. Maria Santos',
      crp: '06/98765',
      email: 'maria@email.com',
    },
    pagamentos: [
      {
        id: 'pag3',
        valor: 200.0,
        data: '2025-06-10T14:20:00Z',
        dataVencimento: '2025-06-29T11:00:00Z',
        parcela: 1,
        status: 'Pago',
        atendimentoId: '3',
      },
    ],
    createdAt: '2025-06-09T10:00:00Z',
    updatedAt: '2025-06-10T14:20:00Z',
  },
  {
    id: '4',
    data: '2025-06-05T15:30:00Z', // Passado
    observacoes: 'Sessão de acompanhamento - Depressão',
    pacienteId: 'pac1',
    psicologoId: 'psi1',
    psicologo: {
      id: 'psi1',
      nome: 'Dra. Ana Silva',
      crp: '06/12345',
      email: 'ana@email.com',
    },
    pagamentos: [
      {
        id: 'pag4',
        valor: 150.0,
        data: '2025-06-04T16:45:00Z',
        dataVencimento: '2025-06-05T15:30:00Z',
        parcela: 1,
        status: 'Pago',
        atendimentoId: '4',
      },
    ],
    createdAt: '2025-06-03T10:00:00Z',
    updatedAt: '2025-06-04T16:45:00Z',
  },
];
