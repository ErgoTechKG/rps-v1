import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, Clock, FileText, BookOpen, AlertCircle, MessageSquare, CheckCircle2, User } from 'lucide-react'
import Layout from '../../../../components/Layout'
import './EvaluationHome.css'

function EvaluationHome() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [currentPhase, setCurrentPhase] = useState('preparation')
  const [notifications, setNotifications] = useState([])
  const [submissionProgress, setSubmissionProgress] = useState({
    total: 5,
    completed: 2
  })
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([])

  useEffect(() => {
    // Load evaluation data
    loadEvaluationData()
    loadNotifications()
    loadDeadlines()
  }, [courseId])

  const loadEvaluationData = () => {
    // Simulated data for current phase
    setCurrentPhase('preparation')
  }

  const loadNotifications = () => {
    setNotifications([
      {
        id: 1,
        type: 'info',
        message: '评估系统已开放材料提交',
        time: '2小时前'
      },
      {
        id: 2,
        type: 'warning',
        message: '请在本周五前完成自评报告提交',
        time: '1天前'
      }
    ])
  }

  const loadDeadlines = () => {
    setUpcomingDeadlines([
      {
        id: 1,
        title: '自评报告提交',
        date: '2024-12-20',
        daysLeft: 5
      },
      {
        id: 2,
        title: '支撑材料上传',
        date: '2024-12-25',
        daysLeft: 10
      }
    ])
  }

  const evaluationPhases = [
    { id: 'preparation', name: '准备阶段', status: 'active' },
    { id: 'submission', name: '材料提交', status: 'upcoming' },
    { id: 'review', name: '专家评审', status: 'upcoming' },
    { id: 'result', name: '结果公布', status: 'upcoming' }
  ]

  const quickActions = [
    {
      icon: FileText,
      title: '材料提交',
      description: '上传评估所需材料',
      path: `/student/courses/comprehensive-eval/${courseId}/material-submission`,
      color: 'primary'
    },
    {
      icon: Clock,
      title: '进度查询',
      description: '查看评估进展',
      path: `/student/courses/comprehensive-eval/${courseId}/progress-tracking`,
      color: 'info'
    },
    {
      icon: BookOpen,
      title: '评估指南',
      description: '查看评估要求和说明',
      path: `/student/courses/comprehensive-eval/${courseId}/guidelines`,
      color: 'success'
    },
    {
      icon: MessageSquare,
      title: '联系支持',
      description: '获取帮助和支持',
      path: `/shared/help`,
      color: 'warning'
    }
  ]

  const resources = [
    {
      title: '评估流程说明',
      type: 'document',
      url: '#'
    },
    {
      title: '材料准备指南',
      type: 'video',
      url: '#'
    },
    {
      title: '常见问题解答',
      type: 'faq',
      url: '#'
    },
    {
      title: '评估标准解读',
      type: 'document',
      url: '#'
    }
  ]

  return (
    <Layout userRole="student">
      <div className="evaluation-home">
        <div className="page-header">
          <h1>综合评估中心</h1>
          <p>了解评估流程，跟踪进度，管理材料提交</p>
        </div>

        {/* Evaluation Process Overview */}
        <div className="evaluation-overview section">
          <h2>评估进程</h2>
          <div className="phase-timeline">
            {evaluationPhases.map((phase, index) => (
              <div key={phase.id} className={`phase-item ${phase.status}`}>
                <div className="phase-marker">
                  {phase.status === 'completed' ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    <div className="phase-number">{index + 1}</div>
                  )}
                </div>
                <div className="phase-content">
                  <h4>{phase.name}</h4>
                  {phase.status === 'active' && <span className="status-badge">当前阶段</span>}
                </div>
                {index < evaluationPhases.length - 1 && <div className="phase-connector" />}
              </div>
            ))}
          </div>

          <div className="current-phase-details">
            <div className="phase-info">
              <h3>当前阶段: 准备阶段</h3>
              <p>请按照要求准备并提交评估材料，确保所有必需文件都已上传。</p>
            </div>
            <div className="phase-timeline-info">
              <Calendar size={20} />
              <span>截止日期: 2024年12月20日</span>
            </div>
          </div>
        </div>

        {/* Personal Progress Tracking */}
        <div className="progress-tracking section">
          <h2>个人进度</h2>
          <div className="progress-overview">
            <div className="progress-card">
              <div className="progress-header">
                <h3>材料提交进度</h3>
                <span className="progress-text">{submissionProgress.completed}/{submissionProgress.total}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(submissionProgress.completed / submissionProgress.total) * 100}%` }}
                />
              </div>
              <div className="progress-details">
                <span>已完成: 自评报告, 学习总结</span>
              </div>
            </div>

            <div className="deadline-card">
              <h3>即将到期</h3>
              <div className="deadline-list">
                {upcomingDeadlines.map(deadline => (
                  <div key={deadline.id} className="deadline-item">
                    <div className="deadline-info">
                      <span className="deadline-title">{deadline.title}</span>
                      <span className="deadline-date">{deadline.date}</span>
                    </div>
                    <span className={`days-left ${deadline.daysLeft <= 3 ? 'urgent' : ''}`}>
                      还剩 {deadline.daysLeft} 天
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="recent-notifications">
            <h3>最新通知</h3>
            <div className="notification-list">
              {notifications.map(notif => (
                <div key={notif.id} className={`notification-item ${notif.type}`}>
                  <AlertCircle size={16} />
                  <span className="notification-message">{notif.message}</span>
                  <span className="notification-time">{notif.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Access to Key Functions */}
        <div className="quick-access section">
          <h2>快速访问</h2>
          <div className="action-grid">
            {quickActions.map(action => (
              <div 
                key={action.title} 
                className={`action-card ${action.color}`}
                onClick={() => navigate(action.path)}
              >
                <action.icon size={32} />
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Information and Support Resources */}
        <div className="support-resources section">
          <h2>帮助与资源</h2>
          <div className="resources-grid">
            <div className="resource-section">
              <h3>评估指南</h3>
              <div className="resource-list">
                {resources.map((resource, index) => (
                  <a key={index} href={resource.url} className="resource-item">
                    <FileText size={16} />
                    <span>{resource.title}</span>
                    <span className="resource-type">{resource.type}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="support-section">
              <h3>获取支持</h3>
              <div className="support-options">
                <div className="support-card">
                  <User size={24} />
                  <h4>联系指导教师</h4>
                  <p>获取评估相关指导</p>
                  <button className="btn-secondary">发送消息</button>
                </div>
                <div className="support-card">
                  <MessageSquare size={24} />
                  <h4>技术支持</h4>
                  <p>解决系统使用问题</p>
                  <button className="btn-secondary">获取帮助</button>
                </div>
              </div>
            </div>
          </div>

          <div className="help-footer">
            <p>需要更多帮助？访问 <a href="/shared/help">帮助中心</a> 或查看 <a href="#">常见问题</a></p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EvaluationHome