import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { useNotifications } from '../../../contexts/NotificationContext'
import Layout from '../../../components/Layout'
import './NotificationPreferences.css'

const NotificationPreferences = () => {
  const { user } = useAuth()
  const { preferences, updatePreferences } = useNotifications()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  
  const [formData, setFormData] = useState({
    emailEnabled: true,
    inAppEnabled: true,
    categories: {
      messages: true,
      deadlines: true,
      alerts: true,
      systemUpdates: true
    },
    emailFrequency: 'immediate',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    }
  })

  useEffect(() => {
    setFormData({
      ...preferences,
      emailFrequency: preferences.emailFrequency || 'immediate',
      quietHours: preferences.quietHours || {
        enabled: false,
        start: '22:00',
        end: '08:00'
      }
    })
  }, [preferences])

  const handleCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category]
      }
    }))
  }

  const handleQuietHoursChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [field]: value
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await updatePreferences(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Failed to save preferences:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryLabel = (category) => {
    const labels = {
      messages: '消息通知',
      deadlines: '截止日期提醒',
      alerts: '重要提醒',
      systemUpdates: '系统更新'
    }
    return labels[category] || category
  }

  const getCategoryDescription = (category) => {
    const descriptions = {
      messages: '包括新消息、回复、评论等',
      deadlines: '作业、项目、评分等截止日期提醒',
      alerts: '紧急通知、重要变更等',
      systemUpdates: '系统维护、功能更新等'
    }
    return descriptions[category] || ''
  }

  const getRoleSpecificSettings = () => {
    const roleSettings = {
      professor: [
        { id: 'studentSubmissions', label: '学生提交通知', description: '当学生提交作业或问题时' },
        { id: 'gradingReminders', label: '评分提醒', description: '评分截止日期临近时' },
        { id: 'courseUpdates', label: '课程更新', description: '课程内容或安排变更时' }
      ],
      student: [
        { id: 'gradePublished', label: '成绩发布', description: '教授发布新成绩时' },
        { id: 'assignmentReminders', label: '作业提醒', description: '作业截止日期临近时' },
        { id: 'professorFeedback', label: '教授反馈', description: '收到教授评论或反馈时' }
      ],
      secretary: [
        { id: 'dataCollection', label: '数据收集提醒', description: '需要收集或整理数据时' },
        { id: 'reportGeneration', label: '报告生成', description: '自动报告生成完成时' },
        { id: 'systemAlerts', label: '系统监控', description: '系统异常或需要关注时' }
      ],
      leader: [
        { id: 'approvalRequests', label: '审批请求', description: '有新的待审批事项时' },
        { id: 'metricsAlerts', label: '指标预警', description: '关键指标出现异常时' },
        { id: 'strategicUpdates', label: '战略更新', description: '重要战略信息更新时' }
      ]
    }
    return roleSettings[user?.role] || []
  }

  return (
    <Layout>
      <div className="notification-preferences">
        <div className="preferences-header">
          <button 
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← 返回
          </button>
          <h1>通知设置</h1>
        </div>

        <form onSubmit={handleSubmit} className="preferences-form">
          <section className="preferences-section">
            <h2>通知方式</h2>
            <div className="toggle-group">
              <label className="toggle-item">
                <input
                  type="checkbox"
                  checked={formData.inAppEnabled}
                  onChange={(e) => setFormData(prev => ({ ...prev, inAppEnabled: e.target.checked }))}
                />
                <div className="toggle-content">
                  <span className="toggle-label">应用内通知</span>
                  <span className="toggle-description">在平台内显示通知</span>
                </div>
              </label>

              <label className="toggle-item">
                <input
                  type="checkbox"
                  checked={formData.emailEnabled}
                  onChange={(e) => setFormData(prev => ({ ...prev, emailEnabled: e.target.checked }))}
                />
                <div className="toggle-content">
                  <span className="toggle-label">邮件通知</span>
                  <span className="toggle-description">发送到 {user?.email}</span>
                </div>
              </label>
            </div>

            {formData.emailEnabled && (
              <div className="email-options">
                <label className="form-label">邮件频率</label>
                <select
                  value={formData.emailFrequency}
                  onChange={(e) => setFormData(prev => ({ ...prev, emailFrequency: e.target.value }))}
                  className="form-select"
                >
                  <option value="immediate">立即发送</option>
                  <option value="hourly">每小时汇总</option>
                  <option value="daily">每日汇总</option>
                  <option value="weekly">每周汇总</option>
                </select>
              </div>
            )}
          </section>

          <section className="preferences-section">
            <h2>通知类别</h2>
            <div className="category-list">
              {Object.keys(formData.categories).map(category => (
                <label key={category} className="category-item">
                  <input
                    type="checkbox"
                    checked={formData.categories[category]}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <div className="category-content">
                    <span className="category-label">{getCategoryLabel(category)}</span>
                    <span className="category-description">{getCategoryDescription(category)}</span>
                  </div>
                </label>
              ))}
            </div>
          </section>

          <section className="preferences-section">
            <h2>角色专属通知</h2>
            <div className="role-settings">
              {getRoleSpecificSettings().map(setting => (
                <label key={setting.id} className="role-setting-item">
                  <input
                    type="checkbox"
                    checked={formData[setting.id] !== false}
                    onChange={(e) => setFormData(prev => ({ ...prev, [setting.id]: e.target.checked }))}
                  />
                  <div className="setting-content">
                    <span className="setting-label">{setting.label}</span>
                    <span className="setting-description">{setting.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </section>

          <section className="preferences-section">
            <h2>免打扰时段</h2>
            <label className="toggle-item">
              <input
                type="checkbox"
                checked={formData.quietHours.enabled}
                onChange={(e) => handleQuietHoursChange('enabled', e.target.checked)}
              />
              <div className="toggle-content">
                <span className="toggle-label">启用免打扰</span>
                <span className="toggle-description">在指定时间段内不发送通知</span>
              </div>
            </label>

            {formData.quietHours.enabled && (
              <div className="quiet-hours-settings">
                <div className="time-range">
                  <label>
                    开始时间
                    <input
                      type="time"
                      value={formData.quietHours.start}
                      onChange={(e) => handleQuietHoursChange('start', e.target.value)}
                      className="time-input"
                    />
                  </label>
                  <span className="time-separator">至</span>
                  <label>
                    结束时间
                    <input
                      type="time"
                      value={formData.quietHours.end}
                      onChange={(e) => handleQuietHoursChange('end', e.target.value)}
                      className="time-input"
                    />
                  </label>
                </div>
              </div>
            )}
          </section>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate(-1)}
            >
              取消
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? '保存中...' : '保存设置'}
            </button>
          </div>

          {saved && (
            <div className="save-notification">
              ✓ 设置已保存
            </div>
          )}
        </form>
      </div>
    </Layout>
  )
}

export default NotificationPreferences