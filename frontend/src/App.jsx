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
import TopicBrowsingList from './pages/student/courses/lab-rotation/topic-browsing/TopicBrowsingList'
import TopicDetails from './pages/student/courses/lab-rotation/topic-browsing/TopicDetails'
import ProfessorInfo from './pages/student/courses/lab-rotation/topic-browsing/ProfessorInfo'
import ApplicationForm from './pages/student/courses/lab-rotation/application/ApplicationForm'
import PreferenceManagement from './pages/student/courses/lab-rotation/application/PreferenceManagement'
import ApplicationStatus from './pages/student/courses/lab-rotation/application/ApplicationStatus'
import InterviewBooking from './pages/student/courses/lab-rotation/application/InterviewBooking'
import Tasks from './pages/student/courses/lab-rotation/learning-process/Tasks'
import Submissions from './pages/student/courses/lab-rotation/learning-process/Submissions'
import Meetings from './pages/student/courses/lab-rotation/learning-process/Meetings'
import Progress from './pages/student/courses/lab-rotation/learning-process/Progress'
import PosterUpload from './pages/student/courses/lab-rotation/achievements/PosterUpload'
import ReportSubmission from './pages/student/courses/lab-rotation/achievements/ReportSubmission'
import DefensePreparation from './pages/student/courses/lab-rotation/achievements/DefensePreparation'
import MaterialsPortfolio from './pages/student/courses/lab-rotation/achievements/MaterialsPortfolio'
import BasicInfo from './pages/secretary/course-management/lab-rotation/setup/BasicInfo'
import Timeline from './pages/secretary/course-management/lab-rotation/setup/Timeline'
import Rules from './pages/secretary/course-management/lab-rotation/setup/Rules'
import Resources from './pages/secretary/course-management/lab-rotation/setup/Resources'
import ProfessorList from './pages/secretary/course-management/lab-rotation/participant-management/ProfessorList'
import StudentList from './pages/secretary/course-management/lab-rotation/participant-management/StudentList'
import MatchingOverview from './pages/secretary/course-management/lab-rotation/participant-management/MatchingOverview'
import Adjustment from './pages/secretary/course-management/lab-rotation/participant-management/Adjustment'
import TaskCompletion from './pages/secretary/course-management/lab-rotation/process-monitoring/TaskCompletion'
import SubmissionTracking from './pages/secretary/course-management/lab-rotation/process-monitoring/SubmissionTracking'
import AttendanceMonitoring from './pages/secretary/course-management/lab-rotation/process-monitoring/AttendanceMonitoring'
import AlertManagement from './pages/secretary/course-management/lab-rotation/process-monitoring/AlertManagement'
import DataCollection from './pages/secretary/data-management/DataCollection'
import DataStatistics from './pages/secretary/data-management/DataStatistics'
import DataReports from './pages/secretary/data-management/DataReports'
import DataReminders from './pages/secretary/data-management/DataReminders'
import DataExport from './pages/secretary/data-management/DataExport'
import KeyMetrics from './pages/leader/courses/lab-rotation/executive-overview/KeyMetrics'
import ProgressSummary from './pages/leader/courses/lab-rotation/executive-overview/ProgressSummary'
import Alerts from './pages/leader/courses/lab-rotation/executive-overview/Alerts'
import ProfessorWorkload from './pages/leader/courses/lab-rotation/resource-analysis/ProfessorWorkload'
import LabUtilization from './pages/leader/courses/lab-rotation/resource-analysis/LabUtilization'
import BudgetExecution from './pages/leader/courses/lab-rotation/resource-analysis/BudgetExecution'
import Optimization from './pages/leader/courses/lab-rotation/resource-analysis/Optimization'
import StudentOutcomes from './pages/leader/courses/lab-rotation/quality-assessment/StudentOutcomes'
import SatisfactionSurvey from './pages/leader/courses/lab-rotation/quality-assessment/SatisfactionSurvey'
import GoalAchievement from './pages/leader/courses/lab-rotation/quality-assessment/GoalAchievement'
import ComparativeAnalysis from './pages/leader/courses/lab-rotation/quality-assessment/ComparativeAnalysis'
import ExpertDashboard from './pages/professor/courses/comprehensive-eval/ExpertDashboard'
import EvaluationInterface from './pages/professor/courses/comprehensive-eval/EvaluationInterface'
import BatchEvaluation from './pages/professor/courses/comprehensive-eval/BatchEvaluation'
import EvaluationCriteria from './pages/professor/courses/comprehensive-eval/standards-reference/EvaluationCriteria'
import ScoringRubrics from './pages/professor/courses/comprehensive-eval/standards-reference/ScoringRubrics'
import EvaluationExamples from './pages/professor/courses/comprehensive-eval/standards-reference/EvaluationExamples'
import EvaluationHome from './pages/student/courses/comprehensive-eval/EvaluationHome'
import MaterialSubmission from './pages/student/courses/comprehensive-eval/material-submission/MaterialSubmission'
import Forms from './pages/student/courses/comprehensive-eval/material-submission/Forms'
import UploadCenter from './pages/student/courses/comprehensive-eval/material-submission/UploadCenter'
import SubmissionStatus from './pages/student/courses/comprehensive-eval/material-submission/SubmissionStatus'
import Preview from './pages/student/courses/comprehensive-eval/material-submission/Preview'
import ProgressTracking from './pages/student/courses/comprehensive-eval/progress-tracking/ProgressTracking'
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
            
            <Route 
              path="/professor/courses/comprehensive-eval/:courseId/expert-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ExpertDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/comprehensive-eval/:courseId/evaluation-interface/student/:studentId" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <EvaluationInterface />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/comprehensive-eval/:courseId/batch-evaluation" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <BatchEvaluation />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/comprehensive-eval/:courseId/standards-reference/criteria" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <EvaluationCriteria />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/comprehensive-eval/:courseId/standards-reference/rubrics" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ScoringRubrics />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/professor/courses/comprehensive-eval/:courseId/standards-reference/examples" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <EvaluationExamples />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/lab-rotation/:courseId/topic-browsing/list" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <TopicBrowsingList />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/lab-rotation/:courseId/topic-browsing/details/:topicId" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <TopicDetails />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/lab-rotation/:courseId/topic-browsing/professor-info" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <ProfessorInfo />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/lab-rotation/:courseId/application/apply" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <ApplicationForm />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/lab-rotation/:courseId/application/volunteer-preference" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <PreferenceManagement />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/lab-rotation/:courseId/application/status" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <ApplicationStatus />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/lab-rotation/:courseId/application/interview-booking" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <InterviewBooking />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/lab-rotation/:courseId/learning-process/tasks" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Tasks />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/lab-rotation/:courseId/learning-process/submissions" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Submissions />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/lab-rotation/:courseId/learning-process/meetings" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Meetings />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/lab-rotation/:courseId/learning-process/progress" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Progress />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/lab-rotation/:courseId/achievements/poster-upload" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <PosterUpload />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/lab-rotation/:courseId/achievements/report-submission" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <ReportSubmission />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/lab-rotation/:courseId/achievements/defense-preparation" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <DefensePreparation />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/lab-rotation/:courseId/achievements/materials" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <MaterialsPortfolio />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/comprehensive-eval/:courseId/evaluation-home" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <EvaluationHome />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/comprehensive-eval/:courseId/material-submission" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <MaterialSubmission />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/comprehensive-eval/:courseId/material-submission/forms" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Forms />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/comprehensive-eval/:courseId/material-submission/upload-center" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <UploadCenter />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/comprehensive-eval/:courseId/material-submission/upload-center/:category" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <UploadCenter />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/comprehensive-eval/:courseId/material-submission/submission-status" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <SubmissionStatus />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/comprehensive-eval/:courseId/material-submission/preview" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Preview />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/comprehensive-eval/:courseId/progress-tracking" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <ProgressTracking />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/student/courses/comprehensive-eval/:courseId/progress-tracking/:tab" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <ProgressTracking />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/course-management/lab-rotation/:courseId/setup/basic-info" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <BasicInfo />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/course-management/lab-rotation/:courseId/setup/timeline" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <Timeline />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/course-management/lab-rotation/:courseId/setup/rules" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <Rules />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/course-management/lab-rotation/:courseId/setup/resources" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <Resources />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/course-management/lab-rotation/:courseId/participant-management/professor-list" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <ProfessorList />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/course-management/lab-rotation/:courseId/participant-management/student-list" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <StudentList />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/course-management/lab-rotation/:courseId/participant-management/matching-overview" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <MatchingOverview />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/course-management/lab-rotation/:courseId/participant-management/adjustment" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <Adjustment />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/course-management/lab-rotation/:courseId/process-monitoring/task-completion" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <TaskCompletion />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/course-management/lab-rotation/:courseId/process-monitoring/submission-tracking" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <SubmissionTracking />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/course-management/lab-rotation/:courseId/process-monitoring/attendance" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <AttendanceMonitoring />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/course-management/lab-rotation/:courseId/process-monitoring/alerts" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <AlertManagement />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/data-management/collection" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <DataCollection />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/data-management/statistics" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <DataStatistics />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/data-management/reports" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <DataReports />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/data-management/reminders" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <DataReminders />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/secretary/data-management/export" 
              element={
                <ProtectedRoute allowedRoles={['secretary']}>
                  <DataExport />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/leader/courses/lab-rotation/:courseId/executive-overview/key-metrics" 
              element={
                <ProtectedRoute allowedRoles={['leader']}>
                  <KeyMetrics />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/leader/courses/lab-rotation/:courseId/executive-overview/progress-summary" 
              element={
                <ProtectedRoute allowedRoles={['leader']}>
                  <ProgressSummary />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/leader/courses/lab-rotation/:courseId/executive-overview/alerts" 
              element={
                <ProtectedRoute allowedRoles={['leader']}>
                  <Alerts />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/leader/courses/lab-rotation/:courseId/resource-analysis/professor-workload" 
              element={
                <ProtectedRoute allowedRoles={['leader']}>
                  <ProfessorWorkload />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/leader/courses/lab-rotation/:courseId/resource-analysis/lab-utilization" 
              element={
                <ProtectedRoute allowedRoles={['leader']}>
                  <LabUtilization />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/leader/courses/lab-rotation/:courseId/resource-analysis/budget-execution" 
              element={
                <ProtectedRoute allowedRoles={['leader']}>
                  <BudgetExecution />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/leader/courses/lab-rotation/:courseId/resource-analysis/optimization" 
              element={
                <ProtectedRoute allowedRoles={['leader']}>
                  <Optimization />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/leader/courses/lab-rotation/:courseId/quality-assessment/student-outcomes" 
              element={
                <ProtectedRoute allowedRoles={['leader']}>
                  <StudentOutcomes />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/leader/courses/lab-rotation/:courseId/quality-assessment/satisfaction-survey" 
              element={
                <ProtectedRoute allowedRoles={['leader']}>
                  <SatisfactionSurvey />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/leader/courses/lab-rotation/:courseId/quality-assessment/goal-achievement" 
              element={
                <ProtectedRoute allowedRoles={['leader']}>
                  <GoalAchievement />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/leader/courses/lab-rotation/:courseId/quality-assessment/comparative-analysis" 
              element={
                <ProtectedRoute allowedRoles={['leader']}>
                  <ComparativeAnalysis />
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