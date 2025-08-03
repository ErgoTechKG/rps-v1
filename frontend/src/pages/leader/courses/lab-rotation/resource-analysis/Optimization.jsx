import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Optimization.css'

const Optimization = () => {
  const { courseId } = useParams()
  const [optimizationData, setOptimizationData] = useState({
    aiRecommendations: [
      {
        id: 1,
        category: 'faculty',
        title: '教师资源配置优化',
        description: '基于工作量分析，建议调整教师资源分配以提高整体效率',
        impact: '高',
        effort: '中',
        priority: 'high',
        timeline: '1-2个月',
        expectedBenefit: '提升15%的教学效率',
        details: [
          '将过载教师的2名学生转移给工作量较轻的教师',
          '增加助教支持降低教师工作压力',
          '优化课程时间安排避免冲突'
        ],
        metrics: {
          currentEfficiency: 87.5,
          projectedEfficiency: 95.2,
          riskLevel: 'low'
        }
      },
      {
        id: 2,
        category: 'facilities',
        title: '实验室利用率提升',
        description: '通过智能调度系统优化实验室使用时间，减少空置率',
        impact: '高',
        effort: '高',
        priority: 'medium',
        timeline: '2-3个月',
        expectedBenefit: '提升20%的设施利用率',
        details: [
          '实施动态调度系统，根据需求实时分配实验室',
          '延长低使用率实验室的开放时间',
          '建立实验室共享机制'
        ],
        metrics: {
          currentUtilization: 82.3,
          projectedUtilization: 94.8,
          riskLevel: 'medium'
        }
      },
      {
        id: 3,
        category: 'budget',
        title: '预算分配优化',
        description: '重新分配预算资源，提高投资回报率和成本效益',
        impact: '中',
        effort: '低',
        priority: 'high',
        timeline: '1个月',
        expectedBenefit: '节省8%的运营成本',
        details: [
          '减少管理费用支出，转移至教学设备采购',
          '整合供应商降低采购成本',
          '实施成本监控系统'
        ],
        metrics: {
          currentCostEfficiency: 87.2,
          projectedCostEfficiency: 94.5,
          riskLevel: 'low'
        }
      }
    ],
    bottlenecks: [
      {
        area: '设备预约系统',
        severity: 'high',
        impact: '严重影响实验安排',
        cause: '现有系统容量不足，缺乏智能调度',
        solution: '升级预约系统，增加AI调度功能',
        timeline: '6-8周',
        cost: '低成本'
      },
      {
        area: '教师工作量不均',
        severity: 'medium',
        impact: '影响教学质量和教师满意度',
        cause: '缺乏动态调整机制',
        solution: '建立工作量平衡算法',
        timeline: '4-6周',
        cost: '中等成本'
      },
      {
        area: '学生-导师匹配',
        severity: 'medium',
        impact: '影响学习效果',
        cause: '匹配算法过于简单',
        solution: '引入多维度匹配算法',
        timeline: '8-10周',
        cost: '中等成本'
      }
    ],
    scenarios: [
      {
        name: '保守优化方案',
        description: '风险最小化，稳步提升',
        timeline: '3-6个月',
        cost: '低',
        expectedROI: '8-12%',
        changes: [
          '优化现有资源配置',
          '小幅调整预算分配',
          '改进流程管理'
        ],
        risks: ['变化阻力', '效果有限'],
        benefits: ['风险低', '容易实施', '稳定改进']
      },
      {
        name: '平衡优化方案',
        description: '平衡投入与回报，中等风险',
        timeline: '6-9个月',
        cost: '中',
        expectedROI: '15-25%',
        changes: [
          '引入新技术系统',
          '重组部分流程',
          '增加设备投资'
        ],
        risks: ['技术风险', '实施复杂'],
        benefits: ['显著改进', '长期收益', '竞争优势']
      },
      {
        name: '激进优化方案',
        description: '大幅改革，最大化收益',
        timeline: '9-12个月',
        cost: '高',
        expectedROI: '25-40%',
        changes: [
          '全面数字化转型',
          '重构组织架构',
          '大规模技术投资'
        ],
        risks: ['高投资风险', '变革阻力', '不确定性'],
        benefits: ['革命性改进', '行业领先', '长期竞争力']
      }
    ],
    benchmarking: {
      currentPosition: {
        efficiency: 87.5,
        satisfaction: 4.7,
        costEffectiveness: 87.2,
        innovation: 78.3
      },
      industryBenchmarks: {
        topQuartile: { efficiency: 95, satisfaction: 4.9, costEffectiveness: 92, innovation: 88 },
        median: { efficiency: 83, satisfaction: 4.3, costEffectiveness: 80, innovation: 72 },
        bottomQuartile: { efficiency: 75, satisfaction: 3.8, costEffectiveness: 70, innovation: 60 }
      },
      gaps: [
        { metric: '教学效率', gap: 7.5, priority: 'high', action: '优化教师配置' },
        { metric: '创新指数', gap: 9.7, priority: 'medium', action: '增加研发投入' },
        { metric: '成本效益', gap: 4.8, priority: 'low', action: '精细化管理' }
      ]
    },
    implementation: {
      phases: [
        {
          phase: 1,
          name: '准备阶段',
          duration: '4周',
          activities: ['需求分析', '资源准备', '团队组建', '风险评估'],
          deliverables: ['实施计划', '资源清单', '风险矩阵'],
          milestones: ['方案确认', '团队就位']
        },
        {
          phase: 2,
          name: '试点实施',
          duration: '8周',
          activities: ['小范围试点', '系统测试', '用户培训', '反馈收集'],
          deliverables: ['试点报告', '系统原型', '培训材料'],
          milestones: ['试点完成', '用户验收']
        },
        {
          phase: 3,
          name: '全面推广',
          duration: '12周',
          activities: ['系统部署', '流程优化', '全员培训', '监控调整'],
          deliverables: ['部署文档', '操作手册', '监控报告'],
          milestones: ['系统上线', '全员培训完成']
        }
      ],
      successMetrics: [
        { metric: '教学效率提升', target: '15%', measurement: '月度评估' },
        { metric: '设施利用率', target: '20%', measurement: '实时监控' },
        { metric: '成本节约', target: '8%', measurement: '季度审计' },
        { metric: '用户满意度', target: '4.8/5.0', measurement: '月度调查' }
      ]
    }
  })

  const [selectedView, setSelectedView] = useState('recommendations')
  const [selectedScenario, setSelectedScenario] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const getImpactColor = (impact) => {
    switch (impact) {
      case '高': return '#F44336'
      case '中': return '#FF9800'
      case '低': return '#4CAF50'
      default: return '#666'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#F44336'
      case 'medium': return '#FF9800'
      case 'low': return '#4CAF50'
      default: return '#666'
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#F44336'
      case 'medium': return '#FF9800'
      case 'low': return '#4CAF50'
      default: return '#666'
    }
  }

  const exportReport = () => {
    const data = {
      courseId,
      optimizationData,
      timestamp: new Date().toISOString()
    }
    console.log('Exporting optimization report:', data)
  }

  return (
    <div className="optimization-container">
      <div className="optimization-header">
        <div className="header-left">
          <h1 className="page-title">战略优化建议</h1>
          <p className="course-info">实验轮转课程 ID: {courseId}</p>
        </div>
        <div className="header-actions">
          <select 
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="view-selector"
          >
            <option value="recommendations">AI推荐</option>
            <option value="bottlenecks">瓶颈分析</option>
            <option value="scenarios">优化方案</option>
            <option value="benchmarking">对标分析</option>
            <option value="implementation">实施计划</option>
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

      {selectedView === 'recommendations' && (
        <div className="ai-recommendations">
          <div className="recommendations-grid">
            {optimizationData.aiRecommendations.map((rec) => (
              <div key={rec.id} className="recommendation-card">
                <div className="recommendation-header">
                  <div className="rec-title-section">
                    <h3 className="rec-title">{rec.title}</h3>
                    <span className={`category-tag ${rec.category}`}>
                      {rec.category === 'faculty' ? '教师' : 
                       rec.category === 'facilities' ? '设施' : '预算'}
                    </span>
                  </div>
                  <div className="rec-priority">
                    <span 
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(rec.priority) }}
                    >
                      {rec.priority === 'high' ? '高优先级' : 
                       rec.priority === 'medium' ? '中优先级' : '低优先级'}
                    </span>
                  </div>
                </div>

                <div className="rec-description">
                  <p>{rec.description}</p>
                </div>

                <div className="rec-metrics">
                  <div className="rec-impact-effort">
                    <div className="impact-item">
                      <span className="metric-label">影响度</span>
                      <span 
                        className="metric-value"
                        style={{ color: getImpactColor(rec.impact) }}
                      >
                        {rec.impact}
                      </span>
                    </div>
                    <div className="effort-item">
                      <span className="metric-label">工作量</span>
                      <span 
                        className="metric-value"
                        style={{ color: getImpactColor(rec.effort) }}
                      >
                        {rec.effort}
                      </span>
                    </div>
                    <div className="timeline-item">
                      <span className="metric-label">时间线</span>
                      <span className="metric-value">{rec.timeline}</span>
                    </div>
                  </div>
                </div>

                <div className="rec-benefits">
                  <div className="benefit-highlight">
                    <span className="benefit-label">预期收益</span>
                    <span className="benefit-value">{rec.expectedBenefit}</span>
                  </div>
                </div>

                <div className="rec-details">
                  <h4 className="details-title">实施要点</h4>
                  <ul className="details-list">
                    {rec.details.map((detail, index) => (
                      <li key={index} className="detail-item">{detail}</li>
                    ))}
                  </ul>
                </div>

                <div className="rec-progress-metrics">
                  <div className="progress-item">
                    <span className="progress-label">当前效率</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill current"
                        style={{ width: `${rec.metrics.currentEfficiency}%` }}
                      ></div>
                    </div>
                    <span className="progress-value">{rec.metrics.currentEfficiency}%</span>
                  </div>
                  <div className="progress-item">
                    <span className="progress-label">预期效率</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill projected"
                        style={{ width: `${rec.metrics.projectedEfficiency}%` }}
                      ></div>
                    </div>
                    <span className="progress-value">{rec.metrics.projectedEfficiency}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'bottlenecks' && (
        <div className="bottlenecks-analysis">
          <h3 className="section-title">瓶颈识别与解决方案</h3>
          <div className="bottlenecks-grid">
            {optimizationData.bottlenecks.map((bottleneck, index) => (
              <div key={index} className="bottleneck-card">
                <div className="bottleneck-header">
                  <h4 className="bottleneck-area">{bottleneck.area}</h4>
                  <span 
                    className="severity-badge"
                    style={{ backgroundColor: getSeverityColor(bottleneck.severity) }}
                  >
                    {bottleneck.severity === 'high' ? '高严重度' : 
                     bottleneck.severity === 'medium' ? '中严重度' : '低严重度'}
                  </span>
                </div>
                
                <div className="bottleneck-impact">
                  <span className="impact-label">影响</span>
                  <p className="impact-text">{bottleneck.impact}</p>
                </div>

                <div className="bottleneck-cause">
                  <span className="cause-label">原因</span>
                  <p className="cause-text">{bottleneck.cause}</p>
                </div>

                <div className="bottleneck-solution">
                  <span className="solution-label">解决方案</span>
                  <p className="solution-text">{bottleneck.solution}</p>
                </div>

                <div className="bottleneck-details">
                  <div className="detail-item">
                    <span className="detail-label">时间线</span>
                    <span className="detail-value">{bottleneck.timeline}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">成本</span>
                    <span className="detail-value">{bottleneck.cost}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'scenarios' && (
        <div className="scenarios-planning">
          <h3 className="section-title">优化方案对比</h3>
          <div className="scenario-selector">
            {optimizationData.scenarios.map((scenario, index) => (
              <button
                key={index}
                className={`scenario-tab ${selectedScenario === index ? 'active' : ''}`}
                onClick={() => setSelectedScenario(index)}
              >
                {scenario.name}
              </button>
            ))}
          </div>

          <div className="scenario-content">
            {optimizationData.scenarios[selectedScenario] && (
              <div className="scenario-details">
                <div className="scenario-overview">
                  <h4 className="scenario-name">{optimizationData.scenarios[selectedScenario].name}</h4>
                  <p className="scenario-description">{optimizationData.scenarios[selectedScenario].description}</p>
                </div>

                <div className="scenario-metrics">
                  <div className="metric-item">
                    <span className="metric-label">时间线</span>
                    <span className="metric-value">{optimizationData.scenarios[selectedScenario].timeline}</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">成本</span>
                    <span className="metric-value">{optimizationData.scenarios[selectedScenario].cost}</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">预期ROI</span>
                    <span className="metric-value roi">{optimizationData.scenarios[selectedScenario].expectedROI}</span>
                  </div>
                </div>

                <div className="scenario-changes">
                  <h5 className="changes-title">主要变化</h5>
                  <ul className="changes-list">
                    {optimizationData.scenarios[selectedScenario].changes.map((change, index) => (
                      <li key={index} className="change-item">{change}</li>
                    ))}
                  </ul>
                </div>

                <div className="scenario-analysis">
                  <div className="risks-section">
                    <h5 className="analysis-title">风险因素</h5>
                    <ul className="analysis-list risks">
                      {optimizationData.scenarios[selectedScenario].risks.map((risk, index) => (
                        <li key={index} className="analysis-item risk">{risk}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="benefits-section">
                    <h5 className="analysis-title">预期收益</h5>
                    <ul className="analysis-list benefits">
                      {optimizationData.scenarios[selectedScenario].benefits.map((benefit, index) => (
                        <li key={index} className="analysis-item benefit">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedView === 'benchmarking' && (
        <div className="benchmarking-analysis">
          <h3 className="section-title">行业对标分析</h3>
          
          <div className="benchmark-overview">
            <div className="current-position">
              <h4 className="position-title">当前表现</h4>
              <div className="position-metrics">
                {Object.entries(optimizationData.benchmarking.currentPosition).map(([key, value]) => (
                  <div key={key} className="position-metric">
                    <span className="position-label">
                      {key === 'efficiency' ? '效率指数' :
                       key === 'satisfaction' ? '满意度' :
                       key === 'costEffectiveness' ? '成本效益' : '创新指数'}
                    </span>
                    <span className="position-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="benchmark-comparison">
            <h4 className="comparison-title">行业对比</h4>
            <div className="comparison-chart">
              {Object.entries(optimizationData.benchmarking.currentPosition).map(([metric, currentValue]) => (
                <div key={metric} className="comparison-metric">
                  <span className="comparison-label">
                    {metric === 'efficiency' ? '效率指数' :
                     metric === 'satisfaction' ? '满意度' :
                     metric === 'costEffectiveness' ? '成本效益' : '创新指数'}
                  </span>
                  <div className="comparison-bars">
                    <div className="comparison-bar">
                      <span className="bar-label">前25%</span>
                      <div className="bar-track">
                        <div 
                          className="bar-fill top-quartile"
                          style={{ width: `${optimizationData.benchmarking.industryBenchmarks.topQuartile[metric]}%` }}
                        ></div>
                      </div>
                      <span className="bar-value">{optimizationData.benchmarking.industryBenchmarks.topQuartile[metric]}</span>
                    </div>
                    <div className="comparison-bar">
                      <span className="bar-label">当前</span>
                      <div className="bar-track">
                        <div 
                          className="bar-fill current"
                          style={{ width: `${currentValue}%` }}
                        ></div>
                      </div>
                      <span className="bar-value">{currentValue}</span>
                    </div>
                    <div className="comparison-bar">
                      <span className="bar-label">中位数</span>
                      <div className="bar-track">
                        <div 
                          className="bar-fill median"
                          style={{ width: `${optimizationData.benchmarking.industryBenchmarks.median[metric]}%` }}
                        ></div>
                      </div>
                      <span className="bar-value">{optimizationData.benchmarking.industryBenchmarks.median[metric]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="improvement-gaps">
            <h4 className="gaps-title">改进空间</h4>
            <div className="gaps-list">
              {optimizationData.benchmarking.gaps.map((gap, index) => (
                <div key={index} className="gap-item">
                  <div className="gap-header">
                    <span className="gap-metric">{gap.metric}</span>
                    <span 
                      className="gap-priority"
                      style={{ backgroundColor: getPriorityColor(gap.priority) }}
                    >
                      {gap.priority === 'high' ? '高优先级' : 
                       gap.priority === 'medium' ? '中优先级' : '低优先级'}
                    </span>
                  </div>
                  <div className="gap-details">
                    <span className="gap-value">差距: {gap.gap}分</span>
                    <span className="gap-action">建议行动: {gap.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedView === 'implementation' && (
        <div className="implementation-plan">
          <h3 className="section-title">实施计划</h3>
          
          <div className="implementation-phases">
            <h4 className="phases-title">实施阶段</h4>
            <div className="phases-timeline">
              {optimizationData.implementation.phases.map((phase, index) => (
                <div key={index} className="phase-item">
                  <div className="phase-header">
                    <span className="phase-number">阶段 {phase.phase}</span>
                    <h5 className="phase-name">{phase.name}</h5>
                    <span className="phase-duration">{phase.duration}</span>
                  </div>
                  
                  <div className="phase-content">
                    <div className="phase-activities">
                      <h6 className="content-title">主要活动</h6>
                      <ul className="content-list">
                        {phase.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="content-item">{activity}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="phase-deliverables">
                      <h6 className="content-title">交付成果</h6>
                      <ul className="content-list">
                        {phase.deliverables.map((deliverable, delIndex) => (
                          <li key={delIndex} className="content-item">{deliverable}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="phase-milestones">
                      <h6 className="content-title">关键里程碑</h6>
                      <div className="milestones-list">
                        {phase.milestones.map((milestone, milIndex) => (
                          <span key={milIndex} className="milestone-tag">{milestone}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="success-metrics">
            <h4 className="metrics-title">成功指标</h4>
            <div className="metrics-grid">
              {optimizationData.implementation.successMetrics.map((metric, index) => (
                <div key={index} className="success-metric">
                  <div className="metric-header">
                    <span className="metric-name">{metric.metric}</span>
                    <span className="metric-target">{metric.target}</span>
                  </div>
                  <div className="metric-measurement">
                    <span className="measurement-label">测量方式</span>
                    <span className="measurement-value">{metric.measurement}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Optimization