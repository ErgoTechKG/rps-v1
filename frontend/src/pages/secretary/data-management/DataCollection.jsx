import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../../components/Layout'
import '../course-management/lab-rotation/process-monitoring/ProcessMonitoring.css'

const DataCollection = () => {
  const navigate = useNavigate()
  
  const [syncJobs, setSyncJobs] = useState([])
  const [manualEntries, setManualEntries] = useState([])
  const [validationRules, setValidationRules] = useState([])
  const [showSyncModal, setShowSyncModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [selectedSource, setSelectedSource] = useState('')
  const [importFile, setImportFile] = useState(null)
  const [activeTab, setActiveTab] = useState('sync')

  // Mock data
  useEffect(() => {
    const mockSyncJobs = [
      {
        id: 'sync1',
        name: '学生注册数据同步',
        source: 'university_registrar',
        status: 'active',
        lastSync: '2024-12-08 14:30:00',
        nextSync: '2024-12-08 18:00:00',
        recordCount: 1250,
        errorCount: 0,
        schedule: 'every_4_hours'
      },
      {
        id: 'sync2',
        name: '教师信息同步',
        source: 'faculty_database',
        status: 'active',
        lastSync: '2024-12-08 12:00:00',
        nextSync: '2024-12-09 12:00:00',
        recordCount: 89,
        errorCount: 2,
        schedule: 'daily'
      },
      {
        id: 'sync3',
        name: '课程活动数据',
        source: 'lms_system',
        status: 'error',
        lastSync: '2024-12-08 10:15:00',
        nextSync: '2024-12-08 16:15:00',
        recordCount: 0,
        errorCount: 15,
        schedule: 'every_6_hours'
      },
      {
        id: 'sync4',
        name: '成绩数据同步',
        source: 'assessment_system',
        status: 'paused',
        lastSync: '2024-12-07 23:30:00',
        nextSync: null,
        recordCount: 456,
        errorCount: 3,
        schedule: 'hourly'
      }
    ]

    const mockManualEntries = [
      {
        id: 'manual1',
        type: 'student_info',
        title: '新生入学信息补录',
        operator: '王秘书',
        timestamp: '2024-12-08 13:45:00',
        recordCount: 15,
        status: 'completed',
        source: 'Excel导入'
      },
      {
        id: 'manual2',
        type: 'professor_profile',
        title: '教师研究方向更新',
        operator: '李秘书',
        timestamp: '2024-12-08 11:20:00',
        recordCount: 8,
        status: 'pending_validation',
        source: '手动录入'
      },
      {
        id: 'manual3',
        type: 'course_metadata',
        title: '课程学分信息修正',
        operator: '王秘书',
        timestamp: '2024-12-08 09:30:00',
        recordCount: 3,
        status: 'error',
        source: 'CSV导入'
      }
    ]

    const mockValidationRules = [
      {
        id: 'rule1',
        name: '学号格式验证',
        type: 'format',
        field: 'student_id',
        rule: '^\\d{10}$',
        enabled: true,
        errorCount: 2
      },
      {
        id: 'rule2',
        name: '邮箱格式验证',
        type: 'format',
        field: 'email',
        rule: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
        enabled: true,
        errorCount: 0
      },
      {
        id: 'rule3',
        name: '成绩范围验证',
        type: 'range',
        field: 'score',
        rule: '0-100',
        enabled: true,
        errorCount: 5
      },
      {
        id: 'rule4',
        name: '重复学号检测',
        type: 'uniqueness',
        field: 'student_id',
        rule: 'unique_per_semester',
        enabled: true,
        errorCount: 1
      }
    ]

    setSyncJobs(mockSyncJobs)
    setManualEntries(mockManualEntries)
    setValidationRules(mockValidationRules)
  }, [])

  const getStatusBadge = (status) => {
    const badges = {
      active: { text: '运行中', className: 'status-completed' },
      paused: { text: '已暂停', className: 'status-pending' },
      error: { text: '错误', className: 'status-error' },
      completed: { text: '已完成', className: 'status-completed' },
      pending_validation: { text: '待验证', className: 'status-pending' }
    }
    return badges[status] || badges.active
  }

  const getSyncStats = () => {
    const active = syncJobs.filter(job => job.status === 'active').length
    const errors = syncJobs.filter(job => job.status === 'error').length
    const totalRecords = syncJobs.reduce((sum, job) => sum + job.recordCount, 0)
    const totalErrors = syncJobs.reduce((sum, job) => sum + job.errorCount, 0)
    
    return { active, errors, totalRecords, totalErrors }
  }

  const handleRunSync = (jobId) => {
    console.log('Running sync for job:', jobId)
  }

  const handlePauseSync = (jobId) => {
    console.log('Pausing sync for job:', jobId)
  }

  const handleConfigureSync = (jobId) => {
    setSelectedSource(jobId)
    setShowSyncModal(true)
  }

  const handleImportFile = () => {
    setShowImportModal(true)
  }

  const stats = getSyncStats()

  return (
    <Layout>
      <div className="process-monitoring-container">
        <div className="monitoring-header">
          <h1 className="page-title">数据收集与管理</h1>
          <div className="monitoring-nav">
            <button 
              className="nav-button active"
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
              className="nav-button"
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
            <div className="stat-icon">🔄</div>
            <div className="stat-content">
              <div className="stat-number">{stats.active}</div>
              <div className="stat-label">活跃同步任务</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-number">{stats.totalRecords.toLocaleString()}</div>
              <div className="stat-label">总记录数</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <div className="stat-number">{stats.errors}</div>
              <div className="stat-label">错误任务</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔍</div>
            <div className="stat-content">
              <div className="stat-number">{stats.totalErrors}</div>
              <div className="stat-label">数据错误</div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="content-card">
          <div className="card-header">
            <div className="header-left">
              <h2 className="card-title">数据收集管理</h2>
            </div>
            <div className="header-actions">
              <button 
                className="action-button secondary"
                onClick={handleImportFile}
              >
                导入数据
              </button>
              <button 
                className="action-button primary"
                onClick={() => setShowSyncModal(true)}
              >
                新建同步任务
              </button>
            </div>
          </div>

          <div className="config-tabs">
            <div 
              className={`tab ${activeTab === 'sync' ? 'active' : ''}`}
              onClick={() => setActiveTab('sync')}
            >
              自动同步
            </div>
            <div 
              className={`tab ${activeTab === 'manual' ? 'active' : ''}`}
              onClick={() => setActiveTab('manual')}
            >
              手动录入
            </div>
            <div 
              className={`tab ${activeTab === 'validation' ? 'active' : ''}`}
              onClick={() => setActiveTab('validation')}
            >
              数据验证
            </div>
          </div>

          {/* Sync Jobs Tab */}
          {activeTab === 'sync' && (
            <div className="task-table-container">
              <table className="task-table">
                <thead>
                  <tr>
                    <th>同步任务</th>
                    <th>数据源</th>
                    <th>状态</th>
                    <th>最后同步</th>
                    <th>下次同步</th>
                    <th>记录数</th>
                    <th>错误数</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {syncJobs.map(job => {
                    const statusBadge = getStatusBadge(job.status)
                    
                    return (
                      <tr key={job.id}>
                        <td className="task-info">
                          <div className="task-details">
                            <div className="task-title">{job.name}</div>
                            <div className="task-type">调度: {job.schedule}</div>
                          </div>
                        </td>
                        <td className="assignee">
                          {job.source}
                        </td>
                        <td className="status-column">
                          <div className={`status-badge ${statusBadge.className}`}>
                            {statusBadge.text}
                          </div>
                        </td>
                        <td className="due-date">
                          <div className="date-info">
                            <div className="due-date-value">{job.lastSync}</div>
                          </div>
                        </td>
                        <td className="due-date">
                          <div className="date-info">
                            <div className="due-date-value">{job.nextSync || '已暂停'}</div>
                          </div>
                        </td>
                        <td className="score-column">
                          <div className="score-display">{job.recordCount.toLocaleString()}</div>
                        </td>
                        <td className="score-column">
                          {job.errorCount > 0 ? (
                            <div className="score-pending">{job.errorCount}</div>
                          ) : (
                            <div className="score-display">0</div>
                          )}
                        </td>
                        <td className="actions-column">
                          <div className="action-buttons">
                            <button 
                              className="action-btn view" 
                              title="查看日志"
                              onClick={() => console.log('View logs for', job.id)}
                            >
                              📋
                            </button>
                            {job.status === 'active' ? (
                              <button 
                                className="action-btn escalate" 
                                title="暂停同步"
                                onClick={() => handlePauseSync(job.id)}
                              >
                                ⏸️
                              </button>
                            ) : (
                              <button 
                                className="action-btn remind" 
                                title="启动同步"
                                onClick={() => handleRunSync(job.id)}
                              >
                                ▶️
                              </button>
                            )}
                            <button 
                              className="action-btn config" 
                              title="配置"
                              onClick={() => handleConfigureSync(job.id)}
                            >
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
          )}

          {/* Manual Entries Tab */}
          {activeTab === 'manual' && (
            <div className="task-table-container">
              <table className="task-table">
                <thead>
                  <tr>
                    <th>录入任务</th>
                    <th>操作人员</th>
                    <th>时间</th>
                    <th>记录数</th>
                    <th>状态</th>
                    <th>数据源</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {manualEntries.map(entry => {
                    const statusBadge = getStatusBadge(entry.status)
                    
                    return (
                      <tr key={entry.id}>
                        <td className="task-info">
                          <div className="task-details">
                            <div className="task-title">{entry.title}</div>
                            <div className="task-type">类型: {entry.type}</div>
                          </div>
                        </td>
                        <td className="assignee">
                          {entry.operator}
                        </td>
                        <td className="due-date">
                          <div className="date-info">
                            <div className="due-date-value">{entry.timestamp}</div>
                          </div>
                        </td>
                        <td className="score-column">
                          <div className="score-display">{entry.recordCount}</div>
                        </td>
                        <td className="status-column">
                          <div className={`status-badge ${statusBadge.className}`}>
                            {statusBadge.text}
                          </div>
                        </td>
                        <td className="assignee">
                          {entry.source}
                        </td>
                        <td className="actions-column">
                          <div className="action-buttons">
                            <button className="action-btn view" title="查看详情">
                              👁️
                            </button>
                            <button className="action-btn download" title="下载">
                              💾
                            </button>
                            {entry.status === 'error' && (
                              <button className="action-btn fix" title="修复">
                                🔧
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
          )}

          {/* Validation Rules Tab */}
          {activeTab === 'validation' && (
            <div className="rules-list">
              {validationRules.map(rule => (
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
                      <span>字段: {rule.field}</span>
                      <span>规则: {rule.rule}</span>
                      <span>错误数: {rule.errorCount}</span>
                    </div>
                    <div className="rule-description">
                      验证 {rule.field} 字段的 {rule.type} 规则
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(activeTab === 'sync' && syncJobs.length === 0) ||
           (activeTab === 'manual' && manualEntries.length === 0) ||
           (activeTab === 'validation' && validationRules.length === 0) ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <div className="empty-title">暂无数据</div>
              <div className="empty-description">
                尚未配置相关数据收集规则
              </div>
            </div>
          ) : null}
        </div>

        {/* Sync Configuration Modal */}
        {showSyncModal && (
          <div className="modal-overlay">
            <div className="modal-content large">
              <div className="modal-header">
                <h3>配置数据同步</h3>
                <button className="close-button" onClick={() => setShowSyncModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="reminder-content">
                  <label>数据源类型:</label>
                  <select className="template-select">
                    <option value="">选择数据源</option>
                    <option value="university_registrar">学校注册系统</option>
                    <option value="faculty_database">教师数据库</option>
                    <option value="lms_system">学习管理系统</option>
                    <option value="assessment_system">评估系统</option>
                    <option value="external_api">外部API</option>
                  </select>
                </div>
                <div className="reminder-content">
                  <label>同步名称:</label>
                  <input 
                    type="text"
                    className="search-input"
                    placeholder="输入同步任务名称..."
                  />
                </div>
                <div className="reminder-content">
                  <label>同步频率:</label>
                  <select className="template-select">
                    <option value="hourly">每小时</option>
                    <option value="every_4_hours">每4小时</option>
                    <option value="every_6_hours">每6小时</option>
                    <option value="daily">每天</option>
                    <option value="weekly">每周</option>
                  </select>
                </div>
                <div className="reminder-content">
                  <label>连接配置:</label>
                  <textarea 
                    className="reminder-textarea"
                    placeholder="输入数据源连接配置..."
                    rows="6"
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowSyncModal(false)}>
                  取消
                </button>
                <button className="action-button primary">
                  保存配置
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Import Modal */}
        {showImportModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>导入数据文件</h3>
                <button className="close-button" onClick={() => setShowImportModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="reminder-content">
                  <label>数据类型:</label>
                  <select className="template-select">
                    <option value="">选择数据类型</option>
                    <option value="student_info">学生信息</option>
                    <option value="professor_profile">教师资料</option>
                    <option value="course_metadata">课程元数据</option>
                    <option value="grade_data">成绩数据</option>
                  </select>
                </div>
                <div className="reminder-content">
                  <label>文件格式:</label>
                  <select className="template-select">
                    <option value="excel">Excel (.xlsx)</option>
                    <option value="csv">CSV (.csv)</option>
                    <option value="json">JSON (.json)</option>
                  </select>
                </div>
                <div className="reminder-content">
                  <label>选择文件:</label>
                  <input 
                    type="file"
                    accept=".xlsx,.csv,.json"
                    className="search-input"
                    onChange={(e) => setImportFile(e.target.files[0])}
                  />
                </div>
                <div className="reminder-info">
                  <p>支持的文件格式: Excel (.xlsx), CSV (.csv), JSON (.json)</p>
                  <p>文件大小限制: 50MB</p>
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowImportModal(false)}>
                  取消
                </button>
                <button className="action-button primary" disabled={!importFile}>
                  导入数据
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default DataCollection