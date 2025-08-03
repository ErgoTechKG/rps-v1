import { useAuth } from '../../contexts/AuthContext'
import './ProfessorDashboard.css'

const ProfessorDashboard = () => {
  const { user, logout } = useAuth()

  return (
    <div className="dashboard-container professor-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">教授工作台</h1>
          <div className="user-info">
            <span className="user-name">欢迎，{user?.name}</span>
            <button onClick={logout} className="logout-button">
              退出登录
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3 className="card-title">我的课程</h3>
            <div className="card-content">
              <div className="stat-item">
                <span className="stat-number">3</span>
                <span className="stat-label">进行中的课程</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">45</span>
                <span className="stat-label">学生总数</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="card-title">待办任务</h3>
            <div className="card-content">
              <div className="task-list">
                <div className="task-item">
                  <span className="task-text">期中作业批改</span>
                  <span className="task-count">8份</span>
                </div>
                <div className="task-item">
                  <span className="task-text">论文选题审核</span>
                  <span className="task-count">3份</span>
                </div>
                <div className="task-item">
                  <span className="task-text">学生答疑</span>
                  <span className="task-count">5条</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="card-title">最新通知</h3>
            <div className="card-content">
              <div className="notification-list">
                <div className="notification-item">
                  <span className="notification-text">系统更新通知</span>
                  <span className="notification-time">2小时前</span>
                </div>
                <div className="notification-item">
                  <span className="notification-text">学期评估开始</span>
                  <span className="notification-time">1天前</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="card-title">数据概览</h3>
            <div className="card-content">
              <div className="data-overview">
                <div className="overview-item">
                  <span className="overview-label">平均出勤率</span>
                  <span className="overview-value">93.5%</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">作业提交率</span>
                  <span className="overview-value">87.2%</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">平均成绩</span>
                  <span className="overview-value">82.6分</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">学生满意度</span>
                  <span className="overview-value">4.5/5.0</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="card-title">快捷操作</h3>
            <div className="card-content">
              <div className="action-buttons">
                <button className="action-button">课程管理</button>
                <button className="action-button">AI助手</button>
                <button className="action-button">成绩录入</button>
                <button className="action-button">学生管理</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfessorDashboard