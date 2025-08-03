import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './ProcessMonitoring.css'

const AttendanceMonitoring = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [participants, setParticipants] = useState([])
  const [selectedTimeRange, setSelectedTimeRange] = useState('week')
  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showRiskModal, setShowRiskModal] = useState(false)
  const [selectedParticipants, setSelectedParticipants] = useState([])

  // Mock data
  useEffect(() => {
    const mockAttendanceRecords = [
      {
        id: 'att1',
        participantId: 'student1',
        participantName: '张三',
        participantType: 'student',
        eventType: 'meeting',
        eventTitle: '周会讨论',
        scheduledTime: '2024-12-16 14:00',
        actualTime: '2024-12-16 14:05',
        status: 'present',
        duration: 120,
        engagement: 'high',
        notes: '积极参与讨论，提出有价值建议'
      },
      {
        id: 'att2',
        participantId: 'student2',
        participantName: '李四',
        participantType: 'student',
        eventType: 'lab_session',
        eventTitle: '实验操作',
        scheduledTime: '2024-12-17 09:00',
        actualTime: null,
        status: 'absent',
        duration: 0,
        engagement: 'none',
        notes: '未到场，事先未请假'
      },
      {
        id: 'att3',
        participantId: 'prof1',
        participantName: '张明教授',
        participantType: 'professor',
        eventType: 'meeting',
        eventTitle: '周会讨论',
        scheduledTime: '2024-12-16 14:00',
        actualTime: '2024-12-16 13:55',
        status: 'present',
        duration: 135,
        engagement: 'high',
        notes: '主持会议，给出详细指导'
      },
      {
        id: 'att4',
        participantId: 'student3',
        participantName: '王五',
        participantType: 'student',
        eventType: 'presentation',
        eventTitle: '进度汇报',
        scheduledTime: '2024-12-18 15:00',
        actualTime: '2024-12-18 15:20',
        status: 'late',
        duration: 45,
        engagement: 'medium',
        notes: '迟到20分钟，汇报时间较短'
      },
      {
        id: 'att5',
        participantId: 'student1',
        participantName: '张三',
        participantType: 'student',
        eventType: 'lab_session',
        eventTitle: '数据分析',
        scheduledTime: '2024-12-19 10:00',
        actualTime: '2024-12-19 10:00',
        status: 'present',
        duration: 180,
        engagement: 'high',
        notes: '认真完成实验，记录详细'
      }
    ]

    const mockParticipants = [
      { id: 'student1', name: '张三', type: 'student', riskLevel: 'low' },
      { id: 'student2', name: '李四', type: 'student', riskLevel: 'high' },
      { id: 'student3', name: '王五', type: 'student', riskLevel: 'medium' },
      { id: 'prof1', name: '张明教授', type: 'professor', riskLevel: 'low' },
      { id: 'prof2', name: '李华教授', type: 'professor', riskLevel: 'low' }
    ]

    setAttendanceRecords(mockAttendanceRecords)
    setParticipants(mockParticipants)
  }, [])

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = filterType === 'all' || record.participantType === filterType
    
    return matchesSearch && matchesType
  })

  const getStatusBadge = (status) => {
    const badges = {
      present: { text: '出席', className: 'status-present' },
      absent: { text: '缺席', className: 'status-absent' },
      late: { text: '迟到', className: 'status-late' },
      excused: { text: '请假', className: 'status-excused' }
    }
    return badges[status] || badges.present
  }

  const getEngagementBadge = (engagement) => {
    const badges = {
      high: { text: '积极', className: 'engagement-high' },
      medium: { text: '一般', className: 'engagement-medium' },
      low: { text: '较低', className: 'engagement-low' },
      none: { text: '无', className: 'engagement-none' }
    }
    return badges[engagement] || badges.medium
  }

  const getRiskBadge = (riskLevel) => {
    const badges = {
      low: { text: '正常', className: 'risk-low' },
      medium: { text: '注意', className: 'risk-medium' },
      high: { text: '风险', className: 'risk-high' }
    }
    return badges[riskLevel] || badges.low
  }

  const handleSelectParticipant = (participantId) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId) 
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    )
  }

  const handleSelectAll = () => {
    const uniqueParticipants = [...new Set(filteredRecords.map(r => r.participantId))]
    if (selectedParticipants.length === uniqueParticipants.length) {
      setSelectedParticipants([])
    } else {
      setSelectedParticipants(uniqueParticipants)
    }
  }

  const handleRiskIntervention = () => {
    setShowRiskModal(true)
  }

  const getAttendanceStats = () => {
    const total = attendanceRecords.length
    const present = attendanceRecords.filter(r => r.status === 'present').length
    const absent = attendanceRecords.filter(r => r.status === 'absent').length
    const late = attendanceRecords.filter(r => r.status === 'late').length
    const atRiskStudents = participants.filter(p => p.type === 'student' && p.riskLevel === 'high').length
    
    return { total, present, absent, late, atRiskStudents }
  }

  const getParticipantAttendanceRate = (participantId) => {
    const participantRecords = attendanceRecords.filter(r => r.participantId === participantId)
    const presentRecords = participantRecords.filter(r => r.status === 'present')
    return participantRecords.length > 0 ? Math.round((presentRecords.length / participantRecords.length) * 100) : 0
  }

  const stats = getAttendanceStats()

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
              className="nav-button active"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/process-monitoring/attendance`)}
            >
              出勤参与监控
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/process-monitoring/alerts`)}
            >
              预警系统管理
            </button>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">总记录数</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-number">{stats.present}</div>
              <div className="stat-label">正常出席</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">❌</div>
            <div className="stat-content">
              <div className="stat-number">{stats.absent}</div>
              <div className="stat-label">缺席记录</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <div className="stat-number">{stats.atRiskStudents}</div>
              <div className="stat-label">风险学生</div>
            </div>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div className="header-left">
              <h2 className="card-title">出勤与参与度监控</h2>
              <div className="attendance-stats">
                <span className="stat-item">已选择: {selectedParticipants.length}</span>
                <span className="stat-item">出勤率: {Math.round((stats.present / stats.total) * 100)}%</span>
              </div>
            </div>
            <div className="header-actions">
              <button 
                className="action-button secondary"
                onClick={() => window.print()}
              >
                导出报告
              </button>
              <button 
                className="action-button primary"
                onClick={handleRiskIntervention}
                disabled={selectedParticipants.length === 0}
              >
                风险干预
              </button>
            </div>
          </div>

          <div className="filters-section">
            <div className="search-group">
              <input
                type="text"
                placeholder="搜索参与者或活动..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-group">
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="filter-select"
              >
                <option value="week">本周</option>
                <option value="month">本月</option>
                <option value="quarter">本季度</option>
                <option value="all">全部</option>
              </select>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                <option value="all">所有类型</option>
                <option value="student">学生</option>
                <option value="professor">教授</option>
              </select>
            </div>
          </div>

          <div className="attendance-table-container">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th className="checkbox-column">
                    <input
                      type="checkbox"
                      checked={selectedParticipants.length === [...new Set(filteredRecords.map(r => r.participantId))].length && filteredRecords.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>参与者</th>
                  <th>活动信息</th>
                  <th>时间记录</th>
                  <th>出勤状态</th>
                  <th>参与度</th>
                  <th>持续时间</th>
                  <th>风险等级</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map(record => {
                  const statusBadge = getStatusBadge(record.status)
                  const engagementBadge = getEngagementBadge(record.engagement)
                  const participant = participants.find(p => p.id === record.participantId)
                  const riskBadge = participant ? getRiskBadge(participant.riskLevel) : getRiskBadge('low')
                  const attendanceRate = getParticipantAttendanceRate(record.participantId)
                  
                  return (
                    <tr key={record.id} className={selectedParticipants.includes(record.participantId) ? 'selected' : ''}>
                      <td className="checkbox-column">
                        <input
                          type="checkbox"
                          checked={selectedParticipants.includes(record.participantId)}
                          onChange={() => handleSelectParticipant(record.participantId)}
                        />
                      </td>
                      <td className="participant-info">
                        <div className="participant-details">
                          <div className="participant-name">{record.participantName}</div>
                          <div className="participant-type">{record.participantType === 'student' ? '学生' : '教授'}</div>
                          <div className="attendance-rate">出勤率: {attendanceRate}%</div>
                        </div>
                      </td>
                      <td className="event-info">
                        <div className="event-details">
                          <div className="event-title">{record.eventTitle}</div>
                          <div className="event-type">{record.eventType}</div>
                        </div>
                      </td>
                      <td className="time-info">
                        <div className="time-details">
                          <div className="scheduled-time">计划: {record.scheduledTime}</div>
                          {record.actualTime && (
                            <div className="actual-time">实际: {record.actualTime}</div>
                          )}
                        </div>
                      </td>
                      <td className="status-column">
                        <div className={`status-badge ${statusBadge.className}`}>
                          {statusBadge.text}
                        </div>
                      </td>
                      <td className="engagement-column">
                        <div className={`engagement-badge ${engagementBadge.className}`}>
                          {engagementBadge.text}
                        </div>
                      </td>
                      <td className="duration-column">
                        {record.duration > 0 ? `${record.duration}分钟` : '无'}
                      </td>
                      <td className="risk-column">
                        <div className={`risk-badge ${riskBadge.className}`}>
                          {riskBadge.text}
                        </div>
                      </td>
                      <td className="actions-column">
                        <div className="action-buttons">
                          <button className="action-btn view" title="查看详情">
                            👁️
                          </button>
                          <button className="action-btn contact" title="联系参与者">
                            📞
                          </button>
                          {record.status === 'absent' && (
                            <button className="action-btn follow-up" title="跟进处理">
                              📝
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

          {filteredRecords.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <div className="empty-title">暂无出勤记录</div>
              <div className="empty-description">
                {searchTerm ? '没有找到匹配的出勤记录' : '尚未有出勤记录'}
              </div>
            </div>
          )}
        </div>

        {/* Risk Intervention Modal */}
        {showRiskModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>风险干预处理</h3>
                <button className="close-button" onClick={() => setShowRiskModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="risk-info">
                  <p>选中的 {selectedParticipants.length} 名参与者需要风险干预</p>
                </div>
                <div className="intervention-types">
                  <label>干预类型:</label>
                  <div className="intervention-options">
                    <div className="intervention-option">
                      <input type="radio" id="communication" name="intervention" defaultChecked />
                      <label htmlFor="communication">个别沟通</label>
                    </div>
                    <div className="intervention-option">
                      <input type="radio" id="warning" name="intervention" />
                      <label htmlFor="warning">正式警告</label>
                    </div>
                    <div className="intervention-option">
                      <input type="radio" id="support" name="intervention" />
                      <label htmlFor="support">学习支持</label>
                    </div>
                    <div className="intervention-option">
                      <input type="radio" id="escalation" name="intervention" />
                      <label htmlFor="escalation">上报处理</label>
                    </div>
                  </div>
                </div>
                <div className="intervention-plan">
                  <label>干预计划:</label>
                  <textarea 
                    className="intervention-textarea"
                    placeholder="输入具体的干预措施和时间安排..."
                    rows="4"
                  />
                </div>
                <div className="follow-up-schedule">
                  <label>跟进时间:</label>
                  <input type="date" className="follow-up-date" />
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowRiskModal(false)}>
                  取消
                </button>
                <button className="action-button primary">
                  执行干预
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default AttendanceMonitoring