import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'

const NotificationContext = createContext()

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Alias for backward compatibility
export const useNotification = useNotifications

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [preferences, setPreferences] = useState({
    emailEnabled: true,
    inAppEnabled: true,
    categories: {
      messages: true,
      deadlines: true,
      alerts: true,
      systemUpdates: true
    }
  })

  useEffect(() => {
    if (user) {
      loadNotifications()
      loadPreferences()
    } else {
      setNotifications([])
      setUnreadCount(0)
    }
  }, [user])

  useEffect(() => {
    const count = notifications.filter(n => !n.read).length
    setUnreadCount(count)
  }, [notifications])

  const loadNotifications = useCallback(async () => {
    const isTestMode = import.meta.env.VITE_TEST_MODE !== 'false'
    
    if (isTestMode) {
      const mockNotifications = getMockNotifications(user.role)
      setNotifications(mockNotifications)
    } else {
      try {
        const response = await fetch('/api/notifications', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          setNotifications(data)
        }
      } catch (error) {
        console.error('Failed to load notifications:', error)
      }
    }
  }, [user])

  const loadPreferences = useCallback(async () => {
    const savedPreferences = localStorage.getItem(`notificationPreferences_${user.id}`)
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    }
  }, [user])

  const markAsRead = useCallback(async (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    )
  }, [])

  const markAllAsRead = useCallback(async () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }, [])

  const deleteNotification = useCallback(async (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
  }, [])

  const bulkDelete = useCallback(async (notificationIds) => {
    setNotifications(prev => 
      prev.filter(n => !notificationIds.includes(n.id))
    )
  }, [])

  const updatePreferences = useCallback(async (newPreferences) => {
    setPreferences(newPreferences)
    localStorage.setItem(`notificationPreferences_${user.id}`, JSON.stringify(newPreferences))
  }, [user])

  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false,
      ...notification
    }
    setNotifications(prev => [newNotification, ...prev])
  }, [])

  const value = {
    notifications,
    unreadCount,
    preferences,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    bulkDelete,
    updatePreferences,
    addNotification,
    refreshNotifications: loadNotifications
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

const getMockNotifications = (role) => {
  const baseNotifications = [
    {
      id: '1',
      type: 'system',
      category: 'systemUpdates',
      title: '系统维护通知',
      message: '系统将于今晚10点进行例行维护，预计持续30分钟',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
      priority: 'high'
    }
  ]

  const roleSpecificNotifications = {
    professor: [
      {
        id: '2',
        type: 'submission',
        category: 'messages',
        title: '新的学生提交',
        message: '李同学提交了《研究方法论》作业',
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        read: false,
        priority: 'medium',
        link: '/professor/submissions'
      },
      {
        id: '3',
        type: 'deadline',
        category: 'deadlines',
        title: '评分截止日期提醒',
        message: '《高级算法》课程评分将于3天后截止',
        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        read: true,
        priority: 'high',
        link: '/professor/grading'
      }
    ],
    student: [
      {
        id: '2',
        type: 'grade',
        category: 'messages',
        title: '新成绩发布',
        message: '您的《数据结构》课程成绩已发布',
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        read: false,
        priority: 'high',
        link: '/student/grades'
      },
      {
        id: '3',
        type: 'deadline',
        category: 'deadlines',
        title: '作业截止提醒',
        message: '《机器学习》作业将于明天下午5点截止',
        createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        read: false,
        priority: 'high',
        link: '/student/assignments'
      },
      {
        id: '4',
        type: 'feedback',
        category: 'messages',
        title: '教授反馈',
        message: '张教授对您的研究提案给出了反馈',
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        read: true,
        priority: 'medium',
        link: '/student/feedback'
      }
    ],
    secretary: [
      {
        id: '2',
        type: 'alert',
        category: 'alerts',
        title: '数据收集提醒',
        message: '本月教学数据收集将于后天截止',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        read: false,
        priority: 'high'
      },
      {
        id: '3',
        type: 'report',
        category: 'systemUpdates',
        title: '报告生成完成',
        message: '2024年第一季度教学质量报告已生成',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        read: false,
        priority: 'medium',
        link: '/secretary/reports'
      }
    ],
    leader: [
      {
        id: '2',
        type: 'approval',
        category: 'alerts',
        title: '待审批事项',
        message: '有3个新的课程大纲待您审批',
        createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
        read: false,
        priority: 'high',
        link: '/leader/approvals'
      },
      {
        id: '3',
        type: 'metrics',
        category: 'alerts',
        title: '关键指标变化',
        message: '本月学生满意度提升5%',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: true,
        priority: 'medium',
        link: '/leader/metrics'
      }
    ]
  }

  return [...baseNotifications, ...(roleSpecificNotifications[role] || [])]
}