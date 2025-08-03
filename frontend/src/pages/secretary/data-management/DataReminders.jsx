import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../../components/Layout'
import '../course-management/lab-rotation/process-monitoring/ProcessMonitoring.css'

const DataReminders = () => {
  const navigate = useNavigate()
  
  const [reminders, setReminders] = useState([])
  const [reminderRules, setReminderRules] = useState([])
  const [notifications, setNotifications] = useState([])
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [showRuleModal, setShowRuleModal] = useState(false)
  const [activeTab, setActiveTab] = useState('reminders')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedReminders, setSelectedReminders] = useState([])

  // Mock data
  useEffect(() => {
    const mockReminders = [
      {
        id: 'reminder1',
        title: '成绩录入截止提醒',
        type: 'deadline',
        recipient: '所有任课教师',
        scheduledTime: '2024-12-15 09:00:00',
        content: '请在12月20日前完成本学期课程成绩录入工作',
        status: 'scheduled',
        priority: 'high',
        trigger: 'date_based',
        sentCount: 0,
        deliveryMethod: ['email', 'system']
      },
      {
        id: 'reminder2',
        title: '学生出勤率低警告',
        type: 'alert',
        recipient: '张明教授',
        scheduledTime: '2024-12-08 16:30:00',
        content: '学生李四近期出勤率较低（65%），建议关注',
        status: 'sent',
        priority: 'medium',
        trigger: 'condition_based',
        sentCount: 1,
        deliveryMethod: ['email']
      },
      {
        id: 'reminder3',
        title: '实验设备维护通知',
        type: 'maintenance',
        recipient: '实验室管理员',
        scheduledTime: '2024-12-10 14:00:00',
        content: '3号实验室显微镜需要定期维护检查',
        status: 'sent',
        priority: 'low',
        trigger: 'schedule_based',
        sentCount: 3,
        deliveryMethod: ['system', 'sms']
      },
      {
        id: 'reminder4',
        title: '学位论文提交提醒',
        type: 'deadline',
        recipient: '全体研究生',
        scheduledTime: '2024-12-20 10:00:00',
        content: '学位论文提交截止日期为12月25日，请及时准备',
        status: 'draft',
        priority: 'high',
        trigger: 'date_based',
        sentCount: 0,
        deliveryMethod: ['email', 'system']
      }
    ]

    const mockReminderRules = [
      {
        id: 'rule1',
        name: '出勤率监控',
        type: 'attendance',
        condition: '出勤率 < 70%',
        action: '发送警告通知',
        recipients: ['任课教师', '学生本人'],
        frequency: 'weekly',
        enabled: true,
        triggerCount: 12,
        lastTriggered: '2024-12-08 15:30:00'
      },
      {
        id: 'rule2',
        name: '作业逾期提醒',
        type: 'assignment',
        condition: '作业逾期 > 2天',
        action: '发送催交通知',
        recipients: ['学生本人', '任课教师'],
        frequency: 'daily',
        enabled: true,
        triggerCount: 25,
        lastTriggered: '2024-12-08 11:20:00'
      },
      {
        id: 'rule3',
        name: '成绩录入提醒',
        type: 'grading',
        condition: '距离截止时间 < 3天',
        action: '发送催促通知',
        recipients: ['任课教师'],
        frequency: 'daily',
        enabled: true,
        triggerCount: 8,
        lastTriggered: '2024-12-07 09:00:00'
      },
      {
        id: 'rule4',
        name: '设备故障报告',
        type: 'equipment',
        condition: '设备状态 = 故障',
        action: '发送维修通知',
        recipients: ['实验室管理员', '设备负责人'],
        frequency: 'immediate',
        enabled: false,
        triggerCount: 3,
        lastTriggered: '2024-12-05 14:20:00'
      }
    ]

    const mockNotifications = [
      {
        id: 'notif1',
        title: '提醒发送成功',
        message: '成绩录入截止提醒已发送给所有任课教师',
        type: 'success',
        timestamp: '2024-12-08 09:15:00',
        relatedReminder: 'reminder1'
      },
      {
        id: 'notif2',
        title: '自动规则触发',
        message: '出勤率监控规则检测到3名学生出勤率偏低',
        type: 'warning',
        timestamp: '2024-12-08 15:30:00',
        relatedReminder: 'rule1'
      },
      {
        id: 'notif3',
        title: '提醒发送失败',
        message: '实验设备维护通知发送失败：邮箱地址无效',
        type: 'error',
        timestamp: '2024-12-08 14:05:00',
        relatedReminder: 'reminder3'
      }
    ]

    setReminders(mockReminders)
    setReminderRules(mockReminderRules)
    setNotifications(mockNotifications)
  }, [])

  const getStatusBadge = (status) => {
    const badges = {
      scheduled: { text: '已安排', className: 'status-pending' },
      sent: { text: '已发送', className: 'status-completed' },
      draft: { text: '草稿', className: 'status-in-progress' },
      failed: { text: '发送失败', className: 'status-error' }
    }
    return badges[status] || badges.draft
  }

  const getPriorityBadge = (priority) => {
    const badges = {
      high: { text: '高', className: 'severity-high' },
      medium: { text: '中', className: 'severity-medium' },
      low: { text: '低', className: 'severity-low' }
    }
    return badges[priority] || badges.medium
  }

  const getTypeBadge = (type) => {
    const badges = {
      deadline: { text: '截止提醒', className: 'format-pdf' },
      alert: { text: '警告通知', className: 'format-other' },
      maintenance: { text: '维护通知', className: 'format-excel' },
      assignment: { text: '作业提醒', className: 'format-word' }
    }
    return badges[type] || badges.deadline
  }

  const getNotificationTypeBadge = (type) => {
    const badges = {
      success: { text: '成功', className: 'status-completed' },
      warning: { text: '警告', className: 'status-pending' },
      error: { text: '错误', className: 'status-error' }
    }
    return badges[type] || badges.success
  }

  const filteredReminders = reminders.filter(reminder => {
    if (filterStatus === 'all') return true
    return reminder.status === filterStatus
  })

  const getReminderStats = () => {
    const total = reminders.length
    const scheduled = reminders.filter(r => r.status === 'scheduled').length
    const sent = reminders.filter(r => r.status === 'sent').length
    const activeRules = reminderRules.filter(r => r.enabled).length
    
    return { total, scheduled, sent, activeRules }
  }

  const handleSelectReminder = (reminderId) => {
    setSelectedReminders(prev => 
      prev.includes(reminderId) 
        ? prev.filter(id => id !== reminderId)
        : [...prev, reminderId]
    )
  }

  const handleSelectAll = () => {
    if (selectedReminders.length === filteredReminders.length) {
      setSelectedReminders([])
    } else {
      setSelectedReminders(filteredReminders.map(r => r.id))
    }
  }

  const stats = getReminderStats()

  return (
    <Layout>
      <div className="process-monitoring-container">
        <div className="monitoring-header">
          <h1 className="page-title">提醒与通知管理</h1>
          <div className="monitoring-nav">
            <button 
              className="nav-button"
              onClick={() => navigate('/secretary/data-management/collection')}
            >
              数据收集
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate('/secretary/data-management/statistics')}
            >
              统计分析
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate('/secretary/data-management/reports')}
            >
              报告生成
            </button>
            <button 
              className="nav-button active"
              onClick={() => navigate('/secretary/data-management/reminders')}
            >
              提醒管理
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate('/secretary/data-management/export')}
            >
              数据导出
            </button>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🔔</div>
            <div className="stat-content">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">总提醒数</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-content">
              <div className="stat-number">{stats.scheduled}</div>
              <div className="stat-label">待发送</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-number">{stats.sent}</div>
              <div className="stat-label">已发送</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚙️</div>
            <div className="stat-content">
              <div className="stat-number">{stats.activeRules}</div>
              <div className="stat-label">活跃规则</div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="content-card">
          <div className="card-header">
            <div className="header-left">
              <h2 className="card-title">提醒管理中心</h2>
              {activeTab === 'reminders' && (
                <div className="task-stats">
                  <span className="stat-item">已选择: {selectedReminders.length}</span>
                </div>
              )}
            </div>
            <div className="header-actions">
              <button 
                className="action-button secondary"
                onClick={() => setShowRuleModal(true)}
              >
                自动规则
              </button>
              <button 
                className="action-button primary"
                onClick={() => setShowReminderModal(true)}
              >
                创建提醒
              </button>
            </div>
          </div>

          <div className="config-tabs">
            <div 
              className={`tab ${activeTab === 'reminders' ? 'active' : ''}`}
              onClick={() => setActiveTab('reminders')}
            >
              提醒列表
            </div>
            <div 
              className={`tab ${activeTab === 'rules' ? 'active' : ''}`}
              onClick={() => setActiveTab('rules')}
            >
              自动规则
            </div>
            <div 
              className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              通知日志
            </div>
          </div>

          {/* Reminders Tab */}
          {activeTab === 'reminders' && (
            <>
              <div className="filters-section">
                <div className="search-group">
                  <input
                    type="text"
                    placeholder="搜索提醒..."
                    className="search-input"
                  />
                </div>
                <div className="filter-group">
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">所有状态</option>
                    <option value="scheduled">已安排</option>
                    <option value="sent">已发送</option>
                    <option value="draft">草稿</option>
                    <option value="failed">发送失败</option>
                  </select>
                  {selectedReminders.length > 0 && (
                    <button className="action-button primary">
                      批量发送 ({selectedReminders.length})
                    </button>
                  )}
                </div>
              </div>
              
              <div className="task-table-container">
                <table className="task-table">
                  <thead>
                    <tr>
                      <th className="checkbox-column">
                        <input
                          type="checkbox"
                          checked={selectedReminders.length === filteredReminders.length && filteredReminders.length > 0}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>提醒信息</th>
                      <th>接收者</th>
                      <th>计划时间</th>
                      <th>状态</th>
                      <th>优先级</th>
                      <th>发送次数</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReminders.map(reminder => {
                      const statusBadge = getStatusBadge(reminder.status)
                      const priorityBadge = getPriorityBadge(reminder.priority)
                      const typeBadge = getTypeBadge(reminder.type)
                      
                      return (
                        <tr key={reminder.id} className={selectedReminders.includes(reminder.id) ? 'selected' : ''}>
                          <td className="checkbox-column">
                            <input
                              type="checkbox"
                              checked={selectedReminders.includes(reminder.id)}
                              onChange={() => handleSelectReminder(reminder.id)}
                            />
                          </td>
                          <td className="task-info">
                            <div className="task-details">
                              <div className="task-title">{reminder.title}</div>
                              <div className="task-type">
                                <span className={`format-badge ${typeBadge.className}`}>
                                  {typeBadge.text}
                                </span>
                              </div>
                              <div className="task-assigner">内容: {reminder.content.substring(0, 50)}...</div>
                            </div>
                          </td>
                          <td className="assignee">
                            {reminder.recipient}
                          </td>
                          <td className="due-date">
                            <div className="date-info">
                              <div className="due-date-value">{reminder.scheduledTime}</div>
                              <div className="submitted-date">
                                {reminder.deliveryMethod.join(', ')}
                              </div>
                            </div>
                          </td>
                          <td className="status-column">
                            <div className={`status-badge ${statusBadge.className}`}>
                              {statusBadge.text}
                            </div>
                          </td>
                          <td className="quality-column">
                            <div className={`severity-badge ${priorityBadge.className}`}>
                              {priorityBadge.text}
                            </div>
                          </td>
                          <td className="score-column">
                            <div className="score-display">{reminder.sentCount}</div>
                          </td>
                          <td className="actions-column">
                            <div className="action-buttons">
                              <button 
                                className="action-btn view" 
                                title="查看详情"
                                onClick={() => console.log('View reminder', reminder.id)}
                              >
                                👁️
                              </button>
                              <button 
                                className="action-btn config" 
                                title="编辑"
                                onClick={() => console.log('Edit reminder', reminder.id)}
                              >
                                ✏️
                              </button>
                              {reminder.status === 'scheduled' && (
                                <button 
                                  className="action-btn remind" 
                                  title="立即发送"
                                  onClick={() => console.log('Send now', reminder.id)}
                                >
                                  📤
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Rules Tab */}
          {activeTab === 'rules' && (
            <div className="rules-list">
              {reminderRules.map(rule => (
                <div key={rule.id} className="rule-item">
                  <div className="rule-header">
                    <div className="rule-name">{rule.name}</div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={rule.enabled}
                        onChange={() => console.log('Toggle rule', rule.id)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="rule-details">
                    <div className="rule-info">
                      <span>类型: {rule.type}</span>
                      <span>条件: {rule.condition}</span>
                      <span>频率: {rule.frequency}</span>
                      <span>触发次数: {rule.triggerCount}</span>
                    </div>
                    <div className="rule-description">
                      {rule.action} → {rule.recipients.join(', ')}
                    </div>
                    {rule.lastTriggered && (
                      <div className="task-assigner">
                        最后触发: {rule.lastTriggered}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="task-table-container">
              <table className="task-table">
                <thead>
                  <tr>
                    <th>通知信息</th>
                    <th>类型</th>
                    <th>时间</th>
                    <th>相关提醒</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map(notification => {
                    const typeBadge = getNotificationTypeBadge(notification.type)
                    
                    return (
                      <tr key={notification.id}>
                        <td className="task-info">
                          <div className="task-details">
                            <div className="task-title">{notification.title}</div>
                            <div className="task-assigner">{notification.message}</div>
                          </div>
                        </td>
                        <td className="status-column">
                          <div className={`status-badge ${typeBadge.className}`}>
                            {typeBadge.text}
                          </div>
                        </td>
                        <td className="due-date">
                          <div className="date-info">
                            <div className="due-date-value">{notification.timestamp}</div>
                          </div>
                        </td>
                        <td className="assignee">
                          {notification.relatedReminder}
                        </td>
                        <td className="actions-column">
                          <div className="action-buttons">
                            <button 
                              className="action-btn view" 
                              title="查看详情"
                              onClick={() => console.log('View notification', notification.id)}
                            >
                              👁️
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {((activeTab === 'reminders' && filteredReminders.length === 0) ||
            (activeTab === 'rules' && reminderRules.length === 0) ||
            (activeTab === 'notifications' && notifications.length === 0)) && (
            <div className="empty-state">
              <div className="empty-icon">🔔</div>
              <div className="empty-title">暂无数据</div>
              <div className="empty-description">
                {activeTab === 'reminders' ? '暂无提醒记录' :
                 activeTab === 'rules' ? '暂无自动规则' : '暂无通知日志'}
              </div>
            </div>
          )}
        </div>

        {/* Create Reminder Modal */}
        {showReminderModal && (
          <div className="modal-overlay">
            <div className="modal-content large">
              <div className="modal-header">
                <h3>创建提醒</h3>
                <button className="close-button" onClick={() => setShowReminderModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="reminder-content">
                  <label>提醒标题:</label>
                  <input 
                    type="text"
                    className="search-input"
                    placeholder="输入提醒标题..."
                  />
                </div>
                <div className="reminder-content">
                  <label>提醒类型:</label>
                  <select className="template-select">
                    <option value="deadline">截止提醒</option>
                    <option value="alert">警告通知</option>
                    <option value="maintenance">维护通知</option>
                    <option value="assignment">作业提醒</option>
                  </select>
                </div>
                <div className="reminder-content">
                  <label>优先级:</label>
                  <select className="template-select">
                    <option value="high">高</option>
                    <option value="medium">中</option>
                    <option value="low">低</option>
                  </select>
                </div>
                <div className="reminder-content">
                  <label>接收者:</label>
                  <input 
                    type="text"
                    className="search-input"
                    placeholder="输入接收者（支持角色或具体人员）..."
                  />
                </div>
                <div className="reminder-content">
                  <label>发送时间:</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                      type="date"
                      className="search-input"
                      style={{ flex: 1 }}
                    />
                    <input 
                      type="time"
                      className="search-input"
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>
                <div className="reminder-content">
                  <label>发送方式:</label>
                  <div className="issue-options">
                    <div className="issue-option">
                      <input type="checkbox" id="delivery_email" defaultChecked />
                      <label htmlFor="delivery_email">邮件</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="delivery_system" defaultChecked />
                      <label htmlFor="delivery_system">系统通知</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="delivery_sms" />
                      <label htmlFor="delivery_sms">短信</label>
                    </div>
                  </div>
                </div>
                <div className="reminder-content">
                  <label>提醒内容:</label>
                  <textarea 
                    className="reminder-textarea"
                    placeholder="输入提醒内容..."
                    rows="4"
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowReminderModal(false)}>
                  取消
                </button>
                <button className="action-button secondary">
                  保存草稿
                </button>
                <button className="action-button primary">
                  立即发送
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Rule Modal */}
        {showRuleModal && (
          <div className="modal-overlay">
            <div className="modal-content large">
              <div className="modal-header">
                <h3>配置自动规则</h3>
                <button className="close-button" onClick={() => setShowRuleModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="reminder-content">
                  <label>规则名称:</label>
                  <input 
                    type="text"
                    className="search-input"
                    placeholder="输入规则名称..."
                  />
                </div>
                <div className="reminder-content">
                  <label>监控类型:</label>
                  <select className="template-select">
                    <option value="attendance">出勤率</option>
                    <option value="assignment">作业提交</option>
                    <option value="grading">成绩录入</option>
                    <option value="equipment">设备状态</option>
                  </select>
                </div>
                <div className="reminder-content">
                  <label>触发条件:</label>
                  <input 
                    type="text"
                    className="search-input"
                    placeholder="例如：出勤率 < 70%"
                  />
                </div>
                <div className="reminder-content">
                  <label>检查频率:</label>
                  <select className="template-select">
                    <option value="immediate">立即</option>
                    <option value="hourly">每小时</option>
                    <option value="daily">每天</option>
                    <option value="weekly">每周</option>
                  </select>
                </div>
                <div className="reminder-content">
                  <label>通知接收者:</label>
                  <div className="issue-options">
                    <div className="issue-option">
                      <input type="checkbox" id="rule_students" />
                      <label htmlFor="rule_students">学生本人</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="rule_teachers" />
                      <label htmlFor="rule_teachers">任课教师</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="rule_admin" />
                      <label htmlFor="rule_admin">教务管理员</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="rule_lab" />
                      <label htmlFor="rule_lab">实验室管理员</label>
                    </div>
                  </div>
                </div>
                <div className="reminder-content">
                  <label>执行动作:</label>
                  <textarea 
                    className="reminder-textarea"
                    placeholder="描述触发条件时执行的动作..."
                    rows="3"
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowRuleModal(false)}>
                  取消
                </button>
                <button className="action-button primary">
                  保存规则
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default DataReminders