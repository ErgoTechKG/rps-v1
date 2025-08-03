import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import './Interviews.css'

const Interviews = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [interviews, setInterviews] = useState([])
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [newSlot, setNewSlot] = useState({ date: '', time: '', duration: 30 })

  useEffect(() => {
    // Load interviews from localStorage
    const storedInterviews = localStorage.getItem(`interviews_${courseId}`)
    if (storedInterviews) {
      setInterviews(JSON.parse(storedInterviews))
    } else {
      // Mock data
      const mockInterviews = [
        {
          id: '1',
          studentId: 'student3',
          studentName: '王五',
          topicTitle: '智能物联网系统设计',
          date: '2024-03-25',
          time: '14:00',
          duration: 30,
          status: 'scheduled',
          location: 'Room 302',
          notes: ''
        },
        {
          id: '2',
          studentId: 'student1',
          studentName: '张三',
          topicTitle: '机器学习在医疗诊断中的应用',
          date: '2024-03-26',
          time: '10:00',
          duration: 30,
          status: 'completed',
          location: 'Online - Zoom',
          notes: '技术基础扎实，对研究方向有深入了解',
          rating: 4
        }
      ]
      setInterviews(mockInterviews)
      localStorage.setItem(`interviews_${courseId}`, JSON.stringify(mockInterviews))
    }

    // Load available slots
    const storedSlots = localStorage.getItem(`interview_slots_${courseId}`)
    if (storedSlots) {
      setAvailableSlots(JSON.parse(storedSlots))
    } else {
      // Mock available slots
      const mockSlots = [
        { id: '1', date: '2024-03-27', time: '09:00', duration: 30, available: true },
        { id: '2', date: '2024-03-27', time: '10:00', duration: 30, available: true },
        { id: '3', date: '2024-03-27', time: '14:00', duration: 30, available: true },
        { id: '4', date: '2024-03-28', time: '09:00', duration: 30, available: true },
        { id: '5', date: '2024-03-28', time: '11:00', duration: 30, available: true }
      ]
      setAvailableSlots(mockSlots)
      localStorage.setItem(`interview_slots_${courseId}`, JSON.stringify(mockSlots))
    }

    // Handle batch scheduling from applications page
    if (location.state?.selectedApplications) {
      // Process batch scheduling
      console.log('Batch scheduling for:', location.state.selectedApplications)
    }
  }, [courseId, location.state])

  const handleAddSlot = () => {
    if (!newSlot.date || !newSlot.time) {
      alert('请选择日期和时间')
      return
    }

    const slot = {
      id: Date.now().toString(),
      ...newSlot,
      available: true
    }

    const updatedSlots = [...availableSlots, slot]
    setAvailableSlots(updatedSlots)
    localStorage.setItem(`interview_slots_${courseId}`, JSON.stringify(updatedSlots))
    setNewSlot({ date: '', time: '', duration: 30 })
  }

  const handleDeleteSlot = (slotId) => {
    const updatedSlots = availableSlots.filter(slot => slot.id !== slotId)
    setAvailableSlots(updatedSlots)
    localStorage.setItem(`interview_slots_${courseId}`, JSON.stringify(updatedSlots))
  }

  const handleUpdateInterview = (interviewId, updates) => {
    const updatedInterviews = interviews.map(interview => 
      interview.id === interviewId ? { ...interview, ...updates } : interview
    )
    setInterviews(updatedInterviews)
    localStorage.setItem(`interviews_${courseId}`, JSON.stringify(updatedInterviews))
  }

  const handleCompleteInterview = (interviewId) => {
    navigate(`/professor/courses/lab-rotation/${courseId}/student-selection/interviews/evaluate/${interviewId}`)
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'scheduled': return 'badge-info'
      case 'completed': return 'badge-success'
      case 'cancelled': return 'badge-danger'
      case 'rescheduled': return 'badge-warning'
      default: return ''
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled': return '已安排'
      case 'completed': return '已完成'
      case 'cancelled': return '已取消'
      case 'rescheduled': return '已改期'
      default: return status
    }
  }

  const upcomingInterviews = interviews.filter(i => i.status === 'scheduled')
  const completedInterviews = interviews.filter(i => i.status === 'completed')

  return (
    <div className="interviews-container">
      <div className="interviews-header">
        <h2>面试管理</h2>
        <button 
          className="btn btn-primary"
          onClick={() => navigate(`/professor/courses/lab-rotation/${courseId}/student-selection/applications`)}
        >
          返回申请列表
        </button>
      </div>

      <div className="interview-sections">
        <div className="section">
          <h3>可用时间段管理</h3>
          <div className="slot-management">
            <div className="add-slot-form">
              <input
                type="date"
                value={newSlot.date}
                onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
              />
              <input
                type="time"
                value={newSlot.time}
                onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
              />
              <select
                value={newSlot.duration}
                onChange={(e) => setNewSlot({...newSlot, duration: parseInt(e.target.value)})}
              >
                <option value={30}>30分钟</option>
                <option value={45}>45分钟</option>
                <option value={60}>60分钟</option>
              </select>
              <button className="btn btn-primary" onClick={handleAddSlot}>
                添加时间段
              </button>
            </div>

            <div className="slots-list">
              {availableSlots.filter(slot => slot.available).map(slot => (
                <div key={slot.id} className="slot-item">
                  <span>{slot.date} {slot.time} ({slot.duration}分钟)</span>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteSlot(slot.id)}
                  >
                    删除
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section">
          <h3>即将进行的面试</h3>
          <div className="interviews-list">
            {upcomingInterviews.map(interview => (
              <div key={interview.id} className="interview-card">
                <div className="interview-info">
                  <h4>{interview.studentName}</h4>
                  <p className="topic">{interview.topicTitle}</p>
                  <div className="interview-details">
                    <span>📅 {interview.date}</span>
                    <span>🕐 {interview.time}</span>
                    <span>⏱️ {interview.duration}分钟</span>
                    <span>📍 {interview.location}</span>
                  </div>
                </div>
                <div className="interview-actions">
                  <span className={`badge ${getStatusBadgeClass(interview.status)}`}>
                    {getStatusText(interview.status)}
                  </span>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleUpdateInterview(interview.id, { status: 'rescheduled' })}
                  >
                    改期
                  </button>
                  <button 
                    className="btn btn-success"
                    onClick={() => handleCompleteInterview(interview.id)}
                  >
                    完成面试
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>已完成的面试</h3>
          <div className="interviews-list">
            {completedInterviews.map(interview => (
              <div key={interview.id} className="interview-card completed">
                <div className="interview-info">
                  <h4>{interview.studentName}</h4>
                  <p className="topic">{interview.topicTitle}</p>
                  <div className="interview-details">
                    <span>📅 {interview.date}</span>
                    <span>🕐 {interview.time}</span>
                    {interview.rating && (
                      <span>⭐ 评分: {interview.rating}/5</span>
                    )}
                  </div>
                  {interview.notes && (
                    <div className="interview-notes">
                      <strong>面试笔记：</strong>
                      <p>{interview.notes}</p>
                    </div>
                  )}
                </div>
                <div className="interview-actions">
                  <span className={`badge ${getStatusBadgeClass(interview.status)}`}>
                    {getStatusText(interview.status)}
                  </span>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate(`/professor/courses/lab-rotation/${courseId}/student-selection/interviews/evaluate/${interview.id}`)}
                  >
                    查看评价
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {upcomingInterviews.length === 0 && completedInterviews.length === 0 && (
        <div className="no-interviews">
          <p>暂无面试安排</p>
        </div>
      )}
    </div>
  )
}

export default Interviews