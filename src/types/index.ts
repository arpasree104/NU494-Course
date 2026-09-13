export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'GUEST';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  studentId?: string;
  academicYearId?: string;
  cohort?: string;
  groupId?: string;
  phone?: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED';
  photoUrl?: string;
  lastLoginAt?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  parentId?: string | null;
  order: number;
  visibility: 'ALL' | 'TEACHER_ONLY' | 'STUDENT_ONLY' | 'ADMIN_ONLY' | 'PUBLIC' | 'HIDDEN';
  enabled: boolean;
  badge?: string;
}

export interface ClassroomLink {
  id: string;
  label: string;
  url: string;
  visibleTo: 'ALL' | 'TEACHER' | 'STUDENT';
  order: number;
}

export interface AppSettings {
  courseName: string;
  courseCode: string;
  facultyName: string;
  currentAcademicYear: string;
  contactEmail: string;
}
