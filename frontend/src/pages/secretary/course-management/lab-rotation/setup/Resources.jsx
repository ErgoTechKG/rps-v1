import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './Resources.css'

const Resources = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  
  const [professorPool, setProfessorPool] = useState([
    { id: 1, name: '张教授', department: '计算机科学', available: true, capacity: 3 },
    { id: 2, name: '李教授', department: '生物工程', available: true, capacity: 2 },
    { id: 3, name: '王教授', department: '机械工程', available: false, capacity: 4 },
    { id: 4, name: '刘教授', department: '化学工程', available: true, capacity: 2 }
  ])

  const [labFacilities, setLabFacilities] = useState([
    { id: 1, name: '计算机实验室A', capacity: 30, equipment: '高性能工作站', available: true },
    { id: 2, name: '生物实验室B', capacity: 20, equipment: '显微镜、离心机', available: true },
    { id: 3, name: '机械实验室C', capacity: 15, equipment: '3D打印机、数控机床', available: false },
    { id: 4, name: '化学实验室D', capacity: 25, equipment: '分析仪器、通风橱', available: true }
  ])

  const [budgetAllocations, setBudgetAllocations] = useState({
    totalBudget: '',
    allocations: [
      { category: '教学费用', amount: '', percentage: 40 },
      { category: '实验材料', amount: '', percentage: 30 },
      { category: '设备维护', amount: '', percentage: 15 },
      { category: '差旅费用', amount: '', percentage: 10 },
      { category: '应急基金', amount: '', percentage: 5 }
    ]
  })

  const [externalPartnerships, setExternalPartnerships] = useState([
    { id: 1, name: '华为技术有限公司', type: 'industry', status: 'active', resources: '技术指导、实习机会' },
    { id: 2, name: '清华大学', type: 'academic', status: 'pending', resources: '联合研究、师资交流' },
    { id: 3, name: '上海生物医学研究院', type: 'research', status: 'active', resources: '设备共享、专家讲座' }
  ])

  const [technicalInfrastructure, setTechnicalInfrastructure] = useState({
    servers: { current: 5, required: 8, status: 'insufficient' },
    storage: { current: '10TB', required: '20TB', status: 'sufficient' },
    bandwidth: { current: '1Gbps', required: '1Gbps', status: 'sufficient' },
    software: [
      { name: 'MATLAB', licenses: 50, required: 60, status: 'insufficient' },
      { name: 'AutoCAD', licenses: 30, required: 25, status: 'sufficient' },
      { name: 'LabVIEW', licenses: 15, required: 20, status: 'insufficient' }
    ]
  })

  const [backupRecovery, setBackupRecovery] = useState({
    backupFrequency: 'daily',
    retentionPeriod: '90',
    recoveryTime: '4',
    offSiteBackup: true,
    testingSchedule: 'monthly',
    emergencyContacts: [
      { name: 'IT支持', phone: '123-456-7890', email: 'it-support@university.edu' },
      { name: '系统管理员', phone: '123-456-7891', email: 'sysadmin@university.edu' }
    ]
  })

  const handleProfessorChange = (professorId, field, value) => {
    setProfessorPool(prev => prev.map(prof => 
      prof.id === professorId 
        ? { ...prof, [field]: value }
        : prof
    ))
  }

  const handleLabChange = (labId, field, value) => {
    setLabFacilities(prev => prev.map(lab => 
      lab.id === labId 
        ? { ...lab, [field]: value }
        : lab
    ))
  }

  const handleBudgetChange = (index, field, value) => {
    setBudgetAllocations(prev => {
      const newAllocations = [...prev.allocations]
      newAllocations[index] = { ...newAllocations[index], [field]: value }
      
      // Calculate amount based on percentage if total budget is set
      if (field === 'percentage' && prev.totalBudget) {
        newAllocations[index].amount = (prev.totalBudget * value / 100).toFixed(0)
      }
      
      return { ...prev, allocations: newAllocations }
    })
  }

  const handleTotalBudgetChange = (value) => {
    setBudgetAllocations(prev => {
      const newAllocations = prev.allocations.map(allocation => ({
        ...allocation,
        amount: value ? (value * allocation.percentage / 100).toFixed(0) : ''
      }))
      
      return {
        ...prev,
        totalBudget: value,
        allocations: newAllocations
      }
    })
  }

  const addPartnership = () => {
    const newPartnership = {
      id: Date.now(),
      name: '',
      type: 'industry',
      status: 'pending',
      resources: ''
    }
    setExternalPartnerships(prev => [...prev, newPartnership])
  }

  const removePartnership = (partnershipId) => {
    setExternalPartnerships(prev => prev.filter(p => p.id !== partnershipId))
  }

  const handlePartnershipChange = (partnershipId, field, value) => {
    setExternalPartnerships(prev => prev.map(partnership => 
      partnership.id === partnershipId 
        ? { ...partnership, [field]: value }
        : partnership
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const resourcesData = {
      professorPool,
      labFacilities,
      budgetAllocations,
      externalPartnerships,
      technicalInfrastructure,
      backupRecovery
    }
    
    console.log('Saving resources configuration:', resourcesData)
    // Navigate to completion page or dashboard
    navigate('/secretary/dashboard')
  }

  const handleBack = () => {
    navigate(`/secretary/course-management/lab-rotation/${courseId}/setup/rules`)
  }

  const handleSaveDraft = () => {
    console.log('Saving resources draft')
  }

  return (
    <Layout>
      <div className="resources-container">
        <div className="setup-header">
          <h1 className="page-title">资源与基础设施管理</h1>
          <div className="setup-progress">
            <div className="progress-step completed">基本信息</div>
            <div className="progress-step completed">时间安排</div>
            <div className="progress-step completed">规则政策</div>
            <div className="progress-step active">资源管理</div>
          </div>
        </div>

        <div className="setup-content">
          <div className="setup-card">
            <div className="card-header">
              <h2 className="card-title">资源配置完成</h2>
              <div className="card-actions">
                <button type="button" className="action-button secondary" onClick={handleSaveDraft}>
                  保存草稿
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="setup-form">
              {/* 教授资源池 */}
              <div className="form-section">
                <h3 className="section-title">教授资源池</h3>
                <div className="resource-table">
                  <div className="table-header">
                    <div className="header-cell">姓名</div>
                    <div className="header-cell">院系</div>
                    <div className="header-cell">可用性</div>
                    <div className="header-cell">容量</div>
                  </div>
                  <div className="table-body">
                    {professorPool.map(professor => (
                      <div key={professor.id} className="table-row">
                        <div className="table-cell">{professor.name}</div>
                        <div className="table-cell">{professor.department}</div>
                        <div className="table-cell">
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={professor.available}
                              onChange={(e) => handleProfessorChange(professor.id, 'available', e.target.checked)}
                            />
                            <span className="slider"></span>
                          </label>
                        </div>
                        <div className="table-cell">
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={professor.capacity}
                            onChange={(e) => handleProfessorChange(professor.id, 'capacity', parseInt(e.target.value))}
                            className="form-input capacity-input"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 实验室设施 */}
              <div className="form-section">
                <h3 className="section-title">实验室设施</h3>
                <div className="resource-table">
                  <div className="table-header">
                    <div className="header-cell">实验室名称</div>
                    <div className="header-cell">容量</div>
                    <div className="header-cell">设备</div>
                    <div className="header-cell">状态</div>
                  </div>
                  <div className="table-body">
                    {labFacilities.map(lab => (
                      <div key={lab.id} className="table-row">
                        <div className="table-cell">{lab.name}</div>
                        <div className="table-cell">
                          <input
                            type="number"
                            min="0"
                            value={lab.capacity}
                            onChange={(e) => handleLabChange(lab.id, 'capacity', parseInt(e.target.value))}
                            className="form-input capacity-input"
                          />
                        </div>
                        <div className="table-cell">{lab.equipment}</div>
                        <div className="table-cell">
                          <span className={`status-badge ${lab.available ? 'available' : 'unavailable'}`}>
                            {lab.available ? '可用' : '不可用'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 预算分配 */}
              <div className="form-section">
                <h3 className="section-title">预算分配</h3>
                <div className="budget-section">
                  <div className="form-group">
                    <label className="form-label">总预算（人民币）</label>
                    <input
                      type="number"
                      min="0"
                      value={budgetAllocations.totalBudget}
                      onChange={(e) => handleTotalBudgetChange(e.target.value)}
                      className="form-input"
                      placeholder="输入总预算金额"
                    />
                  </div>
                  
                  <div className="budget-allocations">
                    {budgetAllocations.allocations.map((allocation, index) => (
                      <div key={index} className="budget-item">
                        <div className="budget-category">{allocation.category}</div>
                        <div className="budget-percentage">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={allocation.percentage}
                            onChange={(e) => handleBudgetChange(index, 'percentage', parseInt(e.target.value))}
                            className="form-input percentage-input"
                          />
                          <span>%</span>
                        </div>
                        <div className="budget-amount">
                          ¥{allocation.amount || '0'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 外部合作 */}
              <div className="form-section">
                <h3 className="section-title">外部合作伙伴</h3>
                <div className="partnerships-section">
                  <div className="partnerships-header">
                    <button
                      type="button"
                      className="add-partnership-btn"
                      onClick={addPartnership}
                    >
                      + 添加合作伙伴
                    </button>
                  </div>
                  
                  <div className="partnerships-list">
                    {externalPartnerships.map(partnership => (
                      <div key={partnership.id} className="partnership-card">
                        <div className="partnership-fields">
                          <input
                            type="text"
                            value={partnership.name}
                            onChange={(e) => handlePartnershipChange(partnership.id, 'name', e.target.value)}
                            className="form-input partnership-name"
                            placeholder="合作伙伴名称"
                          />
                          <select
                            value={partnership.type}
                            onChange={(e) => handlePartnershipChange(partnership.id, 'type', e.target.value)}
                            className="form-select partnership-type"
                          >
                            <option value="industry">企业</option>
                            <option value="academic">学术机构</option>
                            <option value="research">研究机构</option>
                            <option value="government">政府机构</option>
                          </select>
                          <select
                            value={partnership.status}
                            onChange={(e) => handlePartnershipChange(partnership.id, 'status', e.target.value)}
                            className="form-select partnership-status"
                          >
                            <option value="active">活跃</option>
                            <option value="pending">待确认</option>
                            <option value="inactive">不活跃</option>
                          </select>
                          <input
                            type="text"
                            value={partnership.resources}
                            onChange={(e) => handlePartnershipChange(partnership.id, 'resources', e.target.value)}
                            className="form-input partnership-resources"
                            placeholder="提供资源"
                          />
                        </div>
                        <button
                          type="button"
                          className="remove-partnership-btn"
                          onClick={() => removePartnership(partnership.id)}
                        >
                          删除
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 技术基础设施 */}
              <div className="form-section">
                <h3 className="section-title">技术基础设施</h3>
                <div className="infrastructure-grid">
                  <div className="infrastructure-item">
                    <h4 className="infrastructure-title">服务器</h4>
                    <div className="infrastructure-stats">
                      <span>当前: {technicalInfrastructure.servers.current}</span>
                      <span>需要: {technicalInfrastructure.servers.required}</span>
                      <span className={`status ${technicalInfrastructure.servers.status}`}>
                        {technicalInfrastructure.servers.status === 'sufficient' ? '充足' : '不足'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="infrastructure-item">
                    <h4 className="infrastructure-title">存储空间</h4>
                    <div className="infrastructure-stats">
                      <span>当前: {technicalInfrastructure.storage.current}</span>
                      <span>需要: {technicalInfrastructure.storage.required}</span>
                      <span className={`status ${technicalInfrastructure.storage.status}`}>
                        {technicalInfrastructure.storage.status === 'sufficient' ? '充足' : '不足'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="infrastructure-item">
                    <h4 className="infrastructure-title">网络带宽</h4>
                    <div className="infrastructure-stats">
                      <span>当前: {technicalInfrastructure.bandwidth.current}</span>
                      <span>需要: {technicalInfrastructure.bandwidth.required}</span>
                      <span className={`status ${technicalInfrastructure.bandwidth.status}`}>
                        {technicalInfrastructure.bandwidth.status === 'sufficient' ? '充足' : '不足'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="software-licenses">
                  <h4 className="software-title">软件许可证</h4>
                  <div className="software-list">
                    {technicalInfrastructure.software.map((software, index) => (
                      <div key={index} className="software-item">
                        <span className="software-name">{software.name}</span>
                        <span>许可证: {software.licenses}/{software.required}</span>
                        <span className={`status ${software.status}`}>
                          {software.status === 'sufficient' ? '充足' : '不足'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 备份恢复 */}
              <div className="form-section">
                <h3 className="section-title">备份与灾难恢复</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">备份频率</label>
                    <select
                      value={backupRecovery.backupFrequency}
                      onChange={(e) => setBackupRecovery(prev => ({
                        ...prev,
                        backupFrequency: e.target.value
                      }))}
                      className="form-select"
                    >
                      <option value="hourly">每小时</option>
                      <option value="daily">每日</option>
                      <option value="weekly">每周</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">保留期（天）</label>
                    <input
                      type="number"
                      min="1"
                      value={backupRecovery.retentionPeriod}
                      onChange={(e) => setBackupRecovery(prev => ({
                        ...prev,
                        retentionPeriod: e.target.value
                      }))}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">恢复时间目标（小时）</label>
                    <input
                      type="number"
                      min="1"
                      value={backupRecovery.recoveryTime}
                      onChange={(e) => setBackupRecovery(prev => ({
                        ...prev,
                        recoveryTime: e.target.value
                      }))}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={backupRecovery.offSiteBackup}
                        onChange={(e) => setBackupRecovery(prev => ({
                          ...prev,
                          offSiteBackup: e.target.checked
                        }))}
                      />
                      异地备份
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="action-button secondary"
                  onClick={handleBack}
                >
                  上一步：规则政策
                </button>
                <button type="submit" className="action-button primary">
                  完成课程设置
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Resources