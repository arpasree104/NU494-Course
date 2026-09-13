import React from 'react';
import { PageHero, TopicCard, AccentCard, VideoCard } from '../../components/ui';
import { Activity, Droplet, Wind, ShieldAlert, Thermometer, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function IcuHub() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-10">
      <PageHero
        eyebrow="ICU LEARNING HUB"
        title="ดูแลผู้ป่วยวิกฤตอย่างเป็นระบบและปลอดภัย"
        description="เรียนรู้การติดตามอาการ การใช้เครื่องมือพิเศษ และการพยาบาลเพื่อป้องกันภาวะแทรกซ้อนใน ICU"
        primaryAction={{ label: "เปิด Checklist", onClick: () => alert('Mock: เปิด Checklist') }}
        secondaryAction={{ label: "ขอคำปรึกษาจาก ICU", onClick: () => alert('Mock: ติดต่อ') }}
      />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <VideoCard
          title="ICU Orientation"
          duration="3–5 นาที"
        />
        <div className="bg-surface-0 rounded-2xl border border-surface-100 p-6 shadow-sm flex flex-col justify-center">
          <h2 className="text-lg font-bold text-brand-700 mb-4">ก่อนขึ้นฝึก ICU</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-brand-600 mt-0.5 shrink-0" size={18} />
              <span className="text-sm text-ink-700">ตรวจสอบความพร้อมของอุปกรณ์และเครื่องมือประจำตัว</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-brand-600 mt-0.5 shrink-0" size={18} />
              <span className="text-sm text-ink-700">ทบทวนค่าปกติของ Laboratory และการแปรผลเบื้องต้น</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-brand-600 mt-0.5 shrink-0" size={18} />
              <span className="text-sm text-ink-700">อ่าน Ventilator basics และการตั้งค่าพื้นฐาน</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-brand-600 mt-0.5 shrink-0" size={18} />
              <span className="text-sm text-ink-700">ทบทวน High-alert drugs ที่พบบ่อยในหอผู้ป่วยวิกฤต</span>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-bold text-brand-700 mb-6">Core Learning</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TopicCard icon={Activity} title="การประเมินผู้ป่วยวิกฤต" description="หลักการประเมินแบบ ABCDE และระบบประสาท" to="#" />
          <TopicCard icon={Droplet} title="Hemodynamic Monitoring" description="การเฝ้าระวังระบบไหลเวียนโลหิตแบบล่วงล้ำและไม่ล่วงล้ำ" to="#" />
          <TopicCard icon={Wind} title="Mechanical Ventilation" description="การดูแลผู้ป่วยที่ใช้เครื่องช่วยหายใจ" to="#" />
          <TopicCard icon={ShieldAlert} title="High-alert Medication" description="การบริหารยาที่มีความเสี่ยงสูงอย่างปลอดภัย" to="#" />
          <TopicCard icon={Thermometer} title="ป้องกันภาวะแทรกซ้อน" description="VAP, CAUTI, CLABSI และ Pressure Ulcer" to="#" />
          <TopicCard icon={ShieldCheck} title="Infection Prevention" description="การป้องกันการติดเชื้อในหอผู้ป่วยวิกฤต" to="#" />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccentCard
          label="Clinical reasoning"
          title="ICU Case Study"
          description="จากข้อมูลสู่การพยาบาล: ประเมิน → ระบุปัญหา → จัดลำดับ → วางแผน → ประเมินซ้ำ"
          action={{ label: "เริ่มฝึกคิด", to: "#" }}
        />
        <div className="bg-surface-0 rounded-2xl border border-surface-100 p-8 flex flex-col justify-center items-center text-center shadow-sm">
          <h2 className="text-xl font-bold text-ink-900 mb-2">สะท้อนการเรียนรู้</h2>
          <p className="text-sm text-ink-500 mb-6 max-w-sm">บันทึกสิ่งที่ได้เรียนรู้ ปัญหาที่พบ และแนวทางพัฒนาตนเองจากการฝึกปฏิบัติในวันนี้</p>
          <button className="px-6 py-2.5 bg-brand-50 text-brand-700 font-semibold rounded-xl hover:bg-brand-100 transition-colors border border-brand-200">
            เขียน Reflection
          </button>
        </div>
      </section>
    </div>
  );
}
