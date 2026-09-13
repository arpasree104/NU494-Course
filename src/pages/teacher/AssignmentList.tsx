import React from 'react';

export function AssignmentList() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">สั่งงาน & ติดตามการส่ง</h1>
          <p className="text-ink-500 text-sm mt-1">จัดการงานและตรวจสอบการส่งงานของนักศึกษา</p>
        </div>
        <button className="px-4 py-2 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors">
          + สั่งงานใหม่
        </button>
      </div>

      <div className="bg-surface-0 border border-surface-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-50 text-ink-700 border-b border-surface-100">
              <tr>
                <th className="px-6 py-4 font-semibold">ชื่องาน</th>
                <th className="px-6 py-4 font-semibold">กลุ่มเป้าหมาย</th>
                <th className="px-6 py-4 font-semibold">กำหนดส่ง</th>
                <th className="px-6 py-4 font-semibold">สถานะการส่ง</th>
                <th className="px-6 py-4 font-semibold">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              <tr className="hover:bg-surface-50">
                <td className="px-6 py-4 font-medium text-ink-900">Reflection: การฝึก ICU สัปดาห์ 1</td>
                <td className="px-6 py-4 text-ink-700">กลุ่ม A</td>
                <td className="px-6 py-4 text-ink-700">20 ก.ย. 2569 23:59</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-semibold">12</span>
                    <span className="text-ink-300">/</span>
                    <span className="text-ink-700">15</span>
                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded ml-2">เลยกำหนด 3</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-brand-600 hover:text-brand-800 font-medium">ดูรายงาน</button>
                </td>
              </tr>
              <tr className="hover:bg-surface-50">
                <td className="px-6 py-4 font-medium text-ink-900">สรุป Case Study: Hypovolemic Shock</td>
                <td className="px-6 py-4 text-ink-700">นักศึกษาทั้งหมด (รุ่น 61)</td>
                <td className="px-6 py-4 text-ink-700">25 ก.ย. 2569 23:59</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-semibold">5</span>
                    <span className="text-ink-300">/</span>
                    <span className="text-ink-700">60</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-brand-600 hover:text-brand-800 font-medium">ดูรายงาน</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
