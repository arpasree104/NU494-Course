import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Role, User } from '../types';
import { initGoogleSignIn, signOut as googleSignOut, api, USE_MOCK } from '../services/api';

interface AuthContextType {
  user: User | null;
  role: Role;
  loginAs: (role: Role) => void;
  logout: () => void;
}

const mockUsers: Record<Role, User | null> = {
  GUEST: null,
  STUDENT: { id: 's1', email: 'student@test.com', fullName: 'นักศึกษา สมมติ', role: 'STUDENT', status: 'ACTIVE', academicYearId: 'AY2569' },
  TEACHER: { id: 't1', email: 'teacher@test.com', fullName: 'อ.ใจดี เรียนสนุก', role: 'TEACHER', status: 'ACTIVE' },
  ADMIN: { id: 'a1', email: 'admin@test.com', fullName: 'ผู้ดูแลระบบ', role: 'ADMIN', status: 'ACTIVE' },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('GUEST');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Initialize Google Sign In
    initGoogleSignIn(async (idToken) => {
      try {
        const userData = await api.auth.me();
        setUser(userData);
        setRole(userData.role);
      } catch (error) {
        console.error("Login failed:", error);
        setRole('GUEST');
        setUser(null);
      }
    });

    // Check if token already exists in localStorage (unless using MOCK)
    if (!USE_MOCK && localStorage.getItem('nu494_id_token')) {
      api.auth.me().then(userData => {
        setUser(userData);
        setRole(userData.role);
      }).catch(e => {
        console.error("Session expired or invalid", e);
        googleSignOut();
      });
    }
  }, []);

  const loginAs = (newRole: Role) => {
    setRole(newRole);
    setUser(mockUsers[newRole]);
  };

  const logout = () => {
    googleSignOut();
    setRole('GUEST');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
