import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './SatisfactionSurvey.css'

const SatisfactionSurvey = () => {
  const { courseId } = useParams()
  const [surveyData, setSurveyData] = useState({
    overall: {
      totalResponses: 138,
      responseRate: 97.2,
      avgSatisfaction: 4.6,
      npsScore: 76.5,
      completionRate: 94.8,
      recommendationRate: 89.1
    },
    stakeholderFeedback: {
      students: {
        totalResponses: 138,
        avgScore: 4.6,
        categories: {
          courseContent: 4.5,
          teachingQuality: 4.7,
          labFacilities: 4.4,
          mentorship: 4.8,
          workload: 4.2,
          skills: 4.6,
          careerPrep: 4.5
        },
        npsScore: 78.2
      },
      professors: {
        totalResponses: 12,
        avgScore: 4.3,
        categories: {
          programSupport: 4.2,
          resourceAdequacy: 4.1,
          studentQuality: 4.6,
          adminSupport: 4.0,
          workloadBalance: 3.9,
          autonomy: 4.4
        },
        npsScore: 65.8
      },
      parents: {
        totalResponses: 89,
        avgScore: 4.4,
        categories: {
          valueForMoney: 4.3,
          skillDevelopment: 4.6,
          careerProspects: 4.5,
          communication: 4.2,
          safety: 4.7
        },
        npsScore: 72.1
      },
      industry: {
        totalResponses: 15,
        avgScore: 4.2,
        categories: {
          graduateReadiness: 4.3,
          skillRelevance: 4.4,
          collaboration: 4.1,
          innovation: 4.0
        },
        npsScore: 68.9
      },
      alumni: {
        totalResponses: 45,
        avgScore: 4.5,
        categories: {
          programValue: 4.6,
          skillRelevance: 4.4,
          careerImpact: 4.7,
          networkValue: 4.3
        },
        npsScore: 75.6
      }
    },
    trends: [
      { period: '2023春', studentSat: 4.4, professorSat: 4.1, parentSat: 4.2, nps: 68.5 },
      { period: '2023秋', studentSat: 4.5, professorSat: 4.2, parentSat: 4.3, nps: 72.1 },
      { period: '2024春', studentSat: 4.6, professorSat: 4.3, parentSat: 4.4, nps: 76.5 },
      { period: '2024秋', studentSat: 4.6, professorSat: 4.3, parentSat: 4.4, nps: 76.5 }
    ],
    detailedFeedback: {
      strengths: [
        { aspect: '实验设施先进', mentions: 89, sentiment: 'positive' },
        { aspect: '教师指导专业', mentions: 76, sentiment: 'positive' },
        { aspect: '项目实用性强', mentions: 68, sentiment: 'positive' },
        { aspect: '学习氛围良好', mentions: 54, sentiment: 'positive' },
        { aspect: '技能提升显著', mentions: 92, sentiment: 'positive' }
      ],
      improvements: [
        { aspect: '课业负担重', mentions: 34, sentiment: 'negative' },
        { aspect: '时间安排紧', mentions: 28, sentiment: 'negative' },
        { aspect: '理论课程多', mentions: 22, sentiment: 'negative' },
        { aspect: '实习机会少', mentions: 18, sentiment: 'negative' },
        { aspect: '评分标准不清', mentions: 15, sentiment: 'negative' }
      ]
    },
    comparativeAnalysis: {
      currentSemester: 4.6,
      lastSemester: 4.5,
      yearAvg: 4.5,
      peerInstitutions: 4.3,
      nationalAvg: 4.2,
      targetScore: 4.7
    },
    actionPlans: [
      {
        issue: '课业负担重',
        priority: 'high',
        actions: ['优化课程结构', '调整作业量', '增加辅导时间'],
        timeline: '本学期内',
        responsible: '教务组',
        status: 'in-progress'
      },
      {
        issue: '实习机会少',
        priority: 'medium',
        actions: ['扩展企业合作', '增加实习岗位', '优化匹配机制'],
        timeline: '下学期',
        responsible: '就业指导中心',
        status: 'planned'
      },
      {
        issue: '评分标准不清',
        priority: 'medium',
        actions: ['制定详细标准', '加强沟通', '提供范例'],
        timeline: '2周内',
        responsible: '各任课教师',
        status: 'completed'
      }
    ]
  })

  const [selectedView, setSelectedView] = useState('overview')
  const [selectedStakeholder, setSelectedStakeholder] = useState('students')
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const getScoreColor = (score) => {
    if (score >= 4.5) return '#4CAF50'
    if (score >= 4.0) return '#8BC34A'
    if (score >= 3.5) return '#FF9800'
    return '#F44336'
  }

  const getNPSLevel = (score) => {
    if (score >= 70) return { level: '优秀', color: '#4CAF50' }
    if (score >= 50) return { level: '良好', color: '#8BC34A' }
    if (score >= 30) return { level: '一般', color: '#FF9800' }
    return { level: '需改进', color: '#F44336' }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4CAF50'
      case 'in-progress': return '#FF9800'
      case 'planned': return '#2196F3'
      default: return '#666'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return '已完成'
      case 'in-progress': return '进行中'
      case 'planned': return '计划中'
      default: return '未知'
    }
  }

  const exportReport = () => {
    const data = {
      courseId,
      surveyData,
      timestamp: new Date().toISOString()
    }
    console.log('Exporting satisfaction survey report:', data)
  }

  return (
      <div className="satisfaction-survey-container">
        <div className="survey-header">
          <div className="header-left">
            <h1 className="page-title">满意度调查与反馈分析</h1>
            <p className="course-info">实验轮转课程 ID: {courseId}</p>
          </div>
          <div className="header-actions">
            <select 
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
              className="view-selector"
            >
              <option value="overview">总览</option>
              <option value="stakeholders">利益相关者</option>
              <option value="trends">趋势分析</option>
              <option value="feedback">详细反馈</option>
              <option value="comparison">对比分析</option>
              <option value="actions">改进计划</option>
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
          <div className="survey-overview">
            <div className="metrics-grid">
              <div className="metric-card">
                <h3 className="metric-title">整体满意度</h3>
                <div className="metric-content">
                  <div className="primary-metric">
                    <span className="metric-value" style={{ color: getScoreColor(surveyData.overall.avgSatisfaction) }}>
                      {surveyData.overall.avgSatisfaction}/5.0
                    </span>
                    <span className="metric-label">平均满意度</span>
                  </div>
                  <div className="secondary-metrics">
                    <div className="secondary-item">
                      <span className="secondary-label">回复率</span>
                      <span className="secondary-value">{surveyData.overall.responseRate}%</span>
                    </div>
                    <div className="secondary-item">
                      <span className="secondary-label">推荐率</span>
                      <span className="secondary-value">{surveyData.overall.recommendationRate}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <h3 className="metric-title">NPS净推荐值</h3>
                <div className="metric-content">
                  <div className="primary-metric">
                    <span 
                      className="metric-value" 
                      style={{ color: getNPSLevel(surveyData.overall.npsScore).color }}
                    >
                      {surveyData.overall.npsScore}
                    </span>
                    <span className="metric-label">{getNPSLevel(surveyData.overall.npsScore).level}</span>
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <h3 className="metric-title">调查参与</h3>
                <div className="metric-content">
                  <div className="primary-metric">
                    <span className="metric-value">{surveyData.overall.totalResponses}</span>
                    <span className="metric-label">总回复数</span>
                  </div>
                  <div className="secondary-metrics">
                    <div className="secondary-item">
                      <span className="secondary-label">完成率</span>
                      <span className="secondary-value">{surveyData.overall.completionRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="stakeholder-overview">
              <h3 className="section-title">各利益相关者满意度</h3>
              <div className="stakeholder-grid">
                {Object.entries(surveyData.stakeholderFeedback).map(([key, data]) => (
                  <div key={key} className="stakeholder-card">
                    <h4 className="stakeholder-name">
                      {key === 'students' ? '学生' :
                       key === 'professors' ? '教师' :
                       key === 'parents' ? '家长' :
                       key === 'industry' ? '行业伙伴' : '校友'}
                    </h4>
                    <div className="stakeholder-score" style={{ color: getScoreColor(data.avgScore) }}>
                      {data.avgScore}/5.0
                    </div>
                    <div className="stakeholder-details">
                      <div className="detail-item">
                        <span className="detail-label">回复数</span>
                        <span className="detail-value">{data.totalResponses}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">NPS</span>
                        <span className="detail-value">{data.npsScore}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'stakeholders' && (
          <div className="stakeholder-analysis">
            <div className="stakeholder-selector">
              <h3 className="section-title">详细利益相关者分析</h3>
              <select 
                value={selectedStakeholder}
                onChange={(e) => setSelectedStakeholder(e.target.value)}
                className="stakeholder-select"
              >
                <option value="students">学生</option>
                <option value="professors">教师</option>
                <option value="parents">家长</option>
                <option value="industry">行业伙伴</option>
                <option value="alumni">校友</option>
              </select>
            </div>

            <div className="stakeholder-detail">
              <div className="stakeholder-summary">
                <h4 className="detail-title">
                  {selectedStakeholder === 'students' ? '学生满意度详情' :
                   selectedStakeholder === 'professors' ? '教师满意度详情' :
                   selectedStakeholder === 'parents' ? '家长满意度详情' :
                   selectedStakeholder === 'industry' ? '行业伙伴满意度详情' : '校友满意度详情'}
                </h4>
                <div className="summary-metrics">
                  <div className="summary-metric">
                    <span className="summary-label">总体评分</span>
                    <span 
                      className="summary-value" 
                      style={{ color: getScoreColor(surveyData.stakeholderFeedback[selectedStakeholder].avgScore) }}
                    >
                      {surveyData.stakeholderFeedback[selectedStakeholder].avgScore}/5.0
                    </span>
                  </div>
                  <div className="summary-metric">
                    <span className="summary-label">NPS得分</span>
                    <span 
                      className="summary-value"
                      style={{ color: getNPSLevel(surveyData.stakeholderFeedback[selectedStakeholder].npsScore).color }}
                    >
                      {surveyData.stakeholderFeedback[selectedStakeholder].npsScore}
                    </span>
                  </div>
                </div>
              </div>

              <div className="category-breakdown">
                <h5 className="breakdown-title">分类评分</h5>
                <div className="category-list">
                  {Object.entries(surveyData.stakeholderFeedback[selectedStakeholder].categories).map(([category, score]) => (
                    <div key={category} className="category-item">
                      <div className="category-info">
                        <span className="category-name">
                          {category === 'courseContent' ? '课程内容' :
                           category === 'teachingQuality' ? '教学质量' :
                           category === 'labFacilities' ? '实验设施' :
                           category === 'mentorship' ? '导师指导' :
                           category === 'workload' ? '课业负担' :
                           category === 'skills' ? '技能提升' :
                           category === 'careerPrep' ? '职业准备' :
                           category === 'programSupport' ? '项目支持' :
                           category === 'resourceAdequacy' ? '资源充足性' :
                           category === 'studentQuality' ? '学生质量' :
                           category === 'adminSupport' ? '行政支持' :
                           category === 'workloadBalance' ? '工作负担平衡' :
                           category === 'autonomy' ? '教学自主性' :
                           category === 'valueForMoney' ? '性价比' :
                           category === 'skillDevelopment' ? '技能发展' :
                           category === 'careerProspects' ? '职业前景' :
                           category === 'communication' ? '沟通交流' :
                           category === 'safety' ? '安全保障' :
                           category === 'graduateReadiness' ? '毕业生准备度' :
                           category === 'skillRelevance' ? '技能相关性' :
                           category === 'collaboration' ? '合作程度' :
                           category === 'innovation' ? '创新能力' :
                           category === 'programValue' ? '项目价值' :
                           category === 'careerImpact' ? '职业影响' :
                           category === 'networkValue' ? '网络价值' : category}
                        </span>
                        <span className="category-score" style={{ color: getScoreColor(score) }}>
                          {score}/5.0
                        </span>
                      </div>
                      <div className="category-bar">
                        <div 
                          className="category-fill" 
                          style={{
                            width: `${(score / 5) * 100}%`,
                            backgroundColor: getScoreColor(score)
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'trends' && (
          <div className="trends-analysis">
            <h3 className="section-title">满意度趋势分析</h3>
            <div className="trends-chart">
              <div className="chart-container">
                <div className="chart-header">
                  <div className="legend">
                    <div className="legend-item">
                      <div className="legend-color student"></div>
                      <span className="legend-label">学生满意度</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color professor"></div>
                      <span className="legend-label">教师满意度</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color parent"></div>
                      <span className="legend-label">家长满意度</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color nps"></div>
                      <span className="legend-label">NPS得分</span>
                    </div>
                  </div>
                </div>
                <div className="chart-content">
                  {surveyData.trends.map((period, index) => (
                    <div key={index} className="trend-period">
                      <div className="period-bars">
                        <div className="trend-bar">
                          <div 
                            className="trend-fill student" 
                            style={{ height: `${(period.studentSat / 5) * 100}%` }}
                          ></div>
                        </div>
                        <div className="trend-bar">
                          <div 
                            className="trend-fill professor" 
                            style={{ height: `${(period.professorSat / 5) * 100}%` }}
                          ></div>
                        </div>
                        <div className="trend-bar">
                          <div 
                            className="trend-fill parent" 
                            style={{ height: `${(period.parentSat / 5) * 100}%` }}
                          ></div>
                        </div>
                        <div className="trend-bar">
                          <div 
                            className="trend-fill nps" 
                            style={{ height: `${(period.nps / 100) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="period-info">
                        <span className="period-label">{period.period}</span>
                        <div className="period-values">
                          <span className="value-item student">{period.studentSat}</span>
                          <span className="value-item professor">{period.professorSat}</span>
                          <span className="value-item parent">{period.parentSat}</span>
                          <span className="value-item nps">{period.nps}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'feedback' && (
          <div className="detailed-feedback">
            <div className="feedback-grid">
              <div className="feedback-section">
                <h3 className="section-title">优势方面</h3>
                <div className="feedback-list">
                  {surveyData.detailedFeedback.strengths.map((item, index) => (
                    <div key={index} className="feedback-item positive">
                      <div className="feedback-content">
                        <span className="feedback-aspect">{item.aspect}</span>
                        <span className="feedback-mentions">{item.mentions} 次提及</span>
                      </div>
                      <div className="feedback-bar">
                        <div 
                          className="feedback-fill positive" 
                          style={{ width: `${(item.mentions / 100) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="feedback-section">
                <h3 className="section-title">改进方面</h3>
                <div className="feedback-list">
                  {surveyData.detailedFeedback.improvements.map((item, index) => (
                    <div key={index} className="feedback-item negative">
                      <div className="feedback-content">
                        <span className="feedback-aspect">{item.aspect}</span>
                        <span className="feedback-mentions">{item.mentions} 次提及</span>
                      </div>
                      <div className="feedback-bar">
                        <div 
                          className="feedback-fill negative" 
                          style={{ width: `${(item.mentions / 40) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'comparison' && (
          <div className="comparative-analysis">
            <h3 className="section-title">对比分析</h3>
            <div className="comparison-chart">
              <div className="comparison-item">
                <span className="comparison-label">当前学期</span>
                <div className="comparison-bar">
                  <div 
                    className="comparison-fill current" 
                    style={{ width: `${(surveyData.comparativeAnalysis.currentSemester / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="comparison-value">{surveyData.comparativeAnalysis.currentSemester}</span>
              </div>
              <div className="comparison-item">
                <span className="comparison-label">上学期</span>
                <div className="comparison-bar">
                  <div 
                    className="comparison-fill last" 
                    style={{ width: `${(surveyData.comparativeAnalysis.lastSemester / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="comparison-value">{surveyData.comparativeAnalysis.lastSemester}</span>
              </div>
              <div className="comparison-item">
                <span className="comparison-label">年度平均</span>
                <div className="comparison-bar">
                  <div 
                    className="comparison-fill year" 
                    style={{ width: `${(surveyData.comparativeAnalysis.yearAvg / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="comparison-value">{surveyData.comparativeAnalysis.yearAvg}</span>
              </div>
              <div className="comparison-item">
                <span className="comparison-label">同类院校</span>
                <div className="comparison-bar">
                  <div 
                    className="comparison-fill peer" 
                    style={{ width: `${(surveyData.comparativeAnalysis.peerInstitutions / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="comparison-value">{surveyData.comparativeAnalysis.peerInstitutions}</span>
              </div>
              <div className="comparison-item">
                <span className="comparison-label">全国平均</span>
                <div className="comparison-bar">
                  <div 
                    className="comparison-fill national" 
                    style={{ width: `${(surveyData.comparativeAnalysis.nationalAvg / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="comparison-value">{surveyData.comparativeAnalysis.nationalAvg}</span>
              </div>
              <div className="comparison-item target">
                <span className="comparison-label">目标分数</span>
                <div className="comparison-bar">
                  <div 
                    className="comparison-fill target" 
                    style={{ width: `${(surveyData.comparativeAnalysis.targetScore / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="comparison-value">{surveyData.comparativeAnalysis.targetScore}</span>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'actions' && (
          <div className="action-plans">
            <h3 className="section-title">满意度改进行动计划</h3>
            <div className="actions-list">
              {surveyData.actionPlans.map((plan, index) => (
                <div key={index} className="action-card">
                  <div className="action-header">
                    <div className="action-info">
                      <h4 className="action-issue">{plan.issue}</h4>
                      <span className={`priority-badge ${plan.priority}`}>
                        {plan.priority === 'high' ? '高优先级' : 
                         plan.priority === 'medium' ? '中优先级' : '低优先级'}
                      </span>
                    </div>
                    <div className="action-status">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(plan.status) }}
                      >
                        {getStatusLabel(plan.status)}
                      </span>
                    </div>
                  </div>
                  <div className="action-details">
                    <div className="action-actions">
                      <h5 className="details-title">具体措施</h5>
                      <ul className="actions-list-items">
                        {plan.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="action-item">{action}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="action-meta">
                      <div className="meta-item">
                        <span className="meta-label">时间框架</span>
                        <span className="meta-value">{plan.timeline}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">负责部门</span>
                        <span className="meta-value">{plan.responsible}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
  )
}

export default SatisfactionSurvey