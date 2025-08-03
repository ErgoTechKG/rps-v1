import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './TopicDetails.css'

const TopicDetails = () => {
  const { courseId, topicId } = useParams()
  const navigate = useNavigate()
  const [topic, setTopic] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [applicationStatus, setApplicationStatus] = useState(null)
  const [preparationProgress, setPreparationProgress] = useState({
    prerequisites: false,
    statement: false,
    resume: false,
    transcript: false
  })

  useEffect(() => {
    // Load topic details
    const mockTopic = {
      id: topicId,
      title: '深度学习在医疗图像分析中的应用',
      description: '本课题将探索深度学习技术在医疗图像诊断中的应用，包括CT、MRI图像的自动分析和病变检测。学生将有机会接触最前沿的AI技术，并将其应用于实际的医疗场景中。',
      professorId: 'prof1',
      professorName: '张教授',
      professorTitle: '计算机科学系教授，人工智能实验室主任',
      researchArea: '人工智能',
      background: `
        医疗图像分析是人工智能应用的重要领域之一。随着深度学习技术的发展，
        自动化的医疗图像诊断已经在某些领域达到了专家级的准确率。本课题旨在
        进一步推动这一技术的发展，特别是在以下几个方面：
        
        1. 提高诊断准确率
        2. 减少诊断时间
        3. 开发新的诊断方法
        4. 建立可解释的AI模型
      `,
      methodology: `
        1. 数据收集与预处理
        2. 深度学习模型设计与训练
        3. 模型评估与优化
        4. 临床验证
        5. 系统集成与部署
      `,
      expectedOutcomes: [
        '发表1-2篇高质量学术论文',
        '开发一个可用的医疗图像分析原型系统',
        '获得实际的AI项目经验',
        '建立医疗AI领域的研究基础'
      ],
      requirements: {
        prerequisites: [
          '机器学习基础（必修）',
          'Python编程（熟练）',
          '医学图像处理（选修）',
          '深度学习框架（PyTorch/TensorFlow）'
        ],
        skills: [
          '较强的编程能力',
          '良好的数学基础',
          '团队协作能力',
          '英文文献阅读能力'
        ],
        timeCommitment: '每周15-20小时',
        duration: '一学期（16周）'
      },
      resources: {
        lab: 'AI实验室（配备GPU服务器）',
        equipment: 'NVIDIA GPU集群',
        software: 'PyTorch, TensorFlow, 医疗图像处理软件',
        funding: '项目经费支持',
        datasets: '合作医院提供的脱敏数据集'
      },
      relatedPublications: [
        {
          title: 'Deep Learning for Medical Image Analysis: A Survey',
          authors: '张教授 et al.',
          journal: 'Nature Machine Intelligence',
          year: '2023'
        },
        {
          title: 'Automated Detection of Lung Cancer using Deep CNN',
          authors: '李研究生, 张教授',
          conference: 'MICCAI 2023',
          year: '2023'
        }
      ],
      previousProjects: [
        {
          student: '王同学',
          year: '2023',
          outcome: '发表顶会论文，获得最佳学生论文奖'
        },
        {
          student: '李同学',
          year: '2022',
          outcome: '开发的系统在医院试用，申请专利一项'
        }
      ],
      deadline: '2024-03-15',
      applicants: 5,
      slots: 3,
      rating: 4.8,
      testimonials: [
        {
          student: '王同学（2023届）',
          content: '张教授的指导非常细致，不仅在技术上给予支持，还帮助我们建立科研思维。'
        },
        {
          student: '李同学（2022届）',
          content: '这个项目让我真正理解了AI在医疗领域的应用，收获非常大。'
        }
      ]
    }

    setTopic(mockTopic)

    // Check application status
    const storedStatus = localStorage.getItem(`application_${courseId}_${topicId}`)
    if (storedStatus) {
      setApplicationStatus(JSON.parse(storedStatus))
    }

    // Load preparation progress
    const storedProgress = localStorage.getItem(`prep_progress_${courseId}_${topicId}`)
    if (storedProgress) {
      setPreparationProgress(JSON.parse(storedProgress))
    }
  }, [courseId, topicId])

  const handleApply = () => {
    const newStatus = {
      status: 'preparing',
      appliedAt: new Date().toISOString()
    }
    setApplicationStatus(newStatus)
    localStorage.setItem(`application_${courseId}_${topicId}`, JSON.stringify(newStatus))
  }

  const updateProgress = (item, value) => {
    const newProgress = { ...preparationProgress, [item]: value }
    setPreparationProgress(newProgress)
    localStorage.setItem(`prep_progress_${courseId}_${topicId}`, JSON.stringify(newProgress))
  }

  const submitApplication = () => {
    if (Object.values(preparationProgress).every(v => v)) {
      const newStatus = {
        status: 'submitted',
        submittedAt: new Date().toISOString()
      }
      setApplicationStatus(newStatus)
      localStorage.setItem(`application_${courseId}_${topicId}`, JSON.stringify(newStatus))
      alert('申请已提交！')
    } else {
      alert('请完成所有申请材料准备')
    }
  }

  const handleViewProfessor = () => {
    navigate(`/student/courses/lab-rotation/${courseId}/topic-browsing/professor-info?id=${topic.professorId}`)
  }

  if (!topic) {
    return <div className="loading">加载中...</div>
  }

  return (
    <div className="topic-details-container">
      <div className="details-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← 返回列表
        </button>
        <div className="header-content">
          <h1>{topic.title}</h1>
          <div className="header-meta">
            <span className="professor-link" onClick={handleViewProfessor}>
              {topic.professorName} - {topic.professorTitle}
            </span>
            <span className="research-area">{topic.researchArea}</span>
            <span className="rating">★ {topic.rating}</span>
          </div>
        </div>
        <div className="header-actions">
          {!applicationStatus && (
            <button className="btn-primary" onClick={handleApply}>
              申请此课题
            </button>
          )}
          {applicationStatus?.status === 'preparing' && (
            <button className="btn-primary" onClick={submitApplication}>
              提交申请
            </button>
          )}
          {applicationStatus?.status === 'submitted' && (
            <span className="status-badge submitted">已提交申请</span>
          )}
        </div>
      </div>

      <div className="details-content">
        <div className="tabs">
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            课题概览
          </button>
          <button
            className={activeTab === 'requirements' ? 'active' : ''}
            onClick={() => setActiveTab('requirements')}
          >
            申请要求
          </button>
          <button
            className={activeTab === 'resources' ? 'active' : ''}
            onClick={() => setActiveTab('resources')}
          >
            资源与成果
          </button>
          <button
            className={activeTab === 'preparation' ? 'active' : ''}
            onClick={() => setActiveTab('preparation')}
          >
            申请准备
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <section className="details-section">
                <h2>课题描述</h2>
                <p>{topic.description}</p>
              </section>

              <section className="details-section">
                <h2>研究背景</h2>
                <p className="preformatted">{topic.background}</p>
              </section>

              <section className="details-section">
                <h2>研究方法</h2>
                <p className="preformatted">{topic.methodology}</p>
              </section>

              <section className="details-section">
                <h2>预期成果</h2>
                <ul>
                  {topic.expectedOutcomes.map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ul>
              </section>

              <section className="details-section">
                <h2>学生评价</h2>
                <div className="testimonials">
                  {topic.testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial">
                      <p>"{testimonial.content}"</p>
                      <span className="author">- {testimonial.student}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div className="requirements-tab">
              <section className="details-section">
                <h2>先修课程要求</h2>
                <div className="requirement-list">
                  {topic.requirements.prerequisites.map((prereq, index) => (
                    <div key={index} className="requirement-item">
                      <span className="check-icon">✓</span>
                      {prereq}
                    </div>
                  ))}
                </div>
              </section>

              <section className="details-section">
                <h2>技能要求</h2>
                <div className="requirement-list">
                  {topic.requirements.skills.map((skill, index) => (
                    <div key={index} className="requirement-item">
                      <span className="check-icon">✓</span>
                      {skill}
                    </div>
                  ))}
                </div>
              </section>

              <section className="details-section">
                <h2>时间投入</h2>
                <div className="time-info">
                  <p><strong>每周时间：</strong>{topic.requirements.timeCommitment}</p>
                  <p><strong>项目周期：</strong>{topic.requirements.duration}</p>
                </div>
              </section>

              <section className="details-section">
                <h2>申请状态</h2>
                <div className="application-stats">
                  <div className="stat-card">
                    <span className="number">{topic.applicants}</span>
                    <span className="label">当前申请人数</span>
                  </div>
                  <div className="stat-card">
                    <span className="number">{topic.slots}</span>
                    <span className="label">招收名额</span>
                  </div>
                  <div className="stat-card">
                    <span className="number">{topic.deadline}</span>
                    <span className="label">申请截止日期</span>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="resources-tab">
              <section className="details-section">
                <h2>实验室资源</h2>
                <div className="resources-grid">
                  <div className="resource-item">
                    <h3>实验室</h3>
                    <p>{topic.resources.lab}</p>
                  </div>
                  <div className="resource-item">
                    <h3>设备</h3>
                    <p>{topic.resources.equipment}</p>
                  </div>
                  <div className="resource-item">
                    <h3>软件</h3>
                    <p>{topic.resources.software}</p>
                  </div>
                  <div className="resource-item">
                    <h3>经费支持</h3>
                    <p>{topic.resources.funding}</p>
                  </div>
                  <div className="resource-item">
                    <h3>数据资源</h3>
                    <p>{topic.resources.datasets}</p>
                  </div>
                </div>
              </section>

              <section className="details-section">
                <h2>相关发表</h2>
                <div className="publications">
                  {topic.relatedPublications.map((pub, index) => (
                    <div key={index} className="publication">
                      <h4>{pub.title}</h4>
                      <p className="authors">{pub.authors}</p>
                      <p className="venue">{pub.journal || pub.conference}, {pub.year}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="details-section">
                <h2>往届学生成果</h2>
                <div className="previous-projects">
                  {topic.previousProjects.map((project, index) => (
                    <div key={index} className="project-card">
                      <h4>{project.student} ({project.year})</h4>
                      <p>{project.outcome}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'preparation' && (
            <div className="preparation-tab">
              <section className="details-section">
                <h2>申请材料准备</h2>
                <div className="preparation-checklist">
                  <div className="checklist-item">
                    <input
                      type="checkbox"
                      checked={preparationProgress.prerequisites}
                      onChange={(e) => updateProgress('prerequisites', e.target.checked)}
                    />
                    <div>
                      <h4>确认先修课程</h4>
                      <p>检查并确认已完成所有必修的先修课程</p>
                    </div>
                  </div>
                  <div className="checklist-item">
                    <input
                      type="checkbox"
                      checked={preparationProgress.statement}
                      onChange={(e) => updateProgress('statement', e.target.checked)}
                    />
                    <div>
                      <h4>个人陈述</h4>
                      <p>撰写500-800字的个人陈述，说明申请动机和研究兴趣</p>
                    </div>
                  </div>
                  <div className="checklist-item">
                    <input
                      type="checkbox"
                      checked={preparationProgress.resume}
                      onChange={(e) => updateProgress('resume', e.target.checked)}
                    />
                    <div>
                      <h4>个人简历</h4>
                      <p>更新简历，突出相关项目和技能经验</p>
                    </div>
                  </div>
                  <div className="checklist-item">
                    <input
                      type="checkbox"
                      checked={preparationProgress.transcript}
                      onChange={(e) => updateProgress('transcript', e.target.checked)}
                    />
                    <div>
                      <h4>成绩单</h4>
                      <p>准备最新的成绩单电子版</p>
                    </div>
                  </div>
                </div>

                <div className="preparation-tips">
                  <h3>申请建议</h3>
                  <ul>
                    <li>仔细阅读课题要求，确保自己符合条件</li>
                    <li>个人陈述要突出与课题相关的经历和兴趣</li>
                    <li>提前联系教授，表达研究兴趣</li>
                    <li>准备好相关项目的作品集或代码示例</li>
                  </ul>
                </div>

                <div className="ai-assistance">
                  <h3>AI 申请助手</h3>
                  <p>基于您的背景和课题要求，AI助手为您提供个性化的申请建议。</p>
                  <button className="ai-button">获取AI申请建议</button>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopicDetails