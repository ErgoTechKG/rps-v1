import { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import './InterviewBooking.css'

const InterviewBooking = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const applicationId = searchParams.get('applicationId')
  
  const [application, setApplication] = useState(null)
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [interviewType, setInterviewType] = useState('online')
  const [specialRequests, setSpecialRequests] = useState('')
  const [preparationInfo, setPreparationInfo] = useState(null)
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    loadApplicationInfo()
    loadAvailableSlots()
    loadPreparationInfo()
  }, [applicationId, selectedDate])

  const loadApplicationInfo = () => {
    // Mock loading application info
    setApplication({
      id: applicationId,
      topicTitle: '深度学习在医疗图像分析中的应用',
      professorName: '张教授',
      professorEmail: 'zhang@university.edu',
      status: 'interview_scheduled'
    })
  }

  const loadAvailableSlots = () => {
    // Mock available time slots
    const slots = []
    const startDate = new Date(selectedDate)
    
    for (let day = 0; day < 7; day++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + day)
      
      if (date.getDay() === 0 || date.getDay() === 6) continue // Skip weekends
      
      const dailySlots = [
        { time: '09:00', available: Math.random() > 0.3 },
        { time: '09:30', available: Math.random() > 0.3 },
        { time: '10:00', available: Math.random() > 0.3 },
        { time: '10:30', available: Math.random() > 0.3 },
        { time: '14:00', available: Math.random() > 0.3 },
        { time: '14:30', available: Math.random() > 0.3 },
        { time: '15:00', available: Math.random() > 0.3 },
        { time: '15:30', available: Math.random() > 0.3 },
        { time: '16:00', available: Math.random() > 0.3 },
      ]
      
      dailySlots.forEach(slot => {
        if (slot.available) {
          slots.push({
            id: `${date.toISOString().split('T')[0]}-${slot.time}`,
            date: date.toISOString().split('T')[0],
            time: slot.time,
            endTime: addMinutes(slot.time, 30)
          })
        }
      })
    }
    
    setAvailableSlots(slots)
  }

  const loadPreparationInfo = () => {
    setPreparationInfo({
      duration: '30分钟',
      format: '线上面试（腾讯会议）',
      requirements: [
        '准备5分钟的个人研究经历介绍',
        '对研究课题的理解和计划',
        '相关项目或作品展示（可选）',
        '准备2-3个问题询问教授'
      ],
      tips: [
        '确保网络连接稳定',
        '选择安静的环境',
        '提前测试摄像头和麦克风',
        '准备好相关材料的电子版'
      ]
    })
  }

  const addMinutes = (time, minutes) => {
    const [hours, mins] = time.split(':').map(Number)
    const totalMinutes = hours * 60 + mins + minutes
    const newHours = Math.floor(totalMinutes / 60)
    const newMins = totalMinutes % 60
    return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`
  }

  const groupSlotsByDate = () => {
    const grouped = {}
    availableSlots.forEach(slot => {
      if (!grouped[slot.date]) {
        grouped[slot.date] = []
      }
      grouped[slot.date].push(slot)
    })
    return grouped
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return `${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`
  }

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot)
  }

  const handleConfirmBooking = async () => {
    if (!selectedSlot) {
      alert('请选择面试时间')
      return
    }
    
    setConfirming(true)
    
    // Simulate booking API call
    setTimeout(() => {
      // Save booking information
      const booking = {
        applicationId,
        slotId: selectedSlot.id,
        date: selectedSlot.date,
        time: selectedSlot.time,
        endTime: selectedSlot.endTime,
        type: interviewType,
        specialRequests,
        bookedAt: new Date().toISOString()
      }
      
      localStorage.setItem(`interview_booking_${applicationId}`, JSON.stringify(booking))
      
      // Send notification
      alert('面试时间已确认！您将收到确认邮件。')
      
      // Navigate back to status page
      navigate(`/student/courses/lab-rotation/${courseId}/application/status`)
    }, 1000)
  }

  const handleReschedule = () => {
    if (window.confirm('确定要重新安排面试时间吗？之前的预约将被取消。')) {
      setSelectedSlot(null)
      localStorage.removeItem(`interview_booking_${applicationId}`)
    }
  }

  const groupedSlots = groupSlotsByDate()

  return (
    <div className="interview-booking-container">
      <div className="booking-header">
        <h1>面试时间预约</h1>
        {application && (
          <div className="application-info">
            <p><strong>申请课题：</strong>{application.topicTitle}</p>
            <p><strong>面试教授：</strong>{application.professorName}</p>
          </div>
        )}
      </div>

      <div className="booking-content">
        <div className="slots-section">
          <h2>选择面试时间</h2>
          
          <div className="date-navigation">
            <button 
              onClick={() => {
                const newDate = new Date(selectedDate)
                newDate.setDate(newDate.getDate() - 7)
                setSelectedDate(newDate)
              }}
            >
              上一周
            </button>
            <span className="current-week">
              {selectedDate.toLocaleDateString()} 开始的一周
            </span>
            <button 
              onClick={() => {
                const newDate = new Date(selectedDate)
                newDate.setDate(newDate.getDate() + 7)
                setSelectedDate(newDate)
              }}
            >
              下一周
            </button>
          </div>

          <div className="slots-grid">
            {Object.keys(groupedSlots).length === 0 ? (
              <div className="no-slots">
                <p>本周暂无可用时间，请查看其他时间</p>
              </div>
            ) : (
              Object.entries(groupedSlots).map(([date, slots]) => (
                <div key={date} className="date-group">
                  <h3>{formatDate(date)}</h3>
                  <div className="time-slots">
                    {slots.map(slot => (
                      <button
                        key={slot.id}
                        className={`time-slot ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
                        onClick={() => handleSlotSelect(slot)}
                      >
                        {slot.time} - {slot.endTime}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="interview-options">
            <h3>面试方式</h3>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="online"
                  checked={interviewType === 'online'}
                  onChange={(e) => setInterviewType(e.target.value)}
                />
                线上面试（推荐）
              </label>
              <label>
                <input
                  type="radio"
                  value="onsite"
                  checked={interviewType === 'onsite'}
                  onChange={(e) => setInterviewType(e.target.value)}
                />
                现场面试
              </label>
            </div>
          </div>

          <div className="special-requests">
            <h3>特殊需求（可选）</h3>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="如有特殊情况或需求，请在此说明..."
              rows="3"
            />
          </div>
        </div>

        <div className="info-section">
          <div className="preparation-card">
            <h2>面试准备指南</h2>
            {preparationInfo && (
              <>
                <div className="info-item">
                  <strong>面试时长：</strong>
                  <span>{preparationInfo.duration}</span>
                </div>
                <div className="info-item">
                  <strong>面试形式：</strong>
                  <span>{preparationInfo.format}</span>
                </div>
                
                <h3>准备材料</h3>
                <ul>
                  {preparationInfo.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
                
                <h3>温馨提示</h3>
                <ul className="tips-list">
                  {preparationInfo.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {selectedSlot && (
            <div className="selection-summary">
              <h3>已选择的时间</h3>
              <div className="selected-time">
                <p><strong>日期：</strong>{formatDate(selectedSlot.date)}</p>
                <p><strong>时间：</strong>{selectedSlot.time} - {selectedSlot.endTime}</p>
                <p><strong>方式：</strong>{interviewType === 'online' ? '线上面试' : '现场面试'}</p>
              </div>
            </div>
          )}

          <div className="booking-actions">
            <button 
              className="btn-secondary"
              onClick={() => navigate(-1)}
            >
              返回
            </button>
            <button 
              className="btn-primary"
              onClick={handleConfirmBooking}
              disabled={!selectedSlot || confirming}
            >
              {confirming ? '确认中...' : '确认预约'}
            </button>
          </div>

          <div className="contact-info">
            <h3>需要帮助？</h3>
            <p>如有疑问，请联系：</p>
            <p>教务秘书：secretary@university.edu</p>
            <p>电话：123-4567-8900</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterviewBooking