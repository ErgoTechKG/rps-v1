import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useNotifications } from '../../../contexts/NotificationContext'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import CalendarEvent from './CalendarEvent'
import './SharedCalendar.css'

const SharedCalendar = () => {
  const { user } = useAuth()
  const { addNotification } = useNotifications()
  const calendarRef = useRef(null)
  const [currentView, setCurrentView] = useState('dayGridMonth')
  const [events, setEvents] = useState([])
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  // Sample events based on user role
  useEffect(() => {
    const sampleEvents = getSampleEvents(user?.role)
    setEvents(sampleEvents)
  }, [user?.role])

  const getSampleEvents = (role) => {
    const baseEvents = [
      {
        id: '1',
        title: '系统维护',
        start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T09:00:00',
        end: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T11:00:00',
        backgroundColor: '#f56565',
        borderColor: '#e53e3e',
        category: 'system',
        description: '系统例行维护',
        location: '在线'
      },
      {
        id: '2',
        title: '学期总结会议',
        start: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T14:00:00',
        end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T16:00:00',
        backgroundColor: '#4299e1',
        borderColor: '#3182ce',
        category: 'meeting',
        description: '学期工作总结与下学期规划',
        location: '会议室A'
      }
    ]

    const roleSpecificEvents = {
      professor: [
        {
          id: '3',
          title: '高级算法课程',
          start: new Date().toISOString().split('T')[0] + 'T10:00:00',
          end: new Date().toISOString().split('T')[0] + 'T11:30:00',
          backgroundColor: '#48bb78',
          borderColor: '#38a169',
          category: 'course',
          description: '第8章：动态规划',
          location: '教学楼B205',
          rrule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR'
        },
        {
          id: '4',
          title: '学生答辩评审',
          start: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T09:00:00',
          end: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T12:00:00',
          backgroundColor: '#ed8936',
          borderColor: '#dd6b20',
          category: 'evaluation',
          description: '本科生毕业设计答辩评审',
          location: '答辩厅'
        }
      ],
      student: [
        {
          id: '5',
          title: '算法设计作业截止',
          start: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T23:59:00',
          backgroundColor: '#f56565',
          borderColor: '#e53e3e',
          category: 'deadline',
          description: '第三次算法设计作业提交截止',
          allDay: false
        },
        {
          id: '6',
          title: '实验室轮转申请',
          start: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          backgroundColor: '#9f7aea',
          borderColor: '#805ad5',
          category: 'application',
          description: '下学期实验室轮转课程申请开始',
          allDay: true
        }
      ],
      secretary: [
        {
          id: '7',
          title: '课程评估数据收集',
          start: new Date().toISOString().split('T')[0] + 'T09:00:00',
          end: new Date().toISOString().split('T')[0] + 'T17:00:00',
          backgroundColor: '#38b2ac',
          borderColor: '#319795',
          category: 'admin',
          description: '本学期课程评估数据整理与分析',
          location: '办公室'
        }
      ],
      leader: [
        {
          id: '8',
          title: '战略规划会议',
          start: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T10:00:00',
          end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T12:00:00',
          backgroundColor: '#667eea',
          borderColor: '#5a67d8',
          category: 'strategic',
          description: '下一学年教学计划讨论',
          location: '会议室C'
        }
      ]
    }

    return [...baseEvents, ...(roleSpecificEvents[role] || [])]
  }

  const handleDateClick = (selectInfo) => {
    setSelectedDate({
      start: selectInfo.start,
      end: selectInfo.end,
      allDay: selectInfo.allDay
    })
    setSelectedEvent(null)
    setShowEventModal(true)
  }

  const handleEventClick = (clickInfo) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      allDay: clickInfo.event.allDay,
      backgroundColor: clickInfo.event.backgroundColor,
      borderColor: clickInfo.event.borderColor,
      extendedProps: clickInfo.event.extendedProps
    })
    setSelectedDate(null)
    setShowEventModal(true)
  }

  const handleEventAdd = (eventData) => {
    const newEvent = {
      id: Date.now().toString(),
      ...eventData,
      backgroundColor: getCategoryColor(eventData.category).bg,
      borderColor: getCategoryColor(eventData.category).border
    }
    setEvents([...events, newEvent])
    setShowEventModal(false)
    addNotification('success', '日程已添加', `${eventData.title} 已成功添加到日历`)
  }

  const handleEventUpdate = (eventData) => {
    const updatedEvents = events.map(event => 
      event.id === eventData.id ? {
        ...eventData,
        backgroundColor: getCategoryColor(eventData.category).bg,
        borderColor: getCategoryColor(eventData.category).border
      } : event
    )
    setEvents(updatedEvents)
    setShowEventModal(false)
    addNotification('success', '日程已更新', `${eventData.title} 已成功更新`)
  }

  const handleEventDelete = (eventId) => {
    const eventToDelete = events.find(e => e.id === eventId)
    setEvents(events.filter(event => event.id !== eventId))
    setShowEventModal(false)
    addNotification('info', '日程已删除', `${eventToDelete?.title} 已从日历中删除`)
  }

  const getCategoryColor = (category) => {
    const colors = {
      course: { bg: '#48bb78', border: '#38a169' },
      meeting: { bg: '#4299e1', border: '#3182ce' },
      deadline: { bg: '#f56565', border: '#e53e3e' },
      evaluation: { bg: '#ed8936', border: '#dd6b20' },
      application: { bg: '#9f7aea', border: '#805ad5' },
      admin: { bg: '#38b2ac', border: '#319795' },
      strategic: { bg: '#667eea', border: '#5a67d8' },
      system: { bg: '#f56565', border: '#e53e3e' },
      personal: { bg: '#68d391', border: '#48bb78' },
      other: { bg: '#a0aec0', border: '#718096' }
    }
    return colors[category] || colors.other
  }

  const handleViewChange = (view) => {
    setCurrentView(view)
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(view)
    }
  }

  const navigateCalendar = (action) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi()
      if (action === 'prev') calendarApi.prev()
      else if (action === 'next') calendarApi.next()
      else if (action === 'today') calendarApi.today()
    }
  }

  const exportCalendar = () => {
    // TODO: Implement calendar export functionality
    addNotification('info', '导出功能', '日历导出功能即将推出')
  }

  return (
    <div className="shared-calendar">
      <div className="calendar-header">
        <div className="calendar-title">
          <h1>📅 共享日历</h1>
          <p>管理您的日程安排和重要事件</p>
        </div>
        
        <div className="calendar-controls">
          <div className="view-controls">
            <button 
              className={`view-btn ${currentView === 'dayGridMonth' ? 'active' : ''}`}
              onClick={() => handleViewChange('dayGridMonth')}
            >
              月视图
            </button>
            <button 
              className={`view-btn ${currentView === 'timeGridWeek' ? 'active' : ''}`}
              onClick={() => handleViewChange('timeGridWeek')}
            >
              周视图
            </button>
            <button 
              className={`view-btn ${currentView === 'timeGridDay' ? 'active' : ''}`}
              onClick={() => handleViewChange('timeGridDay')}
            >
              日视图
            </button>
            <button 
              className={`view-btn ${currentView === 'listWeek' ? 'active' : ''}`}
              onClick={() => handleViewChange('listWeek')}
            >
              列表
            </button>
          </div>

          <div className="nav-controls">
            <button className="nav-btn" onClick={() => navigateCalendar('prev')}>
              ◀ 上一个
            </button>
            <button className="nav-btn today" onClick={() => navigateCalendar('today')}>
              今天
            </button>
            <button className="nav-btn" onClick={() => navigateCalendar('next')}>
              下一个 ▶
            </button>
          </div>

          <div className="action-controls">
            <button 
              className="action-btn primary"
              onClick={() => {
                setSelectedDate({
                  start: new Date(),
                  end: new Date(Date.now() + 60 * 60 * 1000),
                  allDay: false
                })
                setSelectedEvent(null)
                setShowEventModal(true)
              }}
            >
              ➕ 新建事件
            </button>
            <button className="action-btn" onClick={exportCalendar}>
              📤 导出
            </button>
          </div>
        </div>
      </div>

      <div className="calendar-content">
        <div className="calendar-sidebar">
          <div className="calendar-legend">
            <h3>事件类型</h3>
            <div className="legend-items">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#48bb78' }}></span>
                <span>课程</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#4299e1' }}></span>
                <span>会议</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#f56565' }}></span>
                <span>截止日期</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#ed8936' }}></span>
                <span>评估</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#9f7aea' }}></span>
                <span>申请</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#38b2ac' }}></span>
                <span>管理</span>
              </div>
            </div>
          </div>

          <div className="upcoming-events">
            <h3>即将到来</h3>
            <div className="upcoming-list">
              {events
                .filter(event => new Date(event.start) > new Date())
                .sort((a, b) => new Date(a.start) - new Date(b.start))
                .slice(0, 5)
                .map(event => (
                  <div key={event.id} className="upcoming-item" onClick={() => handleEventClick({ event })}>
                    <div className="upcoming-time">
                      {new Date(event.start).toLocaleDateString('zh-CN', { 
                        month: 'short', 
                        day: 'numeric',
                        hour: event.allDay ? undefined : '2-digit',
                        minute: event.allDay ? undefined : '2-digit'
                      })}
                    </div>
                    <div className="upcoming-title">{event.title}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="calendar-main">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridMonth"
            height="600px"
            events={events}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            headerToolbar={false}
            locale="zh-cn"
            timeZone="Asia/Shanghai"
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            allDaySlot={true}
            eventDisplay="block"
            displayEventTime={true}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
          />
        </div>
      </div>

      {showEventModal && (
        <CalendarEvent
          event={selectedEvent}
          defaultDate={selectedDate}
          onSave={selectedEvent ? handleEventUpdate : handleEventAdd}
          onDelete={selectedEvent ? handleEventDelete : null}
          onClose={() => setShowEventModal(false)}
          userRole={user?.role}
        />
      )}
    </div>
  )
}

export default SharedCalendar