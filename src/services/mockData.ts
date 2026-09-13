import { MenuItem, ClassroomLink, AppSettings } from '../types';

export const mockSettings: AppSettings = {
  courseName: 'ปฏิบัติการพยาบาลผู้ป่วยภาวะวิกฤตและฉุกเฉิน',
  courseCode: 'พย. 494',
  facultyName: 'คณะพยาบาลศาสตร์ · มหาวิทยาลัย',
  currentAcademicYear: 'AY2569',
  contactEmail: 'admin@example.com'
};

export const mockMenus: MenuItem[] = [
  { id: 'home', label: 'หน้าหลัก', path: '/', order: 1, visibility: 'PUBLIC', enabled: true },
  { id: 'start', label: 'เริ่มต้นรายวิชา', path: '/start', order: 2, visibility: 'ALL', enabled: true },
  { id: 'learning', label: 'พื้นที่การเรียนรู้', path: '', order: 3, visibility: 'ALL', enabled: true },
  { id: 'icu-hub', label: 'ICU Learning Hub', path: '/icu', parentId: 'learning', order: 1, visibility: 'ALL', enabled: true },
  { id: 'er-hub', label: 'ER Learning Hub', path: '/er', parentId: 'learning', order: 2, visibility: 'ALL', enabled: true },
  { id: 'sim-center', label: 'Simulation Center', path: '/simulation', parentId: 'learning', order: 3, visibility: 'ALL', enabled: true },
  { id: 'activities', label: 'กิจกรรม', path: '', order: 4, visibility: 'ALL', enabled: true },
  { id: 'calendar', label: 'ตารางกิจกรรม', path: '/calendar', parentId: 'activities', order: 1, visibility: 'ALL', enabled: true },
  { id: 'news', label: 'ข่าวประกาศ', path: '/news', parentId: 'activities', order: 2, visibility: 'ALL', enabled: true },
  { id: 'assignments', label: 'งานที่ต้องส่ง', path: '/assignments', order: 5, visibility: 'STUDENT_ONLY', enabled: true },
  { id: 'teacher-assign', label: 'สั่งงาน & ติดตามการส่ง', path: '/teach/assignments', order: 6, visibility: 'TEACHER_ONLY', enabled: true },
  { id: 'teacher-files', label: 'คลังเอกสารอาจารย์', path: '/teach/library', order: 7, visibility: 'TEACHER_ONLY', enabled: true },
  { id: 'student-files', label: 'เอกสารประกอบการเรียน', path: '/library', order: 8, visibility: 'ALL', enabled: true },
  { id: 'admin', label: 'ผู้ดูแลระบบ', path: '/admin', order: 9, visibility: 'ADMIN_ONLY', enabled: true },
];

export const mockClassroomLinks: ClassroomLink[] = [
  { id: '1', label: 'Microsoft Teams — กลุ่ม ICU', url: 'https://teams.microsoft.com', visibleTo: 'ALL', order: 1 },
];
