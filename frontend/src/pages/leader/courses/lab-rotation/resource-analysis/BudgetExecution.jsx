import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './BudgetExecution.css'

const BudgetExecution = () => {
  const { courseId } = useParams()
  const [budgetData, setBudgetData] = useState({
    overall: {
      totalBudget: 520000,
      executedBudget: 463200,
      remainingBudget: 56800,
      executionRate: 89.1,
      costPerStudent: 3260,
      totalStudents: 142,
      projectedOverrun: 0
    },
    categories: [
      { 
        name: '教师薪酬', 
        budgeted: 180000, 
        executed: 165400, 
        percentage: 91.9, 
        status: 'on-track',
        variance: -14600,
        subcategories: [
          { name: '授课费用', budgeted: 120000, executed: 110500 },
          { name: '指导费用', budgeted: 60000, executed: 54900 }
        ]
      },
      { 
        name: '实验室运营', 
        budgeted: 150000, 
        executed: 142800, 
        percentage: 95.2, 
        status: 'high',
        variance: -7200,
        subcategories: [
          { name: '设备维护', budgeted: 80000, executed: 78200 },
          { name: '耗材采购', budgeted: 70000, executed: 64600 }
        ]
      },
      { 
        name: '设备采购', 
        budgeted: 120000, 
        executed: 98500, 
        percentage: 82.1, 
        status: 'low',
        variance: -21500,
        subcategories: [
          { name: '新设备', budgeted: 80000, executed: 62000 },
          { name: '升级改造', budgeted: 40000, executed: 36500 }
        ]
      },
      { 
        name: '学生支持', 
        budgeted: 45000, 
        executed: 41200, 
        percentage: 91.6, 
        status: 'on-track',
        variance: -3800,
        subcategories: [
          { name: '奖学金', budgeted: 25000, executed: 23100 },
          { name: '活动费用', budgeted: 20000, executed: 18100 }
        ]
      },
      { 
        name: '管理费用', 
        budgeted: 25000, 
        executed: 15300, 
        percentage: 61.2, 
        status: 'underutilized',
        variance: -9700,
        subcategories: [
          { name: '办公费用', budgeted: 15000, executed: 9200 },
          { name: '差旅费用', budgeted: 10000, executed: 6100 }
        ]
      }
    ],
    timeline: [
      { month: '9月', planned: 52000, actual: 48300, cumulative: 48300 },
      { month: '10月', planned: 65000, actual: 61200, cumulative: 109500 },
      { month: '11月', planned: 78000, actual: 75800, cumulative: 185300 },
      { month: '12月', planned: 85000, actual: 82400, cumulative: 267700 },
      { month: '1月', planned: 92000, actual: 89600, cumulative: 357300 },
      { month: '2月', planned: 88000, actual: 85200, cumulative: 442500 },
      { month: '3月', planned: 60000, actual: 20700, cumulative: 463200 }
    ],
    roi: {
      studentSatisfaction: 4.7,
      completionRate: 89.4,
      employmentRate: 95.2,
      industryPartnership: 8,
      publicationCount: 23,
      patentApplications: 3
    },
    forecasts: {
      projectedTotal: 485600,
      confidenceLevel: 92,
      riskFactors: [
        { factor: '设备价格波动', impact: '中', probability: '高' },
        { factor: '学生数量变化', impact: '低', probability: '中' },
        { factor: '政策调整', impact: '高', probability: '低' }
      ]
    },
    comparisons: [
      { program: '本项目', costPerStudent: 3260, satisfaction: 4.7, completion: 89.4 },
      { program: '同类项目A', costPerStudent: 3450, satisfaction: 4.5, completion: 87.2 },
      { program: '同类项目B', costPerStudent: 3100, satisfaction: 4.3, completion: 85.8 },
      { program: '行业平均', costPerStudent: 3380, satisfaction: 4.4, completion: 86.5 }
    ],
    recommendations: [
      { type: 'cost-saving', text: '管理费用执行率偏低，建议重新评估预算分配', priority: 'medium' },
      { type: 'investment', text: '设备采购进度滞后，建议加快采购流程', priority: 'high' },
      { type: 'optimization', text: '单位成本控制良好，建议维持当前水平', priority: 'low' },
      { type: 'efficiency', text: '实验室运营费用使用率高，需关注预算控制', priority: 'medium' }
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
      case 'high': return '#F44336'
      case 'on-track': return '#4CAF50'
      case 'low': return '#FF9800'
      case 'underutilized': return '#9C27B0'
      default: return '#666'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'high': return '偏高'
      case 'on-track': return '正常'
      case 'low': return '滞后'
      case 'underutilized': return '未充分利用'
      default: return '未知'
    }
  }

  const getRiskColor = (level) => {
    switch (level) {
      case '高': return '#F44336'
      case '中': return '#FF9800'
      case '低': return '#4CAF50'
      default: return '#666'
    }
  }

  const exportReport = () => {
    const data = {
      courseId,
      budgetData,
      timestamp: new Date().toISOString()
    }
    console.log('Exporting budget execution report:', data)
  }

  return (
    <div className="budget-execution-container">
      <div className="budget-header">
        <div className="header-left">
          <h1 className="page-title">预算执行分析</h1>
          <p className="course-info">实验轮转课程 ID: {courseId}</p>
        </div>
        <div className="header-actions">
          <select 
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="view-selector"
          >
            <option value="overview">总览</option>
            <option value="categories">分类详情</option>
            <option value="timeline">时间线</option>
            <option value="roi">投资回报</option>
            <option value="forecasts">预测分析</option>
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
        <div className="budget-overview">
          <div className="metrics-grid">
            <div className="metric-card">
              <h3 className="metric-title">总体执行情况</h3>
              <div className="metric-content">
                <div className="primary-metric">
                  <span className="metric-value">{budgetData.overall.executionRate}%</span>
                  <span className="metric-label">预算执行率</span>
                </div>
                <div className="budget-breakdown">
                  <div className="breakdown-item">
                    <span className="breakdown-label">已执行</span>
                    <span className="breakdown-value executed">¥{budgetData.overall.executedBudget.toLocaleString()}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">剩余预算</span>
                    <span className="breakdown-value remaining">¥{budgetData.overall.remainingBudget.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <h3 className="metric-title">成本效益</h3>
              <div className="metric-content">
                <div className="primary-metric">
                  <span className="metric-value">¥{budgetData.overall.costPerStudent.toLocaleString()}</span>
                  <span className="metric-label">每生成本</span>
                </div>
                <div className="secondary-metrics">
                  <div className="secondary-item">
                    <span className="secondary-label">学生总数</span>
                    <span className="secondary-value">{budgetData.overall.totalStudents}</span>
                  </div>
                  <div className="secondary-item">
                    <span className="secondary-label">预算总额</span>
                    <span className="secondary-value">¥{(budgetData.overall.totalBudget / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <h3 className="metric-title">预算分配</h3>
              <div className="budget-allocation">
                {budgetData.categories.map((category, index) => (
                  <div key={index} className="allocation-item">
                    <div className="allocation-header">
                      <span className="allocation-name">{category.name}</span>
                      <span className="allocation-percentage">{category.percentage}%</span>
                    </div>
                    <div className="allocation-bar">
                      <div 
                        className="allocation-fill" 
                        style={{
                          width: `${category.percentage}%`,
                          backgroundColor: getStatusColor(category.status)
                        }}
                      ></div>
                    </div>
                    <div className="allocation-amount">
                      <span className="executed-amount">¥{category.executed.toLocaleString()}</span>
                      <span className="budgeted-amount">/ ¥{category.budgeted.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="metric-card">
              <h3 className="metric-title">风险预警</h3>
              <div className="risk-indicators">
                <div className="risk-item">
                  <span className="risk-label">超支风险</span>
                  <span className="risk-value low">低风险</span>
                </div>
                <div className="risk-item">
                  <span className="risk-label">执行进度</span>
                  <span className="risk-value normal">正常</span>
                </div>
                <div className="risk-item">
                  <span className="risk-label">预算余量</span>
                  <span className="risk-value adequate">充足</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'categories' && (
        <div className="categories-detail">
          <div className="categories-grid">
            {budgetData.categories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-header">
                  <h4 className="category-name">{category.name}</h4>
                  <div className="category-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(category.status) }}
                    >
                      {getStatusLabel(category.status)}
                    </span>
                  </div>
                </div>
                <div className="category-metrics">
                  <div className="category-execution">
                    <span className="execution-label">执行率</span>
                    <div className="execution-bar">
                      <div 
                        className="execution-fill" 
                        style={{
                          width: `${category.percentage}%`,
                          backgroundColor: getStatusColor(category.status)
                        }}
                      ></div>
                    </div>
                    <span className="execution-value">{category.percentage}%</span>
                  </div>
                  <div className="category-amounts">
                    <div className="amount-item">
                      <span className="amount-label">预算</span>
                      <span className="amount-value">¥{category.budgeted.toLocaleString()}</span>
                    </div>
                    <div className="amount-item">
                      <span className="amount-label">已执行</span>
                      <span className="amount-value executed">¥{category.executed.toLocaleString()}</span>
                    </div>
                    <div className="amount-item">
                      <span className="amount-label">差异</span>
                      <span className={`amount-value ${category.variance < 0 ? 'positive' : 'negative'}`}>
                        ¥{Math.abs(category.variance).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="category-subcategories">
                  <h5 className="subcategories-title">明细分类</h5>
                  <div className="subcategories-list">
                    {category.subcategories.map((sub, subIndex) => (
                      <div key={subIndex} className="subcategory-item">
                        <span className="subcategory-name">{sub.name}</span>
                        <span className="subcategory-amount">
                          ¥{sub.executed.toLocaleString()} / ¥{sub.budgeted.toLocaleString()}
                        </span>
                        <span className="subcategory-rate">
                          {((sub.executed / sub.budgeted) * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'timeline' && (
        <div className="timeline-analysis">
          <div className="timeline-chart">
            <h3 className="section-title">预算执行时间线</h3>
            <div className="timeline-content">
              <div className="timeline-graph">
                {budgetData.timeline.map((month, index) => (
                  <div key={index} className="timeline-month">
                    <div className="month-bars">
                      <div className="planned-bar">
                        <div 
                          className="planned-fill" 
                          style={{ height: `${(month.planned / 100000) * 100}%` }}
                        ></div>
                      </div>
                      <div className="actual-bar">
                        <div 
                          className="actual-fill" 
                          style={{ height: `${(month.actual / 100000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="month-info">
                      <span className="month-label">{month.month}</span>
                      <div className="month-values">
                        <span className="planned-value">计划: ¥{(month.planned / 1000).toFixed(0)}K</span>
                        <span className="actual-value">实际: ¥{(month.actual / 1000).toFixed(0)}K</span>
                      </div>
                      <span className="cumulative-value">累计: ¥{(month.cumulative / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'roi' && (
        <div className="roi-analysis">
          <div className="roi-metrics">
            <h3 className="section-title">投资回报分析</h3>
            <div className="roi-grid">
              <div className="roi-card">
                <h4 className="roi-title">学术成果</h4>
                <div className="roi-items">
                  <div className="roi-item">
                    <span className="roi-label">学生满意度</span>
                    <span className="roi-value">{budgetData.roi.studentSatisfaction}/5.0</span>
                  </div>
                  <div className="roi-item">
                    <span className="roi-label">完成率</span>
                    <span className="roi-value">{budgetData.roi.completionRate}%</span>
                  </div>
                  <div className="roi-item">
                    <span className="roi-label">就业率</span>
                    <span className="roi-value">{budgetData.roi.employmentRate}%</span>
                  </div>
                </div>
              </div>

              <div className="roi-card">
                <h4 className="roi-title">研究产出</h4>
                <div className="roi-items">
                  <div className="roi-item">
                    <span className="roi-label">发表论文</span>
                    <span className="roi-value">{budgetData.roi.publicationCount} 篇</span>
                  </div>
                  <div className="roi-item">
                    <span className="roi-label">专利申请</span>
                    <span className="roi-value">{budgetData.roi.patentApplications} 项</span>
                  </div>
                  <div className="roi-item">
                    <span className="roi-label">产业合作</span>
                    <span className="roi-value">{budgetData.roi.industryPartnership} 家</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="comparison-analysis">
            <h3 className="section-title">同类项目对比</h3>
            <div className="comparison-table">
              <table className="budget-table">
                <thead>
                  <tr>
                    <th>项目</th>
                    <th>每生成本</th>
                    <th>满意度</th>
                    <th>完成率</th>
                    <th>性价比指数</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetData.comparisons.map((comp, index) => (
                    <tr key={index} className={comp.program === '本项目' ? 'current-program' : ''}>
                      <td className="program-name">{comp.program}</td>
                      <td className="cost-value">¥{comp.costPerStudent.toLocaleString()}</td>
                      <td className="satisfaction-value">{comp.satisfaction}/5.0</td>
                      <td className="completion-value">{comp.completion}%</td>
                      <td className="efficiency-value">
                        {((comp.satisfaction * comp.completion) / (comp.costPerStudent / 1000)).toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'forecasts' && (
        <div className="forecasts-analysis">
          <div className="forecast-metrics">
            <h3 className="section-title">预测分析</h3>
            <div className="forecast-summary">
              <div className="forecast-card">
                <h4 className="forecast-title">项目预测</h4>
                <div className="forecast-items">
                  <div className="forecast-item">
                    <span className="forecast-label">预计总支出</span>
                    <span className="forecast-value">¥{budgetData.forecasts.projectedTotal.toLocaleString()}</span>
                  </div>
                  <div className="forecast-item">
                    <span className="forecast-label">置信度</span>
                    <span className="forecast-value confidence">{budgetData.forecasts.confidenceLevel}%</span>
                  </div>
                  <div className="forecast-item">
                    <span className="forecast-label">预计结余</span>
                    <span className="forecast-value remaining">
                      ¥{(budgetData.overall.totalBudget - budgetData.forecasts.projectedTotal).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="risk-factors">
            <h3 className="section-title">风险因素分析</h3>
            <div className="risk-table">
              <table className="budget-table">
                <thead>
                  <tr>
                    <th>风险因素</th>
                    <th>影响程度</th>
                    <th>发生概率</th>
                    <th>风险等级</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetData.forecasts.riskFactors.map((risk, index) => (
                    <tr key={index}>
                      <td className="risk-factor">{risk.factor}</td>
                      <td>
                        <span 
                          className="risk-impact"
                          style={{ color: getRiskColor(risk.impact) }}
                        >
                          {risk.impact}
                        </span>
                      </td>
                      <td>
                        <span 
                          className="risk-probability"
                          style={{ color: getRiskColor(risk.probability) }}
                        >
                          {risk.probability}
                        </span>
                      </td>
                      <td>
                        <span 
                          className="risk-level"
                          style={{ 
                            color: getRiskColor(
                              risk.impact === '高' && risk.probability === '高' ? '高' :
                              risk.impact === '高' || risk.probability === '高' ? '中' : '低'
                            )
                          }}
                        >
                          {risk.impact === '高' && risk.probability === '高' ? '高' :
                           risk.impact === '高' || risk.probability === '高' ? '中' : '低'}
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

      <div className="budget-recommendations">
        <h3 className="section-title">优化建议</h3>
        <div className="recommendations-content">
          {budgetData.recommendations.map((rec, index) => (
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

export default BudgetExecution