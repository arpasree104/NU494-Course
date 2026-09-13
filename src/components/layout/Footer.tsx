import React from 'react';
import { useConfig } from '../../context/ConfigContext';

export function Footer() {
  const { settings } = useConfig();

  return (
    <footer className="mt-auto">
      <div className="bg-brand-800 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">{settings?.courseName || 'ปฏิบัติการพยาบาลผู้ป่วยภาวะวิกฤตและฉุกเฉิน'}</h3>
            <p className="text-brand-100 text-sm">{settings?.courseCode || 'พย. 494'} · {settings?.facultyName}</p>
            <p className="text-brand-100 text-sm mt-1">ปีการศึกษา {settings?.currentAcademicYear?.replace('AY', '')}</p>
          </div>
          <div className="md:text-right space-y-2">
            <p className="text-sm text-brand-100 hover:text-white transition-colors cursor-pointer">ติดต่ออาจารย์ผู้ประสานงาน</p>
            <p className="text-sm text-brand-100 hover:text-white transition-colors cursor-pointer">นโยบายการใช้งาน</p>
            <p className="text-sm text-brand-100 hover:text-white transition-colors cursor-pointer">แจ้งปัญหาการใช้งานระบบ</p>
          </div>
        </div>
      </div>
      <div className="bg-surface-0 border-t border-surface-100 py-4 text-center">
        <p className="text-[11px] text-ink-500">© {new Date().getFullYear()} NU494 Course Hub. All rights reserved.</p>
      </div>
    </footer>
  );
}
