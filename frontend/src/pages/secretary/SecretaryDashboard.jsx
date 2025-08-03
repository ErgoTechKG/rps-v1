import './SecretaryDashboard.css'

const SecretaryDashboard = () => {
  return (
    <div className="dashboard-container secretary-dashboard">
      <h1 className="page-title">秘书工作台</h1>
      
      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3 className="card-title">系统监控</h3>
            <div className="card-content">
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">系统运行率</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1,247</span>
                <span className="stat-label">今日活跃用户</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="card-title">待处理任务</h3>
            <div className="card-content">
              <div className="task-list">
                <div className="task-item">
                  <span className="task-text">数据采集提醒</span>
                  <span className="task-priority high">高</span>
                </div>
                <div className="task-item">
                  <span className="task-text">报告生成</span>
                  <span className="task-priority medium">中</span>
                </div>
                <div className="task-item">
                  <span className="task-text">用户反馈处理</span>
                  <span className="task-priority low">低</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="card-title">课程统计</h3>
            <div className="card-content">
              <div className="stats-grid">
                <div className="mini-stat">
                  <span className="mini-stat-number">15</span>
                  <span className="mini-stat-label">活跃课程</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-stat-number">320</span>
                  <span className="mini-stat-label">学生总数</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-stat-number">25</span>
                  <span className="mini-stat-label">教师数量</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-stat-number">89%</span>
                  <span className="mini-stat-label">完成率</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="card-title">实时警报</h3>
            <div className="card-content">
              <div className="alert-list">
                <div className="alert-item warning">
                  <span className="alert-icon">⚠️</span>
                  <div className="alert-content">
                    <span className="alert-title">数据采集延迟</span>
                    <span className="alert-desc">CS101课程数据同步延迟15分钟</span>
                  </div>
                </div>
                <div className="alert-item info">
                  <span className="alert-icon">ℹ️</span>
                  <div className="alert-content">
                    <span className="alert-title">系统维护提醒</span>
                    <span className="alert-desc">计划维护将于明天凌晨2点开始</span>
                  </div>
                </div>
                <div className="alert-item success">
                  <span className="alert-icon">✅</span>
                  <div className="alert-content">
                    <span className="alert-title">备份完成</span>
                    <span className="alert-desc">每日数据备份已成功完成</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="card-title">快捷操作</h3>
            <div className="card-content">
              <div className="action-buttons">
                <button className="action-button">数据监控</button>
                <button className="action-button">报告管理</button>
                <button className="action-button">用户管理</button>
                <button className="action-button">系统设置</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecretaryDashboard