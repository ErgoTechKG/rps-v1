import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './LabUtilization.css'

const LabUtilization = () => {
  const { courseId } = useParams()
  const [utilizationData, setUtilizationData] = useState({
    overall: {
      totalLabs: 12,
      activeLabs: 10,
      avgUtilization: 82.3,
      peakUtilization: 95.2,
      offPeakUtilization: 68.7,
      availabilityRate: 96.8
    },
    labs: [
      { 
        name: '生物实验室A', 
        utilization: 95, 
        capacity: 20, 
        currentOccupancy: 19, 
        equipment: ['显微镜', '离心机', '培养箱'], 
        status: 'high',
        safety: 98,
        maintenance: '良好'
      },
      { 
        name: '化学实验室B', 
        utilization: 78, 
        capacity: 16, 
        currentOccupancy: 12, 
        equipment: ['分析天平', '通风橱', '反应釜'], 
        status: 'normal',
        safety: 100,
        maintenance: '优秀'
      },
      { 
        name: '物理实验室C', 
        utilization: 65, 
        capacity: 18, 
        currentOccupancy: 11, 
        equipment: ['激光器', '示波器', '光谱仪'], 
        status: 'low',
        safety: 96,
        maintenance: '良好'
      },
      { 
        name: '计算机实验室D', 
        utilization: 88, 
        capacity: 30, 
        currentOccupancy: 26, 
        equipment: ['高性能工作站', '服务器', '网络设备'], 
        status: 'high',
        safety: 99,
        maintenance: '优秀'
      },
      { 
        name: '材料实验室E', 
        utilization: 72, 
        capacity: 12, 
        currentOccupancy: 8, 
        equipment: ['电子扫描显微镜', 'X射线衍射仪', '热分析仪'], 
        status: 'normal',
        safety: 97,
        maintenance: '良好'
      },
      { 
        name: '生物安全实验室F', 
        utilization: 45, 
        capacity: 8, 
        currentOccupancy: 3, 
        equipment: ['生物安全柜', '高压灭菌器', '废料处理系统'], 
        status: 'underutilized',
        safety: 100,
        maintenance: '优秀'
      }
    ],
    equipment: [
      { name: '显微镜', total: 45, inUse: 38, utilization: 84, maintenance: '良好' },
      { name: '离心机', total: 12, inUse: 10, utilization: 83, maintenance: '优秀' },
      { name: '分析天平', total: 8, inUse: 6, utilization: 75, maintenance: '良好' },
      { name: '光谱仪', total: 6, inUse: 4, utilization: 67, maintenance: '需维护' },
      { name: '高压灭菌器', total: 4, inUse: 2, utilization: 50, maintenance: '优秀' }
    ],
    timePatterns: {
      hourlyUsage: [
        { hour: '8:00', usage: 25 },
        { hour: '9:00', usage: 45 },
        { hour: '10:00', usage: 78 },
        { hour: '11:00', usage: 85 },
        { hour: '12:00', usage: 40 },
        { hour: '13:00', usage: 35 },
        { hour: '14:00', usage: 82 },
        { hour: '15:00', usage: 95 },
        { hour: '16:00', usage: 92 },
        { hour: '17:00', usage: 75 },
        { hour: '18:00', usage: 45 },
        { hour: '19:00', usage: 25 }
      ],
      weeklyTrends: {
        thisWeek: 82.3,
        lastWeek: 79.1,
        change: 3.2
      }
    },
    costs: {
      totalOperating: 125000,
      costPerHour: 85,
      energyCosts: 45000,
      maintenanceCosts: 28000,
      utilizationROI: 87.2
    },
    recommendations: [
      { type: 'efficiency', text: '生物安全实验室F利用率偏低，建议增加实验安排', priority: 'medium' },
      { type: 'maintenance', text: '光谱仪需要进行定期维护检查', priority: 'high' },
      { type: 'optimization', text: '建议在14:00-16:00高峰期增加实验室轮转', priority: 'medium' },
      { type: 'investment', text: '计算机实验室使用率高，可考虑扩容', priority: 'low' }
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

  const getUtilizationColor = (utilization) => {
    if (utilization >= 90) return '#F44336'
    if (utilization >= 80) return '#FF9800'
    if (utilization >= 60) return '#4CAF50'
    if (utilization >= 40) return '#2196F3'
    return '#9C27B0'
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'high': return '高负荷'
      case 'normal': return '正常'
      case 'low': return '低负荷'
      case 'underutilized': return '未充分利用'
      default: return '未知'
    }
  }

  const getMaintenanceColor = (maintenance) => {
    switch (maintenance) {
      case '优秀': return '#4CAF50'
      case '良好': return '#8BC34A'
      case '需维护': return '#FF9800'
      case '紧急': return '#F44336'
      default: return '#666'
    }
  }

  const exportReport = () => {
    const data = {
      courseId,
      utilizationData,
      timestamp: new Date().toISOString()
    }
    console.log('Exporting lab utilization report:', data)
  }

  return (
    <div className="lab-utilization-container">
      <div className="utilization-header">
        <div className="header-left">
          <h1 className="page-title">实验室利用率分析</h1>
          <p className="course-info">实验轮转课程 ID: {courseId}</p>
        </div>
        <div className="header-actions">
          <select 
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="view-selector"
          >
            <option value="overview">总览</option>
            <option value="labs">实验室详情</option>
            <option value="equipment">设备状况</option>
            <option value="patterns">使用模式</option>
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
        <div className="utilization-overview">
          <div className="metrics-grid">
            <div className="metric-card">
              <h3 className="metric-title">整体利用情况</h3>
              <div className="metric-content">
                <div className="primary-metric">
                  <span className="metric-value">{utilizationData.overall.avgUtilization}%</span>
                  <span className="metric-label">平均利用率</span>
                </div>
                <div className="secondary-metrics">
                  <div className="secondary-item">
                    <span className="secondary-label">活跃实验室</span>
                    <span className="secondary-value">{utilizationData.overall.activeLabs}/{utilizationData.overall.totalLabs}</span>
                  </div>
                  <div className="secondary-item">
                    <span className="secondary-label">可用性</span>
                    <span className="secondary-value">{utilizationData.overall.availabilityRate}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <h3 className="metric-title">峰值与非峰值</h3>
              <div className="metric-content">
                <div className="peak-comparison">
                  <div className="peak-item">
                    <span className="peak-label">峰值时段</span>
                    <span className="peak-value peak">{utilizationData.overall.peakUtilization}%</span>
                  </div>
                  <div className="peak-item">
                    <span className="peak-label">非峰值时段</span>
                    <span className="peak-value off-peak">{utilizationData.overall.offPeakUtilization}%</span>
                  </div>
                </div>
                <div className="peak-difference">
                  <span className="difference-label">峰值差异</span>
                  <span className="difference-value">{(utilizationData.overall.peakUtilization - utilizationData.overall.offPeakUtilization).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <h3 className="metric-title">成本效益分析</h3>
              <div className="metric-content">
                <div className="cost-metrics">
                  <div className="cost-item">
                    <span className="cost-label">运营成本</span>
                    <span className="cost-value">¥{utilizationData.costs.totalOperating.toLocaleString()}</span>
                  </div>
                  <div className="cost-item">
                    <span className="cost-label">每小时成本</span>
                    <span className="cost-value">¥{utilizationData.costs.costPerHour}</span>
                  </div>
                  <div className="cost-item">
                    <span className="cost-label">投资回报率</span>
                    <span className="cost-value roi">{utilizationData.costs.utilizationROI}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="metric-card trends-card">
              <h3 className="metric-title">使用趋势</h3>
              <div className="metric-content">
                <div className="trend-comparison">
                  <div className="trend-item">
                    <span className="trend-label">本周</span>
                    <span className="trend-value current">{utilizationData.timePatterns.weeklyTrends.thisWeek}%</span>
                  </div>
                  <div className="trend-item">
                    <span className="trend-label">上周</span>
                    <span className="trend-value previous">{utilizationData.timePatterns.weeklyTrends.lastWeek}%</span>
                  </div>
                </div>
                <div className="trend-change">
                  <span className="change-label">变化</span>
                  <span className={`change-value ${utilizationData.timePatterns.weeklyTrends.change > 0 ? 'positive' : 'negative'}`}>
                    {utilizationData.timePatterns.weeklyTrends.change > 0 ? '+' : ''}{utilizationData.timePatterns.weeklyTrends.change}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'labs' && (
        <div className="labs-detail">
          <div className="labs-grid">
            {utilizationData.labs.map((lab, index) => (
              <div key={index} className="lab-card">
                <div className="lab-header">
                  <h4 className="lab-name">{lab.name}</h4>
                  <div className="lab-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getUtilizationColor(lab.utilization) }}
                    >
                      {getStatusLabel(lab.status)}
                    </span>
                  </div>
                </div>
                <div className="lab-metrics">
                  <div className="lab-utilization">
                    <span className="utilization-label">利用率</span>
                    <div className="utilization-bar">
                      <div 
                        className="utilization-fill" 
                        style={{
                          width: `${lab.utilization}%`,
                          backgroundColor: getUtilizationColor(lab.utilization)
                        }}
                      ></div>
                    </div>
                    <span className="utilization-value">{lab.utilization}%</span>
                  </div>
                  <div className="lab-occupancy">
                    <span className="occupancy-label">当前占用</span>
                    <span className="occupancy-value">{lab.currentOccupancy}/{lab.capacity}</span>
                  </div>
                  <div className="lab-safety">
                    <span className="safety-label">安全评分</span>
                    <span className="safety-value">{lab.safety}/100</span>
                  </div>
                  <div className="lab-maintenance">
                    <span className="maintenance-label">维护状态</span>
                    <span 
                      className="maintenance-value"
                      style={{ color: getMaintenanceColor(lab.maintenance) }}
                    >
                      {lab.maintenance}
                    </span>
                  </div>
                </div>
                <div className="lab-equipment">
                  <span className="equipment-label">主要设备</span>
                  <div className="equipment-list">
                    {lab.equipment.map((eq, eqIndex) => (
                      <span key={eqIndex} className="equipment-tag">{eq}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'equipment' && (
        <div className="equipment-analysis">
          <div className="equipment-table">
            <h3 className="section-title">设备利用率分析</h3>
            <div className="table-container">
              <table className="utilization-table">
                <thead>
                  <tr>
                    <th>设备名称</th>
                    <th>总数量</th>
                    <th>使用中</th>
                    <th>利用率</th>
                    <th>维护状态</th>
                  </tr>
                </thead>
                <tbody>
                  {utilizationData.equipment.map((equipment, index) => (
                    <tr key={index}>
                      <td className="equipment-name">{equipment.name}</td>
                      <td className="equipment-total">{equipment.total}</td>
                      <td className="equipment-inuse">{equipment.inUse}</td>
                      <td className="equipment-utilization">{equipment.utilization}%</td>
                      <td>
                        <span 
                          className="maintenance-status"
                          style={{ color: getMaintenanceColor(equipment.maintenance) }}
                        >
                          {equipment.maintenance}
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

      {selectedView === 'patterns' && (
        <div className="usage-patterns">
          <div className="patterns-chart">
            <h3 className="section-title">每日使用模式</h3>
            <div className="hourly-chart">
              {utilizationData.timePatterns.hourlyUsage.map((hour, index) => (
                <div key={index} className="hour-item">
                  <div className="hour-bar">
                    <div 
                      className="hour-fill" 
                      style={{
                        height: `${hour.usage}%`,
                        backgroundColor: getUtilizationColor(hour.usage)
                      }}
                    ></div>
                  </div>
                  <span className="hour-label">{hour.hour}</span>
                  <span className="hour-value">{hour.usage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="utilization-recommendations">
        <h3 className="section-title">优化建议</h3>
        <div className="recommendations-content">
          {utilizationData.recommendations.map((rec, index) => (
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

export default LabUtilization