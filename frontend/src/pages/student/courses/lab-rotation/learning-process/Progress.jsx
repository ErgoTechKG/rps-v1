import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './Progress.css'

const Progress = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [progressData, setProgressData] = useState(null)
  const [timeEntries, setTimeEntries] = useState([])
  const [milestones, setMilestones] = useState([])
  const [selfAssessment, setSelfAssessment] = useState({})
  const [goals, setGoals] = useState([])
  const [selectedTab, setSelectedTab] = useState('overview')
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showTimeModal, setShowTimeModal] = useState(false)
  const [showAssessmentModal, setShowAssessmentModal] = useState(false)
  const [newGoal, setNewGoal] = useState({ title: '', description: '', deadline: '', category: 'research' })
  const [newTimeEntry, setNewTimeEntry] = useState({ 
    date: new Date().toISOString().split('T')[0], 
    activity: '', 
    hours: '', 
    description: '', 
    category: 'research' 
  })

  useEffect(() => {
    loadProgressData()
    loadTimeEntries()
    loadMilestones()
    loadSelfAssessment()
    loadGoals()
  }, [courseId])

  const loadProgressData = () => {
    // Mock progress data
    const mockProgress = {
      overall: 65,
      research: 70,
      coding: 60,
      writing: 55,
      presentation: 40,
      timeline: {
        total: 16, // weeks
        completed: 6,
        current: 7
      },
      learningObjectives: [
        { 
          id: '1', 
          title: '掌握深度学习基础理论', 
          completed: true, 
          completedDate: '2024-02-10',
          description: '理解神经网络基本原理和反向传播算法'
        },
        { 
          id: '2', 
          title: '熟练使用深度学习框架', 
          completed: true, 
          completedDate: '2024-02-15',
          description: 'PyTorch框架的基本使用和模型构建'
        },
        { 
          id: '3', 
          title: '完成文献调研', 
          completed: true, 
          completedDate: '2024-02-18',
          description: '调研相关领域的最新研究进展'
        },
        { 
          id: '4', 
          title: '实现基础算法', 
          completed: false, 
          completedDate: null,
          description: '复现一个经典的深度学习算法'
        },
        { 
          id: '5', 
          title: '设计实验方案', 
          completed: false, 
          completedDate: null,
          description: '设计对比实验来验证改进方法'
        },
        { 
          id: '6', 
          title: '撰写中期报告', 
          completed: false, 
          completedDate: null,
          description: '总结前期工作并规划后续研究'
        }
      ],
      skills: [
        { name: '机器学习', level: 75, improvement: '+15' },
        { name: 'Python编程', level: 80, improvement: '+10' },
        { name: '数据分析', level: 70, improvement: '+20' },
        { name: '学术写作', level: 55, improvement: '+25' },
        { name: '问题解决', level: 65, improvement: '+18' },
        { name: '文献调研', level: 85, improvement: '+12' }
      ],
      weeklyProgress: [
        { week: 1, research: 20, coding: 10, writing: 5, presentation: 0 },
        { week: 2, research: 35, coding: 20, writing: 10, presentation: 5 },
        { week: 3, research: 50, coding: 30, writing: 15, presentation: 10 },
        { week: 4, research: 60, coding: 45, writing: 25, presentation: 15 },
        { week: 5, research: 65, coding: 55, writing: 35, presentation: 20 },
        { week: 6, research: 70, coding: 60, writing: 45, presentation: 30 },
        { week: 7, research: 70, coding: 60, writing: 55, presentation: 40 }
      ]
    }
    setProgressData(mockProgress)
  }

  const loadTimeEntries = () => {
    const mockTimeEntries = [
      { 
        id: '1', 
        date: '2024-02-20', 
        activity: '文献阅读', 
        hours: 4, 
        description: '阅读了3篇关于Transformer的论文',
        category: 'research'
      },
      { 
        id: '2', 
        date: '2024-02-20', 
        activity: '代码实现', 
        hours: 3, 
        description: '搭建基础的神经网络架构',
        category: 'coding'
      },
      { 
        id: '3', 
        date: '2024-02-19', 
        activity: '报告撰写', 
        hours: 2, 
        description: '撰写周报的第一部分',
        category: 'writing'
      },
      { 
        id: '4', 
        date: '2024-02-19', 
        activity: '会议讨论', 
        hours: 1, 
        description: '与导师讨论研究方向',
        category: 'meeting'
      },
      { 
        id: '5', 
        date: '2024-02-18', 
        activity: '实验设计', 
        hours: 2.5, 
        description: '设计对比实验的方案',
        category: 'research'
      }
    ]
    
    const savedTimeEntries = localStorage.getItem(`timeEntries_${courseId}`)
    if (savedTimeEntries) {
      setTimeEntries(JSON.parse(savedTimeEntries))
    } else {
      setTimeEntries(mockTimeEntries)
      localStorage.setItem(`timeEntries_${courseId}`, JSON.stringify(mockTimeEntries))
    }
  }

  const loadMilestones = () => {
    const mockMilestones = [
      { 
        id: '1', 
        title: '项目启动', 
        date: '2024-02-01', 
        status: 'completed',
        description: '完成项目启动和计划制定'
      },
      { 
        id: '2', 
        title: '文献调研完成', 
        date: '2024-02-15', 
        status: 'completed',
        description: '完成30篇相关论文的调研'
      },
      { 
        id: '3', 
        title: '环境搭建完成', 
        date: '2024-02-20', 
        status: 'completed',
        description: '完成开发和实验环境的搭建'
      },
      { 
        id: '4', 
        title: '基础算法实现', 
        date: '2024-03-01', 
        status: 'in_progress',
        description: '实现并验证基础算法'
      },
      { 
        id: '5', 
        title: '中期报告', 
        date: '2024-03-15', 
        status: 'pending',
        description: '完成中期进展报告'
      },
      { 
        id: '6', 
        title: '实验完成', 
        date: '2024-04-15', 
        status: 'pending',
        description: '完成所有对比实验'
      },
      { 
        id: '7', 
        title: '论文撰写', 
        date: '2024-05-01', 
        status: 'pending',
        description: '完成研究论文撰写'
      },
      { 
        id: '8', 
        title: '项目答辩', 
        date: '2024-05-15', 
        status: 'pending',
        description: '项目最终答辩和展示'
      }
    ]
    setMilestones(mockMilestones)
  }

  const loadSelfAssessment = () => {
    const mockAssessment = {
      technicalSkills: 75,
      researchAbility: 70,
      communicationSkills: 65,
      problemSolving: 80,
      timeManagement: 60,
      teamwork: 75,
      strengths: [
        '快速学习新技术',
        '逻辑思维清晰',
        '代码实现能力强'
      ],
      areasForImprovement: [
        '学术写作技巧',
        '时间管理',
        '演讲表达能力'
      ],
      goals: [
        '提高研究论文的写作质量',
        '增强项目时间规划能力',
        '培养批判性思维'
      ],
      reflection: '这段时间在研究项目中学到了很多，特别是在深度学习理论和实践方面。需要继续加强写作和表达能力。',
      lastUpdated: '2024-02-20'
    }
    
    const savedAssessment = localStorage.getItem(`selfAssessment_${courseId}`)
    if (savedAssessment) {
      setSelfAssessment(JSON.parse(savedAssessment))
    } else {
      setSelfAssessment(mockAssessment)
      localStorage.setItem(`selfAssessment_${courseId}`, JSON.stringify(mockAssessment))
    }
  }

  const loadGoals = () => {
    const mockGoals = [
      {
        id: '1',
        title: '完成深度学习模型复现',
        description: '复现一个经典的深度学习模型并进行改进',
        deadline: '2024-03-01',
        category: 'research',
        status: 'in_progress',
        progress: 60,
        createdAt: '2024-02-01'
      },
      {
        id: '2',
        title: '提高Python编程能力',
        description: '学习高级Python特性和最佳实践',
        deadline: '2024-02-28',
        category: 'skill',
        status: 'completed',
        progress: 100,
        createdAt: '2024-02-01'
      },
      {
        id: '3',
        title: '撰写中期报告',
        description: '总结前期研究进展并制定后续计划',
        deadline: '2024-03-15',
        category: 'writing',
        status: 'not_started',
        progress: 0,
        createdAt: '2024-02-15'
      }
    ]
    
    const savedGoals = localStorage.getItem(`goals_${courseId}`)
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    } else {
      setGoals(mockGoals)
      localStorage.setItem(`goals_${courseId}`, JSON.stringify(savedGoals))
    }
  }

  const saveTimeEntry = () => {
    if (!newTimeEntry.activity || !newTimeEntry.hours) {
      alert('请填写必填字段')
      return
    }

    const timeEntry = {
      id: Date.now().toString(),
      ...newTimeEntry,
      hours: parseFloat(newTimeEntry.hours)
    }

    const updatedEntries = [...timeEntries, timeEntry]
    setTimeEntries(updatedEntries)
    localStorage.setItem(`timeEntries_${courseId}`, JSON.stringify(updatedEntries))

    setShowTimeModal(false)
    setNewTimeEntry({ 
      date: new Date().toISOString().split('T')[0], 
      activity: '', 
      hours: '', 
      description: '', 
      category: 'research' 
    })
    alert('时间记录已保存！')
  }

  const saveGoal = () => {
    if (!newGoal.title || !newGoal.deadline) {
      alert('请填写必填字段')
      return
    }

    const goal = {
      id: Date.now().toString(),
      ...newGoal,
      status: 'not_started',
      progress: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }

    const updatedGoals = [...goals, goal]
    setGoals(updatedGoals)
    localStorage.setItem(`goals_${courseId}`, JSON.stringify(updatedGoals))

    setShowGoalModal(false)
    setNewGoal({ title: '', description: '', deadline: '', category: 'research' })
    alert('学习目标已保存！')
  }

  const updateGoalProgress = (goalId, progress) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        return { 
          ...goal, 
          progress,
          status: progress === 100 ? 'completed' : progress > 0 ? 'in_progress' : 'not_started'
        }
      }
      return goal
    })
    setGoals(updatedGoals)
    localStorage.setItem(`goals_${courseId}`, JSON.stringify(updatedGoals))
  }

  const saveSelfAssessment = () => {
    localStorage.setItem(`selfAssessment_${courseId}`, JSON.stringify({
      ...selfAssessment,
      lastUpdated: new Date().toISOString().split('T')[0]
    }))
    setShowAssessmentModal(false)
    alert('自我评估已保存！')
  }

  const getTimeByCategory = () => {
    const categoryTotals = {}
    timeEntries.forEach(entry => {
      categoryTotals[entry.category] = (categoryTotals[entry.category] || 0) + entry.hours
    })
    return categoryTotals
  }

  const getTotalHours = () => {
    return timeEntries.reduce((total, entry) => total + entry.hours, 0)
  }

  const getRecentTimeEntries = () => {
    return timeEntries
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN')
  }

  const getCategoryColor = (category) => {
    const colors = {
      research: '#3498db',
      coding: '#27ae60',
      writing: '#e67e22',
      meeting: '#9b59b6',
      presentation: '#e74c3c'
    }
    return colors[category] || '#95a5a6'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#27ae60'
      case 'in_progress': return '#f39c12'
      case 'not_started': return '#95a5a6'
      case 'pending': return '#3498db'
      default: return '#95a5a6'
    }
  }

  const renderOverview = () => (
    <div className="overview-tab">
      <div className="overview-stats">
        <div className="stat-card large">
          <h3>整体进度</h3>
          <div className="progress-circle">
            <div className="circle">
              <span className="percentage">{progressData.overall}%</span>
            </div>
          </div>
          <p>项目完成度</p>
        </div>
        
        <div className="stat-card">
          <h3>学习目标</h3>
          <div className="objectives-summary">
            <div className="objective-stat">
              <span className="number">{progressData.learningObjectives.filter(o => o.completed).length}</span>
              <span className="label">已完成</span>
            </div>
            <div className="objective-stat">
              <span className="number">{progressData.learningObjectives.length}</span>
              <span className="label">总目标</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <h3>时间投入</h3>
          <div className="time-summary">
            <div className="time-stat">
              <span className="number">{getTotalHours().toFixed(1)}</span>
              <span className="label">总时长(小时)</span>
            </div>
            <div className="time-stat">
              <span className="number">{timeEntries.length}</span>
              <span className="label">记录条数</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <h3>项目时间线</h3>
          <div className="timeline-summary">
            <div className="timeline-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(progressData.timeline.completed / progressData.timeline.total) * 100}%` }}
                ></div>
              </div>
              <span className="timeline-text">
                第 {progressData.timeline.current} 周 / 共 {progressData.timeline.total} 周
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="overview-charts">
        <div className="chart-container">
          <h3>各领域进度</h3>
          <div className="progress-bars">
            <div className="progress-item">
              <span className="progress-label">研究能力</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill research"
                  style={{ width: `${progressData.research}%` }}
                ></div>
              </div>
              <span className="progress-percent">{progressData.research}%</span>
            </div>
            <div className="progress-item">
              <span className="progress-label">编程技能</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill coding"
                  style={{ width: `${progressData.coding}%` }}
                ></div>
              </div>
              <span className="progress-percent">{progressData.coding}%</span>
            </div>
            <div className="progress-item">
              <span className="progress-label">写作能力</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill writing"
                  style={{ width: `${progressData.writing}%` }}
                ></div>
              </div>
              <span className="progress-percent">{progressData.writing}%</span>
            </div>
            <div className="progress-item">
              <span className="progress-label">演讲表达</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill presentation"
                  style={{ width: `${progressData.presentation}%` }}
                ></div>
              </div>
              <span className="progress-percent">{progressData.presentation}%</span>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h3>时间分配</h3>
          <div className="time-distribution">
            {Object.entries(getTimeByCategory()).map(([category, hours]) => (
              <div key={category} className="time-category">
                <div className="category-info">
                  <span 
                    className="category-dot"
                    style={{ backgroundColor: getCategoryColor(category) }}
                  ></span>
                  <span className="category-name">
                    {category === 'research' ? '研究' :
                     category === 'coding' ? '编程' :
                     category === 'writing' ? '写作' :
                     category === 'meeting' ? '会议' :
                     category === 'presentation' ? '演讲' : category}
                  </span>
                </div>
                <span className="category-hours">{hours.toFixed(1)}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="recent-activities">
        <h3>最近活动</h3>
        <div className="activities-list">
          {getRecentTimeEntries().map(entry => (
            <div key={entry.id} className="activity-item">
              <div className="activity-info">
                <span className="activity-name">{entry.activity}</span>
                <span className="activity-date">{formatDate(entry.date)}</span>
              </div>
              <div className="activity-details">
                <span 
                  className="activity-category"
                  style={{ backgroundColor: getCategoryColor(entry.category) }}
                >
                  {entry.category === 'research' ? '研究' :
                   entry.category === 'coding' ? '编程' :
                   entry.category === 'writing' ? '写作' :
                   entry.category === 'meeting' ? '会议' : entry.category}
                </span>
                <span className="activity-hours">{entry.hours}h</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTimeTracking = () => (
    <div className="time-tracking-tab">
      <div className="tab-header">
        <h3>时间跟踪</h3>
        <button 
          className="primary-btn"
          onClick={() => setShowTimeModal(true)}
        >
          记录时间
        </button>
      </div>

      <div className="time-stats">
        <div className="stat-summary">
          <div className="stat-item">
            <span className="stat-number">{getTotalHours().toFixed(1)}</span>
            <span className="stat-label">总时长</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{(getTotalHours() / 7).toFixed(1)}</span>
            <span className="stat-label">周平均</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{timeEntries.length}</span>
            <span className="stat-label">记录数</span>
          </div>
        </div>
      </div>

      <div className="time-entries">
        <h4>时间记录</h4>
        <div className="entries-list">
          {timeEntries.map(entry => (
            <div key={entry.id} className="entry-item">
              <div className="entry-header">
                <span className="entry-activity">{entry.activity}</span>
                <div className="entry-meta">
                  <span 
                    className="entry-category"
                    style={{ backgroundColor: getCategoryColor(entry.category) }}
                  >
                    {entry.category === 'research' ? '研究' :
                     entry.category === 'coding' ? '编程' :
                     entry.category === 'writing' ? '写作' :
                     entry.category === 'meeting' ? '会议' : entry.category}
                  </span>
                  <span className="entry-hours">{entry.hours}h</span>
                </div>
              </div>
              <div className="entry-details">
                <span className="entry-date">{formatDate(entry.date)}</span>
                {entry.description && (
                  <p className="entry-description">{entry.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderMilestones = () => (
    <div className="milestones-tab">
      <h3>项目里程碑</h3>
      <div className="timeline">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className={`timeline-item ${milestone.status}`}>
            <div className="timeline-marker">
              <div className={`marker-dot ${milestone.status}`}></div>
              {index < milestones.length - 1 && <div className="timeline-line"></div>}
            </div>
            <div className="timeline-content">
              <div className="milestone-header">
                <h4 className="milestone-title">{milestone.title}</h4>
                <span className="milestone-date">{formatDate(milestone.date)}</span>
              </div>
              <p className="milestone-description">{milestone.description}</p>
              <span 
                className="milestone-status"
                style={{ backgroundColor: getStatusColor(milestone.status) }}
              >
                {milestone.status === 'completed' ? '已完成' :
                 milestone.status === 'in_progress' ? '进行中' : '待开始'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderGoals = () => (
    <div className="goals-tab">
      <div className="tab-header">
        <h3>学习目标</h3>
        <button 
          className="primary-btn"
          onClick={() => setShowGoalModal(true)}
        >
          设置目标
        </button>
      </div>

      <div className="goals-list">
        {goals.map(goal => (
          <div key={goal.id} className={`goal-item ${goal.status}`}>
            <div className="goal-header">
              <h4 className="goal-title">{goal.title}</h4>
              <span 
                className="goal-status"
                style={{ backgroundColor: getStatusColor(goal.status) }}
              >
                {goal.status === 'completed' ? '已完成' :
                 goal.status === 'in_progress' ? '进行中' : '未开始'}
              </span>
            </div>
            <p className="goal-description">{goal.description}</p>
            <div className="goal-progress">
              <div className="progress-header">
                <span>进度: {goal.progress}%</span>
                <span>截止: {formatDate(goal.deadline)}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={goal.progress}
                onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                className="progress-slider"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSelfAssessment = () => (
    <div className="assessment-tab">
      <div className="tab-header">
        <h3>自我评估</h3>
        <button 
          className="primary-btn"
          onClick={() => setShowAssessmentModal(true)}
        >
          更新评估
        </button>
      </div>

      <div className="assessment-content">
        <div className="skills-assessment">
          <h4>技能评估</h4>
          <div className="skills-grid">
            {Object.entries(selfAssessment).filter(([key]) => 
              ['technicalSkills', 'researchAbility', 'communicationSkills', 'problemSolving', 'timeManagement', 'teamwork'].includes(key)
            ).map(([skill, score]) => (
              <div key={skill} className="skill-item">
                <span className="skill-name">
                  {skill === 'technicalSkills' ? '技术技能' :
                   skill === 'researchAbility' ? '研究能力' :
                   skill === 'communicationSkills' ? '沟通技巧' :
                   skill === 'problemSolving' ? '问题解决' :
                   skill === 'timeManagement' ? '时间管理' :
                   skill === 'teamwork' ? '团队合作' : skill}
                </span>
                <div className="skill-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                  <span className="skill-score">{score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="assessment-sections">
          <div className="assessment-section">
            <h4>优势领域</h4>
            <ul>
              {selfAssessment.strengths?.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>

          <div className="assessment-section">
            <h4>改进领域</h4>
            <ul>
              {selfAssessment.areasForImprovement?.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>

          <div className="assessment-section">
            <h4>学习目标</h4>
            <ul>
              {selfAssessment.goals?.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>

          <div className="assessment-section">
            <h4>反思总结</h4>
            <p>{selfAssessment.reflection}</p>
          </div>
        </div>
      </div>
    </div>
  )

  if (!progressData) {
    return <Layout><div className="loading">加载中...</div></Layout>
  }

  return (
    <Layout>
      <div className="progress-container">
        <div className="progress-header">
          <div className="header-left">
            <h1>进度跟踪</h1>
            <div className="breadcrumb">
              <span onClick={() => navigate(`/student/dashboard`)}>学生工作台</span>
              <span>/</span>
              <span onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/learning-process/tasks`)}>学习过程</span>
              <span>/</span>
              <span>进度跟踪</span>
            </div>
          </div>
          
          <div className="header-actions">
            <button 
              className="nav-btn"
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/learning-process/tasks`)}
            >
              任务管理
            </button>
            <button 
              className="nav-btn"
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/learning-process/submissions`)}
            >
              作业提交
            </button>
            <button 
              className="nav-btn"
              onClick={() => navigate(`/student/courses/lab-rotation/${courseId}/learning-process/meetings`)}
            >
              会议管理
            </button>
          </div>
        </div>

        <div className="progress-tabs">
          <button 
            className={`tab-btn ${selectedTab === 'overview' ? 'active' : ''}`}
            onClick={() => setSelectedTab('overview')}
          >
            总览
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'time' ? 'active' : ''}`}
            onClick={() => setSelectedTab('time')}
          >
            时间跟踪
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'milestones' ? 'active' : ''}`}
            onClick={() => setSelectedTab('milestones')}
          >
            里程碑
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'goals' ? 'active' : ''}`}
            onClick={() => setSelectedTab('goals')}
          >
            学习目标
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'assessment' ? 'active' : ''}`}
            onClick={() => setSelectedTab('assessment')}
          >
            自我评估
          </button>
        </div>

        <div className="progress-content">
          {selectedTab === 'overview' && renderOverview()}
          {selectedTab === 'time' && renderTimeTracking()}
          {selectedTab === 'milestones' && renderMilestones()}
          {selectedTab === 'goals' && renderGoals()}
          {selectedTab === 'assessment' && renderSelfAssessment()}
        </div>

        {/* Time Entry Modal */}
        {showTimeModal && (
          <div className="modal" onClick={() => setShowTimeModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>记录时间</h2>
                <button onClick={() => setShowTimeModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>日期 *</label>
                  <input
                    type="date"
                    value={newTimeEntry.date}
                    onChange={(e) => setNewTimeEntry({ ...newTimeEntry, date: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>活动 *</label>
                  <input
                    type="text"
                    value={newTimeEntry.activity}
                    onChange={(e) => setNewTimeEntry({ ...newTimeEntry, activity: e.target.value })}
                    placeholder="请输入活动名称"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>时长（小时）*</label>
                    <input
                      type="number"
                      step="0.5"
                      value={newTimeEntry.hours}
                      onChange={(e) => setNewTimeEntry({ ...newTimeEntry, hours: e.target.value })}
                      placeholder="例如: 2.5"
                    />
                  </div>
                  <div className="form-group">
                    <label>类别</label>
                    <select
                      value={newTimeEntry.category}
                      onChange={(e) => setNewTimeEntry({ ...newTimeEntry, category: e.target.value })}
                    >
                      <option value="research">研究</option>
                      <option value="coding">编程</option>
                      <option value="writing">写作</option>
                      <option value="meeting">会议</option>
                      <option value="presentation">演讲</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>描述</label>
                  <textarea
                    value={newTimeEntry.description}
                    onChange={(e) => setNewTimeEntry({ ...newTimeEntry, description: e.target.value })}
                    placeholder="请简要描述活动内容"
                    rows="3"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowTimeModal(false)}>
                  取消
                </button>
                <button className="btn-primary" onClick={saveTimeEntry}>
                  保存
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Goal Modal */}
        {showGoalModal && (
          <div className="modal" onClick={() => setShowGoalModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>设置学习目标</h2>
                <button onClick={() => setShowGoalModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>目标标题 *</label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    placeholder="请输入目标标题"
                  />
                </div>
                <div className="form-group">
                  <label>目标描述</label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    placeholder="请详细描述目标内容"
                    rows="3"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>截止日期 *</label>
                    <input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>类别</label>
                    <select
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                    >
                      <option value="research">研究</option>
                      <option value="skill">技能</option>
                      <option value="writing">写作</option>
                      <option value="presentation">演讲</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowGoalModal(false)}>
                  取消
                </button>
                <button className="btn-primary" onClick={saveGoal}>
                  保存
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Progress