import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './StudentOutcomes.css'

const StudentOutcomes = () => {
  const { courseId } = useParams()
  const [outcomesData, setOutcomesData] = useState({
    overall: {
      totalStudents: 142,
      avgCompetencyGain: 78.5,
      skillDevelopmentRate: 85.2,
      learningObjectiveAchievement: 89.1,
      studentSatisfaction: 4.6,
      careerPlacement: 94.3,
      researchPublications: 18,
      innovationProjects: 12
    },
    competencyTracking: [
      {
        competency: '实验技能',
        baseline: 3.2,
        current: 4.3,
        gain: 34.4,
        target: 4.5,
        status: 'on-track'
      },
      {
        competency: '数据分析',
        baseline: 2.8,
        current: 4.1,
        gain: 46.4,
        target: 4.0,
        status: 'exceeding'
      },
      {
        competency: '科研方法',
        baseline: 2.5,
        current: 3.9,
        gain: 56.0,
        target: 4.2,
        status: 'approaching'
      },
      {
        competency: '团队协作',
        baseline: 3.5,
        current: 4.4,
        gain: 25.7,
        target: 4.3,
        status: 'exceeding'
      },
      {
        competency: '学术写作',
        baseline: 2.9,
        current: 3.7,
        gain: 27.6,
        target: 4.1,
        status: 'approaching'
      },
      {
        competency: '创新思维',
        baseline: 3.1,
        current: 4.2,
        gain: 35.5,
        target: 4.4,
        status: 'on-track'
      }
    ],
    learningObjectives: [
      {
        objective: '掌握核心实验技术',
        achievementRate: 91.5,
        studentsAchieved: 130,
        totalStudents: 142,
        difficulty: 'medium',
        timeframe: '第一阶段'
      },
      {
        objective: '完成独立研究项目',
        achievementRate: 85.9,
        studentsAchieved: 122,
        totalStudents: 142,
        difficulty: 'high',
        timeframe: '第二阶段'
      },
      {
        objective: '发表学术论文或报告',
        achievementRate: 76.1,
        studentsAchieved: 108,
        totalStudents: 142,
        difficulty: 'high',
        timeframe: '第三阶段'
      },
      {
        objective: '展示创新成果',
        achievementRate: 89.4,
        studentsAchieved: 127,
        totalStudents: 142,
        difficulty: 'medium',
        timeframe: '全阶段'
      }
    ],
    projectQuality: [
      {
        category: '创新性',
        avgScore: 4.2,
        distribution: { excellent: 35, good: 58, average: 42, poor: 7 },
        trend: 'improving'
      },
      {
        category: '技术深度',
        avgScore: 3.9,
        distribution: { excellent: 28, good: 64, average: 45, poor: 5 },
        trend: 'stable'
      },
      {
        category: '实用价值',
        avgScore: 4.1,
        distribution: { excellent: 32, good: 61, average: 44, poor: 5 },
        trend: 'improving'
      },
      {
        category: '完整性',
        avgScore: 4.3,
        distribution: { excellent: 38, good: 56, average: 41, poor: 7 },
        trend: 'stable'
      }
    ],
    careerOutcomes: {
      continuedEducation: {
        domesticGraduate: 45,
        internationalGraduate: 23,
        researchInstitute: 12,
        percentage: 56.3
      },
      employment: {
        techIndustry: 28,
        academicPositions: 15,
        government: 8,
        entrepreneurship: 3,
        percentage: 38.0
      },
      other: {
        gapYear: 6,
        undecided: 2,
        percentage: 5.6
      }
    },
    professorComparison: [
      {
        professor: '张教授',
        students: 24,
        avgCompetencyGain: 82.1,
        satisfactionScore: 4.7,
        publicationRate: 16.7,
        careerPlacement: 95.8
      },
      {
        professor: '李教授',
        students: 28,
        avgCompetencyGain: 78.9,
        satisfactionScore: 4.5,
        publicationRate: 14.3,
        careerPlacement: 92.9
      },
      {
        professor: '王教授',
        students: 22,
        avgCompetencyGain: 75.3,
        satisfactionScore: 4.4,
        publicationRate: 18.2,
        careerPlacement: 95.5
      },
      {
        professor: '陈教授',
        students: 26,
        avgCompetencyGain: 79.2,
        satisfactionScore: 4.6,
        publicationRate: 11.5,
        careerPlacement: 92.3
      },
      {
        professor: '刘教授',
        students: 25,
        avgCompetencyGain: 81.5,
        satisfactionScore: 4.8,
        publicationRate: 20.0,
        careerPlacement: 96.0
      },
      {
        professor: '赵教授',
        students: 17,
        avgCompetencyGain: 76.8,
        satisfactionScore: 4.3,
        publicationRate: 11.8,
        careerPlacement: 94.1
      }
    ]
  })

  const [selectedView, setSelectedView] = useState('overview')
  const [selectedPeriod, setSelectedPeriod] = useState('current')
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'exceeding': return '#4CAF50'
      case 'on-track': return '#2196F3'
      case 'approaching': return '#FF9800'
      case 'behind': return '#F44336'
      default: return '#666'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'exceeding': return '超预期'
      case 'on-track': return '达标'
      case 'approaching': return '接近目标'
      case 'behind': return '需改进'
      default: return '未知'
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return '↗'
      case 'declining': return '↘'
      case 'stable': return '→'
      default: return '→'
    }
  }

  const exportReport = () => {
    const data = {
      courseId,
      outcomesData,
      timestamp: new Date().toISOString()
    }
    console.log('Exporting student outcomes report:', data)
  }

  return (
      <div className="student-outcomes-container">
        <div className="outcomes-header">
          <div className="header-left">
            <h1 className="page-title">学生学习成果分析</h1>
            <p className="course-info">实验轮转课程 ID: {courseId}</p>
          </div>
          <div className="header-actions">
            <select 
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
              className="view-selector"
            >
              <option value="overview">总览</option>
              <option value="competency">能力发展</option>
              <option value="objectives">学习目标</option>
              <option value="projects">项目质量</option>
              <option value="careers">职业成果</option>
              <option value="comparison">教师对比</option>
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
          <div className="outcomes-overview">
            <div className="metrics-grid">
              <div className="metric-card">
                <h3 className="metric-title">整体表现</h3>
                <div className="metric-content">
                  <div className="primary-metric">
                    <span className="metric-value">{outcomesData.overall.avgCompetencyGain}%</span>
                    <span className="metric-label">平均能力提升</span>
                  </div>
                  <div className="secondary-metrics">
                    <div className="secondary-item">
                      <span className="secondary-label">技能发展率</span>
                      <span className="secondary-value">{outcomesData.overall.skillDevelopmentRate}%</span>
                    </div>
                    <div className="secondary-item">
                      <span className="secondary-label">目标达成率</span>
                      <span className="secondary-value">{outcomesData.overall.learningObjectiveAchievement}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <h3 className="metric-title">学生满意度</h3>
                <div className="metric-content">
                  <div className="primary-metric">
                    <span className="metric-value">{outcomesData.overall.studentSatisfaction}/5.0</span>
                    <span className="metric-label">综合评分</span>
                  </div>
                  <div className="satisfaction-details">
                    <div className="satisfaction-item">
                      <span className="satisfaction-label">总学生数</span>
                      <span className="satisfaction-value">{outcomesData.overall.totalStudents}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <h3 className="metric-title">学术成果</h3>
                <div className="metric-content">
                  <div className="research-metrics">
                    <div className="research-item">
                      <span className="research-label">研究论文</span>
                      <span className="research-value">{outcomesData.overall.researchPublications} 篇</span>
                    </div>
                    <div className="research-item">
                      <span className="research-label">创新项目</span>
                      <span className="research-value">{outcomesData.overall.innovationProjects} 个</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <h3 className="metric-title">就业成果</h3>
                <div className="metric-content">
                  <div className="primary-metric">
                    <span className="metric-value">{outcomesData.overall.careerPlacement}%</span>
                    <span className="metric-label">就业/升学率</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'competency' && (
          <div className="competency-tracking">
            <h3 className="section-title">核心能力发展追踪</h3>
            <div className="competency-grid">
              {outcomesData.competencyTracking.map((competency, index) => (
                <div key={index} className="competency-card">
                  <div className="competency-header">
                    <h4 className="competency-name">{competency.competency}</h4>
                    <div className="competency-status">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(competency.status) }}
                      >
                        {getStatusLabel(competency.status)}
                      </span>
                    </div>
                  </div>
                  <div className="competency-progress">
                    <div className="progress-metrics">
                      <div className="progress-item">
                        <span className="progress-label">基线</span>
                        <span className="progress-value baseline">{competency.baseline}</span>
                      </div>
                      <div className="progress-item">
                        <span className="progress-label">当前</span>
                        <span className="progress-value current">{competency.current}</span>
                      </div>
                      <div className="progress-item">
                        <span className="progress-label">目标</span>
                        <span className="progress-value target">{competency.target}</span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{
                          width: `${(competency.current / 5) * 100}%`,
                          backgroundColor: getStatusColor(competency.status)
                        }}
                      ></div>
                      <div 
                        className="target-line" 
                        style={{ left: `${(competency.target / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="competency-gain">
                      <span className="gain-label">提升幅度</span>
                      <span className="gain-value">+{competency.gain}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'objectives' && (
          <div className="learning-objectives">
            <h3 className="section-title">学习目标达成情况</h3>
            <div className="objectives-list">
              {outcomesData.learningObjectives.map((objective, index) => (
                <div key={index} className="objective-card">
                  <div className="objective-header">
                    <div className="objective-info">
                      <h4 className="objective-name">{objective.objective}</h4>
                      <span className="objective-timeframe">{objective.timeframe}</span>
                    </div>
                    <div className="objective-achievement">
                      <span className="achievement-rate">{objective.achievementRate}%</span>
                      <span className="achievement-count">
                        {objective.studentsAchieved}/{objective.totalStudents} 学生达成
                      </span>
                    </div>
                  </div>
                  <div className="objective-progress">
                    <div className="progress-bar-container">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${objective.achievementRate}%` }}
                        ></div>
                      </div>
                      <div className="difficulty-indicator">
                        <span className={`difficulty-badge ${objective.difficulty}`}>
                          {objective.difficulty === 'high' ? '高难度' : 
                           objective.difficulty === 'medium' ? '中等难度' : '基础'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'projects' && (
          <div className="project-quality">
            <h3 className="section-title">学生项目质量分析</h3>
            <div className="quality-grid">
              {outcomesData.projectQuality.map((category, index) => (
                <div key={index} className="quality-card">
                  <div className="quality-header">
                    <h4 className="quality-category">{category.category}</h4>
                    <div className="quality-trend">
                      <span className="trend-icon">{getTrendIcon(category.trend)}</span>
                      <span className="trend-label">{category.trend === 'improving' ? '改善' : 
                                                     category.trend === 'declining' ? '下降' : '稳定'}</span>
                    </div>
                  </div>
                  <div className="quality-score">
                    <span className="score-value">{category.avgScore}/5.0</span>
                    <span className="score-label">平均得分</span>
                  </div>
                  <div className="quality-distribution">
                    <div className="distribution-bars">
                      <div className="distribution-item">
                        <span className="distribution-label">优秀</span>
                        <div className="distribution-bar">
                          <div 
                            className="distribution-fill excellent" 
                            style={{ width: `${(category.distribution.excellent / 142) * 100}%` }}
                          ></div>
                        </div>
                        <span className="distribution-count">{category.distribution.excellent}</span>
                      </div>
                      <div className="distribution-item">
                        <span className="distribution-label">良好</span>
                        <div className="distribution-bar">
                          <div 
                            className="distribution-fill good" 
                            style={{ width: `${(category.distribution.good / 142) * 100}%` }}
                          ></div>
                        </div>
                        <span className="distribution-count">{category.distribution.good}</span>
                      </div>
                      <div className="distribution-item">
                        <span className="distribution-label">一般</span>
                        <div className="distribution-bar">
                          <div 
                            className="distribution-fill average" 
                            style={{ width: `${(category.distribution.average / 142) * 100}%` }}
                          ></div>
                        </div>
                        <span className="distribution-count">{category.distribution.average}</span>
                      </div>
                      <div className="distribution-item">
                        <span className="distribution-label">较差</span>
                        <div className="distribution-bar">
                          <div 
                            className="distribution-fill poor" 
                            style={{ width: `${(category.distribution.poor / 142) * 100}%` }}
                          ></div>
                        </div>
                        <span className="distribution-count">{category.distribution.poor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'careers' && (
          <div className="career-outcomes">
            <h3 className="section-title">学生职业发展成果</h3>
            <div className="career-grid">
              <div className="career-card">
                <h4 className="career-title">继续深造</h4>
                <div className="career-percentage">{outcomesData.careerOutcomes.continuedEducation.percentage}%</div>
                <div className="career-breakdown">
                  <div className="breakdown-item">
                    <span className="breakdown-label">国内研究生</span>
                    <span className="breakdown-value">{outcomesData.careerOutcomes.continuedEducation.domesticGraduate}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">海外深造</span>
                    <span className="breakdown-value">{outcomesData.careerOutcomes.continuedEducation.internationalGraduate}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">科研院所</span>
                    <span className="breakdown-value">{outcomesData.careerOutcomes.continuedEducation.researchInstitute}</span>
                  </div>
                </div>
              </div>

              <div className="career-card">
                <h4 className="career-title">直接就业</h4>
                <div className="career-percentage">{outcomesData.careerOutcomes.employment.percentage}%</div>
                <div className="career-breakdown">
                  <div className="breakdown-item">
                    <span className="breakdown-label">科技企业</span>
                    <span className="breakdown-value">{outcomesData.careerOutcomes.employment.techIndustry}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">学术机构</span>
                    <span className="breakdown-value">{outcomesData.careerOutcomes.employment.academicPositions}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">政府部门</span>
                    <span className="breakdown-value">{outcomesData.careerOutcomes.employment.government}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">创业</span>
                    <span className="breakdown-value">{outcomesData.careerOutcomes.employment.entrepreneurship}</span>
                  </div>
                </div>
              </div>

              <div className="career-card">
                <h4 className="career-title">其他选择</h4>
                <div className="career-percentage">{outcomesData.careerOutcomes.other.percentage}%</div>
                <div className="career-breakdown">
                  <div className="breakdown-item">
                    <span className="breakdown-label">间隔年</span>
                    <span className="breakdown-value">{outcomesData.careerOutcomes.other.gapYear}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">待定</span>
                    <span className="breakdown-value">{outcomesData.careerOutcomes.other.undecided}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'comparison' && (
          <div className="professor-comparison">
            <h3 className="section-title">不同教师指导成效对比</h3>
            <div className="comparison-table">
              <table className="outcomes-table">
                <thead>
                  <tr>
                    <th>指导教师</th>
                    <th>学生数量</th>
                    <th>平均能力提升</th>
                    <th>满意度评分</th>
                    <th>论文发表率</th>
                    <th>就业/升学率</th>
                    <th>综合排名</th>
                  </tr>
                </thead>
                <tbody>
                  {outcomesData.professorComparison
                    .sort((a, b) => 
                      (b.avgCompetencyGain + b.satisfactionScore * 20 + b.publicationRate + b.careerPlacement) -
                      (a.avgCompetencyGain + a.satisfactionScore * 20 + a.publicationRate + a.careerPlacement)
                    )
                    .map((prof, index) => (
                    <tr key={index} className={index < 3 ? 'top-performer' : ''}>
                      <td className="professor-name">{prof.professor}</td>
                      <td className="student-count">{prof.students}</td>
                      <td className="competency-gain">{prof.avgCompetencyGain}%</td>
                      <td className="satisfaction-score">{prof.satisfactionScore}/5.0</td>
                      <td className="publication-rate">{prof.publicationRate}%</td>
                      <td className="career-placement">{prof.careerPlacement}%</td>
                      <td className="ranking">#{index + 1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
  )
}

export default StudentOutcomes