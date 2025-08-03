import { useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import './ContactSupport.css'

const ContactSupport = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    category: '',
    priority: 'medium',
    subject: '',
    description: '',
    attachments: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const supportCategories = [
    { id: 'technical', name: '技术问题', icon: '🔧', description: '系统故障、功能异常等' },
    { id: 'account', name: '账号相关', icon: '👤', description: '登录、密码、权限问题' },
    { id: 'feature', name: '功能建议', icon: '💡', description: '新功能建议或改进意见' },
    { id: 'training', name: '使用培训', icon: '📚', description: '功能使用指导和培训' },
    { id: 'data', name: '数据问题', icon: '📊', description: '数据错误、同步问题等' },
    { id: 'other', name: '其他问题', icon: '❓', description: '其他类型的问题或建议' }
  ]

  const priorityLevels = [
    { id: 'low', name: '低优先级', description: '一般问题，可以稍后处理', color: '#22c55e' },
    { id: 'medium', name: '中优先级', description: '正常业务问题，需要及时处理', color: '#f59e0b' },
    { id: 'high', name: '高优先级', description: '影响工作，需要快速解决', color: '#ef4444' },
    { id: 'urgent', name: '紧急', description: '严重问题，影响系统正常使用', color: '#dc2626' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }))
  }

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // TODO: Implement actual submission to backend
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      
      console.log('Support ticket submitted:', {
        user: user,
        formData: formData,
        timestamp: new Date().toISOString()
      })

      setSubmitStatus('success')
      setFormData({
        category: '',
        priority: 'medium',
        subject: '',
        description: '',
        attachments: []
      })
    } catch (error) {
      console.error('Failed to submit support ticket:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRoleDisplayName = (role) => {
    const roleNames = {
      professor: '教授',
      student: '学生',
      secretary: '秘书',
      leader: '领导'
    }
    return roleNames[role] || role
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="contact-support">
      <div className="support-header">
        <h2>技术支持</h2>
        <p>遇到问题或有建议？我们的技术支持团队将为您提供专业帮助。</p>
      </div>

      <div className="support-content">
        <div className="support-form-section">
          <div className="user-info">
            <h3>您的信息</h3>
            <div className="user-details">
              <div className="user-field">
                <label>姓名</label>
                <span>{user?.name || '未知用户'}</span>
              </div>
              <div className="user-field">
                <label>角色</label>
                <span>{getRoleDisplayName(user?.role)}</span>
              </div>
              <div className="user-field">
                <label>用户ID</label>
                <span>{user?.id || 'N/A'}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="support-form">
            <div className="form-section">
              <h3>问题分类</h3>
              <div className="category-grid">
                {supportCategories.map(category => (
                  <label 
                    key={category.id}
                    className={`category-option ${formData.category === category.id ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={formData.category === category.id}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="category-content">
                      <span className="category-icon">{category.icon}</span>
                      <div className="category-text">
                        <strong>{category.name}</strong>
                        <p>{category.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h3>优先级</h3>
              <div className="priority-options">
                {priorityLevels.map(priority => (
                  <label 
                    key={priority.id}
                    className={`priority-option ${formData.priority === priority.id ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={priority.id}
                      checked={formData.priority === priority.id}
                      onChange={handleInputChange}
                    />
                    <div className="priority-content">
                      <div 
                        className="priority-indicator"
                        style={{ backgroundColor: priority.color }}
                      />
                      <div className="priority-text">
                        <strong>{priority.name}</strong>
                        <p>{priority.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h3>问题详情</h3>
              <div className="form-group">
                <label htmlFor="subject">问题标题 *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  placeholder="请简要描述您遇到的问题..."
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">详细描述 *</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-textarea"
                  placeholder="请详细描述问题的具体情况，包括：&#10;1. 问题发生的具体步骤&#10;2. 期望的结果&#10;3. 实际发生的情况&#10;4. 问题发生的频率&#10;5. 其他相关信息"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="8"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="attachments">相关文件</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="attachments"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt,.zip"
                    onChange={handleFileUpload}
                    className="file-input"
                  />
                  <label htmlFor="attachments" className="file-upload-label">
                    <span className="upload-icon">📎</span>
                    <span className="upload-text">
                      点击上传文件或拖拽文件到这里
                    </span>
                    <span className="upload-hint">
                      支持图片、文档、压缩包等格式，单个文件不超过10MB
                    </span>
                  </label>
                </div>

                {formData.attachments.length > 0 && (
                  <div className="attachment-list">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="attachment-item">
                        <span className="file-icon">📄</span>
                        <div className="file-info">
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">{formatFileSize(file.size)}</span>
                        </div>
                        <button
                          type="button"
                          className="remove-file-btn"
                          onClick={() => removeAttachment(index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting || !formData.category || !formData.subject || !formData.description}
              >
                {isSubmitting ? '提交中...' : '提交工单'}
              </button>
              <button 
                type="button" 
                className="reset-btn"
                onClick={() => setFormData({
                  category: '',
                  priority: 'medium',
                  subject: '',
                  description: '',
                  attachments: []
                })}
                disabled={isSubmitting}
              >
                重置表单
              </button>
            </div>

            {submitStatus === 'success' && (
              <div className="submit-message success">
                <div className="message-icon">✅</div>
                <div className="message-content">
                  <h4>工单提交成功！</h4>
                  <p>您的支持请求已提交，工单编号：ST-{Date.now()}。我们会在24小时内回复您。</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="submit-message error">
                <div className="message-icon">❌</div>
                <div className="message-content">
                  <h4>提交失败</h4>
                  <p>很抱歉，工单提交失败。请检查网络连接或稍后重试。</p>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="support-info-section">
          <div className="contact-methods">
            <h3>其他联系方式</h3>
            
            <div className="contact-method">
              <div className="method-icon">📧</div>
              <div className="method-content">
                <h4>邮箱支持</h4>
                <p>support@university.edu</p>
                <span className="method-time">24小时内回复</span>
              </div>
            </div>

            <div className="contact-method">
              <div className="method-icon">📞</div>
              <div className="method-content">
                <h4>电话支持</h4>
                <p>400-xxx-xxxx</p>
                <span className="method-time">工作日 9:00-18:00</span>
              </div>
            </div>

            <div className="contact-method">
              <div className="method-icon">💬</div>
              <div className="method-content">
                <h4>在线客服</h4>
                <p>即时响应</p>
                <span className="method-time">工作日 9:00-18:00</span>
              </div>
            </div>
          </div>

          <div className="support-tips">
            <h3>提交建议</h3>
            <ul>
              <li>📋 提供详细的问题描述和复现步骤</li>
              <li>📸 上传相关截图或错误信息</li>
              <li>🔍 检查是否在FAQ中有相关解答</li>
              <li>⚡ 根据问题严重程度选择合适的优先级</li>
              <li>📝 保留工单编号以便后续跟踪</li>
            </ul>
          </div>

          <div className="support-hours">
            <h3>服务时间</h3>
            <div className="hours-info">
              <div className="hours-item">
                <strong>技术支持</strong>
                <span>工作日 9:00-18:00</span>
              </div>
              <div className="hours-item">
                <strong>紧急故障</strong>
                <span>7×24小时</span>
              </div>
              <div className="hours-item">
                <strong>邮件支持</strong>
                <span>24小时内回复</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSupport