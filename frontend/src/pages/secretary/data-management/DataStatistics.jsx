import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../../components/Layout'
import '../course-management/lab-rotation/process-monitoring/ProcessMonitoring.css'

const DataStatistics = () => {
  const navigate = useNavigate()
  
  const [participantStats, setParticipantStats] = useState({})
  const [performanceStats, setPerformanceStats] = useState({})
  const [timeRangeStats, setTimeRangeStats] = useState({})
  const [demographicStats, setDemographicStats] = useState({})
  const [selectedTimeRange, setSelectedTimeRange] = useState('month')
  const [selectedMetric, setSelectedMetric] = useState('all')
  const [chartData, setChartData] = useState([])

  // Mock data
  useEffect(() => {
    const mockParticipantStats = {
      totalStudents: 1250,
      activeStudents: 1180,
      totalProfessors: 89,
      activeProfessors: 82,
      coursesOffered: 45,
      activeEnrollments: 3200,
      completionRate: 94.5,
      dropoutRate: 5.5
    }

    const mockPerformanceStats = {
      averageGrade: 87.3,
      passRate: 96.2,
      excellentRate: 32.5,
      averageAttendance: 92.8,
      submissionRate: 89.4,
      lateSubmissionRate: 12.6,
      averageProjectScore: 85.7,
      defensePassRate: 98.1
    }

    const mockTimeRangeStats = {
      month: {
        newEnrollments: 125,
        completedCourses: 89,
        averageStudyTime: 156,
        totalSubmissions: 1450,
        averageResponseTime: 2.3
      },
      quarter: {
        newEnrollments: 380,
        completedCourses: 267,
        averageStudyTime: 468,
        totalSubmissions: 4350,
        averageResponseTime: 2.1
      },
      year: {
        newEnrollments: 1520,
        completedCourses: 1067,
        averageStudyTime: 1872,
        totalSubmissions: 17400,
        averageResponseTime: 2.4
      }
    }

    const mockDemographicStats = {
      genderDistribution: {
        male: 52.3,
        female: 47.7
      },
      ageDistribution: {
        '18-20': 25.6,
        '21-23': 45.2,
        '24-26': 22.1,
        '27+': 7.1
      },
      majorDistribution: {
        '计算机科学': 28.5,
        '生物医学': 22.3,
        '化学工程': 18.7,
        '物理学': 15.2,
        '其他': 15.3
      },
      researchAreas: {
        '人工智能': 32.1,
        '生物技术': 24.5,
        '材料科学': 19.8,
        '环境科学': 15.6,
        '其他': 8.0
      }
    }

    const mockChartData = [
      { month: '8月', enrollments: 120, completions: 95, performance: 88.5 },
      { month: '9月', enrollments: 145, completions: 110, performance: 89.2 },
      { month: '10月', enrollments: 135, completions: 125, performance: 87.8 },
      { month: '11月', enrollments: 160, completions: 140, performance: 90.1 },
      { month: '12月', enrollments: 125, completions: 89, performance: 87.3 }
    ]

    setParticipantStats(mockParticipantStats)
    setPerformanceStats(mockPerformanceStats)
    setTimeRangeStats(mockTimeRangeStats)
    setDemographicStats(mockDemographicStats)
    setChartData(mockChartData)
  }, [])

  const getCurrentStats = () => {
    return timeRangeStats[selectedTimeRange] || timeRangeStats.month || {}
  }

  const currentStats = getCurrentStats()

  return (
    <Layout>
      <div className="process-monitoring-container">
        <div className="monitoring-header">
          <h1 className="page-title">数据统计分析</h1>
          <div className="monitoring-nav">
            <button 
              className="nav-button"
              onClick={() => navigate('/secretary/data-management/collection')}
            >
              数据收集
            </button>
            <button 
              className="nav-button active"
              onClick={() => navigate('/secretary/data-management/statistics')}
            >
              统计分析
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate('/secretary/data-management/reports')}
            >
              报告生成
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate('/secretary/data-management/reminders')}
            >
              提醒管理
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate('/secretary/data-management/export')}
            >
              数据导出
            </button>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-number">{participantStats.totalStudents}</div>
              <div className="stat-label">总学生数</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👨‍🏫</div>
            <div className="stat-content">
              <div className="stat-number">{participantStats.totalProfessors}</div>
              <div className="stat-label">总教师数</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <div className="stat-number">{participantStats.coursesOffered}</div>
              <div className="stat-label">开设课程</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-number">{participantStats.completionRate}%</div>
              <div className="stat-label">完成率</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="content-card">
          <div className="card-header">
            <div className="header-left">
              <h2 className="card-title">统计分析仪表板</h2>
            </div>
            <div className="header-actions">
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="filter-select"
              >
                <option value="month">本月</option>
                <option value="quarter">本季度</option>
                <option value="year">本年度</option>
              </select>
              <select 
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="filter-select"
              >
                <option value="all">所有指标</option>
                <option value="performance">学习表现</option>
                <option value="engagement">参与度</option>
                <option value="demographics">人口统计</option>
              </select>
            </div>
          </div>

          {/* Performance Metrics */}
          <div style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '20px', color: '#7C4DFF' }}>学习表现指标</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <div className="stat-number">{performanceStats.averageGrade}</div>
                  <div className="stat-label">平均成绩</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-content">
                  <div className="stat-number">{performanceStats.passRate}%</div>
                  <div className="stat-label">通过率</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-content">
                  <div className="stat-number">{performanceStats.excellentRate}%</div>
                  <div className="stat-label">优秀率</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📝</div>
                <div className="stat-content">
                  <div className="stat-number">{performanceStats.submissionRate}%</div>
                  <div className="stat-label">提交率</div>
                </div>
              </div>
            </div>

            <h3 style={{ marginBottom: '20px', marginTop: '32px', color: '#7C4DFF' }}>参与度指标</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👤</div>
                <div className="stat-content">
                  <div className="stat-number">{currentStats.newEnrollments || 0}</div>
                  <div className="stat-label">新注册学员</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✔️</div>
                <div className="stat-content">
                  <div className="stat-number">{currentStats.completedCourses || 0}</div>
                  <div className="stat-label">完成课程数</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏱️</div>
                <div className="stat-content">
                  <div className="stat-number">{currentStats.averageStudyTime || 0}h</div>
                  <div className="stat-label">平均学习时长</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📤</div>
                <div className="stat-content">
                  <div className="stat-number">{currentStats.totalSubmissions || 0}</div>
                  <div className="stat-label">总提交数</div>
                </div>
              </div>
            </div>

            <h3 style={{ marginBottom: '20px', marginTop: '32px', color: '#7C4DFF' }}>人口统计分布</h3>
            <div className="task-table-container">
              <table className="task-table">
                <thead>
                  <tr>
                    <th>统计维度</th>
                    <th>分类</th>
                    <th>数量/比例</th>
                    <th>趋势</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan="2" className="task-info">
                      <div className="task-details">
                        <div className="task-title">性别分布</div>
                      </div>
                    </td>
                    <td className="assignee">男性</td>
                    <td className="score-column">
                      <div className="score-display">{demographicStats.genderDistribution?.male}%</div>
                    </td>
                    <td className="status-column">
                      <div className="status-badge status-completed">稳定</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="assignee">女性</td>
                    <td className="score-column">
                      <div className="score-display">{demographicStats.genderDistribution?.female}%</div>
                    </td>
                    <td className="status-column">
                      <div className="status-badge status-completed">稳定</div>
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan="4" className="task-info">
                      <div className="task-details">
                        <div className="task-title">年龄分布</div>
                      </div>
                    </td>
                    <td className="assignee">18-20岁</td>
                    <td className="score-column">
                      <div className="score-display">{demographicStats.ageDistribution?.['18-20']}%</div>
                    </td>
                    <td className="status-column">
                      <div className="status-badge status-in-progress">增长</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="assignee">21-23岁</td>
                    <td className="score-column">
                      <div className="score-display">{demographicStats.ageDistribution?.['21-23']}%</div>
                    </td>
                    <td className="status-column">
                      <div className="status-badge status-completed">稳定</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="assignee">24-26岁</td>
                    <td className="score-column">
                      <div className="score-display">{demographicStats.ageDistribution?.['24-26']}%</div>
                    </td>
                    <td className="status-column">
                      <div className="status-badge status-pending">下降</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="assignee">27岁以上</td>
                    <td className="score-column">
                      <div className="score-display">{demographicStats.ageDistribution?.['27+']}%</div>
                    </td>
                    <td className="status-column">
                      <div className="status-badge status-completed">稳定</div>
                    </td>
                  </tr>
                  {Object.entries(demographicStats.majorDistribution || {}).map(([major, percentage], index) => (
                    <tr key={major}>
                      {index === 0 && (
                        <td rowSpan={Object.keys(demographicStats.majorDistribution || {}).length} className="task-info">
                          <div className="task-details">
                            <div className="task-title">专业分布</div>
                          </div>
                        </td>
                      )}
                      <td className="assignee">{major}</td>
                      <td className="score-column">
                        <div className="score-display">{percentage}%</div>
                      </td>
                      <td className="status-column">
                        <div className="status-badge status-completed">稳定</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 style={{ marginBottom: '20px', marginTop: '32px', color: '#7C4DFF' }}>趋势分析图表</h3>
            <div className="task-table-container">
              <table className="task-table">
                <thead>
                  <tr>
                    <th>月份</th>
                    <th>新注册</th>
                    <th>完成数</th>
                    <th>平均表现</th>
                    <th>完成率</th>
                    <th>趋势</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map(data => {
                    const completionRate = ((data.completions / data.enrollments) * 100).toFixed(1)
                    return (
                      <tr key={data.month}>
                        <td className="task-info">
                          <div className="task-details">
                            <div className="task-title">{data.month}</div>
                          </div>
                        </td>
                        <td className="score-column">
                          <div className="score-display">{data.enrollments}</div>
                        </td>
                        <td className="score-column">
                          <div className="score-display">{data.completions}</div>
                        </td>
                        <td className="score-column">
                          <div className="score-display">{data.performance}</div>
                        </td>
                        <td className="score-column">
                          <div className="score-display">{completionRate}%</div>
                        </td>
                        <td className="status-column">
                          <div className={`status-badge ${
                            data.performance >= 89 ? 'status-completed' : 
                            data.performance >= 87 ? 'status-pending' : 'status-error'
                          }`}>
                            {data.performance >= 89 ? '优秀' : data.performance >= 87 ? '良好' : '需改进'}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DataStatistics