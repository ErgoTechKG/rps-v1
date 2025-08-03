import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './PosterUpload.css'

const PosterUpload = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('templates')
  const [templates, setTemplates] = useState([])
  const [uploadedPosters, setUploadedPosters] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [previewPoster, setPreviewPoster] = useState(null)
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    file: null,
    templateId: null
  })
  const [feedback, setFeedback] = useState([])
  const [peerPosters, setPeerPosters] = useState([])

  useEffect(() => {
    loadTemplates()
    loadUploadedPosters()
    loadFeedback()
    loadPeerPosters()
  }, [courseId])

  const loadTemplates = () => {
    const mockTemplates = [
      {
        id: '1',
        name: '科研海报模板A',
        description: '经典学术海报模板，适合理工科研究',
        thumbnail: '/api/placeholder/300/400',
        category: 'academic',
        format: 'A1',
        downloads: 1250
      },
      {
        id: '2',
        name: '现代简约模板',
        description: '简洁现代风格，突出研究重点',
        thumbnail: '/api/placeholder/300/400',
        category: 'modern',
        format: 'A1',
        downloads: 980
      },
      {
        id: '3',
        name: '数据可视化模板',
        description: '专为数据展示设计的模板',
        thumbnail: '/api/placeholder/300/400',
        category: 'data',
        format: 'A1',
        downloads: 760
      },
      {
        id: '4',
        name: '实验流程模板',
        description: '适合展示实验过程和结果',
        thumbnail: '/api/placeholder/300/400',
        category: 'experiment',
        format: 'A1',
        downloads: 890
      },
      {
        id: '5',
        name: '算法展示模板',
        description: '专为算法和方法展示设计',
        thumbnail: '/api/placeholder/300/400',
        category: 'algorithm',
        format: 'A1',
        downloads: 670
      },
      {
        id: '6',
        name: '文献综述模板',
        description: '适合文献综述和理论分析',
        thumbnail: '/api/placeholder/300/400',
        category: 'review',
        format: 'A1',
        downloads: 540
      }
    ]
    setTemplates(mockTemplates)
  }

  const loadUploadedPosters = () => {
    const mockPosters = [
      {
        id: '1',
        title: '深度学习在图像识别中的应用研究',
        description: '本研究探索了卷积神经网络在医学图像识别中的应用',
        uploadDate: '2024-02-20',
        status: 'under_review',
        templateId: '1',
        file: 'poster_v1.pdf',
        size: '2.3 MB',
        format: 'PDF',
        version: 1,
        feedback: [
          {
            id: '1',
            reviewer: 'Prof. Zhang',
            date: '2024-02-21',
            comment: '整体结构清晰，建议增加更多实验数据对比',
            type: 'suggestion'
          }
        ]
      },
      {
        id: '2',
        title: '机器学习算法性能评估',
        description: '对比分析了几种主流机器学习算法的性能表现',
        uploadDate: '2024-02-18',
        status: 'approved',
        templateId: '2',
        file: 'poster_v2.pdf',
        size: '1.8 MB',
        format: 'PDF',
        version: 2,
        feedback: []
      }
    ]
    
    const savedPosters = localStorage.getItem(`posters_${courseId}`)
    if (savedPosters) {
      setUploadedPosters(JSON.parse(savedPosters))
    } else {
      setUploadedPosters(mockPosters)
      localStorage.setItem(`posters_${courseId}`, JSON.stringify(mockPosters))
    }
  }

  const loadFeedback = () => {
    const mockFeedback = [
      {
        id: '1',
        posterId: '1',
        reviewer: '导师',
        date: '2024-02-21',
        comment: '研究思路清晰，建议在方法部分增加更多技术细节。实验结果展示可以更加突出主要发现。',
        type: 'suggestion',
        status: 'pending'
      },
      {
        id: '2',
        posterId: '1',
        reviewer: '同组学生',
        date: '2024-02-22',
        comment: '海报设计美观，但是字体大小建议再调整一下，确保远距离观看时的可读性。',
        type: 'design',
        status: 'addressed'
      }
    ]
    setFeedback(mockFeedback)
  }

  const loadPeerPosters = () => {
    const mockPeerPosters = [
      {
        id: '1',
        title: '自然语言处理在智能问答中的应用',
        author: '张同学',
        thumbnail: '/api/placeholder/200/280',
        likes: 15,
        comments: 8,
        category: 'AI'
      },
      {
        id: '2',
        title: '区块链技术在供应链管理中的研究',
        author: '李同学',
        thumbnail: '/api/placeholder/200/280',
        likes: 12,
        comments: 6,
        category: 'Blockchain'
      },
      {
        id: '3',
        title: '计算机视觉在自动驾驶中的创新应用',
        author: '王同学',
        thumbnail: '/api/placeholder/200/280',
        likes: 18,
        comments: 10,
        category: 'Computer Vision'
      },
      {
        id: '4',
        title: '大数据分析在金融风控中的实践',
        author: '陈同学',
        thumbnail: '/api/placeholder/200/280',
        likes: 9,
        comments: 4,
        category: 'Big Data'
      }
    ]
    setPeerPosters(mockPeerPosters)
  }

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    setUploadData({ ...uploadData, templateId: template.id })
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setUploadData({ ...uploadData, file })
    }
  }

  const handleUpload = () => {
    if (!uploadData.title || !uploadData.file) {
      alert('请填写海报标题并选择文件')
      return
    }

    const newPoster = {
      id: Date.now().toString(),
      title: uploadData.title,
      description: uploadData.description,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'under_review',
      templateId: uploadData.templateId,
      file: uploadData.file.name,
      size: `${(uploadData.file.size / (1024 * 1024)).toFixed(1)} MB`,
      format: uploadData.file.name.split('.').pop().toUpperCase(),
      version: 1,
      feedback: []
    }

    const updatedPosters = [...uploadedPosters, newPoster]
    setUploadedPosters(updatedPosters)
    localStorage.setItem(`posters_${courseId}`, JSON.stringify(updatedPosters))

    setShowUploadModal(false)
    setUploadData({ title: '', description: '', file: null, templateId: null })
    setSelectedTemplate(null)
    alert('海报上传成功！等待审核中')
  }

  const handlePreview = (poster) => {
    setPreviewPoster(poster)
    setShowPreviewModal(true)
  }

  const downloadTemplate = (template) => {
    alert(`正在下载模板: ${template.name}`)
    // 在实际应用中，这里会触发文件下载
  }

  const downloadPoster = (poster) => {
    alert(`正在下载海报: ${poster.title}`)
    // 在实际应用中，这里会触发文件下载
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#27ae60'
      case 'under_review': return '#f39c12'
      case 'needs_revision': return '#e74c3c'
      default: return '#95a5a6'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return '已通过'
      case 'under_review': return '审核中'
      case 'needs_revision': return '需修改'
      default: return '未知'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN')
  }

  const renderTemplates = () => (
    <div className="templates-tab">
      <div className="tab-header">
        <h3>海报模板</h3>
        <div className="template-filters">
          <select className="filter-select">
            <option value="">所有类别</option>
            <option value="academic">学术研究</option>
            <option value="modern">现代简约</option>
            <option value="data">数据可视化</option>
            <option value="experiment">实验展示</option>
          </select>
          <select className="filter-select">
            <option value="">排序方式</option>
            <option value="downloads">按下载量</option>
            <option value="newest">最新发布</option>
            <option value="name">按名称</option>
          </select>
        </div>
      </div>

      <div className="templates-grid">
        {templates.map(template => (
          <div 
            key={template.id} 
            className={`template-card ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
            onClick={() => handleTemplateSelect(template)}
          >
            <div className="template-thumbnail">
              <img src={template.thumbnail} alt={template.name} />
              <div className="template-overlay">
                <button 
                  className="btn-preview"
                  onClick={(e) => {
                    e.stopPropagation()
                    alert(`预览模板: ${template.name}`)
                  }}
                >
                  预览
                </button>
                <button 
                  className="btn-download"
                  onClick={(e) => {
                    e.stopPropagation()
                    downloadTemplate(template)
                  }}
                >
                  下载
                </button>
              </div>
            </div>
            <div className="template-info">
              <h4>{template.name}</h4>
              <p>{template.description}</p>
              <div className="template-meta">
                <span className="template-format">{template.format}</span>
                <span className="template-downloads">下载: {template.downloads}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="selected-template">
          <h4>已选择模板: {selectedTemplate.name}</h4>
          <button 
            className="primary-btn"
            onClick={() => setShowUploadModal(true)}
          >
            使用此模板创建海报
          </button>
        </div>
      )}
    </div>
  )

  const renderUploads = () => (
    <div className="uploads-tab">
      <div className="tab-header">
        <h3>我的海报</h3>
        <button 
          className="primary-btn"
          onClick={() => setShowUploadModal(true)}
        >
          上传新海报
        </button>
      </div>

      <div className="posters-list">
        {uploadedPosters.map(poster => (
          <div key={poster.id} className="poster-item">
            <div className="poster-header">
              <div className="poster-title-section">
                <h4>{poster.title}</h4>
                <span 
                  className="poster-status"
                  style={{ backgroundColor: getStatusColor(poster.status) }}
                >
                  {getStatusText(poster.status)}
                </span>
              </div>
              <div className="poster-actions">
                <button 
                  className="action-btn"
                  onClick={() => handlePreview(poster)}
                >
                  预览
                </button>
                <button 
                  className="action-btn"
                  onClick={() => downloadPoster(poster)}
                >
                  下载
                </button>
                <button className="action-btn">编辑</button>
              </div>
            </div>
            
            <p className="poster-description">{poster.description}</p>
            
            <div className="poster-meta">
              <div className="meta-left">
                <span>上传时间: {formatDate(poster.uploadDate)}</span>
                <span>文件格式: {poster.format}</span>
                <span>文件大小: {poster.size}</span>
                <span>版本: v{poster.version}</span>
              </div>
            </div>

            {poster.feedback && poster.feedback.length > 0 && (
              <div className="poster-feedback">
                <h5>反馈意见</h5>
                {poster.feedback.map(fb => (
                  <div key={fb.id} className="feedback-item">
                    <div className="feedback-header">
                      <span className="feedback-reviewer">{fb.reviewer}</span>
                      <span className="feedback-date">{formatDate(fb.date)}</span>
                    </div>
                    <p className="feedback-comment">{fb.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {uploadedPosters.length === 0 && (
          <div className="empty-state">
            <p>还没有上传任何海报</p>
            <button 
              className="primary-btn"
              onClick={() => setShowUploadModal(true)}
            >
              上传第一个海报
            </button>
          </div>
        )}
      </div>
    </div>
  )

  const renderGallery = () => (
    <div className="gallery-tab">
      <div className="tab-header">
        <h3>同学作品展示</h3>
        <div className="gallery-filters">
          <select className="filter-select">
            <option value="">所有类别</option>
            <option value="AI">人工智能</option>
            <option value="Blockchain">区块链</option>
            <option value="Computer Vision">计算机视觉</option>
            <option value="Big Data">大数据</option>
          </select>
          <select className="filter-select">
            <option value="newest">最新发布</option>
            <option value="popular">最受欢迎</option>
            <option value="comments">评论最多</option>
          </select>
        </div>
      </div>

      <div className="peer-posters-grid">
        {peerPosters.map(poster => (
          <div key={poster.id} className="peer-poster-card">
            <div className="peer-poster-thumbnail">
              <img src={poster.thumbnail} alt={poster.title} />
              <div className="poster-category">{poster.category}</div>
            </div>
            <div className="peer-poster-info">
              <h4>{poster.title}</h4>
              <p className="poster-author">作者: {poster.author}</p>
              <div className="poster-engagement">
                <span className="poster-likes">❤️ {poster.likes}</span>
                <span className="poster-comments">💬 {poster.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderGuidelines = () => (
    <div className="guidelines-tab">
      <h3>海报制作指南</h3>
      
      <div className="guidelines-content">
        <div className="guideline-section">
          <h4>1. 设计原则</h4>
          <ul>
            <li>保持简洁明了，突出重点内容</li>
            <li>使用清晰易读的字体，建议字号不小于24pt</li>
            <li>合理运用颜色对比，确保文字清晰可见</li>
            <li>留出适当的空白空间，避免过于拥挤</li>
          </ul>
        </div>

        <div className="guideline-section">
          <h4>2. 内容结构</h4>
          <ul>
            <li>标题：简洁明了，吸引眼球</li>
            <li>研究背景：简述研究问题和意义</li>
            <li>研究方法：清晰描述采用的方法</li>
            <li>主要结果：突出展示核心发现</li>
            <li>结论：总结研究贡献和意义</li>
            <li>参考文献：列出主要参考资料</li>
          </ul>
        </div>

        <div className="guideline-section">
          <h4>3. 技术要求</h4>
          <ul>
            <li>推荐尺寸：A1 (594mm × 841mm)</li>
            <li>分辨率：至少300 DPI</li>
            <li>文件格式：PDF或高清PNG</li>
            <li>文件大小：不超过10MB</li>
          </ul>
        </div>

        <div className="guideline-section">
          <h4>4. 评审标准</h4>
          <ul>
            <li>内容质量：研究深度和创新性</li>
            <li>设计美观：视觉效果和排版</li>
            <li>逻辑清晰：结构合理，表达清楚</li>
            <li>技术规范：符合格式要求</li>
          </ul>
        </div>
      </div>
    </div>
  )

  return (
    <Layout>
      <div className="poster-upload-container">
        <div className="poster-header">
          <div className="header-left">
            <h1>研究海报创建与提交</h1>
            <div className="breadcrumb">
              <span onClick={() => navigate(`/student/dashboard`)}>学生工作台</span>
              <span>/</span>
              <span>成果展示</span>
              <span>/</span>
              <span>海报制作</span>
            </div>
          </div>
          
          <div className="header-actions">
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
            <button 
              className="nav-btn"
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/achievements/materials`)}
            >
              学习资料
            </button>
          </div>
        </div>

        <div className="poster-tabs">
          <button 
            className={`tab-btn ${selectedTab === 'templates' ? 'active' : ''}`}
            onClick={() => setSelectedTab('templates')}
          >
            模板库
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'uploads' ? 'active' : ''}`}
            onClick={() => setSelectedTab('uploads')}
          >
            我的海报
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setSelectedTab('gallery')}
          >
            作品展示
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'guidelines' ? 'active' : ''}`}
            onClick={() => setSelectedTab('guidelines')}
          >
            制作指南
          </button>
        </div>

        <div className="poster-content">
          {selectedTab === 'templates' && renderTemplates()}
          {selectedTab === 'uploads' && renderUploads()}
          {selectedTab === 'gallery' && renderGallery()}
          {selectedTab === 'guidelines' && renderGuidelines()}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="modal" onClick={() => setShowUploadModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>上传海报</h2>
                <button onClick={() => setShowUploadModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>海报标题 *</label>
                  <input
                    type="text"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                    placeholder="请输入海报标题"
                  />
                </div>
                <div className="form-group">
                  <label>描述说明</label>
                  <textarea
                    value={uploadData.description}
                    onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                    placeholder="请简要描述海报内容"
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>选择文件 *</label>
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                  />
                  <small>支持格式：PDF, PNG, JPG，文件大小不超过10MB</small>
                </div>
                {selectedTemplate && (
                  <div className="form-group">
                    <label>使用模板</label>
                    <div className="selected-template-info">
                      <span>{selectedTemplate.name}</span>
                      <button 
                        className="btn-change"
                        onClick={() => {
                          setSelectedTemplate(null)
                          setUploadData({ ...uploadData, templateId: null })
                        }}
                      >
                        更换
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowUploadModal(false)}>
                  取消
                </button>
                <button className="btn-primary" onClick={handleUpload}>
                  上传
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreviewModal && previewPoster && (
          <div className="modal" onClick={() => setShowPreviewModal(false)}>
            <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{previewPoster.title}</h2>
                <button onClick={() => setShowPreviewModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="preview-content">
                  <div className="preview-image">
                    <div className="placeholder-preview">
                      <p>海报预览区域</p>
                      <small>文件: {previewPoster.file}</small>
                    </div>
                  </div>
                  <div className="preview-info">
                    <h4>海报信息</h4>
                    <p><strong>描述：</strong>{previewPoster.description}</p>
                    <p><strong>状态：</strong>{getStatusText(previewPoster.status)}</p>
                    <p><strong>格式：</strong>{previewPoster.format}</p>
                    <p><strong>大小：</strong>{previewPoster.size}</p>
                    <p><strong>上传时间：</strong>{formatDate(previewPoster.uploadDate)}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowPreviewModal(false)}>
                  关闭
                </button>
                <button className="btn-primary" onClick={() => downloadPoster(previewPoster)}>
                  下载
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default PosterUpload