// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

import LoginPage from './components/Auth/LoginPage';
import SignUp from './components/Auth/SignUp';
import Layout from './components/Layout/Layout';

import FamilyDashboard from './components/Dashboard/FamilyDashboard';
import HarithaDashboard from './components/Dashboard/HarithaDashboard';
import CommunityDashboard from './components/Dashboard/CommunityDashboard';
import WasteManagementPage from './components/Dashboard/WasteManagementPage';
import VideoLessonsPage from './components/Dashboard/VideoLessonsPage';
import SegregateWastePage from './components/Dashboard/SegregateWastePage';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Layout wrapper for all authenticated dashboard routes */}
              <Route element={<Layout />}>
                <Route path="/family-dashboard/:id" element={<FamilyDashboard />} />
                <Route path="/haritha-dashboard/:id" element={<HarithaDashboard />} />
                <Route path="/community" element={<CommunityDashboard />} />
                <Route path="/waste" element={<WasteManagementPage />} />
                <Route path="/videos" element={<VideoLessonsPage />} />
                <Route path="/segregation" element={<SegregateWastePage />} />
              </Route>

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

