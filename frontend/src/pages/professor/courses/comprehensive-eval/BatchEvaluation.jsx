import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../../../../components/Layout'
import './BatchEvaluation.css'

function BatchEvaluation() {
  const { courseId } = useParams()
  const [selectedStudents, setSelectedStudents] = useState([])
  const [batchMode, setBatchMode] = useState('compare') // compare, sequential, template
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0)
  const [evaluationTemplate, setEvaluationTemplate] = useState(null)

  const students = [
    {
      id: 1,
      name: 'Li Wang',
      studentId: '2021001',
      status: 'pending',
      priority: 'high',
      deadline: '2025-01-15',
      lastAccessed: null,
      progress: 0
    },
    {
      id: 2,
      name: 'Zhang Wei',
      studentId: '2021002',
      status: 'in-progress',
      priority: 'medium',
      deadline: '2025-01-18',
      lastAccessed: '2025-01-12',
      progress: 45
    },
    {
      id: 3,
      name: 'Wang Li',
      studentId: '2021003',
      status: 'completed',
      priority: 'low',
      deadline: '2025-01-10',
      lastAccessed: '2025-01-09',
      progress: 100
    },
    {
      id: 4,
      name: 'Liu Ming',
      studentId: '2021004',
      status: 'pending',
      priority: 'urgent',
      deadline: '2025-01-13',
      lastAccessed: null,
      progress: 0
    },
    {
      id: 5,
      name: 'Chen Hui',
      studentId: '2021005',
      status: 'in-progress',
      priority: 'high',
      deadline: '2025-01-16',
      lastAccessed: '2025-01-11',
      progress: 25
    }
  ]

  const batchModes = {
    compare: {
      name: 'Side-by-Side Comparison',
      description: 'Compare multiple students simultaneously',
      icon: '⚖️',
      maxStudents: 3
    },
    sequential: {
      name: 'Sequential Review',
      description: 'Review students one after another with quick navigation',
      icon: '➡️',
      maxStudents: 10
    },
    template: {
      name: 'Template Application',
      description: 'Apply evaluation templates to multiple students',
      icon: '📋',
      maxStudents: 20
    }
  }

  const handleStudentSelect = (studentId) => {
    const maxStudents = batchModes[batchMode].maxStudents
    
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId))
    } else if (selectedStudents.length < maxStudents) {
      setSelectedStudents([...selectedStudents, studentId])
    }
  }

  const handleSelectAll = () => {
    const eligibleStudents = students
      .filter(s => s.status !== 'completed')
      .slice(0, batchModes[batchMode].maxStudents)
      .map(s => s.id)
    
    setSelectedStudents(eligibleStudents)
  }

  const handleClearSelection = () => {
    setSelectedStudents([])
  }

  const getSelectedStudents = () => {
    return students.filter(s => selectedStudents.includes(s.id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981'
      case 'in-progress': return '#3b82f6'
      case 'pending': return '#f59e0b'
      default: return '#64748b'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return '#dc2626'
      case 'high': return '#f97316'
      case 'medium': return '#3b82f6'
      case 'low': return '#64748b'
      default: return '#64748b'
    }
  }

  const navigateToStudent = (direction) => {
    if (direction === 'next' && currentStudentIndex < selectedStudents.length - 1) {
      setCurrentStudentIndex(currentStudentIndex + 1)
    } else if (direction === 'prev' && currentStudentIndex > 0) {
      setCurrentStudentIndex(currentStudentIndex - 1)
    }
  }

  const startBatchEvaluation = () => {
    if (selectedStudents.length === 0) {
      alert('Please select at least one student to evaluate.')
      return
    }

    if (batchMode === 'sequential') {
      // Navigate to first student's evaluation interface
      const firstStudent = selectedStudents[0]
      window.location.href = `/professor/courses/comprehensive-eval/${courseId}/evaluation-interface/student/${firstStudent}`
    } else if (batchMode === 'compare') {
      // Open comparison view
      const studentIds = selectedStudents.join(',')
      window.location.href = `/professor/courses/comprehensive-eval/${courseId}/evaluation-interface/compare/${studentIds}`
    } else if (batchMode === 'template') {
      // Open template application interface
      alert('Template application feature coming soon!')
    }
  }

  return (
    <Layout role="professor">
      <div className="batch-evaluation">
        <header className="batch-header">
          <div className="breadcrumb">
            <Link to={`/professor/courses/comprehensive-eval/${courseId}/expert-dashboard`}>
              Expert Dashboard
            </Link>
            <span className="separator">›</span>
            <span className="current">Batch Evaluation</span>
          </div>
          
          <h1>Batch Evaluation Tools</h1>
          <p>Efficiently evaluate multiple students using batch operations and comparison tools</p>
        </header>

        <section className="mode-selection">
          <h2>Evaluation Mode</h2>
          <div className="mode-grid">
            {Object.entries(batchModes).map(([modeKey, mode]) => (
              <button
                key={modeKey}
                className={`mode-card ${batchMode === modeKey ? 'active' : ''}`}
                onClick={() => {
                  setBatchMode(modeKey)
                  setSelectedStudents([])
                }}
              >
                <div className="mode-icon">{mode.icon}</div>
                <h3>{mode.name}</h3>
                <p>{mode.description}</p>
                <div className="mode-limit">Max: {mode.maxStudents} students</div>
              </button>
            ))}
          </div>
        </section>

        <section className="student-selection">
          <div className="selection-header">
            <h2>Select Students</h2>
            <div className="selection-controls">
              <span className="selection-count">
                {selectedStudents.length} / {batchModes[batchMode].maxStudents} selected
              </span>
              <button className="control-btn" onClick={handleSelectAll}>
                Select All Eligible
              </button>
              <button className="control-btn secondary" onClick={handleClearSelection}>
                Clear Selection
              </button>
            </div>
          </div>

          <div className="student-grid">
            {students.map(student => {
              const isSelected = selectedStudents.includes(student.id)
              const isDisabled = !isSelected && selectedStudents.length >= batchModes[batchMode].maxStudents
              const isCompleted = student.status === 'completed'
              
              return (
                <div
                  key={student.id}
                  className={`student-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => !isDisabled && !isCompleted && handleStudentSelect(student.id)}
                >
                  <div className="student-header">
                    <div className="student-info">
                      <h4>{student.name}</h4>
                      <span className="student-id">{student.studentId}</span>
                    </div>
                    <div className="student-meta">
                      <span 
                        className="status-indicator"
                        style={{ backgroundColor: getStatusColor(student.status) }}
                      >
                        {student.status}
                      </span>
                      <span 
                        className="priority-indicator"
                        style={{ color: getPriorityColor(student.priority) }}
                      >
                        {student.priority}
                      </span>
                    </div>
                  </div>

                  <div className="student-details">
                    <div className="detail-row">
                      <span className="label">Deadline:</span>
                      <span className="value">{student.deadline}</span>
                    </div>
                    {student.lastAccessed && (
                      <div className="detail-row">
                        <span className="label">Last Accessed:</span>
                        <span className="value">{student.lastAccessed}</span>
                      </div>
                    )}
                    <div className="detail-row">
                      <span className="label">Progress:</span>
                      <div className="progress-container">
                        <div 
                          className="progress-bar"
                          style={{ width: `${student.progress}%` }}
                        />
                        <span className="progress-text">{student.progress}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="selection-indicator">
                    {isSelected && <span className="check-mark">✓</span>}
                    {isCompleted && <span className="completed-mark">🏆</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {selectedStudents.length > 0 && (
          <section className="batch-actions">
            <h2>Batch Actions</h2>
            <div className="actions-content">
              <div className="selected-summary">
                <h3>Selected Students ({selectedStudents.length})</h3>
                <div className="selected-list">
                  {getSelectedStudents().map(student => (
                    <div key={student.id} className="selected-item">
                      <span className="student-name">{student.name}</span>
                      <span className="student-id">({student.studentId})</span>
                      <button 
                        className="remove-btn"
                        onClick={() => handleStudentSelect(student.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className="action-btn primary"
                  onClick={startBatchEvaluation}
                >
                  {batchMode === 'compare' ? '⚖️ Start Comparison' : 
                   batchMode === 'sequential' ? '➡️ Start Sequential Review' : 
                   '📋 Apply Template'}
                </button>
                
                <button className="action-btn secondary">
                  📊 Generate Summary Report
                </button>
                
                <button className="action-btn secondary">
                  📤 Export Selected Data
                </button>
              </div>
            </div>
          </section>
        )}

        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="quick-grid">
            <Link 
              to={`/professor/courses/comprehensive-eval/${courseId}/evaluation-interface/student/1`}
              className="quick-card"
            >
              <div className="quick-icon">🎯</div>
              <h3>Single Evaluation</h3>
              <p>Evaluate one student in detail</p>
            </Link>
            
            <button className="quick-card">
              <div className="quick-icon">📋</div>
              <h3>Load Template</h3>
              <p>Use saved evaluation templates</p>
            </button>
            
            <button className="quick-card">
              <div className="quick-icon">📈</div>
              <h3>Progress Overview</h3>
              <p>View all evaluation progress</p>
            </button>
            
            <button className="quick-card">
              <div className="quick-icon">⚡</div>
              <h3>Keyboard Shortcuts</h3>
              <p>Learn efficiency shortcuts</p>
            </button>
          </div>
        </section>

        <section className="keyboard-shortcuts">
          <h2>Keyboard Shortcuts</h2>
          <div className="shortcuts-grid">
            <div className="shortcut-item">
              <kbd>Ctrl + A</kbd>
              <span>Select all eligible students</span>
            </div>
            <div className="shortcut-item">
              <kbd>Ctrl + D</kbd>
              <span>Clear selection</span>
            </div>
            <div className="shortcut-item">
              <kbd>Enter</kbd>
              <span>Start batch evaluation</span>
            </div>
            <div className="shortcut-item">
              <kbd>1-3</kbd>
              <span>Switch evaluation mode</span>
            </div>
            <div className="shortcut-item">
              <kbd>Esc</kbd>
              <span>Return to dashboard</span>
            </div>
            <div className="shortcut-item">
              <kbd>Space</kbd>
              <span>Toggle student selection</span>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default BatchEvaluation