import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './StudentList.css'

const StudentList = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  
  const [students, setStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudents, setSelectedStudents] = useState([])
  const [showImportModal, setShowImportModal] = useState(false)
  const [showCommunicationModal, setShowCommunicationModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterEligibility, setFilterEligibility] = useState('all')

  // Mock student data
  useEffect(() => {
    const mockStudents = [
      {
        id: 'stu1',
        name: '李明',
        studentId: '2023001',
        major: '计算机科学与技术',
        year: '大三',
        gpa: 3.85,
        email: 'liming@student.edu',
        phone: '+86-138-0001-0001',
        applicationStatus: 'submitted',
        preferences: ['机器学习', '数据挖掘', '人工智能'],
        eligibility: 'eligible',
        prerequisites: ['已完成', '已完成', '已完成'],
        specialCases: [],
        engagement: 'high',
        lastLogin: '2024-12-11',
        interviewScheduled: true,
        currentAssignment: null
      },
      {
        id: 'stu2',
        name: '张华',
        studentId: '2023002',
        major: '电子信息工程',
        year: '大三',
        gpa: 3.62,
        email: 'zhanghua@student.edu',
        phone: '+86-138-0001-0002',
        applicationStatus: 'pending',
        preferences: ['信号处理', '通信系统'],
        eligibility: 'eligible',
        prerequisites: ['已完成', '已完成', '未完成'],
        specialCases: ['延期申请'],
        engagement: 'medium',
        lastLogin: '2024-12-10',
        interviewScheduled: false,
        currentAssignment: null
      },
      {
        id: 'stu3',
        name: '王芳',
        studentId: '2023003',
        major: '生物医学工程',
        year: '大三',
        gpa: 3.92,
        email: 'wangfang@student.edu',
        phone: '+86-138-0001-0003',
        applicationStatus: 'confirmed',
        preferences: ['生物信息学', '医学影像', '生物材料'],
        eligibility: 'eligible',
        prerequisites: ['已完成', '已完成', '已完成'],
        specialCases: [],
        engagement: 'high',
        lastLogin: '2024-12-11',
        interviewScheduled: true,
        currentAssignment: 'prof2'
      },
      {
        id: 'stu4',
        name: '陈强',
        studentId: '2023004',
        major: '材料科学与工程',
        year: '大二',
        gpa: 2.85,
        email: 'chenqiang@student.edu',
        phone: '+86-138-0001-0004',
        applicationStatus: 'rejected',
        preferences: ['纳米材料', '复合材料'],
        eligibility: 'ineligible',
        prerequisites: ['已完成', '未完成', '未完成'],
        specialCases: ['GPA不足', '必修课程未完成'],
        engagement: 'low',
        lastLogin: '2024-11-20',
        interviewScheduled: false,
        currentAssignment: null
      },
      {
        id: 'stu5',
        name: '刘伟',
        studentId: '2023005',
        major: '软件工程',
        year: '大三',
        gpa: 3.75,
        email: 'liuwei@student.edu',
        phone: '+86-138-0001-0005',
        applicationStatus: 'waitlist',
        preferences: ['软件架构', '云计算', 'DevOps'],
        eligibility: 'eligible',
        prerequisites: ['已完成', '已完成', '已完成'],
        specialCases: [],
        engagement: 'high',
        lastLogin: '2024-12-11',
        interviewScheduled: false,
        currentAssignment: null
      }
    ]
    setStudents(mockStudents)
  }, [])

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.includes(searchTerm) ||
                         student.major.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || student.applicationStatus === filterStatus
    const matchesEligibility = filterEligibility === 'all' || student.eligibility === filterEligibility
    
    return matchesSearch && matchesStatus && matchesEligibility
  })

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id))
    }
  }

  const handleImportStudents = () => {
    setShowImportModal(true)
  }

  const handleSendCommunication = () => {
    setShowCommunicationModal(true)
  }

  const handleUpdateEligibility = (studentId, newEligibility) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, eligibility: newEligibility } : student
    ))
  }

  const getStatusBadge = (status) => {
    const badges = {
      submitted: { text: '已提交', className: 'status-submitted' },
      pending: { text: '待处理', className: 'status-pending' },
      confirmed: { text: '已确认', className: 'status-confirmed' },
      rejected: { text: '已拒绝', className: 'status-rejected' },
      waitlist: { text: '候选', className: 'status-waitlist' }
    }
    return badges[status] || badges.pending
  }

  const getEligibilityBadge = (eligibility) => {
    const badges = {
      eligible: { text: '符合条件', className: 'eligibility-eligible' },
      ineligible: { text: '不符合条件', className: 'eligibility-ineligible' },
      pending: { text: '待审核', className: 'eligibility-pending' }
    }
    return badges[eligibility] || badges.pending
  }

  const getEngagementBadge = (engagement) => {
    const badges = {
      high: { text: '积极', className: 'engagement-high' },
      medium: { text: '一般', className: 'engagement-medium' },
      low: { text: '消极', className: 'engagement-low' }
    }
    return badges[engagement] || badges.medium
  }

  const getGpaColor = (gpa) => {
    if (gpa >= 3.7) return '#4CAF50'
    if (gpa >= 3.0) return '#FF9800'
    return '#F44336'
  }

  return (
    <Layout>
      <div className="student-list-container">
        <div className="participant-header">
          <h1 className="page-title">学生注册与信息管理</h1>
          <div className="participant-nav">
            <button 
              className="nav-button"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/participant-management/professor-list`)}
            >
              教授列表
            </button>
            <button 
              className="nav-button active"
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
              <h2 className="card-title">参与学生列表</h2>
              <div className="student-stats">
                <span className="stat-item">总计: {students.length}</span>
                <span className="stat-item">符合条件: {students.filter(s => s.eligibility === 'eligible').length}</span>
                <span className="stat-item">已选择: {selectedStudents.length}</span>
              </div>
            </div>
            <div className="header-actions">
              <button className="action-button secondary" onClick={handleImportStudents}>
                从教务系统导入
              </button>
              <button 
                className="action-button primary"
                onClick={handleSendCommunication}
                disabled={selectedStudents.length === 0}
              >
                批量通信
              </button>
            </div>
          </div>

          <div className="filters-section">
            <div className="search-group">
              <input
                type="text"
                placeholder="搜索学生姓名、学号或专业..."
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
                <option value="submitted">已提交</option>
                <option value="pending">待处理</option>
                <option value="confirmed">已确认</option>
                <option value="rejected">已拒绝</option>
                <option value="waitlist">候选</option>
              </select>
              <select 
                value={filterEligibility}
                onChange={(e) => setFilterEligibility(e.target.value)}
                className="filter-select"
              >
                <option value="all">所有资格</option>
                <option value="eligible">符合条件</option>
                <option value="ineligible">不符合条件</option>
                <option value="pending">待审核</option>
              </select>
            </div>
          </div>

          <div className="student-table-container">
            <table className="student-table">
              <thead>
                <tr>
                  <th className="checkbox-column">
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>学生信息</th>
                  <th>学术表现</th>
                  <th>申请状态</th>
                  <th>资格审核</th>
                  <th>志愿偏好</th>
                  <th>特殊情况</th>
                  <th>参与度</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => {
                  const statusBadge = getStatusBadge(student.applicationStatus)
                  const eligibilityBadge = getEligibilityBadge(student.eligibility)
                  const engagementBadge = getEngagementBadge(student.engagement)
                  
                  return (
                    <tr key={student.id} className={selectedStudents.includes(student.id) ? 'selected' : ''}>
                      <td className="checkbox-column">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleSelectStudent(student.id)}
                        />
                      </td>
                      <td className="student-info">
                        <div className="student-details">
                          <div className="student-name">{student.name}</div>
                          <div className="student-id">学号: {student.studentId}</div>
                          <div className="student-major">{student.major}</div>
                          <div className="student-year">{student.year}</div>
                          <div className="student-contact">
                            <span>{student.email}</span>
                            <span>{student.phone}</span>
                          </div>
                          <div className="last-login">最后登录: {student.lastLogin}</div>
                        </div>
                      </td>
                      <td className="academic-info">
                        <div className="gpa-display">
                          <span className="gpa-label">GPA:</span>
                          <span 
                            className="gpa-value"
                            style={{ color: getGpaColor(student.gpa) }}
                          >
                            {student.gpa.toFixed(2)}
                          </span>
                        </div>
                        <div className="prerequisites">
                          <div className="prerequisites-title">必修课程:</div>
                          {student.prerequisites.map((prereq, index) => (
                            <span 
                              key={index} 
                              className={`prerequisite ${prereq === '已完成' ? 'completed' : 'incomplete'}`}
                            >
                              {prereq}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="status-column">
                        <div className={`status-badge ${statusBadge.className}`}>
                          {statusBadge.text}
                        </div>
                        {student.interviewScheduled && (
                          <div className="interview-status">
                            ✅ 面试已安排
                          </div>
                        )}
                        {student.currentAssignment && (
                          <div className="assignment-status">
                            已分配导师
                          </div>
                        )}
                      </td>
                      <td className="eligibility-column">
                        <select
                          value={student.eligibility}
                          onChange={(e) => handleUpdateEligibility(student.id, e.target.value)}
                          className={`eligibility-select ${student.eligibility}`}
                        >
                          <option value="eligible">符合条件</option>
                          <option value="ineligible">不符合条件</option>
                          <option value="pending">待审核</option>
                        </select>
                      </td>
                      <td className="preferences-column">
                        <div className="preferences-list">
                          {student.preferences.map((preference, index) => (
                            <span key={index} className="preference-tag">
                              {index + 1}. {preference}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="special-cases">
                        {student.specialCases.length > 0 ? (
                          <div className="cases-list">
                            {student.specialCases.map((case_, index) => (
                              <span key={index} className="case-tag">
                                {case_}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="no-cases">无</span>
                        )}
                      </td>
                      <td className="engagement-column">
                        <div className={`engagement-badge ${engagementBadge.className}`}>
                          {engagementBadge.text}
                        </div>
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
                          <button className="action-btn exception" title="处理特殊情况">
                            ⚠️
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">👨‍🎓</div>
              <div className="empty-title">暂无学生数据</div>
              <div className="empty-description">
                {searchTerm ? '没有找到匹配的学生' : '尚未导入或添加学生信息'}
              </div>
            </div>
          )}
        </div>

        {/* Import Modal */}
        {showImportModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>从教务系统导入学生</h3>
                <button className="close-button" onClick={() => setShowImportModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="import-options">
                  <div className="import-option">
                    <input type="radio" id="import-enrolled" name="import-type" defaultChecked />
                    <label htmlFor="import-enrolled">导入已注册课程的学生</label>
                  </div>
                  <div className="import-option">
                    <input type="radio" id="import-eligible" name="import-type" />
                    <label htmlFor="import-eligible">导入符合条件的学生</label>
                  </div>
                  <div className="import-option">
                    <input type="radio" id="import-custom" name="import-type" />
                    <label htmlFor="import-custom">自定义导入条件</label>
                  </div>
                </div>
                <div className="import-criteria">
                  <div className="criteria-section">
                    <h4>筛选条件</h4>
                    <div className="criteria-grid">
                      <div className="criteria-item">
                        <label>年级:</label>
                        <select className="criteria-select">
                          <option value="">所有年级</option>
                          <option value="sophomore">大二</option>
                          <option value="junior">大三</option>
                          <option value="senior">大四</option>
                        </select>
                      </div>
                      <div className="criteria-item">
                        <label>最低GPA:</label>
                        <input type="number" step="0.1" min="0" max="4" className="criteria-input" placeholder="3.0" />
                      </div>
                      <div className="criteria-item">
                        <label>专业:</label>
                        <select className="criteria-select">
                          <option value="">所有专业</option>
                          <option value="cs">计算机科学</option>
                          <option value="ee">电子工程</option>
                          <option value="bio">生物医学工程</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowImportModal(false)}>
                  取消
                </button>
                <button className="action-button primary">
                  导入学生
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
                  <p>将向 {selectedStudents.length} 位学生发送消息</p>
                </div>
                <div className="message-templates">
                  <label>选择模板:</label>
                  <select className="template-select">
                    <option value="">自定义消息</option>
                    <option value="application-reminder">申请提醒</option>
                    <option value="interview-notification">面试通知</option>
                    <option value="deadline-warning">截止日期提醒</option>
                    <option value="status-update">状态更新</option>
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
                <div className="delivery-options">
                  <div className="option-item">
                    <input type="checkbox" id="email-delivery" defaultChecked />
                    <label htmlFor="email-delivery">邮件通知</label>
                  </div>
                  <div className="option-item">
                    <input type="checkbox" id="sms-delivery" />
                    <label htmlFor="sms-delivery">短信通知</label>
                  </div>
                  <div className="option-item">
                    <input type="checkbox" id="system-notification" defaultChecked />
                    <label htmlFor="system-notification">系统内通知</label>
                  </div>
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

export default StudentList