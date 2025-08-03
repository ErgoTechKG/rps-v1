import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './KeyMetrics.css'

const KeyMetrics = () => {
  const { courseId } = useParams()
  const [metrics, setMetrics] = useState({
    participation: {
      enrolled: 142,
      active: 136,
      rate: 95.8,
      trend: 2.3
    },
    completion: {
      completed: 127,
      total: 142,
      rate: 89.4,
      trend: 1.7
    },
    satisfaction: {
      score: 4.7,
      total: 5.0,
      percentage: 94,
      trend: 3.2
    },
    engagement: {
      professors: 23,
      avgWorkload: 6.2,
      efficiency: 87.5,
      trend: -1.2
    },
    resources: {
      utilization: 82.3,
      efficiency: 91.2,
      availability: 96.8,
      trend: 2.8
    },
    budget: {
      executed: 285000,
      total: 320000,
      percentage: 89.1,
      costPerStudent: 2254,
      trend: -3.4
    },
    timeline: {
      onTime: 18,
      total: 20,
      percentage: 90,
      milestones: 16,
      trend: 1.1
    },
    comparison: {
      thisYear: 89.4,
      lastYear: 85.2,
      improvement: 4.2
    }
  })

  const [selectedPeriod, setSelectedPeriod] = useState('current')
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const formatTrend = (value) => {
    const isPositive = value > 0
    return {
      value: Math.abs(value),
      direction: isPositive ? 'up' : 'down',
      symbol: isPositive ? '↗' : '↘'
    }
  }

  const exportReport = () => {
    // Simulate export functionality
    const data = {
      courseId,
      metrics,
      timestamp: new Date().toISOString()
    }
    console.log('Exporting KPI report:', data)
    // In real implementation, this would trigger download
  }

  return (
    <div className="key-metrics-container">
      <div className="metrics-header">
        <div className="header-left">
          <h1 className="page-title">关键绩效指标</h1>
          <p className="course-info">实验轮转课程 ID: {courseId}</p>
        </div>
        <div className="header-actions">
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

      <div className="metrics-grid">
        {/* Participation Metrics */}
        <div className="metric-card">
          <h3 className="metric-title">参与度统计</h3>
          <div className="metric-content">
            <div className="primary-metric">
              <span className="metric-value">{metrics.participation.rate}%</span>
              <span className="metric-label">活跃参与率</span>
              <div className={`trend ${formatTrend(metrics.participation.trend).direction}`}>
                {formatTrend(metrics.participation.trend).symbol} {formatTrend(metrics.participation.trend).value}%
              </div>
            </div>
            <div className="secondary-metrics">
              <div className="secondary-item">
                <span className="secondary-label">注册学生</span>
                <span className="secondary-value">{metrics.participation.enrolled}</span>
              </div>
              <div className="secondary-item">
                <span className="secondary-label">活跃学生</span>
                <span className="secondary-value">{metrics.participation.active}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Metrics */}
        <div className="metric-card">
          <h3 className="metric-title">完成率指标</h3>
          <div className="metric-content">
            <div className="primary-metric">
              <span className="metric-value">{metrics.completion.rate}%</span>
              <span className="metric-label">课程完成率</span>
              <div className={`trend ${formatTrend(metrics.completion.trend).direction}`}>
                {formatTrend(metrics.completion.trend).symbol} {formatTrend(metrics.completion.trend).value}%
              </div>
            </div>
            <div className="secondary-metrics">
              <div className="secondary-item">
                <span className="secondary-label">已完成</span>
                <span className="secondary-value">{metrics.completion.completed}</span>
              </div>
              <div className="secondary-item">
                <span className="secondary-label">总人数</span>
                <span className="secondary-value">{metrics.completion.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Satisfaction Metrics */}
        <div className="metric-card">
          <h3 className="metric-title">满意度分析</h3>
          <div className="metric-content">
            <div className="primary-metric">
              <span className="metric-value">{metrics.satisfaction.score}</span>
              <span className="metric-label">平均满意度评分</span>
              <div className={`trend ${formatTrend(metrics.satisfaction.trend).direction}`}>
                {formatTrend(metrics.satisfaction.trend).symbol} {formatTrend(metrics.satisfaction.trend).value}%
              </div>
            </div>
            <div className="satisfaction-bar">
              <div className="satisfaction-fill" style={{width: `${metrics.satisfaction.percentage}%`}}></div>
            </div>
            <div className="satisfaction-details">
              <span className="satisfaction-text">{metrics.satisfaction.percentage}% 学生满意度良好</span>
            </div>
          </div>
        </div>

        {/* Professor Engagement */}
        <div className="metric-card">
          <h3 className="metric-title">教师参与度</h3>
          <div className="metric-content">
            <div className="primary-metric">
              <span className="metric-value">{metrics.engagement.efficiency}%</span>
              <span className="metric-label">教学效率</span>
              <div className={`trend ${formatTrend(metrics.engagement.trend).direction}`}>
                {formatTrend(metrics.engagement.trend).symbol} {formatTrend(metrics.engagement.trend).value}%
              </div>
            </div>
            <div className="secondary-metrics">
              <div className="secondary-item">
                <span className="secondary-label">参与教师</span>
                <span className="secondary-value">{metrics.engagement.professors}</span>
              </div>
              <div className="secondary-item">
                <span className="secondary-label">平均工作量</span>
                <span className="secondary-value">{metrics.engagement.avgWorkload}h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Resource Utilization */}
        <div className="metric-card">
          <h3 className="metric-title">资源利用率</h3>
          <div className="metric-content">
            <div className="primary-metric">
              <span className="metric-value">{metrics.resources.utilization}%</span>
              <span className="metric-label">总体利用率</span>
              <div className={`trend ${formatTrend(metrics.resources.trend).direction}`}>
                {formatTrend(metrics.resources.trend).symbol} {formatTrend(metrics.resources.trend).value}%
              </div>
            </div>
            <div className="secondary-metrics">
              <div className="secondary-item">
                <span className="secondary-label">效率指数</span>
                <span className="secondary-value">{metrics.resources.efficiency}%</span>
              </div>
              <div className="secondary-item">
                <span className="secondary-label">可用率</span>
                <span className="secondary-value">{metrics.resources.availability}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Execution */}
        <div className="metric-card">
          <h3 className="metric-title">预算执行</h3>
          <div className="metric-content">
            <div className="primary-metric">
              <span className="metric-value">{metrics.budget.percentage}%</span>
              <span className="metric-label">预算执行率</span>
              <div className={`trend ${formatTrend(metrics.budget.trend).direction}`}>
                {formatTrend(metrics.budget.trend).symbol} {formatTrend(metrics.budget.trend).value}%
              </div>
            </div>
            <div className="secondary-metrics">
              <div className="secondary-item">
                <span className="secondary-label">已执行</span>
                <span className="secondary-value">¥{metrics.budget.executed.toLocaleString()}</span>
              </div>
              <div className="secondary-item">
                <span className="secondary-label">每生成本</span>
                <span className="secondary-value">¥{metrics.budget.costPerStudent}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Adherence */}
        <div className="metric-card">
          <h3 className="metric-title">时间表执行</h3>
          <div className="metric-content">
            <div className="primary-metric">
              <span className="metric-value">{metrics.timeline.percentage}%</span>
              <span className="metric-label">按时完成率</span>
              <div className={`trend ${formatTrend(metrics.timeline.trend).direction}`}>
                {formatTrend(metrics.timeline.trend).symbol} {formatTrend(metrics.timeline.trend).value}%
              </div>
            </div>
            <div className="secondary-metrics">
              <div className="secondary-item">
                <span className="secondary-label">按时完成</span>
                <span className="secondary-value">{metrics.timeline.onTime}/{metrics.timeline.total}</span>
              </div>
              <div className="secondary-item">
                <span className="secondary-label">里程碑</span>
                <span className="secondary-value">{metrics.timeline.milestones}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparative Performance */}
        <div className="metric-card comparative">
          <h3 className="metric-title">学期对比分析</h3>
          <div className="metric-content">
            <div className="comparison-chart">
              <div className="comparison-item">
                <span className="comparison-label">本学期</span>
                <div className="comparison-bar">
                  <div 
                    className="comparison-fill current" 
                    style={{width: `${metrics.comparison.thisYear}%`}}
                  ></div>
                </div>
                <span className="comparison-value">{metrics.comparison.thisYear}%</span>
              </div>
              <div className="comparison-item">
                <span className="comparison-label">上学期</span>
                <div className="comparison-bar">
                  <div 
                    className="comparison-fill previous" 
                    style={{width: `${metrics.comparison.lastYear}%`}}
                  ></div>
                </div>
                <span className="comparison-value">{metrics.comparison.lastYear}%</span>
              </div>
            </div>
            <div className="improvement-indicator">
              <span className="improvement-label">整体提升</span>
              <span className="improvement-value">+{metrics.comparison.improvement}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="metrics-summary">
        <h3 className="summary-title">执行摘要</h3>
        <div className="summary-content">
          <div className="summary-highlights">
            <div className="highlight-item positive">
              <span className="highlight-icon">✓</span>
              <span className="highlight-text">学生满意度达到{metrics.satisfaction.percentage}%，超出目标2.3个百分点</span>
            </div>
            <div className="highlight-item positive">
              <span className="highlight-icon">✓</span>
              <span className="highlight-text">课程完成率{metrics.completion.rate}%，较上学期提升{metrics.completion.trend}%</span>
            </div>
            <div className="highlight-item neutral">
              <span className="highlight-icon">!</span>
              <span className="highlight-text">教师工作量效率需关注，较上月下降{Math.abs(metrics.engagement.trend)}%</span>
            </div>
            <div className="highlight-item positive">
              <span className="highlight-icon">✓</span>
              <span className="highlight-text">资源利用率{metrics.resources.utilization}%，预算执行良好</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeyMetrics