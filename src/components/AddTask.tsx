import { useState, FormEvent } from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { Task } from '../types';

interface AddTaskProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
  onCancel: () => void;
}

export default function AddTask({ onAddTask, onCancel }: AddTaskProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // High-fidelity Date handling
  const [selectedDate, setSelectedDate] = useState('2026-10-12'); // matches mockup "12 de Outubro"
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [priority, setPriority] = useState<'Baixa' | 'Média' | 'Alta'>('Média');

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return 'Hoje, 12 de Outubro';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const isToday = dateObj.toDateString() === today.toDateString();
        const isTomorrow = dateObj.toDateString() === tomorrow.toDateString();

        const formatMonthBr = (m: number) => {
          const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
          ];
          return months[m];
        };

        const formatDayOfWeek = (d: number) => {
          const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
          return days[d];
        };

        const day = dateObj.getDate();
        const monthName = formatMonthBr(dateObj.getMonth());
        const dayOfWeek = formatDayOfWeek(dateObj.getDay());

        if (isToday) return `Hoje, ${day} de ${monthName}`;
        if (isTomorrow) return `Amanhã, ${day} de ${monthName}`;
        return `${dayOfWeek}, ${day} de ${monthName}`;
      }
    } catch (e) {
      // fallback
    }
    return dateStr;
  };

  const getDayPeriod = (timeStr: string) => {
    if (!timeStr) return 'Manhã';
    const hour = parseInt(timeStr.split(':')[0]);
    if (isNaN(hour)) return 'Manhã';
    if (hour >= 6 && hour < 12) return 'Manhã';
    if (hour >= 12 && hour < 18) return 'Tarde';
    return 'Noite';
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title,
      description: description || 'Sem descrição adicional.',
      date: formatDisplayDate(selectedDate),
      time: selectedTime,
      priority,
    });
  };

  return (
    <div className="mx-auto max-w-md bg-transparent pb-32 pt-4 px-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Task Title */}
        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wide text-[#0c3d5e] block">
            Título da Tarefa
          </label>
          <input
            id="task-title-input"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Reunião de Planejamento"
            className="w-full rounded-2xl bg-[#eeedf1]/80 px-5 py-4 text-base placeholder-gray-400 focus:placeholder-gray-300 focus:bg-[#eeedf1] text-[#1a1c1e] transition-all duration-300 outline-none border-none ring-1 ring-slate-100 focus:ring-[#2e90c9]"
          />
        </div>

        {/* Description / Descrição */}
        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wide text-[#0c3d5e] block">
            Descrição
          </label>
          <textarea
            id="task-desc-input"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Adicione detalhes sobre sua tarefa aqui..."
            className="w-full rounded-2xl bg-[#eeedf1]/80 px-5 py-4 text-base placeholder-gray-400 focus:placeholder-gray-300 focus:bg-[#eeedf1] text-[#1a1c1e] transition-all duration-300 outline-none border-none ring-1 ring-slate-100 focus:ring-[#2e90c9] resize-none"
          />
        </div>

        {/* Side-by-side interactive date and time selectors */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Calendar Selector Card */}
          <div className="relative rounded-2xl border border-[#eeedf1] bg-white p-4 shadow-[0_4px_16px_rgba(12,61,94,0.03)] hover:shadow-sm duration-300 flex flex-col justify-between group">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#2e90c9] mb-1">
              <Calendar className="h-4 w-4" />
              <span>DATA</span>
            </div>
            <div className="mt-1">
              <span className="text-[15px] font-bold text-[#1a1c1e] block truncate">
                {formatDisplayDate(selectedDate).split(',')[0]}
              </span>
              <span className="text-xs text-[#42474e] block opacity-80 mt-0.5 truncate">
                {formatDisplayDate(selectedDate).split(',')[1] || 'Outubro'}
              </span>
            </div>
            {/* Styled overlay native picker */}
            <input
              id="native-date-picker"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Time Selector Card */}
          <div className="relative rounded-2xl border border-[#eeedf1] bg-white p-4 shadow-[0_4px_16px_rgba(12,61,94,0.03)] hover:shadow-sm duration-300 flex flex-col justify-between group">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#2e90c9] mb-1">
              <Clock className="h-4 w-4" />
              <span>HORA</span>
            </div>
            <div className="mt-1">
              <span className="text-[15px] font-bold text-[#1a1c1e] block">
                {selectedTime}
              </span>
              <span className="text-xs text-[#42474e] block opacity-80 mt-0.5">
                {getDayPeriod(selectedTime)}
              </span>
            </div>
            {/* Styled overlay native time picker */}
            <input
              id="native-time-picker"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

        </div>

        {/* Priority Selection */}
        <div className="space-y-3">
          <label className="text-sm font-semibold tracking-wider text-[#0c3d5e] block uppercase">
            Nível de Prioridade
          </label>
          
          <div className="grid grid-cols-3 gap-3">
            {(['Baixa', 'Média', 'Alta'] as const).map((p) => {
              const isSelected = priority === p;
              return (
                <button
                  key={p}
                  id={`priority-btn-${p}`}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-3.5 px-4 rounded-2xl font-semibold text-sm transition-all duration-300 border text-center active:scale-[0.98] cursor-pointer ${
                    isSelected
                      ? 'bg-[#cae6ff] text-[#004b6f] border-[#8cceff] shadow-sm font-bold'
                      : 'bg-white text-[#42474e] border-[#eeedf1] hover:bg-[#f3f3f6]'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons Block */}
        <div className="pt-4 flex flex-col gap-3">
          {/* Submit Tall pill button */}
          <button
            id="save-task-btn"
            type="submit"
            className="w-full h-14 rounded-full bg-[#002740] text-white font-bold text-base flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(0,39,64,0.15)] hover:bg-[#0c3d5e] hover:shadow-[0_8px_24px_rgba(0,39,64,0.25)] transition-all duration-300 cursor-pointer active:scale-[0.98]"
          >
            <CheckCircle className="h-5 w-5 stroke-[2.5px]" />
            <span>Salvar Tarefa</span>
          </button>

          {/* Cancel Button */}
          <button
            id="cancel-task-btn"
            type="button"
            onClick={onCancel}
            className="w-full h-14 rounded-full bg-white text-[#42474e] border border-[#eeedf1] font-semibold text-base flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all duration-300 cursor-pointer active:scale-[0.98]"
          >
            Cancelar
          </button>
        </div>

      </form>
    </div>
  );
}
