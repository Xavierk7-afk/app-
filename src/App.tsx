import { useState, useEffect } from 'react';
import { Menu, Plus, Sparkles, LayoutGrid, Calendar, LogOut, CheckCircle, ChevronRight, X } from 'lucide-react';
import { Task, UserProfile, ActiveTab } from './types';
import { INITIAL_TASKS, INITIAL_PROFILE, MOTIVATIONAL_QUOTES } from './data';
import TaskCard from './components/TaskCard';
import AddTask from './components/AddTask';
import Statistics from './components/Statistics';
import Profile from './components/Profile';
import BottomNavigation from './components/BottomNavigation';

export default function App() {
  // Load tasks from localStorage or seed
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('serene_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_TASKS;
      }
    }
    return INITIAL_TASKS;
  });

  // Load profile from localStorage or seed
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('serene_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PROFILE;
      }
    }
    return INITIAL_PROFILE;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('tarefas');
  const [filter, setFilter] = useState<'Todos' | 'Completos' | 'Pendentes'>('Todos');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem('serene_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('serene_profile', JSON.stringify(profile));
  }, [profile]);

  // Show a custom auto-dimming toast
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Handlers
  const handleToggleComplete = (id: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const nextCompleted = !task.completed;
          showToast(
            nextCompleted ? 'Tarefa finalizada! Excelente trabalho.' : 'Tarefa marcada como pendente.',
            nextCompleted ? 'success' : 'info'
          );
          return { ...task, completed: nextCompleted };
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => {
      const taskToDelete = prev.find(t => t.id === id);
      const filtered = prev.filter(t => t.id !== id);
      showToast(taskToDelete ? `Tarefa "${taskToDelete.title}" removida com sucesso.` : 'Tarefa excluída.');
      return filtered;
    });
  };

  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [newTask, ...prev]);
    setActiveTab('tarefas');
    showToast('Nova tarefa criada! Organize seu dia.', 'success');
  };

  const handleUpdateProfile = (updatedFields: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updatedFields }));
    showToast('Perfil atualizado com sucesso!', 'success');
  };

  const handleLogout = () => {
    // Reset to initial seed configurations so the user has beautiful data to play with
    setTasks(INITIAL_TASKS);
    setProfile(INITIAL_PROFILE);
    setActiveTab('tarefas');
    showToast('Sistema redefinido para as configurações de fábrica.', 'info');
  };

  const changeQuote = () => {
    setQuoteIndex(prev => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completos') return task.completed;
    if (filter === 'Pendentes') return !task.completed;
    return true; // "Todos"
  });

  // Count constants
  const completedCount = tasks.filter(t => t.completed).length;

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'tarefas':
        return 'Minhas Tarefas';
      case 'nova':
        return 'Nova Tarefa';
      case 'graficos':
        return 'Estatísticas';
      case 'perfil':
        return 'Minhas Tarefas'; // keep header text similar to mockups or customized
      default:
        return 'Minhas Tarefas';
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9fc] text-[#1a1c1e] relative select-none">
      
      {/* Top Beautiful Header Panel */}
      <header className="sticky top-0 z-40 bg-[#f9f9fc]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-[#eeedf1]/40">
        <button
          id="hamburger-menu-btn"
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Abrir menu de navegação"
        >
          <Menu className="h-6 w-6 text-[#1a1c1e] stroke-[2px]" />
        </button>
        
        <h1 id="app-header-title" className="text-xl font-extrabold tracking-tight text-[#1a1c1e]">
          {getHeaderTitle()}
        </h1>

        <button
          id="header-profile-shortcut"
          onClick={() => setActiveTab('perfil')}
          className="h-10 w-10 rounded-full overflow-hidden border border-slate-200 transition-transform active:scale-95 shadow-sm cursor-pointer"
          aria-label="Ir para o perfil"
        >
          <img
            src={profile.avatarUrl}
            alt="User thumbnail"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        </button>
      </header>

      {/* Styled Interactive Toast */}
      {toast && (
        <div
          id="toast-notification"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3.5 rounded-2xl shadow-lg border border-[#eeedf1] bg-white animate-slide-in text-sm font-semibold max-w-sm w-[90%]"
        >
          <div className={`h-2.5 w-2.5 rounded-full ${toast.type === 'success' ? 'bg-[#6fd1d7]' : toast.type === 'error' ? 'bg-red-500' : 'bg-[#e9ce2c]'}`} />
          <p className="text-[#1a1c1e] flex-1 truncate">{toast.message}</p>
        </div>
      )}

      {/* Primary Workspace Stage */}
      <main className="max-w-md mx-auto relative">
        
        {/* VIEW 1: TASK LIST */}
        {activeTab === 'tarefas' && (
          <div className="px-6 py-4 space-y-6 animate-fade-in pb-32">
            
            {/* Category pills filter selectors */}
            <div className="flex gap-2.5 overflow-x-auto py-1 scrollbar-hide">
              {(['Todos', 'Completos', 'Pendentes'] as const).map((cat) => {
                const isActive = filter === cat;
                return (
                  <button
                    key={cat}
                    id={`filter-pill-${cat.toLowerCase()}`}
                    onClick={() => setFilter(cat)}
                    className={`px-5 py-2 rounded-full font-bold text-xs tracking-wide transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#002740] text-white shadow-sm'
                        : 'bg-[#eeedf1]/70 text-[#42474e] hover:bg-[#eeedf1]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Listed tasks */}
            <div className="space-y-4">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onDeleteTask={handleDeleteTask}
                  />
                ))
              ) : (
                <div className="bg-white rounded-2xl border border-dashed border-[#eeedf1] p-10 text-center space-y-3">
                  <span className="text-4xl">😴</span>
                  <p className="text-sm font-bold text-[#1a1c1e]">Nenhuma tarefa encontrada</p>
                  <p className="text-xs text-[#42474e] leading-snug">Sua mente está livre de pendências. Aproveite o momento ou adicione novas metas!</p>
                </div>
              )}
            </div>

            {/* Info Completed Badge Tracker */}
            <div id="completed-stats-banner" className="bg-white rounded-2xl border border-[#eeedf1] p-5 shadow-[0_4px_16px_rgba(12,61,94,0.02)] flex items-center gap-5">
              <div className="h-14 w-14 rounded-full bg-[#cae6ff] flex items-center justify-center font-extrabold text-[19px] text-[#004e73] flex-shrink-0">
                {completedCount}
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[#2e90c9] uppercase block">
                  TAREFAS
                </span>
                <span className="text-lg font-extrabold text-[#1a1c1e] block leading-tight">
                  Completas
                </span>
              </div>
            </div>

            {/* Beautiful Motivational Citation Card with watermark quotes */}
            <div
              id="motivational-quote-card"
              onClick={changeQuote}
              className="relative bg-[#cae6ff]/35 hover:bg-[#cae6ff]/50 rounded-2xl p-6 border border-[#cae6ff]/65 transition-colors cursor-pointer group overflow-hidden"
              title="Clique para trocar a frase"
            >
              {/* Double quotes graphic watermark */}
              <div className="absolute right-3 top-2 text-[#2e90c9]/10 font-bold text-7xl select-none group-hover:scale-110 duration-500 pointer-events-none">
                ❝
              </div>
              
              <blockquote className="space-y-2">
                <p id="quote-text" className="text-[14px] leading-relaxed italic text-[#004e73] font-medium pr-6">
                  "{MOTIVATIONAL_QUOTES[quoteIndex].text}"
                </p>
                <cite id="quote-author" className="text-xs font-semibold text-[#2e90c9] block not-italic">
                  — {MOTIVATIONAL_QUOTES[quoteIndex].author}
                </cite>
              </blockquote>
            </div>

            {/* Monthly Analytics Teaser promo banner */}
            <div
              id="analytics-promo-banner"
              onClick={() => setActiveTab('graficos')}
              className="bg-[#002740] rounded-[24px] p-6 text-white shadow-[0_8px_24px_rgba(12,61,94,0.08)] flex items-center justify-between cursor-pointer group relative overflow-hidden transition-all duration-300 active:scale-[0.99] hover:shadow-lg"
            >
              <div className="space-y-1 z-10">
                <h3 className="text-lg font-black tracking-tight">
                  Estatísticas
                </h3>
                <p className="text-xs text-[#80a8ce] font-medium">
                  Sua produtividade mensal
                </p>
              </div>

              {/* Graphical illustration wrapper inside card */}
              <div className="flex items-end gap-1.5 h-10 w-16 opacity-85 z-10">
                <div className="w-2.5 bg-[#6fd1d7] h-[40%] rounded-sm" />
                <div className="w-2.5 bg-white h-[80%] rounded-sm group-hover:h-[90%] duration-300" />
                <div className="w-2.5 bg-sky-300 h-[60%] rounded-sm" />
              </div>

              {/* Floating action button plus icon */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('nova');
                }}
                className="absolute right-4 -bottom-3 mr-1 h-14 w-14 bg-[#6fd1d7] hover:bg-[#2e90c9] text-[#002740] hover:text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 duration-200 cursor-pointer"
                title="Adicionar Tarefa"
              >
                <Plus className="h-6 w-6 stroke-[3px]" />
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: NEW TASK */}
        {activeTab === 'nova' && (
          <AddTask
            onAddTask={handleAddTask}
            onCancel={() => {
              setActiveTab('tarefas');
              showToast('Criação de tarefa cancelada.', 'info');
            }}
          />
        )}

        {/* VIEW 3: GRAPHS & ANALYTICS */}
        {activeTab === 'graficos' && (
          <Statistics
            tasks={tasks}
            onBack={() => setActiveTab('tarefas')}
          />
        )}

        {/* VIEW 4: USER PROFILE SETTINGS */}
        {activeTab === 'perfil' && (
          <Profile
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onLogout={handleLogout}
          />
        )}

      </main>

      {/* Hanging floating FAB trigger when Tasks tab is loaded as standard list view */}
      {activeTab === 'tarefas' && (
        <div className="fixed bottom-24 right-6 z-40 md:right-[calc(50%-12rem)]">
          <button
            id="floating-action-fab"
            onClick={() => setActiveTab('nova')}
            className="h-14 w-14 rounded-full bg-[#6fd1d7] hover:bg-[#2e90c9] text-[#002740] hover:text-white flex items-center justify-center shadow-[0_8px_24px_rgba(111,209,215,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Criar nova tarefa rapidamente"
          >
            <Plus className="h-7 w-7 stroke-[3px]" />
          </button>
        </div>
      )}

      {/* Floating Pill Bottom Tab Navigation Bar */}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Left side flyout drawer menu component */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay mask */}
          <div
            id="drawer-overlay"
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
          />
          
          {/* Drawer container panel */}
          <div
            id="drawer-panel"
            className="relative flex w-full max-w-xs flex-col bg-[#f9f9fc] p-6 shadow-2xl transition-transform duration-300 h-full border-r border-[#eeedf1] animate-[slide-right_0.3s_ease-out]"
          >
            
            {/* Close button row */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-[#0c3d5e]">
                <Sparkles className="h-5 w-5 fill-[#6fd1d7] text-[#6fd1d7]" />
                <span className="font-extrabold tracking-tight text-sm uppercase">Serene Life</span>
              </div>
              <button
                id="close-drawer-btn"
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 text-gray-500 hover:text-black transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer User segment summary */}
            <div className="bg-white rounded-2xl p-4 border border-[#eeedf1] mb-6 flex items-center gap-3">
              <div className="h-11 w-11 rounded-full overflow-hidden border">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <span className="text-sm font-bold text-gray-800 block leading-tight truncate">
                  {profile.name}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#2e90c9]">
                  Nível Master
                </span>
              </div>
            </div>

            {/* Menu Items Links */}
            <nav className="flex-1 space-y-2">
              <button
                onClick={() => {
                  setActiveTab('tarefas');
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                  activeTab === 'tarefas' ? 'bg-[#cae6ff] text-[#004b6f]' : 'hover:bg-slate-100 text-[#42474e]'
                }`}
              >
                <LayoutGrid className="h-5 w-5" />
                <span>Minhas Tarefas</span>
                <ChevronRight className="h-4 w-4 ml-auto opacity-40" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('graficos');
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                  activeTab === 'graficos' ? 'bg-[#cae6ff] text-[#004b6f]' : 'hover:bg-slate-100 text-[#42474e]'
                }`}
              >
                <Calendar className="h-5 w-5" />
                <span>Estatísticas Detalhadas</span>
                <ChevronRight className="h-4 w-4 ml-auto opacity-40" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('nova');
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                  activeTab === 'nova' ? 'bg-[#cae6ff] text-[#004b6f]' : 'hover:bg-slate-100 text-[#42474e]'
                }`}
              >
                <Plus className="h-5 w-5" />
                <span>Agendar Nova Tarefa</span>
                <ChevronRight className="h-4 w-4 ml-auto opacity-40" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('perfil');
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                  activeTab === 'perfil' ? 'bg-[#cae6ff] text-[#004b6f]' : 'hover:bg-slate-100 text-[#42474e]'
                }`}
              >
                <CheckCircle className="h-5 w-5" />
                <span>Meu Perfil</span>
                <ChevronRight className="h-4 w-4 ml-auto opacity-40" />
              </button>
            </nav>

            {/* Bottom Sair option */}
            <div className="pt-6 border-t border-[#eeedf1]">
              <button
                id="drawer-logout-btn"
                onClick={() => {
                  handleLogout();
                  setDrawerOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl text-sm font-bold transition-colors cursor-pointer"
              >
                <LogOut className="h-5 w-5" />
                <span>Reiniciar Demo</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
