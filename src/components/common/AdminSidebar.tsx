import React from 'react';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  School,
  Database,
  ShieldCheck,
  KeyRound,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { useApp, AdminNavPage } from '../../context/AppContext';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const {
    adminPage,
    setAdminPage,
    students,
    teachers,
    classes,
    questions,
    googleUser,
    openAuthModal,
    setRole,
    currentUser,
  } = useApp();

  const navItems: Array<{
    id: AdminNavPage;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
  }> = [
    { id: 'dashboard', label: 'Admin Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users, badge: `${students.length}` },
    { id: 'teachers', label: 'Teachers & Admins', icon: Briefcase, badge: `${teachers.length}` },
    { id: 'classes', label: 'Classes', icon: School, badge: `${classes.length}` },
    { id: 'system', label: 'System Settings', icon: Database },
  ];

  const handleNav = (page: AdminNavPage) => {
    setAdminPage(page);
    onClose();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0F172A] text-slate-200 w-64 border-r border-slate-800">
      {/* Admin Profile snippet */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between text-[11px] uppercase font-bold text-indigo-400 tracking-wider mb-1.5">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrator Portal</span>
          </div>
          <button
            onClick={() => openAuthModal('admin')}
            className="text-[10px] text-indigo-300 hover:text-indigo-200 font-medium lowercase bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800"
          >
            auth
          </button>
        </div>
        <div className="flex items-center space-x-3 mt-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {googleUser?.name ? googleUser.name[0] : 'AD'}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate">
              {googleUser ? googleUser.name : 'System Administrator'}
            </h4>
            <p className="text-[10px] text-slate-400 truncate">
              {googleUser ? googleUser.email : 'dcjones1441@gmail.com'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Management Controls
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = adminPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-indigo-700 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-4 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Portal Workspaces
        </div>
        <div className="space-y-2">
          <button
            type="button"
            title={`Open your teacher workspace (${currentUser?.email || 'signed-in account'})`}
            onClick={() => { setRole('teacher'); onClose(); }}
            className="w-full flex items-start gap-3 rounded-xl border border-teal-800/70 bg-teal-950/40 px-3 py-3 text-left hover:bg-teal-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 transition-colors"
          >
            <Briefcase className="w-4 h-4 shrink-0 text-teal-300 mt-0.5" />
            <span className="min-w-0"><span className="block text-xs font-semibold text-teal-100">My Teacher Workspace</span><span className="block truncate text-[10px] text-teal-300 mt-1">{currentUser?.email || 'Your assigned classes'}</span></span>
          </button>
          <button
            type="button"
            title="Preview as Demo Student without changing real student records"
            onClick={() => { setRole('student'); onClose(); }}
            className="w-full flex items-start gap-3 rounded-xl border border-blue-800/70 bg-blue-950/40 px-3 py-3 text-left hover:bg-blue-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors"
          >
            <GraduationCap className="w-4 h-4 shrink-0 text-blue-300 mt-0.5" />
            <span className="min-w-0"><span className="block text-xs font-semibold text-blue-100">Student Preview</span><span className="block text-[10px] text-blue-300 mt-1">Demo Student · Practice only</span></span>
          </button>
        </div>
      </nav>

      {/* Supabase Status Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60">
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 text-[11px] space-y-1">
          <div className="flex items-center justify-between text-slate-300">
            <span className="font-semibold text-white">Supabase Cloud</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-[10px] text-slate-400 truncate">
            Project: <code className="text-indigo-300">gfdbcrfqbsowlbnprqqn</code>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop static sidebar */}
      <aside className="hidden md:flex flex-col shrink-0">{sidebarContent}</aside>

      {/* Mobile drawer with backdrop */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <div className="relative flex flex-col flex-1 max-w-xs w-full bg-slate-900 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};


