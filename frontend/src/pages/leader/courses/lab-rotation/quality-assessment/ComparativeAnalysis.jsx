import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './ComparativeAnalysis.css'

const ComparativeAnalysis = () => {
  const { courseId } = useParams()
  const [analysisData, setAnalysisData] = useState({
    benchmarkComparison: {
      currentProgram: {
        name: '本校实验轮转课程',
        overallScore: 4.6,
        students: 142,
        satisfaction: 89.1,
        placement: 94.3,
        innovation: 4.2,
        ranking: 'A+'
      },
      peerPrograms: [
        {
          name: '清华大学生物医学工程',
          overallScore: 4.8,
          students: 156,
          satisfaction: 92.4,
          placement: 96.8,
          innovation: 4.5,
          ranking: 'A+',
          type: 'peer'
        },
        {
          name: '北京大学实验医学',
          overallScore: 4.7,
          students: 134,
          satisfaction: 90.6,
          placement: 95.2,
          innovation: 4.3,
          ranking: 'A+',
          type: 'peer'
        },
        {
          name: '复旦大学生物技术',
          overallScore: 4.5,
          students: 148,
          satisfaction: 87.3,
          placement: 93.1,
          innovation: 4.1,
          ranking: 'A',
          type: 'peer'
        },
        {
          name: '浙江大学生物工程',
          overallScore: 4.4,
          students: 162,
          satisfaction: 85.7,
          placement: 91.4,
          innovation: 3.9,
          ranking: 'A',
          type: 'peer'
        },
        {
          name: '上海交大生物医学',
          overallScore: 4.6,
          students: 139,
          satisfaction: 88.9,
          placement: 94.0,
          innovation: 4.2,
          ranking: 'A+',
          type: 'peer'
        }
      ]
    },
    internationalBenchmarks: [
      {
        name: 'MIT Biological Engineering',
        country: '美国',
        overallScore: 4.9,
        satisfaction: 95.2,
        placement: 98.4,
        innovation: 4.8,
        globalRanking: 1,
        type: 'international'
      },
      {
        name: 'Stanford Bioengineering',
        country: '美国',
        overallScore: 4.8,
        satisfaction: 94.1,
        placement: 97.8,
        innovation: 4.7,
        globalRanking: 2,
        type: 'international'
      },
      {
        name: 'Cambridge Natural Sciences',
        country: '英国',
        overallScore: 4.7,
        satisfaction: 91.8,
        placement: 96.5,
        innovation: 4.5,
        globalRanking: 3,
        type: 'international'
      },
      {
        name: 'ETH Zurich Biotechnology',
        country: '瑞士',
        overallScore: 4.6,
        satisfaction: 89.4,
        placement: 95.1,
        innovation: 4.4,
        globalRanking: 5,
        type: 'international'
      }
    ],
    trendAnalysis: {
      currentTrends: [
        {
          metric: '学生满意度',
          currentYear: 89.1,
          lastYear: 86.8,
          twoYearsAgo: 84.2,
          trend: 'improving',
          rate: 5.8
        },
        {
          metric: '就业率',
          currentYear: 94.3,
          lastYear: 93.1,
          twoYearsAgo: 91.7,
          trend: 'improving',
          rate: 2.8
        },
        {
          metric: '创新指数',
          currentYear: 4.2,
          lastYear: 4.0,
          twoYearsAgo: 3.8,
          trend: 'improving',
          rate: 10.5
        },
        {
          metric: '国际排名',
          currentYear: 15,
          lastYear: 18,
          twoYearsAgo: 22,
          trend: 'improving',
          rate: 31.8
        }
      ],
      projections: [
        {
          metric: '预期满意度',
          nextYear: 91.2,
          confidence: 85.4
        },
        {
          metric: '预期就业率',
          nextYear: 95.8,
          confidence: 78.9
        },
        {
          metric: '预期创新指数',
          nextYear: 4.4,
          confidence: 72.1
        }
      ]
    },
    bestPractices: [
      {
        institution: 'MIT',
        practice: '导师制度',
        description: '一对一导师指导，每周定期会面',
        impact: '学生满意度提升12%',
        adoptability: 'high',
        cost: 'medium'
      },
      {
        institution: 'Stanford',
        practice: '跨学科项目',
        description: '鼓励不同专业学生合作项目',
        impact: '创新能力提升18%',
        adoptability: 'medium',
        cost: 'low'
      },
      {
        institution: '清华大学',
        practice: '企业合作',
        description: '与顶级企业建立实习基地',
        impact: '就业率提升8%',
        adoptability: 'high',
        cost: 'high'
      },
      {
        institution: 'Cambridge',
        practice: '研究导向',
        description: '强调原创性研究和论文发表',
        impact: '学术声誉提升25%',
        adoptability: 'medium',
        cost: 'medium'
      }
    ],
    competitivePosition: {
      strengths: [
        '师资力量雄厚',
        '实验设施先进',
        '产学研结合紧密',
        '学生综合素质高'
      ],
      weaknesses: [
        '国际化程度有待提高',
        '创新项目数量不足',
        '与企业合作深度不够',
        '学生交流机会偏少'
      ],
      opportunities: [
        '国家政策支持力度加大',
        '生物技术产业快速发展',
        '国际合作机会增多',
        '新兴技术应用前景广阔'
      ],
      threats: [
        '国际名校竞争激烈',
        '优秀师资流失风险',
        '教育经费投入不足',
        '行业标准快速变化'
      ]
    }
  })

  const [selectedComparison, setSelectedComparison] = useState('domestic')
  const [selectedMetric, setSelectedMetric] = useState('overall')
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const getRankingColor = (ranking) => {
    switch (ranking) {
      case 'A+': return '#4CAF50'
      case 'A': return '#2196F3'
      case 'B+': return '#FF9800'
      case 'B': return '#FF5722'
      default: return '#666'
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

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'improving': return '#4CAF50'
      case 'declining': return '#F44336'
      case 'stable': return '#FF9800'
      default: return '#666'
    }
  }

  const getAdoptabilityColor = (adoptability) => {
    switch (adoptability) {
      case 'high': return '#4CAF50'
      case 'medium': return '#FF9800'
      case 'low': return '#F44336'
      default: return '#666'
    }
  }

  const exportAnalysis = () => {
    const data = {
      courseId,
      analysisData,
      timestamp: new Date().toISOString()
    }
    console.log('Exporting comparative analysis:', data)
  }

  return (
    <Layout>
      <div className="comparative-analysis-container">
        <div className="analysis-header">
          <div className="header-left">
            <h1 className="page-title">质量对比分析</h1>
            <p className="course-info">实验轮转课程 ID: {courseId}</p>
          </div>
          <div className="header-actions">
            <select 
              value={selectedComparison}
              onChange={(e) => setSelectedComparison(e.target.value)}
              className="comparison-selector"
            >
              <option value="domestic">国内对比</option>
              <option value="international">国际对比</option>
              <option value="trends">趋势分析</option>
              <option value="practices">最佳实践</option>
              <option value="position">竞争态势</option>
            </select>
            <select 
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="metric-selector"
            >
              <option value="overall">综合评分</option>
              <option value="satisfaction">满意度</option>
              <option value="placement">就业率</option>
              <option value="innovation">创新指数</option>
            </select>
            <button 
              onClick={handleRefresh}
              className={`refresh-button ${refreshing ? 'refreshing' : ''}`}
              disabled={refreshing}
            >
              {refreshing ? '更新中...' : '刷新数据'}
            </button>
            <button onClick={exportAnalysis} className="export-button">
              导出分析
            </button>
          </div>
        </div>

        {selectedComparison === 'domestic' && (
          <div className="domestic-comparison">
            <h3 className="section-title">国内同类院校对比分析</h3>
            
            <div className="current-position">
              <div className="position-card highlight">
                <div className="position-header">
                  <h4 className="position-title">{analysisData.benchmarkComparison.currentProgram.name}</h4>
                  <div className="position-ranking">
                    <span 
                      className="ranking-badge"
                      style={{ backgroundColor: getRankingColor(analysisData.benchmarkComparison.currentProgram.ranking) }}
                    >
                      {analysisData.benchmarkComparison.currentProgram.ranking}
                    </span>
                  </div>
                </div>
                <div className="position-metrics">
                  <div className="metric-item">
                    <span className="metric-label">综合评分</span>
                    <span className="metric-value">{analysisData.benchmarkComparison.currentProgram.overallScore}/5.0</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">学生满意度</span>
                    <span className="metric-value">{analysisData.benchmarkComparison.currentProgram.satisfaction}%</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">就业/升学率</span>
                    <span className="metric-value">{analysisData.benchmarkComparison.currentProgram.placement}%</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">创新指数</span>
                    <span className="metric-value">{analysisData.benchmarkComparison.currentProgram.innovation}/5.0</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="comparison-table">
              <table className="benchmark-table">
                <thead>
                  <tr>
                    <th>院校名称</th>
                    <th>综合评分</th>
                    <th>学生规模</th>
                    <th>满意度</th>
                    <th>就业/升学率</th>
                    <th>创新指数</th>
                    <th>等级排名</th>
                    <th>差距分析</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisData.benchmarkComparison.peerPrograms.map((program, index) => {
                    const scoreDiff = program.overallScore - analysisData.benchmarkComparison.currentProgram.overallScore
                    return (
                      <tr key={index}>
                        <td className="program-name">{program.name}</td>
                        <td className="overall-score">{program.overallScore}/5.0</td>
                        <td className="student-count">{program.students}</td>
                        <td className="satisfaction">{program.satisfaction}%</td>
                        <td className="placement">{program.placement}%</td>
                        <td className="innovation">{program.innovation}/5.0</td>
                        <td className="ranking">
                          <span 
                            className="ranking-badge small"
                            style={{ backgroundColor: getRankingColor(program.ranking) }}
                          >
                            {program.ranking}
                          </span>
                        </td>
                        <td className={`score-diff ${scoreDiff > 0 ? 'negative' : scoreDiff < 0 ? 'positive' : 'neutral'}`}>
                          {scoreDiff > 0 ? `+${scoreDiff.toFixed(1)}` : scoreDiff < 0 ? scoreDiff.toFixed(1) : '0.0'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedComparison === 'international' && (
          <div className="international-comparison">
            <h3 className="section-title">国际一流院校对比分析</h3>
            <div className="international-grid">
              {analysisData.internationalBenchmarks.map((program, index) => (
                <div key={index} className="international-card">
                  <div className="international-header">
                    <h4 className="international-name">{program.name}</h4>
                    <div className="international-country">{program.country}</div>
                    <div className="global-ranking">世界排名 #{program.globalRanking}</div>
                  </div>
                  <div className="international-metrics">
                    <div className="international-metric">
                      <span className="metric-label">综合评分</span>
                      <span className="metric-value">{program.overallScore}/5.0</span>
                    </div>
                    <div className="international-metric">
                      <span className="metric-label">满意度</span>
                      <span className="metric-value">{program.satisfaction}%</span>
                    </div>
                    <div className="international-metric">
                      <span className="metric-label">就业率</span>
                      <span className="metric-value">{program.placement}%</span>
                    </div>
                    <div className="international-metric">
                      <span className="metric-label">创新指数</span>
                      <span className="metric-value">{program.innovation}/5.0</span>
                    </div>
                  </div>
                  <div className="gap-analysis">
                    <span className="gap-label">与本校差距:</span>
                    <span className="gap-value">
                      {(program.overallScore - analysisData.benchmarkComparison.currentProgram.overallScore).toFixed(1)} 分
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedComparison === 'trends' && (
          <div className="trend-analysis">
            <h3 className="section-title">发展趋势分析</h3>
            
            <div className="trends-section">
              <h4 className="subsection-title">历史发展趋势</h4>
              <div className="trends-grid">
                {analysisData.trendAnalysis.currentTrends.map((trend, index) => (
                  <div key={index} className="trend-card">
                    <div className="trend-header">
                      <h5 className="trend-metric">{trend.metric}</h5>
                      <div className="trend-indicator">
                        <span 
                          className="trend-icon"
                          style={{ color: getTrendColor(trend.trend) }}
                        >
                          {getTrendIcon(trend.trend)}
                        </span>
                        <span className="trend-rate">+{trend.rate}%</span>
                      </div>
                    </div>
                    <div className="trend-data">
                      <div className="trend-values">
                        <div className="value-item">
                          <span className="value-label">两年前</span>
                          <span className="value-number">{trend.twoYearsAgo}</span>
                        </div>
                        <div className="value-item">
                          <span className="value-label">去年</span>
                          <span className="value-number">{trend.lastYear}</span>
                        </div>
                        <div className="value-item current">
                          <span className="value-label">今年</span>
                          <span className="value-number">{trend.currentYear}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="projections-section">
              <h4 className="subsection-title">未来发展预测</h4>
              <div className="projections-grid">
                {analysisData.trendAnalysis.projections.map((projection, index) => (
                  <div key={index} className="projection-card">
                    <h5 className="projection-metric">{projection.metric}</h5>
                    <div className="projection-value">{projection.nextYear}</div>
                    <div className="confidence-level">
                      <span className="confidence-label">置信度</span>
                      <span className="confidence-value">{projection.confidence}%</span>
                      <div className="confidence-bar">
                        <div 
                          className="confidence-fill" 
                          style={{ width: `${projection.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedComparison === 'practices' && (
          <div className="best-practices">
            <h3 className="section-title">最佳实践借鉴</h3>
            <div className="practices-grid">
              {analysisData.bestPractices.map((practice, index) => (
                <div key={index} className="practice-card">
                  <div className="practice-header">
                    <h4 className="practice-title">{practice.practice}</h4>
                    <div className="practice-institution">{practice.institution}</div>
                  </div>
                  <div className="practice-content">
                    <p className="practice-description">{practice.description}</p>
                    <div className="practice-impact">
                      <span className="impact-label">效果:</span>
                      <span className="impact-value">{practice.impact}</span>
                    </div>
                  </div>
                  <div className="practice-assessment">
                    <div className="assessment-item">
                      <span className="assessment-label">可采纳性</span>
                      <span 
                        className="assessment-value"
                        style={{ color: getAdoptabilityColor(practice.adoptability) }}
                      >
                        {practice.adoptability === 'high' ? '高' : 
                         practice.adoptability === 'medium' ? '中' : '低'}
                      </span>
                    </div>
                    <div className="assessment-item">
                      <span className="assessment-label">实施成本</span>
                      <span className="assessment-value">
                        {practice.cost === 'high' ? '高' : 
                         practice.cost === 'medium' ? '中' : '低'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedComparison === 'position' && (
          <div className="competitive-position">
            <h3 className="section-title">竞争态势分析 (SWOT)</h3>
            <div className="swot-grid">
              <div className="swot-card strengths">
                <h4 className="swot-title">优势 (Strengths)</h4>
                <ul className="swot-list">
                  {analysisData.competitivePosition.strengths.map((strength, index) => (
                    <li key={index} className="swot-item">{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div className="swot-card weaknesses">
                <h4 className="swot-title">劣势 (Weaknesses)</h4>
                <ul className="swot-list">
                  {analysisData.competitivePosition.weaknesses.map((weakness, index) => (
                    <li key={index} className="swot-item">{weakness}</li>
                  ))}
                </ul>
              </div>
              
              <div className="swot-card opportunities">
                <h4 className="swot-title">机会 (Opportunities)</h4>
                <ul className="swot-list">
                  {analysisData.competitivePosition.opportunities.map((opportunity, index) => (
                    <li key={index} className="swot-item">{opportunity}</li>
                  ))}
                </ul>
              </div>
              
              <div className="swot-card threats">
                <h4 className="swot-title">威胁 (Threats)</h4>
                <ul className="swot-list">
                  {analysisData.competitivePosition.threats.map((threat, index) => (
                    <li key={index} className="swot-item">{threat}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default ComparativeAnalysis