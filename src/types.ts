export interface Task {
  id: string;
  title: string;
  description: string;
  date: string; // formatted date or semantic text
  time: string; // e.g., "14:00"
  priority: 'Baixa' | 'Média' | 'Alta';
  completed: boolean;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  notifications: boolean;
  securityEnabled: boolean;
  avatarUrl: string;
}

export type ActiveTab = 'tarefas' | 'nova' | 'graficos' | 'perfil';
