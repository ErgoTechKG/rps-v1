import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './ProfessorWorkload.css'

const ProfessorWorkload = () => {
  const { courseId } = useParams()
  const [workloadData, setWorkloadData] = useState({
    overall: {
      totalProfessors: 23,
      activeInProgram: 20,
      avgWorkloadHours: 18.5,
      utilizationRate: 87.0,
      satisfactionScore: 4.2,
      burnoutRisk: 12
    },
    distribution: [
      { professor: '张教授', workloadHours: 24, studentCount: 8, efficiency: 92, satisfaction: 4.5, status: 'overloaded' },
      { professor: '李教授', workloadHours: 18, studentCount: 6, efficiency: 95, satisfaction: 4.7, status: 'optimal' },
      { professor: '王教授', workloadHours: 22, studentCount: 7, efficiency: 88, satisfaction: 4.3, status: 'high' },
      { professor: '陈教授', workloadHours: 12, studentCount: 4, efficiency: 78, satisfaction: 4.1, status: 'underutilized' },
      { professor: '刘教授', workloadHours: 20, studentCount: 6, efficiency: 91, satisfaction: 4.6, status: 'optimal' },
      { professor: '赵教授', workloadHours: 16, studentCount: 5, efficiency: 89, satisfaction: 4.4, status: 'optimal' },
      { professor: '周教授', workloadHours: 25, studentCount: 9, efficiency: 85, satisfaction: 4.0, status: 'overloaded' },
      { professor: '吴教授', workloadHours: 14, studentCount: 4, efficiency: 82, satisfaction: 4.2, status: 'low' }
    ],
    activities: {
      teaching: 45,
      supervision: 30,
      research: 15,
      administration: 10
    },
    trends: {
      workloadChange: -2.3,
      satisfactionChange: 3.1,
      efficiencyChange: 1.8
    },
    recommendations: [
      { type: 'warning', text: '建议调整张教授和周教授的工作量分配', priority: 'high' },
      { type: 'suggestion', text: '考虑增加陈教授的学生指导数量', priority: 'medium' },
      { type: 'positive', text: '李教授和刘教授的工作状态表现优秀', priority: 'low' },
      { type: 'action', text: '建议为过载教师提供助教支持', priority: 'high' }
    ]
  })

  const [selectedPeriod, setSelectedPeriod] = useState('current')
  const [refreshing, setRefreshing] = useState(false)
  const [selectedView, setSelectedView] = useState('overview')

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'overloaded': return '#F44336'
      case 'high': return '#FF9800'
      case 'optimal': return '#4CAF50'
      case 'low': return '#2196F3'
      case 'underutilized': return '#9C27B0'
      default: return '#666'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'overloaded': return '过载'
      case 'high': return '偏高'
      case 'optimal': return '最佳'
      case 'low': return '偏低'
      case 'underutilized': return '未充分利用'
      default: return '未知'
    }
  }

  const exportReport = () => {
    const data = {
      courseId,
      workloadData,
      timestamp: new Date().toISOString()
    }
    console.log('Exporting professor workload report:', data)
  }

  return (
    <div className="professor-workload-container">
      <div className="workload-header">
        <div className="header-left">
          <h1 className="page-title">教师工作量分析</h1>
          <p className="course-info">实验轮转课程 ID: {courseId}</p>
        </div>
        <div className="header-actions">
          <select 
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="view-selector"
          >
            <option value="overview">总览</option>
            <option value="distribution">分布详情</option>
            <option value="activities">活动分析</option>
            <option value="trends">趋势分析</option>
          </select>
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-selector"
          >
            <option value="current">当前学期</option>
            <option value="last">上学期</option>
            <option value="year">本学年</option>
          </select>
          <button 
            onClick={handleRefresh}
            className={`refresh-button ${refreshing ? 'refreshing' : ''}`}
            disabled={refreshing}
          >
            {refreshing ? '更新中...' : '刷新数据'}
          </button>
          <button onClick={exportReport} className="export-button">
            导出报告
          </button>
        </div>
      </div>

      {selectedView === 'overview' && (
        <div className="workload-overview">
          <div className="metrics-grid">
            <div className="metric-card">
              <h3 className="metric-title">总体概况</h3>
              <div className="metric-content">
                <div className="primary-metric">
                  <span className="metric-value">{workloadData.overall.avgWorkloadHours}h</span>
                  <span className="metric-label">平均工作量</span>
                </div>
                <div className="secondary-metrics">
                  <div className="secondary-item">
                    <span className="secondary-label">参与教师</span>
                    <span className="secondary-value">{workloadData.overall.activeInProgram}/{workloadData.overall.totalProfessors}</span>
                  </div>
                  <div className="secondary-item">
                    <span className="secondary-label">利用率</span>
                    <span className="secondary-value">{workloadData.overall.utilizationRate}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <h3 className="metric-title">满意度与风险</h3>
              <div className="metric-content">
                <div className="primary-metric">
                  <span className="metric-value">{workloadData.overall.satisfactionScore}</span>
                  <span className="metric-label">平均满意度评分</span>
                </div>
                <div className="secondary-metrics">
                  <div className="secondary-item">
                    <span className="secondary-label">过载风险</span>
                    <span className="secondary-value risk">{workloadData.overall.burnoutRisk}%</span>
                  </div>
                  <div className="secondary-item">
                    <span className="secondary-label">满意度</span>
                    <span className="secondary-value">{(workloadData.overall.satisfactionScore / 5 * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="metric-card activities-card">
              <h3 className="metric-title">活动时间分配</h3>
              <div className="activities-chart">
                <div className="activity-item">
                  <span className="activity-label">教学授课</span>
                  <div className="activity-bar">
                    <div className="activity-fill teaching" style={{width: `${workloadData.activities.teaching}%`}}></div>
                  </div>
                  <span className="activity-value">{workloadData.activities.teaching}%</span>
                </div>
                <div className="activity-item">
                  <span className="activity-label">学生指导</span>
                  <div className="activity-bar">
                    <div className="activity-fill supervision" style={{width: `${workloadData.activities.supervision}%`}}></div>
                  </div>
                  <span className="activity-value">{workloadData.activities.supervision}%</span>
                </div>
                <div className="activity-item">
                  <span className="activity-label">研究工作</span>
                  <div className="activity-bar">
                    <div className="activity-fill research" style={{width: `${workloadData.activities.research}%`}}></div>
                  </div>
                  <span className="activity-value">{workloadData.activities.research}%</span>
                </div>
                <div className="activity-item">
                  <span className="activity-label">行政管理</span>
                  <div className="activity-bar">
                    <div className="activity-fill administration" style={{width: `${workloadData.activities.administration}%`}}></div>
                  </div>
                  <span className="activity-value">{workloadData.activities.administration}%</span>
                </div>
              </div>
            </div>

            <div className="metric-card trends-card">
              <h3 className="metric-title">变化趋势</h3>
              <div className="trends-content">
                <div className="trend-item">
                  <span className="trend-label">工作量变化</span>
                  <span className={`trend-value ${workloadData.trends.workloadChange > 0 ? 'positive' : 'negative'}`}>
                    {workloadData.trends.workloadChange > 0 ? '+' : ''}{workloadData.trends.workloadChange}%
                  </span>
                </div>
                <div className="trend-item">
                  <span className="trend-label">满意度变化</span>
                  <span className={`trend-value ${workloadData.trends.satisfactionChange > 0 ? 'positive' : 'negative'}`}>
                    {workloadData.trends.satisfactionChange > 0 ? '+' : ''}{workloadData.trends.satisfactionChange}%
                  </span>
                </div>
                <div className="trend-item">
                  <span className="trend-label">效率变化</span>
                  <span className={`trend-value ${workloadData.trends.efficiencyChange > 0 ? 'positive' : 'negative'}`}>
                    {workloadData.trends.efficiencyChange > 0 ? '+' : ''}{workloadData.trends.efficiencyChange}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'distribution' && (
        <div className="workload-distribution">
          <div className="distribution-table">
            <h3 className="section-title">教师工作量分布详情</h3>
            <div className="table-container">
              <table className="workload-table">
                <thead>
                  <tr>
                    <th>教师</th>
                    <th>工作量(小时)</th>
                    <th>指导学生数</th>
                    <th>效率指数</th>
                    <th>满意度</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  {workloadData.distribution.map((prof, index) => (
                    <tr key={index}>
                      <td className="professor-name">{prof.professor}</td>
                      <td className="workload-hours">{prof.workloadHours}</td>
                      <td className="student-count">{prof.studentCount}</td>
                      <td className="efficiency">{prof.efficiency}%</td>
                      <td className="satisfaction">{prof.satisfaction}/5.0</td>
                      <td>
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(prof.status) }}
                        >
                          {getStatusLabel(prof.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="workload-recommendations">
        <h3 className="section-title">优化建议</h3>
        <div className="recommendations-content">
          {workloadData.recommendations.map((rec, index) => (
            <div key={index} className={`recommendation-item ${rec.type}`}>
              <div className="recommendation-priority">
                <span className={`priority-badge ${rec.priority}`}>
                  {rec.priority === 'high' ? '高' : rec.priority === 'medium' ? '中' : '低'}
                </span>
              </div>
              <div className="recommendation-text">{rec.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfessorWorkload