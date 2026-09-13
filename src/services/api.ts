/*******************************************************************************
 * NU494 Course Hub — src/services/api.ts
 *
 * ไฟล์เดียวที่คุยกับหลังบ้าน  →  เปลี่ยนจากข้อมูลจำลองเป็นข้อมูลจริงที่นี่ที่เดียว
 *
 * วิธีใช้ :
 *   1. วางไฟล์นี้ทับ src/services/api.ts ในโปรเจกต์ที่ Google AI Studio สร้างให้
 *   2. สร้างไฟล์ .env.local แล้วใส่ค่า 2 บรรทัดนี้
 *        VITE_API_URL=https://script.google.com/macros/s/XXXXXXXX/exec
 *        VITE_GOOGLE_CLIENT_ID=XXXXXXXX.apps.googleusercontent.com
 *   3. ใส่ <script src="https://accounts.google.com/gsi/client" async defer></script>
 *      ไว้ใน index.html
 *   4. ตั้ง USE_MOCK = false
 ******************************************************************************/

import * as mock from './mockData';

/* ─── ค่าคอนฟิก ─────────────────────────────────────────────────────────── */

const API_URL = import.meta.env.VITE_API_URL as string;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

/** true = ใช้ข้อมูลจำลอง (ตอนพัฒนาหน้าเว็บ) | false = ต่อกับ Apps Script จริง */
export const USE_MOCK = !API_URL;

const TOKEN_KEY = 'nu494_id_token';

/* ─── ชนิดข้อมูลที่ใช้ร่วมกัน ─────────────────────────────────────────── */

export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'GUEST';
export type Visibility = 'PUBLIC' | 'ALL' | 'TEACHER_ONLY' | 'STUDENT_ONLY' | 'ADMIN_ONLY' | 'HIDDEN';
export type AccessLevel = 'PUBLIC' | 'STUDENT_VISIBLE' | 'TEACHER_ONLY' | 'ADMIN_ONLY';
export type AudienceType = 'ALL' | 'TEACHERS' | 'STUDENTS' | 'STUDENTS_OF_YEAR' | 'GROUP' | 'CUSTOM';
export type EmailTarget = 'NOT_SUBMITTED' | 'SUBMITTED' | 'ON_TIME' | 'LATE' | 'SELECTED' | 'ALL';

export interface ApiError { code: string; message: string }

export class ApiException extends Error {
  code: string;
  constructor(err: ApiError) {
    super(err.message);
    this.code = err.code;
    this.name = 'ApiException';
  }
}

/* ─── การจัดการโทเคน ────────────────────────────────────────────────────── */

export const token = {
  get: () => localStorage.getItem(TOKEN_KEY) || '',
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

/* ─── แกนกลางของการเรียก API ────────────────────────────────────────────── */

/**
 * ใช้ Content-Type: text/plain โดยตั้งใจ
 * เพื่อให้เบราว์เซอร์ถือเป็น "simple request" ไม่ต้องยิง OPTIONS preflight
 * (Apps Script ไม่ตอบ preflight จึงจะพังถ้าใช้ application/json)
 */
async function call<T = any>(action: string, payload: Record<string, any> = {}): Promise<T> {
  if (USE_MOCK) return mockCall<T>(action, payload);

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, idToken: token.get(), payload }),
    redirect: 'follow',
  });

  if (!res.ok) {
    throw new ApiException({ code: 'NETWORK_ERROR', message: 'เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ (HTTP ' + res.status + ')' });
  }

  const json = await res.json();
  if (!json.ok) {
    // เซสชันหมดอายุ → เคลียร์โทเคนเพื่อให้หน้าเว็บพากลับไปล็อกอินใหม่
    if (['INVALID_TOKEN', 'TOKEN_EXPIRED', 'UNAUTHENTICATED'].includes(json.error?.code)) {
      token.clear();
    }
    throw new ApiException(json.error || { code: 'UNKNOWN', message: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ' });
  }

  // เก็บส่วนต่างเวลาเครื่องกับเซิร์ฟเวอร์ไว้ใช้นับถอยหลังให้ตรง
  if (json.serverTime) syncServerClock(json.serverTime);
  return json.data as T;
}

/* ─── นาฬิกาเซิร์ฟเวอร์ ────────────────────────────────────────────────── */

let clockOffsetMs = 0;

function syncServerClock(serverIso: string) {
  const server = new Date(serverIso).getTime();
  if (!isNaN(server)) clockOffsetMs = server - Date.now();
}

/**
 * เวลาปัจจุบันตามเซิร์ฟเวอร์ — ใช้ตัวนี้กับการนับถอยหลังและป้ายสถานะทุกที่
 * หมายเหตุ : ใช้เพื่อ "แสดงผล" เท่านั้น การตัดสินทันเวลา/เกินเวลาจริง
 *            เกิดขึ้นฝั่งเซิร์ฟเวอร์เสมอ หน้าเว็บไม่มีสิทธิ์ตัดสิน
 */
export function serverNow(): Date {
  return new Date(Date.now() + clockOffsetMs);
}

/* ─── การแปลงไฟล์เป็น base64 สำหรับอัปโหลด ─────────────────────────────── */

export interface UploadFile {
  name: string;
  mimeType: string;
  dataBase64: string;
  sizeBytes: number;
}

export function fileToUpload(file: File): Promise<UploadFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve({
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        dataBase64: result.split(',')[1] || '',
        sizeBytes: file.size,
      });
    };
    reader.onerror = () => reject(new Error('อ่านไฟล์ "' + file.name + '" ไม่สำเร็จ'));
    reader.readAsDataURL(file);
  });
}

/* ─── Google Sign-In ────────────────────────────────────────────────────── */

declare global { interface Window { google?: any } }

/** เรียกครั้งเดียวตอนแอปเริ่มทำงาน เพื่อเตรียมปุ่มล็อกอิน */
export function initGoogleSignIn(onSignedIn: (idToken: string) => void) {
  if (USE_MOCK) return;
  const g = window.google;
  if (!g?.accounts?.id) {
    console.warn('ยังโหลดสคริปต์ Google Identity ไม่เสร็จ');
    return;
  }
  g.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: (resp: any) => {
      token.set(resp.credential);
      onSignedIn(resp.credential);
    },
    auto_select: true,
  });
}

/** วาดปุ่ม "ลงชื่อเข้าใช้ด้วย Google" ลงใน element ที่กำหนด */
export function renderGoogleButton(el: HTMLElement) {
  if (USE_MOCK) return;
  window.google?.accounts?.id?.renderButton(el, {
    theme: 'filled_blue', size: 'large', shape: 'pill',
    text: 'signin_with', locale: 'th',
  });
}

export function signOut() {
  token.clear();
  try { window.google?.accounts?.id?.disableAutoSelect(); } catch {}
}

/* ══════════════════════════════════════════════════════════════════════════
 *  API — จัดกลุ่มให้ตรงกับหน้าจอที่เรียกใช้
 * ════════════════════════════════════════════════════════════════════════ */

