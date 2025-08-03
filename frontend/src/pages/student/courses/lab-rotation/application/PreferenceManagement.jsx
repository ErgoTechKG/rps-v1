import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './PreferenceManagement.css'

const PreferenceManagement = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [topics, setTopics] = useState([])
  const [preferences, setPreferences] = useState([])
  const [availableTopics, setAvailableTopics] = useState([])
  const [reasons, setReasons] = useState({})
  const [aiRecommendations, setAiRecommendations] = useState([])
  const [showAiPanel, setShowAiPanel] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [deadline, setDeadline] = useState(null)

  useEffect(() => {
    loadTopics()
    loadPreferences()
    loadDeadline()
    generateAiRecommendations()
  }, [courseId])

  const loadTopics = () => {
    // Load all published topics
    const allTopics = []
    const professorCourses = ['CS1001', 'CS1002', 'CS1003']
    
    professorCourses.forEach(profCourseId => {
      const storedTopics = localStorage.getItem(`topics_${profCourseId}`)
      if (storedTopics) {
        const parsedTopics = JSON.parse(storedTopics)
        const publishedTopics = parsedTopics.filter(topic => topic.status === 'published')
        allTopics.push(...publishedTopics.map(topic => ({
          ...topic,
          courseId: profCourseId,
          matchScore: Math.floor(Math.random() * 30 + 70) // Mock match score 70-100
        })))
      }
    })

    // Add default topics if needed
    if (allTopics.length === 0) {
      const defaultTopics = [
        {
          id: '1',
          title: '深度学习在医疗图像分析中的应用',
          professorName: '张教授',
          researchArea: '人工智能',
          applicants: 5,
          slots: 3,
          matchScore: 95
        },
        {
          id: '2',
          title: '区块链技术在供应链管理中的研究',
          professorName: '李教授',
          researchArea: '区块链',
          applicants: 3,
          slots: 2,
          matchScore: 82
        },
        {
          id: '3',
          title: '自然语言处理在智能客服中的应用',
          professorName: '王教授',
          researchArea: '自然语言处理',
          applicants: 8,
          slots: 4,
          matchScore: 88
        },
        {
          id: '4',
          title: '物联网安全研究',
          professorName: '陈教授',
          researchArea: '网络安全',
          applicants: 2,
          slots: 3,
          matchScore: 75
        },
        {
          id: '5',
          title: '强化学习在游戏AI中的应用',
          professorName: '赵教授',
          researchArea: '机器学习',
          applicants: 6,
          slots: 2,
          matchScore: 91
        }
      ]
      allTopics.push(...defaultTopics)
    }

    setTopics(allTopics)
    setAvailableTopics(allTopics)
  }

  const loadPreferences = () => {
    const saved = localStorage.getItem(`preferences_${courseId}`)
    if (saved) {
      const data = JSON.parse(saved)
      setPreferences(data.preferences || [])
      setReasons(data.reasons || {})
      setIsLocked(data.isLocked || false)
    }
  }

  const loadDeadline = () => {
    // Mock deadline
    const deadline = new Date()
    deadline.setDate(deadline.getDate() + 7)
    setDeadline(deadline)
  }

  const generateAiRecommendations = () => {
    // Mock AI recommendations based on student profile
    const recommendations = [
      {
        topicId: '1',
        reason: '基于您的机器学习背景和医疗健康兴趣',
        score: 95
      },
      {
        topicId: '5',
        reason: '您的项目经验与强化学习高度相关',
        score: 91
      },
      {
        topicId: '3',
        reason: '您修过的NLP课程为这个项目打下良好基础',
        score: 88
      }
    ]
    setAiRecommendations(recommendations)
  }

  const handleDragStart = (e, topic) => {
    e.dataTransfer.setData('topic', JSON.stringify(topic))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, index) => {
    e.preventDefault()
    const topic = JSON.parse(e.dataTransfer.getData('topic'))
    
    // Remove from available topics
    setAvailableTopics(prev => prev.filter(t => t.id !== topic.id))
    
    // Add to preferences at specific position
    const newPreferences = [...preferences]
    newPreferences.splice(index, 0, topic)
    
    // Limit to 5 preferences
    if (newPreferences.length > 5) {
      const removed = newPreferences.pop()
      setAvailableTopics(prev => [...prev, removed])
    }
    
    setPreferences(newPreferences)
  }

  const handleDropToAvailable = (e) => {
    e.preventDefault()
    const topic = JSON.parse(e.dataTransfer.getData('topic'))
    
    // Remove from preferences
    setPreferences(prev => prev.filter(t => t.id !== topic.id))
    
    // Add back to available
    setAvailableTopics(prev => [...prev, topic])
    
    // Remove reason
    const newReasons = { ...reasons }
    delete newReasons[topic.id]
    setReasons(newReasons)
  }

  const movePreference = (fromIndex, toIndex) => {
    const newPreferences = [...preferences]
    const [removed] = newPreferences.splice(fromIndex, 1)
    newPreferences.splice(toIndex, 0, removed)
    setPreferences(newPreferences)
  }

  const removePreference = (topic) => {
    setPreferences(prev => prev.filter(t => t.id !== topic.id))
    setAvailableTopics(prev => [...prev, topic])
    
    const newReasons = { ...reasons }
    delete newReasons[topic.id]
    setReasons(newReasons)
  }

  const updateReason = (topicId, reason) => {
    setReasons({ ...reasons, [topicId]: reason })
  }

  const applyAiRecommendations = () => {
    const recommendedTopics = aiRecommendations.map(rec => 
      topics.find(t => t.id === rec.topicId)
    ).filter(Boolean)
    
    setPreferences(recommendedTopics.slice(0, 5))
    setAvailableTopics(topics.filter(t => 
      !recommendedTopics.find(rt => rt.id === t.id)
    ))
    
    // Auto-fill reasons
    const newReasons = {}
    aiRecommendations.forEach(rec => {
      newReasons[rec.topicId] = rec.reason
    })
    setReasons(newReasons)
  }

  const savePreferences = () => {
    const data = {
      preferences,
      reasons,
      isLocked,
      savedAt: new Date().toISOString()
    }
    localStorage.setItem(`preferences_${courseId}`, JSON.stringify(data))
    alert('志愿顺序已保存')
  }

  const lockPreferences = () => {
    if (preferences.length === 0) {
      alert('请至少选择一个志愿')
      return
    }
    
    // Validate all reasons are filled
    const missingReasons = preferences.filter(p => !reasons[p.id])
    if (missingReasons.length > 0) {
      alert('请为所有志愿填写选择理由')
      return
    }
    
    setIsLocked(true)
    savePreferences()
    alert('志愿已锁定，不可再修改')
  }

  const getChanceIndicator = (topic) => {
    const ratio = topic.applicants / topic.slots
    if (ratio < 0.5) return { text: '录取机会大', class: 'high' }
    if (ratio < 1) return { text: '录取机会中等', class: 'medium' }
    if (ratio < 1.5) return { text: '竞争较激烈', class: 'low' }
    return { text: '竞争非常激烈', class: 'very-low' }
  }

  return (
    <div className="preference-management-container">
      <div className="preference-header">
        <h1>志愿选择与排序</h1>
        <div className="deadline-info">
          <span className="icon">⏰</span>
          截止时间：{deadline?.toLocaleString()}
        </div>
      </div>

      {isLocked && (
        <div className="locked-notice">
          <span className="icon">🔒</span>
          志愿已锁定，不可修改
        </div>
      )}

      <div className="preference-content">
        <div className="preferences-section">
          <div className="section-header">
            <h2>我的志愿（最多5个）</h2>
            <button className="ai-toggle" onClick={() => setShowAiPanel(!showAiPanel)}>
              <span className="icon">🤖</span> AI推荐
            </button>
          </div>

          {showAiPanel && (
            <div className="ai-recommendations">
              <h3>AI 推荐志愿</h3>
              <p>基于您的背景和兴趣，AI为您推荐以下志愿顺序：</p>
              <div className="ai-list">
                {aiRecommendations.map((rec, index) => {
                  const topic = topics.find(t => t.id === rec.topicId)
                  return topic && (
                    <div key={rec.topicId} className="ai-item">
                      <span className="rank">{index + 1}</span>
                      <div className="ai-info">
                        <div className="topic-title">{topic.title}</div>
                        <div className="ai-reason">{rec.reason}</div>
                        <div className="match-score">匹配度：{rec.score}%</div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <button 
                className="apply-ai-btn" 
                onClick={applyAiRecommendations}
                disabled={isLocked}
              >
                应用AI推荐
              </button>
            </div>
          )}

          <div 
            className={`preference-list ${isLocked ? 'locked' : ''}`}
            onDragOver={handleDragOver}
          >
            {preferences.length === 0 ? (
              <div className="empty-state">
                <p>从右侧拖拽课题到这里</p>
                <p>或使用AI推荐快速选择</p>
              </div>
            ) : (
              preferences.map((topic, index) => {
                const chance = getChanceIndicator(topic)
                return (
                  <div
                    key={topic.id}
                    className="preference-item"
                    draggable={!isLocked}
                    onDragStart={(e) => handleDragStart(e, topic)}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <div className="drag-handle">
                      <span className="rank">{index + 1}</span>
                      {!isLocked && <span className="icon">≡</span>}
                    </div>
                    
                    <div className="topic-info">
                      <h4>{topic.title}</h4>
                      <div className="topic-meta">
                        <span>{topic.professorName}</span>
                        <span className={`chance ${chance.class}`}>{chance.text}</span>
                        <span>申请人数：{topic.applicants}/{topic.slots}</span>
                      </div>
                      
                      <div className="reason-input">
                        <label>选择理由：</label>
                        <textarea
                          value={reasons[topic.id] || ''}
                          onChange={(e) => updateReason(topic.id, e.target.value)}
                          placeholder="请说明选择这个课题的具体原因..."
                          disabled={isLocked}
                          rows="2"
                        />
                      </div>
                    </div>
                    
                    {!isLocked && (
                      <div className="actions">
                        {index > 0 && (
                          <button onClick={() => movePreference(index, index - 1)}>↑</button>
                        )}
                        {index < preferences.length - 1 && (
                          <button onClick={() => movePreference(index, index + 1)}>↓</button>
                        )}
                        <button onClick={() => removePreference(topic)}>×</button>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>

          <div className="preference-actions">
            <button 
              className="btn-secondary" 
              onClick={savePreferences}
              disabled={isLocked}
            >
              保存草稿
            </button>
            <button 
              className="btn-primary" 
              onClick={lockPreferences}
              disabled={isLocked}
            >
              锁定志愿
            </button>
          </div>
        </div>

        <div className="available-topics-section">
          <h2>可选课题</h2>
          <div className="filter-bar">
            <input 
              type="text" 
              placeholder="搜索课题..." 
              className="search-input"
            />
            <select className="filter-select">
              <option value="all">全部</option>
              <option value="highMatch">高匹配度</option>
              <option value="lowCompetition">低竞争</option>
            </select>
          </div>

          <div 
            className="available-list"
            onDragOver={handleDragOver}
            onDrop={handleDropToAvailable}
          >
            {availableTopics.map(topic => {
              const chance = getChanceIndicator(topic)
              return (
                <div
                  key={topic.id}
                  className="available-item"
                  draggable={!isLocked}
                  onDragStart={(e) => handleDragStart(e, topic)}
                >
                  <h4>{topic.title}</h4>
                  <div className="topic-meta">
                    <span>{topic.professorName}</span>
                    <span>{topic.researchArea}</span>
                    <span className={`chance ${chance.class}`}>{chance.text}</span>
                  </div>
                  <div className="match-info">
                    <span className="match-score">匹配度：{topic.matchScore}%</span>
                    <span>申请：{topic.applicants}/{topic.slots}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="tips-section">
        <h3>💡 选择建议</h3>
        <ul>
          <li>建议选择3-5个志愿，增加录取机会</li>
          <li>合理安排志愿顺序，考虑竞争激烈程度</li>
          <li>选择与您背景匹配的课题，提高录取概率</li>
          <li>填写详细的选择理由，帮助教授了解您</li>
          <li>锁定后不可修改，请仔细确认</li>
        </ul>
      </div>
    </div>
  )
}

export default PreferenceManagement