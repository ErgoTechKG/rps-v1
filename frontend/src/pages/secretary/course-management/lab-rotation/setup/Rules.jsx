import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './Rules.css'

const Rules = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  
  const [eligibilityCriteria, setEligibilityCriteria] = useState({
    minGPA: '',
    requiredCourses: [''],
    yearLevel: '',
    major: '',
    prerequisites: '',
    languageRequirement: false,
    interviewRequired: true
  })

  const [applicationLimits, setApplicationLimits] = useState({
    maxApplications: '3',
    allowPreferenceOrder: true,
    backupSelections: '2',
    applicationDeadlineExtension: false,
    lateApplicationPolicy: 'none'
  })

  const [matchingAlgorithm, setMatchingAlgorithm] = useState({
    algorithm: 'preference-based',
    priorityFactors: ['gpa', 'interview', 'preference'],
    balanceMode: 'equal',
    manualOverride: true,
    conflictResolution: 'professor-priority'
  })

  const [gradingSystem, setGradingSystem] = useState({
    scale: 'percentage',
    passingGrade: '60',
    components: [
      { name: '课堂参与', weight: 20, required: true },
      { name: '作业完成', weight: 30, required: true },
      { name: '期中报告', weight: 25, required: true },
      { name: '最终答辩', weight: 25, required: true }
    ],
    extraCredit: false,
    retakePolicy: 'once'
  })

  const [approvalWorkflow, setApprovalWorkflow] = useState({
    steps: [
      { name: '学生申请', role: 'student', auto: false },
      { name: '教授审核', role: 'professor', auto: false },
      { name: '系统匹配', role: 'system', auto: true },
      { name: '结果确认', role: 'secretary', auto: false }
    ],
    escalationPolicy: 'supervisor',
    timeoutHandling: 'auto-reject',
    appealProcess: true
  })

  const [communicationPolicies, setCommunicationPolicies] = useState({
    templates: [
      { name: '申请确认', active: true, autoSend: true },
      { name: '面试通知', active: true, autoSend: true },
      { name: '结果通知', active: true, autoSend: false },
      { name: '进度提醒', active: false, autoSend: true }
    ],
    channels: ['email', 'system'],
    escalationRules: {
      noResponse: '3',
      urgentIssues: '1'
    }
  })

  const [dataRetention, setDataRetention] = useState({
    applicationData: '5',
    gradeRecords: 'permanent',
    communicationLogs: '3',
    analyticsData: '2',
    backupFrequency: 'daily',
    archivePolicy: 'compress'
  })

  const handleComponentChange = (componentIndex, field, value) => {
    setGradingSystem(prev => ({
      ...prev,
      components: prev.components.map((comp, index) =>
        index === componentIndex
          ? { ...comp, [field]: value }
          : comp
      )
    }))
  }

  const addGradingComponent = () => {
    setGradingSystem(prev => ({
      ...prev,
      components: [...prev.components, { name: '', weight: 0, required: false }]
    }))
  }

  const removeGradingComponent = (index) => {
    setGradingSystem(prev => ({
      ...prev,
      components: prev.components.filter((_, i) => i !== index)
    }))
  }

  const handleTemplateChange = (templateIndex, field, value) => {
    setCommunicationPolicies(prev => ({
      ...prev,
      templates: prev.templates.map((template, index) =>
        index === templateIndex
          ? { ...template, [field]: value }
          : template
      )
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const rulesData = {
      eligibilityCriteria,
      applicationLimits,
      matchingAlgorithm,
      gradingSystem,
      approvalWorkflow,
      communicationPolicies,
      dataRetention
    }
    
    console.log('Saving rules and policies:', rulesData)
    navigate(`/secretary/course-management/lab-rotation/${courseId}/setup/resources`)
  }

  const handleBack = () => {
    navigate(`/secretary/course-management/lab-rotation/${courseId}/setup/timeline`)
  }

  const handleSaveDraft = () => {
    console.log('Saving rules draft')
  }

  return (
    <Layout>
      <div className="rules-container">
        <div className="setup-header">
          <h1 className="page-title">规则与政策配置</h1>
          <div className="setup-progress">
            <div className="progress-step completed">基本信息</div>
            <div className="progress-step completed">时间安排</div>
            <div className="progress-step active">规则政策</div>
            <div className="progress-step">资源管理</div>
          </div>
        </div>

        <div className="setup-content">
          <div className="setup-card">
            <div className="card-header">
              <h2 className="card-title">规则与政策设置</h2>
              <div className="card-actions">
                <button type="button" className="action-button secondary" onClick={handleSaveDraft}>
                  保存草稿
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="setup-form">
              {/* 学生资格标准 */}
              <div className="form-section">
                <h3 className="section-title">学生资格标准</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">最低GPA要求</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="4"
                      value={eligibilityCriteria.minGPA}
                      onChange={(e) => setEligibilityCriteria(prev => ({
                        ...prev,
                        minGPA: e.target.value
                      }))}
                      className="form-input"
                      placeholder="如：3.0"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">年级要求</label>
                    <select
                      value={eligibilityCriteria.yearLevel}
                      onChange={(e) => setEligibilityCriteria(prev => ({
                        ...prev,
                        yearLevel: e.target.value
                      }))}
                      className="form-select"
                    >
                      <option value="">不限制</option>
                      <option value="freshman">大一</option>
                      <option value="sophomore">大二</option>
                      <option value="junior">大三</option>
                      <option value="senior">大四</option>
                      <option value="graduate">研究生</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">专业要求</label>
                    <input
                      type="text"
                      value={eligibilityCriteria.major}
                      onChange={(e) => setEligibilityCriteria(prev => ({
                        ...prev,
                        major: e.target.value
                      }))}
                      className="form-input"
                      placeholder="如：计算机科学"
                    />
                  </div>

                  <div className="form-group span-full">
                    <label className="form-label">先修课程要求</label>
                    <textarea
                      value={eligibilityCriteria.prerequisites}
                      onChange={(e) => setEligibilityCriteria(prev => ({
                        ...prev,
                        prerequisites: e.target.value
                      }))}
                      className="form-textarea"
                      placeholder="列出必需的先修课程"
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={eligibilityCriteria.languageRequirement}
                        onChange={(e) => setEligibilityCriteria(prev => ({
                          ...prev,
                          languageRequirement: e.target.checked
                        }))}
                      />
                      英语语言要求
                    </label>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={eligibilityCriteria.interviewRequired}
                        onChange={(e) => setEligibilityCriteria(prev => ({
                          ...prev,
                          interviewRequired: e.target.checked
                        }))}
                      />
                      需要面试
                    </label>
                  </div>
                </div>
              </div>

              {/* 申请限制 */}
              <div className="form-section">
                <h3 className="section-title">申请限制</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">最大申请数量</label>
                    <select
                      value={applicationLimits.maxApplications}
                      onChange={(e) => setApplicationLimits(prev => ({
                        ...prev,
                        maxApplications: e.target.value
                      }))}
                      className="form-select"
                    >
                      <option value="1">1个</option>
                      <option value="3">3个</option>
                      <option value="5">5个</option>
                      <option value="unlimited">无限制</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">备选志愿数量</label>
                    <select
                      value={applicationLimits.backupSelections}
                      onChange={(e) => setApplicationLimits(prev => ({
                        ...prev,
                        backupSelections: e.target.value
                      }))}
                      className="form-select"
                    >
                      <option value="0">不允许</option>
                      <option value="1">1个</option>
                      <option value="2">2个</option>
                      <option value="3">3个</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={applicationLimits.allowPreferenceOrder}
                        onChange={(e) => setApplicationLimits(prev => ({
                          ...prev,
                          allowPreferenceOrder: e.target.checked
                        }))}
                      />
                      允许排序志愿
                    </label>
                  </div>

                  <div className="form-group">
                    <label className="form-label">迟交申请政策</label>
                    <select
                      value={applicationLimits.lateApplicationPolicy}
                      onChange={(e) => setApplicationLimits(prev => ({
                        ...prev,
                        lateApplicationPolicy: e.target.value
                      }))}
                      className="form-select"
                    >
                      <option value="none">不接受</option>
                      <option value="penalty">扣分接受</option>
                      <option value="case-by-case">个案处理</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 匹配算法 */}
              <div className="form-section">
                <h3 className="section-title">匹配算法配置</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">算法类型</label>
                    <select
                      value={matchingAlgorithm.algorithm}
                      onChange={(e) => setMatchingAlgorithm(prev => ({
                        ...prev,
                        algorithm: e.target.value
                      }))}
                      className="form-select"
                    >
                      <option value="preference-based">志愿优先</option>
                      <option value="score-based">分数优先</option>
                      <option value="balanced">综合平衡</option>
                      <option value="random">随机分配</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">冲突解决方式</label>
                    <select
                      value={matchingAlgorithm.conflictResolution}
                      onChange={(e) => setMatchingAlgorithm(prev => ({
                        ...prev,
                        conflictResolution: e.target.value
                      }))}
                      className="form-select"
                    >
                      <option value="professor-priority">教授优先</option>
                      <option value="student-priority">学生优先</option>
                      <option value="manual-review">人工审核</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={matchingAlgorithm.manualOverride}
                        onChange={(e) => setMatchingAlgorithm(prev => ({
                          ...prev,
                          manualOverride: e.target.checked
                        }))}
                      />
                      允许人工调整
                    </label>
                  </div>
                </div>
              </div>

              {/* 评分系统 */}
              <div className="form-section">
                <h3 className="section-title">评分系统</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">评分标准</label>
                    <select
                      value={gradingSystem.scale}
                      onChange={(e) => setGradingSystem(prev => ({
                        ...prev,
                        scale: e.target.value
                      }))}
                      className="form-select"
                    >
                      <option value="percentage">百分制</option>
                      <option value="letter">字母等级</option>
                      <option value="gpa">GPA</option>
                      <option value="pass-fail">通过/不通过</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">及格线</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={gradingSystem.passingGrade}
                      onChange={(e) => setGradingSystem(prev => ({
                        ...prev,
                        passingGrade: e.target.value
                      }))}
                      className="form-input"
                      placeholder="60"
                    />
                  </div>
                </div>

                <div className="grading-components">
                  <div className="components-header">
                    <h4 className="components-title">评分组成</h4>
                    <button
                      type="button"
                      className="add-component-btn"
                      onClick={addGradingComponent}
                    >
                      + 添加评分项
                    </button>
                  </div>

                  <div className="components-list">
                    {gradingSystem.components.map((component, index) => (
                      <div key={index} className="component-item">
                        <input
                          type="text"
                          value={component.name}
                          onChange={(e) => handleComponentChange(index, 'name', e.target.value)}
                          className="form-input component-name"
                          placeholder="评分项名称"
                        />
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={component.weight}
                          onChange={(e) => handleComponentChange(index, 'weight', parseInt(e.target.value))}
                          className="form-input component-weight"
                          placeholder="权重%"
                        />
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={component.required}
                            onChange={(e) => handleComponentChange(index, 'required', e.target.checked)}
                          />
                          必需
                        </label>
                        <button
                          type="button"
                          className="remove-component-btn"
                          onClick={() => removeGradingComponent(index)}
                        >
                          删除
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 通信政策 */}
              <div className="form-section">
                <h3 className="section-title">通信政策</h3>
                <div className="templates-section">
                  <h4 className="templates-title">通知模板设置</h4>
                  <div className="templates-list">
                    {communicationPolicies.templates.map((template, index) => (
                      <div key={index} className="template-item">
                        <span className="template-name">{template.name}</span>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={template.active}
                            onChange={(e) => handleTemplateChange(index, 'active', e.target.checked)}
                          />
                          启用
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={template.autoSend}
                            onChange={(e) => handleTemplateChange(index, 'autoSend', e.target.checked)}
                          />
                          自动发送
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="action-button secondary"
                  onClick={handleBack}
                >
                  上一步：时间安排
                </button>
                <button type="submit" className="action-button primary">
                  下一步：资源管理
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Rules