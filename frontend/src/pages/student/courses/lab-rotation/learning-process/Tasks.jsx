import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './Tasks.css'

const Tasks = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('deadline')
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [taskStatusUpdate, setTaskStatusUpdate] = useState({ status: '', notes: '' })

  useEffect(() => {
    loadTasks()
  }, [courseId])

  const loadTasks = () => {
    // Mock task data - in real app this would come from API
    const mockTasks = [
      {
        id: '1',
        title: '文献调研报告',
        description: '完成与研究课题相关的文献调研，撰写报告并分析当前研究现状',
        priority: 'high',
        status: 'assigned',
        deadline: '2024-02-15',
        assignedBy: '张教授',
        assignedDate: '2024-02-01',
        estimatedHours: 20,
        tags: ['research', 'writing'],
        resources: [
          { name: 'IEEE数据库', url: 'https://ieeexplore.ieee.org' },
          { name: '研究方法指南', url: '/resources/research-guide.pdf' }
        ],
        requirements: [
          '至少调研30篇相关论文',
          '分析现有研究方法的优缺点',
          '提出改进方向和建议'
        ],
        progress: 0
      },
      {
        id: '2',
        title: '实验环境搭建',
        description: '配置实验所需的软件环境和工具链',
        priority: 'medium',
        status: 'in_progress',
        deadline: '2024-02-10',
        assignedBy: '张教授',
        assignedDate: '2024-01-30',
        estimatedHours: 8,
        tags: ['setup', 'technical'],
        resources: [
          { name: '环境配置文档', url: '/resources/setup-guide.pdf' },
          { name: '软件下载链接', url: '/resources/software-links.txt' }
        ],
        requirements: [
          '安装Python 3.9+环境',
          '配置深度学习框架',
          '测试环境运行正常'
        ],
        progress: 60
      },
      {
        id: '3',
        title: '周报撰写',
        description: '总结本周学习进展和遇到的问题',
        priority: 'low',
        status: 'completed',
        deadline: '2024-02-05',
        assignedBy: '张教授',
        assignedDate: '2024-02-01',
        estimatedHours: 2,
        tags: ['reporting'],
        resources: [
          { name: '周报模板', url: '/resources/weekly-report-template.docx' }
        ],
        requirements: [
          '总结学习内容',
          '记录遇到的问题',
          '制定下周计划'
        ],
        progress: 100,
        completedDate: '2024-02-05',
        completionNotes: '按时完成，获得教授好评'
      },
      {
        id: '4',
        title: '代码实现第一版',
        description: '实现核心算法的第一个版本',
        priority: 'high',
        status: 'assigned',
        deadline: '2024-02-20',
        assignedBy: '张教授',
        assignedDate: '2024-02-05',
        estimatedHours: 40,
        tags: ['coding', 'algorithm'],
        resources: [
          { name: '算法参考论文', url: '/resources/algorithm-paper.pdf' },
          { name: '代码框架', url: '/resources/code-template.zip' }
        ],
        requirements: [
          '实现基础算法框架',
          '编写单元测试',
          '性能基准测试'
        ],
        progress: 0
      }
    ]
    
    // Load from localStorage if exists
    const savedTasks = localStorage.getItem(`tasks_${courseId}`)
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    } else {
      setTasks(mockTasks)
      localStorage.setItem(`tasks_${courseId}`, JSON.stringify(mockTasks))
    }
  }

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks)
    localStorage.setItem(`tasks_${courseId}`, JSON.stringify(updatedTasks))
  }

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'assigned':
        return task.status === 'assigned'
      case 'in_progress':
        return task.status === 'in_progress'
      case 'completed':
        return task.status === 'completed'
      case 'overdue':
        return task.status !== 'completed' && new Date(task.deadline) < new Date()
      default:
        return true
    }
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return new Date(a.deadline) - new Date(b.deadline)
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      case 'progress':
        return b.progress - a.progress
      default:
        return 0
    }
  })

  const updateTaskStatus = (taskId, newStatus, notes = '') => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const updates = { 
          ...task, 
          status: newStatus,
          progress: newStatus === 'completed' ? 100 : task.progress
        }
        if (newStatus === 'completed') {
          updates.completedDate = new Date().toISOString().split('T')[0]
          updates.completionNotes = notes
        }
        return updates
      }
      return task
    })
    saveTasks(updatedTasks)
    setShowTaskModal(false)
    setSelectedTask(null)
  }

  const updateTaskProgress = (taskId, progress) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { 
          ...task, 
          progress,
          status: progress === 100 ? 'completed' : progress > 0 ? 'in_progress' : 'assigned'
        }
      }
      return task
    })
    saveTasks(updatedTasks)
  }

  const requestHelp = (taskId) => {
    // In real app, this would send a help request to the professor
    alert('已向教授发送求助请求，教授会尽快回复您。')
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4757'
      case 'medium': return '#ffa502'
      case 'low': return '#2ed573'
      default: return '#747d8c'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned': return '#747d8c'
      case 'in_progress': return '#3742fa'
      case 'completed': return '#2ed573'
      default: return '#747d8c'
    }
  }

  const isOverdue = (task) => {
    return task.status !== 'completed' && new Date(task.deadline) < new Date()
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN')
  }

  const getUpcomingDeadlines = () => {
    const now = new Date()
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
    
    return tasks.filter(task => {
      if (task.status === 'completed') return false
      const deadline = new Date(task.deadline)
      return deadline <= threeDaysFromNow && deadline >= now
    })
  }

  return (
    <Layout>
      <div className="tasks-container">
        <div className="tasks-header">
          <div className="header-left">
            <h1>任务管理</h1>
            <div className="breadcrumb">
              <span onClick={() => navigate(`/student/dashboard`)}>学生工作台</span>
              <span>/</span>
              <span onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/learning-process/tasks`)}>学习过程</span>
              <span>/</span>
              <span>任务管理</span>
            </div>
          </div>
          
          <div className="header-actions">
            <button 
              className="nav-btn"
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/learning-process/submissions`)}
            >
              作业提交
            </button>
            <button 
              className="nav-btn"
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/learning-process/meetings`)}
            >
              会议管理
            </button>
            <button 
              className="nav-btn"
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/learning-process/progress`)}
            >
              进度跟踪
            </button>
          </div>
        </div>

        {getUpcomingDeadlines().length > 0 && (
          <div className="deadline-reminder">
            <h3>📅 即将到期的任务</h3>
            <div className="reminder-list">
              {getUpcomingDeadlines().map(task => (
                <div key={task.id} className="reminder-item">
                  <span className="task-name">{task.title}</span>
                  <span className="deadline">截止: {formatDate(task.deadline)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="tasks-controls">
          <div className="filter-controls">
            <label>筛选：</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">全部任务</option>
              <option value="assigned">已分配</option>
              <option value="in_progress">进行中</option>
              <option value="completed">已完成</option>
              <option value="overdue">已逾期</option>
            </select>
          </div>
          
          <div className="sort-controls">
            <label>排序：</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="deadline">截止时间</option>
              <option value="priority">优先级</option>
              <option value="progress">完成度</option>
            </select>
          </div>
        </div>

        <div className="tasks-stats">
          <div className="stat-card">
            <span className="stat-number">{tasks.filter(t => t.status === 'assigned').length}</span>
            <span className="stat-label">待开始</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{tasks.filter(t => t.status === 'in_progress').length}</span>
            <span className="stat-label">进行中</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{tasks.filter(t => t.status === 'completed').length}</span>
            <span className="stat-label">已完成</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{tasks.filter(t => isOverdue(t)).length}</span>
            <span className="stat-label">已逾期</span>
          </div>
        </div>

        <div className="tasks-grid">
          {sortedTasks.map(task => (
            <div 
              key={task.id} 
              className={`task-card ${task.status} ${isOverdue(task) ? 'overdue' : ''}`}
              onClick={() => setSelectedTask(task)}
            >
              <div className="task-header">
                <div className="task-title-row">
                  <h3 className="task-title">{task.title}</h3>
                  <div className="task-badges">
                    <span 
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(task.priority) }}
                    >
                      {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                    </span>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(task.status) }}
                    >
                      {task.status === 'assigned' ? '已分配' : 
                       task.status === 'in_progress' ? '进行中' : '已完成'}
                    </span>
                  </div>
                </div>
                <p className="task-description">{task.description}</p>
              </div>
              
              <div className="task-info">
                <div className="info-row">
                  <span className="label">分配者：</span>
                  <span className="value">{task.assignedBy}</span>
                </div>
                <div className="info-row">
                  <span className="label">截止时间：</span>
                  <span className={`value ${isOverdue(task) ? 'overdue-text' : ''}`}>
                    {formatDate(task.deadline)}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">预计时长：</span>
                  <span className="value">{task.estimatedHours}小时</span>
                </div>
              </div>

              <div className="task-progress">
                <div className="progress-header">
                  <span>完成度: {task.progress}%</span>
                  {task.status !== 'completed' && (
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={task.progress}
                      onChange={(e) => {
                        e.stopPropagation()
                        updateTaskProgress(task.id, parseInt(e.target.value))
                      }}
                      className="progress-slider"
                    />
                  )}
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="task-tags">
                {task.tags.map((tag, index) => (
                  <span key={index} className="task-tag">{tag}</span>
                ))}
              </div>

              <div className="task-actions">
                {task.status !== 'completed' && (
                  <>
                    <button 
                      className="action-btn start-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (task.status === 'assigned') {
                          updateTaskStatus(task.id, 'in_progress')
                        }
                      }}
                      disabled={task.status === 'in_progress'}
                    >
                      {task.status === 'assigned' ? '开始任务' : '进行中'}
                    </button>
                    <button 
                      className="action-btn complete-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedTask(task)
                        setShowTaskModal(true)
                      }}
                    >
                      标记完成
                    </button>
                    <button 
                      className="action-btn help-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        requestHelp(task.id)
                      }}
                    >
                      请求帮助
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedTask && !showTaskModal && (
          <div className="task-detail-modal" onClick={() => setSelectedTask(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedTask.title}</h2>
                <button onClick={() => setSelectedTask(null)}>×</button>
              </div>
              
              <div className="modal-body">
                <div className="detail-section">
                  <h3>任务描述</h3>
                  <p>{selectedTask.description}</p>
                </div>
                
                <div className="detail-section">
                  <h3>要求清单</h3>
                  <ul>
                    {selectedTask.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="detail-section">
                  <h3>参考资源</h3>
                  <div className="resources-list">
                    {selectedTask.resources.map((resource, index) => (
                      <a key={index} href={resource.url} className="resource-link" target="_blank" rel="noopener noreferrer">
                        📄 {resource.name}
                      </a>
                    ))}
                  </div>
                </div>
                
                {selectedTask.status === 'completed' && (
                  <div className="detail-section">
                    <h3>完成信息</h3>
                    <p><strong>完成时间：</strong>{formatDate(selectedTask.completedDate)}</p>
                    <p><strong>备注：</strong>{selectedTask.completionNotes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showTaskModal && selectedTask && (
          <div className="task-modal" onClick={() => setShowTaskModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>标记任务完成</h2>
                <button onClick={() => setShowTaskModal(false)}>×</button>
              </div>
              
              <div className="modal-body">
                <h3>{selectedTask.title}</h3>
                <div className="form-group">
                  <label>完成状态：</label>
                  <select 
                    value={taskStatusUpdate.status} 
                    onChange={(e) => setTaskStatusUpdate({...taskStatusUpdate, status: e.target.value})}
                  >
                    <option value="">请选择</option>
                    <option value="completed">已完成</option>
                    <option value="needs_review">需要审核</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>完成说明：</label>
                  <textarea 
                    value={taskStatusUpdate.notes}
                    onChange={(e) => setTaskStatusUpdate({...taskStatusUpdate, notes: e.target.value})}
                    placeholder="请简要描述完成情况、遇到的问题或需要说明的内容..."
                    rows="4"
                  />
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowTaskModal(false)}
                >
                  取消
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => updateTaskStatus(selectedTask.id, 'completed', taskStatusUpdate.notes)}
                  disabled={!taskStatusUpdate.status}
                >
                  确认完成
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Tasks