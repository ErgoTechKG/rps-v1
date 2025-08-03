import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './Submissions.css'

const Submissions = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState([])
  const [assignments, setAssignments] = useState([])
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)
  const [submissionForm, setSubmissionForm] = useState({
    files: [],
    comments: '',
    resubmission: false,
    originalSubmissionId: null
  })
  const [filter, setFilter] = useState('all')
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    loadAssignments()
    loadSubmissions()
  }, [courseId])

  const loadAssignments = () => {
    // Mock assignment data
    const mockAssignments = [
      {
        id: '1',
        title: '文献调研报告',
        description: '完成与研究课题相关的文献调研，撰写详细报告',
        dueDate: '2024-02-15',
        maxFiles: 3,
        allowedFormats: ['.pdf', '.docx', '.doc'],
        maxSizePerFile: 10, // MB
        requirements: [
          '至少30篇相关论文',
          '报告字数不少于5000字',
          '包含详细的参考文献列表'
        ],
        submissionStatus: 'submitted',
        grade: null,
        feedback: null
      },
      {
        id: '2',
        title: '实验代码提交',
        description: '提交完整的实验代码及相关文档',
        dueDate: '2024-02-20',
        maxFiles: 5,
        allowedFormats: ['.py', '.ipynb', '.zip', '.tar.gz', '.md'],
        maxSizePerFile: 50,
        requirements: [
          '包含完整的源代码',
          '提供运行说明文档',
          '包含测试数据和结果'
        ],
        submissionStatus: 'pending',
        grade: null,
        feedback: null
      },
      {
        id: '3',
        title: '周报总结',
        description: '第一周学习和研究进展总结',
        dueDate: '2024-02-08',
        maxFiles: 2,
        allowedFormats: ['.pdf', '.docx'],
        maxSizePerFile: 5,
        requirements: [
          '总结本周学习内容',
          '记录遇到的问题和解决方案',
          '制定下周学习计划'
        ],
        submissionStatus: 'graded',
        grade: 85,
        feedback: '内容详实，思路清晰。建议在问题分析部分更加深入。'
      },
      {
        id: '4',
        title: '中期报告',
        description: '研究项目中期进展报告',
        dueDate: '2024-03-01',
        maxFiles: 3,
        allowedFormats: ['.pdf', '.docx', '.pptx'],
        maxSizePerFile: 20,
        requirements: [
          '总结前期研究进展',
          '分析遇到的技术难点',
          '调整后续研究计划'
        ],
        submissionStatus: 'not_submitted',
        grade: null,
        feedback: null
      }
    ]
    setAssignments(mockAssignments)
  }

  const loadSubmissions = () => {
    // Mock submission data
    const mockSubmissions = [
      {
        id: '1',
        assignmentId: '1',
        assignmentTitle: '文献调研报告',
        submittedAt: '2024-02-14T10:30:00',
        files: [
          { name: '文献调研报告.pdf', size: 2.5, type: 'application/pdf' },
          { name: '参考文献.docx', size: 0.8, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
        ],
        comments: '已完成文献调研，包含30篇相关论文的分析和总结。',
        status: 'submitted',
        version: 1,
        grade: null,
        feedback: null,
        isResubmission: false
      },
      {
        id: '2',
        assignmentId: '3',
        assignmentTitle: '周报总结',
        submittedAt: '2024-02-07T15:45:00',
        files: [
          { name: '第一周学习总结.pdf', size: 1.2, type: 'application/pdf' }
        ],
        comments: '本周主要完成了环境搭建和初步的文献调研工作。',
        status: 'graded',
        version: 1,
        grade: 85,
        feedback: '内容详实，思路清晰。建议在问题分析部分更加深入。',
        isResubmission: false
      }
    ]
    
    const savedSubmissions = localStorage.getItem(`submissions_${courseId}`)
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions))
    } else {
      setSubmissions(mockSubmissions)
      localStorage.setItem(`submissions_${courseId}`, JSON.stringify(mockSubmissions))
    }
  }

  const saveSubmissions = (updatedSubmissions) => {
    setSubmissions(updatedSubmissions)
    localStorage.setItem(`submissions_${courseId}`, JSON.stringify(updatedSubmissions))
  }

  const filteredAssignments = assignments.filter(assignment => {
    switch (filter) {
      case 'pending':
        return assignment.submissionStatus === 'pending' || assignment.submissionStatus === 'not_submitted'
      case 'submitted':
        return assignment.submissionStatus === 'submitted'
      case 'graded':
        return assignment.submissionStatus === 'graded'
      case 'overdue':
        return (assignment.submissionStatus === 'not_submitted' || assignment.submissionStatus === 'pending') 
               && new Date(assignment.dueDate) < new Date()
      default:
        return true
    }
  })

  const handleFileSelect = (files) => {
    const newFiles = Array.from(files).filter(file => {
      // Check file format
      const allowedFormats = selectedAssignment.allowedFormats
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
      if (!allowedFormats.includes(fileExtension)) {
        alert(`文件格式不支持: ${file.name}。允许的格式: ${allowedFormats.join(', ')}`)
        return false
      }
      
      // Check file size
      const maxSize = selectedAssignment.maxSizePerFile * 1024 * 1024 // Convert MB to bytes
      if (file.size > maxSize) {
        alert(`文件过大: ${file.name}。最大允许 ${selectedAssignment.maxSizePerFile}MB`)
        return false
      }
      
      return true
    })

    // Check total file count
    const totalFiles = submissionForm.files.length + newFiles.length
    if (totalFiles > selectedAssignment.maxFiles) {
      alert(`文件数量超限。最多允许 ${selectedAssignment.maxFiles} 个文件`)
      return
    }

    setSubmissionForm({
      ...submissionForm,
      files: [...submissionForm.files, ...newFiles]
    })
  }

  const removeFile = (index) => {
    const updatedFiles = submissionForm.files.filter((_, i) => i !== index)
    setSubmissionForm({ ...submissionForm, files: updatedFiles })
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    handleFileSelect(files)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const submitAssignment = () => {
    if (submissionForm.files.length === 0) {
      alert('请至少上传一个文件')
      return
    }

    const newSubmission = {
      id: Date.now().toString(),
      assignmentId: selectedAssignment.id,
      assignmentTitle: selectedAssignment.title,
      submittedAt: new Date().toISOString(),
      files: submissionForm.files.map(file => ({
        name: file.name,
        size: file.size / (1024 * 1024), // Convert to MB
        type: file.type
      })),
      comments: submissionForm.comments,
      status: 'submitted',
      version: submissionForm.resubmission ? 
        (submissions.filter(s => s.assignmentId === selectedAssignment.id).length + 1) : 1,
      grade: null,
      feedback: null,
      isResubmission: submissionForm.resubmission
    }

    const updatedSubmissions = [...submissions, newSubmission]
    saveSubmissions(updatedSubmissions)

    // Update assignment status
    const updatedAssignments = assignments.map(assignment => {
      if (assignment.id === selectedAssignment.id) {
        return { ...assignment, submissionStatus: 'submitted' }
      }
      return assignment
    })
    setAssignments(updatedAssignments)

    alert('作业提交成功！')
    setShowSubmissionModal(false)
    setSelectedAssignment(null)
    setSubmissionForm({ files: [], comments: '', resubmission: false, originalSubmissionId: null })
  }

  const openSubmissionModal = (assignment, isResubmission = false) => {
    setSelectedAssignment(assignment)
    setSubmissionForm({
      files: [],
      comments: '',
      resubmission: isResubmission,
      originalSubmissionId: isResubmission ? 
        submissions.find(s => s.assignmentId === assignment.id)?.id : null
    })
    setShowSubmissionModal(true)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'not_submitted': return '#e74c3c'
      case 'pending': return '#f39c12'
      case 'submitted': return '#3498db'
      case 'graded': return '#27ae60'
      default: return '#95a5a6'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'not_submitted': return '未提交'
      case 'pending': return '待提交'
      case 'submitted': return '已提交'
      case 'graded': return '已评分'
      default: return '未知'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('zh-CN')
  }

  const isOverdue = (assignment) => {
    return (assignment.submissionStatus === 'not_submitted' || assignment.submissionStatus === 'pending') 
           && new Date(assignment.dueDate) < new Date()
  }

  const getSubmissionsForAssignment = (assignmentId) => {
    return submissions.filter(s => s.assignmentId === assignmentId)
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
  }

  return (
    <Layout>
      <div className="submissions-container">
        <div className="submissions-header">
          <div className="header-left">
            <h1>作业提交</h1>
            <div className="breadcrumb">
              <span onClick={() => navigate(`/student/dashboard`)}>学生工作台</span>
              <span>/</span>
              <span onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/learning-process/tasks`)}>学习过程</span>
              <span>/</span>
              <span>作业提交</span>
            </div>
          </div>
          
          <div className="header-actions">
            <button 
              className="nav-btn"
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/learning-process/tasks`)}
            >
              任务管理
            </button>
            <button 
              className="nav-btn"
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/learning-process/meetings`)}
            >
              会议管理
            </button>
            <button 
              className="nav-btn"
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/learning-process/progress`)}
            >
              进度跟踪
            </button>
          </div>
        </div>

        <div className="submissions-controls">
          <div className="filter-controls">
            <label>筛选：</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">全部作业</option>
              <option value="pending">待提交</option>
              <option value="submitted">已提交</option>
              <option value="graded">已评分</option>
              <option value="overdue">已逾期</option>
            </select>
          </div>
        </div>

        <div className="submissions-stats">
          <div className="stat-card">
            <span className="stat-number">{assignments.filter(a => a.submissionStatus === 'not_submitted' || a.submissionStatus === 'pending').length}</span>
            <span className="stat-label">待提交</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{assignments.filter(a => a.submissionStatus === 'submitted').length}</span>
            <span className="stat-label">已提交</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{assignments.filter(a => a.submissionStatus === 'graded').length}</span>
            <span className="stat-label">已评分</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{assignments.filter(a => isOverdue(a)).length}</span>
            <span className="stat-label">已逾期</span>
          </div>
        </div>

        <div className="assignments-list">
          {filteredAssignments.map(assignment => {
            const assignmentSubmissions = getSubmissionsForAssignment(assignment.id)
            const latestSubmission = assignmentSubmissions[0]
            
            return (
              <div 
                key={assignment.id} 
                className={`assignment-card ${assignment.submissionStatus} ${isOverdue(assignment) ? 'overdue' : ''}`}
              >
                <div className="assignment-header">
                  <div className="assignment-title-row">
                    <h3 className="assignment-title">{assignment.title}</h3>
                    <div className="assignment-badges">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(assignment.submissionStatus) }}
                      >
                        {getStatusText(assignment.submissionStatus)}
                      </span>
                      {isOverdue(assignment) && (
                        <span className="overdue-badge">逾期</span>
                      )}
                    </div>
                  </div>
                  <p className="assignment-description">{assignment.description}</p>
                </div>

                <div className="assignment-info">
                  <div className="info-row">
                    <span className="label">截止时间：</span>
                    <span className={`value ${isOverdue(assignment) ? 'overdue-text' : ''}`}>
                      {formatDate(assignment.dueDate)}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="label">文件限制：</span>
                    <span className="value">最多{assignment.maxFiles}个文件，每个不超过{assignment.maxSizePerFile}MB</span>
                  </div>
                  <div className="info-row">
                    <span className="label">支持格式：</span>
                    <span className="value">{assignment.allowedFormats.join(', ')}</span>
                  </div>
                  {assignment.grade !== null && (
                    <div className="info-row">
                      <span className="label">成绩：</span>
                      <span className="value grade">{assignment.grade}分</span>
                    </div>
                  )}
                </div>

                <div className="assignment-requirements">
                  <h4>要求：</h4>
                  <ul>
                    {assignment.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                {assignment.feedback && (
                  <div className="assignment-feedback">
                    <h4>教师反馈：</h4>
                    <p>{assignment.feedback}</p>
                  </div>
                )}

                {assignmentSubmissions.length > 0 && (
                  <div className="submission-history">
                    <h4>提交历史：</h4>
                    <div className="submissions-timeline">
                      {assignmentSubmissions.map((submission, index) => (
                        <div key={submission.id} className="submission-item">
                          <div className="submission-info">
                            <span className="submission-version">
                              第{submission.version}次提交
                              {submission.isResubmission && <span className="resubmission-tag">重新提交</span>}
                            </span>
                            <span className="submission-date">
                              {formatDate(submission.submittedAt)}
                            </span>
                          </div>
                          <div className="submission-files">
                            {submission.files.map((file, fileIndex) => (
                              <span key={fileIndex} className="file-tag">
                                📄 {file.name} ({file.size.toFixed(1)}MB)
                              </span>
                            ))}
                          </div>
                          {submission.comments && (
                            <div className="submission-comments">
                              <strong>提交说明：</strong>{submission.comments}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="assignment-actions">
                  {(assignment.submissionStatus === 'not_submitted' || assignment.submissionStatus === 'pending') && (
                    <button 
                      className="action-btn submit-btn"
                      onClick={() => openSubmissionModal(assignment)}
                    >
                      提交作业
                    </button>
                  )}
                  {assignment.submissionStatus === 'submitted' && (
                    <button 
                      className="action-btn resubmit-btn"
                      onClick={() => openSubmissionModal(assignment, true)}
                    >
                      重新提交
                    </button>
                  )}
                  {assignment.submissionStatus === 'graded' && assignment.grade < 60 && (
                    <button 
                      className="action-btn resubmit-btn"
                      onClick={() => openSubmissionModal(assignment, true)}
                    >
                      重新提交
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {showSubmissionModal && selectedAssignment && (
          <div className="submission-modal" onClick={() => setShowSubmissionModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>
                  {submissionForm.resubmission ? '重新提交' : '提交作业'}: {selectedAssignment.title}
                </h2>
                <button onClick={() => setShowSubmissionModal(false)}>×</button>
              </div>
              
              <div className="modal-body">
                <div className="assignment-summary">
                  <h3>作业要求</h3>
                  <p>{selectedAssignment.description}</p>
                  <ul>
                    {selectedAssignment.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="file-upload-section">
                  <h3>文件上传</h3>
                  <p className="upload-info">
                    最多{selectedAssignment.maxFiles}个文件，每个不超过{selectedAssignment.maxSizePerFile}MB
                    <br />
                    支持格式：{selectedAssignment.allowedFormats.join(', ')}
                  </p>
                  
                  <div 
                    className={`file-drop-zone ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="drop-zone-content">
                      <span className="drop-icon">📁</span>
                      <p>拖拽文件到此处或点击选择文件</p>
                      <input
                        type="file"
                        multiple
                        accept={selectedAssignment.allowedFormats.join(',')}
                        onChange={(e) => handleFileSelect(e.target.files)}
                        className="file-input"
                      />
                    </div>
                  </div>

                  {submissionForm.files.length > 0 && (
                    <div className="uploaded-files">
                      <h4>已选择的文件：</h4>
                      {submissionForm.files.map((file, index) => (
                        <div key={index} className="file-item">
                          <span className="file-info">
                            📄 {file.name} ({formatFileSize(file.size)})
                          </span>
                          <button 
                            className="remove-file-btn"
                            onClick={() => removeFile(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="comments-section">
                  <h3>提交说明</h3>
                  <textarea
                    value={submissionForm.comments}
                    onChange={(e) => setSubmissionForm({ ...submissionForm, comments: e.target.value })}
                    placeholder="请简要说明本次提交的内容、遇到的问题或需要特别说明的地方..."
                    rows="4"
                  />
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowSubmissionModal(false)}
                >
                  取消
                </button>
                <button 
                  className="btn-primary"
                  onClick={submitAssignment}
                  disabled={submissionForm.files.length === 0}
                >
                  确认提交
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Submissions