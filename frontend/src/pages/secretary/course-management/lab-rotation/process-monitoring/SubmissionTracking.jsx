import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './ProcessMonitoring.css'

const SubmissionTracking = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  
  const [submissions, setSubmissions] = useState([])
  const [participants, setParticipants] = useState([])
  const [selectedTimeRange, setSelectedTimeRange] = useState('week')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showTechnicalIssueModal, setShowTechnicalIssueModal] = useState(false)
  const [selectedSubmissions, setSelectedSubmissions] = useState([])

  // Mock data
  useEffect(() => {
    const mockSubmissions = [
      {
        id: 'sub1',
        title: '文献综述报告.pdf',
        taskTitle: '文献综述报告',
        submittedBy: 'student1',
        submittedAt: '2024-12-14 14:30:25',
        fileSize: '2.5MB',
        fileFormat: 'PDF',
        version: 'v1.0',
        status: 'reviewed',
        reviewedBy: 'prof1',
        reviewedAt: '2024-12-15 09:15:20',
        feedback: '内容详实，格式规范',
        technicalIssues: [],
        downloadCount: 3
      },
      {
        id: 'sub2',
        title: '实验数据.xlsx',
        taskTitle: '实验数据收集',
        submittedBy: 'student2',
        submittedAt: '2024-12-16 16:45:10',
        fileSize: '8.2MB',
        fileFormat: 'Excel',
        version: 'v2.1',
        status: 'pending_review',
        reviewedBy: null,
        reviewedAt: null,
        feedback: null,
        technicalIssues: ['文件大小超标'],
        downloadCount: 1
      },
      {
        id: 'sub3',
        title: '进度报告_错误版本.doc',
        taskTitle: '中期进度报告',
        submittedBy: 'student3',
        submittedAt: '2024-12-17 10:20:30',
        fileSize: '1.8MB',
        fileFormat: 'Word',
        version: 'v1.0',
        status: 'format_error',
        reviewedBy: null,
        reviewedAt: null,
        feedback: null,
        technicalIssues: ['格式不符', '缺少必要章节'],
        downloadCount: 0
      },
      {
        id: 'sub4',
        title: '周会汇报.pptx',
        taskTitle: '周会汇报准备',
        submittedBy: 'student1',
        submittedAt: '2024-12-18 08:15:45',
        fileSize: '15.6MB',
        fileFormat: 'PowerPoint',
        version: 'v1.0',
        status: 'late_submission',
        reviewedBy: 'prof2',
        reviewedAt: '2024-12-18 10:30:15',
        feedback: '内容完整但提交较晚',
        technicalIssues: [],
        downloadCount: 2
      }
    ]

    const mockParticipants = [
      { id: 'student1', name: '张三', type: 'student' },
      { id: 'student2', name: '李四', type: 'student' },
      { id: 'student3', name: '王五', type: 'student' },
      { id: 'prof1', name: '张明教授', type: 'professor' },
      { id: 'prof2', name: '李华教授', type: 'professor' }
    ]

    setSubmissions(mockSubmissions)
    setParticipants(mockParticipants)
  }, [])

  const getParticipantName = (id) => {
    const participant = participants.find(p => p.id === id)
    return participant ? participant.name : id
  }

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getParticipantName(submission.submittedBy).toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || submission.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status) => {
    const badges = {
      reviewed: { text: '已审阅', className: 'status-reviewed' },
      pending_review: { text: '待审阅', className: 'status-pending' },
      format_error: { text: '格式错误', className: 'status-error' },
      late_submission: { text: '逾期提交', className: 'status-late' }
    }
    return badges[status] || badges.pending_review
  }

  const getFormatBadge = (format) => {
    const badges = {
      PDF: { className: 'format-pdf' },
      Word: { className: 'format-word' },
      Excel: { className: 'format-excel' },
      PowerPoint: { className: 'format-ppt' }
    }
    return badges[format] || { className: 'format-other' }
  }

  const handleSelectSubmission = (submissionId) => {
    setSelectedSubmissions(prev => 
      prev.includes(submissionId) 
        ? prev.filter(id => id !== submissionId)
        : [...prev, submissionId]
    )
  }

  const handleSelectAll = () => {
    if (selectedSubmissions.length === filteredSubmissions.length) {
      setSelectedSubmissions([])
    } else {
      setSelectedSubmissions(filteredSubmissions.map(sub => sub.id))
    }
  }

  const handleTechnicalIssue = () => {
    setShowTechnicalIssueModal(true)
  }

  const getSubmissionStats = () => {
    const total = submissions.length
    const reviewed = submissions.filter(s => s.status === 'reviewed').length
    const pending = submissions.filter(s => s.status === 'pending_review').length
    const issues = submissions.filter(s => s.technicalIssues.length > 0).length
    
    return { total, reviewed, pending, issues }
  }

  const stats = getSubmissionStats()

  return (
    <Layout>
      <div className="process-monitoring-container">
        <div className="monitoring-header">
          <h1 className="page-title">过程监控与跟踪</h1>
          <div className="monitoring-nav">
            <button 
              className="nav-button"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/process-monitoring/task-completion`)}
            >
              任务完成监控
            </button>
            <button 
              className="nav-button active"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/process-monitoring/submission-tracking`)}
            >
              提交跟踪管理
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/process-monitoring/attendance`)}
            >
              出勤参与监控
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/process-monitoring/alerts`)}
            >
              预警系统管理
            </button>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📄</div>
            <div className="stat-content">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">总提交数</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-number">{stats.reviewed}</div>
              <div className="stat-label">已审阅</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-label">待审阅</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🚨</div>
            <div className="stat-content">
              <div className="stat-number">{stats.issues}</div>
              <div className="stat-label">技术问题</div>
            </div>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div className="header-left">
              <h2 className="card-title">提交文件跟踪管理</h2>
              <div className="submission-stats">
                <span className="stat-item">已选择: {selectedSubmissions.length}</span>
                <span className="stat-item">审阅率: {Math.round((stats.reviewed / stats.total) * 100)}%</span>
              </div>
            </div>
            <div className="header-actions">
              <button 
                className="action-button secondary"
                onClick={() => window.print()}
              >
                导出统计
              </button>
              <button 
                className="action-button primary"
                onClick={handleTechnicalIssue}
                disabled={selectedSubmissions.length === 0}
              >
                处理技术问题
              </button>
            </div>
          </div>

          <div className="filters-section">
            <div className="search-group">
              <input
                type="text"
                placeholder="搜索文件名、任务或提交者..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-group">
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="filter-select"
              >
                <option value="week">本周</option>
                <option value="month">本月</option>
                <option value="quarter">本季度</option>
                <option value="all">全部</option>
              </select>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">所有状态</option>
                <option value="reviewed">已审阅</option>
                <option value="pending_review">待审阅</option>
                <option value="format_error">格式错误</option>
                <option value="late_submission">逾期提交</option>
              </select>
            </div>
          </div>

          <div className="submission-table-container">
            <table className="submission-table">
              <thead>
                <tr>
                  <th className="checkbox-column">
                    <input
                      type="checkbox"
                      checked={selectedSubmissions.length === filteredSubmissions.length && filteredSubmissions.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>文件信息</th>
                  <th>提交者</th>
                  <th>提交时间</th>
                  <th>文件详情</th>
                  <th>审阅状态</th>
                  <th>技术问题</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map(submission => {
                  const statusBadge = getStatusBadge(submission.status)
                  const formatBadge = getFormatBadge(submission.fileFormat)
                  
                  return (
                    <tr key={submission.id} className={selectedSubmissions.includes(submission.id) ? 'selected' : ''}>
                      <td className="checkbox-column">
                        <input
                          type="checkbox"
                          checked={selectedSubmissions.includes(submission.id)}
                          onChange={() => handleSelectSubmission(submission.id)}
                        />
                      </td>
                      <td className="file-info">
                        <div className="file-details">
                          <div className="file-name">{submission.title}</div>
                          <div className="task-title">{submission.taskTitle}</div>
                          <div className="version-info">版本: {submission.version}</div>
                        </div>
                      </td>
                      <td className="submitter">
                        {getParticipantName(submission.submittedBy)}
                      </td>
                      <td className="submit-time">
                        <div className="time-info">
                          <div className="submit-date">{submission.submittedAt}</div>
                          {submission.reviewedAt && (
                            <div className="review-date">审阅: {submission.reviewedAt}</div>
                          )}
                        </div>
                      </td>
                      <td className="file-details-column">
                        <div className="file-meta">
                          <div className={`format-badge ${formatBadge.className}`}>
                            {submission.fileFormat}
                          </div>
                          <div className="file-size">{submission.fileSize}</div>
                          <div className="download-count">下载: {submission.downloadCount}次</div>
                        </div>
                      </td>
                      <td className="status-column">
                        <div className={`status-badge ${statusBadge.className}`}>
                          {statusBadge.text}
                        </div>
                        {submission.reviewedBy && (
                          <div className="reviewer">
                            审阅人: {getParticipantName(submission.reviewedBy)}
                          </div>
                        )}
                      </td>
                      <td className="issues-column">
                        {submission.technicalIssues.length > 0 ? (
                          <div className="issues-list">
                            {submission.technicalIssues.map((issue, index) => (
                              <div key={index} className="issue-item">{issue}</div>
                            ))}
                          </div>
                        ) : (
                          <div className="no-issues">正常</div>
                        )}
                      </td>
                      <td className="actions-column">
                        <div className="action-buttons">
                          <button className="action-btn download" title="下载文件">
                            📥
                          </button>
                          <button className="action-btn view" title="在线预览">
                            👁️
                          </button>
                          <button className="action-btn version" title="版本历史">
                            📋
                          </button>
                          {submission.technicalIssues.length > 0 && (
                            <button className="action-btn fix" title="修复问题">
                              🔧
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredSubmissions.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📄</div>
              <div className="empty-title">暂无提交记录</div>
              <div className="empty-description">
                {searchTerm ? '没有找到匹配的提交记录' : '尚未有文件提交'}
              </div>
            </div>
          )}
        </div>

        {/* Technical Issue Modal */}
        {showTechnicalIssueModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>处理技术问题</h3>
                <button className="close-button" onClick={() => setShowTechnicalIssueModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="issue-info">
                  <p>选中的 {selectedSubmissions.length} 个提交中存在技术问题</p>
                </div>
                <div className="issue-types">
                  <label>问题类型:</label>
                  <div className="issue-options">
                    <div className="issue-option">
                      <input type="checkbox" id="format-issue" />
                      <label htmlFor="format-issue">格式问题</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="size-issue" />
                      <label htmlFor="size-issue">文件大小问题</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="content-issue" />
                      <label htmlFor="content-issue">内容完整性问题</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="version-issue" />
                      <label htmlFor="version-issue">版本问题</label>
                    </div>
                  </div>
                </div>
                <div className="resolution-actions">
                  <label>解决方案:</label>
                  <select className="resolution-select">
                    <option value="notify">通知学生重新提交</option>
                    <option value="fix">系统自动修复</option>
                    <option value="accept">接受当前版本</option>
                    <option value="manual">手动处理</option>
                  </select>
                </div>
                <div className="issue-notes">
                  <label>处理说明:</label>
                  <textarea 
                    className="issue-textarea"
                    placeholder="输入处理说明和备注..."
                    rows="4"
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowTechnicalIssueModal(false)}>
                  取消
                </button>
                <button className="action-button primary">
                  处理问题
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default SubmissionTracking