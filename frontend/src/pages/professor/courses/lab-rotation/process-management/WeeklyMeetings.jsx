import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../../../contexts/AuthContext'
import { useNotification } from '../../../../../contexts/NotificationContext'
import './WeeklyMeetings.css'

const WeeklyMeetings = () => {
  const { courseId } = useParams()
  const { user } = useAuth()
  const { addNotification } = useNotification()
  const [meetings, setMeetings] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showMeetingForm, setShowMeetingForm] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [meetingForm, setMeetingForm] = useState({
    title: '',
    date: '',
    time: '',
    duration: '60',
    type: 'regular',
    agenda: '',
    studentIds: []
  })

  // Mock data for demonstration
  useEffect(() => {
    const loadData = () => {
      setStudents([
        { id: '1', name: '张三', email: 'zhangsan@university.edu' },
        { id: '2', name: '李四', email: 'lisi@university.edu' },
        { id: '3', name: '王五', email: 'wangwu@university.edu' }
      ])
      
      setMeetings([
        {
          id: '1',
          title: 'Weekly Progress Review',
          date: '2025-08-10',
          time: '14:00',
          duration: '60',
          type: 'regular',
          agenda: '1. Review last week progress\n2. Discuss challenges\n3. Plan for next week',
          studentIds: ['1', '2', '3'],
          status: 'scheduled',
          minutes: '',
          attendance: []
        },
        {
          id: '2',
          title: 'Research Methodology Discussion',
          date: '2025-08-08',
          time: '10:00',
          duration: '90',
          type: 'special',
          agenda: '1. Review research methodology\n2. Data collection strategies\n3. Ethics approval discussion',
          studentIds: ['1', '2'],
          status: 'completed',
          minutes: 'Discussed the research methodology and agreed on data collection approach...',
          attendance: ['1', '2']
        }
      ])
      setLoading(false)
    }
    
    setTimeout(loadData, 500)
  }, [courseId])

  const handleMeetingSubmit = () => {
    if (!meetingForm.title || !meetingForm.date || !meetingForm.time || meetingForm.studentIds.length === 0) {
      addNotification('Please fill in all required fields', 'error')
      return
    }

    const newMeeting = {
      id: Date.now().toString(),
      ...meetingForm,
      status: 'scheduled',
      minutes: '',
      attendance: []
    }

    setMeetings([...meetings, newMeeting])
    addNotification('Meeting scheduled successfully', 'success')
    setShowMeetingForm(false)
    resetForm()
  }

  const resetForm = () => {
    setMeetingForm({
      title: '',
      date: '',
      time: '',
      duration: '60',
      type: 'regular',
      agenda: '',
      studentIds: []
    })
  }

  const handleStudentToggle = (studentId) => {
    setMeetingForm(prev => ({
      ...prev,
      studentIds: prev.studentIds.includes(studentId)
        ? prev.studentIds.filter(id => id !== studentId)
        : [...prev.studentIds, studentId]
    }))
  }

  const markAttendance = (meetingId, studentId) => {
    setMeetings(meetings.map(meeting => {
      if (meeting.id === meetingId) {
        return {
          ...meeting,
          attendance: meeting.attendance.includes(studentId)
            ? meeting.attendance.filter(id => id !== studentId)
            : [...meeting.attendance, studentId]
        }
      }
      return meeting
    }))
  }

  const updateMeetingStatus = (meetingId, status) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === meetingId ? { ...meeting, status } : meeting
    ))
    addNotification(`Meeting status updated to ${status}`, 'success')
  }

  const saveMeetingMinutes = (meetingId, minutes) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === meetingId ? { ...meeting, minutes } : meeting
    ))
    addNotification('Meeting minutes saved', 'success')
    setSelectedMeeting(null)
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      scheduled: { color: '#3498db', label: 'Scheduled' },
      in_progress: { color: '#f39c12', label: 'In Progress' },
      completed: { color: '#27ae60', label: 'Completed' },
      cancelled: { color: '#e74c3c', label: 'Cancelled' }
    }
    
    const config = statusConfig[status] || statusConfig.scheduled
    return (
      <span className="status-badge" style={{ backgroundColor: config.color + '20', color: config.color }}>
        {config.label}
      </span>
    )
  }

  if (loading) {
    return <div className="component-container">Loading meetings...</div>
  }

  return (
    <div className="component-container">
      <div className="component-header">
        <h2>Weekly Meeting Management</h2>
        <button 
          className="primary-button"
          onClick={() => setShowMeetingForm(true)}
        >
          Schedule Meeting
        </button>
      </div>

      {/* Meeting Calendar View */}
      <div className="calendar-section">
        <h3>Upcoming Meetings</h3>
        <div className="meetings-grid">
          {meetings.filter(m => m.status === 'scheduled').map(meeting => (
            <div key={meeting.id} className="meeting-card">
              <div className="meeting-header">
                <h4>{meeting.title}</h4>
                {getStatusBadge(meeting.status)}
              </div>
              
              <div className="meeting-details">
                <div className="meeting-time">
                  <span className="icon">📅</span>
                  <span>{new Date(meeting.date).toLocaleDateString()} at {meeting.time}</span>
                </div>
                <div className="meeting-duration">
                  <span className="icon">⏱️</span>
                  <span>{meeting.duration} minutes</span>
                </div>
                <div className="meeting-participants">
                  <span className="icon">👥</span>
                  <span>{meeting.studentIds.length} participants</span>
                </div>
              </div>

              <div className="meeting-agenda">
                <h5>Agenda:</h5>
                <pre>{meeting.agenda}</pre>
              </div>

              <div className="meeting-actions">
                <button 
                  className="action-button primary"
                  onClick={() => updateMeetingStatus(meeting.id, 'in_progress')}
                >
                  Start Meeting
                </button>
                <button 
                  className="action-button secondary"
                  onClick={() => setSelectedMeeting(meeting)}
                >
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Meetings */}
      <div className="past-meetings-section">
        <h3>Past Meetings</h3>
        <div className="meetings-list">
          {meetings.filter(m => m.status === 'completed').map(meeting => (
            <div key={meeting.id} className="past-meeting-item">
              <div className="meeting-info">
                <h4>{meeting.title}</h4>
                <p>{new Date(meeting.date).toLocaleDateString()} - {meeting.duration} minutes</p>
                {meeting.minutes && (
                  <div className="meeting-minutes">
                    <strong>Minutes:</strong> {meeting.minutes}
                  </div>
                )}
              </div>
              <div className="attendance-info">
                <strong>Attendance:</strong> {meeting.attendance.length}/{meeting.studentIds.length}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meeting Form Modal */}
      {showMeetingForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Schedule New Meeting</h3>
            
            <div className="form-group">
              <label>Meeting Title *</label>
              <input
                type="text"
                value={meetingForm.title}
                onChange={(e) => setMeetingForm({ ...meetingForm, title: e.target.value })}
                placeholder="Enter meeting title"
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  value={meetingForm.date}
                  onChange={(e) => setMeetingForm({ ...meetingForm, date: e.target.value })}
                  className="form-input"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label>Time *</label>
                <input
                  type="time"
                  value={meetingForm.time}
                  onChange={(e) => setMeetingForm({ ...meetingForm, time: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Duration (minutes)</label>
                <select
                  value={meetingForm.duration}
                  onChange={(e) => setMeetingForm({ ...meetingForm, duration: e.target.value })}
                  className="form-select"
                >
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                  <option value="120">120 minutes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Meeting Type</label>
                <select
                  value={meetingForm.type}
                  onChange={(e) => setMeetingForm({ ...meetingForm, type: e.target.value })}
                  className="form-select"
                >
                  <option value="regular">Regular</option>
                  <option value="special">Special Topic</option>
                  <option value="review">Review</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Agenda</label>
              <textarea
                value={meetingForm.agenda}
                onChange={(e) => setMeetingForm({ ...meetingForm, agenda: e.target.value })}
                placeholder="Enter meeting agenda"
                className="form-textarea"
                rows={4}
              />
            </div>

            <div className="form-group">
              <label>Select Participants *</label>
              <div className="participant-list">
                {students.map(student => (
                  <label key={student.id} className="participant-item">
                    <input
                      type="checkbox"
                      checked={meetingForm.studentIds.includes(student.id)}
                      onChange={() => handleStudentToggle(student.id)}
                    />
                    <span>{student.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="secondary-button"
                onClick={() => {
                  setShowMeetingForm(false)
                  resetForm()
                }}
              >
                Cancel
              </button>
              <button 
                className="primary-button"
                onClick={handleMeetingSubmit}
              >
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Management Modal */}
      {selectedMeeting && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Manage Meeting: {selectedMeeting.title}</h3>
            
            <div className="attendance-section">
              <h4>Mark Attendance</h4>
              <div className="attendance-list">
                {students
                  .filter(s => selectedMeeting.studentIds.includes(s.id))
                  .map(student => (
                    <label key={student.id} className="attendance-item">
                      <input
                        type="checkbox"
                        checked={selectedMeeting.attendance.includes(student.id)}
                        onChange={() => markAttendance(selectedMeeting.id, student.id)}
                      />
                      <span>{student.name}</span>
                    </label>
                  ))}
              </div>
            </div>

            <div className="form-group">
              <label>Meeting Minutes</label>
              <textarea
                defaultValue={selectedMeeting.minutes}
                placeholder="Enter meeting minutes..."
                className="form-textarea"
                rows={6}
                id="minutes-textarea"
              />
            </div>

            <div className="modal-actions">
              <button 
                className="secondary-button"
                onClick={() => setSelectedMeeting(null)}
              >
                Cancel
              </button>
              <button 
                className="primary-button"
                onClick={() => {
                  const minutes = document.getElementById('minutes-textarea').value
                  saveMeetingMinutes(selectedMeeting.id, minutes)
                  updateMeetingStatus(selectedMeeting.id, 'completed')
                }}
              >
                Save & Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeeklyMeetings