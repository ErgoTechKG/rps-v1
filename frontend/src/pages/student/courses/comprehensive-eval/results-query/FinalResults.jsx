import React, { useState } from 'react'
import { CheckCircle, Download, Shield, Share2, FileText } from 'lucide-react'
import './FinalResults.css'

const FinalResults = ({ evaluationData }) => {
  const [showCertificate, setShowCertificate] = useState(false)
  const [shareModalVisible, setShareModalVisible] = useState(false)

  const getGradeColor = (grade) => {
    const gradeColors = {
      'A+': '#52c41a',
      'A': '#73d13d',
      'A-': '#95de64',
      'B+': '#1890ff',
      'B': '#40a9ff',
      'B-': '#69c0ff',
      'C+': '#faad14',
      'C': '#ffc53d',
      'C-': '#ffd666',
      'D': '#ff4d4f',
      'F': '#cf1322'
    }
    return gradeColors[grade] || '#666'
  }

  const getGradeDescription = (grade) => {
    const descriptions = {
      'A+': '优秀（Outstanding）',
      'A': '优秀（Excellent）',
      'A-': '良好（Very Good）',
      'B+': '良好（Good）',
      'B': '中等（Above Average）',
      'B-': '中等（Average）',
      'C+': '及格（Below Average）',
      'C': '及格（Pass）',
      'C-': '及格（Marginal Pass）',
      'D': '不及格（Poor）',
      'F': '不及格（Fail）'
    }
    return descriptions[grade] || '未知'
  }

  const handleDownloadCertificate = () => {
    alert('正在生成证书...')
    setTimeout(() => {
      alert('证书已生成并开始下载')
    }, 2000)
  }

  const handleShareResults = () => {
    setShareModalVisible(true)
  }

  const handleShare = (institution) => {
    alert(`已向${institution}分享您的评价结果`)
    setShareModalVisible(false)
  }

  const calculateWeightedScore = () => {
    const { dimensions } = evaluationData
    let totalScore = 0
    Object.values(dimensions).forEach(dim => {
      totalScore += dim.score * dim.weight
    })
    return totalScore.toFixed(1)
  }

  return (
    <div className="final-results-container">
      <div className="score-overview-card">
        <div className="score-header">
          <div className="main-score">
            <div className="score-value">{evaluationData.finalScore}</div>
            <div className="score-label">综合评价总分</div>
          </div>
          <div className="grade-display">
            <span className="grade-tag" style={{ backgroundColor: getGradeColor(evaluationData.grade) }}>
              {evaluationData.grade}
            </span>
            <div className="grade-description">{getGradeDescription(evaluationData.grade)}</div>
          </div>
          <div className="score-actions">
            <button 
              className="action-button primary"
              onClick={() => setShowCertificate(true)}
            >
              <Shield size={20} />
              查看证书
            </button>
            <button 
              className="action-button"
              onClick={handleShareResults}
            >
              <Share2 size={20} />
              分享结果
            </button>
          </div>
        </div>
        
        <div className="divider" />
        
        <div className="score-details">
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">排名</div>
              <div className="detail-value">{evaluationData.ranking}/{evaluationData.totalStudents}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">百分位</div>
              <div className="detail-value">{evaluationData.percentile}%</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">评价状态</div>
              <div className="detail-value">
                <span className="status-tag success">
                  <CheckCircle size={16} />
                  已完成
                </span>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-label">加权总分</div>
              <div className="detail-value">{calculateWeightedScore()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>评价维度概览</h3>
        <div className="dimensions-grid">
          {Object.entries(evaluationData.dimensions).map(([key, dimension]) => (
            <div key={key} className="dimension-item">
              <div className="dimension-header">
                <span className="dimension-name">
                  {key === 'character' && '品德素养'}
                  {key === 'academics' && '学业水平'}
                  {key === 'innovation' && '创新能力'}
                  {key === 'comprehensive' && '综合表现'}
                </span>
                <span className="dimension-weight">权重 {dimension.weight * 100}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${dimension.score}%` }}
                />
              </div>
              <div className="dimension-score">{dimension.score}分</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>评价标准与解释</h3>
        <div className="alert info">
          <h4>评价等级说明</h4>
          <div className="grade-interpretation">
            <p><strong>您的等级：{evaluationData.grade} - {getGradeDescription(evaluationData.grade)}</strong></p>
            <p>该等级表示您在本次综合评价中的表现{evaluationData.percentile > 90 ? '非常优秀' : evaluationData.percentile > 70 ? '良好' : '达到基本要求'}，
            超过了{evaluationData.percentile}%的同学。</p>
            <p>综合评价结果将作为奖学金评定、保研推荐、就业推荐等重要参考依据。</p>
          </div>
        </div>
        
        <div className="divider" />
        
        <div className="score-methodology">
          <h4>评分方法说明</h4>
          <ol>
            <li>总分计算：采用加权平均法，各维度得分乘以相应权重后求和</li>
            <li>等级划分：A+（95-100）、A（90-94）、A-（85-89）、B+（80-84）、B（75-79）、B-（70-74）、C+（65-69）、C（60-64）、C-（55-59）、D（50-54）、F（&lt;50）</li>
            <li>排名计算：基于总分在全体参评学生中的位置</li>
            <li>百分位计算：表示您的成绩超过了多少百分比的同学</li>
          </ol>
        </div>
      </div>

      <div className="card">
        <h3>官方认证与文档</h3>
        <div className="cert-grid">
          <div className="cert-item" onClick={handleDownloadCertificate}>
            <FileText size={48} color="#1890ff" />
            <h4>评价结果证书</h4>
            <p>包含完整评价信息的官方证书</p>
            <button className="download-button">
              <Download size={16} />
              下载证书
            </button>
          </div>
          <div className="cert-item" onClick={() => alert('生成中英文对照报告...')}>
            <FileText size={48} color="#52c41a" />
            <h4>中英文报告</h4>
            <p>适用于国际交流和申请</p>
            <button className="download-button">
              <Download size={16} />
              下载报告
            </button>
          </div>
          <div className="cert-item" onClick={() => alert('生成详细成绩单...')}>
            <FileText size={48} color="#faad14" />
            <h4>详细成绩单</h4>
            <p>包含各项评分细节的完整记录</p>
            <button className="download-button">
              <Download size={16} />
              下载成绩单
            </button>
          </div>
        </div>
      </div>

      {showCertificate && (
        <div className="modal-overlay" onClick={() => setShowCertificate(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>评价结果证书</h2>
              <button className="close-button" onClick={() => setShowCertificate(false)}>×</button>
            </div>
            <div className="certificate-preview">
              <div className="cert-header">
                <h2>综合评价结果证书</h2>
                <p>COMPREHENSIVE EVALUATION CERTIFICATE</p>
              </div>
              <div className="cert-body">
                <p>兹证明</p>
                <h3>{evaluationData.studentInfo.name}</h3>
                <p>学号：{evaluationData.studentInfo.studentId}</p>
                <p>在 {evaluationData.courseName} 中获得以下成绩：</p>
                <div className="cert-score">
                  <h1>{evaluationData.finalScore}</h1>
                  <h2>等级：{evaluationData.grade}</h2>
                </div>
                <p>排名：第 {evaluationData.ranking} 名（共 {evaluationData.totalStudents} 人）</p>
              </div>
              <div className="cert-footer">
                <p>颁发日期：{evaluationData.evaluationDate}</p>
                <p>证书编号：CE2024{String(evaluationData.ranking).padStart(4, '0')}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="button" onClick={() => setShowCertificate(false)}>关闭</button>
              <button className="button primary" onClick={handleDownloadCertificate}>
                <Download size={16} />
                下载证书
              </button>
            </div>
          </div>
        </div>
      )}

      {shareModalVisible && (
        <div className="modal-overlay" onClick={() => setShareModalVisible(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>分享评价结果</h2>
              <button className="close-button" onClick={() => setShareModalVisible(false)}>×</button>
            </div>
            <div className="alert warning">
              <h4>安全提示</h4>
              <p>分享结果将允许相关机构查看您的评价信息，请确保只向可信任的机构分享。</p>
            </div>
            <div className="share-options">
              <button className="share-button" onClick={() => handleShare('研究生招生系统')}>
                分享至研究生招生系统
              </button>
              <button className="share-button" onClick={() => handleShare('就业推荐系统')}>
                分享至就业推荐系统
              </button>
              <button className="share-button" onClick={() => handleShare('奖学金评定系统')}>
                分享至奖学金评定系统
              </button>
              <button className="share-button" onClick={() => handleShare('指定邮箱')}>
                发送至指定邮箱
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FinalResults