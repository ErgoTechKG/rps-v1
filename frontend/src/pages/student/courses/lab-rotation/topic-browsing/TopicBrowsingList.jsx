import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './TopicBrowsingList.css'

const TopicBrowsingList = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [topics, setTopics] = useState([])
  const [filteredTopics, setFilteredTopics] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    researchArea: 'all',
    professor: 'all',
    availability: 'all',
    sortBy: 'relevance'
  })
  const [viewMode, setViewMode] = useState('grid')

  useEffect(() => {
    // Load published topics from all professors
    const allTopics = []
    const professorCourses = ['CS1001', 'CS1002', 'CS1003'] // Mock course IDs
    
    professorCourses.forEach(profCourseId => {
      const storedTopics = localStorage.getItem(`topics_${profCourseId}`)
      if (storedTopics) {
        const parsedTopics = JSON.parse(storedTopics)
        const publishedTopics = parsedTopics.filter(topic => topic.status === 'published')
        allTopics.push(...publishedTopics.map(topic => ({
          ...topic,
          courseId: profCourseId,
          professorName: `教授 ${profCourseId.slice(-1)}`,
          researchArea: topic.researchArea || '计算机科学',
          applicants: topic.applications || 0,
          slots: topic.studentSlots || 3,
          rating: Math.floor(Math.random() * 20 + 80) / 20 // Mock rating 4.0-5.0
        })))
      }
    })

    // Add some default topics if none exist
    if (allTopics.length === 0) {
      const defaultTopics = [
        {
          id: '1',
          title: '深度学习在医疗图像分析中的应用',
          description: '本课题将探索深度学习技术在医疗图像诊断中的应用，包括CT、MRI图像的自动分析和病变检测。',
          professorName: '张教授',
          researchArea: '人工智能',
          requirements: ['机器学习基础', 'Python编程', '医学图像处理'],
          deadline: '2024-03-15',
          applicants: 5,
          slots: 3,
          rating: 4.8,
          status: 'published'
        },
        {
          id: '2',
          title: '区块链技术在供应链管理中的研究',
          description: '研究如何将区块链技术应用于供应链管理，提高透明度和可追溯性。',
          professorName: '李教授',
          researchArea: '区块链',
          requirements: ['分布式系统', '密码学基础', 'Java或Go语言'],
          deadline: '2024-03-20',
          applicants: 3,
          slots: 2,
          rating: 4.6,
          status: 'published'
        },
        {
          id: '3',
          title: '自然语言处理在智能客服中的应用',
          description: '开发基于NLP的智能客服系统，提升客户服务质量和效率。',
          professorName: '王教授',
          researchArea: '自然语言处理',
          requirements: ['NLP基础', 'Python编程', '深度学习框架'],
          deadline: '2024-03-18',
          applicants: 8,
          slots: 4,
          rating: 4.9,
          status: 'published'
        }
      ]
      allTopics.push(...defaultTopics)
    }

    setTopics(allTopics)
    setFilteredTopics(allTopics)

    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem(`favorites_student_${courseId}`)
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [courseId])

  useEffect(() => {
    // Apply filters and search
    let filtered = [...topics]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(topic =>
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.professorName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Research area filter
    if (filters.researchArea !== 'all') {
      filtered = filtered.filter(topic => topic.researchArea === filters.researchArea)
    }

    // Professor filter
    if (filters.professor !== 'all') {
      filtered = filtered.filter(topic => topic.professorName === filters.professor)
    }

    // Availability filter
    if (filters.availability === 'available') {
      filtered = filtered.filter(topic => topic.applicants < topic.slots)
    } else if (filters.availability === 'full') {
      filtered = filtered.filter(topic => topic.applicants >= topic.slots)
    }

    // Sorting
    switch (filters.sortBy) {
      case 'deadline':
        filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'applicants':
        filtered.sort((a, b) => b.applicants - a.applicants)
        break
      default: // relevance
        // Keep original order
        break
    }

    setFilteredTopics(filtered)
  }, [searchTerm, filters, topics])

  const handleViewDetails = (topicId) => {
    navigate(`/student/courses/lab-rotation/${courseId}/topic-browsing/details/${topicId}`)
  }

  const toggleFavorite = (topicId) => {
    const newFavorites = favorites.includes(topicId)
      ? favorites.filter(id => id !== topicId)
      : [...favorites, topicId]
    
    setFavorites(newFavorites)
    localStorage.setItem(`favorites_student_${courseId}`, JSON.stringify(newFavorites))
  }

  const handleShare = (topic) => {
    // Mock share functionality
    const shareText = `查看这个有趣的研究课题：${topic.title} - ${topic.professorName}`
    if (navigator.share) {
      navigator.share({
        title: topic.title,
        text: shareText,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('分享链接已复制到剪贴板')
    }
  }

  const getAvailabilityStatus = (topic) => {
    const percentage = (topic.applicants / topic.slots) * 100
    if (percentage >= 100) return { text: '已满', class: 'full' }
    if (percentage >= 80) return { text: '即将满员', class: 'almost-full' }
    return { text: '可申请', class: 'available' }
  }

  return (
    <div className="topic-browsing-container">
      <div className="browsing-header">
        <h1>浏览研究课题</h1>
        <div className="view-toggle">
          <button
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
          >
            <span className="icon">⊞</span> 网格视图
          </button>
          <button
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            <span className="icon">☰</span> 列表视图
          </button>
        </div>
      </div>

      <div className="browsing-content">
        <div className="filters-sidebar">
          <div className="search-section">
            <input
              type="text"
              className="search-input"
              placeholder="搜索课题、教授或关键词..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-section">
            <h3>研究领域</h3>
            <select
              value={filters.researchArea}
              onChange={(e) => setFilters({ ...filters, researchArea: e.target.value })}
            >
              <option value="all">所有领域</option>
              <option value="人工智能">人工智能</option>
              <option value="机器学习">机器学习</option>
              <option value="计算机视觉">计算机视觉</option>
              <option value="自然语言处理">自然语言处理</option>
              <option value="区块链">区块链</option>
              <option value="网络安全">网络安全</option>
              <option value="数据科学">数据科学</option>
            </select>
          </div>

          <div className="filter-section">
            <h3>指导教授</h3>
            <select
              value={filters.professor}
              onChange={(e) => setFilters({ ...filters, professor: e.target.value })}
            >
              <option value="all">所有教授</option>
              <option value="张教授">张教授</option>
              <option value="李教授">李教授</option>
              <option value="王教授">王教授</option>
              <option value="教授 1">教授 1</option>
              <option value="教授 2">教授 2</option>
              <option value="教授 3">教授 3</option>
            </select>
          </div>

          <div className="filter-section">
            <h3>申请状态</h3>
            <select
              value={filters.availability}
              onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
            >
              <option value="all">全部</option>
              <option value="available">可申请</option>
              <option value="full">已满员</option>
            </select>
          </div>

          <div className="filter-section">
            <h3>排序方式</h3>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            >
              <option value="relevance">相关性</option>
              <option value="deadline">截止日期</option>
              <option value="rating">教授评分</option>
              <option value="applicants">申请人数</option>
            </select>
          </div>

          <div className="ai-recommendation">
            <h3>AI 推荐</h3>
            <p>基于您的背景和兴趣，AI 为您推荐了最匹配的课题。</p>
            <button className="ai-button">获取个性化推荐</button>
          </div>
        </div>

        <div className={`topics-display ${viewMode}`}>
          {filteredTopics.length === 0 ? (
            <div className="empty-state">
              <p>没有找到符合条件的课题</p>
              <button onClick={() => {
                setSearchTerm('')
                setFilters({
                  researchArea: 'all',
                  professor: 'all',
                  availability: 'all',
                  sortBy: 'relevance'
                })
              }}>
                清除筛选条件
              </button>
            </div>
          ) : (
            <div className={`topics-${viewMode}`}>
              {filteredTopics.map(topic => {
                const availability = getAvailabilityStatus(topic)
                const isFavorite = favorites.includes(topic.id)

                return (
                  <div key={topic.id} className="topic-card">
                    <div className="topic-header">
                      <h3 className="topic-title">{topic.title}</h3>
                      <button
                        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                        onClick={() => toggleFavorite(topic.id)}
                      >
                        {isFavorite ? '★' : '☆'}
                      </button>
                    </div>

                    <div className="topic-meta">
                      <span className="professor">{topic.professorName}</span>
                      <span className="research-area">{topic.researchArea}</span>
                      <span className={`availability ${availability.class}`}>
                        {availability.text}
                      </span>
                    </div>

                    <p className="topic-description">{topic.description}</p>

                    <div className="topic-stats">
                      <div className="stat">
                        <span className="label">申请人数：</span>
                        <span className="value">{topic.applicants}/{topic.slots}</span>
                      </div>
                      <div className="stat">
                        <span className="label">截止日期：</span>
                        <span className="value">{topic.deadline}</span>
                      </div>
                      <div className="stat">
                        <span className="label">教授评分：</span>
                        <span className="value">★ {topic.rating}</span>
                      </div>
                    </div>

                    {topic.requirements && (
                      <div className="requirements-preview">
                        <span className="label">要求：</span>
                        {topic.requirements.slice(0, 2).map((req, index) => (
                          <span key={index} className="requirement-tag">{req}</span>
                        ))}
                        {topic.requirements.length > 2 && (
                          <span className="more">+{topic.requirements.length - 2}</span>
                        )}
                      </div>
                    )}

                    <div className="topic-actions">
                      <button
                        className="btn-primary"
                        onClick={() => handleViewDetails(topic.id)}
                      >
                        查看详情
                      </button>
                      <button
                        className="btn-secondary"
                        onClick={() => handleShare(topic)}
                      >
                        分享
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopicBrowsingList