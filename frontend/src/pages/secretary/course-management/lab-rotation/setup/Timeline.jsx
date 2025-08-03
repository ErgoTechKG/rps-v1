import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './Timeline.css'

const Timeline = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  
  const [phases, setPhases] = useState([
    {
      id: 1,
      name: '申请阶段',
      startDate: '',
      endDate: '',
      description: '学生提交申请和选择志愿',
      milestones: [
        { name: '申请开始', date: '', notification: true },
        { name: '申请截止', date: '', notification: true }
      ]
    },
    {
      id: 2,
      name: '面试阶段',
      startDate: '',
      endDate: '',
      description: '教授面试学生',
      milestones: [
        { name: '面试安排发布', date: '', notification: true },
        { name: '面试结束', date: '', notification: false }
      ]
    },
    {
      id: 3,
      name: '选择确认阶段',
      startDate: '',
      endDate: '',
      description: '双方确认选择结果',
      milestones: [
        { name: '结果发布', date: '', notification: true },
        { name: '确认截止', date: '', notification: true }
      ]
    },
    {
      id: 4,
      name: '学习阶段',
      startDate: '',
      endDate: '',
      description: '实际学习和研究过程',
      milestones: [
        { name: '开始学习', date: '', notification: true },
        { name: '中期检查', date: '', notification: true },
        { name: '最终答辩', date: '', notification: true }
      ]
    }
  ])

  const [globalSettings, setGlobalSettings] = useState({
    autoTransition: true,
    notificationLeadTime: '3', // days
    exceptionHandling: 'manual',
    calendarIntegration: false
  })

  const [errors, setErrors] = useState({})

  const handlePhaseChange = (phaseId, field, value) => {
    setPhases(prev => prev.map(phase => 
      phase.id === phaseId 
        ? { ...phase, [field]: value }
        : phase
    ))
    
    // Clear related errors
    const errorKey = `phase_${phaseId}_${field}`
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }))
    }
  }

  const handleMilestoneChange = (phaseId, milestoneIndex, field, value) => {
    setPhases(prev => prev.map(phase => 
      phase.id === phaseId 
        ? {
            ...phase,
            milestones: phase.milestones.map((milestone, index) =>
              index === milestoneIndex
                ? { ...milestone, [field]: value }
                : milestone
            )
          }
        : phase
    ))
  }

  const addMilestone = (phaseId) => {
    setPhases(prev => prev.map(phase => 
      phase.id === phaseId 
        ? {
            ...phase,
            milestones: [...phase.milestones, { name: '', date: '', notification: false }]
          }
        : phase
    ))
  }

  const removeMilestone = (phaseId, milestoneIndex) => {
    setPhases(prev => prev.map(phase => 
      phase.id === phaseId 
        ? {
            ...phase,
            milestones: phase.milestones.filter((_, index) => index !== milestoneIndex)
          }
        : phase
    ))
  }

  const validateTimeline = () => {
    const newErrors = {}
    
    // Validate each phase
    phases.forEach(phase => {
      if (!phase.startDate) {
        newErrors[`phase_${phase.id}_startDate`] = '请设置开始日期'
      }
      if (!phase.endDate) {
        newErrors[`phase_${phase.id}_endDate`] = '请设置结束日期'
      }
      if (phase.startDate && phase.endDate && new Date(phase.startDate) >= new Date(phase.endDate)) {
        newErrors[`phase_${phase.id}_endDate`] = '结束日期必须晚于开始日期'
      }
    })
    
    // Validate phase sequence
    for (let i = 0; i < phases.length - 1; i++) {
      const currentPhase = phases[i]
      const nextPhase = phases[i + 1]
      
      if (currentPhase.endDate && nextPhase.startDate) {
        if (new Date(currentPhase.endDate) > new Date(nextPhase.startDate)) {
          newErrors[`phase_${nextPhase.id}_startDate`] = '下一阶段开始时间不能早于上一阶段结束时间'
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateTimeline()) {
      console.log('Saving timeline configuration:', { phases, globalSettings })
      navigate(`/secretary/course-management/lab-rotation/${courseId}/setup/rules`)
    }
  }

  const handleBack = () => {
    navigate(`/secretary/course-management/lab-rotation/${courseId}/setup/basic-info`)
  }

  const handleSaveDraft = () => {
    console.log('Saving timeline draft:', { phases, globalSettings })
  }

  return (
    <Layout>
      <div className="timeline-container">
        <div className="setup-header">
          <h1 className="page-title">时间安排配置</h1>
          <div className="setup-progress">
            <div className="progress-step completed">基本信息</div>
            <div className="progress-step active">时间安排</div>
            <div className="progress-step">规则政策</div>
            <div className="progress-step">资源管理</div>
          </div>
        </div>

        <div className="setup-content">
          <div className="setup-card">
            <div className="card-header">
              <h2 className="card-title">课程时间线配置</h2>
              <div className="card-actions">
                <button type="button" className="action-button secondary" onClick={handleSaveDraft}>
                  保存草稿
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="setup-form">
              <div className="form-section">
                <h3 className="section-title">阶段设置</h3>
                
                {phases.map((phase, index) => (
                  <div key={phase.id} className="phase-card">
                    <div className="phase-header">
                      <h4 className="phase-title">
                        阶段 {index + 1}: {phase.name}
                      </h4>
                      <div className="phase-number">{index + 1}</div>
                    </div>
                    
                    <div className="phase-content">
                      <div className="form-group">
                        <label className="form-label">阶段名称</label>
                        <input
                          type="text"
                          value={phase.name}
                          onChange={(e) => handlePhaseChange(phase.id, 'name', e.target.value)}
                          className="form-input"
                          placeholder="输入阶段名称"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">阶段描述</label>
                        <textarea
                          value={phase.description}
                          onChange={(e) => handlePhaseChange(phase.id, 'description', e.target.value)}
                          className="form-textarea"
                          placeholder="描述该阶段的主要活动"
                          rows="2"
                        />
                      </div>
                      
                      <div className="date-range">
                        <div className="form-group">
                          <label className="form-label">
                            开始日期 <span className="required">*</span>
                          </label>
                          <input
                            type="date"
                            value={phase.startDate}
                            onChange={(e) => handlePhaseChange(phase.id, 'startDate', e.target.value)}
                            className={`form-input ${errors[`phase_${phase.id}_startDate`] ? 'error' : ''}`}
                          />
                          {errors[`phase_${phase.id}_startDate`] && (
                            <span className="error-message">{errors[`phase_${phase.id}_startDate`]}</span>
                          )}
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">
                            结束日期 <span className="required">*</span>
                          </label>
                          <input
                            type="date"
                            value={phase.endDate}
                            onChange={(e) => handlePhaseChange(phase.id, 'endDate', e.target.value)}
                            className={`form-input ${errors[`phase_${phase.id}_endDate`] ? 'error' : ''}`}
                          />
                          {errors[`phase_${phase.id}_endDate`] && (
                            <span className="error-message">{errors[`phase_${phase.id}_endDate`]}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="milestones-section">
                        <div className="milestones-header">
                          <h5 className="milestones-title">里程碑事件</h5>
                          <button
                            type="button"
                            className="add-milestone-btn"
                            onClick={() => addMilestone(phase.id)}
                          >
                            + 添加里程碑
                          </button>
                        </div>
                        
                        <div className="milestones-list">
                          {phase.milestones.map((milestone, milestoneIndex) => (
                            <div key={milestoneIndex} className="milestone-item">
                              <div className="milestone-fields">
                                <input
                                  type="text"
                                  value={milestone.name}
                                  onChange={(e) => handleMilestoneChange(phase.id, milestoneIndex, 'name', e.target.value)}
                                  className="form-input milestone-name"
                                  placeholder="里程碑名称"
                                />
                                <input
                                  type="date"
                                  value={milestone.date}
                                  onChange={(e) => handleMilestoneChange(phase.id, milestoneIndex, 'date', e.target.value)}
                                  className="form-input milestone-date"
                                />
                                <label className="checkbox-label">
                                  <input
                                    type="checkbox"
                                    checked={milestone.notification}
                                    onChange={(e) => handleMilestoneChange(phase.id, milestoneIndex, 'notification', e.target.checked)}
                                  />
                                  通知提醒
                                </label>
                              </div>
                              <button
                                type="button"
                                className="remove-milestone-btn"
                                onClick={() => removeMilestone(phase.id, milestoneIndex)}
                              >
                                删除
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-section">
                <h3 className="section-title">全局设置</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={globalSettings.autoTransition}
                        onChange={(e) => setGlobalSettings(prev => ({
                          ...prev,
                          autoTransition: e.target.checked
                        }))}
                      />
                      自动阶段转换
                    </label>
                  </div>

                  <div className="form-group">
                    <label className="form-label">通知提前时间（天）</label>
                    <select
                      value={globalSettings.notificationLeadTime}
                      onChange={(e) => setGlobalSettings(prev => ({
                        ...prev,
                        notificationLeadTime: e.target.value
                      }))}
                      className="form-select"
                    >
                      <option value="1">1天</option>
                      <option value="3">3天</option>
                      <option value="7">7天</option>
                      <option value="14">14天</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">异常处理方式</label>
                    <select
                      value={globalSettings.exceptionHandling}
                      onChange={(e) => setGlobalSettings(prev => ({
                        ...prev,
                        exceptionHandling: e.target.value
                      }))}
                      className="form-select"
                    >
                      <option value="manual">手动处理</option>
                      <option value="auto">自动处理</option>
                      <option value="notify">通知后处理</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={globalSettings.calendarIntegration}
                        onChange={(e) => setGlobalSettings(prev => ({
                          ...prev,
                          calendarIntegration: e.target.checked
                        }))}
                      />
                      集成学术日历
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="action-button secondary"
                  onClick={handleBack}
                >
                  上一步：基本信息
                </button>
                <button type="submit" className="action-button primary">
                  下一步：规则政策
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Timeline