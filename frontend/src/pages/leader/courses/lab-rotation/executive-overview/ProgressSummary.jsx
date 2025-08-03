import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './ProgressSummary.css'

const ProgressSummary = () => {
  const { courseId } = useParams()
  const [progressData, setProgressData] = useState({
    overallProgress: {
      percentage: 72.5,
      phase: '中期评估阶段',
      remainingDays: 28,
      totalDays: 120
    },
    phases: [
      {
        id: 1,
        name: '课程准备',
        status: 'completed',
        startDate: '2024-02-01',
        endDate: '2024-02-15',
        progress: 100,
        description: '课程设置、教师分配、学生注册'
      },
      {
        id: 2,
        name: '学生选题',
        status: 'completed',
        startDate: '2024-02-16',
        endDate: '2024-03-01',
        progress: 100,
        description: '题目发布、学生申请、匹配确认'
      },
      {
        id: 3,
        name: '项目执行',
        status: 'in-progress',
        startDate: '2024-03-02',
        endDate: '2024-05-15',
        progress: 68,
        description: '实验进行、周会汇报、中期检查'
      },
      {
        id: 4,
        name: '成果展示',
        status: 'pending',
        startDate: '2024-05-16',
        endDate: '2024-05-30',
        progress: 0,
        description: '报告撰写、答辩准备、最终评估'
      }
    ],
    milestones: [
      {
        id: 1,
        name: '课程开始',
        date: '2024-02-01',
        status: 'completed',
        description: '课程正式启动',
        critical: false
      },
      {
        id: 2,
        name: '学生匹配完成',
        date: '2024-03-01',
        status: 'completed',
        description: '所有学生完成导师匹配',
        critical: true
      },
      {
        id: 3,
        name: '中期检查',
        date: '2024-04-01',
        status: 'completed',
        description: '项目进度中期评估',
        critical: true
      },
      {
        id: 4,
        name: '报告提交截止',
        date: '2024-05-20',
        status: 'upcoming',
        description: '学生最终报告提交',
        critical: true
      },
      {
        id: 5,
        name: '答辩评估',
        date: '2024-05-28',
        status: 'upcoming',
        description: '学生答辩和最终评估',
        critical: true
      }
    ],
    riskAssessment: [
      {
        id: 1,
        type: 'timeline',
        level: 'medium',
        description: '3个项目进度略微延迟',
        impact: '可能影响答辩时间安排',
        mitigation: '已安排额外指导时间'
      },
      {
        id: 2,
        type: 'resource',
        level: 'low',
        description: '实验设备使用率偏高',
        impact: '部分时段设备紧张',
        mitigation: '优化使用时间表'
      },
      {
        id: 3,
        type: 'quality',
        level: 'low',
        description: '少数学生参与度不足',
        impact: '可能影响学习效果',
        mitigation: '加强个人指导'
      }
    ],
    predictions: {
      onTimeCompletion: 94,
      qualityScore: 4.6,
      riskLevel: 'low',
      recommendedActions: [
        '密切关注延迟项目进展',
        '提前准备答辩场地安排',
        '加强设备使用协调'
      ]
    }
  })

  const [selectedView, setSelectedView] = useState('timeline')
  const [filterLevel, setFilterLevel] = useState('all')

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✓'
      case 'in-progress':
        return '⟳'
      case 'pending':
        return '○'
      case 'upcoming':
        return '◐'
      default:
        return '○'
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'completed'
      case 'in-progress':
        return 'in-progress'
      case 'pending':
        return 'pending'
      case 'upcoming':
        return 'upcoming'
      default:
        return 'pending'
    }
  }

  const getRiskLevelClass = (level) => {
    switch (level) {
      case 'high':
        return 'risk-high'
      case 'medium':
        return 'risk-medium'
      case 'low':
        return 'risk-low'
      default:
        return 'risk-low'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit'
    })
  }

  const exportSummary = () => {
    const data = {
      courseId,
      progressData,
      timestamp: new Date().toISOString(),
      generatedBy: 'Executive Dashboard'
    }
    console.log('Exporting progress summary:', data)
  }

  return (
    <div className="progress-summary-container">
      <div className="summary-header">
        <div className="header-left">
          <h1 className="page-title">进度总结与里程碑</h1>
          <p className="course-info">实验轮转课程 ID: {courseId}</p>
        </div>
        <div className="header-actions">
          <div className="view-selector">
            <button 
              className={`view-button ${selectedView === 'timeline' ? 'active' : ''}`}
              onClick={() => setSelectedView('timeline')}
            >
              时间轴视图
            </button>
            <button 
              className={`view-button ${selectedView === 'analytics' ? 'active' : ''}`}
              onClick={() => setSelectedView('analytics')}
            >
              分析视图
            </button>
          </div>
          <button onClick={exportSummary} className="export-button">
            导出摘要
          </button>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="overall-progress-section">
        <h2 className="section-title">整体进度概览</h2>
        <div className="progress-overview">
          <div className="progress-circle">
            <div className="circle-progress">
              <svg viewBox="0 0 120 120" className="progress-ring">
                <circle 
                  cx="60" 
                  cy="60" 
                  r="50"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="8"
                />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="50"
                  fill="none"
                  stroke="#FF6F00"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - progressData.overallProgress.percentage / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="progress-text">
                <span className="progress-percentage">{progressData.overallProgress.percentage}%</span>
              </div>
            </div>
          </div>
          <div className="progress-details">
            <div className="detail-item">
              <span className="detail-label">当前阶段</span>
              <span className="detail-value">{progressData.overallProgress.phase}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">剩余天数</span>
              <span className="detail-value">{progressData.overallProgress.remainingDays} 天</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">总体时长</span>
              <span className="detail-value">{progressData.overallProgress.totalDays} 天</span>
            </div>
          </div>
        </div>
      </div>

      {selectedView === 'timeline' && (
        <>
          {/* Phase Progress */}
          <div className="phases-section">
            <h2 className="section-title">阶段进展</h2>
            <div className="phases-timeline">
              {progressData.phases.map((phase, index) => (
                <div key={phase.id} className={`phase-item ${getStatusClass(phase.status)}`}>
                  <div className="phase-indicator">
                    <span className="phase-number">{phase.id}</span>
                    <span className="phase-status-icon">{getStatusIcon(phase.status)}</span>
                  </div>
                  <div className="phase-content">
                    <div className="phase-header">
                      <h3 className="phase-name">{phase.name}</h3>
                      <span className="phase-dates">
                        {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
                      </span>
                    </div>
                    <p className="phase-description">{phase.description}</p>
                    <div className="phase-progress-bar">
                      <div 
                        className="phase-progress-fill" 
                        style={{width: `${phase.progress}%`}}
                      ></div>
                    </div>
                    <span className="phase-progress-text">{phase.progress}% 完成</span>
                  </div>
                  {index < progressData.phases.length - 1 && (
                    <div className="phase-connector"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="milestones-section">
            <h2 className="section-title">关键里程碑</h2>
            <div className="milestones-grid">
              {progressData.milestones.map((milestone) => (
                <div 
                  key={milestone.id} 
                  className={`milestone-card ${getStatusClass(milestone.status)} ${milestone.critical ? 'critical' : ''}`}
                >
                  <div className="milestone-header">
                    <span className="milestone-icon">{getStatusIcon(milestone.status)}</span>
                    <div className="milestone-info">
                      <h3 className="milestone-name">{milestone.name}</h3>
                      <span className="milestone-date">{formatDate(milestone.date)}</span>
                    </div>
                    {milestone.critical && (
                      <span className="critical-badge">关键</span>
                    )}
                  </div>
                  <p className="milestone-description">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedView === 'analytics' && (
        <>
          {/* Risk Assessment */}
          <div className="risk-section">
            <h2 className="section-title">风险评估</h2>
            <div className="risk-filter">
              <label>风险等级筛选：</label>
              <select 
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="filter-select"
              >
                <option value="all">全部</option>
                <option value="high">高风险</option>
                <option value="medium">中风险</option>
                <option value="low">低风险</option>
              </select>
            </div>
            <div className="risk-list">
              {progressData.riskAssessment
                .filter(risk => filterLevel === 'all' || risk.level === filterLevel)
                .map((risk) => (
                <div key={risk.id} className={`risk-item ${getRiskLevelClass(risk.level)}`}>
                  <div className="risk-header">
                    <span className="risk-type">{risk.type === 'timeline' ? '进度' : risk.type === 'resource' ? '资源' : '质量'}</span>
                    <span className="risk-level">{risk.level === 'high' ? '高风险' : risk.level === 'medium' ? '中风险' : '低风险'}</span>
                  </div>
                  <div className="risk-content">
                    <p className="risk-description">{risk.description}</p>
                    <p className="risk-impact">影响: {risk.impact}</p>
                    <p className="risk-mitigation">应对措施: {risk.mitigation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Predictive Analytics */}
          <div className="predictions-section">
            <h2 className="section-title">预测分析</h2>
            <div className="predictions-grid">
              <div className="prediction-card">
                <h3 className="prediction-title">按时完成预测</h3>
                <div className="prediction-value">{progressData.predictions.onTimeCompletion}%</div>
                <div className="prediction-indicator positive">
                  <span>预计按时完成</span>
                </div>
              </div>
              <div className="prediction-card">
                <h3 className="prediction-title">质量评分预测</h3>
                <div className="prediction-value">{progressData.predictions.qualityScore}</div>
                <div className="prediction-indicator positive">
                  <span>质量预期良好</span>
                </div>
              </div>
              <div className="prediction-card">
                <h3 className="prediction-title">总体风险水平</h3>
                <div className="prediction-value">{progressData.predictions.riskLevel === 'low' ? '低' : progressData.predictions.riskLevel === 'medium' ? '中' : '高'}</div>
                <div className={`prediction-indicator ${progressData.predictions.riskLevel === 'low' ? 'positive' : 'neutral'}`}>
                  <span>风险可控</span>
                </div>
              </div>
            </div>
            <div className="recommendations">
              <h3 className="recommendations-title">建议措施</h3>
              <ul className="recommendations-list">
                {progressData.predictions.recommendedActions.map((action, index) => (
                  <li key={index} className="recommendation-item">{action}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      {/* Executive Summary */}
      <div className="executive-summary">
        <h2 className="section-title">执行摘要</h2>
        <div className="summary-content">
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-value">4/5</span>
              <span className="stat-label">里程碑已完成</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">68%</span>
              <span className="stat-label">当前阶段进度</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">3</span>
              <span className="stat-label">需关注项目</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">94%</span>
              <span className="stat-label">预期按时完成率</span>
            </div>
          </div>
          <div className="summary-text">
            <p>
              课程整体进展良好，目前处于项目执行阶段，进度达到72.5%。
              所有关键里程碑均按计划完成，预计94%的项目能够按时完成。
              需要关注3个轻微延迟的项目，已安排额外指导支持。
              建议加强答辩准备和设备使用协调。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressSummary