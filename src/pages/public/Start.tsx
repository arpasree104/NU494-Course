import React from 'react';
import { PageHero, StatCard, RoadmapStepper, AccentCard } from '../../components/ui';
import { ShieldCheck, FileCheck, Brain, BookOpen } from 'lucide-react';

export function Start() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-10">
      <PageHero
        eyebrow="GETTING STARTED"
        title="เริ่มต้นอย่างมั่นใจ ก่อนก้าวสู่ ICU และ ER"
        description="เตรียมความพร้อมทั้งความรู้ ทักษะ และจิตใจ เพื่อการฝึกปฏิบัติอย่างปลอดภัย"
        primaryAction={{ label: "ทำแบบประเมินความพร้อม", onClick: () => alert('Mock: เปิดแบบประเมิน') }}
        secondaryAction={{ label: "เปิด Learning Checklist", onClick: () => alert('Mock: เปิด Checklist') }}
      />

      <section>
        <h2 className="text-xl md:text-2xl font-bold text-brand-700 mb-6">โครงสร้างการฝึก 90 ชั่วโมง</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard value="7 ชม." label="เตรียมพร้อม" />
          <StatCard value="42 ชม." label="ICU · 6 วัน" />
          <StatCard value="28 ชม." label="ER · 4 วัน" />
          <StatCard value="13 ชม." label="กิจกรรมบูรณาการ" />
        </div>
      </section>

      <section className="bg-surface-0 rounded-2xl border border-surface-100 p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-bold text-brand-700 mb-8 text-center">เส้นทางการเรียนรู้</h2>
        <RoadmapStepper steps={['เตรียมพร้อม', 'ICU', 'ER', 'Simulation', 'Case conference', 'OSCE', 'ประเมินผล']} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-brand-700 mb-6">เตรียมตัวก่อนขึ้นฝึก</h2>
          <div className="bg-surface-0 rounded-2xl border border-surface-100 p-6 shadow-sm">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              <li className="flex items-start gap-3">
                <ShieldCheck className="text-brand-600 mt-0.5 shrink-0" size={18} />
                <span className="text-sm text-ink-700">ตรวจสุขภาพและวัคซีน</span>
              </li>
              <li className="flex items-start gap-3">
                <FileCheck className="text-brand-600 mt-0.5 shrink-0" size={18} />
                <span className="text-sm text-ink-700">เตรียมเครื่องแบบและอุปกรณ์</span>
              </li>
              <li className="flex items-start gap-3">
                <Brain className="text-brand-600 mt-0.5 shrink-0" size={18} />
                <span className="text-sm text-ink-700">ทำ Pre-learning Quiz</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="text-brand-600 mt-0.5 shrink-0" size={18} />
                <span className="text-sm text-ink-700">แต่งกายตามระเบียบ</span>
              </li>
              <li className="flex items-start gap-3">
                <BookOpen className="text-brand-600 mt-0.5 shrink-0" size={18} />
                <span className="text-sm text-ink-700">ทบทวนความรู้พื้นฐาน</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="text-brand-600 mt-0.5 shrink-0" size={18} />
                <span className="text-sm text-ink-700">อ่านหลักความปลอดภัย</span>
              </li>
            </ul>
          </div>
        </div>
        
        <AccentCard
          label="Patient Safety First"
          title="ความปลอดภัยของผู้ป่วยคืออันดับหนึ่ง"
          description="การฝึกปฏิบัติในหน่วยวิกฤตมีความเสี่ยงสูง ให้นักศึกษายึดหลัก 2P Safety อย่างเคร่งครัด และต้องปรึกษาอาจารย์หรือพยาบาลพี่เลี้ยงก่อนให้การพยาบาลทุกครั้ง"
          action={{ label: "อ่านแนวทางฉบับเต็ม", to: "#" }}
        />
      </section>

      <div className="bg-cream-100 border border-cream-300 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-ink-900 mb-1">พร้อมแล้วใช่ไหม?</h3>
          <p className="text-sm text-ink-700">ทำแบบประเมินความพร้อม และ Checklist ก่อนขึ้นฝึก เพื่อยืนยันว่าคุณพร้อมสำหรับการเรียนรู้</p>
        </div>
        <button className="shrink-0 px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-sm">
          ยืนยันความพร้อม
        </button>
      </div>
    </div>
  );
}
