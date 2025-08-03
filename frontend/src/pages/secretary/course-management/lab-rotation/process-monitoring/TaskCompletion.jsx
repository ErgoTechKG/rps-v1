import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './ProcessMonitoring.css'

const TaskCompletion = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  
  const [tasks, setTasks] = useState([])
  const [participants, setParticipants] = useState([])
  const [selectedTimeRange, setSelectedTimeRange] = useState('week')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [selectedTasks, setSelectedTasks] = useState([])

  // Mock data
  useEffect(() => {
    const mockTasks = [
      {
        id: 'task1',
        title: '文献综述报告',
        type: 'homework',
        assignedTo: 'student1',
        assignedBy: 'prof1',
        dueDate: '2024-12-15',
        submittedDate: '2024-12-14',
        status: 'completed',
        quality: 'excellent',
        graded: true,
        score: 92,
        feedback: '内容全面，分析深入'
      },
      {
        id: 'task2',
        title: '实验数据收集',
        type: 'experiment',
        assignedTo: 'student2',
        assignedBy: 'prof1',
        dueDate: '2024-12-18',
        submittedDate: null,
        status: 'in_progress',
        quality: null,
        graded: false,
        score: null,
        feedback: null
      },
      {
        id: 'task3',
        title: '周会汇报准备',
        type: 'presentation',
        assignedTo: 'student3',
        assignedBy: 'prof2',
        dueDate: '2024-12-12',
        submittedDate: null,
        status: 'overdue',
        quality: null,
        graded: false,
        score: null,
        feedback: null
      },
      {
        id: 'task4',
        title: '中期进度报告',
        type: 'report',
        assignedTo: 'student1',
        assignedBy: 'prof1',
        dueDate: '2024-12-20',
        submittedDate: '2024-12-19',
        status: 'submitted',
        quality: 'good',
        graded: false,
        score: null,
        feedback: null
      }
    ]

    const mockParticipants = [
      { id: 'student1', name: '张三', type: 'student' },
      { id: 'student2', name: '李四', type: 'student' },
      { id: 'student3', name: '王五', type: 'student' },
      { id: 'prof1', name: '张明教授', type: 'professor' },
      { id: 'prof2', name: '李华教授', type: 'professor' }
    ]

    setTasks(mockTasks)
    setParticipants(mockParticipants)
  }, [])

  const getParticipantName = (id) => {
    const participant = participants.find(p => p.id === id)
    return participant ? participant.name : id
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getParticipantName(task.assignedTo).toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status) => {
    const badges = {
      completed: { text: '已完成', className: 'status-completed' },
      submitted: { text: '已提交', className: 'status-submitted' },
      in_progress: { text: '进行中', className: 'status-in-progress' },
      overdue: { text: '已逾期', className: 'status-overdue' }
    }
    return badges[status] || badges.in_progress
  }

  const getQualityBadge = (quality) => {
    if (!quality) return null
    const badges = {
      excellent: { text: '优秀', className: 'quality-excellent' },
      good: { text: '良好', className: 'quality-good' },
      fair: { text: '一般', className: 'quality-fair' },
      poor: { text: '较差', className: 'quality-poor' }
    }
    return badges[quality] || null
  }

  const handleSelectTask = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  const handleSelectAll = () => {
    if (selectedTasks.length === filteredTasks.length) {
      setSelectedTasks([])
    } else {
      setSelectedTasks(filteredTasks.map(task => task.id))
    }
  }

  const handleSendReminder = () => {
    setShowReminderModal(true)
  }

  const getCompletionStats = () => {
    const total = tasks.length
    const completed = tasks.filter(t => t.status === 'completed').length
    const overdue = tasks.filter(t => t.status === 'overdue').length
    const inProgress = tasks.filter(t => t.status === 'in_progress').length
    
    return { total, completed, overdue, inProgress }
  }

  const stats = getCompletionStats()

  return (
    <Layout>
      <div className="process-monitoring-container">
        <div className="monitoring-header">
          <h1 className="page-title">过程监控与跟踪</h1>
          <div className="monitoring-nav">
            <button 
              className="nav-button active"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/process-monitoring/task-completion`)}
            >
              任务完成监控
            </button>
            <button 
              className="nav-button"
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
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">总任务数</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-number">{stats.completed}</div>
              <div className="stat-label">已完成</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <div className="stat-number">{stats.inProgress}</div>
              <div className="stat-label">进行中</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <div className="stat-number">{stats.overdue}</div>
              <div className="stat-label">已逾期</div>
            </div>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div className="header-left">
              <h2 className="card-title">任务完成情况监控</h2>
              <div className="task-stats">
                <span className="stat-item">已选择: {selectedTasks.length}</span>
                <span className="stat-item">完成率: {Math.round((stats.completed / stats.total) * 100)}%</span>
              </div>
            </div>
            <div className="header-actions">
              <button 
                className="action-button secondary"
                onClick={() => window.print()}
              >
                导出报告
              </button>
              <button 
                className="action-button primary"
                onClick={handleSendReminder}
                disabled={selectedTasks.length === 0}
              >
                发送提醒
              </button>
            </div>
          </div>

          <div className="filters-section">
            <div className="search-group">
              <input
                type="text"
                placeholder="搜索任务或参与者..."
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
                <option value="completed">已完成</option>
                <option value="submitted">已提交</option>
                <option value="in_progress">进行中</option>
                <option value="overdue">已逾期</option>
              </select>
            </div>
          </div>

          <div className="task-table-container">
            <table className="task-table">
              <thead>
                <tr>
                  <th className="checkbox-column">
                    <input
                      type="checkbox"
                      checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>任务信息</th>
                  <th>分配对象</th>
                  <th>截止时间</th>
                  <th>状态</th>
                  <th>质量评价</th>
                  <th>评分</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map(task => {
                  const statusBadge = getStatusBadge(task.status)
                  const qualityBadge = getQualityBadge(task.quality)
                  
                  return (
                    <tr key={task.id} className={selectedTasks.includes(task.id) ? 'selected' : ''}>
                      <td className="checkbox-column">
                        <input
                          type="checkbox"
                          checked={selectedTasks.includes(task.id)}
                          onChange={() => handleSelectTask(task.id)}
                        />
                      </td>
                      <td className="task-info">
                        <div className="task-details">
                          <div className="task-title">{task.title}</div>
                          <div className="task-type">{task.type}</div>
                          <div className="task-assigner">分配者: {getParticipantName(task.assignedBy)}</div>
                        </div>
                      </td>
                      <td className="assignee">
                        {getParticipantName(task.assignedTo)}
                      </td>
                      <td className="due-date">
                        <div className="date-info">
                          <div className="due-date-value">{task.dueDate}</div>
                          {task.submittedDate && (
                            <div className="submitted-date">提交: {task.submittedDate}</div>
                          )}
                        </div>
                      </td>
                      <td className="status-column">
                        <div className={`status-badge ${statusBadge.className}`}>
                          {statusBadge.text}
                        </div>
                      </td>
                      <td className="quality-column">
                        {qualityBadge && (
                          <div className={`quality-badge ${qualityBadge.className}`}>
                            {qualityBadge.text}
                          </div>
                        )}
                      </td>
                      <td className="score-column">
                        {task.score !== null ? (
                          <div className="score-display">{task.score}</div>
                        ) : task.graded ? (
                          <div className="score-pending">待评分</div>
                        ) : (
                          <div className="score-na">未评分</div>
                        )}
                      </td>
                      <td className="actions-column">
                        <div className="action-buttons">
                          <button className="action-btn view" title="查看详情">
                            👁️
                          </button>
                          <button className="action-btn remind" title="发送提醒">
                            🔔
                          </button>
                          {task.status === 'overdue' && (
                            <button className="action-btn escalate" title="上报异常">
                              ⚠️
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

          {filteredTasks.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <div className="empty-title">暂无任务数据</div>
              <div className="empty-description">
                {searchTerm ? '没有找到匹配的任务' : '尚未有任务分配记录'}
              </div>
            </div>
          )}
        </div>

        {/* Reminder Modal */}
        {showReminderModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>发送任务提醒</h3>
                <button className="close-button" onClick={() => setShowReminderModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="reminder-info">
                  <p>将向 {selectedTasks.length} 个任务的相关人员发送提醒</p>
                </div>
                <div className="reminder-templates">
                  <label>选择提醒类型:</label>
                  <select className="template-select">
                    <option value="deadline">截止时间提醒</option>
                    <option value="overdue">逾期任务提醒</option>
                    <option value="quality">质量改进提醒</option>
                    <option value="grading">评分提醒</option>
                  </select>
                </div>
                <div className="reminder-content">
                  <label>提醒内容:</label>
                  <textarea 
                    className="reminder-textarea"
                    placeholder="输入提醒内容..."
                    rows="4"
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowReminderModal(false)}>
                  取消
                </button>
                <button className="action-button primary">
                  发送提醒
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default TaskCompletion