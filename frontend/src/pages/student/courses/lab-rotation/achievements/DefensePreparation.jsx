import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './DefensePreparation.css'

const DefensePreparation = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('guidelines')
  const [presentations, setPresentations] = useState([])
  const [templates, setTemplates] = useState([])
  const [schedule, setSchedule] = useState(null)
  const [practiceRecords, setPracticeRecords] = useState([])
  const [tips, setTips] = useState([])
  const [techInfo, setTechInfo] = useState(null)
  const [defenseChecklist, setDefenseChecklist] = useState({})
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showPracticeModal, setShowPracticeModal] = useState(false)
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    file: null,
    type: 'final'
  })
  const [scheduleData, setScheduleData] = useState({
    preferredDate: '',
    preferredTime: '',
    duration: '20',
    specialRequirements: ''
  })
  const [practiceData, setPracticeData] = useState({
    date: new Date().toISOString().split('T')[0],
    duration: '',
    audience: '',
    feedback: '',
    improvements: ''
  })

  useEffect(() => {
    loadPresentations()
    loadTemplates()
    loadSchedule()
    loadPracticeRecords()
    loadTips()
    loadTechInfo()
    loadDefenseChecklist()
  }, [courseId])

  const loadPresentations = () => {
    const mockPresentations = [
      {
        id: '1',
        title: '深度学习在图像识别中的应用研究',
        uploadDate: '2024-02-20',
        type: 'final',
        status: 'uploaded',
        fileSize: '5.2 MB',
        slides: 25,
        version: 1,
        feedback: [
          {
            id: '1',
            reviewer: 'Prof. Zhang',
            comment: '内容丰富，建议调整第15页的图表大小',
            date: '2024-02-21'
          }
        ]
      },
      {
        id: '2',
        title: '中期进展汇报',
        uploadDate: '2024-02-15',
        type: 'midterm',
        status: 'approved',
        fileSize: '3.8 MB',
        slides: 18,
        version: 2,
        feedback: []
      }
    ]
    
    const savedPresentations = localStorage.getItem(`presentations_${courseId}`)
    if (savedPresentations) {
      setPresentations(JSON.parse(savedPresentations))
    } else {
      setPresentations(mockPresentations)
      localStorage.setItem(`presentations_${courseId}`, JSON.stringify(mockPresentations))
    }
  }

  const loadTemplates = () => {
    const mockTemplates = [
      {
        id: '1',
        name: '学术研究答辩模板',
        description: '适用于学术研究项目的标准答辩模板',
        thumbnail: '/api/placeholder/300/200',
        slides: 20,
        sections: ['封面', '研究背景', '文献综述', '研究方法', '实验结果', '讨论分析', '结论展望', '致谢'],
        format: 'PPTX',
        downloads: 850
      },
      {
        id: '2',
        name: '实验项目展示模板',
        description: '专为实验性项目设计的展示模板',
        thumbnail: '/api/placeholder/300/200',
        slides: 18,
        sections: ['项目介绍', '实验设计', '实验过程', '数据分析', '结果讨论', '总结反思'],
        format: 'PPTX',
        downloads: 620
      },
      {
        id: '3',
        name: '简约商务模板',
        description: '简洁专业的商务风格演示模板',
        thumbnail: '/api/placeholder/300/200',
        slides: 16,
        sections: ['项目概述', '核心内容', '关键发现', '结论建议'],
        format: 'PPTX',
        downloads: 490
      },
      {
        id: '4',
        name: '技术展示模板',
        description: '适合技术类项目的专业展示模板',
        thumbnail: '/api/placeholder/300/200',
        slides: 22,
        sections: ['技术背景', '系统架构', '核心算法', '实现细节', '性能评估', '应用前景'],
        format: 'PPTX',
        downloads: 730
      }
    ]
    setTemplates(mockTemplates)
  }

  const loadSchedule = () => {
    const mockSchedule = {
      id: '1',
      studentId: 'student_001',
      scheduledDate: '2024-03-15',
      scheduledTime: '14:00',
      duration: 20,
      room: '学术报告厅A201',
      committee: [
        { name: 'Prof. Zhang', role: '主席' },
        { name: 'Prof. Li', role: '委员' },
        { name: 'Prof. Wang', role: '委员' }
      ],
      status: 'scheduled',
      requirements: '需要准备激光笔，会场提供投影设备',
      submissionDeadline: '2024-03-10'
    }
    setSchedule(mockSchedule)
  }

  const loadPracticeRecords = () => {
    const mockRecords = [
      {
        id: '1',
        date: '2024-02-22',
        duration: 18,
        audience: '课题组成员',
        feedback: '整体流程清晰，但第三部分讲解速度过快，建议放慢节奏',
        improvements: '1. 调整第三部分讲解速度 2. 增加与听众的互动 3. 准备更多实例',
        score: 85
      },
      {
        id: '2',
        date: '2024-02-20',
        duration: 22,
        audience: '导师及同学',
        feedback: '内容充实，逻辑清楚，建议加强重点内容的强调',
        improvements: '1. 突出核心贡献 2. 简化技术细节 3. 加强结论部分',
        score: 78
      }
    ]
    
    const savedRecords = localStorage.getItem(`practiceRecords_${courseId}`)
    if (savedRecords) {
      setPracticeRecords(JSON.parse(savedRecords))
    } else {
      setPracticeRecords(mockRecords)
      localStorage.setItem(`practiceRecords_${courseId}`, JSON.stringify(mockRecords))
    }
  }

  const loadTips = () => {
    const mockTips = [
      {
        category: '演讲技巧',
        tips: [
          '保持眼神交流，与评委和听众建立连接',
          '控制语速，确保重点内容清晰传达',
          '使用手势辅助表达，但避免过度夸张',
          '准备应对可能的技术问题和突发情况'
        ]
      },
      {
        category: '内容组织',
        tips: [
          '开场简洁明了，快速抓住听众注意力',
          '逻辑结构清晰，各部分之间过渡自然',
          '重点突出，避免平铺直叙',
          '结论部分要强调贡献和创新点'
        ]
      },
      {
        category: '问答环节',
        tips: [
          '认真听清问题，必要时可以要求重复',
          '诚实回答，不清楚的地方不要强行解释',
          '保持冷静和自信，即使面对挑战性问题',
          '适当承认局限性，展示学术诚信'
        ]
      },
      {
        category: '心理准备',
        tips: [
          '充分练习，熟悉每一页内容',
          '模拟答辩环境，适应正式场合',
          '准备常见问题的回答',
          '保持积极心态，相信自己的研究成果'
        ]
      }
    ]
    setTips(mockTips)
  }

  const loadTechInfo = () => {
    const mockTechInfo = {
      room: '学术报告厅A201',
      capacity: 50,
      equipment: [
        '高清投影仪 (1920x1080)',
        '无线麦克风系统',
        '激光笔 (会场提供)',
        'HDMI/VGA接口',
        '音响系统',
        '网络连接 (有线/WiFi)'
      ],
      requirements: [
        '演示文稿格式: PPT/PPTX (推荐)',
        '备用格式: PDF',
        '字体要求: 使用系统默认字体',
        '文件大小: 不超过50MB',
        '建议分辨率: 1920x1080'
      ],
      contact: {
        name: '技术支持',
        phone: '010-12345678',
        email: 'tech@university.edu.cn'
      },
      checklist: [
        '提前30分钟到场测试设备',
        '准备备用U盘和笔记本电脑',
        '检查演示文稿在投影设备上的显示效果',
        '测试麦克风和激光笔功能',
        '确认网络连接正常（如需要）'
      ]
    }
    setTechInfo(mockTechInfo)
  }

  const loadDefenseChecklist = () => {
    const mockChecklist = {
      preparation: {
        'research_complete': { completed: true, label: '研究工作已完成' },
        'report_submitted': { completed: true, label: '研究报告已提交' },
        'presentation_ready': { completed: false, label: '演示文稿已准备' },
        'practice_done': { completed: false, label: '完成模拟答辩练习' }
      },
      materials: {
        'slides_uploaded': { completed: false, label: '演示文稿已上传' },
        'backup_prepared': { completed: false, label: '备用材料已准备' },
        'handouts_ready': { completed: false, label: '讲义资料已准备' },
        'demo_tested': { completed: false, label: '演示程序已测试' }
      },
      logistics: {
        'schedule_confirmed': { completed: true, label: '答辩时间已确认' },
        'room_booked': { completed: true, label: '答辩场地已预订' },
        'committee_notified': { completed: true, label: '答辩委员会已通知' },
        'tech_checked': { completed: false, label: '技术设备已检查' }
      }
    }
    setDefenseChecklist(mockChecklist)
  }

  const handleUpload = () => {
    if (!uploadData.title || !uploadData.file) {
      alert('请填写标题并选择文件')
      return
    }

    const newPresentation = {
      id: Date.now().toString(),
      title: uploadData.title,
      uploadDate: new Date().toISOString().split('T')[0],
      type: uploadData.type,
      status: 'uploaded',
      fileSize: `${(uploadData.file.size / (1024 * 1024)).toFixed(1)} MB`,
      slides: Math.floor(Math.random() * 30) + 15, // Mock slide count
      version: 1,
      feedback: []
    }

    const updatedPresentations = [...presentations, newPresentation]
    setPresentations(updatedPresentations)
    localStorage.setItem(`presentations_${courseId}`, JSON.stringify(updatedPresentations))

    setShowUploadModal(false)
    setUploadData({ title: '', description: '', file: null, type: 'final' })
    alert('演示文稿上传成功！')
  }

  const handleScheduleRequest = () => {
    if (!scheduleData.preferredDate || !scheduleData.preferredTime) {
      alert('请选择答辩日期和时间')
      return
    }

    // Update schedule with new data
    setSchedule({
      ...schedule,
      preferredDate: scheduleData.preferredDate,
      preferredTime: scheduleData.preferredTime,
      duration: parseInt(scheduleData.duration),
      specialRequirements: scheduleData.specialRequirements,
      status: 'pending'
    })

    setShowScheduleModal(false)
    setScheduleData({ preferredDate: '', preferredTime: '', duration: '20', specialRequirements: '' })
    alert('答辩时间申请已提交！')
  }

  const handlePracticeRecord = () => {
    if (!practiceData.duration || !practiceData.audience) {
      alert('请填写必填字段')
      return
    }

    const newRecord = {
      id: Date.now().toString(),
      date: practiceData.date,
      duration: parseInt(practiceData.duration),
      audience: practiceData.audience,
      feedback: practiceData.feedback,
      improvements: practiceData.improvements,
      score: Math.floor(Math.random() * 20) + 70 // Mock score
    }

    const updatedRecords = [...practiceRecords, newRecord]
    setPracticeRecords(updatedRecords)
    localStorage.setItem(`practiceRecords_${courseId}`, JSON.stringify(updatedRecords))

    setShowPracticeModal(false)
    setPracticeData({
      date: new Date().toISOString().split('T')[0],
      duration: '',
      audience: '',
      feedback: '',
      improvements: ''
    })
    alert('练习记录已保存！')
  }

  const downloadTemplate = (template) => {
    alert(`正在下载模板: ${template.name}`)
  }

  const updateChecklistItem = (category, key) => {
    const updatedChecklist = { ...defenseChecklist }
    updatedChecklist[category][key].completed = !updatedChecklist[category][key].completed
    setDefenseChecklist(updatedChecklist)
    
    // Save to localStorage
    localStorage.setItem(`defenseChecklist_${courseId}`, JSON.stringify(updatedChecklist))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#27ae60'
      case 'uploaded': return '#3498db'
      case 'scheduled': return '#f39c12'
      case 'pending': return '#e67e22'
      default: return '#95a5a6'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return '已通过'
      case 'uploaded': return '已上传'
      case 'scheduled': return '已安排'
      case 'pending': return '待处理'
      default: return '未知'
    }
  }

  const renderGuidelines = () => (
    <div className="guidelines-tab">
      <h3>答辩准备指南</h3>
      
      <div className="guidelines-content">
        <div className="guideline-section">
          <h4>📋 答辩流程</h4>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h5>开场介绍 (2分钟)</h5>
                <p>简要介绍研究背景和目标</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h5>主要内容展示 (15分钟)</h5>
                <p>详细阐述研究方法、结果和贡献</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h5>问答环节 (10分钟)</h5>
                <p>回答评委提出的问题</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h5>总结结束 (3分钟)</h5>
                <p>简要总结并致谢</p>
              </div>
            </div>
          </div>
        </div>

        <div className="guideline-section">
          <h4>📝 评分标准</h4>
          <div className="scoring-criteria">
            <div className="criteria-item">
              <span className="criteria-name">研究内容质量</span>
              <span className="criteria-weight">40%</span>
            </div>
            <div className="criteria-item">
              <span className="criteria-name">演示表现</span>
              <span className="criteria-weight">25%</span>
            </div>
            <div className="criteria-item">
              <span className="criteria-name">问答表现</span>
              <span className="criteria-weight">20%</span>
            </div>
            <div className="criteria-item">
              <span className="criteria-name">创新性</span>
              <span className="criteria-weight">15%</span>
            </div>
          </div>
        </div>

        <div className="guideline-section">
          <h4>⚠️ 注意事项</h4>
          <ul className="attention-list">
            <li>答辩前一天确认设备和材料准备情况</li>
            <li>答辩当天提前30分钟到场调试</li>
            <li>着装正式，保持良好形象</li>
            <li>控制时间，避免超时</li>
            <li>保持冷静，自信回答问题</li>
            <li>准备备用方案应对技术故障</li>
          </ul>
        </div>

        <div className="guideline-section">
          <h4>📚 常见问题</h4>
          <div className="faq-list">
            <div className="faq-item">
              <h5>Q: 如果技术设备出现故障怎么办？</h5>
              <p>A: 保持冷静，联系技术支持。同时准备纸质版材料作为备用方案。</p>
            </div>
            <div className="faq-item">
              <h5>Q: 答辩时间超出了怎么办？</h5>
              <p>A: 主动总结核心内容，简洁地完成剩余部分，并为超时道歉。</p>
            </div>
            <div className="faq-item">
              <h5>Q: 遇到不会回答的问题怎么办？</h5>
              <p>A: 诚实说明不清楚，可以提及相关的思考方向或承诺后续深入研究。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTemplates = () => (
    <div className="templates-tab">
      <div className="tab-header">
        <h3>演示模板</h3>
        <div className="template-filters">
          <select className="filter-select">
            <option value="">所有类型</option>
            <option value="academic">学术研究</option>
            <option value="technical">技术项目</option>
            <option value="business">商务展示</option>
          </select>
          <select className="filter-select">
            <option value="downloads">按下载量</option>
            <option value="newest">最新发布</option>
            <option value="name">按名称</option>
          </select>
        </div>
      </div>

      <div className="templates-grid">
        {templates.map(template => (
          <div key={template.id} className="template-card">
            <div className="template-thumbnail">
              <img src={template.thumbnail} alt={template.name} />
              <div className="template-overlay">
                <button 
                  className="btn-preview"
                  onClick={() => alert(`预览模板: ${template.name}`)}
                >
                  预览
                </button>
                <button 
                  className="btn-download"
                  onClick={() => downloadTemplate(template)}
                >
                  下载
                </button>
              </div>
            </div>
            <div className="template-info">
              <h4>{template.name}</h4>
              <p>{template.description}</p>
              <div className="template-meta">
                <span>幻灯片: {template.slides}页</span>
                <span>格式: {template.format}</span>
                <span>下载: {template.downloads}</span>
              </div>
              <div className="template-sections">
                <strong>包含章节:</strong>
                <div className="sections-tags">
                  {template.sections.map((section, index) => (
                    <span key={index} className="section-tag">{section}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPresentations = () => (
    <div className="presentations-tab">
      <div className="tab-header">
        <h3>我的演示文稿</h3>
        <button 
          className="primary-btn"
          onClick={() => setShowUploadModal(true)}
        >
          上传文稿
        </button>
      </div>

      <div className="presentations-list">
        {presentations.map(presentation => (
          <div key={presentation.id} className="presentation-item">
            <div className="presentation-header">
              <div className="presentation-title-section">
                <h4>{presentation.title}</h4>
                <span 
                  className="presentation-status"
                  style={{ backgroundColor: getStatusColor(presentation.status) }}
                >
                  {getStatusText(presentation.status)}
                </span>
              </div>
              <div className="presentation-actions">
                <button className="action-btn">预览</button>
                <button className="action-btn">下载</button>
                <button className="action-btn">编辑</button>
              </div>
            </div>
            
            <div className="presentation-meta">
              <span>类型: {presentation.type === 'final' ? '最终答辩' : '中期汇报'}</span>
              <span>上传时间: {formatDate(presentation.uploadDate)}</span>
              <span>文件大小: {presentation.fileSize}</span>
              <span>幻灯片: {presentation.slides}页</span>
              <span>版本: v{presentation.version}</span>
            </div>

            {presentation.feedback && presentation.feedback.length > 0 && (
              <div className="presentation-feedback">
                <h5>反馈意见</h5>
                {presentation.feedback.map(fb => (
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

        {presentations.length === 0 && (
          <div className="empty-state">
            <p>还没有上传任何演示文稿</p>
            <button 
              className="primary-btn"
              onClick={() => setShowUploadModal(true)}
            >
              上传第一个文稿
            </button>
          </div>
        )}
      </div>
    </div>
  )

  const renderSchedule = () => (
    <div className="schedule-tab">
      <div className="tab-header">
        <h3>答辩安排</h3>
        {schedule?.status !== 'scheduled' && (
          <button 
            className="primary-btn"
            onClick={() => setShowScheduleModal(true)}
          >
            申请时间
          </button>
        )}
      </div>

      {schedule ? (
        <div className="schedule-info">
          <div className="schedule-card">
            <div className="schedule-header">
              <h4>答辩安排详情</h4>
              <span 
                className="schedule-status"
                style={{ backgroundColor: getStatusColor(schedule.status) }}
              >
                {getStatusText(schedule.status)}
              </span>
            </div>
            
            <div className="schedule-details">
              <div className="detail-row">
                <span className="detail-label">答辩日期:</span>
                <span className="detail-value">{formatDate(schedule.scheduledDate)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">答辩时间:</span>
                <span className="detail-value">{schedule.scheduledTime}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">持续时间:</span>
                <span className="detail-value">{schedule.duration}分钟</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">答辩地点:</span>
                <span className="detail-value">{schedule.room}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">材料截止:</span>
                <span className="detail-value">{formatDate(schedule.submissionDeadline)}</span>
              </div>
            </div>

            <div className="committee-section">
              <h5>答辩委员会</h5>
              <div className="committee-list">
                {schedule.committee.map((member, index) => (
                  <div key={index} className="committee-member">
                    <span className="member-name">{member.name}</span>
                    <span className="member-role">{member.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {schedule.requirements && (
              <div className="requirements-section">
                <h5>特殊要求</h5>
                <p>{schedule.requirements}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <p>还没有安排答辩时间</p>
          <button 
            className="primary-btn"
            onClick={() => setShowScheduleModal(true)}
          >
            申请答辩时间
          </button>
        </div>
      )}
    </div>
  )

  const renderPractice = () => (
    <div className="practice-tab">
      <div className="tab-header">
        <h3>模拟练习</h3>
        <button 
          className="primary-btn"
          onClick={() => setShowPracticeModal(true)}
        >
          记录练习
        </button>
      </div>

      <div className="practice-records">
        {practiceRecords.map(record => (
          <div key={record.id} className="practice-record">
            <div className="record-header">
              <div className="record-info">
                <h4>练习记录 - {formatDate(record.date)}</h4>
                <div className="record-meta">
                  <span>时长: {record.duration}分钟</span>
                  <span>听众: {record.audience}</span>
                  <span className="record-score">评分: {record.score}分</span>
                </div>
              </div>
            </div>
            
            <div className="record-content">
              <div className="feedback-section">
                <h5>反馈意见</h5>
                <p>{record.feedback}</p>
              </div>
              
              <div className="improvements-section">
                <h5>改进建议</h5>
                <p>{record.improvements}</p>
              </div>
            </div>
          </div>
        ))}

        {practiceRecords.length === 0 && (
          <div className="empty-state">
            <p>还没有练习记录</p>
            <button 
              className="primary-btn"
              onClick={() => setShowPracticeModal(true)}
            >
              开始第一次练习
            </button>
          </div>
        )}
      </div>
    </div>
  )

  const renderTips = () => (
    <div className="tips-tab">
      <h3>答辩技巧与建议</h3>
      
      <div className="tips-content">
        {tips.map((category, index) => (
          <div key={index} className="tips-category">
            <h4>{category.category}</h4>
            <div className="tips-list">
              {category.tips.map((tip, tipIndex) => (
                <div key={tipIndex} className="tip-item">
                  <span className="tip-bullet">💡</span>
                  <span className="tip-text">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTechInfo = () => (
    <div className="tech-info-tab">
      <h3>技术设备信息</h3>
      
      <div className="tech-info-content">
        <div className="info-section">
          <h4>📍 场地信息</h4>
          <div className="info-details">
            <p><strong>答辩教室:</strong> {techInfo?.room}</p>
            <p><strong>容量:</strong> {techInfo?.capacity}人</p>
          </div>
        </div>

        <div className="info-section">
          <h4>🔧 设备清单</h4>
          <div className="equipment-list">
            {techInfo?.equipment.map((item, index) => (
              <div key={index} className="equipment-item">
                <span className="equipment-icon">✓</span>
                <span className="equipment-name">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h4>📋 技术要求</h4>
          <div className="requirements-list">
            {techInfo?.requirements.map((req, index) => (
              <div key={index} className="requirement-item">
                <span className="requirement-text">{req}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h4>☑️ 设备检查清单</h4>
          <div className="checklist">
            {techInfo?.checklist.map((item, index) => (
              <div key={index} className="checklist-item">
                <input type="checkbox" id={`check-${index}`} />
                <label htmlFor={`check-${index}`}>{item}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h4>📞 技术支持</h4>
          <div className="contact-info">
            <p><strong>联系人:</strong> {techInfo?.contact.name}</p>
            <p><strong>电话:</strong> {techInfo?.contact.phone}</p>
            <p><strong>邮箱:</strong> {techInfo?.contact.email}</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderChecklist = () => (
    <div className="checklist-tab">
      <h3>答辩准备检查清单</h3>
      
      <div className="checklist-content">
        {Object.entries(defenseChecklist).map(([category, items]) => (
          <div key={category} className="checklist-category">
            <h4>
              {category === 'preparation' ? '📚 准备工作' :
               category === 'materials' ? '📄 材料准备' :
               category === 'logistics' ? '📅 后勤安排' : category}
            </h4>
            <div className="checklist-items">
              {Object.entries(items).map(([key, item]) => (
                <div key={key} className="checklist-item">
                  <input 
                    type="checkbox" 
                    id={`${category}-${key}`}
                    checked={item.completed}
                    onChange={() => updateChecklistItem(category, key)}
                  />
                  <label htmlFor={`${category}-${key}`} className={item.completed ? 'completed' : ''}>
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="checklist-summary">
        <h4>完成度统计</h4>
        <div className="completion-stats">
          {Object.entries(defenseChecklist).map(([category, items]) => {
            const total = Object.keys(items).length
            const completed = Object.values(items).filter(item => item.completed).length
            const percentage = Math.round((completed / total) * 100)
            
            return (
              <div key={category} className="completion-item">
                <span className="completion-label">
                  {category === 'preparation' ? '准备工作' :
                   category === 'materials' ? '材料准备' :
                   category === 'logistics' ? '后勤安排' : category}
                </span>
                <div className="completion-bar">
                  <div 
                    className="completion-fill"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="completion-percentage">{percentage}%</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  return (
    <Layout>
      <div className="defense-preparation-container">
        <div className="defense-header">
          <div className="header-left">
            <h1>答辩准备与安排</h1>
            <div className="breadcrumb">
              <span onClick={() => navigate(`/student/dashboard`)}>学生工作台</span>
              <span>/</span>
              <span>成果展示</span>
              <span>/</span>
              <span>答辩准备</span>
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
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/achievements/materials`)}
            >
              学习资料
            </button>
          </div>
        </div>

        <div className="defense-tabs">
          <button 
            className={`tab-btn ${selectedTab === 'guidelines' ? 'active' : ''}`}
            onClick={() => setSelectedTab('guidelines')}
          >
            答辩指南
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'templates' ? 'active' : ''}`}
            onClick={() => setSelectedTab('templates')}
          >
            演示模板
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'presentations' ? 'active' : ''}`}
            onClick={() => setSelectedTab('presentations')}
          >
            我的文稿
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setSelectedTab('schedule')}
          >
            时间安排
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'practice' ? 'active' : ''}`}
            onClick={() => setSelectedTab('practice')}
          >
            模拟练习
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'tips' ? 'active' : ''}`}
            onClick={() => setSelectedTab('tips')}
          >
            答辩技巧
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'tech' ? 'active' : ''}`}
            onClick={() => setSelectedTab('tech')}
          >
            技术信息
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'checklist' ? 'active' : ''}`}
            onClick={() => setSelectedTab('checklist')}
          >
            检查清单
          </button>
        </div>

        <div className="defense-content">
          {selectedTab === 'guidelines' && renderGuidelines()}
          {selectedTab === 'templates' && renderTemplates()}
          {selectedTab === 'presentations' && renderPresentations()}
          {selectedTab === 'schedule' && renderSchedule()}
          {selectedTab === 'practice' && renderPractice()}
          {selectedTab === 'tips' && renderTips()}
          {selectedTab === 'tech' && renderTechInfo()}
          {selectedTab === 'checklist' && renderChecklist()}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="modal" onClick={() => setShowUploadModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>上传演示文稿</h2>
                <button onClick={() => setShowUploadModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>文稿标题 *</label>
                  <input
                    type="text"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                    placeholder="请输入演示文稿标题"
                  />
                </div>
                <div className="form-group">
                  <label>文稿类型</label>
                  <select
                    value={uploadData.type}
                    onChange={(e) => setUploadData({ ...uploadData, type: e.target.value })}
                  >
                    <option value="final">最终答辩</option>
                    <option value="midterm">中期汇报</option>
                    <option value="practice">练习版本</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>描述说明</label>
                  <textarea
                    value={uploadData.description}
                    onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                    placeholder="请简要描述文稿内容"
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>选择文件 *</label>
                  <input
                    type="file"
                    accept=".ppt,.pptx,.pdf"
                    onChange={(e) => setUploadData({ ...uploadData, file: e.target.files[0] })}
                  />
                  <small>支持格式：PPT, PPTX, PDF，文件大小不超过50MB</small>
                </div>
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

        {/* Schedule Modal */}
        {showScheduleModal && (
          <div className="modal" onClick={() => setShowScheduleModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>申请答辩时间</h2>
                <button onClick={() => setShowScheduleModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>首选日期 *</label>
                    <input
                      type="date"
                      value={scheduleData.preferredDate}
                      onChange={(e) => setScheduleData({ ...scheduleData, preferredDate: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>首选时间 *</label>
                    <input
                      type="time"
                      value={scheduleData.preferredTime}
                      onChange={(e) => setScheduleData({ ...scheduleData, preferredTime: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>预计时长</label>
                  <select
                    value={scheduleData.duration}
                    onChange={(e) => setScheduleData({ ...scheduleData, duration: e.target.value })}
                  >
                    <option value="15">15分钟</option>
                    <option value="20">20分钟</option>
                    <option value="25">25分钟</option>
                    <option value="30">30分钟</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>特殊要求</label>
                  <textarea
                    value={scheduleData.specialRequirements}
                    onChange={(e) => setScheduleData({ ...scheduleData, specialRequirements: e.target.value })}
                    placeholder="如有特殊设备需求或其他要求，请在此说明"
                    rows="3"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowScheduleModal(false)}>
                  取消
                </button>
                <button className="btn-primary" onClick={handleScheduleRequest}>
                  提交申请
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Practice Modal */}
        {showPracticeModal && (
          <div className="modal" onClick={() => setShowPracticeModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>记录练习情况</h2>
                <button onClick={() => setShowPracticeModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>练习日期</label>
                    <input
                      type="date"
                      value={practiceData.date}
                      onChange={(e) => setPracticeData({ ...practiceData, date: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>练习时长 (分钟) *</label>
                    <input
                      type="number"
                      value={practiceData.duration}
                      onChange={(e) => setPracticeData({ ...practiceData, duration: e.target.value })}
                      placeholder="例如: 18"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>练习听众 *</label>
                  <input
                    type="text"
                    value={practiceData.audience}
                    onChange={(e) => setPracticeData({ ...practiceData, audience: e.target.value })}
                    placeholder="例如: 课题组成员、导师、同学等"
                  />
                </div>
                <div className="form-group">
                  <label>收到的反馈</label>
                  <textarea
                    value={practiceData.feedback}
                    onChange={(e) => setPracticeData({ ...practiceData, feedback: e.target.value })}
                    placeholder="记录听众的反馈意见"
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>改进计划</label>
                  <textarea
                    value={practiceData.improvements}
                    onChange={(e) => setPracticeData({ ...practiceData, improvements: e.target.value })}
                    placeholder="基于反馈制定的改进计划"
                    rows="3"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowPracticeModal(false)}>
                  取消
                </button>
                <button className="btn-primary" onClick={handlePracticeRecord}>
                  保存记录
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default DefensePreparation