import React from 'react';
import { PageHero, TopicCard, FlowChips, AccentCard } from '../../components/ui';
import { AlertCircle, Stethoscope, Ambulance, Activity, Search, MessageSquare } from 'lucide-react';

export function ErHub() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-10">
      <PageHero
        eyebrow="ER LEARNING HUB"
        title="ประเมินเร็ว จัดลำดับถูก และดูแลอย่างปลอดภัย"
        description="ฝึกทักษะการคัดกรอง การประเมินสภาพฉุกเฉิน และการดูแลผู้ป่วยตามระบบ Fast Track"
        primaryAction={{ label: "ทบทวน Triage", onClick: () => alert('Mock: เปิด Triage') }}
        secondaryAction={{ label: "ฝึก Primary Survey", onClick: () => alert('Mock: เปิด Primary Survey') }}
      />

      <section className="bg-surface-0 rounded-2xl border border-surface-100 p-8 shadow-sm overflow-hidden">
        <h2 className="text-lg font-bold text-brand-700 mb-6">เส้นทางผู้ป่วยใน ER</h2>
        <FlowChips steps={['มาถึง ER', 'Triage', 'Primary Survey', 'ตรวจและรักษา', 'ส่งต่อ / รับไว้ / จำหน่าย']} />
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-bold text-brand-700 mb-6">ทักษะสำคัญใน ER</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TopicCard icon={AlertCircle} title="Triage" description="การคัดกรองและจัดลำดับความรุนแรงของผู้ป่วย" to="#" />
          <TopicCard icon={Search} title="Primary Survey" description="การประเมินผู้ป่วยฉุกเฉินเบื้องต้น (ABCDE)" to="#" />
          <TopicCard icon={Ambulance} title="Trauma Care" description="การดูแลผู้ป่วยอุบัติเหตุและบาดเจ็บหลายระบบ" to="#" />
          <TopicCard icon={Activity} title="Fast Track" description="STEMI, Stroke, Sepsis, และ Trauma Fast Track" to="#" />
          <TopicCard icon={Stethoscope} title="Emergency Equipment" description="การเตรียมและใช้งานเครื่องมือแพทย์ฉุกเฉิน" to="#" />
          <TopicCard icon={MessageSquare} title="SBAR" description="การสื่อสารและส่งต่อข้อมูลอย่างมีประสิทธิภาพ" to="#" />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccentCard
          label="Emergency Case of the Week"
          title="Time-critical Case"
          description="ทดสอบความรู้และการตัดสินใจกับสถานการณ์จำลองของผู้ป่วยฉุกเฉินที่มีเวลาเป็นตัวแปรสำคัญ"
          action={{ label: "เริ่ม ER Challenge", to: "#" }}
        />
        <div className="bg-surface-0 rounded-2xl border border-surface-100 p-8 flex flex-col justify-center items-center text-center shadow-sm">
          <h2 className="text-xl font-bold text-ink-900 mb-2">หลังการฝึก</h2>
          <p className="text-sm text-ink-500 mb-6 max-w-sm">ทบทวนเคสที่น่าสนใจ การตัดสินใจที่เกิดขึ้น และสิ่งที่ควรปรับปรุงสำหรับการดูแลผู้ป่วยในอนาคต</p>
          <button className="px-6 py-2.5 bg-brand-50 text-brand-700 font-semibold rounded-xl hover:bg-brand-100 transition-colors border border-brand-200">
            เขียน Reflection
          </button>
        </div>
      </section>
    </div>
  );
}
