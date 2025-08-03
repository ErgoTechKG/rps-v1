import React, { useState } from 'react'
import './Appeals.css'

const Appeals = ({ evaluationData, appealStatus }) => {
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('申诉已成功提交，我们将在5个工作日内处理')
    setShowForm(false)
  }

  return (
    <div className="appeals-container">
      <div className="card">
        <h3>申诉流程</h3>
        
        <div className="appeal-status">
          <div className="status-item">
            <span className="status-label">申诉截止日期：</span>
            <span className="status-value">{appealStatus?.appealDeadline || '2024-02-20'}</span>
          </div>
          <div className="status-item">
            <span className="status-label">申诉状态：</span>
            <span className="status-value">
              {appealStatus?.hasActiveAppeal ? '处理中' : '可提交'}
            </span>
          </div>
        </div>

        <div className="appeal-info">
          <h4>申诉条件</h4>
          <ul>
            <li>必须在规定时限内提交申诉</li>
            <li>每位学生仅可提交一次申诉</li>
            <li>需提供充分的理由和证据</li>
            <li>申诉内容必须真实有效</li>
          </ul>
        </div>

        {!showForm ? (
          <button className="appeal-button primary" onClick={() => setShowForm(true)}>
            开始申诉
          </button>
        ) : (
          <form className="appeal-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>申诉理由</label>
              <select required>
                <option value="">请选择申诉理由</option>
                <option value="scoring_error">评分计算错误</option>
                <option value="missing_materials">材料遗漏未评</option>
                <option value="unfair_evaluation">评价过程不公正</option>
                <option value="technical_issues">技术问题影响评价</option>
                <option value="new_evidence">新的重要证据</option>
                <option value="other">其他原因</option>
              </select>
            </div>

            <div className="form-group">
              <label>详细说明</label>
              <textarea 
                rows="6" 
                placeholder="请详细说明您的申诉理由..."
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowForm(false)}>取消</button>
              <button type="submit" className="primary">提交申诉</button>
            </div>
          </form>
        )}

        <div className="appeal-contact">
          <h4>联系方式</h4>
          <p>申诉委员会电话：010-12345678</p>
          <p>申诉邮箱：appeals@university.edu.cn</p>
        </div>
      </div>
    </div>
  )
}

export default Appeals