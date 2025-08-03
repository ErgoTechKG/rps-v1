import { useAuth } from '../../contexts/AuthContext'
import './StudentDashboard.css'

const StudentDashboard = () => {
  const { user, logout } = useAuth()

  return (
    <div className="dashboard-container student-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">学生工作台</h1>
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
                <span className="stat-number">5</span>
                <span className="stat-label">已选课程</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">85%</span>
                <span className="stat-label">平均进度</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="card-title">今日任务</h3>
            <div className="card-content">
              <div className="task-list">
                <div className="task-item">
                  <span className="task-text">数据结构作业</span>
                  <span className="task-deadline">明天截止</span>
                </div>
                <div className="task-item">
                  <span className="task-text">论文开题报告</span>
                  <span className="task-deadline">3天后</span>
                </div>
                <div className="task-item">
                  <span className="task-text">实验报告提交</span>
                  <span className="task-deadline">1周后</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="card-title">学习进度</h3>
            <div className="card-content">
              <div className="progress-list">
                <div className="progress-item">
                  <span className="course-name">计算机网络</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '90%'}}></div>
                  </div>
                  <span className="progress-text">90%</span>
                </div>
                <div className="progress-item">
                  <span className="course-name">数据结构</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '75%'}}></div>
                  </div>
                  <span className="progress-text">75%</span>
                </div>
                <div className="progress-item">
                  <span className="course-name">算法设计</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '80%'}}></div>
                  </div>
                  <span className="progress-text">80%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="card-title">AI学习助手</h3>
            <div className="card-content">
              <div className="ai-assistant">
                <div className="ai-welcome">
                  <div className="ai-avatar">🤖</div>
                  <p className="ai-message">你好！我是你的AI学习助手，有什么可以帮助你的吗？</p>
                </div>
                <div className="ai-suggestions">
                  <button className="ai-suggestion-btn">帮我分析学习进度</button>
                  <button className="ai-suggestion-btn">推荐学习资料</button>
                  <button className="ai-suggestion-btn">答疑解惑</button>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="card-title">快捷操作</h3>
            <div className="card-content">
              <div className="action-buttons">
                <button className="action-button">课程资料</button>
                <button className="action-button">作业提交</button>
                <button className="action-button">AI学习助手</button>
                <button className="action-button">成绩查询</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard