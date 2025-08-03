import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../../components/Layout'
import '../course-management/lab-rotation/process-monitoring/ProcessMonitoring.css'

const DataExport = () => {
  const navigate = useNavigate()
  
  const [exportJobs, setExportJobs] = useState([])
  const [exportTemplates, setExportTemplates] = useState([])
  const [apiConfigs, setApiConfigs] = useState([])
  const [showExportModal, setShowExportModal] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showApiModal, setShowApiModal] = useState(false)
  const [activeTab, setActiveTab] = useState('exports')
  const [selectedDataRange, setSelectedDataRange] = useState('current_semester')
  const [selectedFormat, setSelectedFormat] = useState('excel')
  const [selectedTemplate, setSelectedTemplate] = useState('')

  // Mock data
  useEffect(() => {
    const mockExportJobs = [
      {
        id: 'export1',
        name: '学生成绩数据导出',
        dataType: 'student_grades',
        format: 'Excel',
        status: 'completed',
        createdBy: '王秘书',
        createdAt: '2024-12-08 14:30:00',
        completedAt: '2024-12-08 14:35:00',
        fileSize: '5.2MB',
        recordCount: 1250,
        downloadCount: 3,
        expiresAt: '2024-12-15 14:30:00'
      },
      {
        id: 'export2',
        name: '课程参与统计报告',
        dataType: 'course_participation',
        format: 'PDF',
        status: 'processing',
        createdBy: '李秘书',
        createdAt: '2024-12-08 15:00:00',
        completedAt: null,
        fileSize: null,
        recordCount: 890,
        downloadCount: 0,
        expiresAt: '2024-12-15 15:00:00'
      },
      {
        id: 'export3',
        name: '教师工作量数据',
        dataType: 'teacher_workload',
        format: 'CSV',
        status: 'failed',
        createdBy: '王秘书',
        createdAt: '2024-12-08 13:20:00',
        completedAt: null,
        fileSize: null,
        recordCount: 0,
        downloadCount: 0,
        expiresAt: '2024-12-15 13:20:00'
      },
      {
        id: 'export4',
        name: '实验室使用记录',
        dataType: 'lab_usage',
        format: 'JSON',
        status: 'scheduled',
        createdBy: '系统自动',
        createdAt: '2024-12-08 16:00:00',
        completedAt: null,
        fileSize: null,
        recordCount: 456,
        downloadCount: 0,
        expiresAt: '2024-12-15 16:00:00'
      }
    ]

    const mockExportTemplates = [
      {
        id: 'template1',
        name: '标准学生成绩报告',
        dataType: 'student_grades',
        format: 'Excel',
        fields: ['学号', '姓名', '课程', '成绩', '学分', '等级'],
        filters: ['学期', '院系', '课程类型'],
        description: '包含学生基本信息和详细成绩数据',
        usageCount: 45,
        lastUsed: '2024-12-08'
      },
      {
        id: 'template2',
        name: '课程统计分析',
        dataType: 'course_statistics',
        format: 'PDF',
        fields: ['课程名称', '开课教师', '选课人数', '通过率', '平均分'],
        filters: ['学期', '课程类型', '开课单位'],
        description: '课程开设情况和学习效果统计',
        usageCount: 32,
        lastUsed: '2024-12-07'
      },
      {
        id: 'template3',
        name: '教师考核数据',
        dataType: 'teacher_evaluation',
        format: 'Excel',
        fields: ['教师姓名', '职称', '课程数量', '学生评价', '科研成果'],
        filters: ['学期', '院系', '职称级别'],
        description: '教师教学和科研工作综合评价',
        usageCount: 28,
        lastUsed: '2024-12-06'
      }
    ]

    const mockApiConfigs = [
      {
        id: 'api1',
        name: '教务系统接口',
        endpoint: 'https://api.university.edu/academic',
        status: 'active',
        lastSync: '2024-12-08 12:00:00',
        syncCount: 156,
        dataTypes: ['学生信息', '课程数据', '成绩记录'],
        authentication: 'API Key',
        rateLimitRemaining: 850
      },
      {
        id: 'api2',
        name: '人事管理系统',
        endpoint: 'https://api.university.edu/hr',
        status: 'active',
        lastSync: '2024-12-08 10:30:00',
        syncCount: 89,
        dataTypes: ['教师信息', '职务变更', '工作量统计'],
        authentication: 'OAuth 2.0',
        rateLimitRemaining: 720
      },
      {
        id: 'api3',
        name: '财务系统接口',
        endpoint: 'https://api.university.edu/finance',
        status: 'error',
        lastSync: '2024-12-07 14:15:00',
        syncCount: 23,
        dataTypes: ['学费缴纳', '奖学金发放', '预算执行'],
        authentication: 'JWT Token',
        rateLimitRemaining: 0
      }
    ]

    setExportJobs(mockExportJobs)
    setExportTemplates(mockExportTemplates)
    setApiConfigs(mockApiConfigs)
  }, [])

  const getStatusBadge = (status) => {
    const badges = {
      completed: { text: '已完成', className: 'status-completed' },
      processing: { text: '处理中', className: 'status-in-progress' },
      failed: { text: '失败', className: 'status-error' },
      scheduled: { text: '已安排', className: 'status-pending' },
      active: { text: '正常', className: 'status-completed' },
      error: { text: '错误', className: 'status-error' }
    }
    return badges[status] || badges.completed
  }

  const getFormatBadge = (format) => {
    const badges = {
      Excel: { text: 'Excel', className: 'format-excel' },
      PDF: { text: 'PDF', className: 'format-pdf' },
      CSV: { text: 'CSV', className: 'format-other' },
      JSON: { text: 'JSON', className: 'format-word' },
      XML: { text: 'XML', className: 'format-other' }
    }
    return badges[format] || badges.Excel
  }

  const getDataTypeBadge = (dataType) => {
    const badges = {
      student_grades: { text: '学生成绩', className: 'quality-excellent' },
      course_participation: { text: '课程参与', className: 'quality-good' },
      teacher_workload: { text: '教师工作量', className: 'quality-fair' },
      lab_usage: { text: '实验室使用', className: 'quality-poor' },
      course_statistics: { text: '课程统计', className: 'quality-good' },
      teacher_evaluation: { text: '教师评价', className: 'quality-fair' }
    }
    return badges[dataType] || badges.student_grades
  }

  const getExportStats = () => {
    const total = exportJobs.length
    const completed = exportJobs.filter(job => job.status === 'completed').length
    const processing = exportJobs.filter(job => job.status === 'processing').length
    const totalDownloads = exportJobs.reduce((sum, job) => sum + job.downloadCount, 0)
    
    return { total, completed, processing, totalDownloads }
  }

  const stats = getExportStats()

  return (
    <Layout>
      <div className="process-monitoring-container">
        <div className="monitoring-header">
          <h1 className="page-title">数据导出与集成</h1>
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
              className="nav-button"
              onClick={() => navigate('/secretary/data-management/reminders')}
            >
              提醒管理
            </button>
            <button 
              className="nav-button active"
              onClick={() => navigate('/secretary/data-management/export')}
            >
              数据导出
            </button>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📤</div>
            <div className="stat-content">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">导出任务</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-number">{stats.completed}</div>
              <div className="stat-label">已完成</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <div className="stat-number">{stats.processing}</div>
              <div className="stat-label">处理中</div>
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
              <h2 className="card-title">数据导出管理</h2>
            </div>
            <div className="header-actions">
              <button 
                className="action-button secondary"
                onClick={() => setShowTemplateModal(true)}
              >
                管理模板
              </button>
              <button 
                className="action-button secondary"
                onClick={() => setShowApiModal(true)}
              >
                API集成
              </button>
              <button 
                className="action-button primary"
                onClick={() => setShowExportModal(true)}
              >
                创建导出
              </button>
            </div>
          </div>

          <div className="config-tabs">
            <div 
              className={`tab ${activeTab === 'exports' ? 'active' : ''}`}
              onClick={() => setActiveTab('exports')}
            >
              导出任务
            </div>
            <div 
              className={`tab ${activeTab === 'templates' ? 'active' : ''}`}
              onClick={() => setActiveTab('templates')}
            >
              导出模板
            </div>
            <div 
              className={`tab ${activeTab === 'apis' ? 'active' : ''}`}
              onClick={() => setActiveTab('apis')}
            >
              API集成
            </div>
          </div>

          {/* Export Jobs Tab */}
          {activeTab === 'exports' && (
            <div className="task-table-container">
              <table className="task-table">
                <thead>
                  <tr>
                    <th>导出任务</th>
                    <th>数据类型</th>
                    <th>格式</th>
                    <th>创建者</th>
                    <th>创建时间</th>
                    <th>状态</th>
                    <th>文件大小</th>
                    <th>下载次数</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {exportJobs.map(job => {
                    const statusBadge = getStatusBadge(job.status)
                    const formatBadge = getFormatBadge(job.format)
                    const dataTypeBadge = getDataTypeBadge(job.dataType)
                    
                    return (
                      <tr key={job.id}>
                        <td className="task-info">
                          <div className="task-details">
                            <div className="task-title">{job.name}</div>
                            <div className="task-type">记录数: {job.recordCount.toLocaleString()}</div>
                            {job.expiresAt && (
                              <div className="task-assigner">过期: {job.expiresAt}</div>
                            )}
                          </div>
                        </td>
                        <td className="quality-column">
                          <div className={`quality-badge ${dataTypeBadge.className}`}>
                            {dataTypeBadge.text}
                          </div>
                        </td>
                        <td className="quality-column">
                          <div className={`format-badge ${formatBadge.className}`}>
                            {formatBadge.text}
                          </div>
                        </td>
                        <td className="assignee">
                          {job.createdBy}
                        </td>
                        <td className="due-date">
                          <div className="date-info">
                            <div className="due-date-value">{job.createdAt}</div>
                            {job.completedAt && (
                              <div className="submitted-date">完成: {job.completedAt}</div>
                            )}
                          </div>
                        </td>
                        <td className="status-column">
                          <div className={`status-badge ${statusBadge.className}`}>
                            {statusBadge.text}
                          </div>
                        </td>
                        <td className="assignee">
                          {job.fileSize || '-'}
                        </td>
                        <td className="score-column">
                          <div className="score-display">{job.downloadCount}</div>
                        </td>
                        <td className="actions-column">
                          <div className="action-buttons">
                            <button 
                              className="action-btn view" 
                              title="查看详情"
                              onClick={() => console.log('View job', job.id)}
                            >
                              👁️
                            </button>
                            {job.status === 'completed' && (
                              <button 
                                className="action-btn download" 
                                title="下载文件"
                                onClick={() => console.log('Download job', job.id)}
                              >
                                💾
                              </button>
                            )}
                            {job.status === 'failed' && (
                              <button 
                                className="action-btn remind" 
                                title="重新执行"
                                onClick={() => console.log('Retry job', job.id)}
                              >
                                🔄
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

          {/* Export Templates Tab */}
          {activeTab === 'templates' && (
            <div className="task-table-container">
              <table className="task-table">
                <thead>
                  <tr>
                    <th>模板信息</th>
                    <th>数据类型</th>
                    <th>格式</th>
                    <th>字段配置</th>
                    <th>使用次数</th>
                    <th>最后使用</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {exportTemplates.map(template => {
                    const formatBadge = getFormatBadge(template.format)
                    const dataTypeBadge = getDataTypeBadge(template.dataType)
                    
                    return (
                      <tr key={template.id}>
                        <td className="task-info">
                          <div className="task-details">
                            <div className="task-title">{template.name}</div>
                            <div className="task-assigner">{template.description}</div>
                          </div>
                        </td>
                        <td className="quality-column">
                          <div className={`quality-badge ${dataTypeBadge.className}`}>
                            {dataTypeBadge.text}
                          </div>
                        </td>
                        <td className="quality-column">
                          <div className={`format-badge ${formatBadge.className}`}>
                            {formatBadge.text}
                          </div>
                        </td>
                        <td className="task-info">
                          <div className="task-details">
                            <div className="task-type">字段: {template.fields.length}</div>
                            <div className="task-assigner">筛选: {template.filters.join(', ')}</div>
                          </div>
                        </td>
                        <td className="score-column">
                          <div className="score-display">{template.usageCount}</div>
                        </td>
                        <td className="due-date">
                          <div className="date-info">
                            <div className="due-date-value">{template.lastUsed}</div>
                          </div>
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
                              className="action-btn config" 
                              title="编辑模板"
                              onClick={() => console.log('Edit template', template.id)}
                            >
                              ✏️
                            </button>
                            <button 
                              className="action-btn remind" 
                              title="使用模板"
                              onClick={() => {
                                setSelectedTemplate(template.id)
                                setShowExportModal(true)
                              }}
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
          )}

          {/* API Integrations Tab */}
          {activeTab === 'apis' && (
            <div className="task-table-container">
              <table className="task-table">
                <thead>
                  <tr>
                    <th>API配置</th>
                    <th>端点地址</th>
                    <th>数据类型</th>
                    <th>认证方式</th>
                    <th>最后同步</th>
                    <th>状态</th>
                    <th>剩余配额</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {apiConfigs.map(api => {
                    const statusBadge = getStatusBadge(api.status)
                    
                    return (
                      <tr key={api.id}>
                        <td className="task-info">
                          <div className="task-details">
                            <div className="task-title">{api.name}</div>
                            <div className="task-type">同步次数: {api.syncCount}</div>
                          </div>
                        </td>
                        <td className="assignee">
                          {api.endpoint}
                        </td>
                        <td className="task-info">
                          <div className="task-details">
                            {api.dataTypes.map((type, index) => (
                              <div key={index} className="task-type">{type}</div>
                            ))}
                          </div>
                        </td>
                        <td className="assignee">
                          {api.authentication}
                        </td>
                        <td className="due-date">
                          <div className="date-info">
                            <div className="due-date-value">{api.lastSync}</div>
                          </div>
                        </td>
                        <td className="status-column">
                          <div className={`status-badge ${statusBadge.className}`}>
                            {statusBadge.text}
                          </div>
                        </td>
                        <td className="score-column">
                          <div className="score-display">{api.rateLimitRemaining}</div>
                        </td>
                        <td className="actions-column">
                          <div className="action-buttons">
                            <button 
                              className="action-btn view" 
                              title="查看详情"
                              onClick={() => console.log('View API', api.id)}
                            >
                              👁️
                            </button>
                            <button 
                              className="action-btn config" 
                              title="配置"
                              onClick={() => console.log('Configure API', api.id)}
                            >
                              ⚙️
                            </button>
                            <button 
                              className="action-btn remind" 
                              title="测试连接"
                              onClick={() => console.log('Test API', api.id)}
                            >
                              🔗
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

          {((activeTab === 'exports' && exportJobs.length === 0) ||
            (activeTab === 'templates' && exportTemplates.length === 0) ||
            (activeTab === 'apis' && apiConfigs.length === 0)) && (
            <div className="empty-state">
              <div className="empty-icon">📤</div>
              <div className="empty-title">暂无数据</div>
              <div className="empty-description">
                {activeTab === 'exports' ? '暂无导出任务' :
                 activeTab === 'templates' ? '暂无导出模板' : '暂无API配置'}
              </div>
            </div>
          )}
        </div>

        {/* Create Export Modal */}
        {showExportModal && (
          <div className="modal-overlay">
            <div className="modal-content large">
              <div className="modal-header">
                <h3>创建数据导出</h3>
                <button className="close-button" onClick={() => setShowExportModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="reminder-content">
                  <label>导出模板:</label>
                  <select 
                    className="template-select"
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                  >
                    <option value="">选择导出模板</option>
                    {exportTemplates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name} ({template.format})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="reminder-content">
                  <label>数据范围:</label>
                  <select 
                    className="template-select"
                    value={selectedDataRange}
                    onChange={(e) => setSelectedDataRange(e.target.value)}
                  >
                    <option value="current_semester">当前学期</option>
                    <option value="last_semester">上学期</option>
                    <option value="current_year">当前学年</option>
                    <option value="custom">自定义范围</option>
                  </select>
                </div>
                {selectedDataRange === 'custom' && (
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
                )}
                <div className="reminder-content">
                  <label>导出格式:</label>
                  <select 
                    className="template-select"
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                  >
                    <option value="excel">Excel (.xlsx)</option>
                    <option value="csv">CSV (.csv)</option>
                    <option value="pdf">PDF (.pdf)</option>
                    <option value="json">JSON (.json)</option>
                  </select>
                </div>
                <div className="reminder-content">
                  <label>筛选条件:</label>
                  <div className="issue-options">
                    <div className="issue-option">
                      <input type="checkbox" id="filter_department" />
                      <label htmlFor="filter_department">按院系筛选</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="filter_grade" />
                      <label htmlFor="filter_grade">按年级筛选</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="filter_course" />
                      <label htmlFor="filter_course">按课程筛选</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="filter_status" />
                      <label htmlFor="filter_status">按状态筛选</label>
                    </div>
                  </div>
                </div>
                <div className="reminder-content">
                  <label>导出选项:</label>
                  <div className="issue-options">
                    <div className="issue-option">
                      <input type="checkbox" id="include_headers" defaultChecked />
                      <label htmlFor="include_headers">包含表头</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="include_summary" />
                      <label htmlFor="include_summary">包含汇总</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="compress_file" />
                      <label htmlFor="compress_file">压缩文件</label>
                    </div>
                  </div>
                </div>
                <div className="reminder-content">
                  <label>文件名称:</label>
                  <input 
                    type="text"
                    className="search-input"
                    placeholder="输入导出文件名称..."
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowExportModal(false)}>
                  取消
                </button>
                <button className="action-button primary">
                  开始导出
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Template Management Modal */}
        {showTemplateModal && (
          <div className="modal-overlay">
            <div className="modal-content large">
              <div className="modal-header">
                <h3>导出模板管理</h3>
                <button className="close-button" onClick={() => setShowTemplateModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="reminder-content">
                  <label>模板名称:</label>
                  <input 
                    type="text"
                    className="search-input"
                    placeholder="输入模板名称..."
                  />
                </div>
                <div className="reminder-content">
                  <label>数据类型:</label>
                  <select className="template-select">
                    <option value="student_grades">学生成绩</option>
                    <option value="course_statistics">课程统计</option>
                    <option value="teacher_evaluation">教师评价</option>
                    <option value="lab_usage">实验室使用</option>
                  </select>
                </div>
                <div className="reminder-content">
                  <label>导出格式:</label>
                  <select className="template-select">
                    <option value="Excel">Excel</option>
                    <option value="PDF">PDF</option>
                    <option value="CSV">CSV</option>
                    <option value="JSON">JSON</option>
                  </select>
                </div>
                <div className="reminder-content">
                  <label>包含字段:</label>
                  <div className="issue-options">
                    <div className="issue-option">
                      <input type="checkbox" id="field_id" defaultChecked />
                      <label htmlFor="field_id">学号/编号</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="field_name" defaultChecked />
                      <label htmlFor="field_name">姓名</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="field_department" />
                      <label htmlFor="field_department">院系</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="field_course" />
                      <label htmlFor="field_course">课程</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="field_grade" />
                      <label htmlFor="field_grade">成绩</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="field_status" />
                      <label htmlFor="field_status">状态</label>
                    </div>
                  </div>
                </div>
                <div className="reminder-content">
                  <label>模板描述:</label>
                  <textarea 
                    className="reminder-textarea"
                    placeholder="输入模板描述..."
                    rows="3"
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowTemplateModal(false)}>
                  取消
                </button>
                <button className="action-button primary">
                  保存模板
                </button>
              </div>
            </div>
          </div>
        )}

        {/* API Configuration Modal */}
        {showApiModal && (
          <div className="modal-overlay">
            <div className="modal-content large">
              <div className="modal-header">
                <h3>API集成配置</h3>
                <button className="close-button" onClick={() => setShowApiModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="reminder-content">
                  <label>API名称:</label>
                  <input 
                    type="text"
                    className="search-input"
                    placeholder="输入API名称..."
                  />
                </div>
                <div className="reminder-content">
                  <label>端点地址:</label>
                  <input 
                    type="url"
                    className="search-input"
                    placeholder="https://api.example.com/endpoint"
                  />
                </div>
                <div className="reminder-content">
                  <label>认证方式:</label>
                  <select className="template-select">
                    <option value="api_key">API Key</option>
                    <option value="oauth2">OAuth 2.0</option>
                    <option value="jwt">JWT Token</option>
                    <option value="basic">Basic Auth</option>
                  </select>
                </div>
                <div className="reminder-content">
                  <label>认证信息:</label>
                  <textarea 
                    className="reminder-textarea"
                    placeholder="输入认证密钥或配置..."
                    rows="3"
                  />
                </div>
                <div className="reminder-content">
                  <label>支持的数据类型:</label>
                  <div className="issue-options">
                    <div className="issue-option">
                      <input type="checkbox" id="api_students" />
                      <label htmlFor="api_students">学生信息</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="api_courses" />
                      <label htmlFor="api_courses">课程数据</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="api_grades" />
                      <label htmlFor="api_grades">成绩记录</label>
                    </div>
                    <div className="issue-option">
                      <input type="checkbox" id="api_teachers" />
                      <label htmlFor="api_teachers">教师信息</label>
                    </div>
                  </div>
                </div>
                <div className="reminder-content">
                  <label>速率限制 (请求/小时):</label>
                  <input 
                    type="number"
                    className="search-input"
                    placeholder="1000"
                    defaultValue="1000"
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowApiModal(false)}>
                  取消
                </button>
                <button className="action-button secondary">
                  测试连接
                </button>
                <button className="action-button primary">
                  保存配置
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default DataExport