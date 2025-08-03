import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './BasicInfo.css'

const BasicInfo = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    courseName: '',
    semester: '',
    year: '',
    description: '',
    capacity: '',
    duration: '',
    startDate: '',
    endDate: '',
    coordinator: '',
    status: 'draft'
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.courseName.trim()) {
      newErrors.courseName = '课程名称不能为空'
    }
    
    if (!formData.semester) {
      newErrors.semester = '请选择学期'
    }
    
    if (!formData.year) {
      newErrors.year = '请选择年份'
    }
    
    if (!formData.capacity || parseInt(formData.capacity) < 1) {
      newErrors.capacity = '请输入有效的课程容量'
    }
    
    if (!formData.startDate) {
      newErrors.startDate = '请选择开始日期'
    }
    
    if (!formData.endDate) {
      newErrors.endDate = '请选择结束日期'
    }
    
    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = '结束日期必须晚于开始日期'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Save the basic info and navigate to timeline setup
      console.log('Saving basic course info:', formData)
      navigate(`/secretary/course-management/lab-rotation/${courseId}/setup/timeline`)
    }
  }

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData)
    // Save as draft without validation
  }

  const handleClone = () => {
    // Open modal to select course to clone from
    console.log('Clone from previous course')
  }

  return (
    <Layout>
      <div className="basic-info-container">
        <div className="setup-header">
          <h1 className="page-title">课程基本信息设置</h1>
          <div className="setup-progress">
            <div className="progress-step active">基本信息</div>
            <div className="progress-step">时间安排</div>
            <div className="progress-step">规则政策</div>
            <div className="progress-step">资源管理</div>
          </div>
        </div>

        <div className="setup-content">
          <div className="setup-card">
            <div className="card-header">
              <h2 className="card-title">课程信息</h2>
              <div className="card-actions">
                <button type="button" className="action-button secondary" onClick={handleClone}>
                  从往期课程复制
                </button>
                <button type="button" className="action-button secondary" onClick={handleSaveDraft}>
                  保存草稿
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="setup-form">
              <div className="form-section">
                <h3 className="section-title">基本信息</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="courseName" className="form-label">
                      课程名称 <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="courseName"
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleInputChange}
                      className={`form-input ${errors.courseName ? 'error' : ''}`}
                      placeholder="输入课程名称"
                    />
                    {errors.courseName && <span className="error-message">{errors.courseName}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="semester" className="form-label">
                      学期 <span className="required">*</span>
                    </label>
                    <select
                      id="semester"
                      name="semester"
                      value={formData.semester}
                      onChange={handleInputChange}
                      className={`form-select ${errors.semester ? 'error' : ''}`}
                    >
                      <option value="">请选择学期</option>
                      <option value="spring">春季学期</option>
                      <option value="summer">夏季学期</option>
                      <option value="fall">秋季学期</option>
                      <option value="winter">冬季学期</option>
                    </select>
                    {errors.semester && <span className="error-message">{errors.semester}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="year" className="form-label">
                      年份 <span className="required">*</span>
                    </label>
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className={`form-select ${errors.year ? 'error' : ''}`}
                    >
                      <option value="">请选择年份</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                    </select>
                    {errors.year && <span className="error-message">{errors.year}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="capacity" className="form-label">
                      课程容量 <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      id="capacity"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      className={`form-input ${errors.capacity ? 'error' : ''}`}
                      placeholder="最大学生数量"
                      min="1"
                    />
                    {errors.capacity && <span className="error-message">{errors.capacity}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">课程描述</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="输入课程描述"
                    rows="4"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">时间设置</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="startDate" className="form-label">
                      开始日期 <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className={`form-input ${errors.startDate ? 'error' : ''}`}
                    />
                    {errors.startDate && <span className="error-message">{errors.startDate}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="endDate" className="form-label">
                      结束日期 <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className={`form-input ${errors.endDate ? 'error' : ''}`}
                    />
                    {errors.endDate && <span className="error-message">{errors.endDate}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="duration" className="form-label">课程时长</label>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">请选择时长</option>
                      <option value="4weeks">4周</option>
                      <option value="8weeks">8周</option>
                      <option value="12weeks">12周</option>
                      <option value="16weeks">16周</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">管理设置</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="coordinator" className="form-label">课程协调员</label>
                    <select
                      id="coordinator"
                      name="coordinator"
                      value={formData.coordinator}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">请选择协调员</option>
                      <option value="prof1">张教授</option>
                      <option value="prof2">李教授</option>
                      <option value="prof3">王教授</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="status" className="form-label">课程状态</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="draft">草稿</option>
                      <option value="active">活跃</option>
                      <option value="completed">已完成</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="action-button secondary"
                  onClick={() => navigate('/secretary/dashboard')}
                >
                  取消
                </button>
                <button type="submit" className="action-button primary">
                  下一步：时间安排
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BasicInfo