import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './ProcessMonitoring.css'

const AlertManagement = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  
  const [alerts, setAlerts] = useState([])
  const [alertRules, setAlertRules] = useState([])
  const [selectedSeverity, setSelectedSeverity] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [showEscalationModal, setShowEscalationModal] = useState(false)
  const [selectedAlerts, setSelectedAlerts] = useState([])

  // Mock data
  useEffect(() => {
    const mockAlerts = [
      {
        id: 'alert1',
        type: 'deadline_overdue',
        severity: 'high',
        title: '任务逾期警告',
        description: '学生王五的"周会汇报准备"已逾期2天',
        affectedEntity: 'student3',
        entityName: '王五',
        triggeredAt: '2024-12-18 08:00:00',
        status: 'active',
        escalated: false,
        responseTime: null,
        resolvedAt: null,
        actions: ['发送提醒', '联系导师', '上报领导']
      },
      {
        id: 'alert2',
        type: 'attendance_risk',
        severity: 'medium',
        title: '出勤风险预警',
        description: '学生李四连续缺席2次实验课程',
        affectedEntity: 'student2',
        entityName: '李四',
        triggeredAt: '2024-12-17 16:30:00',
        status: 'in_progress',
        escalated: false,
        responseTime: '2024-12-17 17:15:00',
        resolvedAt: null,
        actions: ['个别约谈', '家长联系']
      },
      {
        id: 'alert3',
        type: 'system_performance',
        severity: 'low',
        title: '系统性能异常',
        description: '提交系统响应时间超过5秒',
        affectedEntity: 'system',
        entityName: '提交系统',
        triggeredAt: '2024-12-18 14:20:00',
        status: 'resolved',
        escalated: false,
        responseTime: '2024-12-18 14:25:00',
        resolvedAt: '2024-12-18 14:45:00',
        actions: ['系统重启', '性能优化']
      },
      {
        id: 'alert4',
        type: 'resource_limit',
        severity: 'high',
        title: '存储空间不足',
        description: '课程文件存储空间使用率达到95%',
        affectedEntity: 'system',
        entityName: '存储系统',
        triggeredAt: '2024-12-18 10:15:00',
        status: 'escalated',
        escalated: true,
        responseTime: '2024-12-18 10:20:00',
        resolvedAt: null,
        actions: ['清理空间', '扩容申请', '技术支持']
      }
    ]

    const mockAlertRules = [
      {
        id: 'rule1',
        name: '任务逾期监控',
        type: 'deadline_overdue',
        enabled: true,
        threshold: '1天',
        severity: 'high',
        notificationChannels: ['email', 'system'],
        escalationTime: '2小时',
        description: '监控任务截止时间，逾期自动报警'
      },
      {
        id: 'rule2',
        name: '出勤异常监控',
        type: 'attendance_risk',
        enabled: true,
        threshold: '连续2次缺席',
        severity: 'medium',
        notificationChannels: ['email', 'sms'],
        escalationTime: '24小时',
        description: '监控学生出勤情况，异常时预警'
      },
      {
        id: 'rule3',
        name: '系统性能监控',
        type: 'system_performance',
        enabled: true,
        threshold: '响应时间>5秒',
        severity: 'low',
        notificationChannels: ['system'],
        escalationTime: '30分钟',
        description: '监控系统性能指标'
      }
    ]

    setAlerts(mockAlerts)
    setAlertRules(mockAlertRules)
  }, [])

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.entityName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus
    
    return matchesSearch && matchesSeverity && matchesStatus
  })

  const getSeverityBadge = (severity) => {
    const badges = {
      high: { text: '高', className: 'severity-high' },
      medium: { text: '中', className: 'severity-medium' },
      low: { text: '低', className: 'severity-low' }
    }
    return badges[severity] || badges.medium
  }

  const getStatusBadge = (status) => {
    const badges = {
      active: { text: '活跃', className: 'status-active' },
      in_progress: { text: '处理中', className: 'status-in-progress' },
      resolved: { text: '已解决', className: 'status-resolved' },
      escalated: { text: '已上报', className: 'status-escalated' }
    }
    return badges[status] || badges.active
  }

  const getAlertIcon = (type) => {
    const icons = {
      deadline_overdue: '⏰',
      attendance_risk: '👥',
      system_performance: '⚡',
      resource_limit: '💾',
      security_breach: '🔒',
      quality_issue: '📊'
    }
    return icons[type] || '⚠️'
  }

  const handleSelectAlert = (alertId) => {
    setSelectedAlerts(prev => 
      prev.includes(alertId) 
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    )
  }

  const handleSelectAll = () => {
    if (selectedAlerts.length === filteredAlerts.length) {
      setSelectedAlerts([])
    } else {
      setSelectedAlerts(filteredAlerts.map(alert => alert.id))
    }
  }

  const handleConfigureAlerts = () => {
    setShowConfigModal(true)
  }

  const handleEscalateAlerts = () => {
    setShowEscalationModal(true)
  }

  const handleResolveAlert = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved', resolvedAt: new Date().toISOString() }
        : alert
    ))
  }

  const getAlertStats = () => {
    const total = alerts.length
    const active = alerts.filter(a => a.status === 'active').length
    const escalated = alerts.filter(a => a.escalated).length
    const resolved = alerts.filter(a => a.status === 'resolved').length
    
    return { total, active, escalated, resolved }
  }

  const stats = getAlertStats()

  return (
    <Layout>
      <div className="process-monitoring-container">
        <div className="monitoring-header">
          <h1 className="page-title">过程监控与跟踪</h1>
          <div className="monitoring-nav">
            <button 
              className="nav-button"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/process-monitoring/task-completion`)}
            >
              任务完成监控
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/process-monitoring/submission-tracking`)}
            >
              提交跟踪管理
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/process-monitoring/attendance`)}
            >
              出勤参与监控
            </button>
            <button 
              className="nav-button active"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/process-monitoring/alerts`)}
            >
              预警系统管理
            </button>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🚨</div>
            <div className="stat-content">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">总预警数</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔴</div>
            <div className="stat-content">
              <div className="stat-number">{stats.active}</div>
              <div className="stat-label">活跃预警</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⬆️</div>
            <div className="stat-content">
              <div className="stat-number">{stats.escalated}</div>
              <div className="stat-label">已上报</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-number">{stats.resolved}</div>
              <div className="stat-label">已解决</div>
            </div>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div className="header-left">
              <h2 className="card-title">预警系统管理</h2>
              <div className="alert-stats">
                <span className="stat-item">已选择: {selectedAlerts.length}</span>
                <span className="stat-item">解决率: {Math.round((stats.resolved / stats.total) * 100)}%</span>
              </div>
            </div>
            <div className="header-actions">
              <button 
                className="action-button secondary"
                onClick={handleConfigureAlerts}
              >
                配置规则
              </button>
              <button 
                className="action-button primary"
                onClick={handleEscalateAlerts}
                disabled={selectedAlerts.length === 0}
              >
                批量上报
              </button>
            </div>
          </div>

          <div className="filters-section">
            <div className="search-group">
              <input
                type="text"
                placeholder="搜索预警标题、描述或影响对象..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-group">
              <select 
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="filter-select"
              >
                <option value="all">所有级别</option>
                <option value="high">高级别</option>
                <option value="medium">中级别</option>
                <option value="low">低级别</option>
              </select>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">所有状态</option>
                <option value="active">活跃</option>
                <option value="in_progress">处理中</option>
                <option value="resolved">已解决</option>
                <option value="escalated">已上报</option>
              </select>
            </div>
          </div>

          <div className="alert-table-container">
            <table className="alert-table">
              <thead>
                <tr>
                  <th className="checkbox-column">
                    <input
                      type="checkbox"
                      checked={selectedAlerts.length === filteredAlerts.length && filteredAlerts.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>预警信息</th>
                  <th>级别</th>
                  <th>影响对象</th>
                  <th>触发时间</th>
                  <th>状态</th>
                  <th>响应时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlerts.map(alert => {
                  const severityBadge = getSeverityBadge(alert.severity)
                  const statusBadge = getStatusBadge(alert.status)
                  const alertIcon = getAlertIcon(alert.type)
                  
                  return (
                    <tr key={alert.id} className={selectedAlerts.includes(alert.id) ? 'selected' : ''}>
                      <td className="checkbox-column">
                        <input
                          type="checkbox"
                          checked={selectedAlerts.includes(alert.id)}
                          onChange={() => handleSelectAlert(alert.id)}
                        />
                      </td>
                      <td className="alert-info">
                        <div className="alert-details">
                          <div className="alert-header">
                            <span className="alert-icon">{alertIcon}</span>
                            <span className="alert-title">{alert.title}</span>
                          </div>
                          <div className="alert-description">{alert.description}</div>
                          <div className="alert-type">{alert.type}</div>
                        </div>
                      </td>
                      <td className="severity-column">
                        <div className={`severity-badge ${severityBadge.className}`}>
                          {severityBadge.text}
                        </div>
                        {alert.escalated && (
                          <div className="escalated-indicator">已上报</div>
                        )}
                      </td>
                      <td className="entity-column">
                        <div className="entity-info">
                          <div className="entity-name">{alert.entityName}</div>
                          <div className="entity-type">{alert.affectedEntity}</div>
                        </div>
                      </td>
                      <td className="time-column">
                        <div className="time-info">
                          <div className="triggered-time">{alert.triggeredAt}</div>
                          {alert.resolvedAt && (
                            <div className="resolved-time">解决: {alert.resolvedAt}</div>
                          )}
                        </div>
                      </td>
                      <td className="status-column">
                        <div className={`status-badge ${statusBadge.className}`}>
                          {statusBadge.text}
                        </div>
                      </td>
                      <td className="response-column">
                        {alert.responseTime ? (
                          <div className="response-time">{alert.responseTime}</div>
                        ) : (
                          <div className="no-response">未响应</div>
                        )}
                      </td>
                      <td className="actions-column">
                        <div className="action-buttons">
                          <button className="action-btn view" title="查看详情">
                            👁️
                          </button>
                          {alert.status === 'active' && (
                            <button 
                              className="action-btn resolve" 
                              title="标记解决"
                              onClick={() => handleResolveAlert(alert.id)}
                            >
                              ✅
                            </button>
                          )}
                          {!alert.escalated && alert.severity === 'high' && (
                            <button className="action-btn escalate" title="立即上报">
                              ⬆️
                            </button>
                          )}
                          <button className="action-btn config" title="配置规则">
                            ⚙️
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredAlerts.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🚨</div>
              <div className="empty-title">暂无预警信息</div>
              <div className="empty-description">
                {searchTerm ? '没有找到匹配的预警' : '系统运行正常，无预警信息'}
              </div>
            </div>
          )}
        </div>

        {/* Alert Configuration Modal */}
        {showConfigModal && (
          <div className="modal-overlay">
            <div className="modal-content large">
              <div className="modal-header">
                <h3>预警规则配置</h3>
                <button className="close-button" onClick={() => setShowConfigModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="config-tabs">
                  <div className="tab active">现有规则</div>
                  <div className="tab">新建规则</div>
                </div>
                <div className="rules-list">
                  {alertRules.map(rule => (
                    <div key={rule.id} className="rule-item">
                      <div className="rule-header">
                        <div className="rule-name">{rule.name}</div>
                        <div className="rule-controls">
                          <label className="toggle-switch">
                            <input type="checkbox" checked={rule.enabled} />
                            <span className="slider"></span>
                          </label>
                        </div>
                      </div>
                      <div className="rule-details">
                        <div className="rule-info">
                          <span>阈值: {rule.threshold}</span>
                          <span>级别: {rule.severity}</span>
                          <span>上报时间: {rule.escalationTime}</span>
                        </div>
                        <div className="rule-description">{rule.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowConfigModal(false)}>
                  关闭
                </button>
                <button className="action-button primary">
                  保存配置
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Escalation Modal */}
        {showEscalationModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>预警上报处理</h3>
                <button className="close-button" onClick={() => setShowEscalationModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="escalation-info">
                  <p>将上报 {selectedAlerts.length} 个预警到相关负责人</p>
                </div>
                <div className="escalation-targets">
                  <label>上报对象:</label>
                  <div className="target-options">
                    <div className="target-option">
                      <input type="checkbox" id="dept-leader" defaultChecked />
                      <label htmlFor="dept-leader">院系领导</label>
                    </div>
                    <div className="target-option">
                      <input type="checkbox" id="tech-support" />
                      <label htmlFor="tech-support">技术支持</label>
                    </div>
                    <div className="target-option">
                      <input type="checkbox" id="academic-affairs" />
                      <label htmlFor="academic-affairs">教务处</label>
                    </div>
                  </div>
                </div>
                <div className="escalation-message">
                  <label>上报说明:</label>
                  <textarea 
                    className="escalation-textarea"
                    placeholder="描述预警情况和建议的处理方案..."
                    rows="4"
                  />
                </div>
                <div className="urgency-level">
                  <label>紧急程度:</label>
                  <select className="urgency-select">
                    <option value="normal">正常</option>
                    <option value="urgent">紧急</option>
                    <option value="critical">严重</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowEscalationModal(false)}>
                  取消
                </button>
                <button className="action-button primary">
                  立即上报
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default AlertManagement