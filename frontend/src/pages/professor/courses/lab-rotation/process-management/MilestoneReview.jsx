import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../../../contexts/AuthContext'
import { useNotification } from '../../../../../contexts/NotificationContext'
import './MilestoneReview.css'

const MilestoneReview = () => {
  const { courseId } = useParams()
  const { user } = useAuth()
  const { addNotification } = useNotification()
  const [milestones, setMilestones] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showMilestoneForm, setShowMilestoneForm] = useState(false)
  const [selectedMilestone, setSelectedMilestone] = useState(null)
  const [filter, setFilter] = useState('all')
  const [milestoneForm, setMilestoneForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    weight: '20',
    requirements: ''
  })

  // Mock data for demonstration
  useEffect(() => {
    const loadData = () => {
      setStudents([
        { id: '1', name: '张三', email: 'zhangsan@university.edu' },
        { id: '2', name: '李四', email: 'lisi@university.edu' },
        { id: '3', name: '王五', email: 'wangwu@university.edu' }
      ])
      
      setMilestones([
        {
          id: '1',
          title: 'Literature Review Completion',
          description: 'Complete comprehensive literature review on the research topic',
          dueDate: '2025-08-15',
          weight: '20',
          requirements: '• Minimum 30 peer-reviewed papers\n• Critical analysis of methodologies\n• Identification of research gaps',
          submissions: [
            {
              studentId: '1',
              studentName: '张三',
              submittedAt: '2025-08-14',
              status: 'approved',
              feedback: 'Excellent literature review with comprehensive coverage.',
              files: ['literature_review_zhang.pdf']
            },
            {
              studentId: '2',
              studentName: '李四',
              submittedAt: '2025-08-13',
              status: 'revision_requested',
              feedback: 'Good start, but needs more recent papers (2023-2025).',
              files: ['lit_review_li_v1.pdf']
            }
          ]
        },
        {
          id: '2',
          title: 'Research Proposal Draft',
          description: 'Submit first draft of research proposal',
          dueDate: '2025-08-30',
          weight: '30',
          requirements: '• Clear research objectives\n• Detailed methodology\n• Timeline and milestones\n• Expected outcomes',
          submissions: [
            {
              studentId: '3',
              studentName: '王五',
              submittedAt: '2025-08-28',
              status: 'pending',
              feedback: '',
              files: ['proposal_wang_draft1.pdf']
            }
          ]
        }
      ])
      setLoading(false)
    }
    
    setTimeout(loadData, 500)
  }, [courseId])

  const handleMilestoneSubmit = () => {
    if (!milestoneForm.title || !milestoneForm.dueDate || !milestoneForm.weight) {
      addNotification('Please fill in all required fields', 'error')
      return
    }

    const newMilestone = {
      id: Date.now().toString(),
      ...milestoneForm,
      submissions: []
    }

    setMilestones([...milestones, newMilestone])
    addNotification('Milestone created successfully', 'success')
    setShowMilestoneForm(false)
    resetForm()
  }

  const resetForm = () => {
    setMilestoneForm({
      title: '',
      description: '',
      dueDate: '',
      weight: '20',
      requirements: ''
    })
  }

  const updateSubmissionStatus = (milestoneId, studentId, status, feedback) => {
    setMilestones(milestones.map(milestone => {
      if (milestone.id === milestoneId) {
        return {
          ...milestone,
          submissions: milestone.submissions.map(sub => 
            sub.studentId === studentId 
              ? { ...sub, status, feedback }
              : sub
          )
        }
      }
      return milestone
    }))
    addNotification(`Submission ${status.replace('_', ' ')}`, 'success')
  }

  const getSubmissionStatus = (milestone, studentId) => {
    const submission = milestone.submissions.find(s => s.studentId === studentId)
    if (!submission) return { status: 'not_submitted', label: 'Not Submitted', color: '#6b7280' }
    
    const statusConfig = {
      pending: { label: 'Pending Review', color: '#f39c12' },
      approved: { label: 'Approved', color: '#27ae60' },
      revision_requested: { label: 'Revision Requested', color: '#e74c3c' }
    }
    
    return statusConfig[submission.status] || statusConfig.pending
  }

  const calculateProgress = (studentId) => {
    let totalWeight = 0
    let completedWeight = 0
    
    milestones.forEach(milestone => {
      const weight = parseInt(milestone.weight)
      totalWeight += weight
      
      const submission = milestone.submissions.find(s => s.studentId === studentId)
      if (submission && submission.status === 'approved') {
        completedWeight += weight
      }
    })
    
    return totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0
  }

  const filteredMilestones = milestones.filter(milestone => {
    if (filter === 'all') return true
    if (filter === 'pending') {
      return milestone.submissions.some(s => s.status === 'pending')
    }
    if (filter === 'overdue') {
      return new Date(milestone.dueDate) < new Date() && 
        milestone.submissions.some(s => !s.submittedAt || s.status !== 'approved')
    }
    return true
  })

  if (loading) {
    return <div className="component-container">Loading milestone reviews...</div>
  }

  return (
    <div className="component-container">
      <div className="component-header">
        <h2>Milestone Review & Assessment</h2>
        <button 
          className="primary-button"
          onClick={() => setShowMilestoneForm(true)}
        >
          Create Milestone
        </button>
      </div>

      {/* Student Progress Overview */}
      <div className="progress-overview">
        <h3>Student Progress Overview</h3>
        <div className="progress-grid">
          {students.map(student => (
            <div key={student.id} className="progress-card">
              <div className="student-info">
                <h4>{student.name}</h4>
                <p>{student.email}</p>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${calculateProgress(student.id)}%` }}
                  />
                </div>
                <span className="progress-text">{calculateProgress(student.id)}% Complete</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button
          className={`tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Milestones ({milestones.length})
        </button>
        <button
          className={`tab ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending Review ({milestones.filter(m => m.submissions.some(s => s.status === 'pending')).length})
        </button>
        <button
          className={`tab ${filter === 'overdue' ? 'active' : ''}`}
          onClick={() => setFilter('overdue')}
        >
          Overdue ({milestones.filter(m => new Date(m.dueDate) < new Date()).length})
        </button>
      </div>

      {/* Milestones List */}
      <div className="milestones-list">
        {filteredMilestones.map(milestone => (
          <div key={milestone.id} className="milestone-card">
            <div className="milestone-header">
              <div>
                <h3>{milestone.title}</h3>
                <p className="milestone-description">{milestone.description}</p>
              </div>
              <div className="milestone-meta">
                <span className="weight-badge">{milestone.weight}%</span>
                <span className="due-date">Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="milestone-requirements">
              <h4>Requirements:</h4>
              <pre>{milestone.requirements}</pre>
            </div>

            <div className="submissions-section">
              <h4>Student Submissions</h4>
              <div className="submissions-grid">
                {students.map(student => {
                  const submission = milestone.submissions.find(s => s.studentId === student.id)
                  const status = getSubmissionStatus(milestone, student.id)
                  
                  return (
                    <div key={student.id} className="submission-card">
                      <div className="submission-header">
                        <span className="student-name">{student.name}</span>
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: status.color + '20', color: status.color }}
                        >
                          {status.label}
                        </span>
                      </div>
                      
                      {submission && (
                        <>
                          <div className="submission-details">
                            <p>Submitted: {new Date(submission.submittedAt).toLocaleDateString()}</p>
                            {submission.files && submission.files.length > 0 && (
                              <p>Files: {submission.files.join(', ')}</p>
                            )}
                          </div>
                          
                          {submission.status === 'pending' && (
                            <div className="review-actions">
                              <button
                                className="action-button approve"
                                onClick={() => setSelectedMilestone({ milestone, submission, action: 'approve' })}
                              >
                                Approve
                              </button>
                              <button
                                className="action-button revision"
                                onClick={() => setSelectedMilestone({ milestone, submission, action: 'revision' })}
                              >
                                Request Revision
                              </button>
                            </div>
                          )}
                          
                          {submission.feedback && (
                            <div className="feedback-section">
                              <strong>Feedback:</strong>
                              <p>{submission.feedback}</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Milestone Modal */}
      {showMilestoneForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create New Milestone</h3>
            
            <div className="form-group">
              <label>Milestone Title *</label>
              <input
                type="text"
                value={milestoneForm.title}
                onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                placeholder="Enter milestone title"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={milestoneForm.description}
                onChange={(e) => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
                placeholder="Enter milestone description"
                className="form-textarea"
                rows={3}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Due Date *</label>
                <input
                  type="date"
                  value={milestoneForm.dueDate}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, dueDate: e.target.value })}
                  className="form-input"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label>Weight (%) *</label>
                <input
                  type="number"
                  value={milestoneForm.weight}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, weight: e.target.value })}
                  className="form-input"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Requirements</label>
              <textarea
                value={milestoneForm.requirements}
                onChange={(e) => setMilestoneForm({ ...milestoneForm, requirements: e.target.value })}
                placeholder="Enter milestone requirements (use bullet points)"
                className="form-textarea"
                rows={5}
              />
            </div>

            <div className="modal-actions">
              <button 
                className="secondary-button"
                onClick={() => {
                  setShowMilestoneForm(false)
                  resetForm()
                }}
              >
                Cancel
              </button>
              <button 
                className="primary-button"
                onClick={handleMilestoneSubmit}
              >
                Create Milestone
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Feedback Modal */}
      {selectedMilestone && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>
              {selectedMilestone.action === 'approve' ? 'Approve Submission' : 'Request Revision'}
            </h3>
            
            <div className="review-info">
              <p><strong>Student:</strong> {selectedMilestone.submission.studentName}</p>
              <p><strong>Milestone:</strong> {selectedMilestone.milestone.title}</p>
              <p><strong>Submitted:</strong> {new Date(selectedMilestone.submission.submittedAt).toLocaleDateString()}</p>
            </div>

            <div className="form-group">
              <label>Feedback *</label>
              <textarea
                id="feedback-textarea"
                placeholder="Enter your feedback..."
                className="form-textarea"
                rows={6}
                defaultValue={selectedMilestone.submission.feedback}
              />
            </div>

            <div className="modal-actions">
              <button 
                className="secondary-button"
                onClick={() => setSelectedMilestone(null)}
              >
                Cancel
              </button>
              <button 
                className={`primary-button ${selectedMilestone.action === 'approve' ? 'approve' : 'revision'}`}
                onClick={() => {
                  const feedback = document.getElementById('feedback-textarea').value
                  updateSubmissionStatus(
                    selectedMilestone.milestone.id,
                    selectedMilestone.submission.studentId,
                    selectedMilestone.action === 'approve' ? 'approved' : 'revision_requested',
                    feedback
                  )
                  setSelectedMilestone(null)
                }}
              >
                {selectedMilestone.action === 'approve' ? 'Approve' : 'Request Revision'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MilestoneReview