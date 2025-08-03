import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './Adjustment.css'

const Adjustment = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  
  const [adjustments, setAdjustments] = useState([])
  const [selectedTool, setSelectedTool] = useState('reassign')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedProfessor, setSelectedProfessor] = useState(null)
  
  // Mock data
  const [students] = useState([
    {
      id: 'stu1',
      name: '李明',
      currentAssignment: 'prof1',
      currentProfessorName: '张明教授',
      preferences: ['机器学习', '数据挖掘', '人工智能'],
      gpa: 3.85,
      status: 'confirmed',
      issues: []
    },
    {
      id: 'stu2',
      name: '张华',
      currentAssignment: null,
      currentProfessorName: null,
      preferences: ['信号处理', '通信系统'],
      gpa: 3.62,
      status: 'unmatched',
      issues: ['志愿教授容量已满']
    },
    {
      id: 'stu3',
      name: '王芳',
      currentAssignment: 'prof2',
      currentProfessorName: '李华教授',
      preferences: ['生物信息学', '医学影像'],
      gpa: 3.92,
      status: 'confirmed',
      issues: []
    },
    {
      id: 'stu4',
      name: '陈强',
      currentAssignment: null,
      currentProfessorName: null,
      preferences: ['纳米材料', '复合材料'],
      gpa: 2.85,
      status: 'rejected',
      issues: ['GPA不符合要求', '必修课程未完成']
    },
    {
      id: 'stu5',
      name: '刘伟',
      currentAssignment: 'prof1',
      currentProfessorName: '张明教授',
      preferences: ['软件架构', '云计算'],
      gpa: 3.75,
      status: 'waitlist',
      issues: ['第二志愿分配']
    }
  ])

  const [professors] = useState([
    {
      id: 'prof1',
      name: '张明教授',
      capacity: 5,
      currentStudents: ['stu1', 'stu5'],
      availableSlots: 3,
      research: '机器学习'
    },
    {
      id: 'prof2',
      name: '李华教授',
      capacity: 4,
      currentStudents: ['stu3'],
      availableSlots: 3,
      research: '生物信息学'
    },
    {
      id: 'prof3',
      name: '王芳教授',
      capacity: 6,
      currentStudents: [],
      availableSlots: 6,
      research: '信号处理'
    }
  ])

  useEffect(() => {
    // Mock adjustment history
    const mockAdjustments = [
      {
        id: '1',
        type: 'reassignment',
        studentId: 'stu6',
        studentName: '赵磊',
        fromProfessor: 'prof1',
        fromProfessorName: '张明教授',
        toProfessor: 'prof3',
        toProfessorName: '王芳教授',
        reason: '容量超限，需要重新分配',
        timestamp: '2024-12-11 15:30:00',
        operator: '教务秘书',
        status: 'completed'
      },
      {
        id: '2',
        type: 'special_case',
        studentId: 'stu7',
        studentName: '孙琳',
        description: '医疗特殊情况申请延期',
        reason: '因病需要延迟开始时间',
        timestamp: '2024-12-10 09:15:00',
        operator: '教务秘书',
        status: 'pending'
      },
      {
        id: '3',
        type: 'late_application',
        studentId: 'stu8',
        studentName: '马超',
        description: '逾期申请处理',
        reason: '转专业学生补充申请',
        timestamp: '2024-12-09 16:45:00',
        operator: '教务秘书',
        status: 'approved'
      }
    ]
    setAdjustments(mockAdjustments)
  }, [])

  const handleReassignment = (student, newProfessor) => {
    setSelectedStudent(student)
    setSelectedProfessor(newProfessor)
    setModalType('reassign')
    setShowModal(true)
  }

  const handleSpecialCase = (student) => {
    setSelectedStudent(student)
    setModalType('special_case')
    setShowModal(true)
  }

  const handleLateApplication = () => {
    setModalType('late_application')
    setShowModal(true)
  }

  const handleEmergencyReassignment = () => {
    setModalType('emergency')
    setShowModal(true)
  }

  const confirmAdjustment = () => {
    const newAdjustment = {
      id: Date.now().toString(),
      type: modalType,
      timestamp: new Date().toLocaleString('zh-CN'),
      operator: '教务秘书',
      status: 'completed'
    }

    if (modalType === 'reassign') {
      newAdjustment.studentId = selectedStudent.id
      newAdjustment.studentName = selectedStudent.name
      newAdjustment.fromProfessor = selectedStudent.currentAssignment
      newAdjustment.fromProfessorName = selectedStudent.currentProfessorName
      newAdjustment.toProfessor = selectedProfessor.id
      newAdjustment.toProfessorName = selectedProfessor.name
      newAdjustment.reason = '手动调整分配'
    }

    setAdjustments(prev => [newAdjustment, ...prev])
    setShowModal(false)
    setSelectedStudent(null)
    setSelectedProfessor(null)
  }

  const getStatusBadge = (status) => {
    const badges = {
      completed: { text: '已完成', className: 'status-completed' },
      pending: { text: '待处理', className: 'status-pending' },
      approved: { text: '已批准', className: 'status-approved' },
      rejected: { text: '已拒绝', className: 'status-rejected' }
    }
    return badges[status] || badges.pending
  }

  const getTypeIcon = (type) => {
    const icons = {
      reassignment: '🔄',
      special_case: '⚠️',
      late_application: '⏰',
      emergency: '🚨',
      withdrawal: '📤',
      course_change: '📋'
    }
    return icons[type] || '📝'
  }

  const renderReassignmentTool = () => (
    <div className="tool-content">
      <h3 className="tool-title">学生重新分配</h3>
      <div className="reassignment-grid">
        <div className="students-panel">
          <h4>待调整学生</h4>
          <div className="students-list">
            {students.filter(s => s.currentAssignment || s.status === 'unmatched').map(student => (
              <div key={student.id} className="student-card">
                <div className="student-info">
                  <div className="student-name">{student.name}</div>
                  <div className="student-details">
                    <span>GPA: {student.gpa}</span>
                    <span>{student.currentProfessorName || '未分配'}</span>
                  </div>
                  {student.issues.length > 0 && (
                    <div className="student-issues">
                      {student.issues.map((issue, index) => (
                        <span key={index} className="issue-tag">{issue}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="student-actions">
                  <select 
                    className="professor-select"
                    onChange={(e) => {
                      const professorId = e.target.value
                      if (professorId) {
                        const professor = professors.find(p => p.id === professorId)
                        handleReassignment(student, professor)
                      }
                    }}
                    value=""
                  >
                    <option value="">选择新导师</option>
                    {professors.filter(p => p.availableSlots > 0).map(professor => (
                      <option key={professor.id} value={professor.id}>
                        {professor.name} (剩余: {professor.availableSlots})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="professors-panel">
          <h4>导师容量状态</h4>
          <div className="professors-list">
            {professors.map(professor => (
              <div key={professor.id} className="professor-card">
                <div className="professor-info">
                  <div className="professor-name">{professor.name}</div>
                  <div className="professor-research">{professor.research}</div>
                  <div className="capacity-info">
                    <span className="current-load">
                      {professor.currentStudents.length}/{professor.capacity}
                    </span>
                    <div className="capacity-bar">
                      <div 
                        className="capacity-fill"
                        style={{ 
                          width: `${(professor.currentStudents.length / professor.capacity) * 100}%`,
                          backgroundColor: professor.currentStudents.length >= professor.capacity ? '#F44336' : '#4CAF50'
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="professor-students">
                  {professor.currentStudents.map(studentId => {
                    const student = students.find(s => s.id === studentId)
                    return student ? (
                      <div key={studentId} className="assigned-student">
                        {student.name}
                      </div>
                    ) : null
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderSpecialCasesTool = () => (
    <div className="tool-content">
      <h3 className="tool-title">特殊情况处理</h3>
      <div className="special-cases-grid">
        <div className="cases-list">
          {students.filter(s => s.issues.length > 0).map(student => (
            <div key={student.id} className="case-card">
              <div className="case-header">
                <div className="student-name">{student.name}</div>
                <div className="case-status">{student.status}</div>
              </div>
              <div className="case-issues">
                {student.issues.map((issue, index) => (
                  <div key={index} className="issue-item">
                    <span className="issue-text">{issue}</span>
                  </div>
                ))}
              </div>
              <div className="case-actions">
                <button 
                  className="action-button secondary"
                  onClick={() => handleSpecialCase(student)}
                >
                  处理特殊情况
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEmergencyTool = () => (
    <div className="tool-content">
      <h3 className="tool-title">紧急调整工具</h3>
      <div className="emergency-actions">
        <div className="emergency-card">
          <div className="emergency-icon">🚨</div>
          <div className="emergency-info">
            <h4>紧急重新分配</h4>
            <p>处理导师临时变更、学生紧急情况等</p>
          </div>
          <button 
            className="action-button primary"
            onClick={handleEmergencyReassignment}
          >
            启动紧急调整
          </button>
        </div>
        
        <div className="emergency-card">
          <div className="emergency-icon">⏰</div>
          <div className="emergency-info">
            <h4>逾期申请处理</h4>
            <p>处理错过申请截止日期的学生</p>
          </div>
          <button 
            className="action-button primary"
            onClick={handleLateApplication}
          >
            处理逾期申请
          </button>
        </div>
        
        <div className="emergency-card">
          <div className="emergency-icon">📤</div>
          <div className="emergency-info">
            <h4>学生退课处理</h4>
            <p>处理学生主动退课申请</p>
          </div>
          <button 
            className="action-button secondary"
            onClick={() => setModalType('withdrawal') || setShowModal(true)}
          >
            处理退课
          </button>
        </div>
      </div>
    </div>
  )

  const renderAdjustmentHistory = () => (
    <div className="tool-content">
      <h3 className="tool-title">调整记录</h3>
      <div className="history-table">
        <table>
          <thead>
            <tr>
              <th>类型</th>
              <th>学生</th>
              <th>调整内容</th>
              <th>原因</th>
              <th>操作时间</th>
              <th>操作员</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {adjustments.map(adjustment => {
              const statusBadge = getStatusBadge(adjustment.status)
              return (
                <tr key={adjustment.id}>
                  <td className="type-column">
                    <span className="type-icon">{getTypeIcon(adjustment.type)}</span>
                  </td>
                  <td className="student-column">
                    {adjustment.studentName || 'N/A'}
                  </td>
                  <td className="content-column">
                    {adjustment.type === 'reassignment' && (
                      <div className="reassignment-content">
                        <div>{adjustment.fromProfessorName}</div>
                        <div className="arrow">→</div>
                        <div>{adjustment.toProfessorName}</div>
                      </div>
                    )}
                    {adjustment.type !== 'reassignment' && (
                      <div>{adjustment.description}</div>
                    )}
                  </td>
                  <td className="reason-column">{adjustment.reason}</td>
                  <td className="time-column">{adjustment.timestamp}</td>
                  <td className="operator-column">{adjustment.operator}</td>
                  <td className="status-column">
                    <span className={`status-badge ${statusBadge.className}`}>
                      {statusBadge.text}
                    </span>
                  </td>
                  <td className="actions-column">
                    <button className="action-btn view" title="查看详情">👁️</button>
                    <button className="action-btn revert" title="撤销调整">↩️</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <Layout>
      <div className="adjustment-container">
        <div className="participant-header">
          <h1 className="page-title">手动调整与干预工具</h1>
          <div className="participant-nav">
            <button 
              className="nav-button"
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
              className="nav-button active"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/participant-management/adjustment`)}
            >
              手动调整
            </button>
          </div>
        </div>

        <div className="content-card">
          <div className="tool-selector">
            <button 
              className={`tool-button ${selectedTool === 'reassign' ? 'active' : ''}`}
              onClick={() => setSelectedTool('reassign')}
            >
              🔄 重新分配
            </button>
            <button 
              className={`tool-button ${selectedTool === 'special' ? 'active' : ''}`}
              onClick={() => setSelectedTool('special')}
            >
              ⚠️ 特殊情况
            </button>
            <button 
              className={`tool-button ${selectedTool === 'emergency' ? 'active' : ''}`}
              onClick={() => setSelectedTool('emergency')}
            >
              🚨 紧急调整
            </button>
            <button 
              className={`tool-button ${selectedTool === 'history' ? 'active' : ''}`}
              onClick={() => setSelectedTool('history')}
            >
              📋 调整记录
            </button>
          </div>

          <div className="tool-content-area">
            {selectedTool === 'reassign' && renderReassignmentTool()}
            {selectedTool === 'special' && renderSpecialCasesTool()}
            {selectedTool === 'emergency' && renderEmergencyTool()}
            {selectedTool === 'history' && renderAdjustmentHistory()}
          </div>
        </div>

        {/* Adjustment Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>
                  {modalType === 'reassign' && '确认重新分配'}
                  {modalType === 'special_case' && '处理特殊情况'}
                  {modalType === 'late_application' && '处理逾期申请'}
                  {modalType === 'emergency' && '紧急调整'}
                  {modalType === 'withdrawal' && '处理退课申请'}
                </h3>
                <button className="close-button" onClick={() => setShowModal(false)}>×</button>
              </div>
              <div className="modal-body">
                {modalType === 'reassign' && selectedStudent && selectedProfessor && (
                  <div className="reassign-confirmation">
                    <div className="confirmation-info">
                      <h4>调整详情</h4>
                      <div className="adjustment-details">
                        <div className="detail-row">
                          <span className="detail-label">学生:</span>
                          <span className="detail-value">{selectedStudent.name}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">原导师:</span>
                          <span className="detail-value">{selectedStudent.currentProfessorName || '无'}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">新导师:</span>
                          <span className="detail-value">{selectedProfessor.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="adjustment-reason">
                      <label>调整原因:</label>
                      <textarea 
                        className="reason-textarea"
                        placeholder="请输入调整原因..."
                        rows="3"
                      />
                    </div>
                  </div>
                )}
                
                {modalType === 'special_case' && selectedStudent && (
                  <div className="special-case-form">
                    <div className="student-info">
                      <h4>学生: {selectedStudent.name}</h4>
                      <div className="current-issues">
                        <strong>当前问题:</strong>
                        {selectedStudent.issues.map((issue, index) => (
                          <span key={index} className="issue-tag">{issue}</span>
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>处理方案:</label>
                      <select className="form-select">
                        <option value="">选择处理方案</option>
                        <option value="waive_requirement">豁免要求</option>
                        <option value="special_arrangement">特殊安排</option>
                        <option value="defer_enrollment">延期注册</option>
                        <option value="alternative_path">替代路径</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>详细说明:</label>
                      <textarea 
                        className="form-textarea"
                        placeholder="请详细说明处理方案和理由..."
                        rows="4"
                      />
                    </div>
                  </div>
                )}
                
                {modalType === 'late_application' && (
                  <div className="late-application-form">
                    <div className="form-group">
                      <label>学生信息:</label>
                      <input type="text" className="form-input" placeholder="学生姓名" />
                    </div>
                    <div className="form-group">
                      <label>学号:</label>
                      <input type="text" className="form-input" placeholder="学号" />
                    </div>
                    <div className="form-group">
                      <label>逾期原因:</label>
                      <textarea 
                        className="form-textarea"
                        placeholder="请说明逾期申请的原因..."
                        rows="3"
                      />
                    </div>
                    <div className="form-group">
                      <label>特殊批准依据:</label>
                      <textarea 
                        className="form-textarea"
                        placeholder="请提供批准逾期申请的依据..."
                        rows="3"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowModal(false)}>
                  取消
                </button>
                <button className="action-button primary" onClick={confirmAdjustment}>
                  确认调整
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Adjustment