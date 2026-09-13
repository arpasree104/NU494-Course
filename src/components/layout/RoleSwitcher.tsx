import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';

export function RoleSwitcher() {
  const { role, loginAs, logout } = useAuth();
  const roles: Role[] = ['GUEST', 'STUDENT', 'TEACHER', 'ADMIN'];

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-surface-100 rounded-xl shadow-lg p-3 flex flex-col gap-2 opacity-50 hover:opacity-100 transition-opacity">
      <p className="text-[10px] font-bold text-ink-500 uppercase tracking-wider text-center">Test Role Switcher</p>
      <div className="flex gap-2">
        {roles.map(r => (
          <button
            key={r}
            onClick={() => r === 'GUEST' ? logout() : loginAs(r)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${role === r ? 'bg-brand-600 text-white' : 'bg-surface-50 text-ink-700 hover:bg-surface-100'}`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}
