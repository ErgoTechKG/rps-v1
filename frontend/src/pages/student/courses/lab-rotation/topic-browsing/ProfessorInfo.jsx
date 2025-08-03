import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './ProfessorInfo.css'

const ProfessorInfo = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const professorId = new URLSearchParams(location.search).get('id')
  const [professor, setProfessor] = useState(null)
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    // Mock professor data
    const mockProfessor = {
      id: professorId || 'prof1',
      name: '张教授',
      title: '计算机科学系教授，人工智能实验室主任',
      email: 'zhang.prof@university.edu',
      office: '理工楼 A512',
      officeHours: '每周二、四 14:00-16:00',
      phone: '021-12345678',
      avatar: '👨‍🏫',
      researchAreas: ['人工智能', '机器学习', '医疗图像分析', '深度学习'],
      education: [
        {
          degree: '博士',
          field: '计算机科学',
          institution: '清华大学',
          year: '2005'
        },
        {
          degree: '硕士',
          field: '计算机科学',
          institution: '北京大学',
          year: '2000'
        }
      ],
      biography: `张教授是人工智能领域的知名专家，在机器学习和医疗图像分析方面有着深厚的研究背景。
      他于2005年获得清华大学计算机科学博士学位，随后在斯坦福大学进行博士后研究。
      
      张教授的研究重点是将深度学习技术应用于医疗诊断，特别是在癌症早期检测和疾病预测方面。
      他的研究成果已经在多家医院得到应用，帮助医生提高诊断准确率。`,
      achievements: [
        '国家杰出青年科学基金获得者（2015）',
        'IEEE Fellow（2018）',
        '教育部长江学者特聘教授（2019）',
        '国家科技进步二等奖（2020）'
      ],
      publications: {
        total: 156,
        recent: [
          {
            title: 'Deep Learning for Medical Image Analysis: A Comprehensive Survey',
            journal: 'Nature Machine Intelligence',
            year: '2023',
            citations: 245
          },
          {
            title: 'AI-Powered Early Cancer Detection Using Multi-Modal Medical Data',
            journal: 'The Lancet Digital Health',
            year: '2023',
            citations: 189
          },
          {
            title: 'Federated Learning in Healthcare: A Review',
            journal: 'IEEE Transactions on Medical Imaging',
            year: '2022',
            citations: 312
          }
        ]
      },
      currentProjects: [
        {
          title: '基于深度学习的肺癌早期检测系统',
          funding: '国家自然科学基金重点项目',
          period: '2022-2025',
          budget: '300万元'
        },
        {
          title: 'AI辅助的个性化医疗方案推荐系统',
          funding: '科技部重点研发计划',
          period: '2023-2026',
          budget: '500万元'
        }
      ],
      teachingCourses: [
        {
          code: 'CS401',
          name: '机器学习基础',
          semester: '秋季学期',
          level: '本科生'
        },
        {
          code: 'CS701',
          name: '深度学习与应用',
          semester: '春季学期',
          level: '研究生'
        },
        {
          code: 'CS801',
          name: '医疗AI前沿',
          semester: '秋季学期',
          level: '博士生'
        }
      ],
      supervisionStyle: `我相信研究应该是一个探索和创新的过程。我鼓励学生独立思考，同时提供必要的指导和支持。
      
      在我的实验室，我们每周有定期的组会，学生可以分享他们的进展和遇到的问题。
      我也会一对一地与每个学生讨论他们的研究方向和职业发展。
      
      我期望学生有强烈的求知欲和自我驱动力，同时也重视团队合作和知识分享。`,
      studentTestimonials: [
        {
          name: '李明（2022届博士）',
          position: '现任Google Research研究员',
          content: '张教授不仅在学术上给予我极大的帮助，更重要的是教会了我如何独立思考和解决问题。'
        },
        {
          name: '王芳（2023届硕士）',
          position: '现任阿里巴巴算法工程师',
          content: '在张教授的指导下，我不仅完成了高质量的研究工作，还建立了扎实的理论基础。'
        }
      ],
      labInfo: {
        name: '人工智能实验室',
        location: '理工楼 5层',
        size: '30+研究人员',
        equipment: 'GPU集群、医疗图像数据库、VR/AR设备',
        atmosphere: '开放、创新、协作'
      },
      expectations: [
        '具备扎实的数学和编程基础',
        '对研究有热情和毅力',
        '良好的团队合作精神',
        '较强的英文读写能力',
        '每周至少投入15-20小时'
      ]
    }

    setProfessor(mockProfessor)
  }, [professorId])

  const handleContactProfessor = () => {
    alert(`请发送邮件至：${professor.email}`)
  }

  const handleViewSchedule = () => {
    navigate('/shared/calendar')
  }

  if (!professor) {
    return <div className="loading">加载中...</div>
  }

  return (
    <div className="professor-info-container">
      <div className="professor-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← 返回
        </button>
        <div className="professor-basic-info">
          <div className="avatar">{professor.avatar}</div>
          <div className="info">
            <h1>{professor.name}</h1>
            <p className="title">{professor.title}</p>
            <div className="contact-info">
              <span>📧 {professor.email}</span>
              <span>📍 {professor.office}</span>
              <span>🕐 {professor.officeHours}</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleContactProfessor}>
            联系教授
          </button>
          <button className="btn-secondary" onClick={handleViewSchedule}>
            查看日程
          </button>
        </div>
      </div>

      <div className="professor-nav">
        <button
          className={activeSection === 'overview' ? 'active' : ''}
          onClick={() => setActiveSection('overview')}
        >
          概览
        </button>
        <button
          className={activeSection === 'research' ? 'active' : ''}
          onClick={() => setActiveSection('research')}
        >
          研究成果
        </button>
        <button
          className={activeSection === 'teaching' ? 'active' : ''}
          onClick={() => setActiveSection('teaching')}
        >
          教学信息
        </button>
        <button
          className={activeSection === 'supervision' ? 'active' : ''}
          onClick={() => setActiveSection('supervision')}
        >
          指导风格
        </button>
      </div>

      <div className="professor-content">
        {activeSection === 'overview' && (
          <div className="overview-section">
            <div className="info-card">
              <h2>个人简介</h2>
              <p className="biography">{professor.biography}</p>
            </div>

            <div className="info-card">
              <h2>研究领域</h2>
              <div className="research-areas">
                {professor.researchAreas.map((area, index) => (
                  <span key={index} className="area-tag">{area}</span>
                ))}
              </div>
            </div>

            <div className="info-card">
              <h2>教育背景</h2>
              <div className="education-list">
                {professor.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <h4>{edu.degree} - {edu.field}</h4>
                    <p>{edu.institution}，{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-card">
              <h2>主要成就</h2>
              <ul className="achievements">
                {professor.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeSection === 'research' && (
          <div className="research-section">
            <div className="info-card">
              <h2>发表论文</h2>
              <div className="publication-stats">
                <span className="stat">总发表数：{professor.publications.total}</span>
                <span className="stat">近期发表：</span>
              </div>
              <div className="publications-list">
                {professor.publications.recent.map((pub, index) => (
                  <div key={index} className="publication-item">
                    <h4>{pub.title}</h4>
                    <p>
                      <span className="journal">{pub.journal}</span>
                      <span className="year">({pub.year})</span>
                      <span className="citations">被引用 {pub.citations} 次</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-card">
              <h2>当前项目</h2>
              <div className="projects-list">
                {professor.currentProjects.map((project, index) => (
                  <div key={index} className="project-item">
                    <h4>{project.title}</h4>
                    <div className="project-details">
                      <span>资助：{project.funding}</span>
                      <span>期限：{project.period}</span>
                      <span>经费：{project.budget}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-card">
              <h2>实验室信息</h2>
              <div className="lab-info">
                <h3>{professor.labInfo.name}</h3>
                <div className="lab-details">
                  <p><strong>地点：</strong>{professor.labInfo.location}</p>
                  <p><strong>规模：</strong>{professor.labInfo.size}</p>
                  <p><strong>设备：</strong>{professor.labInfo.equipment}</p>
                  <p><strong>氛围：</strong>{professor.labInfo.atmosphere}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'teaching' && (
          <div className="teaching-section">
            <div className="info-card">
              <h2>教授课程</h2>
              <div className="courses-list">
                {professor.teachingCourses.map((course, index) => (
                  <div key={index} className="course-item">
                    <div className="course-header">
                      <h4>{course.name}</h4>
                      <span className="course-code">{course.code}</span>
                    </div>
                    <div className="course-details">
                      <span>{course.level}</span>
                      <span>{course.semester}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-card">
              <h2>办公时间</h2>
              <div className="office-hours">
                <p>{professor.officeHours}</p>
                <p className="note">建议提前预约，可通过邮件联系</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'supervision' && (
          <div className="supervision-section">
            <div className="info-card">
              <h2>指导理念</h2>
              <p className="philosophy">{professor.supervisionStyle}</p>
            </div>

            <div className="info-card">
              <h2>对学生的期望</h2>
              <ul className="expectations">
                {professor.expectations.map((expectation, index) => (
                  <li key={index}>{expectation}</li>
                ))}
              </ul>
            </div>

            <div className="info-card">
              <h2>学生评价</h2>
              <div className="testimonials">
                {professor.studentTestimonials.map((testimonial, index) => (
                  <div key={index} className="testimonial-item">
                    <p className="content">"{testimonial.content}"</p>
                    <div className="author">
                      <span className="name">{testimonial.name}</span>
                      <span className="position">{testimonial.position}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfessorInfo