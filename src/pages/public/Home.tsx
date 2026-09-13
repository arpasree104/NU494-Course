import React from 'react';
import { PageHero, AlertBanner, TopicCard, RoadmapStepper, AccentCard, VideoCard } from '../../components/ui';
import { Activity, HeartPulse, Stethoscope, AlertTriangle, FileText, Calendar } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { usePermission } from '../../hooks/usePermission';

export function Home() {
  const { classroomLinks } = useConfig();
  const { canSeeMenu } = usePermission();
  
  const handleClassroomClick = () => {
    if (classroomLinks.length > 0) {
      window.open(classroomLinks[0].url, '_blank');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-10">
      <PageHero
        eyebrow="CRITICAL AND EMERGENCY NURSING PRACTICUM"
        title="ปฏิบัติการพยาบาลผู้ป่วยภาวะวิกฤตและฉุกเฉิน"
        description="พร้อมคิด พร้อมตัดสินใจ พร้อมดูแลผู้ป่วยในภาวะวิกฤตและฉุกเฉิน"
        primaryAction={{ label: "เริ่มต้นที่นี่ →", to: "/start" }}
        secondaryAction={{ label: "เข้าสู่ Classroom", onClick: handleClassroomClick }}
        icon={HeartPulse}
        iconLabel="พื้นที่การ Simulation"
        iconDesc="ฝึกปฏิบัติเสมือนจริง"
      />

      <AlertBanner 
        badge="ประกาศสำคัญ" 
        title="Simulation รอบถัดไป • วันจันทร์ที่ 22 ก.ย. เวลา 09:00 น." 
        action={{ label: "ดูรายละเอียด", to: "/news" }} 
      />

      <section>
        <h2 className="text-xl md:text-2xl font-bold text-brand-700 mb-6">เริ่มจากสิ่งที่คุณต้องทำ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TopicCard icon={Activity} title="เตรียมตัวก่อนฝึก" description="ประเมินความพร้อมและอ่านข้อตกลง" to="/start" />
          <TopicCard icon={Stethoscope} title="เตรียมฝึก ICU" description="การประเมินและการดูแลผู้ป่วยวิกฤต" to="/icu" />
          <TopicCard icon={AlertTriangle} title="เตรียมฝึก ER" description="การคัดกรองและการดูแลฉุกเฉิน" to="/er" />
          <TopicCard icon={HeartPulse} title="เข้า Simulation" description="เตรียมความพร้อมก่อนเข้าสถานการณ์จำลอง" to="/simulation" />
          {/* Note: In a real app, conditionally show these based on canSeeMenu */}
          <TopicCard icon={FileText} title="ส่งงาน" description="ตรวจสอบและส่งงานที่ได้รับมอบหมาย" to="/assignments" />
          <TopicCard icon={Calendar} title="ตารางกิจกรรม" description="ดูตารางเรียนและรอบฝึกปฏิบัติ" to="/calendar" />
        </div>
      </section>

      <section className="bg-surface-0 rounded-2xl border border-surface-100 p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-bold text-brand-700 mb-8 text-center">Learning Roadmap</h2>
        <RoadmapStepper steps={['เตรียมพร้อม', 'ฝึก ICU', 'ฝึก ER', 'Simulation', 'ประเมินผล', 'OSCE', 'Reflection']} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccentCard
          label="กิจกรรมถัดไป"
          title="Case Conference ครั้งที่ 1"
          description="วันศุกร์ที่ 26 ก.ย. 2569 เวลา 13:00 - 15:00 น. ณ ห้องประชุมคณะ"
          action={{ label: "ดูรายละเอียด", to: "/calendar" }}
        />
        <VideoCard
          title="วิดีโอแนะนำรายวิชา"
          duration="3:45 นาที"
        />
      </section>
    </div>
  );
}
