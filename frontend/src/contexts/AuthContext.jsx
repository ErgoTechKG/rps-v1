import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials) => {
    setIsLoading(true)
    try {
      const isTestMode = import.meta.env.VITE_TEST_MODE !== 'false'
      
      if (isTestMode) {
        const testUser = mockLogin(credentials)
        if (testUser) {
          const token = `test-token-${Date.now()}`
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(testUser))
          setUser(testUser)
          return { success: true, user: testUser }
        } else {
          return { success: false, error: '用户名或密码错误' }
        }
      } else {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })
        
        const data = await response.json()
        
        if (response.ok) {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          setUser(data.user)
          return { success: true, user: data.user }
        } else {
          return { success: false, error: data.message || '登录失败' }
        }
      }
    } catch (error) {
      return { success: false, error: '网络错误，请稍后重试' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

const mockLogin = (credentials) => {
  const testUsers = [
    {
      id: 1,
      username: 'professor1',
      email: 'professor1@university.edu',
      name: '张教授',
      role: 'professor',
      department: '计算机科学系'
    },
    {
      id: 2,
      username: 'student1',
      email: 'student1@university.edu',
      name: '李同学',
      role: 'student',
      studentId: '2024001001'
    },
    {
      id: 3,
      username: 'secretary1',
      email: 'secretary1@university.edu',
      name: '王秘书',
      role: 'secretary',
      department: '教务处'
    },
    {
      id: 4,
      username: 'leader1',
      email: 'leader1@university.edu',
      name: '刘主任',
      role: 'leader',
      department: '科研管理处'
    }
  ]

  return testUsers.find(user => 
    (user.username === credentials.username || user.email === credentials.username) &&
    credentials.password === 'password123'
  )
}