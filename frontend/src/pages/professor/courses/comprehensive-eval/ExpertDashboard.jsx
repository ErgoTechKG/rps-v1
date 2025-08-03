import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../../../../components/Layout'
import './ExpertDashboard.css'

function ExpertDashboard() {
  const { courseId } = useParams()
  const [evaluationStats, setEvaluationStats] = useState({
    totalAssigned: 45,
    completed: 28,
    inProgress: 12,
    pending: 5,
    averageTime: '2.5 hours',
    upcomingDeadlines: 3,
    completionRate: 62.2,
    workloadScore: 'High'
  })

  const [evaluations, setEvaluations] = useState([
    {
      id: 1,
      studentName: 'Li Wang',
      studentId: '2021001',
      type: 'Comprehensive Review',
      status: 'pending',
      priority: 'high',
      deadline: '2025-01-15',
      daysRemaining: 3,
      criteria: ['Technical Skills', 'Research Ability', 'Communication']
    },
    {
      id: 2,
      studentName: 'Zhang Wei',
      studentId: '2021002',
      type: 'Mid-term Evaluation',
      status: 'in-progress',
      priority: 'medium',
      deadline: '2025-01-18',
      daysRemaining: 6,
      progress: 60,
      criteria: ['Problem Solving', 'Innovation', 'Teamwork']
    },
    {
      id: 3,
      studentName: 'Wang Li',
      studentId: '2021003',
      type: 'Final Assessment',
      status: 'completed',
      priority: 'low',
      deadline: '2025-01-10',
      completedDate: '2025-01-08',
      score: 92,
      criteria: ['Leadership', 'Technical Depth', 'Presentation']
    },
    {
      id: 4,
      studentName: 'Liu Ming',
      studentId: '2021004',
      type: 'Comprehensive Review',
      status: 'pending',
      priority: 'urgent',
      deadline: '2025-01-13',
      daysRemaining: 1,
      criteria: ['Research Output', 'Critical Thinking', 'Ethics']
    },
    {
      id: 5,
      studentName: 'Chen Hui',
      studentId: '2021005',
      type: 'Progress Review',
      status: 'in-progress',
      priority: 'high',
      deadline: '2025-01-16',
      daysRemaining: 4,
      progress: 35,
      criteria: ['Technical Skills', 'Documentation', 'Initiative']
    }
  ])

  const [progressMetrics, setProgressMetrics] = useState({
    weeklyCompletions: [8, 12, 10, 15, 13, 11, 9],
    averageScore: 87.5,
    consistencyScore: 92,
    timeEfficiency: 'Above Average',
    peerComparison: {
      rank: 3,
      total: 15,
      percentile: 80
    }
  })

  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('deadline')
  const [viewMode, setViewMode] = useState('list')

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed': return 'status-badge-completed'
      case 'in-progress': return 'status-badge-progress'
      case 'pending': return 'status-badge-pending'
      default: return ''
    }
  }

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'urgent': return 'priority-urgent'
      case 'high': return 'priority-high'
      case 'medium': return 'priority-medium'
      case 'low': return 'priority-low'
      default: return ''
    }
  }

  const filteredEvaluations = evaluations.filter(evaluation => 
    filterStatus === 'all' || evaluation.status === filterStatus
  )

  const sortedEvaluations = [...filteredEvaluations].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return new Date(a.deadline) - new Date(b.deadline)
      case 'priority':
        const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      case 'student':
        return a.studentName.localeCompare(b.studentName)
      default:
        return 0
    }
  })

  return (
    <Layout role="professor">
      <div className="expert-dashboard">
        <header className="dashboard-header">
          <h1>Expert Evaluation Dashboard</h1>
          <p className="course-info">Course: Comprehensive Evaluation 2025</p>
        </header>

        <section className="workload-overview">
          <h2>Workload Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{evaluationStats.totalAssigned}</div>
              <div className="stat-label">Total Assigned</div>
              <div className="stat-trend">+5 this week</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{evaluationStats.completed}</div>
              <div className="stat-label">Completed</div>
              <div className="stat-progress">
                <div 
                  className="progress-bar"
                  style={{ width: `${evaluationStats.completionRate}%` }}
                />
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{evaluationStats.inProgress}</div>
              <div className="stat-label">In Progress</div>
              <div className="stat-detail">Average {evaluationStats.averageTime}</div>
            </div>
            <div className="stat-card urgent">
              <div className="stat-value">{evaluationStats.upcomingDeadlines}</div>
              <div className="stat-label">Due This Week</div>
              <div className="stat-detail">Action required</div>
            </div>
          </div>
        </section>

        <section className="task-management">
          <div className="section-header">
            <h2>Task Management</h2>
            <div className="task-controls">
              <div className="filter-controls">
                <label>Status:</label>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="sort-controls">
                <label>Sort by:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="deadline">Deadline</option>
                  <option value="priority">Priority</option>
                  <option value="student">Student Name</option>
                </select>
              </div>
              <div className="view-controls">
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  List
                </button>
                <button 
                  className={`view-btn ${viewMode === 'card' ? 'active' : ''}`}
                  onClick={() => setViewMode('card')}
                >
                  Cards
                </button>
              </div>
            </div>
          </div>

          <div className={`evaluations-container ${viewMode}`}>
            {sortedEvaluations.map(evaluation => (
              <div key={evaluation.id} className="evaluation-item">
                <div className="evaluation-header">
                  <div className="student-info">
                    <h4>{evaluation.studentName}</h4>
                    <span className="student-id">ID: {evaluation.studentId}</span>
                  </div>
                  <div className="evaluation-meta">
                    <span className={`priority-badge ${getPriorityClass(evaluation.priority)}`}>
                      {evaluation.priority}
                    </span>
                    <span className={`status-badge ${getStatusBadgeClass(evaluation.status)}`}>
                      {evaluation.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="evaluation-details">
                  <div className="detail-row">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">{evaluation.type}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Deadline:</span>
                    <span className="detail-value">
                      {evaluation.deadline}
                      {evaluation.status !== 'completed' && (
                        <span className={`days-remaining ${evaluation.daysRemaining <= 3 ? 'urgent' : ''}`}>
                          ({evaluation.daysRemaining} days)
                        </span>
                      )}
                    </span>
                  </div>
                  {evaluation.progress && (
                    <div className="detail-row">
                      <span className="detail-label">Progress:</span>
                      <div className="progress-container">
                        <div 
                          className="progress-bar"
                          style={{ width: `${evaluation.progress}%` }}
                        />
                        <span className="progress-text">{evaluation.progress}%</span>
                      </div>
                    </div>
                  )}
                  <div className="criteria-list">
                    <span className="detail-label">Criteria:</span>
                    <div className="criteria-tags">
                      {evaluation.criteria.map((criterion, index) => (
                        <span key={index} className="criterion-tag">{criterion}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="evaluation-actions">
                  {evaluation.status === 'pending' && (
                    <Link 
                      to={`/professor/courses/comprehensive-eval/${courseId}/evaluation-interface/student/${evaluation.id}`}
                      className="action-btn primary"
                    >
                      Start Evaluation
                    </Link>
                  )}
                  {evaluation.status === 'in-progress' && (
                    <Link 
                      to={`/professor/courses/comprehensive-eval/${courseId}/evaluation-interface/student/${evaluation.id}`}
                      className="action-btn primary"
                    >
                      Continue
                    </Link>
                  )}
                  {evaluation.status === 'completed' && (
                    <Link 
                      to={`/professor/courses/comprehensive-eval/${courseId}/evaluation-interface/student/${evaluation.id}`}
                      className="action-btn secondary"
                    >
                      View Report
                    </Link>
                  )}
                  <Link 
                    to={`/professor/courses/comprehensive-eval/${courseId}/evaluation-interface/student/${evaluation.id}`}
                    className="action-btn secondary"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="progress-analytics">
          <h2>Progress & Analytics</h2>
          <div className="analytics-grid">
            <div className="metric-card">
              <h3>Completion Trend</h3>
              <div className="metric-chart">
                <div className="mini-chart">
                  {progressMetrics.weeklyCompletions.map((value, index) => (
                    <div 
                      key={index} 
                      className="chart-bar"
                      style={{ height: `${(value / 15) * 100}%` }}
                    >
                      <span className="bar-value">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="chart-labels">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <h3>Quality Metrics</h3>
              <div className="quality-stats">
                <div className="quality-item">
                  <span className="quality-label">Average Score</span>
                  <span className="quality-value">{progressMetrics.averageScore}%</span>
                </div>
                <div className="quality-item">
                  <span className="quality-label">Consistency</span>
                  <span className="quality-value">{progressMetrics.consistencyScore}%</span>
                </div>
                <div className="quality-item">
                  <span className="quality-label">Time Efficiency</span>
                  <span className="quality-value efficiency">{progressMetrics.timeEfficiency}</span>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <h3>Peer Comparison</h3>
              <div className="peer-stats">
                <div className="rank-display">
                  <div className="rank-number">#{progressMetrics.peerComparison.rank}</div>
                  <div className="rank-detail">
                    out of {progressMetrics.peerComparison.total} evaluators
                  </div>
                </div>
                <div className="percentile-bar">
                  <div 
                    className="percentile-fill"
                    style={{ width: `${progressMetrics.peerComparison.percentile}%` }}
                  />
                  <span className="percentile-text">
                    Top {100 - progressMetrics.peerComparison.percentile}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="quick-access">
          <h2>Quick Access Tools</h2>
          <div className="tools-grid">
            <Link to={`/professor/courses/comprehensive-eval/${courseId}/standards-reference/criteria`} className="tool-card">
              <div className="tool-icon">📋</div>
              <div className="tool-name">Evaluation Standards</div>
              <div className="tool-description">View rubrics and guidelines</div>
            </Link>
            <Link to={`/professor/courses/comprehensive-eval/${courseId}/templates`} className="tool-card">
              <div className="tool-icon">📄</div>
              <div className="tool-name">Templates</div>
              <div className="tool-description">Common evaluation forms</div>
            </Link>
            <Link to={`/professor/courses/comprehensive-eval/${courseId}/recent`} className="tool-card">
              <div className="tool-icon">🕐</div>
              <div className="tool-name">Recent Activity</div>
              <div className="tool-description">Your latest evaluations</div>
            </Link>
            <Link to={`/professor/courses/comprehensive-eval/${courseId}/help`} className="tool-card">
              <div className="tool-icon">❓</div>
              <div className="tool-name">Help & Training</div>
              <div className="tool-description">Resources and support</div>
            </Link>
            <Link to={`/professor/courses/comprehensive-eval/${courseId}/batch-evaluation`} className="tool-card">
              <div className="tool-icon">⚡</div>
              <div className="tool-name">Batch Operations</div>
              <div className="tool-description">Bulk actions and shortcuts</div>
            </Link>
            <Link to={`/professor/courses/comprehensive-eval/${courseId}/mobile`} className="tool-card">
              <div className="tool-icon">📱</div>
              <div className="tool-name">Mobile Tools</div>
              <div className="tool-description">Evaluate on the go</div>
            </Link>
          </div>
        </section>

        <section className="announcements">
          <h2>Recent Announcements</h2>
          <div className="announcement-list">
            <div className="announcement-item">
              <div className="announcement-date">Jan 10, 2025</div>
              <div className="announcement-content">
                <h4>Updated Evaluation Guidelines</h4>
                <p>New criteria for research output assessment have been added. Please review before your next evaluation.</p>
              </div>
            </div>
            <div className="announcement-item">
              <div className="announcement-date">Jan 8, 2025</div>
              <div className="announcement-content">
                <h4>System Maintenance Notice</h4>
                <p>The evaluation system will undergo maintenance on Jan 20, 2025 from 2-4 AM. Please plan accordingly.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default ExpertDashboard