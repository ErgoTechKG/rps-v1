import React from 'react'
import './Ranking.css'

const Ranking = ({ evaluationData }) => {
  return (
    <div className="ranking-container">
      <div className="card">
        <h3>排名信息</h3>
        <div className="ranking-summary">
          <div className="rank-item">
            <div className="rank-label">您的排名</div>
            <div className="rank-value">#{evaluationData.ranking} / {evaluationData.totalStudents}</div>
          </div>
          <div className="rank-item">
            <div className="rank-label">百分位</div>
            <div className="rank-value">前 {evaluationData.percentile}%</div>
          </div>
        </div>
        <p>排名功能完整实现包括：历史排名趋势、分维度排名、邻近排名对比等。</p>
      </div>
    </div>
  )
}

export default Ranking