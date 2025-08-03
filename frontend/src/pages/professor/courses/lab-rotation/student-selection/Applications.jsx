import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Applications.css'

const Applications = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [topics, setTopics] = useState([])
  const [filter, setFilter] = useState({
    status: 'all',
    topic: 'all',
    major: 'all',
    gpa: ''
  })
  const [sortBy, setSortBy] = useState('date')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Load applications from localStorage
    const storedApplications = localStorage.getItem(`applications_${courseId}`)
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications))
    } else {
      // Mock data for demonstration
      const mockApplications = [
        {
          id: '1',
          studentId: 'student1',
          studentName: '张三',
          studentMajor: '计算机科学',
          gpa: 3.8,
          topicId: '1',
          topicTitle: '机器学习在医疗诊断中的应用',
          applicationDate: '2024-03-15',
          status: 'pending',
          matchingScore: 92,
          personalStatement: '我对机器学习和医疗领域的结合非常感兴趣...',
          experience: '参与过深度学习项目，熟悉PyTorch和TensorFlow',
          skills: ['Python', 'Machine Learning', 'Data Analysis'],
          transcript: 'transcript_1.pdf',
          portfolio: 'portfolio_1.pdf'
        },
        {
          id: '2',
          studentId: 'student2',
          studentName: '李四',
          studentMajor: '人工智能',
          gpa: 3.9,
          topicId: '1',
          topicTitle: '机器学习在医疗诊断中的应用',
          applicationDate: '2024-03-16',
          status: 'pending',
          matchingScore: 88,
          personalStatement: '我在本科期间专注于深度学习研究...',
          experience: '发表过相关论文，有医疗数据处理经验',
          skills: ['Python', 'Deep Learning', 'Medical Imaging'],
          transcript: 'transcript_2.pdf',
          portfolio: 'portfolio_2.pdf'
        },
        {
          id: '3',
          studentId: 'student3',
          studentName: '王五',
          studentMajor: '软件工程',
          gpa: 3.7,
          topicId: '2',
          topicTitle: '智能物联网系统设计',
          applicationDate: '2024-03-17',
          status: 'interviewed',
          matchingScore: 85,
          personalStatement: '对物联网技术充满热情...',
          experience: '开发过智能家居系统，熟悉嵌入式开发',
          skills: ['C++', 'IoT', 'Embedded Systems'],
          transcript: 'transcript_3.pdf',
          portfolio: 'portfolio_3.pdf',
          interviewNotes: '表现良好，技术扎实'
        }
      ]
      setApplications(mockApplications)
      localStorage.setItem(`applications_${courseId}`, JSON.stringify(mockApplications))
    }

    // Load topics
    const storedTopics = localStorage.getItem(`topics_${courseId}`)
    if (storedTopics) {
      setTopics(JSON.parse(storedTopics))
    }
  }, [courseId])

  // Filter and sort applications
  const filteredApplications = applications.filter(app => {
    if (filter.status !== 'all' && app.status !== filter.status) return false
    if (filter.topic !== 'all' && app.topicId !== filter.topic) return false
    if (filter.major !== 'all' && app.studentMajor !== filter.major) return false
    if (filter.gpa && app.gpa < parseFloat(filter.gpa)) return false
    if (searchTerm && !app.studentName.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.applicationDate) - new Date(a.applicationDate)
      case 'gpa':
        return b.gpa - a.gpa
      case 'matching':
        return b.matchingScore - a.matchingScore
      case 'name':
        return a.studentName.localeCompare(b.studentName)
      default:
        return 0
    }
  })

  const handleViewApplication = (appId) => {
    navigate(`/professor/courses/lab-rotation/${courseId}/student-selection/applications/${appId}`)
  }

  const handleBatchAction = (action) => {
    const selectedApps = applications.filter(app => app.selected)
    if (selectedApps.length === 0) {
      alert('请先选择申请')
      return
    }
    
    switch (action) {
      case 'interview':
        navigate(`/professor/courses/lab-rotation/${courseId}/student-selection/interviews`, {
          state: { selectedApplications: selectedApps }
        })
        break
      case 'accept':
      case 'reject':
      case 'waitlist':
        updateApplicationStatus(selectedApps, action)
        break
    }
  }

  const updateApplicationStatus = (apps, status) => {
    const updatedApps = applications.map(app => {
      if (apps.find(a => a.id === app.id)) {
        return { ...app, status, selected: false }
      }
      return app
    })
    setApplications(updatedApps)
    localStorage.setItem(`applications_${courseId}`, JSON.stringify(updatedApps))
  }

  const toggleApplicationSelection = (appId) => {
    const updatedApps = applications.map(app => 
      app.id === appId ? { ...app, selected: !app.selected } : app
    )
    setApplications(updatedApps)
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'badge-warning'
      case 'interviewed': return 'badge-info'
      case 'accepted': return 'badge-success'
      case 'rejected': return 'badge-danger'
      case 'waitlist': return 'badge-secondary'
      default: return ''
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return '待审核'
      case 'interviewed': return '已面试'
      case 'accepted': return '已录取'
      case 'rejected': return '已拒绝'
      case 'waitlist': return '候补名单'
      default: return status
    }
  }

  const majors = [...new Set(applications.map(app => app.studentMajor))]

  return (
    <div className="applications-container">
      <div className="applications-header">
        <h2>学生申请管理</h2>
        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate(`/professor/courses/lab-rotation/${courseId}/student-selection/interviews`)}
          >
            面试管理
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate(`/professor/courses/lab-rotation/${courseId}/student-selection/selection`)}
          >
            最终选择
          </button>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="搜索学生姓名..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <select 
            value={filter.status} 
            onChange={(e) => setFilter({...filter, status: e.target.value})}
          >
            <option value="all">所有状态</option>
            <option value="pending">待审核</option>
            <option value="interviewed">已面试</option>
            <option value="accepted">已录取</option>
            <option value="rejected">已拒绝</option>
            <option value="waitlist">候补名单</option>
          </select>

          <select 
            value={filter.topic} 
            onChange={(e) => setFilter({...filter, topic: e.target.value})}
          >
            <option value="all">所有课题</option>
            {topics.map(topic => (
              <option key={topic.id} value={topic.id}>{topic.title}</option>
            ))}
          </select>

          <select 
            value={filter.major} 
            onChange={(e) => setFilter({...filter, major: e.target.value})}
          >
            <option value="all">所有专业</option>
            {majors.map(major => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="最低GPA"
            value={filter.gpa}
            onChange={(e) => setFilter({...filter, gpa: e.target.value})}
            min="0"
            max="4"
            step="0.1"
          />
        </div>

        <div className="sort-controls">
          <label>排序方式：</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">申请时间</option>
            <option value="gpa">GPA</option>
            <option value="matching">匹配度</option>
            <option value="name">姓名</option>
          </select>
        </div>
      </div>

      <div className="batch-actions">
        <button 
          className="btn btn-sm"
          onClick={() => handleBatchAction('interview')}
        >
          批量安排面试
        </button>
        <button 
          className="btn btn-sm btn-success"
          onClick={() => handleBatchAction('accept')}
        >
          批量录取
        </button>
        <button 
          className="btn btn-sm btn-danger"
          onClick={() => handleBatchAction('reject')}
        >
          批量拒绝
        </button>
        <button 
          className="btn btn-sm btn-secondary"
          onClick={() => handleBatchAction('waitlist')}
        >
          加入候补
        </button>
      </div>

      <div className="applications-list">
        {filteredApplications.map(app => (
          <div key={app.id} className="application-card">
            <div className="card-header">
              <input
                type="checkbox"
                checked={app.selected || false}
                onChange={() => toggleApplicationSelection(app.id)}
              />
              <div className="student-info">
                <h3>{app.studentName}</h3>
                <p>{app.studentMajor} | GPA: {app.gpa}</p>
              </div>
              <div className="matching-score">
                <div className="score-circle">
                  <span>{app.matchingScore}%</span>
                </div>
                <small>匹配度</small>
              </div>
            </div>
            
            <div className="card-body">
              <div className="topic-info">
                <strong>申请课题：</strong>{app.topicTitle}
              </div>
              <div className="application-date">
                <strong>申请时间：</strong>{app.applicationDate}
              </div>
              <div className="skills">
                <strong>技能：</strong>
                {app.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
              <div className="status">
                <span className={`badge ${getStatusBadgeClass(app.status)}`}>
                  {getStatusText(app.status)}
                </span>
              </div>
            </div>
            
            <div className="card-actions">
              <button 
                className="btn btn-primary"
                onClick={() => handleViewApplication(app.id)}
              >
                查看详情
              </button>
              {app.status === 'pending' && (
                <button 
                  className="btn btn-secondary"
                  onClick={() => navigate(`/professor/courses/lab-rotation/${courseId}/student-selection/interviews/schedule/${app.id}`)}
                >
                  安排面试
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="no-applications">
          <p>暂无符合条件的申请</p>
        </div>
      )}
    </div>
  )
}

export default Applications