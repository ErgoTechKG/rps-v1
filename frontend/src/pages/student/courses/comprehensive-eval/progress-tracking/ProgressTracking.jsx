import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronRight, Clock, CheckCircle2, AlertCircle, Calendar, Target, TrendingUp, Award, MessageSquare, HelpCircle } from 'lucide-react'
import Layout from '../../../../../components/Layout'
import './ProgressTracking.css'

function ProgressTracking() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('current-stage')
  const [currentPhase, setCurrentPhase] = useState({
    id: 'submission',
    name: '材料提交',
    description: '提交评估所需的各类材料和文档',
    startDate: '2024-12-10',
    endDate: '2024-12-25',
    progress: 40,
    requirements: [
      '完成自评报告',
      '上传学术成果',
      '提交推荐信',
      '完成个人陈述'
    ],
    completedRequirements: ['完成自评报告']
  })
  const [completionStatus, setCompletionStatus] = useState({
    categories: [
      { name: '学术材料', total: 5, completed: 3, weight: 30 },
      { name: '个人发展', total: 4, completed: 2, weight: 25 },
      { name: '创新成果', total: 3, completed: 1, weight: 25 },
      { name: '社会实践', total: 4, completed: 3, weight: 20 }
    ],
    overallProgress: 56,
    peerAverage: 48
  })
  const [nextSteps, setNextSteps] = useState([
    {
      id: 1,
      title: '上传研究论文',
      category: '学术材料',
      priority: 'high',
      deadline: '2024-12-18',
      estimatedTime: '30分钟',
      description: '上传您的主要研究论文或学术成果'
    },
    {
      id: 2,
      title: '完成创新项目描述',
      category: '创新成果',
      priority: 'high',
      deadline: '2024-12-20',
      estimatedTime: '45分钟',
      description: '详细描述您参与的创新项目和贡献'
    },
    {
      id: 3,
      title: '提交推荐信',
      category: '个人发展',
      priority: 'medium',
      deadline: '2024-12-22',
      estimatedTime: '15分钟',
      description: '确保推荐人已提交推荐信'
    }
  ])
  const [timeline, setTimeline] = useState([
    {
      date: '2024-12-01',
      phase: '准备阶段',
      status: 'completed',
      milestone: '评估系统开放'
    },
    {
      date: '2024-12-10',
      phase: '材料提交',
      status: 'active',
      milestone: '开始提交材料'
    },
    {
      date: '2024-12-25',
      phase: '材料提交',
      status: 'upcoming',
      milestone: '材料提交截止'
    },
    {
      date: '2025-01-10',
      phase: '专家评审',
      status: 'upcoming',
      milestone: '评审开始'
    },
    {
      date: '2025-01-25',
      phase: '结果公布',
      status: 'upcoming',
      milestone: '结果发布'
    }
  ])

  const tabs = [
    { id: 'current-stage', label: '当前阶段', icon: Clock },
    { id: 'completion-status', label: '完成状态', icon: CheckCircle2 },
    { id: 'next-steps', label: '下一步行动', icon: Target }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high'
      case 'medium': return 'priority-medium'
      case 'low': return 'priority-low'
      default: return ''
    }
  }

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleActionClick = (step) => {
    // Navigate to appropriate submission page based on category
    if (step.category === '学术材料') {
      navigate(`/student/courses/comprehensive-eval/${courseId}/material-submission/upload-center/projects`)
    } else if (step.category === '创新成果') {
      navigate(`/student/courses/comprehensive-eval/${courseId}/material-submission/upload-center/achievements`)
    } else {
      navigate(`/student/courses/comprehensive-eval/${courseId}/material-submission`)
    }
  }

  return (
    <Layout userRole="student">
      <div className="progress-tracking">
        <div className="page-header">
          <h1>评估进度追踪</h1>
          <p>跟踪您的综合评估进展，了解当前状态和下一步行动</p>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Current Stage Tab */}
        {activeTab === 'current-stage' && (
          <div className="tab-content current-stage">
            <div className="stage-overview">
              <div className="stage-header">
                <div className="stage-info">
                  <h2>{currentPhase.name}</h2>
                  <p>{currentPhase.description}</p>
                  <div className="stage-timeline">
                    <Calendar size={16} />
                    <span>{currentPhase.startDate} - {currentPhase.endDate}</span>
                  </div>
                </div>
                <div className="stage-progress">
                  <div className="circular-progress">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#4caf50"
                        strokeWidth="10"
                        strokeDasharray={`${currentPhase.progress * 2.83} 283`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="progress-text">{currentPhase.progress}%</div>
                  </div>
                  <p>阶段进度</p>
                </div>
              </div>

              <div className="requirements-section">
                <h3>阶段要求</h3>
                <div className="requirements-list">
                  {currentPhase.requirements.map((req, index) => (
                    <div key={index} className="requirement-item">
                      {currentPhase.completedRequirements.includes(req) ? (
                        <CheckCircle2 size={20} className="icon-completed" />
                      ) : (
                        <div className="icon-pending" />
                      )}
                      <span className={currentPhase.completedRequirements.includes(req) ? 'completed' : ''}>
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="phase-help">
                <div className="help-card">
                  <HelpCircle size={24} />
                  <div className="help-content">
                    <h4>需要帮助？</h4>
                    <p>查看详细的阶段指南和常见问题</p>
                    <button className="btn-text">查看指南 <ChevronRight size={16} /></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-section">
              <h3>评估时间线</h3>
              <div className="timeline">
                {timeline.map((event, index) => (
                  <div key={index} className={`timeline-item ${event.status}`}>
                    <div className="timeline-marker">
                      {event.status === 'completed' && <CheckCircle2 size={20} />}
                      {event.status === 'active' && <div className="active-marker" />}
                      {event.status === 'upcoming' && <div className="upcoming-marker" />}
                    </div>
                    <div className="timeline-content">
                      <span className="timeline-date">{event.date}</span>
                      <h4>{event.phase}</h4>
                      <p>{event.milestone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Completion Status Tab */}
        {activeTab === 'completion-status' && (
          <div className="tab-content completion-status">
            <div className="overall-progress">
              <div className="progress-header">
                <h2>整体完成进度</h2>
                <div className="progress-stats">
                  <div className="stat-item">
                    <span className="stat-label">您的进度</span>
                    <span className="stat-value primary">{completionStatus.overallProgress}%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">同届平均</span>
                    <span className="stat-value">{completionStatus.peerAverage}%</span>
                  </div>
                  <div className="stat-item">
                    <TrendingUp size={20} className="trend-up" />
                    <span className="stat-label">高于平均</span>
                  </div>
                </div>
              </div>

              <div className="progress-bar-large">
                <div 
                  className="progress-fill"
                  style={{ width: `${completionStatus.overallProgress}%` }}
                >
                  <span className="progress-label">{completionStatus.overallProgress}%</span>
                </div>
                <div 
                  className="peer-marker"
                  style={{ left: `${completionStatus.peerAverage}%` }}
                >
                  <div className="marker-line" />
                  <span className="marker-label">同届平均</span>
                </div>
              </div>
            </div>

            <div className="category-breakdown">
              <h3>分类完成情况</h3>
              <div className="category-list">
                {completionStatus.categories.map((category, index) => (
                  <div key={index} className="category-item">
                    <div className="category-header">
                      <h4>{category.name}</h4>
                      <span className="category-stats">
                        {category.completed}/{category.total} 完成
                      </span>
                    </div>
                    <div className="category-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${(category.completed / category.total) * 100}%` }}
                        />
                      </div>
                      <span className="weight-label">权重: {category.weight}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="completion-achievements">
              <h3>完成里程碑</h3>
              <div className="achievement-list">
                <div className="achievement-item completed">
                  <Award size={24} />
                  <div className="achievement-content">
                    <h4>快速启动者</h4>
                    <p>在开放后48小时内开始提交材料</p>
                  </div>
                </div>
                <div className="achievement-item">
                  <Award size={24} />
                  <div className="achievement-content">
                    <h4>全面发展</h4>
                    <p>在所有类别中都有提交（进行中）</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps Tab */}
        {activeTab === 'next-steps' && (
          <div className="tab-content next-steps">
            <div className="steps-header">
              <h2>建议的下一步行动</h2>
              <p>基于您的当前进度和截止日期，我们建议您按以下顺序完成任务</p>
            </div>

            <div className="steps-list">
              {nextSteps.map(step => (
                <div key={step.id} className={`step-card ${getPriorityColor(step.priority)}`}>
                  <div className="step-header">
                    <div className="step-info">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                      <div className="step-meta">
                        <span className="category-tag">{step.category}</span>
                        <span className="time-estimate">
                          <Clock size={16} />
                          预计 {step.estimatedTime}
                        </span>
                      </div>
                    </div>
                    <div className="step-deadline">
                      <div className="deadline-info">
                        <Calendar size={16} />
                        <span>{step.deadline}</span>
                      </div>
                      <span className={`days-left ${getDaysUntilDeadline(step.deadline) <= 3 ? 'urgent' : ''}`}>
                        还剩 {getDaysUntilDeadline(step.deadline)} 天
                      </span>
                    </div>
                  </div>
                  <div className="step-actions">
                    <button 
                      className="btn-primary"
                      onClick={() => handleActionClick(step)}
                    >
                      立即开始
                    </button>
                    <button className="btn-text">
                      查看详情 <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="recommendations">
              <h3>个性化建议</h3>
              <div className="recommendation-cards">
                <div className="recommendation-card">
                  <AlertCircle size={24} className="icon-warning" />
                  <h4>优先完成高权重项目</h4>
                  <p>学术材料类别占总评30%，建议优先完成该类别的剩余项目</p>
                </div>
                <div className="recommendation-card">
                  <TrendingUp size={24} className="icon-success" />
                  <h4>保持领先优势</h4>
                  <p>您的进度高于平均水平，继续保持当前节奏可以提前完成所有要求</p>
                </div>
              </div>
            </div>

            <div className="support-section">
              <h3>需要帮助？</h3>
              <div className="support-options">
                <button className="support-button">
                  <MessageSquare size={20} />
                  联系指导教师
                </button>
                <button className="support-button">
                  <HelpCircle size={20} />
                  查看帮助文档
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default ProgressTracking