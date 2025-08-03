import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ApplicationForm.css'

const ApplicationForm = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [topicInfo, setTopicInfo] = useState(null)
  const [formData, setFormData] = useState({
    // Basic Information
    personalStatement: '',
    researchBackground: '',
    relevantCourses: [],
    skills: [],
    experience: '',
    
    // Academic Information
    gpa: '',
    transcriptFile: null,
    cvFile: null,
    portfolioFile: null,
    
    // Availability
    weeklyHours: '20',
    startDate: '',
    endDate: '',
    scheduleConflicts: '',
    
    // Additional
    whyInterested: '',
    expectedOutcome: '',
    questions: ''
  })
  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Get topic ID from URL query params
    const urlParams = new URLSearchParams(window.location.search)
    const topicId = urlParams.get('topicId')
    
    if (topicId) {
      // Load topic information
      loadTopicInfo(topicId)
    }
    
    // Load draft if exists
    loadDraft()
  }, [courseId])

  const loadTopicInfo = (topicId) => {
    // Mock loading topic info
    const topics = JSON.parse(localStorage.getItem(`topics_CS1001`) || '[]')
    const topic = topics.find(t => t.id === topicId)
    if (topic) {
      setTopicInfo(topic)
    }
  }

  const loadDraft = () => {
    const draft = localStorage.getItem(`application_draft_${courseId}`)
    if (draft) {
      setFormData(JSON.parse(draft))
    }
  }

  const saveDraft = () => {
    setIsSaving(true)
    localStorage.setItem(`application_draft_${courseId}`, JSON.stringify(formData))
    setTimeout(() => {
      setIsSaving(false)
    }, 500)
  }

  const validateStep = (step) => {
    const newErrors = {}
    
    switch (step) {
      case 1:
        if (!formData.personalStatement || formData.personalStatement.length < 200) {
          newErrors.personalStatement = '个人陈述至少需要200字'
        }
        if (!formData.researchBackground) {
          newErrors.researchBackground = '请填写研究背景'
        }
        if (formData.relevantCourses.length === 0) {
          newErrors.relevantCourses = '请至少添加一门相关课程'
        }
        break
        
      case 2:
        if (!formData.gpa) {
          newErrors.gpa = '请填写GPA'
        }
        if (!formData.transcriptFile) {
          newErrors.transcriptFile = '请上传成绩单'
        }
        if (!formData.cvFile) {
          newErrors.cvFile = '请上传简历'
        }
        break
        
      case 3:
        if (!formData.startDate) {
          newErrors.startDate = '请选择开始日期'
        }
        if (!formData.endDate) {
          newErrors.endDate = '请选择结束日期'
        }
        if (parseInt(formData.weeklyHours) < 10) {
          newErrors.weeklyHours = '每周至少需要10小时'
        }
        break
        
      case 4:
        if (!formData.whyInterested || formData.whyInterested.length < 100) {
          newErrors.whyInterested = '请详细说明您的兴趣（至少100字）'
        }
        if (!formData.expectedOutcome) {
          newErrors.expectedOutcome = '请说明期望的学习成果'
        }
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      saveDraft()
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileUpload = (field, file) => {
    // Validate file
    const allowedTypes = {
      transcriptFile: ['application/pdf', 'image/jpeg', 'image/png'],
      cvFile: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      portfolioFile: ['application/pdf', 'application/zip']
    }
    
    if (file && allowedTypes[field].includes(file.type)) {
      setFormData({ ...formData, [field]: file })
      setErrors({ ...errors, [field]: null })
    } else {
      setErrors({ ...errors, [field]: '文件格式不支持' })
    }
  }

  const addCourse = () => {
    const course = prompt('请输入课程名称：')
    if (course) {
      setFormData({
        ...formData,
        relevantCourses: [...formData.relevantCourses, course]
      })
    }
  }

  const removeCourse = (index) => {
    setFormData({
      ...formData,
      relevantCourses: formData.relevantCourses.filter((_, i) => i !== index)
    })
  }

  const addSkill = () => {
    const skill = prompt('请输入技能：')
    if (skill) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill]
      })
    }
  }

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = () => {
    if (validateStep(4)) {
      // Save application
      const applications = JSON.parse(localStorage.getItem(`applications_${courseId}`) || '[]')
      const newApplication = {
        id: Date.now().toString(),
        topicId: topicInfo?.id,
        topicTitle: topicInfo?.title,
        professorName: topicInfo?.professorName,
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'submitted',
        studentId: 'student1'
      }
      
      applications.push(newApplication)
      localStorage.setItem(`applications_${courseId}`, JSON.stringify(applications))
      
      // Clear draft
      localStorage.removeItem(`application_draft_${courseId}`)
      
      // Show success and redirect
      alert('申请已成功提交！')
      navigate(`/student/courses/lab-rotation/${courseId}/application/status`)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h2>基本信息和背景</h2>
            
            <div className="form-group">
              <label>个人陈述 *</label>
              <textarea
                className={errors.personalStatement ? 'error' : ''}
                value={formData.personalStatement}
                onChange={(e) => setFormData({ ...formData, personalStatement: e.target.value })}
                placeholder="请说明您为什么对这个研究课题感兴趣，以及您认为自己为什么适合这个项目..."
                rows="6"
              />
              {errors.personalStatement && <span className="error-message">{errors.personalStatement}</span>}
              <span className="char-count">{formData.personalStatement.length} 字</span>
            </div>
            
            <div className="form-group">
              <label>研究背景 *</label>
              <textarea
                className={errors.researchBackground ? 'error' : ''}
                value={formData.researchBackground}
                onChange={(e) => setFormData({ ...formData, researchBackground: e.target.value })}
                placeholder="请描述您的研究经历、项目经验等..."
                rows="4"
              />
              {errors.researchBackground && <span className="error-message">{errors.researchBackground}</span>}
            </div>
            
            <div className="form-group">
              <label>相关课程 *</label>
              <div className="tag-input">
                {formData.relevantCourses.map((course, index) => (
                  <span key={index} className="tag">
                    {course}
                    <button onClick={() => removeCourse(index)}>×</button>
                  </span>
                ))}
                <button className="add-tag" onClick={addCourse}>+ 添加课程</button>
              </div>
              {errors.relevantCourses && <span className="error-message">{errors.relevantCourses}</span>}
            </div>
            
            <div className="form-group">
              <label>技能专长</label>
              <div className="tag-input">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="tag">
                    {skill}
                    <button onClick={() => removeSkill(index)}>×</button>
                  </span>
                ))}
                <button className="add-tag" onClick={addSkill}>+ 添加技能</button>
              </div>
            </div>
            
            <div className="form-group">
              <label>其他相关经验</label>
              <textarea
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="实习、竞赛、开源项目等..."
                rows="3"
              />
            </div>
          </div>
        )
        
      case 2:
        return (
          <div className="form-step">
            <h2>学术信息和文件</h2>
            
            <div className="form-group">
              <label>GPA *</label>
              <input
                type="text"
                className={errors.gpa ? 'error' : ''}
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                placeholder="例如：3.8/4.0"
              />
              {errors.gpa && <span className="error-message">{errors.gpa}</span>}
            </div>
            
            <div className="form-group">
              <label>成绩单 * (PDF/JPG/PNG)</label>
              <div className="file-upload">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('transcriptFile', e.target.files[0])}
                />
                {formData.transcriptFile && (
                  <span className="file-name">{formData.transcriptFile.name}</span>
                )}
              </div>
              {errors.transcriptFile && <span className="error-message">{errors.transcriptFile}</span>}
            </div>
            
            <div className="form-group">
              <label>个人简历 * (PDF/DOC/DOCX)</label>
              <div className="file-upload">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload('cvFile', e.target.files[0])}
                />
                {formData.cvFile && (
                  <span className="file-name">{formData.cvFile.name}</span>
                )}
              </div>
              {errors.cvFile && <span className="error-message">{errors.cvFile}</span>}
            </div>
            
            <div className="form-group">
              <label>作品集（可选）(PDF/ZIP)</label>
              <div className="file-upload">
                <input
                  type="file"
                  accept=".pdf,.zip"
                  onChange={(e) => handleFileUpload('portfolioFile', e.target.files[0])}
                />
                {formData.portfolioFile && (
                  <span className="file-name">{formData.portfolioFile.name}</span>
                )}
              </div>
              <span className="help-text">如有相关项目代码、论文等可打包上传</span>
            </div>
          </div>
        )
        
      case 3:
        return (
          <div className="form-step">
            <h2>时间安排和承诺</h2>
            
            <div className="form-group">
              <label>每周可投入时间 *</label>
              <select
                value={formData.weeklyHours}
                onChange={(e) => setFormData({ ...formData, weeklyHours: e.target.value })}
              >
                <option value="10">10-15小时</option>
                <option value="15">15-20小时</option>
                <option value="20">20-25小时</option>
                <option value="25">25-30小时</option>
                <option value="30">30小时以上</option>
              </select>
              {errors.weeklyHours && <span className="error-message">{errors.weeklyHours}</span>}
            </div>
            
            <div className="form-group">
              <label>可开始日期 *</label>
              <input
                type="date"
                className={errors.startDate ? 'error' : ''}
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
              {errors.startDate && <span className="error-message">{errors.startDate}</span>}
            </div>
            
            <div className="form-group">
              <label>预计结束日期 *</label>
              <input
                type="date"
                className={errors.endDate ? 'error' : ''}
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
              {errors.endDate && <span className="error-message">{errors.endDate}</span>}
            </div>
            
            <div className="form-group">
              <label>时间冲突说明</label>
              <textarea
                value={formData.scheduleConflicts}
                onChange={(e) => setFormData({ ...formData, scheduleConflicts: e.target.value })}
                placeholder="如有课程冲突、其他承诺等请说明..."
                rows="3"
              />
            </div>
          </div>
        )
        
      case 4:
        return (
          <div className="form-step">
            <h2>补充信息</h2>
            
            <div className="form-group">
              <label>为什么选择这个课题？ *</label>
              <textarea
                className={errors.whyInterested ? 'error' : ''}
                value={formData.whyInterested}
                onChange={(e) => setFormData({ ...formData, whyInterested: e.target.value })}
                placeholder="请具体说明您对这个研究方向的兴趣..."
                rows="4"
              />
              {errors.whyInterested && <span className="error-message">{errors.whyInterested}</span>}
              <span className="char-count">{formData.whyInterested.length} 字</span>
            </div>
            
            <div className="form-group">
              <label>期望的学习成果 *</label>
              <textarea
                className={errors.expectedOutcome ? 'error' : ''}
                value={formData.expectedOutcome}
                onChange={(e) => setFormData({ ...formData, expectedOutcome: e.target.value })}
                placeholder="通过参与这个项目，您希望获得什么？"
                rows="3"
              />
              {errors.expectedOutcome && <span className="error-message">{errors.expectedOutcome}</span>}
            </div>
            
            <div className="form-group">
              <label>问题或补充说明</label>
              <textarea
                value={formData.questions}
                onChange={(e) => setFormData({ ...formData, questions: e.target.value })}
                placeholder="如有任何问题或需要补充的信息..."
                rows="3"
              />
            </div>
            
            {topicInfo && (
              <div className="application-summary">
                <h3>申请信息确认</h3>
                <div className="summary-item">
                  <span className="label">申请课题：</span>
                  <span className="value">{topicInfo.title}</span>
                </div>
                <div className="summary-item">
                  <span className="label">指导教授：</span>
                  <span className="value">{topicInfo.professorName}</span>
                </div>
                <div className="summary-item">
                  <span className="label">申请时间：</span>
                  <span className="value">{new Date().toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <div className="application-form-container">
      <div className="form-header">
        <h1>实验室轮转申请</h1>
        <div className="progress-indicator">
          {[1, 2, 3, 4].map(step => (
            <div
              key={step}
              className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}
            >
              <div className="step-number">{step}</div>
              <div className="step-label">
                {step === 1 && '基本信息'}
                {step === 2 && '学术材料'}
                {step === 3 && '时间安排'}
                {step === 4 && '补充信息'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-body">
        {renderStep()}
      </div>

      <div className="form-footer">
        <div className="auto-save-status">
          {isSaving && <span className="saving">正在保存草稿...</span>}
          {!isSaving && formData.personalStatement && <span className="saved">草稿已自动保存</span>}
        </div>
        
        <div className="form-actions">
          {currentStep > 1 && (
            <button className="btn-secondary" onClick={handlePrevious}>
              上一步
            </button>
          )}
          
          {currentStep < 4 ? (
            <button className="btn-primary" onClick={handleNext}>
              下一步
            </button>
          ) : (
            <button className="btn-primary submit" onClick={handleSubmit}>
              提交申请
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApplicationForm