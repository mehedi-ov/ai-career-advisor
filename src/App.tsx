// src/App.tsx (Final Version with Protected Routes)

import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import AdvisorPage from './pages/AdvisorPage';
import RoadmapPage from './pages/RoadmapPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute'; // <-- Import the gatekeeper
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      
      {!isHomePage && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* --- PRIVATE / PROTECTED ROUTES --- */}
          {/* Any route wrapped in ProtectedRoute requires a user to be logged in. */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/advisor" element={<ProtectedRoute><AdvisorPage /></ProtectedRoute>} />
          <Route path="/roadmap/:id" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isHomePage && <Footer />}
    </div>
  );
}

export default App;