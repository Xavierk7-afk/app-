import { CheckSquare, PlusCircle, BarChart3, User } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function BottomNavigation({ activeTab, setActiveTab }: BottomNavigationProps) {
  const tabs = [
    { id: 'tarefas' as ActiveTab, label: 'Tarefas', icon: CheckSquare },
    { id: 'nova' as ActiveTab, label: 'Nova', icon: PlusCircle },
    { id: 'graficos' as ActiveTab, label: 'Gráficos', icon: BarChart3 },
    { id: 'perfil' as ActiveTab, label: 'Perfil', icon: User },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6">
      <nav id="bottom-nav-container" className="flex w-full max-w-md items-center justify-between rounded-full bg-white/95 px-4 py-2.5 shadow-[0_8px_32px_rgba(12,61,94,0.12)] backdrop-blur-md border border-[#eeedf1]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col md:flex-row items-center justify-center gap-1.5 px-5 py-2.5 rounded-full transition-all duration-300 md:gap-2 ${
                isActive
                  ? 'bg-[#cae6ff] text-[#004b6f] font-semibold scale-105 shadow-sm'
                  : 'text-[#42474e] hover:text-[#0c3d5e] hover:bg-[#f3f3f6]'
              }`}
            >
              <Icon id={`nav-icon-${tab.id}`} className={`h-5 w-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              <span id={`nav-label-${tab.id}`} className="text-xs tracking-tight md:text-sm font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
