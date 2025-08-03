import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './GoalAchievement.css'

const GoalAchievement = () => {
  const { courseId } = useParams()
  const [goalData, setGoalData] = useState({
    overall: {
      overallAchievement: 87.4,
      accreditationCompliance: 94.2,
      programQuality: 4.5,
      industryAlignment: 89.3,
      graduatePlacement: 95.7,
      employerSatisfaction: 4.3,
      programInnovation: 4.2,
      externalRecognition: 8
    },
    accreditationStandards: [
      {
        standard: '课程设置合理性',
        requirement: '符合专业认证要求',
        status: 'compliant',
        score: 96.5,
        evidence: ['课程大纲完整', '学时分配合理', '实践课程充足'],
        lastReview: '2024-03-15',
        nextReview: '2025-03-15'
      },
      {
        standard: '师资力量配备',
        requirement: '具备足够的专业师资',
        status: 'compliant',
        score: 92.8,
        evidence: ['教师学历达标', '专业背景匹配', '师生比合理'],
        lastReview: '2024-02-20',
        nextReview: '2025-02-20'
      },
      {
        standard: '实验设施完善',
        requirement: '实验室设备先进充足',
        status: 'compliant',
        score: 95.1,
        evidence: ['设备更新及时', '数量充足', '安全标准达标'],
        lastReview: '2024-01-10',
        nextReview: '2024-07-10'
      },
      {
        standard: '学生学习成果',
        requirement: '达到预期学习目标',
        status: 'review',
        score: 88.9,
        evidence: ['技能测试通过', '项目完成质量', '就业竞争力'],
        lastReview: '2024-04-01',
        nextReview: '2024-10-01'
      },
      {
        standard: '质量保障体系',
        requirement: '建立完善的质量监控',
        status: 'compliant',
        score: 93.7,
        evidence: ['监控机制完善', '反馈渠道畅通', '持续改进机制'],
        lastReview: '2024-03-20',
        nextReview: '2025-03-20'
      }
    ],
    programObjectives: [
      {
        objective: '培养创新能力',
        description: '学生具备独立创新和解决复杂问题的能力',
        achievement: 89.2,
        metrics: [
          { metric: '创新项目完成率', value: 87.5, target: 85.0 },
          { metric: '专利申请数量', value: 3, target: 2 },
          { metric: '创新竞赛获奖', value: 12, target: 10 }
        ],
        status: 'achieved'
      },
      {
        objective: '提升实践技能',
        description: '掌握行业前沿的实验技术和研究方法',
        achievement: 91.7,
        metrics: [
          { metric: '实验技能评估', value: 4.3, target: 4.0 },
          { metric: '实践项目质量', value: 89.5, target: 85.0 },
          { metric: '技能认证通过', value: 94.2, target: 90.0 }
        ],
        status: 'achieved'
      },
      {
        objective: '增强就业竞争力',
        description: '为学生提供充分的职业发展准备',
        achievement: 95.3,
        metrics: [
          { metric: '就业率', value: 95.7, target: 90.0 },
          { metric: '起薪水平', value: 8500, target: 7500 },
          { metric: '雇主满意度', value: 4.3, target: 4.0 }
        ],
        status: 'exceeded'
      },
      {
        objective: '培养团队精神',
        description: '提升学生的团队协作和领导能力',
        achievement: 85.8,
        metrics: [
          { metric: '团队项目评分', value: 4.2, target: 4.0 },
          { metric: '协作能力评估', value: 87.4, target: 85.0 },
          { metric: '领导力表现', value: 82.1, target: 80.0 }
        ],
        status: 'achieved'
      },
      {
        objective: '促进国际化视野',
        description: '拓展学生的国际视野和跨文化交流能力',
        achievement: 78.5,
        metrics: [
          { metric: '国际交流参与', value: 23.4, target: 30.0 },
          { metric: '外语能力提升', value: 85.6, target: 85.0 },
          { metric: '国际认证获得', value: 67.8, target: 70.0 }
        ],
        status: 'approaching'
      }
    ],
    curriculumRelevance: {
      industryAlignment: {
        score: 89.3,
        categories: [
          { category: '技术前沿性', score: 91.2, feedback: '紧跟行业发展趋势' },
          { category: '实用性', score: 87.8, feedback: '项目贴近实际应用' },
          { category: '市场需求匹配', score: 88.9, feedback: '符合当前人才需求' },
          { category: '创新性要求', score: 89.4, feedback: '鼓励创新思维培养' }
        ]
      },
      employerFeedback: [
        {
          employer: 'XX科技有限公司',
          rating: 4.5,
          feedback: '毕业生专业基础扎实，动手能力强',
          improvements: '希望加强软件工程实践'
        },
        {
          employer: 'YY研究院',
          rating: 4.2,
          feedback: '学生创新思维活跃，学习能力强',
          improvements: '建议增加项目管理经验'
        },
        {
          employer: 'ZZ集团',
          rating: 4.6,
          feedback: '毕业生适应能力强，团队合作佳',
          improvements: '期望提升英语沟通能力'
        }
      ]
    },
    placementOutcomes: {
      graduateSchool: {
        domestic: { count: 45, percentage: 31.7, topUniversities: 28 },
        international: { count: 23, percentage: 16.2, topUniversities: 18 },
        researchInstitute: { count: 12, percentage: 8.5, topInstitutes: 9 }
      },
      employment: {
        techIndustry: { count: 38, percentage: 26.8, avgSalary: 9200 },
        academicPositions: { count: 15, percentage: 10.6, avgSalary: 7800 },
        government: { count: 8, percentage: 5.6, avgSalary: 7200 },
        startups: { count: 3, percentage: 2.1, avgSalary: 8500 }
      },
      careerProgression: [
        { timeframe: '1年内', promotionRate: 15.8, avgSalaryIncrease: 12.5 },
        { timeframe: '2年内', promotionRate: 34.2, avgSalaryIncrease: 28.7 },
        { timeframe: '3年内', promotionRate: 52.1, avgSalaryIncrease: 45.3 }
      ]
    },
    innovationMetrics: {
      uniqueness: {
        score: 4.2,
        aspects: [
          { aspect: '课程设计创新', score: 4.3 },
          { aspect: '教学方法创新', score: 4.1 },
          { aspect: '评价体系创新', score: 4.0 },
          { aspect: '产学研结合', score: 4.4 }
        ]
      },
      recognition: {
        nationalAwards: 3,
        internationalRecognition: 2,
        mediaReports: 8,
        peerVisits: 15,
        bestPractices: 5
      }
    },
    improvements: [
      {
        area: '国际化水平',
        currentScore: 78.5,
        targetScore: 85.0,
        timeline: '1年内',
        actions: [
          '增加国际交流项目',
          '引进外籍教师',
          '开设双语课程',
          '建立国际合作实验室'
        ],
        responsible: '国际交流办公室',
        priority: 'high'
      },
      {
        area: '产业对接深度',
        currentScore: 85.3,
        targetScore: 90.0,
        timeline: '6个月内',
        actions: [
          '深化校企合作',
          '增加企业实习岗位',
          '邀请行业专家授课',
          '建立产业导师制'
        ],
        responsible: '产学合作办公室',
        priority: 'medium'
      },
      {
        area: '评价体系完善',
        currentScore: 88.9,
        targetScore: 92.0,
        timeline: '3个月内',
        actions: [
          '细化评分标准',
          '增加过程性评价',
          '建立多元评价体系',
          '加强反馈机制'
        ],
        responsible: '教务处',
        priority: 'medium'
      }
    ]
  })

  const [selectedView, setSelectedView] = useState('overview')
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return '#4CAF50'
      case 'review': return '#FF9800'
      case 'non-compliant': return '#F44336'
      case 'exceeded': return '#2196F3'
      case 'achieved': return '#4CAF50'
      case 'approaching': return '#FF9800'
      case 'behind': return '#F44336'
      default: return '#666'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'compliant': return '合规'
      case 'review': return '待审查'
      case 'non-compliant': return '不合规'
      case 'exceeded': return '超越目标'
      case 'achieved': return '达成目标'
      case 'approaching': return '接近目标'
      case 'behind': return '需改进'
      default: return '未知'
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return '#4CAF50'
    if (score >= 80) return '#8BC34A'
    if (score >= 70) return '#FF9800'
    return '#F44336'
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#F44336'
      case 'medium': return '#FF9800'
      case 'low': return '#4CAF50'
      default: return '#666'
    }
  }

  const exportReport = () => {
    const data = {
      courseId,
      goalData,
      timestamp: new Date().toISOString()
    }
    console.log('Exporting goal achievement report:', data)
  }

  return (
    <Layout>
      <div className="goal-achievement-container">
        <div className="goal-header">
          <div className="header-left">
            <h1 className="page-title">项目质量指标与目标达成</h1>
            <p className="course-info">实验轮转课程 ID: {courseId}</p>
          </div>
          <div className="header-actions">
            <select 
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
              className="view-selector"
            >
              <option value="overview">总览</option>
              <option value="accreditation">认证标准</option>
              <option value="objectives">项目目标</option>
              <option value="curriculum">课程相关性</option>
              <option value="placement">就业成果</option>
              <option value="innovation">创新指标</option>
              <option value="improvements">改进计划</option>
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
          <div className="goal-overview">
            <div className="metrics-grid">
              <div className="metric-card">
                <h3 className="metric-title">整体达成情况</h3>
                <div className="metric-content">
                  <div className="primary-metric">
                    <span className="metric-value" style={{ color: getScoreColor(goalData.overall.overallAchievement) }}>
                      {goalData.overall.overallAchievement}%
                    </span>
                    <span className="metric-label">总体目标达成率</span>
                  </div>
                  <div className="secondary-metrics">
                    <div className="secondary-item">
                      <span className="secondary-label">认证合规性</span>
                      <span className="secondary-value">{goalData.overall.accreditationCompliance}%</span>
                    </div>
                    <div className="secondary-item">
                      <span className="secondary-label">项目质量</span>
                      <span className="secondary-value">{goalData.overall.programQuality}/5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <h3 className="metric-title">产业对接</h3>
                <div className="metric-content">
                  <div className="primary-metric">
                    <span className="metric-value" style={{ color: getScoreColor(goalData.overall.industryAlignment) }}>
                      {goalData.overall.industryAlignment}%
                    </span>
                    <span className="metric-label">行业匹配度</span>
                  </div>
                  <div className="secondary-metrics">
                    <div className="secondary-item">
                      <span className="secondary-label">雇主满意度</span>
                      <span className="secondary-value">{goalData.overall.employerSatisfaction}/5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <h3 className="metric-title">就业成果</h3>
                <div className="metric-content">
                  <div className="primary-metric">
                    <span className="metric-value" style={{ color: getScoreColor(goalData.overall.graduatePlacement) }}>
                      {goalData.overall.graduatePlacement}%
                    </span>
                    <span className="metric-label">毕业去向落实率</span>
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <h3 className="metric-title">创新水平</h3>
                <div className="metric-content">
                  <div className="primary-metric">
                    <span className="metric-value" style={{ color: getScoreColor(goalData.overall.programInnovation * 20) }}>
                      {goalData.overall.programInnovation}/5.0
                    </span>
                    <span className="metric-label">项目创新度</span>
                  </div>
                  <div className="secondary-metrics">
                    <div className="secondary-item">
                      <span className="secondary-label">外部认可</span>
                      <span className="secondary-value">{goalData.overall.externalRecognition} 项</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'accreditation' && (
          <div className="accreditation-standards">
            <h3 className="section-title">教育认证标准合规性</h3>
            <div className="standards-list">
              {goalData.accreditationStandards.map((standard, index) => (
                <div key={index} className="standard-card">
                  <div className="standard-header">
                    <div className="standard-info">
                      <h4 className="standard-name">{standard.standard}</h4>
                      <p className="standard-requirement">{standard.requirement}</p>
                    </div>
                    <div className="standard-status">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(standard.status) }}
                      >
                        {getStatusLabel(standard.status)}
                      </span>
                      <span className="standard-score" style={{ color: getScoreColor(standard.score) }}>
                        {standard.score}%
                      </span>
                    </div>
                  </div>
                  <div className="standard-details">
                    <div className="evidence-section">
                      <h5 className="details-title">合规证据</h5>
                      <ul className="evidence-list">
                        {standard.evidence.map((evidence, evidenceIndex) => (
                          <li key={evidenceIndex} className="evidence-item">{evidence}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="review-timeline">
                      <div className="timeline-item">
                        <span className="timeline-label">上次审查</span>
                        <span className="timeline-date">{standard.lastReview}</span>
                      </div>
                      <div className="timeline-item">
                        <span className="timeline-label">下次审查</span>
                        <span className="timeline-date">{standard.nextReview}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'objectives' && (
          <div className="program-objectives">
            <h3 className="section-title">项目学习目标达成情况</h3>
            <div className="objectives-list">
              {goalData.programObjectives.map((objective, index) => (
                <div key={index} className="objective-card">
                  <div className="objective-header">
                    <div className="objective-info">
                      <h4 className="objective-name">{objective.objective}</h4>
                      <p className="objective-description">{objective.description}</p>
                    </div>
                    <div className="objective-achievement">
                      <span 
                        className="achievement-percentage" 
                        style={{ color: getScoreColor(objective.achievement) }}
                      >
                        {objective.achievement}%
                      </span>
                      <span 
                        className="achievement-status"
                        style={{ backgroundColor: getStatusColor(objective.status) }}
                      >
                        {getStatusLabel(objective.status)}
                      </span>
                    </div>
                  </div>
                  <div className="objective-metrics">
                    <h5 className="metrics-title">详细指标</h5>
                    <div className="metrics-list">
                      {objective.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="metric-item">
                          <div className="metric-info">
                            <span className="metric-name">{metric.metric}</span>
                            <div className="metric-values">
                              <span className="metric-actual">实际: {metric.value}</span>
                              <span className="metric-target">目标: {metric.target}</span>
                            </div>
                          </div>
                          <div className="metric-progress">
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{
                                  width: `${Math.min((metric.value / metric.target) * 100, 100)}%`,
                                  backgroundColor: metric.value >= metric.target ? '#4CAF50' : '#FF9800'
                                }}
                              ></div>
                            </div>
                            <span className="progress-percentage">
                              {((metric.value / metric.target) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'curriculum' && (
          <div className="curriculum-relevance">
            <div className="relevance-overview">
              <h3 className="section-title">课程相关性与行业对接</h3>
              <div className="alignment-score">
                <div className="score-display">
                  <span className="score-value" style={{ color: getScoreColor(goalData.curriculumRelevance.industryAlignment.score) }}>
                    {goalData.curriculumRelevance.industryAlignment.score}%
                  </span>
                  <span className="score-label">行业匹配度</span>
                </div>
              </div>
              <div className="alignment-categories">
                {goalData.curriculumRelevance.industryAlignment.categories.map((category, index) => (
                  <div key={index} className="category-item">
                    <div className="category-header">
                      <span className="category-name">{category.category}</span>
                      <span className="category-score" style={{ color: getScoreColor(category.score) }}>
                        {category.score}%
                      </span>
                    </div>
                    <div className="category-feedback">{category.feedback}</div>
                    <div className="category-bar">
                      <div 
                        className="category-fill" 
                        style={{
                          width: `${category.score}%`,
                          backgroundColor: getScoreColor(category.score)
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="employer-feedback">
              <h3 className="section-title">雇主反馈</h3>
              <div className="feedback-list">
                {goalData.curriculumRelevance.employerFeedback.map((feedback, index) => (
                  <div key={index} className="feedback-card">
                    <div className="feedback-header">
                      <h4 className="employer-name">{feedback.employer}</h4>
                      <div className="employer-rating">
                        <span className="rating-value" style={{ color: getScoreColor(feedback.rating * 20) }}>
                          {feedback.rating}/5.0
                        </span>
                      </div>
                    </div>
                    <div className="feedback-content">
                      <div className="feedback-positive">
                        <h5 className="feedback-title">优势反馈</h5>
                        <p className="feedback-text">{feedback.feedback}</p>
                      </div>
                      <div className="feedback-improvements">
                        <h5 className="feedback-title">改进建议</h5>
                        <p className="feedback-text">{feedback.improvements}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'placement' && (
          <div className="placement-outcomes">
            <h3 className="section-title">毕业生就业与深造成果</h3>
            <div className="placement-grid">
              <div className="placement-section">
                <h4 className="placement-title">继续深造</h4>
                <div className="placement-stats">
                  <div className="stat-item">
                    <span className="stat-label">国内研究生</span>
                    <span className="stat-value">{goalData.placementOutcomes.graduateSchool.domestic.count}</span>
                    <span className="stat-percentage">{goalData.placementOutcomes.graduateSchool.domestic.percentage}%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">海外深造</span>
                    <span className="stat-value">{goalData.placementOutcomes.graduateSchool.international.count}</span>
                    <span className="stat-percentage">{goalData.placementOutcomes.graduateSchool.international.percentage}%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">科研院所</span>
                    <span className="stat-value">{goalData.placementOutcomes.graduateSchool.researchInstitute.count}</span>
                    <span className="stat-percentage">{goalData.placementOutcomes.graduateSchool.researchInstitute.percentage}%</span>
                  </div>
                </div>
              </div>

              <div className="placement-section">
                <h4 className="placement-title">直接就业</h4>
                <div className="placement-stats">
                  <div className="stat-item">
                    <span className="stat-label">科技企业</span>
                    <span className="stat-value">{goalData.placementOutcomes.employment.techIndustry.count}</span>
                    <span className="stat-salary">均薪 ¥{goalData.placementOutcomes.employment.techIndustry.avgSalary}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">学术机构</span>
                    <span className="stat-value">{goalData.placementOutcomes.employment.academicPositions.count}</span>
                    <span className="stat-salary">均薪 ¥{goalData.placementOutcomes.employment.academicPositions.avgSalary}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">政府部门</span>
                    <span className="stat-value">{goalData.placementOutcomes.employment.government.count}</span>
                    <span className="stat-salary">均薪 ¥{goalData.placementOutcomes.employment.government.avgSalary}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="career-progression">
              <h4 className="progression-title">职业发展轨迹</h4>
              <div className="progression-timeline">
                {goalData.placementOutcomes.careerProgression.map((period, index) => (
                  <div key={index} className="progression-item">
                    <div className="progression-timeframe">{period.timeframe}</div>
                    <div className="progression-metrics">
                      <div className="progression-metric">
                        <span className="metric-label">晋升率</span>
                        <span className="metric-value">{period.promotionRate}%</span>
                      </div>
                      <div className="progression-metric">
                        <span className="metric-label">薪资增长</span>
                        <span className="metric-value">{period.avgSalaryIncrease}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'innovation' && (
          <div className="innovation-metrics">
            <h3 className="section-title">项目创新性与独特性</h3>
            <div className="innovation-grid">
              <div className="innovation-section">
                <h4 className="innovation-title">创新度评估</h4>
                <div className="innovation-score">
                  <span className="score-value" style={{ color: getScoreColor(goalData.innovationMetrics.uniqueness.score * 20) }}>
                    {goalData.innovationMetrics.uniqueness.score}/5.0
                  </span>
                  <span className="score-label">整体创新度</span>
                </div>
                <div className="innovation-aspects">
                  {goalData.innovationMetrics.uniqueness.aspects.map((aspect, index) => (
                    <div key={index} className="aspect-item">
                      <span className="aspect-name">{aspect.aspect}</span>
                      <span className="aspect-score" style={{ color: getScoreColor(aspect.score * 20) }}>
                        {aspect.score}/5.0
                      </span>
                      <div className="aspect-bar">
                        <div 
                          className="aspect-fill" 
                          style={{
                            width: `${(aspect.score / 5) * 100}%`,
                            backgroundColor: getScoreColor(aspect.score * 20)
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="recognition-section">
                <h4 className="recognition-title">外部认可</h4>
                <div className="recognition-stats">
                  <div className="recognition-item">
                    <span className="recognition-label">国家级奖项</span>
                    <span className="recognition-value">{goalData.innovationMetrics.recognition.nationalAwards}</span>
                  </div>
                  <div className="recognition-item">
                    <span className="recognition-label">国际认可</span>
                    <span className="recognition-value">{goalData.innovationMetrics.recognition.internationalRecognition}</span>
                  </div>
                  <div className="recognition-item">
                    <span className="recognition-label">媒体报道</span>
                    <span className="recognition-value">{goalData.innovationMetrics.recognition.mediaReports}</span>
                  </div>
                  <div className="recognition-item">
                    <span className="recognition-label">同行参访</span>
                    <span className="recognition-value">{goalData.innovationMetrics.recognition.peerVisits}</span>
                  </div>
                  <div className="recognition-item">
                    <span className="recognition-label">最佳实践</span>
                    <span className="recognition-value">{goalData.innovationMetrics.recognition.bestPractices}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'improvements' && (
          <div className="improvement-plans">
            <h3 className="section-title">质量提升改进计划</h3>
            <div className="improvements-list">
              {goalData.improvements.map((improvement, index) => (
                <div key={index} className="improvement-card">
                  <div className="improvement-header">
                    <div className="improvement-info">
                      <h4 className="improvement-area">{improvement.area}</h4>
                      <div className="improvement-progress">
                        <span className="current-score">当前: {improvement.currentScore}%</span>
                        <span className="target-score">目标: {improvement.targetScore}%</span>
                        <span className="improvement-timeline">{improvement.timeline}</span>
                      </div>
                    </div>
                    <div className="improvement-priority">
                      <span 
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(improvement.priority) }}
                      >
                        {improvement.priority === 'high' ? '高优先级' : 
                         improvement.priority === 'medium' ? '中优先级' : '低优先级'}
                      </span>
                    </div>
                  </div>
                  <div className="improvement-details">
                    <div className="improvement-actions">
                      <h5 className="actions-title">具体措施</h5>
                      <ul className="actions-list">
                        {improvement.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="action-item">{action}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="improvement-meta">
                      <div className="meta-item">
                        <span className="meta-label">负责部门</span>
                        <span className="meta-value">{improvement.responsible}</span>
                      </div>
                    </div>
                  </div>
                  <div className="improvement-progress-bar">
                    <div className="progress-background">
                      <div 
                        className="progress-current" 
                        style={{ width: `${(improvement.currentScore / improvement.targetScore) * 100}%` }}
                      ></div>
                    </div>
                    <div className="progress-labels">
                      <span className="progress-start">0%</span>
                      <span className="progress-target">{improvement.targetScore}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default GoalAchievement