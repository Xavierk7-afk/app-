import { Calendar, Trash2, Clock, AlertTriangle } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function TaskCard({ task, onToggleComplete, onDeleteTask }: TaskCardProps) {
  // Determine border/text based on priority
  const getPriorityBadge = (p: Task['priority']) => {
    switch (p) {
      case 'Alta':
        return <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-[10px] font-semibold border border-red-100 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Alta</span>;
      case 'Média':
        return <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-semibold border border-blue-105 flex items-center gap-1">Média</span>;
      case 'Baixa':
        return <span className="px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 text-[10px] font-semibold border border-gray-100">Baixa</span>;
    }
  };

  return (
    <div
      id={`task-card-${task.id}`}
      style={{ contentVisibility: 'auto' }}
      className="group relative flex items-center justify-between bg-white rounded-2xl p-5 border border-[#eeedf1] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(12,61,94,0.06)] active:scale-[0.98] outline-none"
    >
      <div className="flex items-start gap-4 flex-1 mr-2">
        {/* Tactile Circle Checkbox */}
        <button
          id={`toggle-btn-${task.id}`}
          onClick={() => onToggleComplete(task.id)}
          className="mt-1 flex-shrink-0 cursor-pointer transition-transform duration-200 active:scale-90"
          aria-label={task.completed ? "Marcar como pendente" : "Marcar como concluída"}
        >
          {task.completed ? (
            <div
              id={`checked-circle-${task.id}`}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6fd1d7] transition-all duration-300"
            >
              <svg
                className="h-3.5 w-3.5 text-white stroke-[3.5px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div
              id={`unchecked-circle-${task.id}`}
              className="h-6 w-6 rounded-full border-[1.8px] border-[#2e90c9] bg-white transition-all duration-300 hover:bg-[#cae6ff]/20"
            />
          )}
        </button>

        {/* Task text content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              id={`task-title-${task.id}`}
              className={`text-[16px] md:text-[17px] font-bold tracking-tight text-[#1a1c1e] transition-colors ${
                task.completed ? 'line-through text-[#80a8ce] font-medium' : ''
              }`}
            >
              {task.title}
            </h3>
            {getPriorityBadge(task.priority)}
          </div>
          
          <p id={`task-desc-${task.id}`} className="mt-1 text-sm text-[#42474e] leading-snug line-clamp-2">
            {task.description}
          </p>

          <div className="mt-3 flex items-center gap-3 text-xs text-[#2e90c9] font-medium">
            <div className="flex items-center gap-1.5 opacity-90">
              <Calendar className="h-3.5 w-3.5 stroke-[2px]" />
              <span>{task.date}</span>
            </div>
            {task.time && (
              <div className="flex items-center gap-1 px-1.5 py-0.5 roundedbg-slate-50 opacity-90 text-[#0c3d5e]">
                <Clock className="h-3.5 w-3.5" />
                <span>{task.time}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete button (beautiful hover reveal on group) */}
      <button
        id={`delete-btn-${task.id}`}
        onClick={() => onDeleteTask(task.id)}
        className="text-gray-300 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-colors duration-200"
        title="Excluir tarefa"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
