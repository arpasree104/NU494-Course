import React, { useState } from 'react';

export function MyAssignments() {
  const [tab, setTab] = useState<'TODO' | 'DONE' | 'ALL'>('TODO');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink-900">งานที่ต้องส่ง</h1>
        <p className="text-ink-500 text-sm mt-1">จัดการและติดตามการส่งงานของคุณ</p>
      </div>

      <div className="flex gap-4 border-b border-surface-100 mb-6">
        <button 
          onClick={() => setTab('TODO')}
          className={`pb-3 font-semibold text-sm transition-colors border-b-2 ${tab === 'TODO' ? 'border-brand-600 text-brand-700' : 'border-transparent text-ink-500 hover:text-ink-900'}`}
        >
          ต้องส่ง (2)
        </button>
        <button 
          onClick={() => setTab('DONE')}
          className={`pb-3 font-semibold text-sm transition-colors border-b-2 ${tab === 'DONE' ? 'border-brand-600 text-brand-700' : 'border-transparent text-ink-500 hover:text-ink-900'}`}
        >
          ส่งแล้ว (1)
        </button>
        <button 
          onClick={() => setTab('ALL')}
          className={`pb-3 font-semibold text-sm transition-colors border-b-2 ${tab === 'ALL' ? 'border-brand-600 text-brand-700' : 'border-transparent text-ink-500 hover:text-ink-900'}`}
        >
          ทั้งหมด
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Todo */}
        <div className="bg-surface-0 border border-surface-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-gold-400 text-ink-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">ใกล้ครบกำหนด</span>
            <span className="text-xs font-semibold text-brand-700">เหลืออีก 2 วัน 5 ชม.</span>
          </div>
          <h3 className="font-bold text-lg text-ink-900 mb-1">Reflection: การฝึก ICU สัปดาห์ 1</h3>
          <p className="text-sm text-ink-500 mb-4">ผู้สั่ง: อ.ใจดี เรียนสนุก</p>
          <div className="bg-surface-50 p-3 rounded-lg flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-ink-700">กำหนดส่ง</span>
            <span className="text-sm font-semibold text-brand-700">20 ก.ย. 2569 · 23:59</span>
          </div>
          <button className="w-full py-2.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors">
            ส่งงาน
          </button>
        </div>

        {/* Card 2: Late */}
        <div className="bg-surface-0 border border-red-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">เลยกำหนด · ยังไม่ส่ง</span>
          </div>
          <h3 className="font-bold text-lg text-ink-900 mb-1">Pre-test: Hemodynamic Monitoring</h3>
          <p className="text-sm text-ink-500 mb-4">ผู้สั่ง: อ.ใจดี เรียนสนุก</p>
          <div className="bg-red-50 p-3 rounded-lg flex items-center justify-between mb-4 border border-red-100">
            <span className="text-sm font-medium text-red-700">กำหนดส่ง</span>
            <span className="text-sm font-semibold text-red-700">18 ก.ย. 2569 · 12:00</span>
          </div>
          <button className="w-full py-2.5 border border-red-600 text-red-700 font-semibold rounded-xl hover:bg-red-50 transition-colors">
            ติดต่ออาจารย์เพื่อขอส่งย้อนหลัง
          </button>
        </div>
      </div>
    </div>
  );
}
