import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useConfig } from '../../context/ConfigContext';
import { usePermission } from '../../hooks/usePermission';

export function ProtectedRoute({ menuId }: { menuId?: string }) {
  const { role } = useAuth();
  const { menus, loading } = useConfig();
  const { canSeeMenu } = usePermission();

  if (loading) return <div className="p-8 text-center text-ink-500">กำลังโหลด...</div>;

  if (menuId) {
    const menu = menus.find(m => m.id === menuId);
    if (!menu || !canSeeMenu(menu)) {
      return <Navigate to="/forbidden" replace />;
    }
  } else if (role === 'GUEST') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export function VisibilityGate({ visibility, children }: { visibility: 'ALL' | 'TEACHER_ONLY' | 'STUDENT_ONLY' | 'ADMIN_ONLY' | 'PUBLIC', children: React.ReactNode }) {
  const { role } = useAuth();
  
  const canSee = () => {
    switch (visibility) {
      case 'PUBLIC': return true;
      case 'ALL': return role !== 'GUEST';
      case 'TEACHER_ONLY': return role === 'TEACHER' || role === 'ADMIN';
      case 'STUDENT_ONLY': return role === 'STUDENT' || role === 'ADMIN';
      case 'ADMIN_ONLY': return role === 'ADMIN';
      default: return false;
    }
  };

  if (!canSee()) return null;
  return <>{children}</>;
}
