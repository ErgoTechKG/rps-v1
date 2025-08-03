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
import TopicManagement from './pages/professor/courses/lab-rotation/topic-management/TopicManagement'
import TopicPublish from './pages/professor/courses/lab-rotation/topic-management/TopicPublish'
import TopicEdit from './pages/professor/courses/lab-rotation/topic-management/TopicEdit'
import Applications from './pages/professor/courses/lab-rotation/student-selection/Applications'
import Interviews from './pages/professor/courses/lab-rotation/student-selection/Interviews'
import Selection from './pages/professor/courses/lab-rotation/student-selection/Selection'
import Confirmation from './pages/professor/courses/lab-rotation/student-selection/Confirmation'
import TaskAssignment from './pages/professor/courses/lab-rotation/process-management/TaskAssignment'
import WeeklyMeetings from './pages/professor/courses/lab-rotation/process-management/WeeklyMeetings'
import MilestoneReview from './pages/professor/courses/lab-rotation/process-management/MilestoneReview'
import QAInteraction from './pages/professor/courses/lab-rotation/process-management/QAInteraction'
import HomeworkReview from './pages/professor/courses/lab-rotation/assessment/HomeworkReview'
import ReportEvaluation from './pages/professor/courses/lab-rotation/assessment/ReportEvaluation'
import DefenseScoring from './pages/professor/courses/lab-rotation/assessment/DefenseScoring'
import FinalGrading from './pages/professor/courses/lab-rotation/assessment/FinalGrading'
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
            
            <Route 
              path="/professor/courses/lab-rotation/:courseId/topic-management" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <TopicManagement />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/lab-rotation/:courseId/topic-management/publish" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <TopicPublish />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/lab-rotation/:courseId/topic-management/edit/:topicId" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <TopicEdit />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/lab-rotation/:courseId/student-selection/applications" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <Applications />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/lab-rotation/:courseId/student-selection/interviews" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <Interviews />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/lab-rotation/:courseId/student-selection/selection" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <Selection />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/lab-rotation/:courseId/student-selection/confirmation" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <Confirmation />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/lab-rotation/:courseId/process-management/task-assignment" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <TaskAssignment />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/lab-rotation/:courseId/process-management/weekly-meetings" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <WeeklyMeetings />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/lab-rotation/:courseId/process-management/milestone-review" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <MilestoneReview />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/lab-rotation/:courseId/process-management/qa-interaction" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <QAInteraction />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/lab-rotation/:courseId/assessment/homework-review" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <HomeworkReview />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/lab-rotation/:courseId/assessment/report-evaluation" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ReportEvaluation />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/lab-rotation/:courseId/assessment/defense-scoring" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <DefenseScoring />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/lab-rotation/:courseId/assessment/final-grading" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <FinalGrading />
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