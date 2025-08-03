import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FileText, CheckCircle, AlertCircle, Clock, X, Download, Filter } from 'lucide-react'
import Layout from '../../../../../components/Layout'
import './SubmissionStatus.css'

function SubmissionStatus() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState([])
  const [filter, setFilter] = useState('all')
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0
  })

  useEffect(() => {
    loadSubmissions()
  }, [])

  const loadSubmissions = () => {
    // Simulate loading submission data
    const mockSubmissions = [
      {
        id: 1,
        type: 'form',
        category: '个人信息',
        name: '个人信息表',
        submittedAt: '2024-12-10 14:30:25',
        status: 'approved',
        feedback: '信息完整，已通过审核',
        reviewer: '张老师',
        reviewedAt: '2024-12-10 16:45:00'
      },
      {
        id: 2,
        type: 'form',
        category: '学术成就',
        name: '学术成就表',
        submittedAt: '2024-12-11 10:15:30',
        status: 'approved',
        feedback: '成绩优秀，表现突出',
        reviewer: '李老师',
        reviewedAt: '2024-12-11 15:20:00'
      },
      {
        id: 3,
        type: 'form',
        category: '自我评估',
        name: '自我评估表',
        submittedAt: '2024-12-12 08:45:00',
        status: 'pending',
        feedback: null,
        reviewer: null,
        reviewedAt: null
      },
      {
        id: 4,
        type: 'document',
        category: '证书与奖项',
        name: '英语六级证书.pdf',
        submittedAt: '2024-12-12 09:00:15',
        status: 'pending',
        feedback: null,
        reviewer: null,
        reviewedAt: null
      },
      {
        id: 5,
        type: 'document',
        category: '证书与奖项',
        name: '计算机二级证书.pdf',
        submittedAt: '2024-12-12 09:05:20',
        status: 'pending',
        feedback: null,
        reviewer: null,
        reviewedAt: null
      },
      {
        id: 6,
        type: 'document',
        category: '研究项目',
        name: '机器学习研究项目报告.pdf',
        submittedAt: '2024-12-10 09:30:00',
        status: 'approved',
        feedback: '项目成果显著，文档规范',
        reviewer: '王老师',
        reviewedAt: '2024-12-11 11:00:00'
      },
      {
        id: 7,
        type: 'document',
        category: '研究项目',
        name: '创新创业项目计划书.docx',
        submittedAt: '2024-12-09 14:20:00',
        status: 'rejected',
        feedback: '请补充项目的技术实现细节和市场分析部分',
        reviewer: '赵老师',
        reviewedAt: '2024-12-10 10:30:00'
      }
    ]

    setSubmissions(mockSubmissions)
    
    // Calculate stats
    const newStats = mockSubmissions.reduce((acc, sub) => {
      acc.total++
      acc[sub.status]++
      return acc
    }, { total: 0, approved: 0, pending: 0, rejected: 0 })
    
    setStats(newStats)
  }

  const getFilteredSubmissions = () => {
    if (filter === 'all') return submissions
    return submissions.filter(sub => sub.status === filter)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} className="status-icon approved" />
      case 'pending':
        return <Clock size={16} className="status-icon pending" />
      case 'rejected':
        return <X size={16} className="status-icon rejected" />
      default:
        return null
    }
  }

  const handleDownloadReceipt = () => {
    // In real app, would generate and download submission receipt
    console.log('Downloading submission receipt...')
  }

  const handleResubmit = (submission) => {
    if (submission.type === 'form') {
      navigate(`/student/courses/comprehensive-eval/${courseId}/material-submission/forms#${submission.name.toLowerCase().replace(/\s+/g, '-')}`)
    } else {
      navigate(`/student/courses/comprehensive-eval/${courseId}/material-submission/upload-center/${submission.category.toLowerCase()}`)
    }
  }

  return (
    <Layout userRole="student">
      <div className="submission-status">
        <div className="status-header">
          <button 
            className="back-button"
            onClick={() => navigate(`/student/courses/comprehensive-eval/${courseId}/material-submission`)}
          >
            ← 返回材料提交
          </button>
          <div className="header-info">
            <h1>提交状态追踪</h1>
            <p>查看所有材料的审核进度和反馈</p>
          </div>
          <button className="download-receipt" onClick={handleDownloadReceipt}>
            <Download size={16} />
            下载提交凭证
          </button>
        </div>

        <div className="status-overview">
          <div className="stat-card total">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">总提交</div>
          </div>
          <div className="stat-card approved">
            <div className="stat-value">{stats.approved}</div>
            <div className="stat-label">已通过</div>
          </div>
          <div className="stat-card pending">
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">待审核</div>
          </div>
          <div className="stat-card rejected">
            <div className="stat-value">{stats.rejected}</div>
            <div className="stat-label">需修改</div>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-label">
            <Filter size={16} />
            筛选状态:
          </div>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              全部
            </button>
            <button
              className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
              onClick={() => setFilter('approved')}
            >
              已通过
            </button>
            <button
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              待审核
            </button>
            <button
              className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
              onClick={() => setFilter('rejected')}
            >
              需修改
            </button>
          </div>
        </div>

        <div className="submissions-list">
          {getFilteredSubmissions().map(submission => (
            <div key={submission.id} className={`submission-card ${submission.status}`}>
              <div className="submission-header">
                <div className="submission-type">
                  <FileText size={20} />
                  <div>
                    <h3>{submission.name}</h3>
                    <p>{submission.category} · {submission.type === 'form' ? '表单' : '文档'}</p>
                  </div>
                </div>
                <div className="submission-status">
                  {getStatusIcon(submission.status)}
                  <span className={`status-text ${submission.status}`}>
                    {submission.status === 'approved' && '已通过'}
                    {submission.status === 'pending' && '待审核'}
                    {submission.status === 'rejected' && '需修改'}
                  </span>
                </div>
              </div>

              <div className="submission-timeline">
                <div className="timeline-item">
                  <span className="timeline-label">提交时间:</span>
                  <span className="timeline-value">{submission.submittedAt}</span>
                </div>
                {submission.reviewedAt && (
                  <div className="timeline-item">
                    <span className="timeline-label">审核时间:</span>
                    <span className="timeline-value">{submission.reviewedAt}</span>
                  </div>
                )}
                {submission.reviewer && (
                  <div className="timeline-item">
                    <span className="timeline-label">审核人:</span>
                    <span className="timeline-value">{submission.reviewer}</span>
                  </div>
                )}
              </div>

              {submission.feedback && (
                <div className="submission-feedback">
                  <h4>审核反馈:</h4>
                  <p>{submission.feedback}</p>
                </div>
              )}

              {submission.status === 'rejected' && (
                <div className="submission-actions">
                  <button 
                    className="resubmit-btn"
                    onClick={() => handleResubmit(submission)}
                  >
                    重新提交
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="submission-tips">
          <h3>提交说明</h3>
          <ul>
            <li>材料提交后将在 1-2 个工作日内完成审核</li>
            <li>审核通过的材料将被锁定，不可再次修改</li>
            <li>如材料需要修改，请根据反馈意见及时更新</li>
            <li>所有材料必须在截止日期前完成提交和审核</li>
            <li>如有疑问，请联系指导老师或系统管理员</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default SubmissionStatus