import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../../../contexts/AuthContext'
import { useNotification } from '../../../../../contexts/NotificationContext'
import './QAInteraction.css'

const QAInteraction = () => {
  const { courseId } = useParams()
  const { user } = useAuth()
  const { addNotification } = useNotification()
  const [questions, setQuestions] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [replyText, setReplyText] = useState('')
  const [templates] = useState([
    { id: '1', title: 'Literature Search', content: 'You can find relevant literature by:\n1. Using academic databases like Google Scholar, PubMed, etc.\n2. Searching with specific keywords related to your topic\n3. Following citation trails from key papers\n4. Consulting with the library research services' },
    { id: '2', title: 'Data Collection', content: 'For data collection:\n1. Ensure you have ethics approval if required\n2. Follow the protocol we discussed\n3. Document all procedures carefully\n4. Keep backup copies of all data' },
    { id: '3', title: 'Meeting Schedule', content: 'Our regular meetings are scheduled for [DAY] at [TIME]. Please check the calendar for any updates or changes.' },
    { id: '4', title: 'Submission Format', content: 'Please submit your work in PDF format with:\n1. Clear title and author information\n2. Proper citations in APA format\n3. All figures and tables properly labeled\n4. Appendices if necessary' }
  ])

  // Mock data for demonstration
  useEffect(() => {
    const loadData = () => {
      setStudents([
        { id: '1', name: '张三', email: 'zhangsan@university.edu' },
        { id: '2', name: '李四', email: 'lisi@university.edu' },
        { id: '3', name: '王五', email: 'wangwu@university.edu' }
      ])
      
      setQuestions([
        {
          id: '1',
          studentId: '1',
          studentName: '张三',
          title: 'Question about literature review scope',
          content: 'Professor, I\'m wondering about the scope of the literature review. Should I include papers from related fields or focus only on our specific domain?',
          category: 'research',
          createdAt: '2025-08-03T10:30:00',
          status: 'answered',
          priority: 'normal',
          replies: [
            {
              id: '1',
              content: 'Good question! For your literature review, I recommend starting with papers directly in our field, but definitely include relevant work from related fields that inform your research question. Interdisciplinary perspectives often provide valuable insights.',
              createdAt: '2025-08-03T14:00:00',
              author: 'professor'
            }
          ]
        },
        {
          id: '2',
          studentId: '2',
          studentName: '李四',
          title: 'Data collection methodology clarification',
          content: 'I need clarification on the data collection methodology. Should I use structured interviews or semi-structured? What would work better for our research objectives?',
          category: 'methodology',
          createdAt: '2025-08-03T09:00:00',
          status: 'pending',
          priority: 'high',
          replies: []
        },
        {
          id: '3',
          studentId: '3',
          studentName: '王五',
          title: 'Software recommendation for analysis',
          content: 'Could you recommend software for statistical analysis? I\'m considering SPSS or R, but not sure which would be better for our type of data.',
          category: 'technical',
          createdAt: '2025-08-02T16:45:00',
          status: 'answered',
          priority: 'normal',
          replies: [
            {
              id: '2',
              content: 'For your analysis, I recommend R because:\n1. It\'s free and open-source\n2. Has excellent packages for your specific analysis needs\n3. Better for reproducible research\n\nI can share some R tutorials and scripts to get you started.',
              createdAt: '2025-08-02T18:30:00',
              author: 'professor'
            },
            {
              id: '3',
              content: 'Thank you! The tutorials would be very helpful.',
              createdAt: '2025-08-02T19:00:00',
              author: 'student'
            }
          ]
        }
      ])
      setLoading(false)
    }
    
    setTimeout(loadData, 500)
  }, [courseId])

  const handleReply = () => {
    if (!replyText.trim()) {
      addNotification('Please enter a reply', 'error')
      return
    }

    const newReply = {
      id: Date.now().toString(),
      content: replyText,
      createdAt: new Date().toISOString(),
      author: 'professor'
    }

    setQuestions(questions.map(q => {
      if (q.id === selectedQuestion.id) {
        return {
          ...q,
          status: 'answered',
          replies: [...q.replies, newReply]
        }
      }
      return q
    }))

    addNotification('Reply sent successfully', 'success')
    setReplyText('')
    setSelectedQuestion(null)
  }

  const applyTemplate = (template) => {
    setReplyText(template.content)
  }

  const markAsResolved = (questionId) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, status: 'resolved' } : q
    ))
    addNotification('Question marked as resolved', 'success')
  }

  const filteredQuestions = questions.filter(q => {
    if (filter !== 'all' && q.status !== filter) return false
    if (searchTerm && !q.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !q.content.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: '#f39c12', label: 'Pending' },
      answered: { color: '#3498db', label: 'Answered' },
      resolved: { color: '#27ae60', label: 'Resolved' }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className="status-badge" style={{ backgroundColor: config.color + '20', color: config.color }}>
        {config.label}
      </span>
    )
  }

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: '#e74c3c', label: 'High Priority' },
      normal: { color: '#6b7280', label: 'Normal' }
    }
    
    const config = priorityConfig[priority] || priorityConfig.normal
    return (
      <span className="priority-badge" style={{ color: config.color }}>
        {config.label}
      </span>
    )
  }

  const getCategoryIcon = (category) => {
    const icons = {
      research: '📚',
      methodology: '🔬',
      technical: '💻',
      general: '❓'
    }
    return icons[category] || icons.general
  }

  if (loading) {
    return <div className="component-container">Loading Q&A interactions...</div>
  }

  return (
    <div className="component-container">
      <div className="component-header">
        <h2>Q&A & Communication</h2>
        <div className="header-stats">
          <span className="stat-item">
            <strong>{questions.filter(q => q.status === 'pending').length}</strong> Pending
          </span>
          <span className="stat-item">
            <strong>{questions.filter(q => q.status === 'answered').length}</strong> Answered
          </span>
          <span className="stat-item">
            <strong>{questions.filter(q => q.status === 'resolved').length}</strong> Resolved
          </span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="filter-buttons">
          <button
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-button ${filter === 'answered' ? 'active' : ''}`}
            onClick={() => setFilter('answered')}
          >
            Answered
          </button>
          <button
            className={`filter-button ${filter === 'resolved' ? 'active' : ''}`}
            onClick={() => setFilter('resolved')}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Quick Response Templates */}
      <div className="templates-section">
        <h3>Quick Response Templates</h3>
        <div className="templates-grid">
          {templates.map(template => (
            <div key={template.id} className="template-card">
              <h4>{template.title}</h4>
              <button
                className="use-template-button"
                onClick={() => {
                  if (selectedQuestion) {
                    applyTemplate(template)
                  } else {
                    addNotification('Please select a question first', 'info')
                  }
                }}
              >
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="questions-section">
        <h3>Student Questions</h3>
        <div className="questions-list">
          {filteredQuestions.length === 0 ? (
            <div className="empty-state">
              <p>No questions found.</p>
            </div>
          ) : (
            filteredQuestions.map(question => (
              <div key={question.id} className="question-card">
                <div className="question-header">
                  <div className="question-meta">
                    <span className="category-icon">{getCategoryIcon(question.category)}</span>
                    <h4>{question.title}</h4>
                  </div>
                  <div className="question-badges">
                    {getPriorityBadge(question.priority)}
                    {getStatusBadge(question.status)}
                  </div>
                </div>

                <div className="question-info">
                  <span className="student-info">
                    <strong>{question.studentName}</strong> • {new Date(question.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="question-content">
                  <p>{question.content}</p>
                </div>

                {question.replies.length > 0 && (
                  <div className="replies-section">
                    <h5>Conversation ({question.replies.length})</h5>
                    {question.replies.map(reply => (
                      <div key={reply.id} className="reply-item">
                        <div className="reply-header">
                          <span className="reply-author">
                            {reply.author === 'professor' ? 'You' : question.studentName}
                          </span>
                          <span className="reply-time">
                            {new Date(reply.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="reply-content">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="question-actions">
                  {question.status === 'pending' && (
                    <button
                      className="action-button primary"
                      onClick={() => setSelectedQuestion(question)}
                    >
                      Reply
                    </button>
                  )}
                  {question.status === 'answered' && (
                    <>
                      <button
                        className="action-button secondary"
                        onClick={() => setSelectedQuestion(question)}
                      >
                        Add Reply
                      </button>
                      <button
                        className="action-button success"
                        onClick={() => markAsResolved(question.id)}
                      >
                        Mark as Resolved
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {selectedQuestion && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Reply to Question</h3>
            
            <div className="question-summary">
              <h4>{selectedQuestion.title}</h4>
              <p>{selectedQuestion.content}</p>
              <p className="student-info">
                Asked by <strong>{selectedQuestion.studentName}</strong> on {new Date(selectedQuestion.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="form-group">
              <label>Your Reply</label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                className="form-textarea"
                rows={8}
              />
            </div>

            <div className="modal-actions">
              <button 
                className="secondary-button"
                onClick={() => {
                  setSelectedQuestion(null)
                  setReplyText('')
                }}
              >
                Cancel
              </button>
              <button 
                className="primary-button"
                onClick={handleReply}
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QAInteraction