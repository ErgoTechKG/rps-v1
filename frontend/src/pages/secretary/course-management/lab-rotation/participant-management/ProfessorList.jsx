import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './ProfessorList.css'

const ProfessorList = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  
  const [professors, setProfessors] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProfessors, setSelectedProfessors] = useState([])
  const [showImportModal, setShowImportModal] = useState(false)
  const [showCommunicationModal, setShowCommunicationModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock professor data
  useEffect(() => {
    const mockProfessors = [
      {
        id: 'prof1',
        name: '张明教授',
        department: '计算机科学系',
        email: 'zhang.ming@university.edu',
        phone: '+86-138-0013-8000',
        capacity: 5,
        currentStudents: 3,
        topicsSubmitted: 2,
        lastLogin: '2024-12-10',
        status: 'active',
        availableSlots: ['周一上午', '周三下午', '周五全天'],
        research: '机器学习',
        publications: 45,
        engagement: 'high'
      },
      {
        id: 'prof2',
        name: '李华教授',
        department: '生物医学工程系',
        email: 'li.hua@university.edu',
        phone: '+86-138-0013-8001',
        capacity: 4,
        currentStudents: 4,
        topicsSubmitted: 1,
        lastLogin: '2024-12-09',
        status: 'active',
        availableSlots: ['周二上午', '周四下午'],
        research: '生物信息学',
        publications: 32,
        engagement: 'medium'
      },
      {
        id: 'prof3',
        name: '王芳教授',
        department: '电子工程系',
        email: 'wang.fang@university.edu',
        phone: '+86-138-0013-8002',
        capacity: 6,
        currentStudents: 2,
        topicsSubmitted: 3,
        lastLogin: '2024-12-11',
        status: 'active',
        availableSlots: ['周一下午', '周三上午', '周五上午'],
        research: '信号处理',
        publications: 28,
        engagement: 'high'
      },
      {
        id: 'prof4',
        name: '陈强教授',
        department: '材料科学系',
        email: 'chen.qiang@university.edu',
        phone: '+86-138-0013-8003',
        capacity: 3,
        currentStudents: 0,
        topicsSubmitted: 0,
        lastLogin: '2024-11-15',
        status: 'inactive',
        availableSlots: [],
        research: '纳米材料',
        publications: 56,
        engagement: 'low'
      }
    ]
    setProfessors(mockProfessors)
  }, [])

  const filteredProfessors = professors.filter(professor => {
    const matchesSearch = professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professor.research.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || professor.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const handleSelectProfessor = (professorId) => {
    setSelectedProfessors(prev => 
      prev.includes(professorId) 
        ? prev.filter(id => id !== professorId)
        : [...prev, professorId]
    )
  }

  const handleSelectAll = () => {
    if (selectedProfessors.length === filteredProfessors.length) {
      setSelectedProfessors([])
    } else {
      setSelectedProfessors(filteredProfessors.map(prof => prof.id))
    }
  }

  const handleImportProfessors = () => {
    setShowImportModal(true)
  }

  const handleSendCommunication = () => {
    setShowCommunicationModal(true)
  }

  const handleUpdateCapacity = (professorId, newCapacity) => {
    setProfessors(prev => prev.map(prof => 
      prof.id === professorId ? { ...prof, capacity: parseInt(newCapacity) } : prof
    ))
  }

  const getEngagementBadge = (engagement) => {
    const badges = {
      high: { text: '积极参与', className: 'engagement-high' },
      medium: { text: '正常参与', className: 'engagement-medium' },
      low: { text: '参与度低', className: 'engagement-low' }
    }
    return badges[engagement] || badges.medium
  }

  const getStatusBadge = (status) => {
    const badges = {
      active: { text: '活跃', className: 'status-active' },
      inactive: { text: '不活跃', className: 'status-inactive' }
    }
    return badges[status] || badges.active
  }

  return (
    <Layout>
      <div className="professor-list-container">
        <div className="participant-header">
          <h1 className="page-title">教授管理与协调</h1>
          <div className="participant-nav">
            <button 
              className="nav-button active"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/participant-management/professor-list`)}
            >
              教授列表
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/participant-management/student-list`)}
            >
              学生列表
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/participant-management/matching-overview`)}
            >
              匹配概览
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/participant-management/adjustment`)}
            >
              手动调整
            </button>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div className="header-left">
              <h2 className="card-title">参与教授列表</h2>
              <div className="professor-stats">
                <span className="stat-item">总计: {professors.length}</span>
                <span className="stat-item">活跃: {professors.filter(p => p.status === 'active').length}</span>
                <span className="stat-item">已选择: {selectedProfessors.length}</span>
              </div>
            </div>
            <div className="header-actions">
              <button className="action-button secondary" onClick={handleImportProfessors}>
                从系统导入
              </button>
              <button 
                className="action-button primary"
                onClick={handleSendCommunication}
                disabled={selectedProfessors.length === 0}
              >
                批量通信
              </button>
            </div>
          </div>

          <div className="filters-section">
            <div className="search-group">
              <input
                type="text"
                placeholder="搜索教授姓名、院系或研究方向..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                <option value="active">活跃</option>
                <option value="inactive">不活跃</option>
              </select>
            </div>
          </div>

          <div className="professor-table-container">
            <table className="professor-table">
              <thead>
                <tr>
                  <th className="checkbox-column">
                    <input
                      type="checkbox"
                      checked={selectedProfessors.length === filteredProfessors.length && filteredProfessors.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>教授信息</th>
                  <th>研究方向</th>
                  <th>容量设置</th>
                  <th>课题提交</th>
                  <th>参与状态</th>
                  <th>可用时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfessors.map(professor => {
                  const statusBadge = getStatusBadge(professor.status)
                  const engagementBadge = getEngagementBadge(professor.engagement)
                  
                  return (
                    <tr key={professor.id} className={selectedProfessors.includes(professor.id) ? 'selected' : ''}>
                      <td className="checkbox-column">
                        <input
                          type="checkbox"
                          checked={selectedProfessors.includes(professor.id)}
                          onChange={() => handleSelectProfessor(professor.id)}
                        />
                      </td>
                      <td className="professor-info">
                        <div className="professor-details">
                          <div className="professor-name">{professor.name}</div>
                          <div className="professor-department">{professor.department}</div>
                          <div className="professor-contact">
                            <span>{professor.email}</span>
                            <span>{professor.phone}</span>
                          </div>
                          <div className="professor-metrics">
                            <span>发表论文: {professor.publications}</span>
                            <span>最后登录: {professor.lastLogin}</span>
                          </div>
                        </div>
                      </td>
                      <td className="research-field">
                        <span className="research-tag">{professor.research}</span>
                      </td>
                      <td className="capacity-info">
                        <div className="capacity-details">
                          <div className="capacity-input-group">
                            <label>容量:</label>
                            <input
                              type="number"
                              value={professor.capacity}
                              onChange={(e) => handleUpdateCapacity(professor.id, e.target.value)}
                              className="capacity-input"
                              min="0"
                              max="10"
                            />
                          </div>
                          <div className="current-load">
                            当前: {professor.currentStudents}/{professor.capacity}
                          </div>
                          <div className="load-progress">
                            <div 
                              className="load-bar"
                              style={{
                                width: `${(professor.currentStudents / professor.capacity) * 100}%`,
                                backgroundColor: professor.currentStudents >= professor.capacity ? '#f44336' : '#4caf50'
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="topics-info">
                        <div className="topics-count">
                          {professor.topicsSubmitted} 个课题
                        </div>
                        {professor.topicsSubmitted === 0 && (
                          <div className="topics-warning">未提交课题</div>
                        )}
                      </td>
                      <td className="status-column">
                        <div className={`status-badge ${statusBadge.className}`}>
                          {statusBadge.text}
                        </div>
                        <div className={`engagement-badge ${engagementBadge.className}`}>
                          {engagementBadge.text}
                        </div>
                      </td>
                      <td className="availability">
                        {professor.availableSlots.length > 0 ? (
                          <div className="time-slots">
                            {professor.availableSlots.map((slot, index) => (
                              <span key={index} className="time-slot">{slot}</span>
                            ))}
                          </div>
                        ) : (
                          <span className="no-availability">未设置</span>
                        )}
                      </td>
                      <td className="actions-column">
                        <div className="action-buttons">
                          <button className="action-btn view" title="查看详情">
                            👁️
                          </button>
                          <button className="action-btn message" title="发送消息">
                            ✉️
                          </button>
                          <button className="action-btn edit" title="编辑信息">
                            ✏️
                          </button>
                          <button className="action-btn substitute" title="安排替代">
                            🔄
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredProfessors.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">👨‍🏫</div>
              <div className="empty-title">暂无教授数据</div>
              <div className="empty-description">
                {searchTerm ? '没有找到匹配的教授' : '尚未导入或添加教授信息'}
              </div>
            </div>
          )}
        </div>

        {/* Import Modal */}
        {showImportModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>从系统导入教授</h3>
                <button className="close-button" onClick={() => setShowImportModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="import-options">
                  <div className="import-option">
                    <input type="radio" id="import-all" name="import-type" defaultChecked />
                    <label htmlFor="import-all">导入所有符合条件的教授</label>
                  </div>
                  <div className="import-option">
                    <input type="radio" id="import-select" name="import-type" />
                    <label htmlFor="import-select">选择性导入</label>
                  </div>
                </div>
                <div className="import-filters">
                  <div className="filter-item">
                    <label>院系:</label>
                    <select className="filter-select">
                      <option value="">所有院系</option>
                      <option value="cs">计算机科学系</option>
                      <option value="ee">电子工程系</option>
                      <option value="bio">生物医学工程系</option>
                    </select>
                  </div>
                  <div className="filter-item">
                    <label>职级:</label>
                    <select className="filter-select">
                      <option value="">所有职级</option>
                      <option value="professor">教授</option>
                      <option value="associate">副教授</option>
                      <option value="assistant">助理教授</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowImportModal(false)}>
                  取消
                </button>
                <button className="action-button primary">
                  导入教授
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Communication Modal */}
        {showCommunicationModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>批量通信</h3>
                <button className="close-button" onClick={() => setShowCommunicationModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="communication-info">
                  <p>将向 {selectedProfessors.length} 位教授发送消息</p>
                </div>
                <div className="message-templates">
                  <label>选择模板:</label>
                  <select className="template-select">
                    <option value="">自定义消息</option>
                    <option value="reminder">课题提交提醒</option>
                    <option value="capacity">容量确认</option>
                    <option value="schedule">时间安排通知</option>
                  </select>
                </div>
                <div className="message-content">
                  <label>消息内容:</label>
                  <textarea 
                    className="message-textarea"
                    placeholder="输入要发送的消息内容..."
                    rows="6"
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowCommunicationModal(false)}>
                  取消
                </button>
                <button className="action-button primary">
                  发送消息
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default ProfessorList