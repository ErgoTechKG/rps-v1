import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Upload, File, X, CheckCircle, AlertCircle, Eye, Trash2, Download } from 'lucide-react'
import Layout from '../../../../../components/Layout'
import './UploadCenter.css'

function UploadCenter() {
  const { courseId, category } = useParams()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    // Load existing uploaded files
    loadUploadedFiles()
  }, [category])

  const loadUploadedFiles = () => {
    // Simulate loading uploaded files
    const mockFiles = {
      certificates: [
        { id: 1, name: '英语六级证书.pdf', size: '2.1 MB', uploadDate: '2024-12-12', status: 'approved' },
        { id: 2, name: '计算机二级证书.pdf', size: '1.8 MB', uploadDate: '2024-12-12', status: 'pending' },
        { id: 3, name: '数学竞赛获奖证书.jpg', size: '3.2 MB', uploadDate: '2024-12-11', status: 'pending' }
      ],
      projects: [
        { id: 4, name: '机器学习研究项目报告.pdf', size: '5.4 MB', uploadDate: '2024-12-10', status: 'approved' },
        { id: 5, name: '创新创业项目计划书.docx', size: '2.3 MB', uploadDate: '2024-12-09', status: 'pending' }
      ],
      achievements: [
        { id: 6, name: '个人作品集.pdf', size: '8.7 MB', uploadDate: '2024-12-08', status: 'approved' }
      ]
    }
    setUploadedFiles(mockFiles[category] || [])
  }

  const categoryInfo = {
    certificates: {
      title: '证书与奖项',
      description: '上传您的学术证书、技能认证、竞赛获奖等',
      acceptedFormats: '.pdf, .jpg, .png',
      requirements: '最少需要上传2个文件'
    },
    projects: {
      title: '研究项目',
      description: '上传研究报告、学术论文、项目成果等',
      acceptedFormats: '.pdf, .doc, .docx',
      requirements: '最少需要上传1个文件'
    },
    achievements: {
      title: '成就展示',
      description: '上传作品集、创新成果、其他成就证明',
      acceptedFormats: '.pdf, .jpg, .png, .doc, .docx',
      requirements: '可选上传'
    }
  }

  const currentCategory = categoryInfo[category] || categoryInfo.certificates

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files) => {
    setUploading(true)
    // Simulate file upload
    setTimeout(() => {
      const newFiles = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: formatFileSize(file.size),
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'pending'
      }))
      setUploadedFiles(prev => [...prev, ...newFiles])
      setUploading(false)
    }, 1500)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handlePreview = (file) => {
    // In real app, would open file preview
    console.log('Preview file:', file)
  }

  const handleDelete = (fileId) => {
    if (window.confirm('确定要删除这个文件吗？')) {
      setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
    }
  }

  const handleDownload = (file) => {
    // In real app, would download file
    console.log('Download file:', file)
  }

  return (
    <Layout userRole="student">
      <div className="upload-center">
        <div className="upload-header">
          <button 
            className="back-button"
            onClick={() => navigate(`/student/courses/comprehensive-eval/${courseId}/material-submission`)}
          >
            ← 返回材料提交
          </button>
          <div className="category-info">
            <h1>{currentCategory.title}</h1>
            <p>{currentCategory.description}</p>
          </div>
        </div>

        <div className="upload-area">
          <div
            className={`drop-zone ${dragActive ? 'drag-active' : ''} ${uploading ? 'uploading' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={currentCategory.acceptedFormats}
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <Upload size={48} className="upload-icon" />
            <h3>拖拽文件到此处或点击上传</h3>
            <p>支持格式: {currentCategory.acceptedFormats}</p>
            <p className="size-limit">单个文件大小不超过 10MB</p>
            {uploading && <div className="uploading-text">正在上传...</div>}
          </div>

          <div className="upload-requirements">
            <AlertCircle size={16} />
            <span>{currentCategory.requirements}</span>
          </div>
        </div>

        <div className="uploaded-files">
          <h2>已上传文件 ({uploadedFiles.length})</h2>
          {uploadedFiles.length === 0 ? (
            <div className="no-files">
              <p>暂无上传文件</p>
            </div>
          ) : (
            <div className="files-list">
              {uploadedFiles.map(file => (
                <div key={file.id} className="file-item">
                  <div className="file-info">
                    <File size={32} className="file-icon" />
                    <div className="file-details">
                      <h4>{file.name}</h4>
                      <p>{file.size} · 上传于 {file.uploadDate}</p>
                    </div>
                  </div>
                  <div className="file-status">
                    {file.status === 'approved' && (
                      <span className="status-badge approved">
                        <CheckCircle size={14} />
                        已审核
                      </span>
                    )}
                    {file.status === 'pending' && (
                      <span className="status-badge pending">
                        <AlertCircle size={14} />
                        待审核
                      </span>
                    )}
                    {file.status === 'rejected' && (
                      <span className="status-badge rejected">
                        <X size={14} />
                        需修改
                      </span>
                    )}
                  </div>
                  <div className="file-actions">
                    <button
                      className="action-button"
                      onClick={() => handlePreview(file)}
                      title="预览"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="action-button"
                      onClick={() => handleDownload(file)}
                      title="下载"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => handleDelete(file.id)}
                      title="删除"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="upload-tips">
          <h3>上传提示</h3>
          <ul>
            <li>请确保上传的文件内容清晰、完整</li>
            <li>文件名应具有描述性，便于识别</li>
            <li>证书类文件建议使用扫描件或高清照片</li>
            <li>如有多页文档，建议合并为一个PDF文件</li>
            <li>上传后请等待系统审核，审核通过后不可修改</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default UploadCenter