import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Selection.css'

const Selection = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [topics, setTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState('all')
  const [rankings, setRankings] = useState({})

  useEffect(() => {
    // Load applications
    const storedApplications = localStorage.getItem(`applications_${courseId}`)
    if (storedApplications) {
      const apps = JSON.parse(storedApplications)
      // Filter only interviewed or better status
      const eligibleApps = apps.filter(app => 
        ['interviewed', 'accepted', 'waitlist'].includes(app.status)
      )
      setApplications(eligibleApps)
    }

    // Load topics
    const storedTopics = localStorage.getItem(`topics_${courseId}`)
    if (storedTopics) {
      setTopics(JSON.parse(storedTopics))
    }

    // Load rankings
    const storedRankings = localStorage.getItem(`rankings_${courseId}`)
    if (storedRankings) {
      setRankings(JSON.parse(storedRankings))
    }
  }, [courseId])

  const handleRankingChange = (appId, rank) => {
    const newRankings = { ...rankings, [appId]: rank }
    setRankings(newRankings)
    localStorage.setItem(`rankings_${courseId}`, JSON.stringify(newRankings))
  }

  const handleAccept = (appId) => {
    updateApplicationStatus(appId, 'accepted')
  }

  const handleReject = (appId) => {
    updateApplicationStatus(appId, 'rejected')
  }

  const handleWaitlist = (appId) => {
    updateApplicationStatus(appId, 'waitlist')
  }

  const updateApplicationStatus = (appId, status) => {
    const allApps = JSON.parse(localStorage.getItem(`applications_${courseId}`) || '[]')
    const updatedApps = allApps.map(app => 
      app.id === appId ? { ...app, status } : app
    )
    localStorage.setItem(`applications_${courseId}`, JSON.stringify(updatedApps))
    
    // Update local state
    const updatedEligibleApps = applications.map(app => 
      app.id === appId ? { ...app, status } : app
    )
    setApplications(updatedEligibleApps)
  }

  const handleConfirmSelections = () => {
    const acceptedApps = applications.filter(app => app.status === 'accepted')
    if (acceptedApps.length === 0) {
      alert('请先选择至少一名学生')
      return
    }

    if (window.confirm(`确认录取 ${acceptedApps.length} 名学生吗？`)) {
      navigate(`/professor/courses/lab-rotation/${courseId}/student-selection/confirmation`, {
        state: { acceptedStudents: acceptedApps }
      })
    }
  }

  const filteredApplications = selectedTopic === 'all' 
    ? applications 
    : applications.filter(app => app.topicId === selectedTopic)

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    // First sort by ranking
    const rankA = rankings[a.id] || 999
    const rankB = rankings[b.id] || 999
    if (rankA !== rankB) return rankA - rankB
    
    // Then by matching score
    return b.matchingScore - a.matchingScore
  })

  const getTopicStats = (topicId) => {
    const topicApps = applications.filter(app => app.topicId === topicId)
    return {
      total: topicApps.length,
      accepted: topicApps.filter(app => app.status === 'accepted').length,
      waitlist: topicApps.filter(app => app.status === 'waitlist').length
    }
  }

  return (
    <div className="selection-container">
      <div className="selection-header">
        <h2>最终选择</h2>
        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate(`/professor/courses/lab-rotation/${courseId}/student-selection/applications`)}
          >
            返回申请列表
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleConfirmSelections}
          >
            确认选择
          </button>
        </div>
      </div>

      <div className="topic-filter">
        <label>按课题筛选：</label>
        <select 
          value={selectedTopic} 
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="all">所有课题</option>
          {topics.map(topic => {
            const stats = getTopicStats(topic.id)
            return (
              <option key={topic.id} value={topic.id}>
                {topic.title} (已录取: {stats.accepted}/{topic.maxStudents || 5})
              </option>
            )
          })}
        </select>
      </div>

      <div className="selection-stats">
        <div className="stat-card">
          <h4>总候选人数</h4>
          <p>{applications.length}</p>
        </div>
        <div className="stat-card">
          <h4>已录取</h4>
          <p className="accepted">{applications.filter(app => app.status === 'accepted').length}</p>
        </div>
        <div className="stat-card">
          <h4>候补名单</h4>
          <p className="waitlist">{applications.filter(app => app.status === 'waitlist').length}</p>
        </div>
        <div className="stat-card">
          <h4>已拒绝</h4>
          <p className="rejected">{applications.filter(app => app.status === 'rejected').length}</p>
        </div>
      </div>

      <div className="selection-list">
        <div className="list-header">
          <span>排名</span>
          <span>学生信息</span>
          <span>课题</span>
          <span>匹配度</span>
          <span>面试评分</span>
          <span>状态</span>
          <span>操作</span>
        </div>

        {sortedApplications.map((app, index) => (
          <div key={app.id} className={`selection-item ${app.status}`}>
            <div className="ranking">
              <input
                type="number"
                min="1"
                max="99"
                value={rankings[app.id] || ''}
                onChange={(e) => handleRankingChange(app.id, parseInt(e.target.value))}
                placeholder={index + 1}
              />
            </div>
            
            <div className="student-info">
              <strong>{app.studentName}</strong>
              <small>{app.studentMajor} | GPA: {app.gpa}</small>
            </div>
            
            <div className="topic-info">
              <small>{app.topicTitle}</small>
            </div>
            
            <div className="matching-score">
              <div className="score-bar">
                <div 
                  className="score-fill" 
                  style={{ width: `${app.matchingScore}%` }}
                />
              </div>
              <span>{app.matchingScore}%</span>
            </div>
            
            <div className="interview-rating">
              {app.interviewRating ? (
                <div className="rating">
                  {'⭐'.repeat(app.interviewRating)}
                  <span>{app.interviewRating}/5</span>
                </div>
              ) : (
                <span className="no-rating">未评分</span>
              )}
            </div>
            
            <div className="status">
              <span className={`status-badge ${app.status}`}>
                {app.status === 'accepted' && '已录取'}
                {app.status === 'waitlist' && '候补'}
                {app.status === 'rejected' && '已拒绝'}
                {app.status === 'interviewed' && '待决定'}
              </span>
            </div>
            
            <div className="actions">
              {app.status !== 'accepted' && (
                <button 
                  className="btn btn-sm btn-success"
                  onClick={() => handleAccept(app.id)}
                >
                  录取
                </button>
              )}
              {app.status !== 'waitlist' && (
                <button 
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleWaitlist(app.id)}
                >
                  候补
                </button>
              )}
              {app.status !== 'rejected' && (
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => handleReject(app.id)}
                >
                  拒绝
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="selection-footer">
        <div className="notes">
          <h4>选择说明</h4>
          <ul>
            <li>请根据学生的综合表现进行排名和选择</li>
            <li>每个课题的录取人数不应超过设定的上限</li>
            <li>候补名单学生将在有空缺时按排名顺序递补</li>
            <li>确认选择后将自动发送通知给相关学生</li>
          </ul>
        </div>
        
        <button 
          className="btn btn-primary btn-large"
          onClick={handleConfirmSelections}
        >
          确认最终选择
        </button>
      </div>
    </div>
  )
}

export default Selection