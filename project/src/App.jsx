import React, { useState } from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import LoginPage from './components/Auth/LoginPage';
import FamilyDashboard from './components/Dashboard/FamilyDashboard';
import HarithaDashboard from './components/Dashboard/HarithaDashboard';
import CommunityDashboard from './components/Dashboard/CommunityDashboard';
import WasteManagementPage from './components/Dashboard/WasteManagementPage';
import VideoLessonsPage from './components/Dashboard/VideoLessonsPage';
import SegregateWastePage from './components/Dashboard/SegregateWastePage';
import SignUp from './components/Auth/SignUp'; // <-- Make sure this exists
const AppContent = () => {
  const { user, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleNavigate = (section) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    if (!isAuthenticated) {
      return <LoginPage />;
    }

    switch (activeSection) {
      case 'dashboard':
        return user?.role === 'family' ? <FamilyDashboard /> : <HarithaDashboard />;
      case 'community':
        return <CommunityDashboard />;
      case 'pickups':
        return <HarithaDashboard />;
      case 'map':
        return <div className="p-8 text-center">Map view coming soon...</div>;
      case 'employment':
        return <div className="p-8 text-center">Employment form coming soon...</div>;
      case 'education':
        return <div className="p-8 text-center">Educational content coming soon...</div>;
      case 'profile':
        return <div className="p-8 text-center">Profile settings coming soon...</div>;
      case 'waste':
        return <WasteManagementPage />;
      case 'videos':
        return <VideoLessonsPage />;
      case 'segregation':
        return <SegregateWastePage />;
      default:
        return user?.role === 'family' ? <FamilyDashboard /> : <HarithaDashboard />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={closeSidebar}
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />
        <main className="flex-1 md:ml-64">
          <div className="p-6 min-h-screen">
            {renderContent()}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

// Main App component
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/family-dashboard/:id" element={<FamilyDashboard />} />
              <Route path='/haritha-dashboard/:id' element={<HarithaDashboard/>}/>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/*" element={<AppContent/>} />
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;