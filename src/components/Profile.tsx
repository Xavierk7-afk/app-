import { useState } from 'react';
import { Bell, Shield, Settings, LogOut, Clipboard, Pencil, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileProps {
  profile: UserProfile;
  onUpdateProfile: (p: Partial<UserProfile>) => void;
  onLogout: () => void;
}

export default function Profile({ profile, onUpdateProfile, onLogout }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(profile.name);
  const [newEmail, setNewEmail] = useState(profile.email);
  const [notificationToggle, setNotificationToggle] = useState(profile.notifications);

  const handleSave = () => {
    onUpdateProfile({
      name: newName,
      email: newEmail,
    });
    setIsEditing(false);
  };

  const toggleNotificationsValue = () => {
    const nextVal = !notificationToggle;
    setNotificationToggle(nextVal);
    onUpdateProfile({ notifications: nextVal });
  };

  return (
    <div className="mx-auto max-w-md bg-transparent pb-32 pt-4 px-6 animate-fade-in space-y-8">
      
      {/* Profile Details Block */}
      <div className="flex flex-col items-center justify-center pt-2">
        <div className="relative">
          {/* Avatar Picture */}
          <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-[0_8px_24px_rgba(12,61,94,0.12)]">
            <img
              id="profile-avatar-img"
              src={profile.avatarUrl}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Pencil Edit Float Button */}
          <button
            id="avatar-edit-pencil"
            onClick={() => setIsEditing(!isEditing)}
            className="absolute bottom-1 right-1 h-9 w-9 bg-[#2e90c9] hover:bg-[#0c3d5e] rounded-full flex items-center justify-center text-white border-2 border-white shadow-md transition-all duration-300"
            aria-label="Editar dados do perfil"
          >
            {isEditing ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
          </button>
        </div>

        {/* Username & Email details */}
        <div className="mt-4 text-center w-full max-w-xs">
          {isEditing ? (
            <div className="space-y-2 mt-4 animate-fade-in">
              <input
                id="edit-profile-name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full text-center font-bold text-xl px-2 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2e90c9]"
                placeholder="Nome de usuário"
              />
              <input
                id="edit-profile-email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full text-center text-sm text-[#42474e] px-2 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2e90c9]"
                placeholder="E-mail"
              />
              <button
                id="save-profile-btn"
                onClick={handleSave}
                className="mt-2 w-full bg-[#2e90c9] text-white py-2 rounded-xl text-xs font-bold hover:bg-[#0c3d5e] transition-colors"
              >
                Confirmar Alterações
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <h2 id="profile-display-name" className="text-2xl font-extrabold text-[#1a1c1e] tracking-tight">
                {profile.name}
              </h2>
              <p id="profile-display-email" className="text-sm text-[#42474e] font-medium opacity-80">
                {profile.email}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Styled Options List */}
      <div className="space-y-4">
        
        {/* Option 1: Notifications with tactile toggle switch */}
        <div className="bg-white rounded-2xl border border-[#eeedf1] p-5 shadow-[0_4px_16px_rgba(12,61,94,0.02)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-[#cae6ff]/50 flex items-center justify-center text-[#2e90c9]">
              <Bell className="h-5 w-5 stroke-[2px]" />
            </div>
            <div>
              <span className="text-base font-bold text-[#1a1c1e] block">
                Notificações
              </span>
              <span className="text-xs text-[#42474e] opacity-75">
                Alertas das suas tarefas do dia
              </span>
            </div>
          </div>
          {/* Sliding Switch Toggle representation */}
          <button
            id="notifications-toggle-switch"
            onClick={toggleNotificationsValue}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${
              notificationToggle ? 'bg-[#0c3d5e]' : 'bg-[#e2e2e5]'
            }`}
            aria-label="Alternar notificações"
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                notificationToggle ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Option 2: Segurança with arrow */}
        <button
          id="option-security-btn"
          className="w-full text-left bg-white rounded-2xl border border-[#eeedf1] p-5 shadow-[0_4px_16px_rgba(12,61,94,0.02)] flex items-center justify-between group hover:border-[#2e90c9] transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-[#6fd1d7]/20 flex items-center justify-center text-[#2e90c9]">
              <Shield className="h-5 w-5 stroke-[2px]" />
            </div>
            <div>
              <span className="text-base font-bold text-[#1a1c1e] block">
                Segurança
              </span>
              <span className="text-xs text-[#42474e] opacity-75">
                Proteção de dados e acessibilidade
              </span>
            </div>
          </div>
          <svg
            className="h-5 w-5 text-[#42474e] group-hover:translate-x-1 duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Option 3: Configurações with arrow */}
        <button
          id="option-settings-btn"
          className="w-full text-left bg-white rounded-2xl border border-[#eeedf1] p-5 shadow-[0_4px_16px_rgba(12,61,94,0.02)] flex items-center justify-between group hover:border-[#2e90c9] transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-[#eeedf1] flex items-center justify-center text-[#42474e]">
              <Settings className="h-5 w-5 stroke-[2px]" />
            </div>
            <div>
              <span className="text-base font-bold text-[#1a1c1e] block">
                Configurações
              </span>
              <span className="text-xs text-[#42474e] opacity-75">
                Preferências gerais do sistema
              </span>
            </div>
          </div>
          <svg
            className="h-5 w-5 text-[#42474e] group-hover:translate-x-1 duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>

      {/* Sair/Logout block action */}
      <div className="pt-4">
        <button
          id="logout-button-sair"
          onClick={onLogout}
          className="w-full h-14 rounded-full bg-[#002740] hover:bg-[#ba1a1a] text-white font-bold text-base flex items-center justify-center gap-3.5 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-[0.98]"
        >
          <LogOut className="h-5 w-5 stroke-[2.5px]" />
          <span>Sair</span>
        </button>
      </div>

    </div>
  );
}
