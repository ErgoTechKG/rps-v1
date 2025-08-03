import { useAuth } from '../../contexts/AuthContext'
import './LeaderDashboard.css'

const LeaderDashboard = () => {
  const { user, logout } = useAuth()

  return (
    <div className="dashboard-container leader-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">领导工作台</h1>
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
            <h3 className="card-title">关键指标</h3>
            <div className="card-content">
              <div className="kpi-list">
                <div className="kpi-item">
                  <span className="kpi-label">学生满意度</span>
                  <span className="kpi-value">92%</span>
                  <span className="kpi-trend up">↗ +3%</span>
                </div>
                <div className="kpi-item">
                  <span className="kpi-label">课程完成率</span>
                  <span className="kpi-value">89%</span>
                  <span className="kpi-trend up">↗ +1.5%</span>
                </div>
                <div className="kpi-item">
                  <span className="kpi-label">系统利用率</span>
                  <span className="kpi-value">87%</span>
                  <span className="kpi-trend down">↘ -2%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="card-title">战略目标进度</h3>
            <div className="card-content">
              <div className="goal-list">
                <div className="goal-item">
                  <span className="goal-name">数字化转型</span>
                  <div className="goal-progress">
                    <div className="goal-bar">
                      <div className="goal-fill" style={{width: '75%'}}></div>
                    </div>
                    <span className="goal-percent">75%</span>
                  </div>
                </div>
                <div className="goal-item">
                  <span className="goal-name">教学质量提升</span>
                  <div className="goal-progress">
                    <div className="goal-bar">
                      <div className="goal-fill" style={{width: '90%'}}></div>
                    </div>
                    <span className="goal-percent">90%</span>
                  </div>
                </div>
                <div className="goal-item">
                  <span className="goal-name">AI应用推广</span>
                  <div className="goal-progress">
                    <div className="goal-bar">
                      <div className="goal-fill" style={{width: '60%'}}></div>
                    </div>
                    <span className="goal-percent">60%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="card-title">决策支持</h3>
            <div className="card-content">
              <div className="recommendation-list">
                <div className="recommendation-item">
                  <span className="recommendation-text">建议增加移动端支持</span>
                  <span className="recommendation-impact">高影响</span>
                </div>
                <div className="recommendation-item">
                  <span className="recommendation-text">优化课程评估流程</span>
                  <span className="recommendation-impact">中影响</span>
                </div>
                <div className="recommendation-item">
                  <span className="recommendation-text">扩展AI工具功能</span>
                  <span className="recommendation-impact">高影响</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="card-title">快捷操作</h3>
            <div className="card-content">
              <div className="action-buttons">
                <button className="action-button">数据分析</button>
                <button className="action-button">政策审批</button>
                <button className="action-button">质量报告</button>
                <button className="action-button">战略规划</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderDashboard