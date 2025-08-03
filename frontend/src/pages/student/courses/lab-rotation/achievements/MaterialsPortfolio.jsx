import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './MaterialsPortfolio.css'

const MaterialsPortfolio = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('organize')
  const [materials, setMaterials] = useState([])
  const [categories, setCategories] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [notes, setNotes] = useState([])
  const [studyGuides, setStudyGuides] = useState([])
  const [achievements, setAchievements] = useState([])
  const [certificates, setCertificates] = useState([])
  const [showMaterialModal, setShowMaterialModal] = useState(false)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [showGuideModal, setShowGuideModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [materialData, setMaterialData] = useState({
    title: '',
    description: '',
    category: '',
    type: 'document',
    url: '',
    file: null,
    tags: ''
  })
  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    isPublic: false
  })
  const [guideData, setGuideData] = useState({
    title: '',
    description: '',
    sections: '',
    category: '',
    targetAudience: 'personal'
  })
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: '#3498db'
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedType, setSelectedType] = useState('')

  useEffect(() => {
    loadMaterials()
    loadCategories()
    loadBookmarks()
    loadNotes()
    loadStudyGuides()
    loadAchievements()
    loadCertificates()
  }, [courseId])

  const loadMaterials = () => {
    const mockMaterials = [
      {
        id: '1',
        title: '深度学习入门教程',
        description: '全面介绍深度学习基础理论和实践方法',
        category: 'learning',
        type: 'document',
        url: 'https://example.com/deep-learning-tutorial.pdf',
        uploadDate: '2024-02-20',
        fileSize: '2.5 MB',
        tags: ['深度学习', '教程', '入门'],
        views: 25,
        isBookmarked: true
      },
      {
        id: '2',
        title: '卷积神经网络论文集',
        description: '重要的CNN相关论文合集',
        category: 'research',
        type: 'collection',
        url: 'https://example.com/cnn-papers',
        uploadDate: '2024-02-18',
        fileSize: '15.2 MB',
        tags: ['CNN', '论文', '研究'],
        views: 18,
        isBookmarked: false
      },
      {
        id: '3',
        title: 'PyTorch实战代码库',
        description: '实用的PyTorch代码示例和项目模板',
        category: 'code',
        type: 'code',
        url: 'https://github.com/example/pytorch-examples',
        uploadDate: '2024-02-15',
        fileSize: '8.7 MB',
        tags: ['PyTorch', '代码', '实战'],
        views: 42,
        isBookmarked: true
      },
      {
        id: '4',
        title: '研究方法视频讲座',
        description: '科研方法论系列视频讲座',
        category: 'learning',
        type: 'video',
        url: 'https://example.com/research-methods-videos',
        uploadDate: '2024-02-12',
        fileSize: '500 MB',
        tags: ['研究方法', '视频', '讲座'],
        views: 35,
        isBookmarked: false
      }
    ]
    
    const savedMaterials = localStorage.getItem(`materials_${courseId}`)
    if (savedMaterials) {
      setMaterials(JSON.parse(savedMaterials))
    } else {
      setMaterials(mockMaterials)
      localStorage.setItem(`materials_${courseId}`, JSON.stringify(mockMaterials))
    }
  }

  const loadCategories = () => {
    const mockCategories = [
      { id: '1', name: '学习资料', description: '教程、课件、教材等学习内容', color: '#3498db', count: 15 },
      { id: '2', name: '研究文献', description: '论文、期刊、会议资料', color: '#e74c3c', count: 23 },
      { id: '3', name: '代码资源', description: '代码库、示例、工具', color: '#27ae60', count: 8 },
      { id: '4', name: '实验数据', description: '数据集、实验结果', color: '#f39c12', count: 6 },
      { id: '5', name: '工具软件', description: '软件工具、插件、应用', color: '#9b59b6', count: 4 }
    ]
    
    const savedCategories = localStorage.getItem(`categories_${courseId}`)
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    } else {
      setCategories(mockCategories)
      localStorage.setItem(`categories_${courseId}`, JSON.stringify(mockCategories))
    }
  }

  const loadBookmarks = () => {
    const mockBookmarks = [
      {
        id: '1',
        title: 'Papers With Code',
        url: 'https://paperswithcode.com',
        description: '机器学习论文和代码资源',
        category: 'research',
        tags: ['论文', '代码', 'ML'],
        addedDate: '2024-02-20',
        visits: 15
      },
      {
        id: '2',
        title: 'Towards Data Science',
        url: 'https://towardsdatascience.com',
        description: '数据科学和机器学习博客平台',
        category: 'learning',
        tags: ['博客', '数据科学', '学习'],
        addedDate: '2024-02-18',
        visits: 8
      },
      {
        id: '3',
        title: 'GitHub Awesome Lists',
        url: 'https://github.com/sindresorhus/awesome',
        description: '精选资源列表合集',
        category: 'code',
        tags: ['GitHub', '资源', '列表'],
        addedDate: '2024-02-15',
        visits: 12
      }
    ]
    
    const savedBookmarks = localStorage.getItem(`bookmarks_${courseId}`)
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks))
    } else {
      setBookmarks(mockBookmarks)
      localStorage.setItem(`bookmarks_${courseId}`, JSON.stringify(mockBookmarks))
    }
  }

  const loadNotes = () => {
    const mockNotes = [
      {
        id: '1',
        title: '深度学习核心概念总结',
        content: '1. 神经网络基础\n- 感知机模型\n- 反向传播算法\n- 激活函数\n\n2. 卷积神经网络\n- 卷积层原理\n- 池化层作用\n- 经典网络架构',
        category: 'learning',
        tags: ['深度学习', '总结', '概念'],
        createdDate: '2024-02-20',
        lastModified: '2024-02-22',
        isPublic: false,
        wordCount: 156
      },
      {
        id: '2',
        title: '论文阅读笔记 - ResNet',
        content: 'ResNet论文核心贡献：\n\n1. 残差连接解决梯度消失问题\n2. 更深的网络架构设计\n3. 在ImageNet上的突破性表现\n\n关键技术点：\n- Skip connections\n- Batch normalization\n- 瓶颈设计',
        category: 'research',
        tags: ['论文', 'ResNet', '笔记'],
        createdDate: '2024-02-18',
        lastModified: '2024-02-18',
        isPublic: true,
        wordCount: 98
      }
    ]
    
    const savedNotes = localStorage.getItem(`notes_${courseId}`)
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    } else {
      setNotes(mockNotes)
      localStorage.setItem(`notes_${courseId}`, JSON.stringify(mockNotes))
    }
  }

  const loadStudyGuides = () => {
    const mockGuides = [
      {
        id: '1',
        title: '机器学习入门指南',
        description: '从零开始学习机器学习的完整路径',
        sections: '1. 数学基础\n2. Python编程\n3. 机器学习算法\n4. 实践项目\n5. 进阶学习',
        category: 'learning',
        targetAudience: 'public',
        createdDate: '2024-02-20',
        views: 45,
        rating: 4.5
      },
      {
        id: '2',
        title: '深度学习论文阅读指南',
        description: '高效阅读和理解深度学习论文的方法',
        sections: '1. 论文结构分析\n2. 关键信息提取\n3. 实验结果解读\n4. 代码实现理解',
        category: 'research',
        targetAudience: 'personal',
        createdDate: '2024-02-18',
        views: 28,
        rating: 4.2
      }
    ]
    
    const savedGuides = localStorage.getItem(`studyGuides_${courseId}`)
    if (savedGuides) {
      setStudyGuides(JSON.parse(savedGuides))
    } else {
      setStudyGuides(mockGuides)
      localStorage.setItem(`studyGuides_${courseId}`, JSON.stringify(mockGuides))
    }
  }

  const loadAchievements = () => {
    const mockAchievements = [
      {
        id: '1',
        title: '完成深度学习课程',
        type: 'course',
        description: '成功完成深度学习基础课程，掌握核心理论和实践技能',
        achievedDate: '2024-02-20',
        category: 'learning',
        points: 100,
        badge: '🎓',
        progress: 100
      },
      {
        id: '2',
        title: '发表研究论文',
        type: 'research',
        description: '在国际会议上发表第一篇研究论文',
        achievedDate: '2024-02-15',
        category: 'research',
        points: 200,
        badge: '📝',
        progress: 100
      },
      {
        id: '3',
        title: '代码贡献者',
        type: 'contribution',
        description: '为开源项目贡献代码，获得maintainer认可',
        achievedDate: '2024-02-10',
        category: 'code',
        points: 150,
        badge: '💻',
        progress: 100
      },
      {
        id: '4',
        title: '研究项目进展',
        type: 'milestone',
        description: '完成研究项目的中期目标',
        achievedDate: null,
        category: 'research',
        points: 180,
        badge: '🎯',
        progress: 75
      }
    ]
    setAchievements(mockAchievements)
  }

  const loadCertificates = () => {
    const mockCertificates = [
      {
        id: '1',
        title: '深度学习专项课程证书',
        issuer: 'Coursera - 斯坦福大学',
        issueDate: '2024-02-20',
        validUntil: '2026-02-20',
        credentialId: 'DL2024-001',
        skills: ['深度学习', 'TensorFlow', '计算机视觉'],
        level: 'Advanced',
        status: 'verified'
      },
      {
        id: '2',
        title: 'Python数据科学认证',
        issuer: 'DataCamp',
        issueDate: '2024-01-15',
        validUntil: null,
        credentialId: 'PY2024-DS-002',
        skills: ['Python', 'Pandas', 'NumPy', '数据分析'],
        level: 'Intermediate',
        status: 'verified'
      },
      {
        id: '3',
        title: '机器学习工程师认证',
        issuer: 'AWS',
        issueDate: '2024-01-10',
        validUntil: '2027-01-10',
        credentialId: 'AWS-MLE-2024-003',
        skills: ['AWS', '机器学习', 'SageMaker'],
        level: 'Professional',
        status: 'pending'
      }
    ]
    setCertificates(mockCertificates)
  }

  const addMaterial = () => {
    if (!materialData.title || (!materialData.url && !materialData.file)) {
      alert('请填写标题并提供URL或上传文件')
      return
    }

    const newMaterial = {
      id: Date.now().toString(),
      title: materialData.title,
      description: materialData.description,
      category: materialData.category || 'uncategorized',
      type: materialData.type,
      url: materialData.url || (materialData.file ? materialData.file.name : ''),
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: materialData.file ? `${(materialData.file.size / (1024 * 1024)).toFixed(1)} MB` : 'N/A',
      tags: materialData.tags.split(',').map(tag => tag.trim()),
      views: 0,
      isBookmarked: false
    }

    const updatedMaterials = [...materials, newMaterial]
    setMaterials(updatedMaterials)
    localStorage.setItem(`materials_${courseId}`, JSON.stringify(updatedMaterials))

    setShowMaterialModal(false)
    setMaterialData({
      title: '',
      description: '',
      category: '',
      type: 'document',
      url: '',
      file: null,
      tags: ''
    })
    alert('学习资料已添加！')
  }

  const addNote = () => {
    if (!noteData.title || !noteData.content) {
      alert('请填写标题和内容')
      return
    }

    const newNote = {
      id: Date.now().toString(),
      title: noteData.title,
      content: noteData.content,
      category: noteData.category || 'general',
      tags: noteData.tags.split(',').map(tag => tag.trim()),
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      isPublic: noteData.isPublic,
      wordCount: noteData.content.split(/\s+/).length
    }

    const updatedNotes = [...notes, newNote]
    setNotes(updatedNotes)
    localStorage.setItem(`notes_${courseId}`, JSON.stringify(updatedNotes))

    setShowNoteModal(false)
    setNoteData({
      title: '',
      content: '',
      category: '',
      tags: '',
      isPublic: false
    })
    alert('笔记已保存！')
  }

  const addStudyGuide = () => {
    if (!guideData.title || !guideData.sections) {
      alert('请填写标题和章节内容')
      return
    }

    const newGuide = {
      id: Date.now().toString(),
      title: guideData.title,
      description: guideData.description,
      sections: guideData.sections,
      category: guideData.category || 'general',
      targetAudience: guideData.targetAudience,
      createdDate: new Date().toISOString().split('T')[0],
      views: 0,
      rating: 0
    }

    const updatedGuides = [...studyGuides, newGuide]
    setStudyGuides(updatedGuides)
    localStorage.setItem(`studyGuides_${courseId}`, JSON.stringify(updatedGuides))

    setShowGuideModal(false)
    setGuideData({
      title: '',
      description: '',
      sections: '',
      category: '',
      targetAudience: 'personal'
    })
    alert('学习指南已创建！')
  }

  const addCategory = () => {
    if (!newCategory.name) {
      alert('请输入分类名称')
      return
    }

    const category = {
      id: Date.now().toString(),
      name: newCategory.name,
      description: newCategory.description,
      color: newCategory.color,
      count: 0
    }

    const updatedCategories = [...categories, category]
    setCategories(updatedCategories)
    localStorage.setItem(`categories_${courseId}`, JSON.stringify(updatedCategories))

    setShowCategoryModal(false)
    setNewCategory({ name: '', description: '', color: '#3498db' })
    alert('分类已添加！')
  }

  const toggleBookmark = (materialId) => {
    const updatedMaterials = materials.map(material => 
      material.id === materialId 
        ? { ...material, isBookmarked: !material.isBookmarked }
        : material
    )
    setMaterials(updatedMaterials)
    localStorage.setItem(`materials_${courseId}`, JSON.stringify(updatedMaterials))
  }

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = !selectedCategory || material.category === selectedCategory
    const matchesType = !selectedType || material.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const getTypeIcon = (type) => {
    switch (type) {
      case 'document': return '📄'
      case 'video': return '🎥'
      case 'code': return '💻'
      case 'collection': return '📚'
      case 'website': return '🌐'
      default: return '📄'
    }
  }

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.color : '#3498db'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN')
  }

  const exportPortfolio = () => {
    const portfolioData = {
      materials,
      categories,
      bookmarks,
      notes,
      studyGuides,
      achievements,
      certificates,
      exportDate: new Date().toISOString(),
      courseId
    }
    
    const dataStr = JSON.stringify(portfolioData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `portfolio_${courseId}_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    
    URL.revokeObjectURL(url)
    alert('学习档案已导出！')
  }

  const renderOrganize = () => (
    <div className="organize-tab">
      <div className="tab-header">
        <h3>资料分类管理</h3>
        <div className="organize-actions">
          <button 
            className="action-btn"
            onClick={() => setShowCategoryModal(true)}
          >
            新建分类
          </button>
          <button 
            className="action-btn"
            onClick={() => setShowMaterialModal(true)}
          >
            添加资料
          </button>
        </div>
      </div>

      <div className="categories-grid">
        {categories.map(category => (
          <div 
            key={category.id} 
            className="category-card"
            style={{ borderLeftColor: category.color }}
          >
            <div className="category-header">
              <div className="category-info">
                <h4>{category.name}</h4>
                <p>{category.description}</p>
              </div>
              <div className="category-count">
                <span className="count-number">{category.count}</span>
                <span className="count-label">项目</span>
              </div>
            </div>
            <div className="category-actions">
              <button className="category-action-btn">查看</button>
              <button className="category-action-btn">编辑</button>
            </div>
          </div>
        ))}
      </div>

      <div className="materials-section">
        <div className="materials-header">
          <h4>学习资料</h4>
          <div className="materials-filters">
            <input
              type="text"
              placeholder="搜索资料..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="">所有分类</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="">所有类型</option>
              <option value="document">文档</option>
              <option value="video">视频</option>
              <option value="code">代码</option>
              <option value="collection">合集</option>
              <option value="website">网站</option>
            </select>
          </div>
        </div>

        <div className="materials-grid">
          {filteredMaterials.map(material => (
            <div key={material.id} className="material-card">
              <div className="material-header">
                <div className="material-type">
                  <span className="type-icon">{getTypeIcon(material.type)}</span>
                  <span className="type-text">{material.type}</span>
                </div>
                <button 
                  className={`bookmark-btn ${material.isBookmarked ? 'bookmarked' : ''}`}
                  onClick={() => toggleBookmark(material.id)}
                >
                  {material.isBookmarked ? '⭐' : '☆'}
                </button>
              </div>
              
              <div className="material-content">
                <h5>{material.title}</h5>
                <p>{material.description}</p>
                
                <div className="material-tags">
                  {material.tags.map((tag, index) => (
                    <span key={index} className="material-tag">{tag}</span>
                  ))}
                </div>
                
                <div className="material-meta">
                  <span>上传: {formatDate(material.uploadDate)}</span>
                  <span>大小: {material.fileSize}</span>
                  <span>查看: {material.views}次</span>
                </div>
              </div>
              
              <div className="material-actions">
                <button className="material-action-btn">打开</button>
                <button className="material-action-btn">分享</button>
                <button className="material-action-btn">编辑</button>
              </div>
            </div>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="empty-state">
            <p>没有找到匹配的学习资料</p>
            <button 
              className="primary-btn"
              onClick={() => setShowMaterialModal(true)}
            >
              添加第一个资料
            </button>
          </div>
        )}
      </div>
    </div>
  )

  const renderKnowledgeBase = () => (
    <div className="knowledge-base-tab">
      <div className="tab-header">
        <h3>个人知识库</h3>
        <button 
          className="primary-btn"
          onClick={() => setShowNoteModal(true)}
        >
          新建笔记
        </button>
      </div>

      <div className="notes-grid">
        {notes.map(note => (
          <div key={note.id} className="note-card">
            <div className="note-header">
              <h4>{note.title}</h4>
              <div className="note-meta">
                {note.isPublic && <span className="public-badge">公开</span>}
                <span className="note-date">{formatDate(note.createdDate)}</span>
              </div>
            </div>
            
            <div className="note-content">
              <p>{note.content.substring(0, 200)}...</p>
            </div>
            
            <div className="note-footer">
              <div className="note-tags">
                {note.tags.map((tag, index) => (
                  <span key={index} className="note-tag">{tag}</span>
                ))}
              </div>
              <div className="note-stats">
                <span>{note.wordCount} 字</span>
                <span>最后修改: {formatDate(note.lastModified)}</span>
              </div>
            </div>
            
            <div className="note-actions">
              <button className="note-action-btn">查看</button>
              <button className="note-action-btn">编辑</button>
              <button className="note-action-btn">分享</button>
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="empty-state">
          <p>还没有创建任何笔记</p>
          <button 
            className="primary-btn"
            onClick={() => setShowNoteModal(true)}
          >
            创建第一篇笔记
          </button>
        </div>
      )}
    </div>
  )

  const renderBookmarks = () => (
    <div className="bookmarks-tab">
      <div className="tab-header">
        <h3>重要资源收藏</h3>
        <button className="primary-btn">添加书签</button>
      </div>

      <div className="bookmarks-grid">
        {bookmarks.map(bookmark => (
          <div key={bookmark.id} className="bookmark-card">
            <div className="bookmark-header">
              <h4>{bookmark.title}</h4>
              <span className="bookmark-visits">{bookmark.visits} 次访问</span>
            </div>
            
            <p className="bookmark-description">{bookmark.description}</p>
            <a href={bookmark.url} className="bookmark-url" target="_blank" rel="noopener noreferrer">
              {bookmark.url}
            </a>
            
            <div className="bookmark-tags">
              {bookmark.tags.map((tag, index) => (
                <span key={index} className="bookmark-tag">{tag}</span>
              ))}
            </div>
            
            <div className="bookmark-footer">
              <span className="bookmark-date">添加于: {formatDate(bookmark.addedDate)}</span>
              <div className="bookmark-actions">
                <button className="bookmark-action-btn">访问</button>
                <button className="bookmark-action-btn">编辑</button>
                <button className="bookmark-action-btn">删除</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderStudyGuides = () => (
    <div className="study-guides-tab">
      <div className="tab-header">
        <h3>学习指南</h3>
        <button 
          className="primary-btn"
          onClick={() => setShowGuideModal(true)}
        >
          创建指南
        </button>
      </div>

      <div className="guides-grid">
        {studyGuides.map(guide => (
          <div key={guide.id} className="guide-card">
            <div className="guide-header">
              <h4>{guide.title}</h4>
              <div className="guide-meta">
                <span className="guide-audience">
                  {guide.targetAudience === 'public' ? '公开' : '私人'}
                </span>
                <span className="guide-rating">⭐ {guide.rating}</span>
              </div>
            </div>
            
            <p className="guide-description">{guide.description}</p>
            
            <div className="guide-sections">
              <h5>章节内容:</h5>
              <div className="sections-preview">
                {guide.sections.split('\n').slice(0, 3).map((section, index) => (
                  <div key={index} className="section-item">{section}</div>
                ))}
                {guide.sections.split('\n').length > 3 && (
                  <div className="more-sections">还有 {guide.sections.split('\n').length - 3} 个章节...</div>
                )}
              </div>
            </div>
            
            <div className="guide-footer">
              <div className="guide-stats">
                <span>{guide.views} 次浏览</span>
                <span>创建于: {formatDate(guide.createdDate)}</span>
              </div>
              <div className="guide-actions">
                <button className="guide-action-btn">查看</button>
                <button className="guide-action-btn">编辑</button>
                <button className="guide-action-btn">分享</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAchievements = () => (
    <div className="achievements-tab">
      <div className="tab-header">
        <h3>成就展示</h3>
        <div className="achievements-stats">
          <div className="stat-item">
            <span className="stat-number">{achievements.filter(a => a.progress === 100).length}</span>
            <span className="stat-label">已完成</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{achievements.reduce((sum, a) => sum + a.points, 0)}</span>
            <span className="stat-label">总积分</span>
          </div>
        </div>
      </div>

      <div className="achievements-grid">
        {achievements.map(achievement => (
          <div key={achievement.id} className={`achievement-card ${achievement.progress === 100 ? 'completed' : 'in-progress'}`}>
            <div className="achievement-header">
              <div className="achievement-badge">{achievement.badge}</div>
              <div className="achievement-info">
                <h4>{achievement.title}</h4>
                <span className="achievement-type">{achievement.type}</span>
              </div>
              <div className="achievement-points">{achievement.points}分</div>
            </div>
            
            <p className="achievement-description">{achievement.description}</p>
            
            <div className="achievement-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
              <span className="progress-text">{achievement.progress}%</span>
            </div>
            
            <div className="achievement-footer">
              {achievement.achievedDate ? (
                <span className="achievement-date">完成于: {formatDate(achievement.achievedDate)}</span>
              ) : (
                <span className="achievement-status">进行中</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderCertificates = () => (
    <div className="certificates-tab">
      <div className="tab-header">
        <h3>认证证书</h3>
        <div className="certificates-stats">
          <span>已获得 {certificates.filter(c => c.status === 'verified').length} 个认证</span>
        </div>
      </div>

      <div className="certificates-grid">
        {certificates.map(certificate => (
          <div key={certificate.id} className={`certificate-card ${certificate.status}`}>
            <div className="certificate-header">
              <h4>{certificate.title}</h4>
              <span className={`certificate-status ${certificate.status}`}>
                {certificate.status === 'verified' ? '已验证' : 
                 certificate.status === 'pending' ? '待验证' : '已过期'}
              </span>
            </div>
            
            <div className="certificate-details">
              <div className="detail-row">
                <span className="detail-label">颁发机构:</span>
                <span className="detail-value">{certificate.issuer}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">颁发日期:</span>
                <span className="detail-value">{formatDate(certificate.issueDate)}</span>
              </div>
              {certificate.validUntil && (
                <div className="detail-row">
                  <span className="detail-label">有效期至:</span>
                  <span className="detail-value">{formatDate(certificate.validUntil)}</span>
                </div>
              )}
              <div className="detail-row">
                <span className="detail-label">证书编号:</span>
                <span className="detail-value">{certificate.credentialId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">认证级别:</span>
                <span className="detail-value">{certificate.level}</span>
              </div>
            </div>
            
            <div className="certificate-skills">
              <h5>相关技能:</h5>
              <div className="skills-list">
                {certificate.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="certificate-actions">
              <button className="certificate-action-btn">查看详情</button>
              <button className="certificate-action-btn">验证</button>
              <button className="certificate-action-btn">分享</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Layout>
      <div className="materials-portfolio-container">
        <div className="materials-header">
          <div className="header-left">
            <h1>学习资料与成果档案</h1>
            <div className="breadcrumb">
              <span onClick={() => navigate(`/student/dashboard`)}>学生工作台</span>
              <span>/</span>
              <span>成果展示</span>
              <span>/</span>
              <span>学习档案</span>
            </div>
          </div>
          
          <div className="header-actions">
            <button 
              className="nav-btn"
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/achievements/poster-upload`)}
            >
              海报制作
            </button>
            <button 
              className="nav-btn"
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/achievements/report-submission`)}
            >
              报告提交
            </button>
            <button 
              className="nav-btn"
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/achievements/defense-preparation`)}
            >
              答辩准备
            </button>
            <button className="action-btn" onClick={exportPortfolio}>
              导出档案
            </button>
          </div>
        </div>

        <div className="materials-tabs">
          <button 
            className={`tab-btn ${selectedTab === 'organize' ? 'active' : ''}`}
            onClick={() => setSelectedTab('organize')}
          >
            资料整理
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'knowledge' ? 'active' : ''}`}
            onClick={() => setSelectedTab('knowledge')}
          >
            知识库
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'bookmarks' ? 'active' : ''}`}
            onClick={() => setSelectedTab('bookmarks')}
          >
            重要收藏
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'guides' ? 'active' : ''}`}
            onClick={() => setSelectedTab('guides')}
          >
            学习指南
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setSelectedTab('achievements')}
          >
            成就展示
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'certificates' ? 'active' : ''}`}
            onClick={() => setSelectedTab('certificates')}
          >
            认证证书
          </button>
        </div>

        <div className="materials-content">
          {selectedTab === 'organize' && renderOrganize()}
          {selectedTab === 'knowledge' && renderKnowledgeBase()}
          {selectedTab === 'bookmarks' && renderBookmarks()}
          {selectedTab === 'guides' && renderStudyGuides()}
          {selectedTab === 'achievements' && renderAchievements()}
          {selectedTab === 'certificates' && renderCertificates()}
        </div>

        {/* Material Modal */}
        {showMaterialModal && (
          <div className="modal" onClick={() => setShowMaterialModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>添加学习资料</h2>
                <button onClick={() => setShowMaterialModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>资料标题 *</label>
                  <input
                    type="text"
                    value={materialData.title}
                    onChange={(e) => setMaterialData({ ...materialData, title: e.target.value })}
                    placeholder="请输入资料标题"
                  />
                </div>
                <div className="form-group">
                  <label>资料描述</label>
                  <textarea
                    value={materialData.description}
                    onChange={(e) => setMaterialData({ ...materialData, description: e.target.value })}
                    placeholder="请描述资料内容"
                    rows="3"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>分类</label>
                    <select
                      value={materialData.category}
                      onChange={(e) => setMaterialData({ ...materialData, category: e.target.value })}
                    >
                      <option value="">选择分类</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>资料类型</label>
                    <select
                      value={materialData.type}
                      onChange={(e) => setMaterialData({ ...materialData, type: e.target.value })}
                    >
                      <option value="document">文档</option>
                      <option value="video">视频</option>
                      <option value="code">代码</option>
                      <option value="collection">合集</option>
                      <option value="website">网站</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>资源链接</label>
                  <input
                    type="url"
                    value={materialData.url}
                    onChange={(e) => setMaterialData({ ...materialData, url: e.target.value })}
                    placeholder="https://example.com/resource"
                  />
                </div>
                <div className="form-group">
                  <label>或上传文件</label>
                  <input
                    type="file"
                    onChange={(e) => setMaterialData({ ...materialData, file: e.target.files[0] })}
                  />
                </div>
                <div className="form-group">
                  <label>标签</label>
                  <input
                    type="text"
                    value={materialData.tags}
                    onChange={(e) => setMaterialData({ ...materialData, tags: e.target.value })}
                    placeholder="多个标签用逗号分隔"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowMaterialModal(false)}>
                  取消
                </button>
                <button className="btn-primary" onClick={addMaterial}>
                  添加
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Note Modal */}
        {showNoteModal && (
          <div className="modal" onClick={() => setShowNoteModal(false)}>
            <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>创建笔记</h2>
                <button onClick={() => setShowNoteModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>笔记标题 *</label>
                  <input
                    type="text"
                    value={noteData.title}
                    onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
                    placeholder="请输入笔记标题"
                  />
                </div>
                <div className="form-group">
                  <label>笔记内容 *</label>
                  <textarea
                    value={noteData.content}
                    onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
                    placeholder="请输入笔记内容"
                    rows="10"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>分类</label>
                    <select
                      value={noteData.category}
                      onChange={(e) => setNoteData({ ...noteData, category: e.target.value })}
                    >
                      <option value="">选择分类</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>标签</label>
                    <input
                      type="text"
                      value={noteData.tags}
                      onChange={(e) => setNoteData({ ...noteData, tags: e.target.value })}
                      placeholder="多个标签用逗号分隔"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={noteData.isPublic}
                      onChange={(e) => setNoteData({ ...noteData, isPublic: e.target.checked })}
                    />
                    公开分享此笔记
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowNoteModal(false)}>
                  取消
                </button>
                <button className="btn-primary" onClick={addNote}>
                  保存
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Study Guide Modal */}
        {showGuideModal && (
          <div className="modal" onClick={() => setShowGuideModal(false)}>
            <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>创建学习指南</h2>
                <button onClick={() => setShowGuideModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>指南标题 *</label>
                  <input
                    type="text"
                    value={guideData.title}
                    onChange={(e) => setGuideData({ ...guideData, title: e.target.value })}
                    placeholder="请输入学习指南标题"
                  />
                </div>
                <div className="form-group">
                  <label>指南描述</label>
                  <textarea
                    value={guideData.description}
                    onChange={(e) => setGuideData({ ...guideData, description: e.target.value })}
                    placeholder="请描述这个学习指南的目标和适用人群"
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>章节内容 *</label>
                  <textarea
                    value={guideData.sections}
                    onChange={(e) => setGuideData({ ...guideData, sections: e.target.value })}
                    placeholder="请输入章节内容，每行一个章节"
                    rows="8"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>分类</label>
                    <select
                      value={guideData.category}
                      onChange={(e) => setGuideData({ ...guideData, category: e.target.value })}
                    >
                      <option value="">选择分类</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>分享范围</label>
                    <select
                      value={guideData.targetAudience}
                      onChange={(e) => setGuideData({ ...guideData, targetAudience: e.target.value })}
                    >
                      <option value="personal">仅自己可见</option>
                      <option value="public">公开分享</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowGuideModal(false)}>
                  取消
                </button>
                <button className="btn-primary" onClick={addStudyGuide}>
                  创建
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Modal */}
        {showCategoryModal && (
          <div className="modal" onClick={() => setShowCategoryModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>新建分类</h2>
                <button onClick={() => setShowCategoryModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>分类名称 *</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="请输入分类名称"
                  />
                </div>
                <div className="form-group">
                  <label>分类描述</label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="请描述这个分类的用途"
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>分类颜色</label>
                  <input
                    type="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowCategoryModal(false)}>
                  取消
                </button>
                <button className="btn-primary" onClick={addCategory}>
                  创建
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default MaterialsPortfolio