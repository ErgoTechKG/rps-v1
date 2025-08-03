import React from 'react'
import './ScoreBreakdown.css'

const ScoreBreakdown = ({ evaluationData }) => {
  return (
    <div className="score-breakdown-container">
      <div className="card">
        <h3>详细分数分析</h3>
        <div className="dimensions-breakdown">
          {Object.entries(evaluationData.dimensions).map(([key, dimension]) => (
            <div key={key} className="dimension-detail">
              <div className="dimension-header">
                <h4>
                  {key === 'character' && '品德素养'}
                  {key === 'academics' && '学业水平'}
                  {key === 'innovation' && '创新能力'}
                  {key === 'comprehensive' && '综合表现'}
                </h4>
                <span className="dimension-weight">权重 {dimension.weight * 100}%</span>
              </div>
              <div className="dimension-score-bar">
                <div className="score-label">{dimension.score}分</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${dimension.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="breakdown-info">
          <p>详细分数功能包括：专家评分详情、评分细项、评分透明度说明、成绩分布统计等。</p>
        </div>
      </div>
    </div>
  )
}

export default ScoreBreakdown