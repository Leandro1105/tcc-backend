export const mockPatients = [
  {
    id: '1',
    nome: 'Maria Silva',
    email: 'maria@email.com',
    telefone: '(11) 99999-0001',
    atividades: [
      {
        id: 'act1',
        titulo: 'Exercícios de Respiração',
        descricao:
          'Praticar técnicas de respiração profunda por 10 minutos, 2 vezes ao dia',
        data: new Date().toISOString(),
        categoria: 'Relaxamento',
        pacienteId: '1',
      },
      {
        id: 'act2',
        titulo: 'Diário de Gratidão',
        descricao:
          'Escrever 3 coisas pelas quais sou grata todos os dias antes de dormir',
        data: new Date(Date.now() - 86400000).toISOString(),
        categoria: 'Mindfulness',
        pacienteId: '1',
      },
      {
        id: 'act3',
        titulo: 'Caminhada Matinal',
        descricao: 'Caminhar por 30 minutos todas as manhãs ao ar livre',
        data: new Date(Date.now() - 172800000).toISOString(),
        categoria: 'Exercício',
        pacienteId: '1',
      },
    ],
  },
  {
    id: '2',
    nome: 'João Santos',
    email: 'joao@email.com',
    telefone: '(11) 99999-0002',
    atividades: [
      {
        id: 'act4',
        titulo: 'Meditação Guiada',
        descricao:
          'Seguir meditação guiada de 15 minutos usando aplicativo recomendado',
        data: new Date(Date.now() - 86400000).toISOString(),
        categoria: 'Mindfulness',
        pacienteId: '2',
      },
      {
        id: 'act5',
        titulo: 'Atividade Social',
        descricao: 'Participar de pelo menos uma atividade social por semana',
        data: new Date(Date.now() - 259200000).toISOString(),
        categoria: 'Social',
        pacienteId: '2',
      },
    ],
  },
  {
    id: '3',
    nome: 'Ana Costa',
    email: 'ana@email.com',
    telefone: '(11) 99999-0003',
    atividades: [
      {
        id: 'act6',
        titulo: 'Leitura Terapêutica',
        descricao:
          "Ler capítulo do livro 'Inteligência Emocional' e fazer anotações",
        data: new Date().toISOString(),
        categoria: 'Educação',
        pacienteId: '3',
      },
      {
        id: 'act7',
        titulo: 'Técnica de Relaxamento Muscular',
        descricao: 'Praticar relaxamento muscular progressivo antes de dormir',
        data: new Date(Date.now() - 86400000).toISOString(),
        categoria: 'Relaxamento',
        pacienteId: '3',
      },
    ],
  },
];
