import { Task, UserProfile } from './types';

export const INITIAL_PROFILE: UserProfile = {
  name: 'Yago G.',
  email: 'gaelyago83@gmail.com',
  notifications: true,
  securityEnabled: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256' // Beautiful professional portrait
};

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Revisão de Design',
    description: 'Revisar os protótipos de alta fidelidade do novo aplicativo e validar as diretrizes com o cliente final.',
    date: 'Hoje, 12 de Outubro',
    time: '14:00',
    priority: 'Alta',
    completed: false,
    createdAt: new Date(2026, 9, 12, 10, 0).toISOString()
  },
  {
    id: 'task-2',
    title: 'Call com Stakeholders',
    description: 'Apresentação de metas semanais e alinhamento das próximas sprints com a diretoria.',
    date: 'Amanhã',
    time: '09:30',
    priority: 'Média',
    completed: true,
    createdAt: new Date(2026, 9, 11, 15, 0).toISOString()
  },
  {
    id: 'task-3',
    title: 'Planejamento Semanal',
    description: 'Planejar as principais tarefas da sprint e delegar responsabilidades na equipe técnica.',
    date: 'Seg, 15 de Out',
    time: '10:00',
    priority: 'Média',
    completed: false,
    createdAt: new Date(2026, 9, 10, 9, 0).toISOString()
  },
  // Add additional tasks to total 24 Completed (Feitas) and 13 Pending (Pendentes)
  // Currently: 1 completed, 2 pending
  // We need 23 more completed and 11 more pending
  ...Array.from({ length: 23 }, (_, i) => ({
    id: `comp-${i}`,
    title: [
      'Refatoração da API',
      'Configuração do servidor',
      'Reunião diária',
      'Envio de relatório',
      'Backup semanal do banco',
      'Revisão de código',
      'Ajustes de responsividade',
      'Pesquisa com usuários',
      'Treinamento do time',
      'Atualização de dependências'
    ][i % 10] + ` #${i + 1}`,
    description: 'Tarefa histórica de produtividade completada com sucesso.',
    date: 'Dias anteriores',
    time: '17:00',
    priority: (i % 3 === 0 ? 'Alta' : i % 3 === 1 ? 'Média' : 'Baixa') as 'Baixa' | 'Média' | 'Alta',
    completed: true,
    createdAt: new Date(2026, 9, 1 - Math.floor(i / 3), 16, 0).toISOString()
  })),
  ...Array.from({ length: 11 }, (_, i) => ({
    id: `pend-${i}`,
    title: [
      'Estudar novas diretrizes',
      'Organizar workspace',
      'Revisar notas de reunião',
      'Responder e-mails pendentes',
      'Atualizar documentação de projeto',
      'Planejar posts sociais',
      'Otimizar as imagens da build',
      'Revisar contrato de licença'
    ][i % 8] + ` #${i + 1}`,
    description: 'Esta tarefa está no planejamento mensal aguardando inicialização.',
    date: 'Esta Semana',
    time: '11:00',
    priority: (i % 2 === 0 ? 'Média' : 'Baixa') as 'Baixa' | 'Média' | 'Alta',
    completed: false,
    createdAt: new Date(2026, 9, 5 + Math.floor(i / 2), 14, 0).toISOString()
  }))
];

export const MOTIVATIONAL_QUOTES = [
  { text: 'Boa sorte é o que acontece quando a oportunidade encontra o planejamento.', author: 'Thomas Edison' },
  { text: 'A persistência é o caminho do êxito.', author: 'Charles Chaplin' },
  { text: 'O único lugar onde o sucesso vem antes do trabalho é no dicionário.', author: 'Albert Einstein' },
  { text: 'No meio da dificuldade encontra-se a oportunidade.', author: 'Albert Einstein' },
  { text: 'Comece de onde você está. Use o que você tem. Faça o que puder.', author: 'Arthur Ashe' }
];
