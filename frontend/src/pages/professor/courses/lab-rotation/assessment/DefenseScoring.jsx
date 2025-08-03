import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../../../contexts/AuthContext'
import { useNotification } from '../../../../../contexts/NotificationContext'
import './DefenseScoring.css'

const DefenseScoring = () => {
  const { courseId } = useParams()
  const { user } = useAuth()
  const { addNotification } = useNotification()
  
  const [presentations, setPresentations] = useState([])
  const [selectedPresentation, setSelectedPresentation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showScoringModal, setShowScoringModal] = useState(false)
  const [isLiveScoring, setIsLiveScoring] = useState(false)
  const [scoringForm, setScoringForm] = useState({
    criteriaScores: {},
    totalScore: 0,
    feedback: '',
    recommendations: '',
    questions: [],
    status: 'draft'
  })
  const [timer, setTimer] = useState(null)
  const [presentationTime, setPresentationTime] = useState(0)

  // Presentation scoring criteria
  const scoringCriteria = [
    {
      id: 'content_quality',
      name: 'Content Quality',
      description: 'Accuracy, depth, and relevance of content',
      maxScore: 25,
      subcriteria: [
        'Research depth and accuracy',
        'Problem understanding',
        'Solution appropriateness',
        'Technical competence'
      ]
    },
    {
      id: 'presentation_skills',
      name: 'Presentation Skills',
      description: 'Communication effectiveness and delivery',
      maxScore: 20,
      subcriteria: [
        'Clarity of explanation',
        'Voice and pace',
        'Eye contact and engagement',
        'Confidence and composure'
      ]
    },
    {
      id: 'visual_aids',
      name: 'Visual Aids & Materials',
      description: 'Quality and effectiveness of slides and demonstrations',
      maxScore: 15,
      subcriteria: [
        'Slide design and clarity',
        'Use of figures and diagrams',
        'Demonstration quality',
        'Supporting materials'
      ]
    },
    {
      id: 'time_management',
      name: 'Time Management',
      description: 'Adherence to time limits and structure',
      maxScore: 10,
      subcriteria: [
        'Time allocation',
        'Pacing throughout presentation',
        'Conclusion within time limit',
        'Introduction effectiveness'
      ]
    },
    {
      id: 'qa_handling',
      name: 'Q&A Handling',
      description: 'Response to questions and discussion',
      maxScore: 20,
      subcriteria: [
        'Understanding of questions',
        'Quality of responses',
        'Ability to defend methodology',
        'Handling of criticism'
      ]
    },
    {
      id: 'innovation_impact',
      name: 'Innovation & Impact',
      description: 'Novelty and potential impact of work',
      maxScore: 10,
      subcriteria: [
        'Originality of approach',
        'Potential for impact',
        'Future research directions',
        'Practical applications'
      ]
    }
  ]

  // Mock data for demonstration
  useEffect(() => {
    const loadData = () => {
      const mockPresentations = [
        {
          id: '1',
          studentId: '1',
          studentName: '张三',
          studentEmail: 'zhangsan@university.edu',
          title: 'Machine Learning Applications in Healthcare Diagnosis',
          type: 'defense',
          scheduledDate: '2025-08-20T10:00:00',
          duration: 30,
          location: 'Conference Room A',
          status: 'completed',
          actualDuration: 28,
          scores: {
            content_quality: 22,
            presentation_skills: 18,
            visual_aids: 13,
            time_management: 9,
            qa_handling: 17,
            innovation_impact: 8
          },
          totalScore: 87,
          feedback: 'Excellent technical content and good presentation skills. Could improve visual aids.',
          questions: [
            {
              question: 'How does your approach compare to existing methods?',
              response: 'Provided detailed comparison with benchmark studies',
              score: 4
            },
            {
              question: 'What are the limitations of your dataset?',
              response: 'Acknowledged limitations and discussed mitigation strategies',
              score: 5
            }
          ],
          evaluatedBy: 'Prof. Zhang',
          evaluatedAt: '2025-08-20T10:35:00'
        },
        {
          id: '2',
          studentId: '2',
          studentName: '李四',
          studentEmail: 'lisi@university.edu',
          title: 'Deep Learning for Medical Image Analysis',
          type: 'progress',
          scheduledDate: '2025-08-22T14:00:00',
          duration: 20,
          location: 'Virtual - Zoom',
          status: 'scheduled'
        },
        {
          id: '3',
          studentId: '3',
          studentName: '王五',
          studentEmail: 'wangwu@university.edu',
          title: 'Natural Language Processing for Clinical Notes',
          type: 'defense',
          scheduledDate: '2025-08-25T09:00:00',
          duration: 30,
          location: 'Conference Room B',
          status: 'scheduled'
        }
      ]

      setPresentations(mockPresentations)
      setLoading(false)
    }
    
    setTimeout(loadData, 500)
  }, [courseId])

  const startLiveScoring = (presentation) => {
    setSelectedPresentation(presentation)
    setIsLiveScoring(true)
    setPresentationTime(0)
    setScoringForm({
      criteriaScores: {},
      totalScore: 0,
      feedback: '',
      recommendations: '',
      questions: [],
      status: 'live'
    })
    setShowScoringModal(true)
    
    // Start timer
    const startTime = Date.now()
    const timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      setPresentationTime(elapsed)
    }, 1000)
    setTimer(timerInterval)
  }

  const stopLiveScoring = () => {
    setIsLiveScoring(false)
    if (timer) {
      clearInterval(timer)
      setTimer(null)
    }
  }

  const openScoringModal = (presentation) => {
    setSelectedPresentation(presentation)
    
    if (presentation.scores) {
      setScoringForm({
        criteriaScores: presentation.scores,
        totalScore: presentation.totalScore,
        feedback: presentation.feedback || '',
        recommendations: presentation.recommendations || '',
        questions: presentation.questions || [],
        status: 'completed'
      })
    } else {
      setScoringForm({
        criteriaScores: {},
        totalScore: 0,
        feedback: '',
        recommendations: '',
        questions: [],
        status: 'draft'
      })
    }
    
    setShowScoringModal(true)
  }

  const calculateTotalScore = () => {
    const scores = Object.values(scoringForm.criteriaScores)
    return scores.reduce((sum, score) => sum + (parseFloat(score) || 0), 0)
  }

  const submitScoring = () => {
    const totalScore = calculateTotalScore()
    
    if (totalScore === 0) {
      addNotification('Please provide scores for evaluation criteria', 'error')
      return
    }

    const updatedPresentations = presentations.map(presentation => 
      presentation.id === selectedPresentation.id 
        ? { 
            ...presentation, 
            status: 'completed',
            scores: scoringForm.criteriaScores,
            totalScore,
            feedback: scoringForm.feedback,
            recommendations: scoringForm.recommendations,
            questions: scoringForm.questions,
            actualDuration: Math.floor(presentationTime / 60),
            evaluatedBy: user.name,
            evaluatedAt: new Date().toISOString()
          }
        : presentation
    )
    
    setPresentations(updatedPresentations)
    addNotification('Presentation scoring submitted successfully', 'success')
    
    // Stop live scoring if active
    stopLiveScoring()
    setShowScoringModal(false)
    setSelectedPresentation(null)
  }

  const addQuestion = () => {
    setScoringForm({
      ...scoringForm,
      questions: [
        ...scoringForm.questions,
        { question: '', response: '', score: 0 }
      ]
    })
  }

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = scoringForm.questions.map((q, i) => 
      i === index ? { ...q, [field]: value } : q
    )
    setScoringForm({ ...scoringForm, questions: updatedQuestions })
  }

  const removeQuestion = (index) => {
    const updatedQuestions = scoringForm.questions.filter((_, i) => i !== index)
    setScoringForm({ ...scoringForm, questions: updatedQuestions })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return '#f39c12'
      case 'in_progress': return '#3498db'
      case 'completed': return '#27ae60'
      default: return '#7f8c8d'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'scheduled': return 'Scheduled'
      case 'in_progress': return 'In Progress'
      case 'completed': return 'Completed'
      default: return 'Unknown'
    }
  }

  const generateCertificate = (presentation) => {
    addNotification(`Generating certificate for ${presentation.studentName}`, 'info')
  }

  if (loading) {
    return <div className="component-container">Loading presentation evaluations...</div>
  }

  return (
    <div className="component-container">
      <div className="component-header">
        <h2>Presentation & Defense Scoring</h2>
        <div className="header-actions">
          <button className="secondary-button">
            Schedule Presentation
          </button>
          <button className="primary-button">
            Export Results
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{presentations.length}</h3>
          <p>Total Presentations</p>
        </div>
        <div className="stat-card">
          <h3>{presentations.filter(p => p.status === 'scheduled').length}</h3>
          <p>Scheduled</p>
        </div>
        <div className="stat-card">
          <h3>{presentations.filter(p => p.status === 'completed').length}</h3>
          <p>Completed</p>
        </div>
        <div className="stat-card">
          <h3>{presentations.filter(p => p.type === 'defense').length}</h3>
          <p>Final Defenses</p>
        </div>
      </div>

      {/* Presentations List */}
      <div className="presentations-section">
        <h3>Scheduled Presentations</h3>
        <div className="presentations-list">
          {presentations.map(presentation => (
            <div key={presentation.id} className="presentation-card">
              <div className="presentation-header">
                <div className="presentation-info">
                  <h4>{presentation.title}</h4>
                  <div className="presentation-meta">
                    <span className="student-name">{presentation.studentName}</span>
                    <span className={`type-badge ${presentation.type}`}>
                      {presentation.type === 'defense' ? 'Final Defense' : 'Progress Presentation'}
                    </span>
                  </div>
                </div>
                <div className="presentation-status">
                  <span 
                    className="status-badge"
                    style={{ 
                      backgroundColor: getStatusColor(presentation.status) + '20',
                      color: getStatusColor(presentation.status)
                    }}
                  >
                    {getStatusLabel(presentation.status)}
                  </span>
                </div>
              </div>

              <div className="presentation-details">
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Date & Time:</span>
                    <span className="value">
                      {new Date(presentation.scheduledDate).toLocaleString()}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Duration:</span>
                    <span className="value">
                      {presentation.duration} minutes
                      {presentation.actualDuration && ` (actual: ${presentation.actualDuration}m)`}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Location:</span>
                    <span className="value">{presentation.location}</span>
                  </div>
                  {presentation.totalScore && (
                    <div className="detail-item">
                      <span className="label">Score:</span>
                      <span className="value score-display">
                        {presentation.totalScore}/100
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="presentation-actions">
                {presentation.status === 'scheduled' && (
                  <button 
                    className="primary-button"
                    onClick={() => startLiveScoring(presentation)}
                  >
                    Start Live Scoring
                  </button>
                )}
                <button 
                  className="secondary-button"
                  onClick={() => openScoringModal(presentation)}
                >
                  {presentation.status === 'completed' ? 'View Evaluation' : 'Score'}
                </button>
                {presentation.status === 'completed' && (
                  <button 
                    className="secondary-button"
                    onClick={() => generateCertificate(presentation)}
                  >
                    Generate Certificate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scoring Modal */}
      {showScoringModal && selectedPresentation && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <div className="modal-header">
              <h3>
                {isLiveScoring ? 'Live Scoring' : 'Score Presentation'} - {selectedPresentation.studentName}
              </h3>
              {isLiveScoring && (
                <div className="live-timer">
                  <span className="timer-label">Time:</span>
                  <span className="timer-display">{formatTime(presentationTime)}</span>
                  <span className="duration-limit">/ {selectedPresentation.duration} min</span>
                </div>
              )}
            </div>
            
            {/* Scoring Form */}
            <div className="scoring-form">
              <h4>Evaluation Criteria</h4>
              
              {scoringCriteria.map(criterion => (
                <div key={criterion.id} className="criterion-section">
                  <div className="criterion-header">
                    <div className="criterion-info">
                      <h5>{criterion.name}</h5>
                      <p className="criterion-description">{criterion.description}</p>
                    </div>
                    <div className="criterion-score">
                      <input
                        type="number"
                        min="0"
                        max={criterion.maxScore}
                        value={scoringForm.criteriaScores[criterion.id] || ''}
                        onChange={(e) => setScoringForm({
                          ...scoringForm,
                          criteriaScores: {
                            ...scoringForm.criteriaScores,
                            [criterion.id]: e.target.value
                          }
                        })}
                        className="score-input"
                        placeholder="0"
                      />
                      <span>/ {criterion.maxScore}</span>
                    </div>
                  </div>
                  
                  <div className="subcriteria-list">
                    {criterion.subcriteria.map((sub, index) => (
                      <span key={index} className="subcriteria-item">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Total Score Display */}
              <div className="total-score-display">
                <h4>Total Score: {calculateTotalScore()}/100</h4>
                <div className="score-breakdown">
                  {scoringCriteria.map(criterion => (
                    <div key={criterion.id} className="score-item">
                      <span>{criterion.name}:</span>
                      <span>{scoringForm.criteriaScores[criterion.id] || 0}/{criterion.maxScore}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Q&A Section */}
              <div className="qa-section">
                <div className="qa-header">
                  <h4>Questions & Answers</h4>
                  <button 
                    className="secondary-button"
                    onClick={addQuestion}
                  >
                    Add Question
                  </button>
                </div>
                
                {scoringForm.questions.map((qa, index) => (
                  <div key={index} className="qa-item">
                    <div className="qa-form">
                      <div className="form-group">
                        <label>Question {index + 1}</label>
                        <textarea
                          value={qa.question}
                          onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                          className="form-textarea"
                          rows={2}
                          placeholder="Enter the question asked..."
                        />
                      </div>
                      <div className="form-group">
                        <label>Response Summary</label>
                        <textarea
                          value={qa.response}
                          onChange={(e) => updateQuestion(index, 'response', e.target.value)}
                          className="form-textarea"
                          rows={2}
                          placeholder="Summarize the student's response..."
                        />
                      </div>
                      <div className="qa-actions">
                        <div className="qa-score">
                          <label>Score (1-5):</label>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={qa.score}
                            onChange={(e) => updateQuestion(index, 'score', parseInt(e.target.value))}
                            className="score-input small"
                          />
                        </div>
                        <button 
                          className="remove-button"
                          onClick={() => removeQuestion(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Feedback Section */}
              <div className="feedback-section">
                <div className="form-group">
                  <label>Overall Feedback</label>
                  <textarea
                    value={scoringForm.feedback}
                    onChange={(e) => setScoringForm({ ...scoringForm, feedback: e.target.value })}
                    className="form-textarea"
                    rows={4}
                    placeholder="Provide overall feedback on the presentation..."
                  />
                </div>

                <div className="form-group">
                  <label>Recommendations for Improvement</label>
                  <textarea
                    value={scoringForm.recommendations}
                    onChange={(e) => setScoringForm({ ...scoringForm, recommendations: e.target.value })}
                    className="form-textarea"
                    rows={3}
                    placeholder="Suggest areas for improvement..."
                  />
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="secondary-button"
                onClick={() => {
                  stopLiveScoring()
                  setShowScoringModal(false)
                  setSelectedPresentation(null)
                }}
              >
                {isLiveScoring ? 'Stop & Cancel' : 'Cancel'}
              </button>
              {isLiveScoring && (
                <button 
                  className="secondary-button"
                  onClick={stopLiveScoring}
                >
                  Pause Scoring
                </button>
              )}
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
                onClick={submitScoring}
              >
                Submit Evaluation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DefenseScoring