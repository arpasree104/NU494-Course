import React, { useState } from 'react';
import { PageHero, TopicCard, FlowChips } from '../../components/ui';
import { HeartPulse, Wind, AlertCircle, Activity, ShieldPlus, GitBranch } from 'lucide-react';

export function SimulationCenter() {
  const [agreements, setAgreements] = useState({ safety: false, conf: false });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-10">
      <PageHero
        eyebrow="SIMULATION CENTER"
        title="ฝึกตัดสินใจในพื้นที่ที่ปลอดภัย"
        description="จำลองสถานการณ์วิกฤตเสมือนจริง เพื่อเตรียมความพร้อมก่อนการดูแลผู้ป่วยจริง"
        primaryAction={{ label: "อ่าน Orientation", onClick: () => alert('Mock: เปิด Orientation') }}
        secondaryAction={{ label: "ตารางรอบซ้อม", to: "/calendar" }}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`border rounded-2xl p-6 transition-colors shadow-sm ${agreements.safety ? 'bg-green-50 border-green-200' : 'bg-cream-100 border-cream-300'}`}>
          <h3 className="font-bold text-ink-900 mb-2">Psychological Safety Agreement</h3>
          <p className="text-sm text-ink-700 mb-4 line-clamp-3">เราเคารพซึ่งกันและกัน สนับสนุนให้ทุกคนกล้าซักถาม พร้อมรับฟัง และไม่ใช้ข้อผิดพลาดที่เกิดขึ้นในสถานการณ์จำลองมาตัดสินผู้เรียน</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-brand-600 rounded" checked={agreements.safety} onChange={(e) => setAgreements({ ...agreements, safety: e.target.checked })} />
            <span className="text-sm font-semibold">ข้าพเจ้าเข้าใจและยอมรับข้อตกลง</span>
          </label>
        </div>
        
        <div className={`border rounded-2xl p-6 transition-colors shadow-sm ${agreements.conf ? 'bg-green-50 border-green-200' : 'bg-cream-100 border-cream-300'}`}>
          <h3 className="font-bold text-ink-900 mb-2">Confidentiality Agreement</h3>
          <p className="text-sm text-ink-700 mb-4 line-clamp-3">ข้อมูลสถานการณ์จำลอง อาการผู้ป่วย และผลการปฏิบัติของเพื่อนร่วมงาน ถือเป็นความลับ ห้ามเผยแพร่หรือพูดคุยนอกพื้นที่ฝึกซ้อม</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-brand-600 rounded" checked={agreements.conf} onChange={(e) => setAgreements({ ...agreements, conf: e.target.checked })} />
            <span className="text-sm font-semibold">ข้าพเจ้าเข้าใจและยอมรับข้อตกลง</span>
          </label>
        </div>
      </section>

      <section className="bg-surface-0 rounded-2xl border border-surface-100 p-8 shadow-sm">
        <h2 className="text-lg font-bold text-brand-700 mb-6">เส้นทาง Simulation</h2>
        <FlowChips steps={['เตรียมตัว', 'Pre-briefing', 'Scenario', 'Debriefing', 'Reflection']} />
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-bold text-brand-700 mb-6">สถานการณ์จำลอง</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TopicCard icon={AlertCircle} title="Triage & Hypovolemic Shock" description="การคัดกรองและการจัดการภาวะช็อก" to="#" />
          <TopicCard icon={Wind} title="Respiratory Failure" description="การดูแลผู้ป่วยที่มีภาวะหายใจล้มเหลว" to="#" />
          <TopicCard icon={ShieldPlus} title="Multiple Trauma" description="การประเมินและการดูแลผู้ป่วยอุบัติเหตุหลายระบบ" to="#" />
          <TopicCard icon={Activity} title="Cardiac Arrhythmia" description="การจัดการภาวะหัวใจเต้นผิดจังหวะที่คุกคามชีวิต" to="#" />
          <TopicCard icon={HeartPulse} title="Emergency Resuscitation" description="การปฏิบัติการช่วยฟื้นคืนชีพขั้นสูง" to="#" />
          <TopicCard icon={GitBranch} title="Branching Scenario" description="สถานการณ์จำลองแบบซับซ้อนและการตัดสินใจ" to="#" />
        </div>
      </section>

      <div className="bg-surface-0 border border-surface-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <p className="text-sm font-medium text-ink-700">ตรวจเอกสารและยืนยันข้อตกลงก่อนเข้าสถานการณ์</p>
        <button 
          disabled={!agreements.safety || !agreements.conf}
          className="px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
        >
          เข้าสู่สถานการณ์จำลอง
        </button>
      </div>
    </div>
  );
}
