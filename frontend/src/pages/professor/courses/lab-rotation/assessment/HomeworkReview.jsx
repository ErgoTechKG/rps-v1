import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../../../contexts/AuthContext'
import { useNotification } from '../../../../../contexts/NotificationContext'
import './HomeworkReview.css'

const HomeworkReview = () => {
  const { courseId } = useParams()
  const { user } = useAuth()
  const { addNotification } = useNotification()
  
  const [assignments, setAssignments] = useState([])
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showGradingModal, setShowGradingModal] = useState(false)
  const [gradeForm, setGradeForm] = useState({
    score: '',
    maxScore: 100,
    feedback: '',
    rubricScores: {}
  })
  const [annotations, setAnnotations] = useState([])
  const [showPlagiarismCheck, setShowPlagiarismCheck] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    const loadData = () => {
      const mockAssignments = [
        {
          id: '1',
          title: 'Literature Review Assignment',
          description: 'Review 10 recent papers on machine learning in healthcare',
          dueDate: '2025-08-15',
          totalSubmissions: 8,
          gradedSubmissions: 5,
          maxScore: 100,
          type: 'written',
          rubric: [
            { criteria: 'Quality of Sources', maxPoints: 25 },
            { criteria: 'Analysis Depth', maxPoints: 25 },
            { criteria: 'Writing Quality', maxPoints: 25 },
            { criteria: 'Citations Format', maxPoints: 25 }
          ]
        },
        {
          id: '2',
          title: 'Research Methodology Proposal',
          description: 'Propose a methodology for your research project',
          dueDate: '2025-08-20',
          totalSubmissions: 8,
          gradedSubmissions: 2,
          maxScore: 100,
          type: 'written',
          rubric: [
            { criteria: 'Research Question', maxPoints: 30 },
            { criteria: 'Methodology Design', maxPoints: 40 },
            { criteria: 'Feasibility', maxPoints: 30 }
          ]
        }
      ]

      const mockSubmissions = [
        {
          id: '1',
          assignmentId: '1',
          studentId: '1',
          studentName: '张三',
          studentEmail: 'zhangsan@university.edu',
          submittedAt: '2025-08-14T10:30:00',
          fileName: 'literature_review_zhangsan.pdf',
          fileSize: '2.4 MB',
          status: 'graded',
          score: 85,
          feedback: 'Good analysis, but could improve citation format',
          plagiarismScore: 12,
          aiDetectionScore: 8
        },
        {
          id: '2',
          assignmentId: '1',
          studentId: '2',
          studentName: '李四',
          studentEmail: 'lisi@university.edu',
          submittedAt: '2025-08-15T09:15:00',
          fileName: 'literature_review_lisi.pdf',
          fileSize: '3.1 MB',
          status: 'pending',
          plagiarismScore: 5,
          aiDetectionScore: 3
        },
        {
          id: '3',
          assignmentId: '1',
          studentId: '3',
          studentName: '王五',
          studentEmail: 'wangwu@university.edu',
          submittedAt: '2025-08-15T14:20:00',
          fileName: 'literature_review_wangwu.pdf',
          fileSize: '2.8 MB',
          status: 'pending',
          plagiarismScore: 25,
          aiDetectionScore: 35
        }
      ]

      setAssignments(mockAssignments)
      setSubmissions(mockSubmissions)
      if (mockAssignments.length > 0) {
        setSelectedAssignment(mockAssignments[0])
      }
      setLoading(false)
    }
    
    setTimeout(loadData, 500)
  }, [courseId])

  const getSubmissionsForAssignment = (assignmentId) => {
    return submissions.filter(sub => sub.assignmentId === assignmentId)
  }

  const openGradingModal = (submission) => {
    setSelectedSubmission(submission)
    const assignment = assignments.find(a => a.id === submission.assignmentId)
    setGradeForm({
      score: submission.score || '',
      maxScore: assignment?.maxScore || 100,
      feedback: submission.feedback || '',
      rubricScores: {}
    })
    setShowGradingModal(true)
  }

  const submitGrade = () => {
    if (!gradeForm.score) {
      addNotification('Please enter a score', 'error')
      return
    }

    const updatedSubmissions = submissions.map(sub => 
      sub.id === selectedSubmission.id 
        ? { 
            ...sub, 
            score: parseFloat(gradeForm.score),
            feedback: gradeForm.feedback,
            status: 'graded'
          }
        : sub
    )
    
    setSubmissions(updatedSubmissions)
    addNotification('Grade submitted successfully', 'success')
    setShowGradingModal(false)
    setSelectedSubmission(null)
  }

  const getPlagiarismStatus = (score) => {
    if (score < 15) return { color: '#27ae60', label: 'Low Risk' }
    if (score < 30) return { color: '#f39c12', label: 'Medium Risk' }
    return { color: '#e74c3c', label: 'High Risk' }
  }

  const getAIDetectionStatus = (score) => {
    if (score < 20) return { color: '#27ae60', label: 'Human-written' }
    if (score < 50) return { color: '#f39c12', label: 'Possibly AI' }
    return { color: '#e74c3c', label: 'Likely AI' }
  }

  if (loading) {
    return <div className="component-container">Loading homework review...</div>
  }

  return (
    <div className="component-container">
      <div className="component-header">
        <h2>Homework & Assignment Review</h2>
        <div className="header-actions">
          <button className="secondary-button">
            Bulk Grade
          </button>
          <button className="primary-button">
            Export Grades
          </button>
        </div>
      </div>

      <div className="assessment-layout">
        {/* Assignment Selection Sidebar */}
        <div className="assignment-sidebar">
          <h3>Assignments</h3>
          <div className="assignment-list">
            {assignments.map(assignment => {
              const assignmentSubmissions = getSubmissionsForAssignment(assignment.id)
              const completionRate = (assignment.gradedSubmissions / assignment.totalSubmissions) * 100
              
              return (
                <div 
                  key={assignment.id}
                  className={`assignment-item ${selectedAssignment?.id === assignment.id ? 'active' : ''}`}
                  onClick={() => setSelectedAssignment(assignment)}
                >
                  <h4>{assignment.title}</h4>
                  <div className="assignment-meta">
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    <span>{assignment.gradedSubmissions}/{assignment.totalSubmissions} graded</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          {selectedAssignment && (
            <>
              {/* Assignment Details */}
              <div className="assignment-details">
                <h3>{selectedAssignment.title}</h3>
                <p>{selectedAssignment.description}</p>
                <div className="assignment-stats">
                  <div className="stat">
                    <span className="stat-value">{selectedAssignment.totalSubmissions}</span>
                    <span className="stat-label">Total Submissions</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{selectedAssignment.gradedSubmissions}</span>
                    <span className="stat-label">Graded</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{selectedAssignment.totalSubmissions - selectedAssignment.gradedSubmissions}</span>
                    <span className="stat-label">Pending</span>
                  </div>
                </div>
              </div>

              {/* Submissions List */}
              <div className="submissions-section">
                <h4>Submissions</h4>
                <div className="submissions-list">
                  {getSubmissionsForAssignment(selectedAssignment.id).map(submission => {
                    const plagiarismStatus = getPlagiarismStatus(submission.plagiarismScore)
                    const aiStatus = getAIDetectionStatus(submission.aiDetectionScore)
                    
                    return (
                      <div key={submission.id} className="submission-card">
                        <div className="submission-header">
                          <div className="student-info">
                            <h5>{submission.studentName}</h5>
                            <span className="email">{submission.studentEmail}</span>
                          </div>
                          <div className="submission-status">
                            {submission.status === 'graded' ? (
                              <span className="grade-badge">{submission.score}/{selectedAssignment.maxScore}</span>
                            ) : (
                              <span className="status-badge pending">Pending Review</span>
                            )}
                          </div>
                        </div>

                        <div className="submission-meta">
                          <div className="meta-item">
                            <span className="label">File:</span>
                            <span className="value">{submission.fileName} ({submission.fileSize})</span>
                          </div>
                          <div className="meta-item">
                            <span className="label">Submitted:</span>
                            <span className="value">{new Date(submission.submittedAt).toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="detection-results">
                          <div className="detection-item">
                            <span className="detection-label">Plagiarism:</span>
                            <span 
                              className="detection-value"
                              style={{ color: plagiarismStatus.color }}
                            >
                              {submission.plagiarismScore}% - {plagiarismStatus.label}
                            </span>
                          </div>
                          <div className="detection-item">
                            <span className="detection-label">AI Detection:</span>
                            <span 
                              className="detection-value"
                              style={{ color: aiStatus.color }}
                            >
                              {submission.aiDetectionScore}% - {aiStatus.label}
                            </span>
                          </div>
                        </div>

                        <div className="submission-actions">
                          <button 
                            className="secondary-button"
                            onClick={() => {/* Mock PDF viewer */}}
                          >
                            View PDF
                          </button>
                          <button 
                            className="secondary-button"
                            onClick={() => setShowPlagiarismCheck(true)}
                          >
                            Check Details
                          </button>
                          <button 
                            className="primary-button"
                            onClick={() => openGradingModal(submission)}
                          >
                            {submission.status === 'graded' ? 'Edit Grade' : 'Grade'}
                          </button>
                        </div>

                        {submission.feedback && (
                          <div className="feedback-preview">
                            <strong>Feedback:</strong> {submission.feedback}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Grading Modal */}
      {showGradingModal && selectedSubmission && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <h3>Grade Submission - {selectedSubmission.studentName}</h3>
            
            {/* PDF Viewer Placeholder */}
            <div className="pdf-viewer-section">
              <div className="pdf-viewer-placeholder">
                <div className="pdf-header">
                  <span>{selectedSubmission.fileName}</span>
                  <div className="pdf-controls">
                    <button className="icon-button">Zoom In</button>
                    <button className="icon-button">Zoom Out</button>
                    <button className="icon-button">Add Note</button>
                  </div>
                </div>
                <div className="pdf-content">
                  <p>PDF content would be displayed here with annotation tools</p>
                  <p>Students could add highlights, comments, and grades directly on the document</p>
                </div>
              </div>
            </div>

            {/* Grading Form */}
            <div className="grading-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Score *</label>
                  <div className="score-input">
                    <input
                      type="number"
                      value={gradeForm.score}
                      onChange={(e) => setGradeForm({ ...gradeForm, score: e.target.value })}
                      className="form-input"
                      min="0"
                      max={gradeForm.maxScore}
                    />
                    <span className="score-divider">/</span>
                    <span className="max-score">{gradeForm.maxScore}</span>
                  </div>
                </div>
              </div>

              {/* Rubric Scoring */}
              <div className="rubric-section">
                <h4>Rubric Scoring</h4>
                {selectedAssignment?.rubric?.map((criterion, index) => (
                  <div key={index} className="rubric-item">
                    <label>{criterion.criteria}</label>
                    <div className="rubric-score">
                      <input
                        type="number"
                        min="0"
                        max={criterion.maxPoints}
                        className="form-input"
                        placeholder="0"
                      />
                      <span>/ {criterion.maxPoints}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label>Feedback</label>
                <textarea
                  value={gradeForm.feedback}
                  onChange={(e) => setGradeForm({ ...gradeForm, feedback: e.target.value })}
                  className="form-textarea"
                  rows={6}
                  placeholder="Provide detailed feedback to help the student improve..."
                />
              </div>

              {/* Quick Feedback Templates */}
              <div className="feedback-templates">
                <h5>Quick Feedback Templates</h5>
                <div className="template-buttons">
                  <button 
                    className="template-button"
                    onClick={() => setGradeForm({ ...gradeForm, feedback: gradeForm.feedback + 'Good analysis and well-structured argument. ' })}
                  >
                    Good Analysis
                  </button>
                  <button 
                    className="template-button"
                    onClick={() => setGradeForm({ ...gradeForm, feedback: gradeForm.feedback + 'Citations need improvement. Please follow APA format. ' })}
                  >
                    Citation Issues
                  </button>
                  <button 
                    className="template-button"
                    onClick={() => setGradeForm({ ...gradeForm, feedback: gradeForm.feedback + 'Needs more depth in critical analysis. ' })}
                  >
                    Needs Depth
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="secondary-button"
                onClick={() => {
                  setShowGradingModal(false)
                  setSelectedSubmission(null)
                }}
              >
                Cancel
              </button>
              <button 
                className="secondary-button"
                onClick={() => {
                  addNotification('Draft saved', 'success')
                }}
              >
                Save Draft
              </button>
              <button 
                className="primary-button"
                onClick={submitGrade}
              >
                Submit Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomeworkReview