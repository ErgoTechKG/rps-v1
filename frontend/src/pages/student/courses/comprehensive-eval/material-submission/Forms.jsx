import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Save, ChevronLeft, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react'
import Layout from '../../../../../components/Layout'
import './Forms.css'

function Forms() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeForm, setActiveForm] = useState('personal-info')
  const [formData, setFormData] = useState({})
  const [saveStatus, setSaveStatus] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    // Check if there's a hash in the URL to navigate to specific form
    const hash = location.hash.replace('#', '')
    if (hash) {
      setActiveForm(hash)
    }
    // Load saved form data
    loadFormData()
  }, [location])

  const loadFormData = () => {
    // Simulate loading saved form data
    const savedData = localStorage.getItem(`form-data-${courseId}`)
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }

  const handleInputChange = (formId, fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [fieldName]: value
      }
    }))
    // Clear validation error for this field
    setValidationErrors(prev => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [fieldName]: null
      }
    }))
  }

  const handleSave = () => {
    // Save to localStorage (in real app, would save to backend)
    localStorage.setItem(`form-data-${courseId}`, JSON.stringify(formData))
    setSaveStatus('saved')
    setTimeout(() => setSaveStatus(null), 3000)
  }

  const validateForm = (formId) => {
    const errors = {}
    const data = formData[formId] || {}
    
    // Add validation logic based on form type
    if (formId === 'personal-info') {
      if (!data.fullName) errors.fullName = '请填写姓名'
      if (!data.studentId) errors.studentId = '请填写学号'
      if (!data.email) errors.email = '请填写邮箱'
    }
    
    setValidationErrors(prev => ({
      ...prev,
      [formId]: errors
    }))
    
    return Object.keys(errors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm(activeForm)) {
      handleSave()
      // Navigate to next form or back to submission page
      const forms = ['personal-info', 'academic-achievement', 'self-assessment', 'research-innovation', 'character-leadership']
      const currentIndex = forms.indexOf(activeForm)
      if (currentIndex < forms.length - 1) {
        setActiveForm(forms[currentIndex + 1])
      } else {
        navigate(`/student/courses/comprehensive-eval/${courseId}/material-submission`)
      }
    }
  }

  const forms = {
    'personal-info': <PersonalInfoForm formData={formData['personal-info'] || {}} onChange={(field, value) => handleInputChange('personal-info', field, value)} errors={validationErrors['personal-info'] || {}} />,
    'academic-achievement': <AcademicAchievementForm formData={formData['academic-achievement'] || {}} onChange={(field, value) => handleInputChange('academic-achievement', field, value)} errors={validationErrors['academic-achievement'] || {}} />,
    'self-assessment': <SelfAssessmentForm formData={formData['self-assessment'] || {}} onChange={(field, value) => handleInputChange('self-assessment', field, value)} errors={validationErrors['self-assessment'] || {}} />,
    'research-innovation': <ResearchInnovationForm formData={formData['research-innovation'] || {}} onChange={(field, value) => handleInputChange('research-innovation', field, value)} errors={validationErrors['research-innovation'] || {}} />,
    'character-leadership': <CharacterLeadershipForm formData={formData['character-leadership'] || {}} onChange={(field, value) => handleInputChange('character-leadership', field, value)} errors={validationErrors['character-leadership'] || {}} />
  }

  const formTitles = {
    'personal-info': '个人信息表',
    'academic-achievement': '学术成就表',
    'self-assessment': '自我评估表',
    'research-innovation': '研究创新表',
    'character-leadership': '品格与领导力'
  }

  return (
    <Layout userRole="student">
      <div className="forms-page">
        <div className="forms-header">
          <button 
            className="back-button"
            onClick={() => navigate(`/student/courses/comprehensive-eval/${courseId}/material-submission`)}
          >
            <ChevronLeft size={20} />
            返回材料提交
          </button>
          <h1>{formTitles[activeForm]}</h1>
          {saveStatus && (
            <div className="save-status">
              <CheckCircle size={16} />
              已自动保存
            </div>
          )}
        </div>

        <div className="form-navigation">
          {Object.keys(forms).map((formId, index) => (
            <div
              key={formId}
              className={`nav-item ${activeForm === formId ? 'active' : ''} ${formData[formId] ? 'has-data' : ''}`}
              onClick={() => setActiveForm(formId)}
            >
              <span className="nav-number">{index + 1}</span>
              <span className="nav-title">{formTitles[formId]}</span>
            </div>
          ))}
        </div>

        <div className="form-content">
          {forms[activeForm]}
        </div>

        <div className="form-actions">
          <button className="btn-secondary" onClick={handleSave}>
            <Save size={16} />
            保存草稿
          </button>
          <button className="btn-primary" onClick={handleSubmit}>
            保存并继续
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </Layout>
  )
}

