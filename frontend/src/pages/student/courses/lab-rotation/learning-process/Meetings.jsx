import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './Meetings.css'

const Meetings = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [meetings, setMeetings] = useState([])
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [showMeetingModal, setShowMeetingModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [meetingForm, setMeetingForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '60',
    type: 'one_on_one',
    participants: [],
    agenda: '',
    location: 'online'
  })
  const [minutesForm, setMinutesForm] = useState({
    minutes: '',
    actionItems: [],
    nextSteps: '',
    materials: []
  })

  useEffect(() => {
    loadMeetings()
  }, [courseId])

  const loadMeetings = () => {
    // Mock meeting data
    const mockMeetings = [
      {
        id: '1',
        title: '项目启动会议',
        description: '讨论研究项目的整体规划和初步安排',
        date: '2024-02-10',
        time: '14:00',
        duration: 90,
        type: 'one_on_one',
        status: 'completed',
        participants: ['张教授', '学生1'],
        organizer: '张教授',
        location: 'zoom',
        agenda: `1. 项目背景介绍
2. 研究目标确定
3. 时间安排讨论
4. 下阶段任务分配`,
        minutes: `会议讨论了项目的整体方向和具体安排：
1. 确定了以深度学习为主要研究方向
2. 制定了为期4个月的研究计划
3. 明确了每周例会时间为周五下午2点
4. 分配了第一阶段的文献调研任务`,
        actionItems: [
          { id: '1', task: '完成30篇相关论文的调研', assignee: '学生1', deadline: '2024-02-20', completed: true },
          { id: '2', task: '准备下次会议的进展汇报', assignee: '学生1', deadline: '2024-02-17', completed: true }
        ],
        nextSteps: '下周五继续讨论文献调研结果，制定具体的实验方案',
        materials: [
          { name: '项目计划书.pdf', url: '/materials/project-plan.pdf' },
          { name: '参考论文列表.docx', url: '/materials/paper-list.docx' }
        ],
        createdAt: '2024-02-08T10:00:00'
      },
      {
        id: '2',
        title: '周例会 - 第二周',
        description: '汇报第一阶段文献调研进展',
        date: '2024-02-17',
        time: '14:00',
        duration: 60,
        type: 'one_on_one',
        status: 'completed',
        participants: ['张教授', '学生1'],
        organizer: '张教授',
        location: 'office_201',
        agenda: `1. 文献调研结果汇报
2. 研究方法选择讨论
3. 实验环境搭建进展
4. 下周任务安排`,
        minutes: `本次会议主要回顾了文献调研的成果：
1. 学生完成了35篇论文的调研，总结了主要技术路线
2. 确定了使用Transformer架构作为基础模型
3. 实验环境已基本搭建完成
4. 开始进行初步的实验设计`,
        actionItems: [
          { id: '3', task: '完成基础模型的复现', assignee: '学生1', deadline: '2024-02-24', completed: false },
          { id: '4', task: '设计对比实验方案', assignee: '学生1', deadline: '2024-02-22', completed: false }
        ],
        nextSteps: '下周重点讨论实验设计细节，确定评估指标',
        materials: [
          { name: '文献调研报告.pdf', url: '/materials/literature-review.pdf' }
        ],
        createdAt: '2024-02-15T09:00:00'
      },
      {
        id: '3',
        title: '中期进展讨论',
        description: '讨论项目中期进展和遇到的问题',
        date: '2024-02-24',
        time: '14:00',
        duration: 60,
        type: 'one_on_one',
        status: 'scheduled',
        participants: ['张教授', '学生1'],
        organizer: '张教授',
        location: 'zoom',
        agenda: `1. 实验结果展示
2. 遇到的技术难点讨论
3. 解决方案探讨
4. 后续计划调整`,
        minutes: '',
        actionItems: [],
        nextSteps: '',
        materials: [],
        createdAt: '2024-02-20T16:00:00'
      },
      {
        id: '4',
        title: '小组讨论会',
        description: '与其他学生一起讨论研究进展',
        date: '2024-02-28',
        time: '15:30',
        duration: 120,
        type: 'group',
        status: 'scheduled',
        participants: ['张教授', '学生1', '学生2', '学生3'],
        organizer: '张教授',
        location: 'conference_room_a',
        agenda: `1. 各自项目进展汇报
2. 技术交流和讨论
3. 互相学习和建议
4. 下阶段合作可能性`,
        minutes: '',
        actionItems: [],
        nextSteps: '',
        materials: [],
        createdAt: '2024-02-22T11:00:00'
      }
    ]
    
    const savedMeetings = localStorage.getItem(`meetings_${courseId}`)
    if (savedMeetings) {
      setMeetings(JSON.parse(savedMeetings))
    } else {
      setMeetings(mockMeetings)
      localStorage.setItem(`meetings_${courseId}`, JSON.stringify(mockMeetings))
    }
  }

  const saveMeetings = (updatedMeetings) => {
    setMeetings(updatedMeetings)
    localStorage.setItem(`meetings_${courseId}`, JSON.stringify(updatedMeetings))
  }

  const filteredMeetings = meetings.filter(meeting => {
    switch (filter) {
      case 'upcoming':
        return meeting.status === 'scheduled' && new Date(`${meeting.date}T${meeting.time}`) > new Date()
      case 'completed':
        return meeting.status === 'completed'
      case 'today':
        const today = new Date().toISOString().split('T')[0]
        return meeting.date === today
      case 'this_week':
        const now = new Date()
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
        const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
        const meetingDate = new Date(meeting.date)
        return meetingDate >= weekStart && meetingDate < weekEnd
      default:
        return true
    }
  })

  const sortedMeetings = [...filteredMeetings].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`)
    const dateB = new Date(`${b.date}T${b.time}`)
    return dateB - dateA // Most recent first
  })

  const handleScheduleMeeting = () => {
    if (!meetingForm.title || !meetingForm.date || !meetingForm.time) {
      alert('请填写必填字段')
      return
    }

    const newMeeting = {
      id: Date.now().toString(),
      ...meetingForm,
      duration: parseInt(meetingForm.duration),
      status: 'scheduled',
      organizer: '学生1', // Current user
      participants: [...meetingForm.participants, '学生1'],
      minutes: '',
      actionItems: [],
      nextSteps: '',
      materials: [],
      createdAt: new Date().toISOString()
    }

    const updatedMeetings = [...meetings, newMeeting]
    saveMeetings(updatedMeetings)
    
    setShowScheduleModal(false)
    setMeetingForm({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: '60',
      type: 'one_on_one',
      participants: [],
      agenda: '',
      location: 'online'
    })
    
    alert('会议已成功安排！')
  }

  const saveMinutes = () => {
    if (!selectedMeeting) return

    const updatedMeetings = meetings.map(meeting => {
      if (meeting.id === selectedMeeting.id) {
        return {
          ...meeting,
          minutes: minutesForm.minutes,
          actionItems: minutesForm.actionItems,
          nextSteps: minutesForm.nextSteps,
          materials: minutesForm.materials,
          status: 'completed'
        }
      }
      return meeting
    })

    saveMeetings(updatedMeetings)
    setShowMeetingModal(false)
    setSelectedMeeting(null)
    alert('会议纪要已保存！')
  }

  const addActionItem = () => {
    const task = prompt('请输入行动事项：')
    if (task) {
      const newActionItem = {
        id: Date.now().toString(),
        task,
        assignee: '学生1',
        deadline: '',
        completed: false
      }
      setMinutesForm({
        ...minutesForm,
        actionItems: [...minutesForm.actionItems, newActionItem]
      })
    }
  }

  const removeActionItem = (index) => {
    setMinutesForm({
      ...minutesForm,
      actionItems: minutesForm.actionItems.filter((_, i) => i !== index)
    })
  }

  const toggleActionItemComplete = (index) => {
    const updatedActionItems = minutesForm.actionItems.map((item, i) => {
      if (i === index) {
        return { ...item, completed: !item.completed }
      }
      return item
    })
    setMinutesForm({ ...minutesForm, actionItems: updatedActionItems })
  }

  const openMeetingModal = (meeting) => {
    setSelectedMeeting(meeting)
    setMinutesForm({
      minutes: meeting.minutes || '',
      actionItems: meeting.actionItems || [],
      nextSteps: meeting.nextSteps || '',
      materials: meeting.materials || []
    })
    setShowMeetingModal(true)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return '#3498db'
      case 'completed': return '#27ae60'
      case 'cancelled': return '#e74c3c'
      default: return '#95a5a6'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled': return '已安排'
      case 'completed': return '已完成'
      case 'cancelled': return '已取消'
      default: return '未知'
    }
  }

  const getTypeText = (type) => {
    switch (type) {
      case 'one_on_one': return '一对一'
      case 'group': return '小组会议'
      case 'presentation': return '汇报会'
      default: return '其他'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN')
  }

  const formatTime = (timeString) => {
    return timeString
  }

  const isUpcoming = (meeting) => {
    const meetingDateTime = new Date(`${meeting.date}T${meeting.time}`)
    return meetingDateTime > new Date() && meeting.status === 'scheduled'
  }

  const getUpcomingMeetings = () => {
    return meetings.filter(meeting => isUpcoming(meeting))
      .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
  }

  return (
    <Layout>
      <div className="meetings-container">
        <div className="meetings-header">
          <div className="header-left">
            <h1>会议管理</h1>
            <div className="breadcrumb">
              <span onClick={() => navigate(`/student/dashboard`)}>学生工作台</span>
              <span>/</span>
              <span onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/learning-process/tasks`)}>学习过程</span>
              <span>/</span>
              <span>会议管理</span>
            </div>
          </div>
          
          <div className="header-actions">
            <button 
              className="nav-btn"
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/learning-process/tasks`)}
            >
              任务管理
            </button>
            <button 
              className="nav-btn"
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/learning-process/submissions`)}
            >
              作业提交
            </button>
            <button 
              className="nav-btn"
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/learning-process/progress`)}
            >
              进度跟踪
            </button>
            <button 
              className="primary-btn"
              onClick={() => setShowScheduleModal(true)}
            >
              安排会议
            </button>
          </div>
        </div>

        {getUpcomingMeetings().length > 0 && (
          <div className="upcoming-meetings">
            <h3>📅 即将到来的会议</h3>
            <div className="upcoming-list">
              {getUpcomingMeetings().slice(0, 3).map(meeting => (
                <div key={meeting.id} className="upcoming-item">
                  <div className="upcoming-info">
                    <span className="meeting-title">{meeting.title}</span>
                    <span className="meeting-time">
                      {formatDate(meeting.date)} {formatTime(meeting.time)}
                    </span>
                  </div>
                  <span className="meeting-type">{getTypeText(meeting.type)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="meetings-controls">
          <div className="filter-controls">
            <label>筛选：</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">全部会议</option>
              <option value="upcoming">即将到来</option>
              <option value="completed">已完成</option>
              <option value="today">今天</option>
              <option value="this_week">本周</option>
            </select>
          </div>
        </div>

        <div className="meetings-stats">
          <div className="stat-card">
            <span className="stat-number">{meetings.filter(m => m.status === 'scheduled').length}</span>
            <span className="stat-label">已安排</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{meetings.filter(m => m.status === 'completed').length}</span>
            <span className="stat-label">已完成</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{getUpcomingMeetings().length}</span>
            <span className="stat-label">即将到来</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{meetings.filter(m => m.type === 'one_on_one').length}</span>
            <span className="stat-label">一对一</span>
          </div>
        </div>

        <div className="meetings-list">
          {sortedMeetings.map(meeting => (
            <div 
              key={meeting.id} 
              className={`meeting-card ${meeting.status} ${isUpcoming(meeting) ? 'upcoming' : ''}`}
              onClick={() => openMeetingModal(meeting)}
            >
              <div className="meeting-header">
                <div className="meeting-title-row">
                  <h3 className="meeting-title">{meeting.title}</h3>
                  <div className="meeting-badges">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(meeting.status) }}
                    >
                      {getStatusText(meeting.status)}
                    </span>
                    <span className="type-badge">{getTypeText(meeting.type)}</span>
                  </div>
                </div>
                <p className="meeting-description">{meeting.description}</p>
              </div>

              <div className="meeting-info">
                <div className="info-row">
                  <span className="label">时间：</span>
                  <span className="value">
                    {formatDate(meeting.date)} {formatTime(meeting.time)}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">时长：</span>
                  <span className="value">{meeting.duration}分钟</span>
                </div>
                <div className="info-row">
                  <span className="label">地点：</span>
                  <span className="value">
                    {meeting.location === 'online' ? '在线会议' : 
                     meeting.location === 'zoom' ? 'Zoom会议' : 
                     meeting.location.includes('office') ? '办公室' : 
                     meeting.location.includes('room') ? '会议室' : meeting.location}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">参与者：</span>
                  <span className="value">{meeting.participants.join(', ')}</span>
                </div>
              </div>

              {meeting.agenda && (
                <div className="meeting-agenda">
                  <h4>议程：</h4>
                  <pre className="agenda-text">{meeting.agenda}</pre>
                </div>
              )}

              {meeting.actionItems.length > 0 && (
                <div className="action-items-preview">
                  <h4>行动事项：</h4>
                  <div className="action-items-list">
                    {meeting.actionItems.slice(0, 2).map((item, index) => (
                      <div key={index} className={`action-item ${item.completed ? 'completed' : ''}`}>
                        <span className="action-task">{item.task}</span>
                        <span className="action-assignee">({item.assignee})</span>
                      </div>
                    ))}
                    {meeting.actionItems.length > 2 && (
                      <span className="more-items">还有 {meeting.actionItems.length - 2} 个事项...</span>
                    )}
                  </div>
                </div>
              )}

              <div className="meeting-actions">
                {meeting.status === 'scheduled' && (
                  <button 
                    className="action-btn join-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      alert('加入会议功能将打开相应的会议软件')
                    }}
                  >
                    加入会议
                  </button>
                )}
                {meeting.status === 'completed' && (
                  <button 
                    className="action-btn view-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      openMeetingModal(meeting)
                    }}
                  >
                    查看纪要
                  </button>
                )}
                <button 
                  className="action-btn edit-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    openMeetingModal(meeting)
                  }}
                >
                  {meeting.status === 'completed' ? '编辑纪要' : '编辑会议'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule Meeting Modal */}
        {showScheduleModal && (
          <div className="meeting-modal" onClick={() => setShowScheduleModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>安排新会议</h2>
                <button onClick={() => setShowScheduleModal(false)}>×</button>
              </div>
              
              <div className="modal-body">
                <div className="form-group">
                  <label>会议标题 *</label>
                  <input
                    type="text"
                    value={meetingForm.title}
                    onChange={(e) => setMeetingForm({ ...meetingForm, title: e.target.value })}
                    placeholder="请输入会议标题"
                  />
                </div>

                <div className="form-group">
                  <label>会议描述</label>
                  <textarea
                    value={meetingForm.description}
                    onChange={(e) => setMeetingForm({ ...meetingForm, description: e.target.value })}
                    placeholder="请简要描述会议内容和目的"
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>日期 *</label>
                    <input
                      type="date"
                      value={meetingForm.date}
                      onChange={(e) => setMeetingForm({ ...meetingForm, date: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>时间 *</label>
                    <input
                      type="time"
                      value={meetingForm.time}
                      onChange={(e) => setMeetingForm({ ...meetingForm, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>时长（分钟）</label>
                    <select
                      value={meetingForm.duration}
                      onChange={(e) => setMeetingForm({ ...meetingForm, duration: e.target.value })}
                    >
                      <option value="30">30分钟</option>
                      <option value="60">60分钟</option>
                      <option value="90">90分钟</option>
                      <option value="120">120分钟</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>会议类型</label>
                    <select
                      value={meetingForm.type}
                      onChange={(e) => setMeetingForm({ ...meetingForm, type: e.target.value })}
                    >
                      <option value="one_on_one">一对一</option>
                      <option value="group">小组会议</option>
                      <option value="presentation">汇报会</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>地点</label>
                  <select
                    value={meetingForm.location}
                    onChange={(e) => setMeetingForm({ ...meetingForm, location: e.target.value })}
                  >
                    <option value="online">在线会议</option>
                    <option value="zoom">Zoom会议</option>
                    <option value="office_201">办公室201</option>
                    <option value="conference_room_a">会议室A</option>
                    <option value="conference_room_b">会议室B</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>会议议程</label>
                  <textarea
                    value={meetingForm.agenda}
                    onChange={(e) => setMeetingForm({ ...meetingForm, agenda: e.target.value })}
                    placeholder="请列出会议的主要议题和安排"
                    rows="4"
                  />
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowScheduleModal(false)}
                >
                  取消
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleScheduleMeeting}
                >
                  确认安排
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Meeting Details/Minutes Modal */}
        {showMeetingModal && selectedMeeting && (
          <div className="meeting-modal" onClick={() => setShowMeetingModal(false)}>
            <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedMeeting.title}</h2>
                <button onClick={() => setShowMeetingModal(false)}>×</button>
              </div>
              
              <div className="modal-body">
                <div className="meeting-details">
                  <div className="details-row">
                    <span className="label">时间：</span>
                    <span className="value">
                      {formatDate(selectedMeeting.date)} {formatTime(selectedMeeting.time)} 
                      ({selectedMeeting.duration}分钟)
                    </span>
                  </div>
                  <div className="details-row">
                    <span className="label">类型：</span>
                    <span className="value">{getTypeText(selectedMeeting.type)}</span>
                  </div>
                  <div className="details-row">
                    <span className="label">参与者：</span>
                    <span className="value">{selectedMeeting.participants.join(', ')}</span>
                  </div>
                  <div className="details-row">
                    <span className="label">地点：</span>
                    <span className="value">
                      {selectedMeeting.location === 'online' ? '在线会议' : 
                       selectedMeeting.location === 'zoom' ? 'Zoom会议' : 
                       selectedMeeting.location}
                    </span>
                  </div>
                </div>

                {selectedMeeting.agenda && (
                  <div className="section">
                    <h3>会议议程</h3>
                    <pre className="agenda-display">{selectedMeeting.agenda}</pre>
                  </div>
                )}

                <div className="section">
                  <h3>会议纪要</h3>
                  <textarea
                    value={minutesForm.minutes}
                    onChange={(e) => setMinutesForm({ ...minutesForm, minutes: e.target.value })}
                    placeholder="请记录会议的主要内容、讨论结果和决定事项..."
                    rows="6"
                    disabled={selectedMeeting.status === 'completed' && selectedMeeting.minutes}
                  />
                </div>

                <div className="section">
                  <h3>行动事项</h3>
                  <div className="action-items-section">
                    {minutesForm.actionItems.map((item, index) => (
                      <div key={index} className="action-item-form">
                        <div className="action-item-content">
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleActionItemComplete(index)}
                          />
                          <span className={item.completed ? 'completed-task' : ''}>{item.task}</span>
                          <span className="assignee">({item.assignee})</span>
                        </div>
                        <button 
                          className="remove-btn"
                          onClick={() => removeActionItem(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button className="add-action-btn" onClick={addActionItem}>
                      + 添加行动事项
                    </button>
                  </div>
                </div>

                <div className="section">
                  <h3>下次会议安排</h3>
                  <textarea
                    value={minutesForm.nextSteps}
                    onChange={(e) => setMinutesForm({ ...minutesForm, nextSteps: e.target.value })}
                    placeholder="记录下次会议的时间、议题或其他安排..."
                    rows="3"
                  />
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowMeetingModal(false)}
                >
                  取消
                </button>
                <button 
                  className="btn-primary"
                  onClick={saveMinutes}
                >
                  保存纪要
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Meetings