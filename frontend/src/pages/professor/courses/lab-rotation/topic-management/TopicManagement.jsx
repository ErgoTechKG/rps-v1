import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './TopicManagement.css'

const TopicManagement = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [topics, setTopics] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Load topics from localStorage
    const storedTopics = localStorage.getItem(`topics_${courseId}`)
    if (storedTopics) {
      setTopics(JSON.parse(storedTopics))
    }
  }, [courseId])

  const filteredTopics = topics.filter(topic => {
    if (filter !== 'all' && topic.status !== filter) return false
    if (searchTerm && !topic.title.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const handleCreateTopic = () => {
    navigate(`/professor/courses/lab-rotation/${courseId}/topic-management/publish`)
  }

  const handleEditTopic = (topicId) => {
    navigate(`/professor/courses/lab-rotation/${courseId}/topic-management/edit/${topicId}`)
  }

  const handleToggleStatus = (topicId) => {
    const updatedTopics = topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          status: topic.status === 'published' ? 'draft' : 'published'
        }
      }
      return topic
    })
    setTopics(updatedTopics)
    localStorage.setItem(`topics_${courseId}`, JSON.stringify(updatedTopics))
  }

  const handleDeleteTopic = (topicId) => {
    if (window.confirm('确定要删除这个课题吗？')) {
      const updatedTopics = topics.filter(topic => topic.id !== topicId)
      setTopics(updatedTopics)
      localStorage.setItem(`topics_${courseId}`, JSON.stringify(updatedTopics))
    }
  }

  const handleDuplicateTopic = (topicId) => {
    const topicToDuplicate = topics.find(topic => topic.id === topicId)
    if (topicToDuplicate) {
      const newTopic = {
        ...topicToDuplicate,
        id: Date.now().toString(),
        title: topicToDuplicate.title + ' (副本)',
        status: 'draft',
        createdAt: new Date().toISOString()
      }
      const updatedTopics = [...topics, newTopic]
      setTopics(updatedTopics)
      localStorage.setItem(`topics_${courseId}`, JSON.stringify(updatedTopics))
    }
  }

  return (
    <div className="topic-management-container">
      <div className="topic-management-header">
        <h1>课题管理</h1>
        <button className="btn-primary" onClick={handleCreateTopic}>
          <span className="icon">+</span> 创建新课题
        </button>
      </div>

      <div className="topic-management-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="搜索课题..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            全部 ({topics.length})
          </button>
          <button 
            className={filter === 'published' ? 'active' : ''} 
            onClick={() => setFilter('published')}
          >
            已发布 ({topics.filter(t => t.status === 'published').length})
          </button>
          <button 
            className={filter === 'draft' ? 'active' : ''} 
            onClick={() => setFilter('draft')}
          >
            草稿 ({topics.filter(t => t.status === 'draft').length})
          </button>
        </div>
      </div>

      <div className="topics-list">
        {filteredTopics.length === 0 ? (
          <div className="empty-state">
            <p>暂无课题</p>
            <button className="btn-primary" onClick={handleCreateTopic}>
              创建第一个课题
            </button>
          </div>
        ) : (
          filteredTopics.map(topic => (
            <div key={topic.id} className="topic-card">
              <div className="topic-header">
                <h3>{topic.title}</h3>
                <span className={`status-badge ${topic.status}`}>
                  {topic.status === 'published' ? '已发布' : '草稿'}
                </span>
              </div>
              <div className="topic-info">
                <p className="topic-description">{topic.description}</p>
                <div className="topic-meta">
                  <span>学生名额：{topic.studentSlots || 0}</span>
                  <span>已申请：{topic.applications || 0}</span>
                  <span>截止日期：{topic.deadline || '未设置'}</span>
                </div>
              </div>
              <div className="topic-actions">
                <button className="btn-text" onClick={() => handleEditTopic(topic.id)}>
                  编辑
                </button>
                <button className="btn-text" onClick={() => handleToggleStatus(topic.id)}>
                  {topic.status === 'published' ? '取消发布' : '发布'}
                </button>
                <button className="btn-text" onClick={() => handleDuplicateTopic(topic.id)}>
                  复制
                </button>
                <button className="btn-text danger" onClick={() => handleDeleteTopic(topic.id)}>
                  删除
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TopicManagement