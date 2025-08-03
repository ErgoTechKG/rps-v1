import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './MatchingOverview.css'

const MatchingOverview = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  
  const [matchingData, setMatchingData] = useState(null)
  const [selectedView, setSelectedView] = useState('overview')
  const [showRunModal, setShowRunModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  // Mock matching data
  useEffect(() => {
    const mockData = {
      overview: {
        totalStudents: 35,
        totalProfessors: 8,
        totalPositions: 40,
        matchedStudents: 28,
        unmatchedStudents: 7,
        fullyAssignedProfessors: 5,
        partiallyAssignedProfessors: 2,
        unassignedProfessors: 1,
        overallSatisfactionRate: 85,
        lastRunTime: '2024-12-11 14:30:00',
        algorithmVersion: 'v2.1.0'
      },
      statistics: {
        applicationToPositionRatio: 0.875,
        averagePreferenceRank: 2.3,
        conflictResolutionRate: 92,
        waitlistSize: 12,
        backupAssignments: 8
      },
      matches: [
        {
          professorId: 'prof1',
          professorName: '张明教授',
          capacity: 5,
          assigned: [
            { studentId: 'stu1', studentName: '李明', preferenceRank: 1, satisfactionScore: 95 },
            { studentId: 'stu5', studentName: '刘伟', preferenceRank: 2, satisfactionScore: 88 },
            { studentId: 'stu8', studentName: '王强', preferenceRank: 1, satisfactionScore: 92 }
          ],
          waitlist: [
            { studentId: 'stu12', studentName: '陈华', preferenceRank: 1 },
            { studentId: 'stu15', studentName: '赵敏', preferenceRank: 3 }
          ]
        },
        {
          professorId: 'prof2',
          professorName: '李华教授',
          capacity: 4,
          assigned: [
            { studentId: 'stu3', studentName: '王芳', preferenceRank: 1, satisfactionScore: 97 },
            { studentId: 'stu7', studentName: '张丽', preferenceRank: 2, satisfactionScore: 85 },
            { studentId: 'stu11', studentName: '李刚', preferenceRank: 3, satisfactionScore: 78 },
            { studentId: 'stu14', studentName: '周磊', preferenceRank: 1, satisfactionScore: 94 }
          ],
          waitlist: []
        },
        {
          professorId: 'prof3',
          professorName: '王芳教授',
          capacity: 6,
          assigned: [
            { studentId: 'stu2', studentName: '张华', preferenceRank: 1, satisfactionScore: 90 },
            { studentId: 'stu6', studentName: '刘静', preferenceRank: 2, satisfactionScore: 87 }
          ],
          waitlist: [
            { studentId: 'stu9', studentName: '马超', preferenceRank: 1 },
            { studentId: 'stu13', studentName: '孙琳', preferenceRank: 2 }
          ]
        }
      ],
      conflicts: [
        {
          type: 'capacity_exceeded',
          professorId: 'prof1',
          professorName: '张明教授',
          description: '申请人数超过容量限制',
          severity: 'medium',
          affectedStudents: 7,
          suggestedAction: '增加教授容量或调整学生志愿'
        },
        {
          type: 'unmatched_students',
          description: '7名学生未能匹配到合适的导师',
          severity: 'high',
          affectedStudents: 7,
          suggestedAction: '手动分配或联系备选导师'
        },
        {
          type: 'preference_mismatch',
          studentId: 'stu11',
          studentName: '李刚',
          description: '分配结果与第一志愿不符',
          severity: 'low',
          suggestedAction: '与学生沟通或寻找替代方案'
        }
      ],
      unmatchedStudents: [
        { id: 'stu4', name: '陈强', gpa: 2.85, preferences: ['纳米材料', '复合材料'], reason: 'GPA不符合要求' },
        { id: 'stu16', name: '杨柳', gpa: 3.45, preferences: ['机器学习', '数据挖掘'], reason: '志愿教授容量已满' },
        { id: 'stu17', name: '胡涛', gpa: 3.62, preferences: ['生物信息学'], reason: '专业不匹配' },
        { id: 'stu18', name: '吴敏', gpa: 3.78, preferences: ['信号处理'], reason: '面试未通过' },
        { id: 'stu19', name: '许强', gpa: 3.55, preferences: ['材料科学'], reason: '申请时间过晚' },
        { id: 'stu20', name: '韩梅', gpa: 3.41, preferences: ['计算机视觉'], reason: '志愿教授容量已满' },
        { id: 'stu21', name: '林峰', gpa: 3.33, preferences: ['自然语言处理'], reason: '前置课程未完成' }
      ]
    }
    setMatchingData(mockData)
  }, [])

  const handleRunMatching = async () => {
    setIsRunning(true)
    setShowRunModal(false)
    
    // Simulate matching process
    setTimeout(() => {
      setIsRunning(false)
      // Update last run time
      setMatchingData(prev => ({
        ...prev,
        overview: {
          ...prev.overview,
          lastRunTime: new Date().toLocaleString('zh-CN')
        }
      }))
    }, 3000)
  }

  const getSatisfactionColor = (score) => {
    if (score >= 90) return '#4CAF50'
    if (score >= 80) return '#FF9800'
    return '#F44336'
  }

  const getSeverityColor = (severity) => {
    const colors = {
      high: '#F44336',
      medium: '#FF9800',
      low: '#FFC107'
    }
    return colors[severity] || '#666'
  }

  const renderOverviewView = () => (
    <div className="overview-grid">
      <div className="stats-section">
        <h3 className="section-title">匹配统计</h3>
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-number">{matchingData.overview.matchedStudents}</div>
            <div className="stat-label">已匹配学生</div>
            <div className="stat-total">/ {matchingData.overview.totalStudents}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{matchingData.overview.fullyAssignedProfessors}</div>
            <div className="stat-label">满额教授</div>
            <div className="stat-total">/ {matchingData.overview.totalProfessors}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{matchingData.overview.overallSatisfactionRate}%</div>
            <div className="stat-label">总体满意度</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{matchingData.statistics.applicationToPositionRatio.toFixed(2)}</div>
            <div className="stat-label">申请比例</div>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <h3 className="section-title">匹配进度</h3>
        <div className="progress-bars">
          <div className="progress-item">
            <div className="progress-label">
              <span>学生匹配进度</span>
              <span>{matchingData.overview.matchedStudents}/{matchingData.overview.totalStudents}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill students"
                style={{ width: `${(matchingData.overview.matchedStudents / matchingData.overview.totalStudents) * 100}%` }}
              />
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label">
              <span>教授分配进度</span>
              <span>{matchingData.overview.fullyAssignedProfessors}/{matchingData.overview.totalProfessors}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill professors"
                style={{ width: `${(matchingData.overview.fullyAssignedProfessors / matchingData.overview.totalProfessors) * 100}%` }}
              />
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label">
              <span>志愿满足度</span>
              <span>{matchingData.overview.overallSatisfactionRate}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill satisfaction"
                style={{ width: `${matchingData.overview.overallSatisfactionRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="conflicts-section">
        <h3 className="section-title">冲突与问题</h3>
        <div className="conflicts-list">
          {matchingData.conflicts.map((conflict, index) => (
            <div key={index} className="conflict-item">
              <div className="conflict-header">
                <span 
                  className="conflict-severity"
                  style={{ backgroundColor: getSeverityColor(conflict.severity) }}
                >
                  {conflict.severity === 'high' ? '高' : conflict.severity === 'medium' ? '中' : '低'}
                </span>
                <span className="conflict-title">{conflict.description}</span>
              </div>
              <div className="conflict-details">
                {conflict.affectedStudents && (
                  <span>影响学生: {conflict.affectedStudents}人</span>
                )}
                <span className="conflict-action">建议: {conflict.suggestedAction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderMatchesView = () => (
    <div className="matches-container">
      {matchingData.matches.map(match => (
        <div key={match.professorId} className="professor-match-card">
          <div className="professor-header">
            <h4 className="professor-name">{match.professorName}</h4>
            <div className="capacity-info">
              <span className="assigned-count">{match.assigned.length}</span>
              <span className="capacity-total">/ {match.capacity}</span>
            </div>
          </div>
          
          <div className="students-section">
            <h5 className="students-title">已分配学生</h5>
            <div className="students-list">
              {match.assigned.map(student => (
                <div key={student.studentId} className="student-item">
                  <div className="student-info">
                    <span className="student-name">{student.studentName}</span>
                    <span className="preference-rank">第{student.preferenceRank}志愿</span>
                  </div>
                  <div 
                    className="satisfaction-score"
                    style={{ color: getSatisfactionColor(student.satisfactionScore) }}
                  >
                    {student.satisfactionScore}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {match.waitlist.length > 0 && (
            <div className="waitlist-section">
              <h5 className="waitlist-title">候选名单</h5>
              <div className="waitlist-list">
                {match.waitlist.map(student => (
                  <div key={student.studentId} className="waitlist-item">
                    <span className="student-name">{student.studentName}</span>
                    <span className="preference-rank">第{student.preferenceRank}志愿</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  const renderUnmatchedView = () => (
    <div className="unmatched-container">
      <div className="unmatched-header">
        <h3>未匹配学生列表</h3>
        <div className="unmatched-stats">
          <span className="unmatched-count">{matchingData.unmatchedStudents.length} 名学生未匹配</span>
        </div>
      </div>
      <div className="unmatched-table">
        <table>
          <thead>
            <tr>
              <th>学生姓名</th>
              <th>GPA</th>
              <th>志愿偏好</th>
              <th>未匹配原因</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {matchingData.unmatchedStudents.map(student => (
              <tr key={student.id}>
                <td className="student-name">{student.name}</td>
                <td className="student-gpa" style={{ color: getSatisfactionColor(student.gpa * 25) }}>
                  {student.gpa.toFixed(2)}
                </td>
                <td className="student-preferences">
                  {student.preferences.map((pref, index) => (
                    <span key={index} className="preference-tag">{pref}</span>
                  ))}
                </td>
                <td className="unmatch-reason">{student.reason}</td>
                <td className="student-actions">
                  <button className="action-btn assign" title="手动分配">
                    👥
                  </button>
                  <button className="action-btn contact" title="联系学生">
                    📞
                  </button>
                  <button className="action-btn exception" title="特殊处理">
                    ⚠️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  if (!matchingData) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div>加载匹配数据中...</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="matching-overview-container">
        <div className="participant-header">
          <h1 className="page-title">匹配与分配概览</h1>
          <div className="participant-nav">
            <button 
              className="nav-button"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/participant-management/professor-list`)}
            >
              教授列表
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/participant-management/student-list`)}
            >
              学生列表
            </button>
            <button 
              className="nav-button active"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/participant-management/matching-overview`)}
            >
              匹配概览
            </button>
            <button 
              className="nav-button"
              onClick={() => navigate(`/secretary/course-management/lab-rotation/${courseId}/participant-management/adjustment`)}
            >
              手动调整
            </button>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div className="header-left">
              <h2 className="card-title">匹配算法结果</h2>
              <div className="last-run-info">
                <span>最后运行: {matchingData.overview.lastRunTime}</span>
                <span>算法版本: {matchingData.overview.algorithmVersion}</span>
              </div>
            </div>
            <div className="header-actions">
              <button className="action-button secondary" onClick={() => setShowExportModal(true)}>
                导出报告
              </button>
              <button 
                className="action-button primary"
                onClick={() => setShowRunModal(true)}
                disabled={isRunning}
              >
                {isRunning ? '运行中...' : '重新运行匹配'}
              </button>
            </div>
          </div>

          <div className="view-selector">
            <button 
              className={`view-button ${selectedView === 'overview' ? 'active' : ''}`}
              onClick={() => setSelectedView('overview')}
            >
              总览
            </button>
            <button 
              className={`view-button ${selectedView === 'matches' ? 'active' : ''}`}
              onClick={() => setSelectedView('matches')}
            >
              匹配结果
            </button>
            <button 
              className={`view-button ${selectedView === 'unmatched' ? 'active' : ''}`}
              onClick={() => setSelectedView('unmatched')}
            >
              未匹配学生
            </button>
          </div>

          <div className="view-content">
            {selectedView === 'overview' && renderOverviewView()}
            {selectedView === 'matches' && renderMatchesView()}
            {selectedView === 'unmatched' && renderUnmatchedView()}
          </div>

          {isRunning && (
            <div className="running-overlay">
              <div className="running-content">
                <div className="loading-spinner large"></div>
                <div className="running-text">正在运行匹配算法...</div>
                <div className="running-progress">
                  <div className="running-progress-bar">
                    <div className="running-progress-fill"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Run Matching Modal */}
        {showRunModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>重新运行匹配算法</h3>
                <button className="close-button" onClick={() => setShowRunModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="warning-message">
                  <div className="warning-icon">⚠️</div>
                  <div className="warning-text">
                    <p>重新运行匹配算法将覆盖当前的匹配结果。</p>
                    <p>请确认是否继续操作？</p>
                  </div>
                </div>
                <div className="algorithm-options">
                  <h4>算法参数</h4>
                  <div className="option-group">
                    <label>
                      <input type="checkbox" defaultChecked />
                      优先考虑学生志愿
                    </label>
                    <label>
                      <input type="checkbox" defaultChecked />
                      平衡教授工作量
                    </label>
                    <label>
                      <input type="checkbox" />
                      允许超出容量10%
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowRunModal(false)}>
                  取消
                </button>
                <button className="action-button primary" onClick={handleRunMatching}>
                  确认运行
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Export Modal */}
        {showExportModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>导出匹配报告</h3>
                <button className="close-button" onClick={() => setShowExportModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="export-options">
                  <h4>导出内容</h4>
                  <div className="option-group">
                    <label>
                      <input type="checkbox" defaultChecked />
                      匹配统计信息
                    </label>
                    <label>
                      <input type="checkbox" defaultChecked />
                      详细匹配结果
                    </label>
                    <label>
                      <input type="checkbox" defaultChecked />
                      未匹配学生列表
                    </label>
                    <label>
                      <input type="checkbox" />
                      冲突分析报告
                    </label>
                  </div>
                </div>
                <div className="export-format">
                  <h4>导出格式</h4>
                  <div className="format-options">
                    <label>
                      <input type="radio" name="format" value="excel" defaultChecked />
                      Excel (.xlsx)
                    </label>
                    <label>
                      <input type="radio" name="format" value="pdf" />
                      PDF 报告
                    </label>
                    <label>
                      <input type="radio" name="format" value="csv" />
                      CSV 文件
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button className="action-button secondary" onClick={() => setShowExportModal(false)}>
                  取消
                </button>
                <button className="action-button primary">
                  导出报告
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default MatchingOverview