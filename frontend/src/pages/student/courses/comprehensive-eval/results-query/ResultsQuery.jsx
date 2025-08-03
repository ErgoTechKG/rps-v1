import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { FileText, BarChart, Trophy, AlertCircle, Download, ArrowLeft } from 'lucide-react'
import FinalResults from './FinalResults'
import ScoreBreakdown from './ScoreBreakdown'
import Ranking from './Ranking'
import Appeals from './Appeals'
import './ResultsQuery.css'

const ResultsQuery = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('final-results')
  const [loading, setLoading] = useState(true)
  const [evaluationData, setEvaluationData] = useState(null)
  const [appealStatus, setAppealStatus] = useState(null)

  useEffect(() => {
    const path = location.pathname
    if (path.includes('score-breakdown')) setActiveTab('score-breakdown')
    else if (path.includes('ranking')) setActiveTab('ranking')
    else if (path.includes('appeals')) setActiveTab('appeals')
    else setActiveTab('final-results')
  }, [location])

  useEffect(() => {
    fetchEvaluationData()
    fetchAppealStatus()
  }, [courseId])

  const fetchEvaluationData = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setEvaluationData({
        courseId,
        courseName: '综合评价 2024',
        studentInfo: {
          name: '张三',
          studentId: '2021001',
          major: '计算机科学与技术',
          class: '2021级1班'
        },
        finalScore: 92.5,
        grade: 'A',
        ranking: 5,
        totalStudents: 120,
        percentile: 95.8,
        evaluationDate: '2024-01-20',
        status: 'completed',
        dimensions: {
          character: { score: 93, weight: 0.2 },
          academics: { score: 95, weight: 0.3 },
          innovation: { score: 90, weight: 0.3 },
          comprehensive: { score: 91, weight: 0.2 }
        }
      })
    } catch (error) {
      console.error('获取评价数据失败')
    } finally {
      setLoading(false)
    }
  }

  const fetchAppealStatus = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      setAppealStatus({
        hasActiveAppeal: false,
        appealDeadline: '2024-02-20',
        previousAppeals: []
      })
    } catch (error) {
      console.error('获取申诉状态失败', error)
    }
  }

  const handleTabChange = (key) => {
    setActiveTab(key)
    const basePath = `/student/courses/comprehensive-eval/${courseId}/results-query`
    if (key === 'final-results') {
      navigate(`${basePath}/final-results`)
    } else {
      navigate(`${basePath}/${key}`)
    }
  }

  const handleExportResults = () => {
    const confirmed = window.confirm('请选择导出格式：\n点击"确定"导出PDF格式（包含完整的评价报告和官方认证）\n点击"取消"导出Excel格式（便于数据分析）')
    if (confirmed) {
      alert('正在生成PDF报告...')
      setTimeout(() => {
        alert('PDF报告已生成并下载')
      }, 2000)
    } else {
      alert('正在生成Excel文件...')
      setTimeout(() => {
        alert('Excel文件已生成并下载')
      }, 1500)
    }
  }

  if (loading) {
    return (
      <div className="results-query-loading">
        <div className="spinner">加载评价结果中...</div>
      </div>
    )
  }

  return (
    <div className="results-query-container">
        <div className="results-header">
          <button 
            className="back-button"
            onClick={() => navigate(`/student/courses/comprehensive-eval/${courseId}/evaluation-home`)}
          >
            <ArrowLeft size={20} />
            返回评价主页
          </button>
          <h1>综合评价结果查询</h1>
          <button 
            className="export-button primary"
            onClick={handleExportResults}
          >
            <Download size={20} />
            导出结果
          </button>
        </div>

        <div className="student-info-card">
          <div className="student-info">
            <div className="info-item">
              <span className="label">姓名：</span>
              <span className="value">{evaluationData.studentInfo.name}</span>
            </div>
            <div className="info-item">
              <span className="label">学号：</span>
              <span className="value">{evaluationData.studentInfo.studentId}</span>
            </div>
            <div className="info-item">
              <span className="label">专业：</span>
              <span className="value">{evaluationData.studentInfo.major}</span>
            </div>
            <div className="info-item">
              <span className="label">班级：</span>
              <span className="value">{evaluationData.studentInfo.class}</span>
            </div>
            <div className="info-item">
              <span className="label">评价日期：</span>
              <span className="value">{evaluationData.evaluationDate}</span>
            </div>
          </div>
        </div>

        <div className="results-tabs-card">
          <div className="tabs">
            <div className="tab-list">
              <button 
                className={`tab-button ${activeTab === 'final-results' ? 'active' : ''}`}
                onClick={() => handleTabChange('final-results')}
              >
                <FileText size={18} />
                最终结果
              </button>
              
              <button 
                className={`tab-button ${activeTab === 'score-breakdown' ? 'active' : ''}`}
                onClick={() => handleTabChange('score-breakdown')}
              >
                <BarChart size={18} />
                详细分数
              </button>
              
              <button 
                className={`tab-button ${activeTab === 'ranking' ? 'active' : ''}`}
                onClick={() => handleTabChange('ranking')}
              >
                <Trophy size={18} />
                排名信息
              </button>
              
              <button 
                className={`tab-button ${activeTab === 'appeals' ? 'active' : ''}`}
                onClick={() => handleTabChange('appeals')}
              >
                <AlertCircle size={18} />
                申诉流程
                {appealStatus?.hasActiveAppeal && (
                  <span className="badge processing" />
                )}
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'final-results' && (
                <FinalResults evaluationData={evaluationData} />
              )}
              
              {activeTab === 'score-breakdown' && (
                <ScoreBreakdown evaluationData={evaluationData} />
              )}
              
              {activeTab === 'ranking' && (
                <Ranking evaluationData={evaluationData} />
              )}
              
              {activeTab === 'appeals' && (
                <Appeals 
                  evaluationData={evaluationData} 
                  appealStatus={appealStatus}
                  onAppealSubmit={() => fetchAppealStatus()}
                />
              )}
            </div>
          </div>
        </div>
      </div>
  )
}

export default ResultsQuery