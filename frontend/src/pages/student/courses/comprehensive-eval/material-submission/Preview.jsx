import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, FileText, Image } from 'lucide-react'
import Layout from '../../../../../components/Layout'
import './Preview.css'

function Preview() {
  const { courseId } = useParams()
  const navigate = useNavigate()

  // In real app, would get file data from route state or API
  const fileData = {
    name: '英语六级证书.pdf',
    type: 'pdf',
    size: '2.1 MB',
    uploadDate: '2024-12-12',
    category: '证书与奖项',
    status: 'approved'
  }

  const handleDownload = () => {
    // In real app, would download the file
    console.log('Downloading file:', fileData.name)
  }

  const renderPreviewContent = () => {
    if (fileData.type === 'pdf') {
      return (
        <div className="pdf-preview">
          <iframe
            src="/sample.pdf"
            title={fileData.name}
            width="100%"
            height="100%"
          />
        </div>
      )
    } else if (['jpg', 'jpeg', 'png'].includes(fileData.type)) {
      return (
        <div className="image-preview">
          <img src="/sample-certificate.jpg" alt={fileData.name} />
        </div>
      )
    } else {
      return (
        <div className="no-preview">
          <FileText size={64} />
          <p>无法预览此文件类型</p>
          <p>请下载文件后查看</p>
        </div>
      )
    }
  }

  return (
    <Layout userRole="student">
      <div className="preview-page">
        <div className="preview-header">
          <button 
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
            返回
          </button>
          <div className="file-info">
            <h2>{fileData.name}</h2>
            <p>{fileData.category} · {fileData.size} · 上传于 {fileData.uploadDate}</p>
          </div>
          <button className="download-button" onClick={handleDownload}>
            <Download size={16} />
            下载文件
          </button>
        </div>

        <div className="preview-container">
          {renderPreviewContent()}
        </div>
      </div>
    </Layout>
  )
}

export default Preview