import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../../../contexts/AuthContext'
import { useNotification } from '../../../../../contexts/NotificationContext'
import './FinalGrading.css'

const FinalGrading = () => {
  const { courseId } = useParams()
  const { user } = useAuth()
  const { addNotification } = useNotification()
  
  const [students, setStudents] = useState([])
  const [gradingConfig, setGradingConfig] = useState({
    homework: 20,
    midtermReport: 25,
    finalReport: 30,
    presentation: 25
  })
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [showGradeDetailModal, setShowGradeDetailModal] = useState(false)
  const [showBatchProcessModal, setShowBatchProcessModal] = useState(false)
  const [gradeOverrides, setGradeOverrides] = useState({})
  const [comments, setComments] = useState({})
  const [submissionStatus, setSubmissionStatus] = useState('draft')

  // Mock data for demonstration
  useEffect(() => {
    const loadData = () => {
      const mockStudents = [
        {
          id: '1',
          name: '张三',
          email: 'zhangsan@university.edu',
          studentId: 'ST001',
          status: 'active',
          assessments: {
            homework: [
              { title: 'Literature Review', score: 85, maxScore: 100, weight: 0.4 },
              { title: 'Methodology Design', score: 88, maxScore: 100, weight: 0.6 }
            ],
            midtermReport: {
              score: 82,
              maxScore: 100,
              submittedAt: '2025-08-10',
              evaluatedBy: 'Prof. Zhang'
            },
            finalReport: {
              score: 87,
              maxScore: 100,
              submittedAt: '2025-08-20',
              evaluatedBy: 'Prof. Zhang'
            },
            presentation: {
              score: 89,
              maxScore: 100,
              presentedAt: '2025-08-22',
              evaluatedBy: 'Prof. Zhang'
            }
          },
          attendance: {
            total: 16,
            attended: 15,
            percentage: 93.75
          },
          finalGrade: null,
          gradeStatus: 'pending',
          lastUpdated: null
        },
        {
          id: '2',
          name: '李四',
          email: 'lisi@university.edu',
          studentId: 'ST002',
          status: 'active',
          assessments: {
            homework: [
              { title: 'Literature Review', score: 78, maxScore: 100, weight: 0.4 },
              { title: 'Methodology Design', score: 82, maxScore: 100, weight: 0.6 }
            ],
            midtermReport: {
              score: 75,
              maxScore: 100,
              submittedAt: '2025-08-11',
              evaluatedBy: 'Prof. Zhang'
            },
            finalReport: {
              score: 80,
              maxScore: 100,
              submittedAt: '2025-08-21',
              evaluatedBy: 'Prof. Zhang'
            },
            presentation: {
              score: 85,
              maxScore: 100,
              presentedAt: '2025-08-23',
              evaluatedBy: 'Prof. Zhang'
            }
          },
          attendance: {
            total: 16,
            attended: 14,
            percentage: 87.5
          },
          finalGrade: 80.2,
          gradeStatus: 'submitted',
          lastUpdated: '2025-08-24T10:30:00'
        },
        {
          id: '3',
          name: '王五',
          email: 'wangwu@university.edu',
          studentId: 'ST003',
          status: 'active',
          assessments: {
            homework: [
              { title: 'Literature Review', score: 92, maxScore: 100, weight: 0.4 },
              { title: 'Methodology Design', score: 90, maxScore: 100, weight: 0.6 }
            ],
            midtermReport: {
              score: 88,
              maxScore: 100,
              submittedAt: '2025-08-09',
              evaluatedBy: 'Prof. Zhang'
            },
            finalReport: {
              score: 92,
              maxScore: 100,
              submittedAt: '2025-08-19',
              evaluatedBy: 'Prof. Zhang'
            },
            presentation: {
              score: 94,
              maxScore: 100,
              presentedAt: '2025-08-21',
              evaluatedBy: 'Prof. Zhang'
            }
          },
          attendance: {
            total: 16,
            attended: 16,
            percentage: 100
          },
          finalGrade: null,
          gradeStatus: 'pending',
          lastUpdated: null
        }
      ]

      setStudents(mockStudents)
      setLoading(false)
    }
    
    setTimeout(loadData, 500)
  }, [courseId])

  const calculateHomeworkAverage = (homework) => {
    if (!homework || homework.length === 0) return 0
    const totalWeightedScore = homework.reduce((sum, hw) => sum + (hw.score * hw.weight), 0)
    return totalWeightedScore
  }

  const calculateFinalGrade = (student) => {
    const homeworkAvg = calculateHomeworkAverage(student.assessments.homework)
    const midtermScore = student.assessments.midtermReport?.score || 0
    const finalReportScore = student.assessments.finalReport?.score || 0
    const presentationScore = student.assessments.presentation?.score || 0

    const finalGrade = (
      homeworkAvg * (gradingConfig.homework / 100) +
      midtermScore * (gradingConfig.midtermReport / 100) +
      finalReportScore * (gradingConfig.finalReport / 100) +
      presentationScore * (gradingConfig.presentation / 100)
    )

    // Apply manual override if exists
    const studentOverride = gradeOverrides[student.id]
    return studentOverride !== undefined ? studentOverride : finalGrade
  }

  const getLetterGrade = (numericGrade) => {
    if (numericGrade >= 90) return 'A'
    if (numericGrade >= 80) return 'B'
    if (numericGrade >= 70) return 'C'
    if (numericGrade >= 60) return 'D'
    return 'F'
  }

  const getGradeColor = (grade) => {
    const letterGrade = getLetterGrade(grade)
    switch (letterGrade) {
      case 'A': return '#27ae60'
      case 'B': return '#3498db'
      case 'C': return '#f39c12'
      case 'D': return '#e67e22'
      case 'F': return '#e74c3c'
      default: return '#7f8c8d'
    }
  }

  const updateGradingConfig = () => {
    const total = Object.values(gradingConfig).reduce((sum, weight) => sum + weight, 0)
    if (total !== 100) {
      addNotification('Grade weights must total 100%', 'error')
      return
    }
    
    addNotification('Grading configuration updated', 'success')
    setShowConfigModal(false)
  }

  const submitFinalGrades = () => {
    const pendingStudents = students.filter(s => s.gradeStatus === 'pending')
    
    if (pendingStudents.length === 0) {
      addNotification('No pending grades to submit', 'warning')
      return
    }

    const updatedStudents = students.map(student => {
      if (student.gradeStatus === 'pending') {
        return {
          ...student,
          finalGrade: calculateFinalGrade(student),
          gradeStatus: 'submitted',
          lastUpdated: new Date().toISOString(),
          comments: comments[student.id] || ''
        }
      }
      return student
    })

    setStudents(updatedStudents)
    setSubmissionStatus('submitted')
    addNotification(`Final grades submitted for ${pendingStudents.length} students`, 'success')
  }

  const handleGradeOverride = (studentId, newGrade) => {
    setGradeOverrides({
      ...gradeOverrides,
      [studentId]: parseFloat(newGrade)
    })
  }

  const exportGrades = () => {
    const gradeData = students.map(student => ({
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      finalGrade: student.finalGrade || calculateFinalGrade(student),
      letterGrade: getLetterGrade(student.finalGrade || calculateFinalGrade(student)),
      status: student.gradeStatus,
      lastUpdated: student.lastUpdated
    }))

    // Mock export functionality
    console.log('Exporting grades:', gradeData)
    addNotification('Grade report exported successfully', 'success')
  }

  const openGradeDetails = (student) => {
    setSelectedStudent(student)
    setShowGradeDetailModal(true)
  }

  const getGradeDistribution = () => {
    const distribution = { A: 0, B: 0, C: 0, D: 0, F: 0 }
    students.forEach(student => {
      const grade = student.finalGrade || calculateFinalGrade(student)
      const letter = getLetterGrade(grade)
      distribution[letter]++
    })
    return distribution
  }

  if (loading) {
    return <div className="component-container">Loading final grading...</div>
  }

  const gradeDistribution = getGradeDistribution()
  const averageGrade = students.reduce((sum, student) => 
    sum + (student.finalGrade || calculateFinalGrade(student)), 0
  ) / students.length

  return (
    <div className="component-container">
      <div className="component-header">
        <h2>Final Grade Calculation</h2>
        <div className="header-actions">
          <button 
            className="secondary-button"
            onClick={() => setShowConfigModal(true)}
          >
            Configure Weights
          </button>
          <button 
            className="secondary-button"
            onClick={() => setShowBatchProcessModal(true)}
          >
            Batch Process
          </button>
          <button 
            className="secondary-button"
            onClick={exportGrades}
          >
            Export Grades
          </button>
          <button 
            className="primary-button"
            onClick={submitFinalGrades}
            disabled={submissionStatus === 'submitted'}
          >
            Submit Final Grades
          </button>
        </div>
      </div>

      {/* Grade Statistics */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{students.length}</h3>
            <p>Total Students</p>
          </div>
          <div className="stat-card">
            <h3>{students.filter(s => s.gradeStatus === 'pending').length}</h3>
            <p>Pending Grades</p>
          </div>
          <div className="stat-card">
            <h3>{averageGrade.toFixed(1)}</h3>
            <p>Class Average</p>
          </div>
          <div className="stat-card">
            <h3>{students.filter(s => s.gradeStatus === 'submitted').length}</h3>
            <p>Submitted</p>
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="distribution-card">
          <h4>Grade Distribution</h4>
          <div className="distribution-chart">
            {Object.entries(gradeDistribution).map(([grade, count]) => (
              <div key={grade} className="distribution-item">
                <div className="grade-label">{grade}</div>
                <div className="grade-count">{count}</div>
                <div 
                  className="grade-bar"
                  style={{ 
                    height: `${(count / students.length) * 100}%`,
                    backgroundColor: getGradeColor(grade === 'A' ? 95 : grade === 'B' ? 85 : grade === 'C' ? 75 : grade === 'D' ? 65 : 55)
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grading Configuration Display */}
      <div className="config-display">
        <h3>Current Grading Configuration</h3>
        <div className="config-weights">
          <div className="weight-item">
            <span>Homework:</span>
            <span>{gradingConfig.homework}%</span>
          </div>
          <div className="weight-item">
            <span>Midterm Report:</span>
            <span>{gradingConfig.midtermReport}%</span>
          </div>
          <div className="weight-item">
            <span>Final Report:</span>
            <span>{gradingConfig.finalReport}%</span>
          </div>
          <div className="weight-item">
            <span>Presentation:</span>
            <span>{gradingConfig.presentation}%</span>
          </div>
        </div>
      </div>

      {/* Students Grade Table */}
      <div className="grades-section">
        <h3>Student Grades</h3>
        <div className="grades-table">
          <div className="table-header">
            <div className="header-cell">Student</div>
            <div className="header-cell">Homework</div>
            <div className="header-cell">Midterm</div>
            <div className="header-cell">Final Report</div>
            <div className="header-cell">Presentation</div>
            <div className="header-cell">Final Grade</div>
            <div className="header-cell">Status</div>
            <div className="header-cell">Actions</div>
          </div>
          
          {students.map(student => {
            const finalGrade = student.finalGrade || calculateFinalGrade(student)
            const homeworkAvg = calculateHomeworkAverage(student.assessments.homework)
            
            return (
              <div key={student.id} className="table-row">
                <div className="table-cell student-info">
                  <div>
                    <strong>{student.name}</strong>
                    <span className="student-id">{student.studentId}</span>
                  </div>
                </div>
                
                <div className="table-cell score-cell">
                  <span className="score">{homeworkAvg.toFixed(1)}</span>
                  <span className="weight">({gradingConfig.homework}%)</span>
                </div>
                
                <div className="table-cell score-cell">
                  <span className="score">{student.assessments.midtermReport?.score || 'N/A'}</span>
                  <span className="weight">({gradingConfig.midtermReport}%)</span>
                </div>
                
                <div className="table-cell score-cell">
                  <span className="score">{student.assessments.finalReport?.score || 'N/A'}</span>
                  <span className="weight">({gradingConfig.finalReport}%)</span>
                </div>
                
                <div className="table-cell score-cell">
                  <span className="score">{student.assessments.presentation?.score || 'N/A'}</span>
                  <span className="weight">({gradingConfig.presentation}%)</span>
                </div>
                
                <div className="table-cell final-grade-cell">
                  <div className="grade-display">
                    <span 
                      className="numeric-grade"
                      style={{ color: getGradeColor(finalGrade) }}
                    >
                      {finalGrade.toFixed(1)}
                    </span>
                    <span 
                      className="letter-grade"
                      style={{ backgroundColor: getGradeColor(finalGrade) }}
                    >
                      {getLetterGrade(finalGrade)}
                    </span>
                  </div>
                  {gradeOverrides[student.id] !== undefined && (
                    <span className="override-indicator">Override</span>
                  )}
                </div>
                
                <div className="table-cell status-cell">
                  <span className={`status-badge ${student.gradeStatus}`}>
                    {student.gradeStatus === 'pending' ? 'Pending' : 'Submitted'}
                  </span>
                </div>
                
                <div className="table-cell actions-cell">
                  <button 
                    className="action-button"
                    onClick={() => openGradeDetails(student)}
                  >
                    Details
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Grade Configuration Modal */}
      {showConfigModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Configure Grade Weights</h3>
            
            <div className="config-form">
              <div className="form-group">
                <label>Homework Weight (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={gradingConfig.homework}
                  onChange={(e) => setGradingConfig({
                    ...gradingConfig,
                    homework: parseInt(e.target.value) || 0
                  })}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Midterm Report Weight (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={gradingConfig.midtermReport}
                  onChange={(e) => setGradingConfig({
                    ...gradingConfig,
                    midtermReport: parseInt(e.target.value) || 0
                  })}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Final Report Weight (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={gradingConfig.finalReport}
                  onChange={(e) => setGradingConfig({
                    ...gradingConfig,
                    finalReport: parseInt(e.target.value) || 0
                  })}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Presentation Weight (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={gradingConfig.presentation}
                  onChange={(e) => setGradingConfig({
                    ...gradingConfig,
                    presentation: parseInt(e.target.value) || 0
                  })}
                  className="form-input"
                />
              </div>
              
              <div className="total-weight">
                Total: {Object.values(gradingConfig).reduce((sum, weight) => sum + weight, 0)}%
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="secondary-button"
                onClick={() => setShowConfigModal(false)}
              >
                Cancel
              </button>
              <button 
                className="primary-button"
                onClick={updateGradingConfig}
              >
                Update Configuration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grade Details Modal */}
      {showGradeDetailModal && selectedStudent && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <h3>Grade Details - {selectedStudent.name}</h3>
            
            <div className="grade-details">
              {/* Assessment Breakdown */}
              <div className="assessment-breakdown">
                <h4>Assessment Breakdown</h4>
                
                <div className="breakdown-section">
                  <h5>Homework Assignments</h5>
                  {selectedStudent.assessments.homework.map((hw, index) => (
                    <div key={index} className="breakdown-item">
                      <span>{hw.title}</span>
                      <span>{hw.score}/{hw.maxScore} (Weight: {(hw.weight * 100).toFixed(0)}%)</span>
                    </div>
                  ))}
                  <div className="breakdown-total">
                    Average: {calculateHomeworkAverage(selectedStudent.assessments.homework).toFixed(1)}
                  </div>
                </div>

                <div className="breakdown-section">
                  <h5>Reports & Presentation</h5>
                  <div className="breakdown-item">
                    <span>Midterm Report</span>
                    <span>{selectedStudent.assessments.midtermReport?.score || 'N/A'}/100</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Final Report</span>
                    <span>{selectedStudent.assessments.finalReport?.score || 'N/A'}/100</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Presentation</span>
                    <span>{selectedStudent.assessments.presentation?.score || 'N/A'}/100</span>
                  </div>
                </div>
              </div>

              {/* Grade Override */}
              <div className="grade-override-section">
                <h4>Grade Override</h4>
                <div className="override-form">
                  <label>Manual Grade Override</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={gradeOverrides[selectedStudent.id] || ''}
                    onChange={(e) => handleGradeOverride(selectedStudent.id, e.target.value)}
                    className="form-input"
                    placeholder="Leave empty for automatic calculation"
                  />
                  <small>Current calculated grade: {calculateFinalGrade(selectedStudent).toFixed(1)}</small>
                </div>
              </div>

              {/* Comments */}
              <div className="comments-section">
                <h4>Additional Comments</h4>
                <textarea
                  value={comments[selectedStudent.id] || ''}
                  onChange={(e) => setComments({
                    ...comments,
                    [selectedStudent.id]: e.target.value
                  })}
                  className="form-textarea"
                  rows={4}
                  placeholder="Add any additional comments for this student's final grade..."
                />
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="secondary-button"
                onClick={() => {
                  setShowGradeDetailModal(false)
                  setSelectedStudent(null)
                }}
              >
                Close
              </button>
              <button 
                className="primary-button"
                onClick={() => {
                  addNotification('Grade details saved', 'success')
                  setShowGradeDetailModal(false)
                  setSelectedStudent(null)
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FinalGrading