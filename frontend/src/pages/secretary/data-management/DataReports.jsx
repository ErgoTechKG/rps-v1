import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../../components/Layout'
import '../course-management/lab-rotation/process-monitoring/ProcessMonitoring.css'

const DataReports = () => {
  const navigate = useNavigate()
  
  const [reportTemplates, setReportTemplates] = useState([])
  const [generatedReports, setGeneratedReports] = useState([])
  const [scheduledReports, setScheduledReports] = useState([])
  const [showReportModal, setShowReportModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [activeTab, setActiveTab] = useState('templates')
  const [reportFilter, setReportFilter] = useState('all')

  // Mock data
  useEffect(() => {
    const mockTemplates = [
      {
        id: 'template1',
        name: '学生成绩报告',
        category: 'academic',
        description: '包含学生成绩分布、通过率、优秀率等统计信息',
        format: 'PDF',
        audience: '教务处',
        fields: ['学号', '姓名', '课程', '成绩', '等级'],
        lastUsed: '2024-12-08',
        usageCount: 45
      },
      {
        id: 'template2',
        name: '课程参与度分析',
        category: 'engagement',
        description: '分析学生课程参与度、出勤率、作业提交情况',
        format: 'Excel',
        audience: '院系领导',
        fields: ['课程名称', '参与人数', '出勤率', '作业完成率'],
        lastUsed: '2024-12-07',
        usageCount: 32
      },
      {
        id: 'template3',
        name: '教师工作量统计',
        category: 'workload',
        description: '统计教师课程负担、指导学生数量、研究项目等',
        format: 'PDF',
        audience: '人事处',
        fields: ['教师姓名', '课程数量', '学生数量', '工作时长'],
        lastUsed: '2024-12-06',
        usageCount: 28
      },
      {
        id: 'template4',
        name: '实验室使用报告',
        category: 'resource',
        description: '实验室预约、使用率、设备状况统计',
        format: 'Excel',
        audience: '实验室管理处',
        fields: ['实验室名称', '使用率', '预约次数', '设备状态'],
        lastUsed: '2024-12-05',
        usageCount: 18
      }
    ]

    const mockGeneratedReports = [
      {
        id: 'report1',
        title: '2024年12月第一周学生成绩报告',
        template: 'template1',
        generatedBy: '王秘书',
        generatedAt: '2024-12-08 15:30:00',
        fileSize: '2.5MB',
        format: 'PDF',
        status: 'completed',
        downloadCount: 12,
        recipients: ['教务处', '院系领导']
      },
      {
        id: 'report2',
        title: '课程参与度月度分析报告',
        template: 'template2',
        generatedBy: '李秘书',
        generatedAt: '2024-12-08 11:45:00',
        fileSize: '1.8MB',
        format: 'Excel',
        status: 'completed',
        downloadCount: 8,
        recipients: ['院系领导']
      },
      {
        id: 'report3',
        title: '教师工作量统计（季度）',
        template: 'template3',
        generatedBy: '王秘书',
        generatedAt: '2024-12-08 09:20:00',
        fileSize: '3.1MB',
        format: 'PDF',
        status: 'generating',
        downloadCount: 0,
        recipients: ['人事处', '院系领导']
      }
    ]

    const mockScheduledReports = [
      {
        id: 'schedule1',
        template: 'template1',
        name: '每周学生成绩报告',
        frequency: 'weekly',
        nextRun: '2024-12-15 09:00:00',
        lastRun: '2024-12-08 09:00:00',
        status: 'active',
        recipients: ['教务处'],
        format: 'PDF'
      },
      {
        id: 'schedule2',
        template: 'template2',
        name: '月度参与度分析',
        frequency: 'monthly',
        nextRun: '2025-01-01 10:00:00',
        lastRun: '2024-12-01 10:00:00',
        status: 'active',
        recipients: ['院系领导', '教务处'],
        format: 'Excel'
      },
      {
        id: 'schedule3',
        template: 'template4',
        name: '实验室使用周报',
        frequency: 'weekly',
        nextRun: '2024-12-15 16:00:00',
        lastRun: '2024-12-08 16:00:00',
        status: 'paused',
        recipients: ['实验室管理处'],
        format: 'Excel'
      }
    ]

    setReportTemplates(mockTemplates)
    setGeneratedReports(mockGeneratedReports)
    setScheduledReports(mockScheduledReports)
  }, [])

  const getStatusBadge = (status) => {
    const badges = {
      completed: { text: '已完成', className: 'status-completed' },
      generating: { text: '生成中', className: 'status-in-progress' },
      error: { text: '生成失败', className: 'status-error' },
      active: { text: '运行中', className: 'status-completed' },
      paused: { text: '已暂停', className: 'status-pending' }
    }
    return badges[status] || badges.completed
  }

  const getCategoryBadge = (category) => {
    const badges = {
      academic: { text: '学术', className: 'quality-excellent' },
      engagement: { text: '参与度', className: 'quality-good' },
      workload: { text: '工作量', className: 'quality-fair' },
      resource: { text: '资源', className: 'quality-poor' }
    }
    return badges[category] || badges.academic
  }

  const getFormatBadge = (format) => {
    const badges = {
      PDF: { text: 'PDF', className: 'format-pdf' },
      Excel: { text: 'Excel', className: 'format-excel' },
      Word: { text: 'Word', className: 'format-word' },
      CSV: { text: 'CSV', className: 'format-other' }
    }
    return badges[format] || badges.PDF
  }

  const filteredReports = generatedReports.filter(report => {
    if (reportFilter === 'all') return true
    return report.status === reportFilter
  })

  const getReportStats = () => {
    const total = generatedReports.length
    const completed = generatedReports.filter(r => r.status === 'completed').length
    const generating = generatedReports.filter(r => r.status === 'generating').length
    const totalDownloads = generatedReports.reduce((sum, r) => sum + r.downloadCount, 0)
    
    return { total, completed, generating, totalDownloads }
  }

  const stats = getReportStats()

  return (
    <Layout>
      <div className="process-monitoring-container">
        <div className="monitoring-header">
          <h1 className="page-title">报告生成与管理</h1>
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
              className="nav-button active"
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
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-number">{reportTemplates.length}</div>
              <div className="stat-label">报告模板</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📄</div>
            <div className="stat-content">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">生成报告</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <div className="stat-number">{scheduledReports.filter(s => s.status === 'active').length}</div>
              <div className="stat-label">定时任务</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💾</div>
            <div className="stat-content">
              <div className="stat-number">{stats.totalDownloads}</div>
              <div className="stat-label">下载次数</div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="content-card">
          <div className="card-header">
            <div className="header-left">
              <h2 className="card-title">报告管理中心</h2>
            </div>
            <div className="header-actions">
              <button 
                className="action-button secondary"
                onClick={() => setShowScheduleModal(true)}
              >
                定时报告
              </button>
              <button 
                className="action-button primary"
                onClick={() => setShowReportModal(true)}
              >
                生成报告
              </button>
            </div>
          </div>

          <div className="config-tabs">
            <div 
              className={`tab ${activeTab === 'templates' ? 'active' : ''}`}
              onClick={() => setActiveTab('templates')}
            >
              报告模板
            </div>
            <div 
              className={`tab ${activeTab === 'generated' ? 'active' : ''}`}
              onClick={() => setActiveTab('generated')}
            >
              已生成报告
            </div>
            <div 
              className={`tab ${activeTab === 'scheduled' ? 'active' : ''}`}
              onClick={() => setActiveTab('scheduled')}
            >
              定时任务
            </div>
          </div>

          {/* Report Templates Tab */}
          {activeTab === 'templates' && (
            <div className="task-table-container">
              <table className="task-table">
                <thead>
                  <tr>
                    <th>模板信息</th>
                    <th>类别</th>
                    <th>格式</th>
                    <th>目标受众</th>
                    <th>最后使用</th>
                    <th>使用次数</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {reportTemplates.map(template => {
                    const categoryBadge = getCategoryBadge(template.category)
                    const formatBadge = getFormatBadge(template.format)
                    
                    return (
                      <tr key={template.id}>
                        <td className="task-info">
                          <div className="task-details">
                            <div className="task-title">{template.name}</div>
                            <div className="task-type">{template.description}</div>
                          </div>
                        </td>
                        <td className="quality-column">
                          <div className={`quality-badge ${categoryBadge.className}`}>
                            {categoryBadge.text}
                          </div>
                        </td>
                        <td className="quality-column">
                          <div className={`format-badge ${formatBadge.className}`}>
                            {formatBadge.text}
                          </div>
                        </td>
                        <td className="assignee">
                          {template.audience}
                        </td>
                        <td className="due-date">
                          <div className="date-info">
                            <div className="due-date-value">{template.lastUsed}</div>
                          </div>
                        </td>
                        <td className="score-column">
                          <div className="score-display">{template.usageCount}</div>
                        </td>
                        <td className="actions-column">
                          <div className="action-buttons">
                            <button 
                              className="action-btn view" 
                              title="预览模板"
                              onClick={() => console.log('Preview template', template.id)}
                            >
                              👁️
                            </button>
                            <button 
                              className="action-btn remind" 
                              title="生成报告"
                              onClick={() => {
                                setSelectedTemplate(template.id)
                                setShowReportModal(true)
                              }}
                            >
                              📄
                            </button>
                            <button 
                              className="action-btn config" 
                              title="编辑模板"
                              onClick={() => console.log('Edit template', template.id)}
                            >
                              ✏️
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

          {/* Generated Reports Tab */}
          {activeTab === 'generated' && (
            <>
              <div className="filters-section">
                <div className="search-group">
                  <input
                    type="text"
                    placeholder="搜索报告..."
                    className="search-input"
                  />
                </div>
                <div className="filter-group">
                  <select 
                    value={reportFilter}
                    onChange={(e) => setReportFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">所有状态</option>
                    <option value="completed">已完成</option>
                    <option value="generating">生成中</option>
                    <option value="error">生成失败</option>
                  </select>
                </div>
              </div>
              
              <div className="task-table-container">
                <table className="task-table">
                  <thead>
                    <tr>
                      <th>报告信息</th>
                      <th>生成者</th>
                      <th>生成时间</th>
                      <th>文件大小</th>
                      <th>状态</th>
                      <th>下载次数</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map(report => {
                      const statusBadge = getStatusBadge(report.status)
                      const formatBadge = getFormatBadge(report.format)
                      
                      return (
                        <tr key={report.id}>
                          <td className="task-info">
                            <div className="task-details">
                              <div className="task-title">{report.title}</div>
                              <div className="task-type">
                                <span className={`format-badge ${formatBadge.className}`}>
                                  {formatBadge.text}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="assignee">
                            {report.generatedBy}
                          </td>
                          <td className="due-date">
                            <div className="date-info">
                              <div className="due-date-value">{report.generatedAt}</div>
                            </div>
                          </td>
                          <td className="assignee">
                            {report.fileSize}
                          </td>
                          <td className="status-column">
                            <div className={`status-badge ${statusBadge.className}`}>
                              {statusBadge.text}
                            </div>
                          </td>
                          <td className="score-column">
                            <div className="score-display">{report.downloadCount}</div>
                          </td>
                          <td className="actions-column">
                            <div className="action-buttons">
                              <button 
                                className="action-btn view" 
                                title="预览报告"
                                disabled={report.status !== 'completed'}
                                onClick={() => console.log('Preview report', report.id)}
                              >
                                👁️
                              </button>
                              <button 
                                className="action-btn download" 
                                title="下载报告"
                                disabled={report.status !== 'completed'}
                                onClick={() => console.log('Download report', report.id)}
                              >
                                💾
                              </button>
                              <button 
                                className="action-btn remind" 
                                title="发送报告"
                                disabled={report.status !== 'completed'}
                                onClick={() => console.log('Send report', report.id)}
                              >
                                📤
                              </button>
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

          {/* Scheduled Reports Tab */}
          {activeTab === 'scheduled' && (
            <div className="task-table-container">
              <table className="task-table">
                <thead>
                  <tr>
                    <th>定时任务</th>
                    <th>模板</th>
                    <th>频率</th>
                    <th>下次运行</th>
                    <th>最后运行</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledReports.map(schedule => {
                    const statusBadge = getStatusBadge(schedule.status)
                    const template = reportTemplates.find(t => t.id === schedule.template)
                    
                    return (
                      <tr key={schedule.id}>
                        <td className="task-info">
                          <div className="task-details">
                            <div className="task-title">{schedule.name}</div>
                            <div className="task-type">接收者: {schedule.recipients.join(', ')}</div>
                          </div>
                        </td>
                        <td className="assignee">
                          {template?.name || '未知模板'}
                        </td>
                        <td className="assignee">
                          {schedule.frequency === 'weekly' ? '每周' :
                           schedule.frequency === 'monthly' ? '每月' :
                           schedule.frequency === 'daily' ? '每天' : schedule.frequency}
                        </td>
                        <td className="due-date">
                          <div className="date-info">
                            <div className="due-date-value">{schedule.nextRun}</div>
                          </div>
                        </td>
                        <td className="due-date">
                          <div className="date-info">
                            <div className="due-date-value">{schedule.lastRun}</div>
                          </div>
                        </td>
                        <td className="status-column">
                          <div className={`status-badge ${statusBadge.className}`}>
                            {statusBadge.text}
                          </div>
                        </td>
                        <td className="actions-column">
                          <div className="action-buttons">
                            <button 
                              className="action-btn view" 
                              title="查看详情"
                              onClick={() => console.log('View schedule', schedule.id)}
                            >
                              👁️
                            </button>
                            {schedule.status === 'active' ? (
                              <button 
                                className="action-btn escalate" 
                                title="暂停任务"
                                onClick={() => console.log('Pause schedule', schedule.id)}
                              >
                                ⏸️
                              </button>
                            ) : (
                              <button 
                                className="action-btn remind" 
                                title="启动任务"
                                onClick={() => console.log('Resume schedule', schedule.id)}
                              >
                                ▶️
                              </button>
                            )}
                            <button 
                              className="action-btn config" 
                              title="编辑任务"
                              onClick={() => console.log('Edit schedule', schedule.id)}
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

          {((activeTab === 'templates' && reportTemplates.length === 0) ||
            (activeTab === 'generated' && filteredReports.length === 0) ||
            (activeTab === 'scheduled' && scheduledReports.length === 0)) && (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <div className="empty-title">暂无数据</div>
              <div className="empty-description">
                {activeTab === 'templates' ? '尚未创建报告模板' :
                 activeTab === 'generated' ? '暂无生成的报告' : '暂无定时任务'}
              </div>
            </div>
          )}
        </div>

        {/* Generate Report Modal */}
        {showReportModal && (
          <div className="modal-overlay">
            <div className="modal-content large">
              <div className="modal-header">
                <h3>生成报告</h3>
                <button className="close-button" onClick={() => setShowReportModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="reminder-content">
                  <label>选择模板:</label>
                  <select 
                    className="template-select"
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                  >
                    <option value="">选择报告模板</option>
                    {reportTemplates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name} ({template.format})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="reminder-content">
                  <label>报告标题:</label>
                  <input 
                    type="text"
                    className="search-input"
                    placeholder="输入报告标题..."
                  />
                </div>
                <div className="reminder-content">
                  <label>时间范围:</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                      type="date"
                      className="search-input"
                      style={{ flex: 1 }}
                    />
                    <span style={{ alignSelf: 'center' }}>至</span>
                    <input 
                      type="date"
                      className="search-input"
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>
                <div className="reminder-content">
                  <label>接收人员:</label>
                  <div className="issue-options">
                    <div className="issue-option">
                      <input type="checkbox" id="recipient1" />
                      <label htmlFor="recipient1">教务处</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="recipient2" />
                      <label htmlFor="recipient2">院系领导</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="recipient3" />
                      <label htmlFor="recipient3">人事处</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="recipient4" />
                      <label htmlFor="recipient4">实验室管理处</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowReportModal(false)}>
                  取消
                </button>
                <button className="action-button primary" disabled={!selectedTemplate}>
                  生成报告
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Report Modal */}
        {showScheduleModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>设置定时报告</h3>
                <button className="close-button" onClick={() => setShowScheduleModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="reminder-content">
                  <label>任务名称:</label>
                  <input 
                    type="text"
                    className="search-input"
                    placeholder="输入定时任务名称..."
                  />
                </div>
                <div className="reminder-content">
                  <label>报告模板:</label>
                  <select className="template-select">
                    <option value="">选择报告模板</option>
                    {reportTemplates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="reminder-content">
                  <label>执行频率:</label>
                  <select className="template-select">
                    <option value="daily">每天</option>
                    <option value="weekly">每周</option>
                    <option value="monthly">每月</option>
                    <option value="quarterly">每季度</option>
                  </select>
                </div>
                <div className="reminder-content">
                  <label>执行时间:</label>
                  <input 
                    type="time"
                    className="search-input"
                    defaultValue="09:00"
                  />
                </div>
                <div className="reminder-content">
                  <label>接收人员:</label>
                  <div className="issue-options">
                    <div className="issue-option">
                      <input type="checkbox" id="schedule_recipient1" />
                      <label htmlFor="schedule_recipient1">教务处</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="schedule_recipient2" />
                      <label htmlFor="schedule_recipient2">院系领导</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="schedule_recipient3" />
                      <label htmlFor="schedule_recipient3">人事处</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowScheduleModal(false)}>
                  取消
                </button>
                <button className="action-button primary">
                  保存任务
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default DataReports