function PersonalInfoForm({ formData, onChange, errors }) {
  return (
    <div className="form-section">
      <h2>基本信息</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="fullName">姓名 <span className="required">*</span></label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName || ''}
            onChange={(e) => onChange('fullName', e.target.value)}
            className={errors.fullName ? 'error' : ''}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="studentId">学号 <span className="required">*</span></label>
          <input
            type="text"
            id="studentId"
            value={formData.studentId || ''}
            onChange={(e) => onChange('studentId', e.target.value)}
            className={errors.studentId ? 'error' : ''}
          />
          {errors.studentId && <span className="error-message">{errors.studentId}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">邮箱 <span className="required">*</span></label>
          <input
            type="email"
            id="email"
            value={formData.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">联系电话 <span className="required">*</span></label>
          <input
            type="tel"
            id="phone"
            value={formData.phone || ''}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="major">专业</label>
          <input
            type="text"
            id="major"
            value={formData.major || ''}
            onChange={(e) => onChange('major', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="grade">年级</label>
          <select
            id="grade"
            value={formData.grade || ''}
            onChange={(e) => onChange('grade', e.target.value)}
          >
            <option value="">请选择</option>
            <option value="2021">2021级</option>
            <option value="2022">2022级</option>
            <option value="2023">2023级</option>
            <option value="2024">2024级</option>
          </select>
        </div>
      </div>

      <h2>紧急联系人</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="emergencyName">紧急联系人姓名</label>
          <input
            type="text"
            id="emergencyName"
            value={formData.emergencyName || ''}
            onChange={(e) => onChange('emergencyName', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="emergencyRelation">关系</label>
          <input
            type="text"
            id="emergencyRelation"
            value={formData.emergencyRelation || ''}
            onChange={(e) => onChange('emergencyRelation', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="emergencyPhone">联系电话</label>
          <input
            type="tel"
            id="emergencyPhone"
            value={formData.emergencyPhone || ''}
            onChange={(e) => onChange('emergencyPhone', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

function AcademicAchievementForm({ formData, onChange, errors }) {
  return (
    <div className="form-section">
      <h2>学术成绩</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="gpa">GPA <span className="required">*</span></label>
          <input
            type="number"
            id="gpa"
            step="0.01"
            min="0"
            max="4"
            value={formData.gpa || ''}
            onChange={(e) => onChange('gpa', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ranking">年级排名</label>
          <input
            type="text"
            id="ranking"
            placeholder="例如: 10/150"
            value={formData.ranking || ''}
            onChange={(e) => onChange('ranking', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group full-width">
        <label htmlFor="courses">主要课程成绩（请列出5门核心课程及成绩）</label>
        <textarea
          id="courses"
          rows="5"
          placeholder="例如：&#10;高等数学 - 95分&#10;线性代数 - 92分&#10;数据结构 - 88分"
          value={formData.courses || ''}
          onChange={(e) => onChange('courses', e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="honors">获得的学术荣誉</label>
        <textarea
          id="honors"
          rows="4"
          placeholder="列出获得的奖学金、荣誉称号等"
          value={formData.honors || ''}
          onChange={(e) => onChange('honors', e.target.value)}
        />
      </div>
    </div>
  )
}

function SelfAssessmentForm({ formData, onChange, errors }) {
  return (
    <div className="form-section">
      <h2>自我评估</h2>
      
      <div className="form-group full-width">
        <label htmlFor="strengths">个人优势 <span className="required">*</span></label>
        <textarea
          id="strengths"
          rows="4"
          placeholder="描述您的主要优势和特长（200-500字）"
          value={formData.strengths || ''}
          onChange={(e) => onChange('strengths', e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="improvements">需要改进的方面</label>
        <textarea
          id="improvements"
          rows="4"
          placeholder="坦诚分析需要提升的地方（200-500字）"
          value={formData.improvements || ''}
          onChange={(e) => onChange('improvements', e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="goals">未来发展目标</label>
        <textarea
          id="goals"
          rows="4"
          placeholder="描述您的短期和长期目标（200-500字）"
          value={formData.goals || ''}
          onChange={(e) => onChange('goals', e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="reflection">学习反思</label>
        <textarea
          id="reflection"
          rows="5"
          placeholder="对过去学习经历的总结和反思（300-800字）"
          value={formData.reflection || ''}
          onChange={(e) => onChange('reflection', e.target.value)}
        />
      </div>
    </div>
  )
}

function ResearchInnovationForm({ formData, onChange, errors }) {
  return (
    <div className="form-section">
      <h2>研究与创新</h2>
      
      <div className="form-group full-width">
        <label htmlFor="researchProjects">参与的研究项目</label>
        <textarea
          id="researchProjects"
          rows="5"
          placeholder="列出参与的科研项目，包括项目名称、您的角色、主要贡献等"
          value={formData.researchProjects || ''}
          onChange={(e) => onChange('researchProjects', e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="publications">发表的论文或作品</label>
        <textarea
          id="publications"
          rows="4"
          placeholder="列出发表的论文、专利、软件著作权等"
          value={formData.publications || ''}
          onChange={(e) => onChange('publications', e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="competitions">竞赛获奖情况</label>
        <textarea
          id="competitions"
          rows="4"
          placeholder="列出参加的学科竞赛及获奖情况"
          value={formData.competitions || ''}
          onChange={(e) => onChange('competitions', e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="innovations">创新创业经历</label>
        <textarea
          id="innovations"
          rows="4"
          placeholder="描述创新创业项目或实践经历"
          value={formData.innovations || ''}
          onChange={(e) => onChange('innovations', e.target.value)}
        />
      </div>
    </div>
  )
}

function CharacterLeadershipForm({ formData, onChange, errors }) {
  return (
    <div className="form-section">
      <h2>品格与领导力</h2>
      
      <div className="form-group full-width">
        <label htmlFor="leadership">领导经历</label>
        <textarea
          id="leadership"
          rows="4"
          placeholder="描述担任的学生干部职务、组织活动等领导经历"
          value={formData.leadership || ''}
          onChange={(e) => onChange('leadership', e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="volunteer">志愿服务</label>
        <textarea
          id="volunteer"
          rows="4"
          placeholder="列出参与的志愿服务活动及贡献"
          value={formData.volunteer || ''}
          onChange={(e) => onChange('volunteer', e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="teamwork">团队合作</label>
        <textarea
          id="teamwork"
          rows="4"
          placeholder="描述团队合作的经历和您在团队中的作用"
          value={formData.teamwork || ''}
          onChange={(e) => onChange('teamwork', e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="character">品格特质</label>
        <textarea
          id="character"
          rows="4"
          placeholder="用具体事例说明您的诚信、责任心、坚韧等品格特质"
          value={formData.character || ''}
          onChange={(e) => onChange('character', e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="influence">社会影响</label>
        <textarea
          id="influence"
          rows="4"
          placeholder="描述您对他人或社会产生的积极影响"
          value={formData.influence || ''}
          onChange={(e) => onChange('influence', e.target.value)}
        />
      </div>
    </div>
  )
}

export default Forms