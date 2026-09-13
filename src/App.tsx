import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ConfigProvider } from './context/ConfigContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { RoleSwitcher } from './components/layout/RoleSwitcher';
import { ProtectedRoute } from './components/guards';

import { Home } from './pages/public/Home';
import { Start } from './pages/public/Start';
import { IcuHub } from './pages/public/IcuHub';
import { ErHub } from './pages/public/ErHub';
import { SimulationCenter } from './pages/public/SimulationCenter';

import { Dashboard } from './pages/admin/Dashboard';
import { AssignmentList } from './pages/teacher/AssignmentList';
import { MyAssignments } from './pages/student/MyAssignments';

// Placeholders for remaining pages
const Placeholder = ({ title }: { title: string }) => (
  <div className="max-w-6xl mx-auto px-4 py-16 text-center">
    <h2 className="text-2xl font-bold text-ink-900 mb-4">{title}</h2>
    <p className="text-ink-500">อยู่ระหว่างการพัฒนาในเฟสต่อไป</p>
  </div>
);

const Forbidden = () => (
  <div className="max-w-md mx-auto px-4 py-20 text-center">
    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    </div>
    <h2 className="text-2xl font-bold text-ink-900 mb-2">คุณไม่มีสิทธิ์เข้าถึงส่วนนี้</h2>
    <p className="text-ink-500 mb-8">บัญชีของคุณไม่ได้รับอนุญาตให้เข้าถึงเนื้อหาในหน้านี้</p>
    <a href="/" className="px-6 py-2.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700">กลับหน้าหลัก</a>
  </div>
);

function AppLayout() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <RoleSwitcher />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ConfigProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="forbidden" element={<Forbidden />} />
              
              <Route element={<ProtectedRoute menuId="start" />}>
                <Route path="start" element={<Start />} />
              </Route>
              
              <Route element={<ProtectedRoute menuId="icu-hub" />}>
                <Route path="icu" element={<IcuHub />} />
              </Route>
              
              <Route element={<ProtectedRoute menuId="er-hub" />}>
                <Route path="er" element={<ErHub />} />
              </Route>
              
              <Route element={<ProtectedRoute menuId="sim-center" />}>
                <Route path="simulation" element={<SimulationCenter />} />
              </Route>
              
              <Route element={<ProtectedRoute menuId="calendar" />}>
                <Route path="calendar" element={<Placeholder title="ตารางกิจกรรม" />} />
              </Route>
              
              <Route element={<ProtectedRoute menuId="news" />}>
                <Route path="news" element={<Placeholder title="ข่าวประกาศ" />} />
              </Route>
              
              <Route element={<ProtectedRoute menuId="assignments" />}>
                <Route path="assignments" element={<MyAssignments />} />
              </Route>

              <Route element={<ProtectedRoute menuId="teacher-assign" />}>
                <Route path="teach/assignments" element={<AssignmentList />} />
              </Route>
              
              <Route element={<ProtectedRoute menuId="teacher-files" />}>
                <Route path="teach/library" element={<Placeholder title="คลังเอกสารอาจารย์" />} />
              </Route>
              
              <Route element={<ProtectedRoute menuId="student-files" />}>
                <Route path="library" element={<Placeholder title="คลังเอกสาร" />} />
              </Route>
              
              <Route element={<ProtectedRoute menuId="admin" />}>
                <Route path="admin" element={<Dashboard />} />
              </Route>

            </Route>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </AuthProvider>
  );
}
