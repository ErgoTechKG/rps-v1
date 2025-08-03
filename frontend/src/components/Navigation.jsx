import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import NotificationCenter from './NotificationCenter'
import './Navigation.css'

const Navigation = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const userMenuRef = useRef(null)
  const searchRef = useRef(null)

  // Role-based menu configurations
  const menuItems = {
    professor: [
      { path: '/professor/dashboard', label: '工作台', icon: '🏠' },
      { path: '/professor/courses', label: '课程管理', icon: '📚' },
      { path: '/professor/students', label: '学生管理', icon: '👥' },
      { path: '/professor/ai-tools', label: 'AI助手', icon: '🤖' },
      { path: '/professor/grading', label: '成绩评定', icon: '📝' },
    ],
    student: [
      { path: '/student/dashboard', label: '学习中心', icon: '🏠' },
      { path: '/student/courses', label: '我的课程', icon: '📚' },
      { path: '/student/applications', label: '申请中心', icon: '📋' },
      { path: '/student/achievements', label: '成就展示', icon: '🏆' },
      { path: '/student/ai-assistant', label: 'AI学伴', icon: '🤖' },
    ],
    secretary: [
      { path: '/secretary/dashboard', label: '控制台', icon: '🏠' },
      { path: '/secretary/courses', label: '课程设置', icon: '📚' },
      { path: '/secretary/users', label: '用户管理', icon: '👥' },
      { path: '/secretary/monitoring', label: '流程监控', icon: '📊' },
      { path: '/secretary/reports', label: '数据报告', icon: '📈' },
    ],
    leader: [
      { path: '/leader/dashboard', label: '决策仪表盘', icon: '🏠' },
      { path: '/leader/overview', label: '执行概览', icon: '📊' },
      { path: '/leader/resources', label: '资源分析', icon: '💼' },
      { path: '/leader/quality', label: '质量评估', icon: '⭐' },
      { path: '/leader/insights', label: 'AI洞察', icon: '🤖' },
    ],
  }

  // Get breadcrumb based on current path
  const getBreadcrumb = () => {
    const pathParts = location.pathname.split('/').filter(Boolean)
    const breadcrumb = []
    
    if (pathParts.length > 0) {
      // Add role home
      const role = pathParts[0]
      breadcrumb.push({
        label: getRoleName(role),
        path: `/${role}/dashboard`
      })
      
      // Add current page if not dashboard
      if (pathParts[1] && pathParts[1] !== 'dashboard') {
        const currentMenuItem = menuItems[role]?.find(item => 
          item.path === location.pathname
        )
        if (currentMenuItem) {
          breadcrumb.push({
            label: currentMenuItem.label,
            path: currentMenuItem.path
          })
        }
      }
    }
    
    return breadcrumb
  }

  const getRoleName = (role) => {
    const roleNames = {
      professor: '教授',
      student: '学生', 
      secretary: '秘书',
      leader: '领导'
    }
    return roleNames[role] || role
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery)
    setShowSearch(false)
    setSearchQuery('')
  }

  const currentMenuItems = menuItems[user?.role] || []
  const breadcrumb = getBreadcrumb()

  return (
    <nav className="navigation">
      <div className="nav-top">
        <div className="nav-brand">
          <img src="/logo.svg" alt="University Logo" className="nav-logo" />
          <span className="nav-title">科研管理平台</span>
        </div>

        <div className="nav-main">
          {currentMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button 
            className="nav-action-btn"
            onClick={() => setShowSearch(!showSearch)}
            aria-label="搜索"
          >
            🔍
          </button>

          <NotificationCenter />

          <Link to="/shared/calendar" className="nav-action-btn" aria-label="日历">
            📅
          </Link>

          <Link to="/shared/help" className="nav-action-btn" aria-label="帮助">
            ❓
          </Link>

          <div className="user-menu" ref={userMenuRef}>
            <button
              className="user-menu-trigger"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <span className="user-avatar">
                {user?.name?.charAt(0) || 'U'}
              </span>
              <span className="user-name">{user?.name}</span>
              <span className="dropdown-arrow">▼</span>
            </button>

            {showUserMenu && (
              <div className="user-menu-dropdown">
                <div className="user-menu-header">
                  <div className="user-info">
                    <div className="user-full-name">{user?.name}</div>
                    <div className="user-role">{getRoleName(user?.role)}</div>
                  </div>
                </div>
                <div className="user-menu-items">
                  <Link to="/profile" className="user-menu-item">
                    <span className="menu-icon">👤</span>
                    个人资料
                  </Link>
                  <Link to="/settings" className="user-menu-item">
                    <span className="menu-icon">⚙️</span>
                    设置
                  </Link>
                  <hr className="menu-divider" />
                  <button onClick={handleLogout} className="user-menu-item logout">
                    <span className="menu-icon">🚪</span>
                    退出登录
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showSearch && (
        <div className="nav-search" ref={searchRef}>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder="搜索课程、学生、文档..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" className="search-btn">搜索</button>
          </form>
        </div>
      )}

      {breadcrumb.length > 0 && (
        <div className="nav-breadcrumb">
          <Link to="/" className="breadcrumb-item">首页</Link>
          {breadcrumb.map((item, index) => (
            <span key={item.path}>
              <span className="breadcrumb-separator">›</span>
              {index === breadcrumb.length - 1 ? (
                <span className="breadcrumb-item current">{item.label}</span>
              ) : (
                <Link to={item.path} className="breadcrumb-item">
                  {item.label}
                </Link>
              )}
            </span>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navigation