import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, LogOut, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully. See you soon!');
  };

  const getInitials = (email) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  };

  const formatDate = () => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <nav className="glass-panel border-b border-slate-800/40 sticky top-0 z-40 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      {/* Brand logo */}
      <div className="flex items-center gap-2.5">
        <div className="p-2 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg shadow-md shadow-violet-500/10">
          <CheckSquare className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white glow-violet">
          TaskSphere
        </span>
      </div>

      {/* Center/Right items */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Date capsule */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3.5 py-1.5 rounded-full text-slate-300 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-violet-400" />
          <span>{formatDate()}</span>
        </div>

        {/* User Info capsule */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-full">
              {/* Avatar circle */}
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-wider">
                {getInitials(user.email)}
              </div>
              <span className="text-slate-200 text-xs font-semibold hidden md:inline truncate max-w-[150px]">
                {user.email}
              </span>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-xl transition-all hover:scale-105 active:scale-95 duration-200 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
