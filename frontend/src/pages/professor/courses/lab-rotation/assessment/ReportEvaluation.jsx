import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../../../contexts/AuthContext'
import { useNotification } from '../../../../../contexts/NotificationContext'
import './ReportEvaluation.css'

const ReportEvaluation = () => {
  const { courseId } = useParams()
  const { user } = useAuth()
  const { addNotification } = useNotification()
  
  const [reports, setReports] = useState([])
  const [selectedReport, setSelectedReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showEvaluationModal, setShowEvaluationModal] = useState(false)
  const [evaluationForm, setEvaluationForm] = useState({
    overallScore: '',
    criteriaScores: {},
    strengths: '',
    improvements: '',
    recommendations: '',
    status: 'draft'
  })
  const [collaborators, setCollaborators] = useState([])
  const [showCollaborationPanel, setShowCollaborationPanel] = useState(false)

  // Evaluation criteria configuration
  const evaluationCriteria = [
    {
      id: 'research_quality',
      name: 'Research Quality',
      description: 'Depth and rigor of research methodology',
      maxScore: 25,
      subcriteria: [
        'Literature review comprehensiveness',
        'Research design appropriateness',
        'Data collection methodology',
        'Analysis rigor'
      ]
    },
    {
      id: 'technical_execution',
      name: 'Technical Execution',
      description: 'Technical skills and implementation quality',
      maxScore: 25,
      subcriteria: [
        'Technical approach',
        'Implementation quality',
        'Problem-solving skills',
        'Innovation and creativity'
      ]
    },
    {
      id: 'communication',
      name: 'Communication',
      description: 'Written communication and presentation of findings',
      maxScore: 25,
      subcriteria: [
        'Clarity of writing',
        'Structure and organization',
        'Use of figures and tables',
        'Academic language usage'
      ]
    },
    {
      id: 'impact_significance',
      name: 'Impact & Significance',
      description: 'Contribution to field and potential impact',
      maxScore: 25,
      subcriteria: [
        'Novelty of contribution',
        'Practical significance',
        'Future research potential',
        'Industry relevance'
      ]
    }
  ]

  // Mock data for demonstration
  useEffect(() => {
    const loadData = () => {
      const mockReports = [
        {
          id: '1',
          studentId: '1',
          studentName: '张三',
          studentEmail: 'zhangsan@university.edu',
          title: 'Machine Learning Applications in Healthcare Diagnosis',
          type: 'milestone',
          milestone: 'Mid-term Report',
          submittedAt: '2025-08-10T14:30:00',
          fileName: 'midterm_report_zhangsan.pdf',
          fileSize: '4.2 MB',
          status: 'evaluated',
          version: 2,
          previousVersions: [
            {
              version: 1,
              submittedAt: '2025-08-05T10:00:00',
              feedback: 'Good start, but needs more depth in methodology section'
            }
          ],
          evaluation: {
            overallScore: 82,
            criteriaScores: {
              research_quality: 20,
              technical_execution: 21,
              communication: 19,
              impact_significance: 22
            },
            strengths: 'Strong technical approach and good understanding of ML algorithms',
            improvements: 'Need to improve literature review and add more recent references',
            recommendations: 'Consider expanding the dataset and exploring additional algorithms',
            evaluatedBy: 'Prof. Zhang',
            evaluatedAt: '2025-08-12T16:45:00'
          }
        },
        {
          id: '2',
          studentId: '2',
          studentName: '李四',
          studentEmail: 'lisi@university.edu',
          title: 'Deep Learning for Medical Image Analysis',
          type: 'milestone',
          milestone: 'Mid-term Report',
          submittedAt: '2025-08-11T09:15:00',
          fileName: 'midterm_report_lisi.pdf',
          fileSize: '3.8 MB',
          status: 'pending',
          version: 1,
          previousVersions: []
        },
        {
          id: '3',
          studentId: '1',
          studentName: '张三',
          studentEmail: 'zhangsan@university.edu',
          title: 'Final Research Report - ML Healthcare Applications',
          type: 'final',
          milestone: 'Final Report',
          submittedAt: '2025-08-15T16:00:00',
          fileName: 'final_report_zhangsan.pdf',
          fileSize: '8.1 MB',
          status: 'pending',
          version: 1,
          previousVersions: []
        }
      ]

      const mockCollaborators = [
        {
          id: '1',
          name: 'Dr. Wang',
          role: 'Co-supervisor',
          email: 'wang@university.edu',
          status: 'active'
        },
        {
          id: '2',
          name: 'Prof. Liu',
          role: 'External Examiner',
          email: 'liu@external.edu',
          status: 'invited'
        }
      ]

      setReports(mockReports)
      setCollaborators(mockCollaborators)
      setLoading(false)
    }
    
    setTimeout(loadData, 500)
  }, [courseId])

  const openEvaluationModal = (report) => {
    setSelectedReport(report)
    
    if (report.evaluation) {
      setEvaluationForm({
        overallScore: report.evaluation.overallScore,
        criteriaScores: report.evaluation.criteriaScores,
        strengths: report.evaluation.strengths,
        improvements: report.evaluation.improvements,
        recommendations: report.evaluation.recommendations,
        status: 'completed'
      })
    } else {
      setEvaluationForm({
        overallScore: '',
        criteriaScores: {},
        strengths: '',
        improvements: '',
        recommendations: '',
        status: 'draft'
      })
    }
    
    setShowEvaluationModal(true)
  }

  const calculateOverallScore = () => {
    const scores = Object.values(evaluationForm.criteriaScores)
    if (scores.length === 0) return 0
    return scores.reduce((sum, score) => sum + (parseFloat(score) || 0), 0)
  }

  const submitEvaluation = () => {
    const overallScore = calculateOverallScore()
    
    if (overallScore === 0) {
      addNotification('Please provide scores for evaluation criteria', 'error')
      return
    }

    const updatedReports = reports.map(report => 
      report.id === selectedReport.id 
        ? { 
            ...report, 
            status: 'evaluated',
            evaluation: {
              ...evaluationForm,
              overallScore,
              evaluatedBy: user.name,
              evaluatedAt: new Date().toISOString()
            }
          }
        : report
    )
    
    setReports(updatedReports)
    addNotification('Evaluation submitted successfully', 'success')
    setShowEvaluationModal(false)
    setSelectedReport(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f39c12'
      case 'evaluated': return '#27ae60'
      case 'revision_needed': return '#e74c3c'
      default: return '#7f8c8d'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pending Review'
      case 'evaluated': return 'Evaluated'
      case 'revision_needed': return 'Needs Revision'
      default: return 'Unknown'
    }
  }

  const exportEvaluation = (report) => {
    // Mock export functionality
    addNotification(`Exporting evaluation for ${report.studentName}`, 'info')
  }

  if (loading) {
    return <div className="component-container">Loading research report evaluations...</div>
  }

  return (
    <div className="component-container">
      <div className="component-header">
        <h2>Research Report Evaluation</h2>
        <div className="header-actions">
          <button 
            className="secondary-button"
            onClick={() => setShowCollaborationPanel(true)}
          >
            Manage Collaborators
          </button>
          <button className="primary-button">
            Evaluation Summary
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{reports.length}</h3>
          <p>Total Reports</p>
        </div>
        <div className="stat-card">
          <h3>{reports.filter(r => r.status === 'pending').length}</h3>
          <p>Pending Review</p>
        </div>
        <div className="stat-card">
          <h3>{reports.filter(r => r.status === 'evaluated').length}</h3>
          <p>Evaluated</p>
        </div>
        <div className="stat-card">
          <h3>{reports.filter(r => r.type === 'final').length}</h3>
          <p>Final Reports</p>
        </div>
      </div>

      {/* Reports List */}
      <div className="reports-section">
        <h3>Submitted Reports</h3>
        <div className="reports-list">
          {reports.map(report => (
            <div key={report.id} className="report-card">
              <div className="report-header">
                <div className="report-info">
                  <h4>{report.title}</h4>
                  <div className="report-meta">
                    <span className="student-name">{report.studentName}</span>
                    <span className="milestone-badge">{report.milestone}</span>
                    <span className="version-info">v{report.version}</span>
                  </div>
                </div>
                <div className="report-status">
                  <span 
                    className="status-badge"
                    style={{ 
                      backgroundColor: getStatusColor(report.status) + '20',
                      color: getStatusColor(report.status)
                    }}
                  >
                    {getStatusLabel(report.status)}
                  </span>
                </div>
              </div>

              <div className="report-details">
                <div className="detail-item">
                  <span className="label">File:</span>
                  <span className="value">{report.fileName} ({report.fileSize})</span>
                </div>
                <div className="detail-item">
                  <span className="label">Submitted:</span>
                  <span className="value">{new Date(report.submittedAt).toLocaleString()}</span>
                </div>
                {report.evaluation && (
                  <div className="detail-item">
                    <span className="label">Score:</span>
                    <span className="value grade-display">{report.evaluation.overallScore}/100</span>
                  </div>
                )}
              </div>

              {/* Version History */}
              {report.previousVersions.length > 0 && (
                <div className="version-history">
                  <h5>Previous Versions:</h5>
                  {report.previousVersions.map((version, index) => (
                    <div key={index} className="version-item">
                      <span>v{version.version} - {new Date(version.submittedAt).toLocaleDateString()}</span>
                      {version.feedback && <p className="version-feedback">{version.feedback}</p>}
                    </div>
                  ))}
                </div>
              )}

              <div className="report-actions">
                <button 
                  className="secondary-button"
                  onClick={() => {/* Mock PDF viewer */}}
                >
                  View PDF
                </button>
                <button 
                  className="secondary-button"
                  onClick={() => openEvaluationModal(report)}
                >
                  {report.status === 'evaluated' ? 'View Evaluation' : 'Evaluate'}
                </button>
                {report.evaluation && (
                  <button 
                    className="secondary-button"
                    onClick={() => exportEvaluation(report)}
                  >
                    Export
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evaluation Modal */}
      {showEvaluationModal && selectedReport && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <h3>Evaluate Report - {selectedReport.studentName}</h3>
            
            {/* PDF Viewer Section */}
            <div className="pdf-viewer-section">
              <div className="pdf-viewer-placeholder">
                <div className="pdf-header">
                  <span>{selectedReport.fileName}</span>
                  <div className="pdf-controls">
                    <button className="icon-button">Zoom In</button>
                    <button className="icon-button">Zoom Out</button>
                    <button className="icon-button">Add Comment</button>
                    <button className="icon-button">Highlight</button>
                  </div>
                </div>
                <div className="pdf-content">
                  <h4>{selectedReport.title}</h4>
                  <p>PDF document would be displayed here with full annotation capabilities</p>
                  <p>Professors can highlight text, add comments, and score different sections</p>
                </div>
              </div>
            </div>

            {/* Evaluation Form */}
            <div className="evaluation-form">
              <h4>Evaluation Criteria</h4>
              
              {evaluationCriteria.map(criterion => (
                <div key={criterion.id} className="criterion-section">
                  <div className="criterion-header">
                    <h5>{criterion.name}</h5>
                    <div className="criterion-score">
                      <input
                        type="number"
                        min="0"
                        max={criterion.maxScore}
                        value={evaluationForm.criteriaScores[criterion.id] || ''}
                        onChange={(e) => setEvaluationForm({
                          ...evaluationForm,
                          criteriaScores: {
                            ...evaluationForm.criteriaScores,
                            [criterion.id]: e.target.value
                          }
                        })}
                        className="score-input"
                        placeholder="0"
                      />
                      <span>/ {criterion.maxScore}</span>
                    </div>
                  </div>
                  
                  <p className="criterion-description">{criterion.description}</p>
                  
                  <div className="subcriteria">
                    <strong>Evaluation Points:</strong>
                    <ul>
                      {criterion.subcriteria.map((sub, index) => (
                        <li key={index}>{sub}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {/* Overall Score Display */}
              <div className="overall-score">
                <h4>Overall Score: {calculateOverallScore()}/100</h4>
                <div className="score-breakdown">
                  {evaluationCriteria.map(criterion => (
                    <div key={criterion.id} className="score-item">
                      <span>{criterion.name}:</span>
                      <span>{evaluationForm.criteriaScores[criterion.id] || 0}/{criterion.maxScore}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Qualitative Feedback */}
              <div className="feedback-section">
                <div className="form-group">
                  <label>Strengths</label>
                  <textarea
                    value={evaluationForm.strengths}
                    onChange={(e) => setEvaluationForm({ ...evaluationForm, strengths: e.target.value })}
                    className="form-textarea"
                    rows={3}
                    placeholder="Highlight the main strengths of this report..."
                  />
                </div>

                <div className="form-group">
                  <label>Areas for Improvement</label>
                  <textarea
                    value={evaluationForm.improvements}
                    onChange={(e) => setEvaluationForm({ ...evaluationForm, improvements: e.target.value })}
                    className="form-textarea"
                    rows={3}
                    placeholder="Identify specific areas that need improvement..."
                  />
                </div>

                <div className="form-group">
                  <label>Recommendations for Future Work</label>
                  <textarea
                    value={evaluationForm.recommendations}
                    onChange={(e) => setEvaluationForm({ ...evaluationForm, recommendations: e.target.value })}
                    className="form-textarea"
                    rows={3}
                    placeholder="Provide recommendations for future research directions..."
                  />
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="secondary-button"
                onClick={() => {
                  setShowEvaluationModal(false)
                  setSelectedReport(null)
                }}
              >
                Cancel
              </button>
              <button 
                className="secondary-button"
                onClick={() => {
                  setEvaluationForm({ ...evaluationForm, status: 'draft' })
                  addNotification('Draft saved', 'success')
                }}
              >
                Save Draft
              </button>
              <button 
                className="primary-button"
                onClick={submitEvaluation}
              >
                Submit Evaluation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collaboration Panel */}
      {showCollaborationPanel && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Manage Collaborators</h3>
            
            <div className="collaborators-list">
              {collaborators.map(collaborator => (
                <div key={collaborator.id} className="collaborator-item">
                  <div className="collaborator-info">
                    <h5>{collaborator.name}</h5>
                    <span className="role">{collaborator.role}</span>
                    <span className="email">{collaborator.email}</span>
                  </div>
                  <div className="collaborator-status">
                    <span className={`status ${collaborator.status}`}>
                      {collaborator.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="add-collaborator">
              <h4>Invite New Collaborator</h4>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email address"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <select className="form-select">
                  <option value="">Select role...</option>
                  <option value="co-supervisor">Co-supervisor</option>
                  <option value="external-examiner">External Examiner</option>
                  <option value="reviewer">Reviewer</option>
                </select>
              </div>
              <button className="primary-button">Send Invitation</button>
            </div>

            <div className="modal-actions">
              <button 
                className="secondary-button"
                onClick={() => setShowCollaborationPanel(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReportEvaluation