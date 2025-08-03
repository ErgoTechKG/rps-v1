import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import './LoginForm.css'

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    rememberMe: false
  })
  const [error, setError] = useState('')
  const { login, isLoading, isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!credentials.username || !credentials.password) {
      setError('请输入用户名和密码')
      return
    }

    const result = await login(credentials)
    if (!result.success) {
      setError(result.error)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">科研管理平台</h1>
          <p className="login-subtitle">Research Management Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              用户名/邮箱
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="form-input"
              placeholder="请输入用户名或邮箱"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              密码
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="form-input"
              placeholder="请输入密码"
              autoComplete="current-password"
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={credentials.rememberMe}
                onChange={handleChange}
                className="checkbox-input"
              />
              <span className="checkbox-text">记住我</span>
            </label>
            <a href="/forgot-password" className="forgot-link">
              忘记密码？
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`login-button ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? '登录中...' : '登录'}
          </button>

          <div className="test-info">
            <p>测试账号：</p>
            <p>教授: professor1 / password123</p>
            <p>学生: student1 / password123</p>
            <p>秘书: secretary1 / password123</p>
            <p>领导: leader1 / password123</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm