import { useState, useEffect } from 'react'
import './CalendarEvent.css'

const CalendarEvent = ({ event, defaultDate, onSave, onDelete, onClose, userRole }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: 'other',
    start: '',
    end: '',
    allDay: false,
    recurring: false,
    recurringType: 'weekly',
    recurringEnd: '',
    reminders: [{ type: 'notification', time: 15 }]
  })

  // Initialize form data
  useEffect(() => {
    if (event) {
      // Editing existing event
      setFormData({
        title: event.title || '',
        description: event.extendedProps?.description || '',
        location: event.extendedProps?.location || '',
        category: event.extendedProps?.category || 'other',
        start: formatDateTimeLocal(event.start),
        end: formatDateTimeLocal(event.end),
        allDay: event.allDay || false,
        recurring: event.extendedProps?.recurring || false,
        recurringType: event.extendedProps?.recurringType || 'weekly',
        recurringEnd: event.extendedProps?.recurringEnd || '',
        reminders: event.extendedProps?.reminders || [{ type: 'notification', time: 15 }]
      })
    } else if (defaultDate) {
      // Creating new event
      const startDate = new Date(defaultDate.start)
      const endDate = new Date(defaultDate.end || startDate.getTime() + 60 * 60 * 1000)
      
      setFormData({
        title: '',
        description: '',
        location: '',
        category: getDefaultCategory(userRole),
        start: formatDateTimeLocal(startDate),
        end: formatDateTimeLocal(endDate),
        allDay: defaultDate.allDay || false,
        recurring: false,
        recurringType: 'weekly',
        recurringEnd: '',
        reminders: [{ type: 'notification', time: 15 }]
      })
    }
  }, [event, defaultDate, userRole])

  const formatDateTimeLocal = (date) => {
    if (!date) return ''
    const d = new Date(date)
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
    return d.toISOString().slice(0, 16)
  }

  const getDefaultCategory = (role) => {
    const defaults = {
      professor: 'course',
      student: 'deadline',
      secretary: 'admin',
      leader: 'meeting'
    }
    return defaults[role] || 'other'
  }

  const getCategoryOptions = (role) => {
    const allCategories = [
      { value: 'course', label: '课程', roles: ['professor', 'student'] },
      { value: 'meeting', label: '会议', roles: ['professor', 'secretary', 'leader'] },
      { value: 'deadline', label: '截止日期', roles: ['professor', 'student'] },
      { value: 'evaluation', label: '评估', roles: ['professor', 'student', 'secretary'] },
      { value: 'application', label: '申请', roles: ['student', 'secretary'] },
      { value: 'admin', label: '管理事务', roles: ['secretary', 'leader'] },
      { value: 'strategic', label: '战略规划', roles: ['leader'] },
      { value: 'system', label: '系统维护', roles: ['secretary'] },
      { value: 'personal', label: '个人事务', roles: ['professor', 'student', 'secretary', 'leader'] },
      { value: 'other', label: '其他', roles: ['professor', 'student', 'secretary', 'leader'] }
    ]

    return allCategories.filter(cat => cat.roles.includes(role))
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Auto-adjust end time when start time changes
    if (name === 'start' && !formData.allDay) {
      const startTime = new Date(value)
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000)
      setFormData(prev => ({
        ...prev,
        end: formatDateTimeLocal(endTime)
      }))
    }
  }

  const handleAllDayChange = (e) => {
    const isAllDay = e.target.checked
    setFormData(prev => {
      if (isAllDay) {
        // Convert to all-day format
        const startDate = new Date(prev.start)
        const endDate = new Date(prev.end)
        return {
          ...prev,
          allDay: true,
          start: startDate.toISOString().split('T')[0],
          end: endDate.toISOString().split('T')[0]
        }
      } else {
        // Convert to timed format
        const today = new Date()
        const startTime = new Date(prev.start || today)
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000)
        return {
          ...prev,
          allDay: false,
          start: formatDateTimeLocal(startTime),
          end: formatDateTimeLocal(endTime)
        }
      }
    })
  }

  const addReminder = () => {
    setFormData(prev => ({
      ...prev,
      reminders: [...prev.reminders, { type: 'notification', time: 15 }]
    }))
  }

  const removeReminder = (index) => {
    setFormData(prev => ({
      ...prev,
      reminders: prev.reminders.filter((_, i) => i !== index)
    }))
  }

  const updateReminder = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      reminders: prev.reminders.map((reminder, i) => 
        i === index ? { ...reminder, [field]: value } : reminder
      )
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.title.trim()) {
      alert('请输入事件标题')
      return
    }

    if (!formData.start) {
      alert('请选择开始时间')
      return
    }

    if (!formData.allDay && !formData.end) {
      alert('请选择结束时间')
      return
    }

    if (!formData.allDay && new Date(formData.end) <= new Date(formData.start)) {
      alert('结束时间必须晚于开始时间')
      return
    }

    // Prepare event data
    const eventData = {
      ...formData,
      id: event?.id,
      start: formData.allDay ? formData.start : new Date(formData.start).toISOString(),
      end: formData.allDay ? formData.end : new Date(formData.end).toISOString()
    }

    onSave(eventData)
  }

  const handleDelete = () => {
    if (confirm('确定要删除这个事件吗？')) {
      onDelete(event.id)
    }
  }

  const categoryOptions = getCategoryOptions(userRole)

  return (
    <div className="calendar-event-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{event ? '编辑事件' : '新建事件'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="title">事件标题 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="输入事件标题"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">类型</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="allDay"
                checked={formData.allDay}
                onChange={handleAllDayChange}
              />
              全天事件
            </label>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="start">开始时间 *</label>
              <input
                type={formData.allDay ? 'date' : 'datetime-local'}
                id="start"
                name="start"
                value={formData.start}
                onChange={handleInputChange}
                required
              />
            </div>

            {!formData.allDay && (
              <div className="form-group">
                <label htmlFor="end">结束时间 *</label>
                <input
                  type="datetime-local"
                  id="end"
                  name="end"
                  value={formData.end}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            {formData.allDay && (
              <div className="form-group">
                <label htmlFor="end">结束日期</label>
                <input
                  type="date"
                  id="end"
                  name="end"
                  value={formData.end}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="location">地点</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="输入事件地点"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">描述</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="输入事件描述"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>提醒设置</label>
            <div className="reminders-list">
              {formData.reminders.map((reminder, index) => (
                <div key={index} className="reminder-item">
                  <select
                    value={reminder.type}
                    onChange={(e) => updateReminder(index, 'type', e.target.value)}
                  >
                    <option value="notification">通知</option>
                    <option value="email">邮件</option>
                  </select>
                  <input
                    type="number"
                    value={reminder.time}
                    onChange={(e) => updateReminder(index, 'time', parseInt(e.target.value))}
                    min="0"
                    max="1440"
                  />
                  <span>分钟前</span>
                  {formData.reminders.length > 1 && (
                    <button
                      type="button"
                      className="remove-reminder"
                      onClick={() => removeReminder(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="add-reminder" onClick={addReminder}>
                ➕ 添加提醒
              </button>
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="recurring"
                checked={formData.recurring}
                onChange={handleInputChange}
              />
              重复事件
            </label>
          </div>

          {formData.recurring && (
            <div className="recurring-options">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="recurringType">重复频率</label>
                  <select
                    id="recurringType"
                    name="recurringType"
                    value={formData.recurringType}
                    onChange={handleInputChange}
                  >
                    <option value="daily">每天</option>
                    <option value="weekly">每周</option>
                    <option value="monthly">每月</option>
                    <option value="yearly">每年</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="recurringEnd">重复结束</label>
                  <input
                    type="date"
                    id="recurringEnd"
                    name="recurringEnd"
                    value={formData.recurringEnd}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              取消
            </button>
            {event && onDelete && (
              <button type="button" className="btn-danger" onClick={handleDelete}>
                删除
              </button>
            )}
            <button type="submit" className="btn-primary">
              {event ? '更新' : '创建'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CalendarEvent