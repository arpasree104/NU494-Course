import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useConfig } from '../../context/ConfigContext';
import { useAuth } from '../../context/AuthContext';
import { usePermission } from '../../hooks/usePermission';
import { BookOpen, LogOut, Menu, X, ChevronDown, User as UserIcon } from 'lucide-react';
import { renderGoogleButton, USE_MOCK } from '../../services/api';

export function Header() {
  const { settings, menus, classroomLinks } = useConfig();
  const { user, logout } = useAuth();
  const { canSeeMenu } = usePermission();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const googleBtnRef = useRef<HTMLDivElement>(null);

  // Filter main level menus
  const mainMenus = menus.filter(m => !m.parentId && canSeeMenu(m));

  useEffect(() => {
    if (!user && !USE_MOCK && googleBtnRef.current) {
      // Need a small timeout to let the external GSI script load if it hasn't
      setTimeout(() => {
        if (googleBtnRef.current) renderGoogleButton(googleBtnRef.current);
      }, 500);
    }
  }, [user]);

  const handleClassroomClick = () => {
    // Basic logic for phase 1: Just pick the first visible link
    const link = classroomLinks.find(l => l.visibleTo === 'ALL' || l.visibleTo === user?.role);
    if (link) {
      window.open(link.url, '_blank');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 border-b border-surface-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold group-hover:bg-brand-700 transition-colors">
              NU
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-ink-900 text-lg leading-tight">{settings?.courseCode || 'พย. 494'}</h1>
              <p className="text-[10px] text-ink-500">{settings?.facultyName}</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {mainMenus.map(menu => {
              const subMenus = menus.filter(m => m.parentId === menu.id && canSeeMenu(m));
              const isActive = location.pathname === menu.path || (menu.path !== '/' && location.pathname.startsWith(menu.path));
              
              if (subMenus.length > 0) {
                return (
                  <div key={menu.id} className="relative group" onMouseEnter={() => setDropdownOpen(menu.id)} onMouseLeave={() => setDropdownOpen(null)}>
                    <button className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${isActive ? 'text-brand-700 bg-brand-50' : 'text-ink-700 hover:bg-surface-50 hover:text-ink-900'}`}>
                      {menu.label}
                      <ChevronDown size={14} className="opacity-50" />
                    </button>
                    {dropdownOpen === menu.id && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-surface-100 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2">
                        {subMenus.map(sub => (
                          <Link key={sub.id} to={sub.path} className="block px-4 py-2 text-sm text-ink-700 hover:bg-surface-50 hover:text-brand-700" onClick={() => setDropdownOpen(null)}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <Link key={menu.id} to={menu.path} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-brand-700 bg-brand-50' : 'text-ink-700 hover:bg-surface-50 hover:text-ink-900'}`}>
                  {menu.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handleClassroomClick}
              className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-colors shadow-sm"
            >
              <BookOpen size={16} />
              <span>Classroom</span>
            </button>

            {/* Auth Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-1 rounded-full border border-surface-100 hover:bg-surface-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500">
                  <div className="w-8 h-8 rounded-full bg-surface-100 flex items-center justify-center text-ink-500 overflow-hidden">
                    {user.photoUrl ? <img src={user.photoUrl} alt="" /> : <UserIcon size={16} />}
                  </div>
                </button>
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-surface-100 rounded-xl shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-4 py-3 border-b border-surface-50 mb-2">
                    <p className="text-sm font-semibold text-ink-900 truncate">{user.fullName}</p>
                    <p className="text-xs text-ink-500 capitalize">{user.role}</p>
                  </div>
                  {user.role === 'STUDENT' && (
                    <Link to="/assignments" className="block px-4 py-2 text-sm text-ink-700 hover:bg-surface-50 hover:text-brand-700">
                      งานของฉัน
                    </Link>
                  )}
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                    <LogOut size={16} /> ออกจากระบบ
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                {USE_MOCK ? (
                  <button className="text-sm font-semibold text-brand-600 hover:text-brand-700">เข้าสู่ระบบ (Mock)</button>
                ) : (
                  <div ref={googleBtnRef} className="min-w-[120px] h-[40px]"></div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 text-ink-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (simplified for phase 1) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white pt-16 overflow-y-auto">
          <div className="p-4 space-y-4">
            <button 
              onClick={handleClassroomClick}
              className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-brand-600 text-white font-semibold rounded-xl"
            >
              <BookOpen size={18} /> เข้าสู่ Classroom
            </button>
            <nav className="space-y-2 mt-6">
              {menus.filter(m => canSeeMenu(m)).map(menu => (
                <Link key={menu.id} to={menu.path || '#'} onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-ink-700 font-medium border-b border-surface-50">
                  {menu.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
