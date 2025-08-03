import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Alerts.css'

const Alerts = () => {
  const { courseId } = useParams()
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      category: 'budget',
      title: '预算使用异常',
      description: '实验材料预算使用率已达到95%，建议立即审查剩余需求',
      timestamp: '2024-04-05T14:30:00Z',
      status: 'active',
      priority: 'high',
      affectedCount: 142,
      actionRequired: true,
      source: '财务系统',
      recommendations: [
        '审查剩余预算分配',
        '联系采购部门确认价格变动',
        '考虑调整实验方案'
      ]
    },
    {
      id: 2,
      type: 'warning',
      category: 'timeline',
      title: '进度偏差警告',
      description: '3个研究项目进度延迟超过5天，可能影响整体时间表',
      timestamp: '2024-04-05T10:15:00Z',
      status: 'active',
      priority: 'medium',
      affectedCount: 18,
      actionRequired: true,
      source: '项目监控系统',
      recommendations: [
        '与延迟项目导师沟通',
        '评估调整截止日期的可能性',
        '安排额外指导时间'
      ]
    },
    {
      id: 3,
      type: 'info',
      category: 'performance',
      title: '优异表现通知',
      description: '学生满意度评分达到4.8/5.0，创历史新高',
      timestamp: '2024-04-05T09:00:00Z',
      status: 'active',
      priority: 'low',
      affectedCount: 136,
      actionRequired: false,
      source: '评估系统',
      recommendations: [
        '总结成功经验',
        '准备表彰优秀教师',
        '分享最佳实践'
      ]
    },
    {
      id: 4,
      type: 'warning',
      category: 'resource',
      title: '设备使用冲突',
      description: '下周一实验设备预约冲突，涉及5个研究组',
      timestamp: '2024-04-04T16:45:00Z',
      status: 'active',
      priority: 'medium',
      affectedCount: 25,
      actionRequired: true,
      source: '设备管理系统',
      recommendations: [
        '协调使用时间安排',
        '考虑增加设备轮换',
        '联系相关导师协商'
      ]
    },
    {
      id: 5,
      type: 'critical',
      category: 'retention',
      title: '学生流失风险',
      description: '检测到4名学生参与度显著下降，存在退课风险',
      timestamp: '2024-04-04T13:20:00Z',
      status: 'acknowledged',
      priority: 'high',
      affectedCount: 4,
      actionRequired: true,
      source: '行为分析系统',
      recommendations: [
        '安排个别谈话',
        '评估学习困难原因',
        '提供额外支持'
      ]
    },
    {
      id: 6,
      type: 'warning',
      category: 'faculty',
      title: '教师工作量预警',
      description: '2位教师本周工作时间超过标准40%，需要关注',
      timestamp: '2024-04-04T11:10:00Z',
      status: 'resolved',
      priority: 'medium',
      affectedCount: 2,
      actionRequired: false,
      source: '人力资源系统',
      recommendations: [
        '调整工作分配',
        '提供临时助理',
        '评估长期解决方案'
      ]
    },
    {
      id: 7,
      type: 'info',
      category: 'compliance',
      title: '合规检查通过',
      description: '本月安全合规检查100%通过，所有实验室符合标准',
      timestamp: '2024-04-03T15:30:00Z',
      status: 'resolved',
      priority: 'low',
      affectedCount: 0,
      actionRequired: false,
      source: '安全管理系统',
      recommendations: [
        '维持当前安全标准',
        '准备下月检查',
        '更新安全培训材料'
      ]
    },
    {
      id: 8,
      type: 'critical',
      category: 'system',
      title: '系统性能异常',
      description: '学习管理系统响应时间超过3秒，影响用户体验',
      timestamp: '2024-04-03T12:00:00Z',
      status: 'resolved',
      priority: 'high',
      affectedCount: 300,
      actionRequired: false,
      source: '技术监控系统',
      recommendations: [
        '优化数据库查询',
        '增加服务器资源',
        '实施缓存策略'
      ]
    }
  ])

  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
    type: 'all'
  })

  const [sortBy, setSortBy] = useState('timestamp')
  const [sortOrder, setSortOrder] = useState('desc')
  const [selectedAlert, setSelectedAlert] = useState(null)

  const alertTypes = {
    critical: { label: '严重', color: '#F44336', icon: '⚠' },
    warning: { label: '警告', color: '#FF9800', icon: '⚡' },
    info: { label: '信息', color: '#2196F3', icon: 'ℹ' }
  }

  const alertCategories = {
    budget: '预算',
    timeline: '进度',
    performance: '表现',
    resource: '资源',
    retention: '保留',
    faculty: '教师',
    compliance: '合规',
    system: '系统'
  }

  const priorities = {
    high: '高',
    medium: '中',
    low: '低'
  }

  const statuses = {
    active: '活跃',
    acknowledged: '已确认',
    resolved: '已解决'
  }

  const filteredAndSortedAlerts = alerts
    .filter(alert => {
      return (filters.status === 'all' || alert.status === filters.status) &&
             (filters.priority === 'all' || alert.priority === filters.priority) &&
             (filters.category === 'all' || alert.category === filters.category) &&
             (filters.type === 'all' || alert.type === filters.type)
    })
    .sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]
      
      if (sortBy === 'timestamp') {
        aVal = new Date(aVal)
        bVal = new Date(bVal)
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

  const alertStats = {
    total: alerts.length,
    active: alerts.filter(a => a.status === 'active').length,
    critical: alerts.filter(a => a.type === 'critical' && a.status === 'active').length,
    needsAction: alerts.filter(a => a.actionRequired && a.status === 'active').length
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const handleAlertAction = (alertId, action) => {
    setAlerts(prev => prev.map(alert => {
      if (alert.id === alertId) {
        switch (action) {
          case 'acknowledge':
            return { ...alert, status: 'acknowledged' }
          case 'resolve':
            return { ...alert, status: 'resolved', actionRequired: false }
          case 'activate':
            return { ...alert, status: 'active' }
          default:
            return alert
        }
      }
      return alert
    }))
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) {
      return `${diffMins}分钟前`
    } else if (diffHours < 24) {
      return `${diffHours}小时前`
    } else if (diffDays < 7) {
      return `${diffDays}天前`
    } else {
      return date.toLocaleDateString('zh-CN')
    }
  }

  const exportAlerts = () => {
    const data = {
      courseId,
      alerts: filteredAndSortedAlerts,
      filters,
      stats: alertStats,
      timestamp: new Date().toISOString()
    }
    console.log('Exporting alerts report:', data)
  }

  return (
    <div className="alerts-container">
      <div className="alerts-header">
        <div className="header-left">
          <h1 className="page-title">战略警报与通知</h1>
          <p className="course-info">实验轮转课程 ID: {courseId}</p>
        </div>
        <div className="header-actions">
          <button onClick={exportAlerts} className="export-button">
            导出警报
          </button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="alert-stats">
        <div className="stat-card">
          <div className="stat-value">{alertStats.total}</div>
          <div className="stat-label">总警报数</div>
        </div>
        <div className="stat-card active">
          <div className="stat-value">{alertStats.active}</div>
          <div className="stat-label">活跃警报</div>
        </div>
        <div className="stat-card critical">
          <div className="stat-value">{alertStats.critical}</div>
          <div className="stat-label">严重警报</div>
        </div>
        <div className="stat-card action">
          <div className="stat-value">{alertStats.needsAction}</div>
          <div className="stat-label">需要处理</div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="alerts-controls">
        <div className="filters-section">
          <div className="filter-group">
            <label>状态:</label>
            <select 
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">全部</option>
              <option value="active">活跃</option>
              <option value="acknowledged">已确认</option>
              <option value="resolved">已解决</option>
            </select>
          </div>
          <div className="filter-group">
            <label>优先级:</label>
            <select 
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
            >
              <option value="all">全部</option>
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </div>
          <div className="filter-group">
            <label>分类:</label>
            <select 
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="all">全部</option>
              {Object.entries(alertCategories).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>类型:</label>
            <select 
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="all">全部</option>
              {Object.entries(alertTypes).map(([key, value]) => (
                <option key={key} value={key}>{value.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="sort-section">
          <div className="sort-group">
            <label>排序:</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="timestamp">时间</option>
              <option value="priority">优先级</option>
              <option value="type">类型</option>
            </select>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">降序</option>
              <option value="asc">升序</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="alerts-list">
        {filteredAndSortedAlerts.map(alert => (
          <div 
            key={alert.id} 
            className={`alert-card ${alert.type} ${alert.status} ${alert.actionRequired ? 'action-required' : ''}`}
            onClick={() => setSelectedAlert(alert)}
          >
            <div className="alert-header">
              <div className="alert-icon" style={{ color: alertTypes[alert.type].color }}>
                {alertTypes[alert.type].icon}
              </div>
              <div className="alert-info">
                <h3 className="alert-title">{alert.title}</h3>
                <div className="alert-meta">
                  <span className="alert-category">{alertCategories[alert.category]}</span>
                  <span className="alert-priority">{priorities[alert.priority]}</span>
                  <span className="alert-status">{statuses[alert.status]}</span>
                  <span className="alert-time">{formatTimestamp(alert.timestamp)}</span>
                </div>
              </div>
              <div className="alert-actions">
                {alert.status === 'active' && (
                  <>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAlertAction(alert.id, 'acknowledge')
                      }}
                      className="action-button acknowledge"
                    >
                      确认
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAlertAction(alert.id, 'resolve')
                      }}
                      className="action-button resolve"
                    >
                      解决
                    </button>
                  </>
                )}
                {alert.status === 'acknowledged' && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAlertAction(alert.id, 'resolve')
                    }}
                    className="action-button resolve"
                  >
                    解决
                  </button>
                )}
                {alert.status === 'resolved' && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAlertAction(alert.id, 'activate')
                    }}
                    className="action-button reopen"
                  >
                    重新打开
                  </button>
                )}
              </div>
            </div>
            <div className="alert-content">
              <p className="alert-description">{alert.description}</p>
              {alert.affectedCount > 0 && (
                <div className="alert-impact">
                  <span className="impact-label">影响范围:</span>
                  <span className="impact-count">{alert.affectedCount} 人</span>
                </div>
              )}
              <div className="alert-source">
                <span className="source-label">来源:</span>
                <span className="source-value">{alert.source}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedAlerts.length === 0 && (
        <div className="no-alerts">
          <div className="no-alerts-icon">🔔</div>
          <h3>暂无符合条件的警报</h3>
          <p>调整筛选条件以查看更多警报</p>
        </div>
      )}

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="alert-modal-overlay" onClick={() => setSelectedAlert(null)}>
          <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{selectedAlert.title}</h2>
              <button 
                className="modal-close"
                onClick={() => setSelectedAlert(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="modal-meta">
                <div className="meta-item">
                  <span className="meta-label">类型:</span>
                  <span className={`meta-value type-${selectedAlert.type}`}>
                    {alertTypes[selectedAlert.type].icon} {alertTypes[selectedAlert.type].label}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">分类:</span>
                  <span className="meta-value">{alertCategories[selectedAlert.category]}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">优先级:</span>
                  <span className={`meta-value priority-${selectedAlert.priority}`}>{priorities[selectedAlert.priority]}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">状态:</span>
                  <span className={`meta-value status-${selectedAlert.status}`}>{statuses[selectedAlert.status]}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">时间:</span>
                  <span className="meta-value">{new Date(selectedAlert.timestamp).toLocaleString('zh-CN')}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">来源:</span>
                  <span className="meta-value">{selectedAlert.source}</span>
                </div>
              </div>
              <div className="modal-description">
                <h3>详细描述</h3>
                <p>{selectedAlert.description}</p>
              </div>
              {selectedAlert.affectedCount > 0 && (
                <div className="modal-impact">
                  <h3>影响范围</h3>
                  <p>此警报影响 <strong>{selectedAlert.affectedCount}</strong> 名用户</p>
                </div>
              )}
              <div className="modal-recommendations">
                <h3>建议措施</h3>
                <ul>
                  {selectedAlert.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="modal-actions">
              {selectedAlert.status === 'active' && (
                <>
                  <button 
                    onClick={() => {
                      handleAlertAction(selectedAlert.id, 'acknowledge')
                      setSelectedAlert({...selectedAlert, status: 'acknowledged'})
                    }}
                    className="modal-button acknowledge"
                  >
                    确认警报
                  </button>
                  <button 
                    onClick={() => {
                      handleAlertAction(selectedAlert.id, 'resolve')
                      setSelectedAlert(null)
                    }}
                    className="modal-button resolve"
                  >
                    标记为已解决
                  </button>
                </>
              )}
              {selectedAlert.status === 'acknowledged' && (
                <button 
                  onClick={() => {
                    handleAlertAction(selectedAlert.id, 'resolve')
                    setSelectedAlert(null)
                  }}
                  className="modal-button resolve"
                >
                  标记为已解决
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Alerts