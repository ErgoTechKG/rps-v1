import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ApplicationStatus.css'

const ApplicationStatus = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadApplications()
    loadNotifications()
    // Simulate real-time updates
    const interval = setInterval(checkUpdates, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [courseId])

  const loadApplications = () => {
    const saved = localStorage.getItem(`applications_${courseId}`)
    if (saved) {
      const apps = JSON.parse(saved)
      // Add mock status information
      const enrichedApps = apps.map(app => ({
        ...app,
        currentStage: getApplicationStage(app),
        progress: getProgressPercentage(app),
        timeline: generateTimeline(app),
        interviewScheduled: app.status === 'interview_scheduled' ? generateInterviewInfo() : null
      }))
      setApplications(enrichedApps)
    } else {
      // Mock data for demo
      setApplications([
        {
          id: '1',
          topicTitle: '深度学习在医疗图像分析中的应用',
          professorName: '张教授',
          submittedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          status: 'under_review',
          currentStage: 'review',
          progress: 50,
          timeline: generateTimeline({ status: 'under_review' }),
          feedback: null
        },
        {
          id: '2',
          topicTitle: '区块链技术在供应链管理中的研究',
          professorName: '李教授',
          submittedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          status: 'interview_scheduled',
          currentStage: 'interview',
          progress: 75,
          timeline: generateTimeline({ status: 'interview_scheduled' }),
          interviewScheduled: generateInterviewInfo()
        }
      ])
    }
  }

  const loadNotifications = () => {
    // Mock notifications
    setNotifications([
      {
        id: '1',
        type: 'status_update',
        title: '申请状态更新',
        message: '您的申请"区块链技术在供应链管理中的研究"已进入面试阶段',
        time: new Date(Date.now() - 3600000).toISOString(),
        read: false
      },
      {
        id: '2',
        type: 'interview_invitation',
        title: '面试邀请',
        message: '李教授邀请您参加面试，请选择合适的时间',
        time: new Date(Date.now() - 86400000).toISOString(),
        read: true
      }
    ])
  }

  const checkUpdates = () => {
    // Simulate checking for updates
    console.log('Checking for application updates...')
  }

  const getApplicationStage = (app) => {
    const stages = {
      'submitted': 'submit',
      'under_review': 'review',
      'interview_scheduled': 'interview',
      'interview_completed': 'interview',
      'accepted': 'result',
      'rejected': 'result',
      'waitlisted': 'result'
    }
    return stages[app.status] || 'submit'
  }

  const getProgressPercentage = (app) => {
    const progress = {
      'submitted': 25,
      'under_review': 50,
      'interview_scheduled': 75,
      'interview_completed': 85,
      'accepted': 100,
      'rejected': 100,
      'waitlisted': 100
    }
    return progress[app.status] || 0
  }

  const generateTimeline = (app) => {
    const timeline = [
      {
        stage: 'submit',
        title: '提交申请',
        date: app.submittedAt,
        completed: true,
        active: app.status === 'submitted'
      },
      {
        stage: 'review',
        title: '审核中',
        date: app.status !== 'submitted' ? new Date(Date.now() - 86400000 * 2).toISOString() : null,
        completed: ['under_review', 'interview_scheduled', 'interview_completed', 'accepted', 'rejected', 'waitlisted'].includes(app.status),
        active: app.status === 'under_review'
      },
      {
        stage: 'interview',
        title: '面试',
        date: ['interview_scheduled', 'interview_completed'].includes(app.status) ? new Date(Date.now() + 86400000 * 2).toISOString() : null,
        completed: ['interview_completed', 'accepted', 'rejected', 'waitlisted'].includes(app.status),
        active: ['interview_scheduled', 'interview_completed'].includes(app.status)
      },
      {
        stage: 'result',
        title: '结果',
        date: ['accepted', 'rejected', 'waitlisted'].includes(app.status) ? new Date(Date.now() + 86400000 * 5).toISOString() : null,
        completed: ['accepted', 'rejected', 'waitlisted'].includes(app.status),
        active: ['accepted', 'rejected', 'waitlisted'].includes(app.status)
      }
    ]
    return timeline
  }

  const generateInterviewInfo = () => {
    return {
      date: new Date(Date.now() + 86400000 * 2).toISOString(),
      time: '14:00-14:30',
      location: '线上（腾讯会议）',
      meetingId: '123-456-789',
      preparationMaterials: [
        '个人研究经历介绍（5分钟）',
        '对课题的理解和计划',
        '相关项目展示（可选）'
      ]
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      'submitted': { text: '已提交', class: 'submitted' },
      'under_review': { text: '审核中', class: 'reviewing' },
      'interview_scheduled': { text: '待面试', class: 'interview' },
      'interview_completed': { text: '面试完成', class: 'interview-done' },
      'accepted': { text: '已录取', class: 'accepted' },
      'rejected': { text: '未录取', class: 'rejected' },
      'waitlisted': { text: '候补名单', class: 'waitlisted' }
    }
    return badges[status] || { text: '未知', class: 'unknown' }
  }

  const handleViewDetails = (appId) => {
    // Navigate to detailed view
    console.log('View details for application:', appId)
  }

  const handleBookInterview = (appId) => {
    navigate(`/student/courses/lab-rotation/${courseId}/application/interview-booking?applicationId=${appId}`)
  }

  const handleWithdraw = (appId) => {
    if (window.confirm('确定要撤回这份申请吗？撤回后无法恢复。')) {
      setApplications(prev => prev.filter(app => app.id !== appId))
      alert('申请已撤回')
    }
  }

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true
    if (filter === 'active') return !['accepted', 'rejected'].includes(app.status)
    if (filter === 'completed') return ['accepted', 'rejected', 'waitlisted'].includes(app.status)
    return true
  })

  return (
    <div className="application-status-container">
      <div className="status-header">
        <h1>申请状态跟踪</h1>
        <button 
          className="btn-primary"
          onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/application/apply`)}
        >
          新建申请
        </button>
      </div>

      {notifications.length > 0 && (
        <div className="notifications-section">
          <h2>最新通知</h2>
          <div className="notification-list">
            {notifications.map(notif => (
              <div 
                key={notif.id} 
                className={`notification-item ${notif.read ? 'read' : 'unread'}`}
              >
                <div className="notif-icon">
                  {notif.type === 'interview_invitation' ? '📅' : '📢'}
                </div>
                <div className="notif-content">
                  <h4>{notif.title}</h4>
                  <p>{notif.message}</p>
                  <span className="notif-time">
                    {new Date(notif.time).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="applications-section">
        <div className="section-header">
          <h2>我的申请</h2>
          <div className="filter-tabs">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              全部 ({applications.length})
            </button>
            <button 
              className={filter === 'active' ? 'active' : ''}
              onClick={() => setFilter('active')}
            >
              进行中 ({applications.filter(a => !['accepted', 'rejected'].includes(a.status)).length})
            </button>
            <button 
              className={filter === 'completed' ? 'active' : ''}
              onClick={() => setFilter('completed')}
            >
              已完成 ({applications.filter(a => ['accepted', 'rejected', 'waitlisted'].includes(a.status)).length})
            </button>
          </div>
        </div>

        <div className="applications-list">
          {filteredApplications.length === 0 ? (
            <div className="empty-state">
              <p>暂无申请记录</p>
              <button 
                className="btn-primary"
                onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/topic-browsing/list`)}
              >
                浏览课题
              </button>
            </div>
          ) : (
            filteredApplications.map(app => {
              const badge = getStatusBadge(app.status)
              return (
                <div key={app.id} className="application-card">
                  <div className="app-header">
                    <div className="app-info">
                      <h3>{app.topicTitle}</h3>
                      <p>{app.professorName} · 提交于 {new Date(app.submittedAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`status-badge ${badge.class}`}>
                      {badge.text}
                    </span>
                  </div>

                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${app.progress}%` }}
                    />
                  </div>

                  <div className="timeline">
                    {app.timeline.map((step, index) => (
                      <div 
                        key={step.stage} 
                        className={`timeline-step ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}`}
                      >
                        <div className="step-marker">
                          {step.completed ? '✓' : index + 1}
                        </div>
                        <div className="step-info">
                          <div className="step-title">{step.title}</div>
                          {step.date && (
                            <div className="step-date">
                              {new Date(step.date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {app.interviewScheduled && (
                    <div className="interview-info">
                      <h4>面试安排</h4>
                      <div className="interview-details">
                        <p><strong>时间：</strong>{new Date(app.interviewScheduled.date).toLocaleDateString()} {app.interviewScheduled.time}</p>
                        <p><strong>地点：</strong>{app.interviewScheduled.location}</p>
                        <p><strong>会议号：</strong>{app.interviewScheduled.meetingId}</p>
                      </div>
                      <div className="preparation-list">
                        <strong>准备材料：</strong>
                        <ul>
                          {app.interviewScheduled.preparationMaterials.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {app.feedback && (
                    <div className="feedback-section">
                      <h4>教授反馈</h4>
                      <p>{app.feedback}</p>
                    </div>
                  )}

                  <div className="app-actions">
                    <button 
                      className="btn-secondary"
                      onClick={() => handleViewDetails(app.id)}
                    >
                      查看详情
                    </button>
                    {app.status === 'interview_scheduled' && (
                      <button 
                        className="btn-primary"
                        onClick={() => handleBookInterview(app.id)}
                      >
                        重新安排面试
                      </button>
                    )}
                    {['submitted', 'under_review'].includes(app.status) && (
                      <button 
                        className="btn-danger"
                        onClick={() => handleWithdraw(app.id)}
                      >
                        撤回申请
                      </button>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      <div className="tips-section">
        <h3>申请提示</h3>
        <ul>
          <li>申请提交后，教授会在3-5个工作日内完成初步审核</li>
          <li>收到面试邀请后，请及时确认并准备相关材料</li>
          <li>可以同时申请多个课题，但最终只能选择一个</li>
          <li>如有疑问，可通过消息系统联系教授或教务秘书</li>
        </ul>
      </div>
    </div>
  )
}

export default ApplicationStatus