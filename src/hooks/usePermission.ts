import { useAuth } from '../context/AuthContext';
import { MenuItem } from '../types';

export function usePermission() {
  const { role } = useAuth();

  const canSeeMenu = (menu: MenuItem): boolean => {
    if (!menu.enabled) return false;
    
    switch (menu.visibility) {
      case 'PUBLIC': return true;
      case 'ALL': return role !== 'GUEST';
      case 'TEACHER_ONLY': return role === 'TEACHER' || role === 'ADMIN';
      case 'STUDENT_ONLY': return role === 'STUDENT' || role === 'ADMIN';
      case 'ADMIN_ONLY': return role === 'ADMIN';
      case 'HIDDEN': return role === 'ADMIN'; // Admin can see hidden menus (maybe with a badge)
      default: return false;
    }
  };

  const isTeacherOrAdmin = role === 'TEACHER' || role === 'ADMIN';
  const isAdmin = role === 'ADMIN';
  const isStudent = role === 'STUDENT';

  return { canSeeMenu, isTeacherOrAdmin, isAdmin, isStudent };
}
