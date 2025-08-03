import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './TopicPublish.css'

const TopicPublish = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    title: '',
    summary: '',
    keywords: '',
    researchArea: '',
    
    // Step 2: Detailed Description
    background: '',
    objectives: '',
    methodology: '',
    expectedOutcomes: '',
    
    // Step 3: Student Requirements
    academicPrerequisites: '',
    requiredSkills: '',
    timeCommitment: '',
    gpaRequirement: '',
    majorRequirements: [],
    
    // Step 4: Resources & Logistics
    labFacilities: '',
    equipment: '',
    materials: '',
    budget: '',
    studentSlots: 1,
    
    // Step 5: Timeline & Milestones
    projectPhases: [],
    deliverables: [],
    deadline: '',
    startDate: '',
    
    // Files
    supportingFiles: []
  })

  const steps = [
    { number: 1, title: '基本信息', icon: '📝' },
    { number: 2, title: '详细描述', icon: '📋' },
    { number: 3, title: '学生要求', icon: '👥' },
    { number: 4, title: '资源与物流', icon: '🔧' },
    { number: 5, title: '时间线与里程碑', icon: '📅' },
    { number: 6, title: '预览与发布', icon: '✅' }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSaveDraft = () => {
    const topics = JSON.parse(localStorage.getItem(`topics_${courseId}`) || '[]')
    const newTopic = {
      ...formData,
      id: Date.now().toString(),
      status: 'draft',
      createdAt: new Date().toISOString(),
      applications: 0
    }
    topics.push(newTopic)
    localStorage.setItem(`topics_${courseId}`, JSON.stringify(topics))
    navigate(`/professor/courses/lab-rotation/${courseId}/topic-management`)
  }

  const handlePublish = () => {
    const topics = JSON.parse(localStorage.getItem(`topics_${courseId}`) || '[]')
    const newTopic = {
      ...formData,
      id: Date.now().toString(),
      status: 'published',
      createdAt: new Date().toISOString(),
      applications: 0
    }
    topics.push(newTopic)
    localStorage.setItem(`topics_${courseId}`, JSON.stringify(topics))
    navigate(`/professor/courses/lab-rotation/${courseId}/topic-management`)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>基本信息</h2>
            <div className="form-group">
              <label>课题标题 *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="请输入课题标题"
              />
            </div>
            <div className="form-group">
              <label>简介 *</label>
              <textarea
                value={formData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                placeholder="请简要介绍课题内容（100-200字）"
                rows={4}
              />
            </div>
            <div className="form-group">
              <label>关键词</label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                placeholder="请输入关键词，用逗号分隔"
              />
            </div>
            <div className="form-group">
              <label>研究领域 *</label>
              <select
                value={formData.researchArea}
                onChange={(e) => handleInputChange('researchArea', e.target.value)}
              >
                <option value="">请选择研究领域</option>
                <option value="ai">人工智能</option>
                <option value="biology">生物学</option>
                <option value="chemistry">化学</option>
                <option value="physics">物理学</option>
                <option value="engineering">工程学</option>
                <option value="medicine">医学</option>
                <option value="other">其他</option>
              </select>
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="step-content">
            <h2>详细描述</h2>
            <div className="form-group">
              <label>研究背景</label>
              <textarea
                value={formData.background}
                onChange={(e) => handleInputChange('background', e.target.value)}
                placeholder="请描述研究背景和意义"
                rows={5}
              />
            </div>
            <div className="form-group">
              <label>研究目标 *</label>
              <textarea
                value={formData.objectives}
                onChange={(e) => handleInputChange('objectives', e.target.value)}
                placeholder="请列出具体的研究目标"
                rows={5}
              />
            </div>
            <div className="form-group">
              <label>研究方法</label>
              <textarea
                value={formData.methodology}
                onChange={(e) => handleInputChange('methodology', e.target.value)}
                placeholder="请描述将采用的研究方法"
                rows={5}
              />
            </div>
            <div className="form-group">
              <label>预期成果</label>
              <textarea
                value={formData.expectedOutcomes}
                onChange={(e) => handleInputChange('expectedOutcomes', e.target.value)}
                placeholder="请描述预期的研究成果"
                rows={5}
              />
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="step-content">
            <h2>学生要求</h2>
            <div className="form-group">
              <label>学术先修要求</label>
              <textarea
                value={formData.academicPrerequisites}
                onChange={(e) => handleInputChange('academicPrerequisites', e.target.value)}
                placeholder="请列出需要先修的课程或知识"
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>所需技能</label>
              <textarea
                value={formData.requiredSkills}
                onChange={(e) => handleInputChange('requiredSkills', e.target.value)}
                placeholder="请列出学生需要具备的技能"
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>时间投入要求</label>
              <input
                type="text"
                value={formData.timeCommitment}
                onChange={(e) => handleInputChange('timeCommitment', e.target.value)}
                placeholder="例如：每周20小时"
              />
            </div>
            <div className="form-group">
              <label>GPA要求</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="4"
                value={formData.gpaRequirement}
                onChange={(e) => handleInputChange('gpaRequirement', e.target.value)}
                placeholder="最低GPA要求"
              />
            </div>
            <div className="form-group">
              <label>专业要求</label>
              <div className="checkbox-group">
                {['计算机科学', '电子工程', '生物学', '化学', '物理学', '数学'].map(major => (
                  <label key={major} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.majorRequirements.includes(major)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleInputChange('majorRequirements', [...formData.majorRequirements, major])
                        } else {
                          handleInputChange('majorRequirements', formData.majorRequirements.filter(m => m !== major))
                        }
                      }}
                    />
                    {major}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )
      
      case 4:
        return (
          <div className="step-content">
            <h2>资源与物流</h2>
            <div className="form-group">
              <label>实验室设施</label>
              <textarea
                value={formData.labFacilities}
                onChange={(e) => handleInputChange('labFacilities', e.target.value)}
                placeholder="请描述可用的实验室设施"
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>设备</label>
              <textarea
                value={formData.equipment}
                onChange={(e) => handleInputChange('equipment', e.target.value)}
                placeholder="请列出将使用的设备"
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>材料</label>
              <textarea
                value={formData.materials}
                onChange={(e) => handleInputChange('materials', e.target.value)}
                placeholder="请列出需要的材料"
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>预算</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                placeholder="请输入预算金额"
              />
            </div>
            <div className="form-group">
              <label>招收学生人数 *</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.studentSlots}
                onChange={(e) => handleInputChange('studentSlots', parseInt(e.target.value) || 1)}
              />
            </div>
          </div>
        )
      
      case 5:
        return (
          <div className="step-content">
            <h2>时间线与里程碑</h2>
            <div className="form-group">
              <label>项目开始日期 *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>申请截止日期 *</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>项目阶段</label>
              <div className="milestone-list">
                <div className="milestone-item">
                  <span className="milestone-phase">第1阶段：文献调研（2周）</span>
                </div>
                <div className="milestone-item">
                  <span className="milestone-phase">第2阶段：实验设计（1周）</span>
                </div>
                <div className="milestone-item">
                  <span className="milestone-phase">第3阶段：实验实施（4周）</span>
                </div>
                <div className="milestone-item">
                  <span className="milestone-phase">第4阶段：数据分析（2周）</span>
                </div>
                <div className="milestone-item">
                  <span className="milestone-phase">第5阶段：报告撰写（1周）</span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>交付成果</label>
              <div className="deliverable-list">
                <div className="deliverable-item">
                  <input type="checkbox" defaultChecked /> 文献综述报告
                </div>
                <div className="deliverable-item">
                  <input type="checkbox" defaultChecked /> 实验数据集
                </div>
                <div className="deliverable-item">
                  <input type="checkbox" defaultChecked /> 项目最终报告
                </div>
                <div className="deliverable-item">
                  <input type="checkbox" /> 学术论文初稿
                </div>
              </div>
            </div>
          </div>
        )
      
      case 6:
        return (
          <div className="step-content">
            <h2>预览与发布</h2>
            <div className="preview-container">
              <div className="preview-section">
                <h3>基本信息</h3>
                <p><strong>标题：</strong>{formData.title || '未填写'}</p>
                <p><strong>研究领域：</strong>{formData.researchArea || '未选择'}</p>
                <p><strong>简介：</strong>{formData.summary || '未填写'}</p>
                <p><strong>关键词：</strong>{formData.keywords || '未填写'}</p>
              </div>
              
              <div className="preview-section">
                <h3>研究内容</h3>
                <p><strong>研究目标：</strong>{formData.objectives || '未填写'}</p>
                <p><strong>研究方法：</strong>{formData.methodology || '未填写'}</p>
              </div>
              
              <div className="preview-section">
                <h3>招生信息</h3>
                <p><strong>招收人数：</strong>{formData.studentSlots}人</p>
                <p><strong>申请截止：</strong>{formData.deadline || '未设置'}</p>
                <p><strong>项目开始：</strong>{formData.startDate || '未设置'}</p>
                <p><strong>时间要求：</strong>{formData.timeCommitment || '未填写'}</p>
              </div>
            </div>
            
            <div className="publish-actions">
              <button className="btn-secondary" onClick={handleSaveDraft}>
                保存为草稿
              </button>
              <button className="btn-primary" onClick={handlePublish}>
                立即发布
              </button>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="topic-publish-container">
      <div className="wizard-header">
        <h1>创建新课题</h1>
        <button className="btn-text" onClick={() => navigate(-1)}>
          返回
        </button>
      </div>

      <div className="wizard-progress">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`progress-step ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
            onClick={() => setCurrentStep(step.number)}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-info">
              <span className="step-number">步骤 {step.number}</span>
              <span className="step-title">{step.title}</span>
            </div>
            {index < steps.length - 1 && <div className="step-connector" />}
          </div>
        ))}
      </div>

      <div className="wizard-content">
        {renderStepContent()}
      </div>

      <div className="wizard-navigation">
        <button
          className="btn-secondary"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          上一步
        </button>
        <div className="step-indicator">
          {currentStep} / {steps.length}
        </div>
        {currentStep < 6 ? (
          <button
            className="btn-primary"
            onClick={handleNext}
          >
            下一步
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default TopicPublish