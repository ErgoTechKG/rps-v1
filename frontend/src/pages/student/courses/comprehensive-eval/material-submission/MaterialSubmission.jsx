import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Upload, FileText, CheckCircle, AlertCircle, Calendar, Info } from 'lucide-react'
import Layout from '../../../../../components/Layout'
import './MaterialSubmission.css'

function MaterialSubmission() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('forms')
  const [submissionStatus, setSubmissionStatus] = useState({
    forms: { completed: 2, total: 5 },
    documents: { completed: 3, total: 8 }
  })

  const tabs = [
    { id: 'forms', label: '表单填写', icon: FileText },
    { id: 'upload', label: '文件上传', icon: Upload },
    { id: 'status', label: '提交状态', icon: CheckCircle }
  ]

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    if (tabId === 'forms') {
      navigate(`/student/courses/comprehensive-eval/${courseId}/material-submission/forms`)
    } else if (tabId === 'upload') {
      navigate(`/student/courses/comprehensive-eval/${courseId}/material-submission/upload-center`)
    } else if (tabId === 'status') {
      navigate(`/student/courses/comprehensive-eval/${courseId}/material-submission/submission-status`)
    }
  }

  return (
    <Layout userRole="student">
      <div className="material-submission">
        <div className="page-header">
          <h1>材料提交中心</h1>
          <p>系统化提交您的评估材料，展示您的成就和资质</p>
        </div>

        <div className="submission-overview">
          <div className="overview-card">
            <h3>提交进度</h3>
            <div className="progress-summary">
              <div className="progress-item">
                <span>表单完成度</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(submissionStatus.forms.completed / submissionStatus.forms.total) * 100}%` }}
                  />
                </div>
                <span className="progress-text">
                  {submissionStatus.forms.completed}/{submissionStatus.forms.total}
                </span>
              </div>
              <div className="progress-item">
                <span>文档上传</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(submissionStatus.documents.completed / submissionStatus.documents.total) * 100}%` }}
                  />
                </div>
                <span className="progress-text">
                  {submissionStatus.documents.completed}/{submissionStatus.documents.total}
                </span>
              </div>
            </div>
          </div>

          <div className="deadline-card">
            <h3>重要日期</h3>
            <div className="deadline-info">
              <Calendar size={20} />
              <div>
                <p className="deadline-title">材料提交截止</p>
                <p className="deadline-date">2024年12月20日 23:59</p>
                <p className="deadline-countdown">还剩 5 天</p>
              </div>
            </div>
          </div>
        </div>

        <div className="submission-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'forms' && <FormsSection courseId={courseId} />}
          {activeTab === 'upload' && <UploadSection courseId={courseId} />}
          {activeTab === 'status' && <StatusSection courseId={courseId} />}
        </div>
      </div>
    </Layout>
  )
}

function FormsSection({ courseId }) {
  const navigate = useNavigate()
  const forms = [
    {
      id: 'personal-info',
      title: '个人信息表',
      description: '基本信息和联系方式',
      status: 'completed',
      required: true
    },
    {
      id: 'academic-achievement',
      title: '学术成就表',
      description: '课程成绩和学术表现',
      status: 'completed',
      required: true
    },
    {
      id: 'self-assessment',
      title: '自我评估表',
      description: '个人反思和自我评价',
      status: 'in-progress',
      required: true
    },
    {
      id: 'research-innovation',
      title: '研究创新表',
      description: '研究项目和创新成果',
      status: 'pending',
      required: true
    },
    {
      id: 'character-leadership',
      title: '品格与领导力',
      description: '品格评估和领导经历',
      status: 'pending',
      required: true
    }
  ]

  const handleFormClick = (formId) => {
    navigate(`/student/courses/comprehensive-eval/${courseId}/material-submission/forms#${formId}`)
  }

  return (
    <div className="forms-section">
      <div className="section-header">
        <h2>评估表单</h2>
        <p>请完成所有必填表单，确保信息准确完整</p>
      </div>

      <div className="forms-list">
        {forms.map(form => (
          <div 
            key={form.id} 
            className={`form-card ${form.status}`}
            onClick={() => handleFormClick(form.id)}
          >
            <div className="form-header">
              <h3>{form.title}</h3>
              {form.required && <span className="required-badge">必填</span>}
            </div>
            <p>{form.description}</p>
            <div className="form-status">
              {form.status === 'completed' && (
                <>
                  <CheckCircle size={16} className="status-icon completed" />
                  <span>已完成</span>
                </>
              )}
              {form.status === 'in-progress' && (
                <>
                  <AlertCircle size={16} className="status-icon in-progress" />
                  <span>进行中</span>
                </>
              )}
              {form.status === 'pending' && (
                <>
                  <Info size={16} className="status-icon pending" />
                  <span>待填写</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function UploadSection({ courseId }) {
  const navigate = useNavigate()
  const categories = [
    {
      id: 'certificates',
      title: '证书与奖项',
      description: '学术和技能认证',
      count: 3,
      required: 2
    },
    {
      id: 'projects',
      title: '研究项目',
      description: '研究成果和学术作品',
      count: 2,
      required: 1
    },
    {
      id: 'achievements',
      title: '成就展示',
      description: '其他成就和作品集',
      count: 1,
      required: 0
    }
  ]

  const handleCategoryClick = (categoryId) => {
    navigate(`/student/courses/comprehensive-eval/${courseId}/material-submission/upload-center/${categoryId}`)
  }

  return (
    <div className="upload-section">
      <div className="section-header">
        <h2>文档上传</h2>
        <p>上传支撑材料，展示您的成就和能力</p>
      </div>

      <div className="upload-categories">
        {categories.map(category => (
          <div 
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category.id)}
          >
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            <div className="category-stats">
              <span className="uploaded-count">已上传: {category.count}</span>
              {category.required > 0 && (
                <span className="required-count">最少需要: {category.required}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="upload-guidelines">
        <h3>上传须知</h3>
        <ul>
          <li>支持格式: PDF, DOC, DOCX, JPG, PNG</li>
          <li>单个文件大小不超过 10MB</li>
          <li>请确保文件清晰可读</li>
          <li>文件名应具有描述性</li>
        </ul>
      </div>
    </div>
  )
}

function StatusSection({ courseId }) {
  const submittedItems = [
    {
      type: 'form',
      name: '个人信息表',
      submittedAt: '2024-12-10 14:30',
      status: 'approved'
    },
    {
      type: 'form',
      name: '学术成就表',
      submittedAt: '2024-12-11 10:15',
      status: 'approved'
    },
    {
      type: 'document',
      name: '英语六级证书.pdf',
      submittedAt: '2024-12-12 09:00',
      status: 'pending'
    },
    {
      type: 'document',
      name: '计算机二级证书.pdf',
      submittedAt: '2024-12-12 09:05',
      status: 'pending'
    }
  ]

  return (
    <div className="status-section">
      <div className="section-header">
        <h2>提交状态</h2>
        <p>查看所有已提交材料的审核状态</p>
      </div>

      <div className="submission-list">
        {submittedItems.map((item, index) => (
          <div key={index} className="submission-item">
            <div className="item-info">
              <FileText size={20} className={`item-icon ${item.type}`} />
              <div>
                <h4>{item.name}</h4>
                <p>提交时间: {item.submittedAt}</p>
              </div>
            </div>
            <div className={`status-badge ${item.status}`}>
              {item.status === 'approved' && '已审核'}
              {item.status === 'pending' && '待审核'}
              {item.status === 'rejected' && '需修改'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MaterialSubmission