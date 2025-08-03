import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Layout from '../../../../components/Layout'
import MaterialsViewer from './MaterialsViewer'
import ScoringSystem from './ScoringSystem'
import CommentsSystem from './CommentsSystem'
import './EvaluationInterface.css'

function EvaluationInterface() {
  const { courseId, studentId } = useParams()
  const navigate = useNavigate()
  const [currentTab, setCurrentTab] = useState('materials')
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved')
  
  const [studentData, setStudentData] = useState({
    id: studentId,
    name: 'Li Wang',
    studentId: '2021001',
    program: 'Computer Science PhD',
    advisor: 'Prof. Chen Zhang',
    year: '3rd Year',
    submissionDate: '2025-01-10',
    evaluationType: 'Comprehensive Review',
    deadline: '2025-01-15',
    status: 'pending'
  })

  const [evaluationData, setEvaluationData] = useState({
    scores: {},
    comments: {},
    overallFeedback: '',
    recommendation: '',
    completionStatus: 0
  })

  const [materials, setMaterials] = useState([
    {
      id: 1,
      type: 'academic',
      category: 'Transcripts',
      title: 'Academic Transcript - Fall 2024',
      filename: 'transcript_fall_2024.pdf',
      uploadDate: '2025-01-08',
      size: '2.1 MB',
      status: 'reviewed'
    },
    {
      id: 2,
      type: 'research',
      category: 'Publications',
      title: 'Research Paper: Machine Learning Applications',
      filename: 'research_paper_ml.pdf',
      uploadDate: '2025-01-09',
      size: '4.8 MB',
      status: 'pending'
    },
    {
      id: 3,
      type: 'achievements',
      category: 'Awards',
      title: 'Outstanding Student Award Certificate',
      filename: 'award_certificate.pdf',
      uploadDate: '2025-01-10',
      size: '1.3 MB',
      status: 'reviewed'
    },
    {
      id: 4,
      type: 'research',
      category: 'Thesis Progress',
      title: 'Dissertation Chapter 1 Draft',
      filename: 'dissertation_ch1.docx',
      uploadDate: '2025-01-10',
      size: '3.2 MB',
      status: 'pending'
    }
  ])

  const handleTabChange = (tab) => {
    setCurrentTab(tab)
  }

  const handleSave = async (type, data) => {
    setAutoSaveStatus('saving')
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (type === 'scores') {
        setEvaluationData(prev => ({ ...prev, scores: { ...prev.scores, ...data } }))
      } else if (type === 'comments') {
        setEvaluationData(prev => ({ ...prev, comments: { ...prev.comments, ...data } }))
      }
      
      setAutoSaveStatus('saved')
    } catch (error) {
      setAutoSaveStatus('error')
    }
  }

  const handleSubmitEvaluation = async () => {
    if (window.confirm('Are you sure you want to submit this evaluation? Once submitted, it cannot be modified.')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        navigate(`/professor/courses/comprehensive-eval/${courseId}/expert-dashboard`)
      } catch (error) {
        alert('Error submitting evaluation. Please try again.')
      }
    }
  }

  const getCompletionPercentage = () => {
    const totalSections = 5 // materials, academic, research, innovation, overall
    let completedSections = 0
    
    if (Object.keys(evaluationData.scores).length > 0) completedSections++
    if (Object.keys(evaluationData.comments).length > 0) completedSections++
    if (evaluationData.overallFeedback) completedSections++
    
    return Math.round((completedSections / totalSections) * 100)
  }

  useEffect(() => {
    // Auto-save every 30 seconds if there are changes
    const autoSaveInterval = setInterval(() => {
      if (autoSaveStatus === 'modified') {
        handleSave('auto', evaluationData)
      }
    }, 30000)

    return () => clearInterval(autoSaveInterval)
  }, [evaluationData, autoSaveStatus])

  return (
    <Layout role="professor">
      <div className="evaluation-interface">
        <header className="evaluation-header">
          <div className="header-content">
            <div className="breadcrumb">
              <Link to={`/professor/courses/comprehensive-eval/${courseId}/expert-dashboard`}>
                Expert Dashboard
              </Link>
              <span className="separator">›</span>
              <span className="current">Student Evaluation</span>
            </div>
            
            <div className="student-info-header">
              <h1>{studentData.name}</h1>
              <div className="student-meta">
                <span className="student-id">ID: {studentData.studentId}</span>
                <span className="program">{studentData.program}</span>
                <span className="evaluation-type">{studentData.evaluationType}</span>
              </div>
            </div>

            <div className="evaluation-progress">
              <div className="progress-info">
                <span className="progress-label">Completion: {getCompletionPercentage()}%</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${getCompletionPercentage()}%` }}
                  />
                </div>
              </div>
              <div className="save-status">
                <span className={`save-indicator ${autoSaveStatus}`}>
                  {autoSaveStatus === 'saving' && '💾 Saving...'}
                  {autoSaveStatus === 'saved' && '✅ Saved'}
                  {autoSaveStatus === 'error' && '❌ Error'}
                  {autoSaveStatus === 'modified' && '⚡ Unsaved changes'}
                </span>
              </div>
            </div>
          </div>
        </header>

        <nav className="evaluation-tabs">
          <button 
            className={`tab-button ${currentTab === 'materials' ? 'active' : ''}`}
            onClick={() => handleTabChange('materials')}
          >
            📄 Materials Review
          </button>
          <button 
            className={`tab-button ${currentTab === 'scoring' ? 'active' : ''}`}
            onClick={() => handleTabChange('scoring')}
          >
            📊 Scoring & Evaluation
          </button>
          <button 
            className={`tab-button ${currentTab === 'comments' ? 'active' : ''}`}
            onClick={() => handleTabChange('comments')}
          >
            💬 Comments & Feedback
          </button>
          <button 
            className={`tab-button ${currentTab === 'summary' ? 'active' : ''}`}
            onClick={() => handleTabChange('summary')}
          >
            📋 Summary & Submit
          </button>
        </nav>

        <main className="evaluation-content">
          {currentTab === 'materials' && (
            <MaterialsViewer 
              materials={materials}
              studentData={studentData}
              onMaterialUpdate={(updatedMaterials) => setMaterials(updatedMaterials)}
            />
          )}
          
          {currentTab === 'scoring' && (
            <ScoringSystem
              studentData={studentData}
              evaluationData={evaluationData}
              onScoreUpdate={(scores) => handleSave('scores', scores)}
              onAutoSave={() => setAutoSaveStatus('modified')}
            />
          )}
          
          {currentTab === 'comments' && (
            <CommentsSystem
              studentData={studentData}
              evaluationData={evaluationData}
              onCommentsUpdate={(comments) => handleSave('comments', comments)}
              onAutoSave={() => setAutoSaveStatus('modified')}
            />
          )}
          
          {currentTab === 'summary' && (
            <div className="evaluation-summary">
              <h2>Evaluation Summary</h2>
              <div className="summary-content">
                <div className="summary-section">
                  <h3>Student Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Name:</span>
                      <span className="value">{studentData.name}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Student ID:</span>
                      <span className="value">{studentData.studentId}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Program:</span>
                      <span className="value">{studentData.program}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Evaluation Type:</span>
                      <span className="value">{studentData.evaluationType}</span>
                    </div>
                  </div>
                </div>

                <div className="summary-section">
                  <h3>Evaluation Status</h3>
                  <div className="status-grid">
                    <div className="status-item">
                      <span className="label">Materials Reviewed:</span>
                      <span className="value">{materials.filter(m => m.status === 'reviewed').length}/{materials.length}</span>
                    </div>
                    <div className="status-item">
                      <span className="label">Scores Completed:</span>
                      <span className="value">{Object.keys(evaluationData.scores).length}/5</span>
                    </div>
                    <div className="status-item">
                      <span className="label">Comments Provided:</span>
                      <span className="value">{Object.keys(evaluationData.comments).length > 0 ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="status-item">
                      <span className="label">Overall Progress:</span>
                      <span className="value">{getCompletionPercentage()}%</span>
                    </div>
                  </div>
                </div>

                <div className="summary-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleSave('draft', evaluationData)}
                  >
                    💾 Save as Draft
                  </button>
                  <button 
                    className={`btn-primary ${getCompletionPercentage() < 80 ? 'disabled' : ''}`}
                    onClick={handleSubmitEvaluation}
                    disabled={getCompletionPercentage() < 80}
                  >
                    📤 Submit Evaluation
                  </button>
                </div>
                
                {getCompletionPercentage() < 80 && (
                  <div className="completion-warning">
                    ⚠️ Please complete at least 80% of the evaluation before submitting.
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        <aside className="evaluation-sidebar">
          <div className="sidebar-section">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button className="action-btn">📋 View Rubric</button>
              <button className="action-btn">📄 Load Template</button>
              <button className="action-btn">💾 Save Progress</button>
              <button className="action-btn">❓ Get Help</button>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Evaluation Guidelines</h3>
            <div className="guidelines">
              <ul>
                <li>Review all materials thoroughly</li>
                <li>Provide constructive feedback</li>
                <li>Use objective scoring criteria</li>
                <li>Document your reasoning</li>
                <li>Submit by deadline: {studentData.deadline}</li>
              </ul>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Keyboard Shortcuts</h3>
            <div className="shortcuts">
              <div className="shortcut">
                <kbd>Ctrl + S</kbd> <span>Save</span>
              </div>
              <div className="shortcut">
                <kbd>Ctrl + 1-4</kbd> <span>Switch tabs</span>
              </div>
              <div className="shortcut">
                <kbd>Esc</kbd> <span>Exit</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  )
}

export default EvaluationInterface