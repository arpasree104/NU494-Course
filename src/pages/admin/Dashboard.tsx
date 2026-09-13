import React from 'react';
import { StatCard } from '../../components/ui';

export function Dashboard() {
  return (
    <div className="flex">
      {/* Basic Sidebar */}
      <div className="w-64 bg-surface-0 border-r border-surface-100 min-h-screen p-4 hidden md:block">
        <h2 className="font-bold text-ink-900 mb-6">Admin Console</h2>
        <nav className="space-y-1">
          <a href="#" className="block px-3 py-2 rounded-lg bg-brand-50 text-brand-700 font-medium">แดชบอร์ด</a>
          <a href="#" className="block px-3 py-2 rounded-lg text-ink-700 hover:bg-surface-50 hover:text-ink-900">จัดการเมนู</a>
          <a href="#" className="block px-3 py-2 rounded-lg text-ink-700 hover:bg-surface-50 hover:text-ink-900">จัดการผู้ใช้</a>
          <a href="#" className="block px-3 py-2 rounded-lg text-ink-700 hover:bg-surface-50 hover:text-ink-900">จัดการข่าวประกาศ</a>
          <a href="#" className="block px-3 py-2 rounded-lg text-ink-700 hover:bg-surface-50 hover:text-ink-900">คลังเอกสาร</a>
          <a href="#" className="block px-3 py-2 rounded-lg text-ink-700 hover:bg-surface-50 hover:text-ink-900">ตั้งค่าระบบ</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-ink-900 mb-6">ภาพรวมระบบ</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard value="250" label="ผู้ใช้ทั้งหมด" />
          <StatCard value="12" label="ประกาศที่เผยแพร่" />
          <StatCard value="45" label="ไฟล์ในคลัง" />
          <StatCard value="5" label="งานที่เปิดรับส่ง" />
        </div>

        <div className="mt-8 bg-surface-0 border border-surface-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-ink-900 mb-4">กิจกรรม 5 รายการล่าสุด (Audit Log)</h2>
          <div className="space-y-4">
            <div className="text-sm border-b border-surface-50 pb-2">
              <span className="text-ink-500 mr-2">15 ก.ย. 14:00</span>
              <span className="font-medium text-ink-900">admin@test.com</span>
              <span className="text-ink-700 mx-1">อัปเดต</span>
              <span className="font-medium text-brand-600">การตั้งค่าระบบ</span>
            </div>
            <div className="text-sm border-b border-surface-50 pb-2">
              <span className="text-ink-500 mr-2">15 ก.ย. 10:30</span>
              <span className="font-medium text-ink-900">teacher@test.com</span>
              <span className="text-ink-700 mx-1">สร้างงานใหม่</span>
              <span className="font-medium text-brand-600">Reflection: ICU Day 1</span>
            </div>
            <p className="text-center text-sm text-ink-500 pt-2">...จำลองข้อมูล...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