export const api = {

  /** โหลดทุกอย่างที่หน้าเว็บต้องใช้ตอนเปิด (เมนู ตั้งค่า ลิงก์ Classroom ผู้ใช้) */
  bootstrap: () => call('bootstrap.get'),

  auth: {
    me: () => call('auth.me'),
  },

  menus: {
    list: () => call('menus.list'),
    save: (menus: any[], deleteIds: string[] = []) => call('menus.save', { menus, deleteIds }),
  },

  content: {
    get: (pageKey?: string) => call('content.get', { pageKey }),
    save: (pageKey: string, blocks: any[], deleteIds: string[] = []) =>
      call('content.save', { pageKey, blocks, deleteIds }),
  },

  news: {
    list: (params: { category?: string; limit?: number } = {}) => call('news.list', params),
    get: (id: string) => call('news.get', { id }),
    save: (news: any) => call('news.save', news),
    remove: (id: string) => call('news.delete', { id }),
    markRead: (id: string) => call('news.markRead', { id }),
  },

  library: {
    folders: () => call('folders.list'),
    saveFolder: (folder: any) => call('folders.save', folder),
    files: (folderId?: string) => call('files.list', { folderId }),
    /** อัปโหลดไฟล์เข้าคลัง — accessLevel เป็นตัวกำหนดว่าใครเห็นไฟล์นี้ */
    upload: (files: UploadFile[], opts: {
      accessLevel: AccessLevel; folderId?: string; description?: string; tags?: string[];
    }) => call('files.upload', { files, ...opts }),
    /** ขอสิทธิ์ดาวน์โหลด — เซิร์ฟเวอร์ตรวจสิทธิ์ทุกครั้งก่อนคืนลิงก์ */
    getDownloadUrl: (id: string) => call('files.getDownloadUrl', { id }),
    remove: (id: string) => call('files.delete', { id }),
  },

  classroom: {
    list: () => call('classroom.list'),
    save: (links: any[], deleteIds: string[] = []) => call('classroom.save', { links, deleteIds }),
  },

  users: {
    list: (filter: { role?: Role; academicYearId?: string; groupId?: string; q?: string } = {}) =>
      call('users.list', filter),
    save: (user: any) => call('users.save', user),
    /** dryRun = true เพื่อดูผลก่อนยืนยันนำเข้าจริง */
    importCsv: (csv: string, role: Role = 'STUDENT', dryRun = false) =>
      call('users.importCsv', { csv, role, dryRun }),
    archiveYear: (academicYearId: string) => call('users.archiveYear', { academicYearId }),
  },

  assignments: {
    list: (academicYearId?: string) => call('assignments.list', { academicYearId }),
    get: (id: string) => call('assignments.get', { id }),
    save: (assignment: any) => call('assignments.save', assignment),
    close: (id: string, reopen = false) => call('assignments.close', { id, reopen }),
  },

  submissions: {
    /** ส่งงาน — แนบได้หลายไฟล์ในครั้งเดียว */
    submit: (assignmentId: string, files: UploadFile[], note = '') =>
      call('submissions.submit', { assignmentId, files, note }),
    mine: () => call('submissions.mine'),
    byAssignment: (assignmentId: string) => call('submissions.byAssignment', { assignmentId }),
    grade: (submissionId: string, score?: number | string, feedback?: string) =>
      call('submissions.grade', { submissionId, score, feedback }),
  },

  reports: {
    /** สรุป + รายชื่อทุกคน พร้อมสถานะ ทันเวลา / เกินเวลา / ยังไม่ส่ง */
    assignment: (assignmentId: string) => call('reports.assignmentSummary', { assignmentId }),
    csv: (assignmentId: string) => call('reports.exportCsv', { assignmentId }),
  },

  email: {
    templates: () => call('email.templates'),
    saveTemplate: (tpl: any) => call('email.saveTemplate', tpl),
    /** ดูรายชื่อผู้รับและตัวอย่างอีเมลก่อนส่งจริง */
    preview: (params: {
      assignmentId: string; target: EmailTarget; templateKey?: string;
      subject?: string; bodyHtml?: string; studentRowIds?: string[];
    }) => call('email.preview', params),
    /** ส่งจริง — เซิร์ฟเวอร์คำนวณผู้รับเองจาก target ไม่รับรายชื่ออีเมลจากหน้าเว็บ */
    send: (params: {
      assignmentId: string; target: EmailTarget; templateKey?: string;
      subject?: string; bodyHtml?: string; studentRowIds?: string[];
      excludeIds?: string[]; ccTeacher?: boolean; attachmentFileIds?: string[];
    }) => call('email.send', params),
    logs: (assignmentId?: string) => call('email.logs', { assignmentId }),
    quota: () => call('email.quota'),
  },

  events: {
    list: (academicYearId?: string) => call('events.list', { academicYearId }),
    save: (event: any) => call('events.save', event),
    remove: (id: string) => call('events.delete', { id }),
  },

  settings: {
    get: () => call('settings.get'),
    save: (settings: Record<string, string>) => call('settings.save', { settings }),
  },

  ack: {
    save: (type: 'SIM_SAFETY' | 'SIM_CONFIDENTIAL' | 'READINESS') => call('ack.save', { type }),
    status: () => call('ack.status'),
  },
};

/* ─── ตัวช่วยดาวน์โหลดไฟล์ CSV ที่ได้จาก reports.csv ──────────────────── */

export function downloadCsv(fileName: string, csv: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

/* ─── โหมดข้อมูลจำลอง ───────────────────────────────────────────────────── */

async function mockCall<T>(action: string, payload: any): Promise<T> {
  await new Promise((r) => setTimeout(r, 150));   // จำลองความหน่วงของเครือข่าย
  const fn = (mock as any)[action.replace('.', '_')];
  if (typeof fn === 'function') return fn(payload);
  console.warn('[mock] ยังไม่มีข้อมูลจำลองสำหรับ action:', action);
  return {} as T;
}

export default api;