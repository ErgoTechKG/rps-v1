import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './TopicEdit.css'

const TopicEdit = () => {
  const { courseId, topicId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(null)
  const [activeTab, setActiveTab] = useState('basic')
  const [hasChanges, setHasChanges] = useState(false)
  const [versions, setVersions] = useState([])

  useEffect(() => {
    // Load topic data
    const topics = JSON.parse(localStorage.getItem(`topics_${courseId}`) || '[]')
    const topic = topics.find(t => t.id === topicId)
    if (topic) {
      setFormData(topic)
      // Load version history
      const versionHistory = JSON.parse(localStorage.getItem(`topic_versions_${topicId}`) || '[]')
      setVersions(versionHistory)
    }
  }, [courseId, topicId])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Save version history
    const newVersion = {
      ...formData,
      versionId: Date.now().toString(),
      versionDate: new Date().toISOString(),
      versionNote: '手动保存'
    }
    const updatedVersions = [...versions, newVersion]
    localStorage.setItem(`topic_versions_${topicId}`, JSON.stringify(updatedVersions))
    
    // Update topic
    const topics = JSON.parse(localStorage.getItem(`topics_${courseId}`) || '[]')
    const updatedTopics = topics.map(t => t.id === topicId ? formData : t)
    localStorage.setItem(`topics_${courseId}`, JSON.stringify(updatedTopics))
    
    setHasChanges(false)
    setVersions(updatedVersions)
  }

  const handlePublish = () => {
    const updatedData = { ...formData, status: 'published' }
    setFormData(updatedData)
    
    const topics = JSON.parse(localStorage.getItem(`topics_${courseId}`) || '[]')
    const updatedTopics = topics.map(t => t.id === topicId ? updatedData : t)
    localStorage.setItem(`topics_${courseId}`, JSON.stringify(updatedTopics))
    
    navigate(`/professor/courses/lab-rotation/${courseId}/topic-management`)
  }

  const handleRestoreVersion = (versionId) => {
    const version = versions.find(v => v.versionId === versionId)
    if (version && window.confirm('确定要恢复到这个版本吗？')) {
      const { versionId: _, versionDate: __, versionNote: ___, ...versionData } = version
      setFormData(versionData)
      setHasChanges(true)
    }
  }

  if (!formData) {
    return <div>加载中...</div>
  }

  const tabs = [
    { id: 'basic', label: '基本信息', icon: '📝' },
    { id: 'description', label: '详细描述', icon: '📋' },
    { id: 'requirements', label: '学生要求', icon: '👥' },
    { id: 'resources', label: '资源配置', icon: '🔧' },
    { id: 'timeline', label: '时间安排', icon: '📅' },
    { id: 'versions', label: '版本历史', icon: '📚' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="tab-content">
            <div className="form-group">
              <label>课题标题 *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>简介 *</label>
              <textarea
                value={formData.summary || ''}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                rows={4}
              />
            </div>
            <div className="form-group">
              <label>关键词</label>
              <input
                type="text"
                value={formData.keywords || ''}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>研究领域 *</label>
              <select
                value={formData.researchArea || ''}
                onChange={(e) => handleInputChange('researchArea', e.target.value)}
              >
                <option value="">请选择研究领域</option>
                <option value="ai">人工智能</option>
                <option value="biology">生物学</option>
                <option value="chemistry">化学</option>
                <option value="physics">物理学</option>
                <option value="engineering">工程学</option>
                <option value="medicine">医学</option>
                <option value="other">其他</option>
              </select>
            </div>
          </div>
        )

      case 'description':
        return (
          <div className="tab-content">
            <div className="form-group">
              <label>研究背景</label>
              <textarea
                value={formData.background || ''}
                onChange={(e) => handleInputChange('background', e.target.value)}
                rows={5}
              />
            </div>
            <div className="form-group">
              <label>研究目标 *</label>
              <textarea
                value={formData.objectives || ''}
                onChange={(e) => handleInputChange('objectives', e.target.value)}
                rows={5}
              />
            </div>
            <div className="form-group">
              <label>研究方法</label>
              <textarea
                value={formData.methodology || ''}
                onChange={(e) => handleInputChange('methodology', e.target.value)}
                rows={5}
              />
            </div>
            <div className="form-group">
              <label>预期成果</label>
              <textarea
                value={formData.expectedOutcomes || ''}
                onChange={(e) => handleInputChange('expectedOutcomes', e.target.value)}
                rows={5}
              />
            </div>
          </div>
        )

      case 'requirements':
        return (
          <div className="tab-content">
            <div className="form-group">
              <label>学术先修要求</label>
              <textarea
                value={formData.academicPrerequisites || ''}
                onChange={(e) => handleInputChange('academicPrerequisites', e.target.value)}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>所需技能</label>
              <textarea
                value={formData.requiredSkills || ''}
                onChange={(e) => handleInputChange('requiredSkills', e.target.value)}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>时间投入要求</label>
              <input
                type="text"
                value={formData.timeCommitment || ''}
                onChange={(e) => handleInputChange('timeCommitment', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>GPA要求</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="4"
                value={formData.gpaRequirement || ''}
                onChange={(e) => handleInputChange('gpaRequirement', e.target.value)}
              />
            </div>
          </div>
        )

      case 'resources':
        return (
          <div className="tab-content">
            <div className="form-group">
              <label>实验室设施</label>
              <textarea
                value={formData.labFacilities || ''}
                onChange={(e) => handleInputChange('labFacilities', e.target.value)}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>设备</label>
              <textarea
                value={formData.equipment || ''}
                onChange={(e) => handleInputChange('equipment', e.target.value)}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>材料</label>
              <textarea
                value={formData.materials || ''}
                onChange={(e) => handleInputChange('materials', e.target.value)}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>预算</label>
              <input
                type="text"
                value={formData.budget || ''}
                onChange={(e) => handleInputChange('budget', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>招收学生人数 *</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.studentSlots || 1}
                onChange={(e) => handleInputChange('studentSlots', parseInt(e.target.value) || 1)}
              />
            </div>
          </div>
        )

      case 'timeline':
        return (
          <div className="tab-content">
            <div className="form-group">
              <label>项目开始日期 *</label>
              <input
                type="date"
                value={formData.startDate || ''}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>申请截止日期 *</label>
              <input
                type="date"
                value={formData.deadline || ''}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>项目里程碑</label>
              <div className="milestone-editor">
                <p className="help-text">项目阶段将自动生成，包括文献调研、实验设计、实验实施、数据分析和报告撰写。</p>
              </div>
            </div>
          </div>
        )

      case 'versions':
        return (
          <div className="tab-content">
            <div className="version-history">
              {versions.length === 0 ? (
                <p className="empty-message">暂无版本历史</p>
              ) : (
                versions.map((version, index) => (
                  <div key={version.versionId} className="version-item">
                    <div className="version-header">
                      <span className="version-number">版本 {versions.length - index}</span>
                      <span className="version-date">
                        {new Date(version.versionDate).toLocaleString('zh-CN')}
                      </span>
                    </div>
                    <div className="version-note">{version.versionNote}</div>
                    <button 
                      className="btn-text"
                      onClick={() => handleRestoreVersion(version.versionId)}
                    >
                      恢复此版本
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="topic-edit-container">
      <div className="edit-header">
        <div className="header-left">
          <h1>编辑课题</h1>
          {hasChanges && <span className="unsaved-indicator">有未保存的更改</span>}
        </div>
        <div className="header-actions">
          <button className="btn-text" onClick={() => navigate(-1)}>
            取消
          </button>
          <button 
            className="btn-secondary" 
            onClick={handleSave}
            disabled={!hasChanges}
          >
            保存
          </button>
          {formData.status === 'draft' && (
            <button className="btn-primary" onClick={handlePublish}>
              发布
            </button>
          )}
        </div>
      </div>

      <div className="edit-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="edit-content">
        {renderTabContent()}
      </div>
    </div>
  )
}

export default TopicEdit