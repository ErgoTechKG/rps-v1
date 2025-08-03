import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './ReportSubmission.css'

const ReportSubmission = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('writing')
  const [reportData, setReportData] = useState({
    title: '',
    abstract: '',
    introduction: '',
    methodology: '',
    results: '',
    discussion: '',
    conclusion: '',
    references: ''
  })
  const [submittedReports, setSubmittedReports] = useState([])
  const [drafts, setDrafts] = useState([])
  const [templates, setTemplates] = useState([])
  const [citations, setCitations] = useState([])
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showCitationModal, setShowCitationModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [newCitation, setNewCitation] = useState({
    type: 'article',
    title: '',
    authors: '',
    journal: '',
    year: '',
    pages: '',
    doi: ''
  })
  const [progress, setProgress] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [feedback, setFeedback] = useState([])

  useEffect(() => {
    loadSubmittedReports()
    loadDrafts()
    loadTemplates()
    loadCitations()
    loadFeedback()
    calculateProgress()
    calculateWordCount()
  }, [courseId, reportData])

  const loadSubmittedReports = () => {
    const mockReports = [
      {
        id: '1',
        title: '深度学习在图像识别中的应用研究',
        submitDate: '2024-02-20',
        status: 'under_review',
        version: 1,
        wordCount: 5240,
        fileSize: '1.2 MB',
        grade: null,
        feedback: [
          {
            id: '1',
            reviewer: 'Prof. Zhang',
            date: '2024-02-22',
            comment: '研究方向正确，但需要补充更多实验数据和对比分析',
            section: 'results'
          }
        ]
      },
      {
        id: '2',
        title: '机器学习算法性能评估报告',
        submitDate: '2024-02-15',
        status: 'approved',
        version: 2,
        wordCount: 4890,
        fileSize: '980 KB',
        grade: 85,
        feedback: []
      }
    ]
    
    const savedReports = localStorage.getItem(`reports_${courseId}`)
    if (savedReports) {
      setSubmittedReports(JSON.parse(savedReports))
    } else {
      setSubmittedReports(mockReports)
      localStorage.setItem(`reports_${courseId}`, JSON.stringify(mockReports))
    }
  }

  const loadDrafts = () => {
    const mockDrafts = [
      {
        id: '1',
        title: '深度学习模型优化策略研究',
        lastModified: '2024-02-25',
        wordCount: 2340,
        progress: 45,
        sections: {
          abstract: true,
          introduction: true,
          methodology: false,
          results: false,
          discussion: false,
          conclusion: false
        }
      },
      {
        id: '2',
        title: '计算机视觉前沿技术综述',
        lastModified: '2024-02-23',
        wordCount: 1820,
        progress: 30,
        sections: {
          abstract: true,
          introduction: false,
          methodology: false,
          results: false,
          discussion: false,
          conclusion: false
        }
      }
    ]
    
    const savedDrafts = localStorage.getItem(`drafts_${courseId}`)
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts))
    } else {
      setDrafts(mockDrafts)
      localStorage.setItem(`drafts_${courseId}`, JSON.stringify(mockDrafts))
    }
  }

  const loadTemplates = () => {
    const mockTemplates = [
      {
        id: '1',
        name: '标准学术报告模板',
        description: '适用于一般学术研究报告的标准格式',
        sections: ['摘要', '引言', '文献综述', '研究方法', '实验结果', '讨论分析', '结论', '参考文献'],
        wordLimit: 6000,
        format: 'IEEE'
      },
      {
        id: '2',
        name: '实验报告模板',
        description: '专为实验性研究设计的报告模板',
        sections: ['摘要', '背景介绍', '实验设计', '实验过程', '结果分析', '结论与展望', '参考文献'],
        wordLimit: 5000,
        format: 'ACM'
      },
      {
        id: '3',
        name: '综述报告模板',
        description: '适用于文献综述和理论分析的模板',
        sections: ['摘要', '引言', '文献综述', '理论分析', '发展趋势', '总结', '参考文献'],
        wordLimit: 8000,
        format: 'APA'
      }
    ]
    setTemplates(mockTemplates)
  }

  const loadCitations = () => {
    const mockCitations = [
      {
        id: '1',
        type: 'article',
        title: 'Deep Learning for Computer Vision',
        authors: 'LeCun, Y., Bengio, Y., Hinton, G.',
        journal: 'Nature',
        year: '2015',
        pages: '436-444',
        doi: '10.1038/nature14539'
      },
      {
        id: '2',
        type: 'conference',
        title: 'ImageNet Classification with Deep Convolutional Neural Networks',
        authors: 'Krizhevsky, A., Sutskever, I., Hinton, G.',
        conference: 'NIPS',
        year: '2012',
        pages: '1097-1105'
      }
    ]
    
    const savedCitations = localStorage.getItem(`citations_${courseId}`)
    if (savedCitations) {
      setCitations(JSON.parse(savedCitations))
    } else {
      setCitations(mockCitations)
      localStorage.setItem(`citations_${courseId}`, JSON.stringify(mockCitations))
    }
  }

  const loadFeedback = () => {
    const mockFeedback = [
      {
        id: '1',
        reportId: '1',
        reviewer: '指导教师',
        date: '2024-02-22',
        section: '研究方法',
        comment: '研究方法部分需要更详细的描述，建议增加算法流程图',
        type: 'suggestion',
        status: 'pending'
      },
      {
        id: '2',
        reportId: '1',
        reviewer: '同行评议',
        date: '2024-02-23',
        section: '实验结果',
        comment: '实验结果展示清晰，但建议添加更多对比实验',
        type: 'improvement',
        status: 'addressed'
      }
    ]
    setFeedback(mockFeedback)
  }

  const calculateProgress = () => {
    const sections = Object.keys(reportData)
    const completedSections = sections.filter(section => reportData[section].trim().length > 0)
    const progressPercentage = Math.round((completedSections.length / sections.length) * 100)
    setProgress(progressPercentage)
  }

  const calculateWordCount = () => {
    const allText = Object.values(reportData).join(' ')
    const words = allText.trim().split(/\s+/).filter(word => word.length > 0)
    setWordCount(words.length)
  }

  const handleSectionUpdate = (section, value) => {
    setReportData({ ...reportData, [section]: value })
  }

  const saveDraft = () => {
    const draft = {
      id: Date.now().toString(),
      title: reportData.title || '未命名草稿',
      lastModified: new Date().toISOString().split('T')[0],
      wordCount: wordCount,
      progress: progress,
      data: reportData,
      sections: {
        abstract: !!reportData.abstract,
        introduction: !!reportData.introduction,
        methodology: !!reportData.methodology,
        results: !!reportData.results,
        discussion: !!reportData.discussion,
        conclusion: !!reportData.conclusion
      }
    }

    const updatedDrafts = [...drafts, draft]
    setDrafts(updatedDrafts)
    localStorage.setItem(`drafts_${courseId}`, JSON.stringify(updatedDrafts))
    alert('草稿已保存！')
  }

  const loadDraft = (draft) => {
    setReportData(draft.data)
    alert(`已加载草稿: ${draft.title}`)
  }

  const submitReport = () => {
    if (!reportData.title || !reportData.abstract || !reportData.introduction) {
      alert('请至少完成报告标题、摘要和引言部分')
      return
    }

    const newReport = {
      id: Date.now().toString(),
      title: reportData.title,
      submitDate: new Date().toISOString().split('T')[0],
      status: 'under_review',
      version: 1,
      wordCount: wordCount,
      fileSize: `${Math.round(wordCount * 0.005)} KB`,
      grade: null,
      data: reportData,
      feedback: []
    }

    const updatedReports = [...submittedReports, newReport]
    setSubmittedReports(updatedReports)
    localStorage.setItem(`reports_${courseId}`, JSON.stringify(updatedReports))

    // Clear current report data
    setReportData({
      title: '',
      abstract: '',
      introduction: '',
      methodology: '',
      results: '',
      discussion: '',
      conclusion: '',
      references: ''
    })

    setShowSubmitModal(false)
    alert('报告提交成功！')
  }

  const addCitation = () => {
    if (!newCitation.title || !newCitation.authors) {
      alert('请填写必填字段')
      return
    }

    const citation = {
      id: Date.now().toString(),
      ...newCitation
    }

    const updatedCitations = [...citations, citation]
    setCitations(updatedCitations)
    localStorage.setItem(`citations_${courseId}`, JSON.stringify(updatedCitations))

    setNewCitation({
      type: 'article',
      title: '',
      authors: '',
      journal: '',
      year: '',
      pages: '',
      doi: ''
    })
    setShowCitationModal(false)
    alert('参考文献已添加！')
  }

  const insertCitation = (citation) => {
    const citationText = formatCitation(citation)
    const currentReferences = reportData.references
    const updatedReferences = currentReferences ? `${currentReferences}\n\n${citationText}` : citationText
    setReportData({ ...reportData, references: updatedReferences })
    alert('引用已插入到参考文献中')
  }

  const formatCitation = (citation) => {
    if (citation.type === 'article') {
      return `${citation.authors} (${citation.year}). ${citation.title}. ${citation.journal}, ${citation.pages}. DOI: ${citation.doi}`
    } else if (citation.type === 'conference') {
      return `${citation.authors} (${citation.year}). ${citation.title}. In Proceedings of ${citation.conference}, ${citation.pages}.`
    }
    return `${citation.authors} (${citation.year}). ${citation.title}.`
  }

  const useTemplate = (template) => {
    setSelectedTemplate(template)
    // Initialize sections based on template
    const templateData = { ...reportData }
    template.sections.forEach(section => {
      const sectionKey = section.toLowerCase().replace(/\s+/g, '')
      if (!templateData[sectionKey]) {
        templateData[sectionKey] = ''
      }
    })
    setReportData(templateData)
    setShowTemplateModal(false)
    alert(`已应用模板: ${template.name}`)
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

  const renderWriting = () => (
    <div className="writing-tab">
      <div className="writing-header">
        <div className="writing-stats">
          <div className="stat-item">
            <span className="stat-number">{wordCount}</span>
            <span className="stat-label">字数</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{progress}%</span>
            <span className="stat-label">完成度</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{citations.length}</span>
            <span className="stat-label">参考文献</span>
          </div>
        </div>
        <div className="writing-actions">
          <button className="action-btn" onClick={() => setShowTemplateModal(true)}>
            选择模板
          </button>
          <button className="action-btn" onClick={() => setShowCitationModal(true)}>
            添加引用
          </button>
          <button className="action-btn" onClick={saveDraft}>
            保存草稿
          </button>
          <button className="primary-btn" onClick={() => setShowSubmitModal(true)}>
            提交报告
          </button>
        </div>
      </div>

      <div className="progress-indicator">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="progress-text">报告完成度: {progress}%</span>
      </div>

      <div className="writing-sections">
        <div className="section-group">
          <label>报告标题 *</label>
          <input
            type="text"
            value={reportData.title}
            onChange={(e) => handleSectionUpdate('title', e.target.value)}
            placeholder="请输入报告标题"
            className="title-input"
          />
        </div>

        <div className="section-group">
          <label>摘要 *</label>
          <textarea
            value={reportData.abstract}
            onChange={(e) => handleSectionUpdate('abstract', e.target.value)}
            placeholder="请输入摘要内容（建议200-300字）"
            rows="4"
            className="section-textarea"
          />
          <div className="section-info">
            <span>字数: {reportData.abstract.length}</span>
            <span>建议: 200-300字</span>
          </div>
        </div>

        <div className="section-group">
          <label>引言 *</label>
          <textarea
            value={reportData.introduction}
            onChange={(e) => handleSectionUpdate('introduction', e.target.value)}
            placeholder="请输入引言内容，包括研究背景、问题陈述和研究目标"
            rows="6"
            className="section-textarea"
          />
          <div className="section-info">
            <span>字数: {reportData.introduction.length}</span>
            <span>建议: 800-1200字</span>
          </div>
        </div>

        <div className="section-group">
          <label>研究方法</label>
          <textarea
            value={reportData.methodology}
            onChange={(e) => handleSectionUpdate('methodology', e.target.value)}
            placeholder="请详细描述研究方法、实验设计和数据收集过程"
            rows="6"
            className="section-textarea"
          />
          <div className="section-info">
            <span>字数: {reportData.methodology.length}</span>
            <span>建议: 1000-1500字</span>
          </div>
        </div>

        <div className="section-group">
          <label>研究结果</label>
          <textarea
            value={reportData.results}
            onChange={(e) => handleSectionUpdate('results', e.target.value)}
            placeholder="请展示和描述研究结果，包括数据分析和图表说明"
            rows="6"
            className="section-textarea"
          />
          <div className="section-info">
            <span>字数: {reportData.results.length}</span>
            <span>建议: 1200-1800字</span>
          </div>
        </div>

        <div className="section-group">
          <label>讨论分析</label>
          <textarea
            value={reportData.discussion}
            onChange={(e) => handleSectionUpdate('discussion', e.target.value)}
            placeholder="请对研究结果进行深入讨论和分析，与已有研究进行比较"
            rows="6"
            className="section-textarea"
          />
          <div className="section-info">
            <span>字数: {reportData.discussion.length}</span>
            <span>建议: 1000-1500字</span>
          </div>
        </div>

        <div className="section-group">
          <label>结论</label>
          <textarea
            value={reportData.conclusion}
            onChange={(e) => handleSectionUpdate('conclusion', e.target.value)}
            placeholder="请总结研究贡献、局限性和未来工作方向"
            rows="4"
            className="section-textarea"
          />
          <div className="section-info">
            <span>字数: {reportData.conclusion.length}</span>
            <span>建议: 400-600字</span>
          </div>
        </div>

        <div className="section-group">
          <label>参考文献</label>
          <textarea
            value={reportData.references}
            onChange={(e) => handleSectionUpdate('references', e.target.value)}
            placeholder="请列出参考文献，可使用引用管理工具添加"
            rows="8"
            className="section-textarea"
          />
          <div className="section-info">
            <span>引用数量: {citations.length}</span>
            <button 
              className="insert-citations-btn"
              onClick={() => setShowCitationModal(true)}
            >
              管理引用
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSubmissions = () => (
    <div className="submissions-tab">
      <div className="tab-header">
        <h3>已提交报告</h3>
        <div className="submission-stats">
          <span>总计: {submittedReports.length}</span>
          <span>已通过: {submittedReports.filter(r => r.status === 'approved').length}</span>
          <span>审核中: {submittedReports.filter(r => r.status === 'under_review').length}</span>
        </div>
      </div>

      <div className="submissions-list">
        {submittedReports.map(report => (
          <div key={report.id} className="submission-item">
            <div className="submission-header">
              <div className="submission-title-section">
                <h4>{report.title}</h4>
                <span 
                  className="submission-status"
                  style={{ backgroundColor: getStatusColor(report.status) }}
                >
                  {getStatusText(report.status)}
                </span>
              </div>
              <div className="submission-actions">
                <button className="action-btn">查看</button>
                <button className="action-btn">下载</button>
                {report.status === 'needs_revision' && (
                  <button className="action-btn">修改</button>
                )}
              </div>
            </div>
            
            <div className="submission-meta">
              <span>提交时间: {formatDate(report.submitDate)}</span>
              <span>版本: v{report.version}</span>
              <span>字数: {report.wordCount}</span>
              <span>文件大小: {report.fileSize}</span>
              {report.grade && <span>成绩: {report.grade}分</span>}
            </div>

            {report.feedback && report.feedback.length > 0 && (
              <div className="submission-feedback">
                <h5>反馈意见</h5>
                {report.feedback.map(fb => (
                  <div key={fb.id} className="feedback-item">
                    <div className="feedback-header">
                      <span className="feedback-reviewer">{fb.reviewer}</span>
                      <span className="feedback-date">{formatDate(fb.date)}</span>
                    </div>
                    <div className="feedback-content">
                      <span className="feedback-section">【{fb.section}】</span>
                      <p className="feedback-comment">{fb.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {submittedReports.length === 0 && (
          <div className="empty-state">
            <p>还没有提交任何报告</p>
            <button 
              className="primary-btn"
              onClick={() => setSelectedTab('writing')}
            >
              开始写作
            </button>
          </div>
        )}
      </div>
    </div>
  )

  const renderDrafts = () => (
    <div className="drafts-tab">
      <div className="tab-header">
        <h3>草稿管理</h3>
        <button className="primary-btn" onClick={saveDraft}>
          保存当前草稿
        </button>
      </div>

      <div className="drafts-list">
        {drafts.map(draft => (
          <div key={draft.id} className="draft-item">
            <div className="draft-header">
              <h4>{draft.title}</h4>
              <div className="draft-actions">
                <button 
                  className="action-btn"
                  onClick={() => loadDraft(draft)}
                >
                  加载
                </button>
                <button className="action-btn">删除</button>
              </div>
            </div>
            
            <div className="draft-meta">
              <span>最后修改: {formatDate(draft.lastModified)}</span>
              <span>字数: {draft.wordCount}</span>
              <span>完成度: {draft.progress}%</span>
            </div>

            <div className="draft-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${draft.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="draft-sections">
              {Object.entries(draft.sections).map(([section, completed]) => (
                <span 
                  key={section}
                  className={`section-tag ${completed ? 'completed' : 'pending'}`}
                >
                  {section === 'abstract' ? '摘要' :
                   section === 'introduction' ? '引言' :
                   section === 'methodology' ? '方法' :
                   section === 'results' ? '结果' :
                   section === 'discussion' ? '讨论' :
                   section === 'conclusion' ? '结论' : section}
                </span>
              ))}
            </div>
          </div>
        ))}

        {drafts.length === 0 && (
          <div className="empty-state">
            <p>暂无保存的草稿</p>
          </div>
        )}
      </div>
    </div>
  )

  const renderCitations = () => (
    <div className="citations-tab">
      <div className="tab-header">
        <h3>参考文献管理</h3>
        <button 
          className="primary-btn"
          onClick={() => setShowCitationModal(true)}
        >
          添加文献
        </button>
      </div>

      <div className="citations-list">
        {citations.map(citation => (
          <div key={citation.id} className="citation-item">
            <div className="citation-header">
              <span className="citation-type">{citation.type}</span>
              <div className="citation-actions">
                <button 
                  className="action-btn"
                  onClick={() => insertCitation(citation)}
                >
                  插入引用
                </button>
                <button className="action-btn">编辑</button>
                <button className="action-btn">删除</button>
              </div>
            </div>
            
            <h4 className="citation-title">{citation.title}</h4>
            <p className="citation-authors">{citation.authors}</p>
            
            <div className="citation-details">
              {citation.journal && <span>期刊: {citation.journal}</span>}
              {citation.conference && <span>会议: {citation.conference}</span>}
              <span>年份: {citation.year}</span>
              {citation.pages && <span>页码: {citation.pages}</span>}
              {citation.doi && <span>DOI: {citation.doi}</span>}
            </div>

            <div className="citation-formatted">
              <strong>格式化引用:</strong>
              <p>{formatCitation(citation)}</p>
            </div>
          </div>
        ))}

        {citations.length === 0 && (
          <div className="empty-state">
            <p>还没有添加任何参考文献</p>
            <button 
              className="primary-btn"
              onClick={() => setShowCitationModal(true)}
            >
              添加第一篇文献
            </button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <Layout>
      <div className="report-submission-container">
        <div className="report-header">
          <div className="header-left">
            <h1>研究报告撰写与提交</h1>
            <div className="breadcrumb">
              <span onClick={() => navigate(`/student/dashboard`)}>学生工作台</span>
              <span>/</span>
              <span>成果展示</span>
              <span>/</span>
              <span>报告提交</span>
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

        <div className="report-tabs">
          <button 
            className={`tab-btn ${selectedTab === 'writing' ? 'active' : ''}`}
            onClick={() => setSelectedTab('writing')}
          >
            报告撰写
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setSelectedTab('submissions')}
          >
            已提交报告
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'drafts' ? 'active' : ''}`}
            onClick={() => setSelectedTab('drafts')}
          >
            草稿管理
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'citations' ? 'active' : ''}`}
            onClick={() => setSelectedTab('citations')}
          >
            参考文献
          </button>
        </div>

        <div className="report-content">
          {selectedTab === 'writing' && renderWriting()}
          {selectedTab === 'submissions' && renderSubmissions()}
          {selectedTab === 'drafts' && renderDrafts()}
          {selectedTab === 'citations' && renderCitations()}
        </div>

        {/* Template Modal */}
        {showTemplateModal && (
          <div className="modal" onClick={() => setShowTemplateModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>选择报告模板</h2>
                <button onClick={() => setShowTemplateModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="templates-grid">
                  {templates.map(template => (
                    <div key={template.id} className="template-card">
                      <h4>{template.name}</h4>
                      <p>{template.description}</p>
                      <div className="template-info">
                        <span>格式: {template.format}</span>
                        <span>字数限制: {template.wordLimit}</span>
                      </div>
                      <div className="template-sections">
                        <strong>包含章节:</strong>
                        <ul>
                          {template.sections.map((section, index) => (
                            <li key={index}>{section}</li>
                          ))}
                        </ul>
                      </div>
                      <button 
                        className="primary-btn"
                        onClick={() => useTemplate(template)}
                      >
                        使用模板
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Citation Modal */}
        {showCitationModal && (
          <div className="modal" onClick={() => setShowCitationModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>添加参考文献</h2>
                <button onClick={() => setShowCitationModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>文献类型</label>
                  <select
                    value={newCitation.type}
                    onChange={(e) => setNewCitation({ ...newCitation, type: e.target.value })}
                  >
                    <option value="article">期刊论文</option>
                    <option value="conference">会议论文</option>
                    <option value="book">书籍</option>
                    <option value="thesis">学位论文</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>标题 *</label>
                  <input
                    type="text"
                    value={newCitation.title}
                    onChange={(e) => setNewCitation({ ...newCitation, title: e.target.value })}
                    placeholder="请输入文献标题"
                  />
                </div>
                <div className="form-group">
                  <label>作者 *</label>
                  <input
                    type="text"
                    value={newCitation.authors}
                    onChange={(e) => setNewCitation({ ...newCitation, authors: e.target.value })}
                    placeholder="请输入作者姓名（多个作者用逗号分隔）"
                  />
                </div>
                {newCitation.type === 'article' && (
                  <div className="form-group">
                    <label>期刊名称</label>
                    <input
                      type="text"
                      value={newCitation.journal}
                      onChange={(e) => setNewCitation({ ...newCitation, journal: e.target.value })}
                      placeholder="请输入期刊名称"
                    />
                  </div>
                )}
                {newCitation.type === 'conference' && (
                  <div className="form-group">
                    <label>会议名称</label>
                    <input
                      type="text"
                      value={newCitation.conference}
                      onChange={(e) => setNewCitation({ ...newCitation, conference: e.target.value })}
                      placeholder="请输入会议名称"
                    />
                  </div>
                )}
                <div className="form-row">
                  <div className="form-group">
                    <label>发表年份</label>
                    <input
                      type="number"
                      value={newCitation.year}
                      onChange={(e) => setNewCitation({ ...newCitation, year: e.target.value })}
                      placeholder="YYYY"
                    />
                  </div>
                  <div className="form-group">
                    <label>页码</label>
                    <input
                      type="text"
                      value={newCitation.pages}
                      onChange={(e) => setNewCitation({ ...newCitation, pages: e.target.value })}
                      placeholder="例如: 123-145"
                    />
                  </div>
                </div>
                {newCitation.type === 'article' && (
                  <div className="form-group">
                    <label>DOI</label>
                    <input
                      type="text"
                      value={newCitation.doi}
                      onChange={(e) => setNewCitation({ ...newCitation, doi: e.target.value })}
                      placeholder="请输入DOI"
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowCitationModal(false)}>
                  取消
                </button>
                <button className="btn-primary" onClick={addCitation}>
                  添加
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Submit Modal */}
        {showSubmitModal && (
          <div className="modal" onClick={() => setShowSubmitModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>提交报告</h2>
                <button onClick={() => setShowSubmitModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="submit-summary">
                  <h4>报告信息</h4>
                  <p><strong>标题:</strong> {reportData.title}</p>
                  <p><strong>总字数:</strong> {wordCount}</p>
                  <p><strong>完成度:</strong> {progress}%</p>
                  <p><strong>参考文献:</strong> {citations.length} 篇</p>
                </div>
                <div className="submit-checklist">
                  <h4>提交检查清单</h4>
                  <label>
                    <input type="checkbox" defaultChecked={!!reportData.title} disabled />
                    报告标题已填写
                  </label>
                  <label>
                    <input type="checkbox" defaultChecked={!!reportData.abstract} disabled />
                    摘要已完成
                  </label>
                  <label>
                    <input type="checkbox" defaultChecked={!!reportData.introduction} disabled />
                    引言已完成
                  </label>
                  <label>
                    <input type="checkbox" defaultChecked={wordCount >= 3000} disabled />
                    字数达到最低要求（3000字）
                  </label>
                  <label>
                    <input type="checkbox" defaultChecked={citations.length >= 10} disabled />
                    参考文献不少于10篇
                  </label>
                </div>
                <div className="submit-warning">
                  <p>⚠️ 提交后将无法修改，请确认所有内容无误</p>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowSubmitModal(false)}>
                  取消
                </button>
                <button className="btn-primary" onClick={submitReport}>
                  确认提交
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default ReportSubmission