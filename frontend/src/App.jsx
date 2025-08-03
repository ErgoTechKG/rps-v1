import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import ProfessorDashboard from './pages/professor/ProfessorDashboard'
import StudentDashboard from './pages/student/StudentDashboard'
import SecretaryDashboard from './pages/secretary/SecretaryDashboard'
import LeaderDashboard from './pages/leader/LeaderDashboard'
import Unauthorized from './pages/Unauthorized'
import NotificationPreferences from './pages/shared/notifications/NotificationPreferences'
import SharedCalendar from './pages/shared/calendar/SharedCalendar'
import HelpCenter from './pages/shared/help/HelpCenter'
import ProfilePage from './pages/shared/profile/ProfilePage'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="app">
            <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ProfessorDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <SecretaryDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/leader/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['leader']}>
                  <LeaderDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/shared/notifications/preferences" 
              element={
                <ProtectedRoute>
                  <NotificationPreferences />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/shared/calendar" 
              element={
                <ProtectedRoute>
                  <SharedCalendar />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/shared/help" 
              element={
                <ProtectedRoute>
                  <HelpCenter />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/shared/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App