import { useState, useEffect } from 'react'
import './ScoringSystem.css'

function ScoringSystem({ studentData, evaluationData, onScoreUpdate, onAutoSave }) {
  const [scores, setScores] = useState(evaluationData.scores || {})
  const [activeSection, setActiveSection] = useState('character')
  const [showRubric, setShowRubric] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

  const evaluationDimensions = {
    character: {
      name: 'Character & Ethics',
      weight: 25,
      criteria: [
        {
          id: 'integrity',
          name: 'Academic Integrity',
          description: 'Demonstrates honesty and ethical behavior in academic work',
          maxScore: 100,
          rubric: {
            excellent: { min: 90, description: 'Exceptional integrity, serves as role model' },
            good: { min: 75, description: 'Consistently demonstrates integrity' },
            satisfactory: { min: 60, description: 'Generally trustworthy with minor concerns' },
            needs_improvement: { min: 40, description: 'Some integrity issues noted' },
            unsatisfactory: { min: 0, description: 'Significant integrity concerns' }
          }
        },
        {
          id: 'responsibility',
          name: 'Personal Responsibility',
          description: 'Takes ownership of actions and commitments',
          maxScore: 100,
          rubric: {
            excellent: { min: 90, description: 'Highly responsible, exceeds expectations' },
            good: { min: 75, description: 'Reliable and accountable' },
            satisfactory: { min: 60, description: 'Generally responsible' },
            needs_improvement: { min: 40, description: 'Inconsistent responsibility' },
            unsatisfactory: { min: 0, description: 'Poor sense of responsibility' }
          }
        },
        {
          id: 'professionalism',
          name: 'Professional Conduct',
          description: 'Maintains professional standards in interactions',
          maxScore: 100,
          rubric: {
            excellent: { min: 90, description: 'Exemplary professional behavior' },
            good: { min: 75, description: 'Professional in most situations' },
            satisfactory: { min: 60, description: 'Adequate professional conduct' },
            needs_improvement: { min: 40, description: 'Occasional lapses in professionalism' },
            unsatisfactory: { min: 0, description: 'Unprofessional behavior' }
          }
        }
      ]
    },
    academics: {
      name: 'Academic Performance',
      weight: 30,
      criteria: [
        {
          id: 'coursework',
          name: 'Coursework Excellence',
          description: 'Quality of academic work and achievement',
          maxScore: 100,
          rubric: {
            excellent: { min: 90, description: 'Outstanding academic performance' },
            good: { min: 75, description: 'Strong academic achievement' },
            satisfactory: { min: 60, description: 'Meets academic standards' },
            needs_improvement: { min: 40, description: 'Below average performance' },
            unsatisfactory: { min: 0, description: 'Poor academic performance' }
          }
        },
        {
          id: 'knowledge_depth',
          name: 'Knowledge Depth',
          description: 'Depth of understanding in field of study',
          maxScore: 100,
          rubric: {
            excellent: { min: 90, description: 'Exceptional depth of knowledge' },
            good: { min: 75, description: 'Good understanding of concepts' },
            satisfactory: { min: 60, description: 'Adequate knowledge base' },
            needs_improvement: { min: 40, description: 'Superficial understanding' },
            unsatisfactory: { min: 0, description: 'Insufficient knowledge' }
          }
        },
        {
          id: 'analytical_skills',
          name: 'Analytical Skills',
          description: 'Ability to analyze and synthesize information',
          maxScore: 100,
          rubric: {
            excellent: { min: 90, description: 'Exceptional analytical abilities' },
            good: { min: 75, description: 'Strong analytical thinking' },
            satisfactory: { min: 60, description: 'Adequate analysis skills' },
            needs_improvement: { min: 40, description: 'Weak analytical abilities' },
            unsatisfactory: { min: 0, description: 'Poor analytical skills' }
          }
        }
      ]
    },
    innovation: {
      name: 'Innovation & Creativity',
      weight: 25,
      criteria: [
        {
          id: 'creativity',
          name: 'Creative Thinking',
          description: 'Demonstrates original and innovative thinking',
          maxScore: 100,
          rubric: {
            excellent: { min: 90, description: 'Highly creative and original' },
            good: { min: 75, description: 'Shows good creativity' },
            satisfactory: { min: 60, description: 'Some creative elements' },
            needs_improvement: { min: 40, description: 'Limited creativity' },
            unsatisfactory: { min: 0, description: 'Lacks creative thinking' }
          }
        },
        {
          id: 'problem_solving',
          name: 'Problem Solving',
          description: 'Ability to solve complex problems innovatively',
          maxScore: 100,
          rubric: {
            excellent: { min: 90, description: 'Exceptional problem-solving skills' },
            good: { min: 75, description: 'Good problem-solving ability' },
            satisfactory: { min: 60, description: 'Adequate problem-solving' },
            needs_improvement: { min: 40, description: 'Struggles with complex problems' },
            unsatisfactory: { min: 0, description: 'Poor problem-solving skills' }
          }
        },
        {
          id: 'initiative',
          name: 'Initiative & Leadership',
          description: 'Shows initiative and leadership potential',
          maxScore: 100,
          rubric: {
            excellent: { min: 90, description: 'Outstanding leadership and initiative' },
            good: { min: 75, description: 'Shows good initiative' },
            satisfactory: { min: 60, description: 'Some leadership qualities' },
            needs_improvement: { min: 40, description: 'Limited initiative' },
            unsatisfactory: { min: 0, description: 'Lacks initiative' }
          }
        }
      ]
    },
    comprehensive: {
      name: 'Comprehensive Quality',
      weight: 20,
      criteria: [
        {
          id: 'overall_potential',
          name: 'Overall Potential',
          description: 'General assessment of student potential',
          maxScore: 100,
          rubric: {
            excellent: { min: 90, description: 'Exceptional overall potential' },
            good: { min: 75, description: 'Strong overall potential' },
            satisfactory: { min: 60, description: 'Good potential' },
            needs_improvement: { min: 40, description: 'Limited potential' },
            unsatisfactory: { min: 0, description: 'Concerns about potential' }
          }
        },
        {
          id: 'future_success',
          name: 'Future Success Likelihood',
          description: 'Probability of future academic/professional success',
          maxScore: 100,
          rubric: {
            excellent: { min: 90, description: 'Very likely to succeed' },
            good: { min: 75, description: 'Likely to succeed' },
            satisfactory: { min: 60, description: 'Moderate success likelihood' },
            needs_improvement: { min: 40, description: 'Success uncertain' },
            unsatisfactory: { min: 0, description: 'Success unlikely' }
          }
        }
      ]
    }
  }

  const handleScoreChange = (sectionId, criterionId, value) => {
    const numValue = parseInt(value) || 0
    const newScores = {
      ...scores,
      [sectionId]: {
        ...scores[sectionId],
        [criterionId]: numValue
      }
    }
    
    setScores(newScores)
    onAutoSave()
    
    // Validate score
    const criterion = evaluationDimensions[sectionId].criteria.find(c => c.id === criterionId)
    if (numValue > criterion.maxScore) {
      setValidationErrors(prev => ({
        ...prev,
        [`${sectionId}_${criterionId}`]: `Score cannot exceed ${criterion.maxScore}`
      }))
    } else {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[`${sectionId}_${criterionId}`]
        return newErrors
      })
    }
  }

  const getScoreLevel = (score, rubric) => {
    if (score >= rubric.excellent.min) return 'excellent'
    if (score >= rubric.good.min) return 'good'
    if (score >= rubric.satisfactory.min) return 'satisfactory'
    if (score >= rubric.needs_improvement.min) return 'needs_improvement'
    return 'unsatisfactory'
  }

  const calculateSectionAverage = (sectionId) => {
    const sectionScores = scores[sectionId] || {}
    const criteria = evaluationDimensions[sectionId].criteria
    const validScores = criteria
      .map(c => sectionScores[c.id] || 0)
      .filter(score => score > 0)
    
    if (validScores.length === 0) return 0
    return Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length)
  }

  const calculateWeightedTotal = () => {
    let totalWeightedScore = 0
    let totalWeight = 0
    
    Object.entries(evaluationDimensions).forEach(([sectionId, section]) => {
      const sectionAverage = calculateSectionAverage(sectionId)
      if (sectionAverage > 0) {
        totalWeightedScore += sectionAverage * (section.weight / 100)
        totalWeight += section.weight
      }
    })
    
    return totalWeight > 0 ? Math.round(totalWeightedScore * 100 / totalWeight) : 0
  }

  const saveScores = () => {
    onScoreUpdate(scores)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      saveScores()
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [scores])

  return (
    <div className="scoring-system">
      <div className="scoring-header">
        <h2>Multi-Dimensional Scoring System</h2>
        <div className="scoring-controls">
          <button 
            className={`control-btn ${showRubric ? 'active' : ''}`}
            onClick={() => setShowRubric(!showRubric)}
          >
            {showRubric ? 'Hide' : 'Show'} Rubric
          </button>
          <button className="control-btn" onClick={saveScores}>
            💾 Save Scores
          </button>
        </div>
      </div>

      <div className="scoring-content">
        <nav className="scoring-nav">
          {Object.entries(evaluationDimensions).map(([sectionId, section]) => (
            <button
              key={sectionId}
              className={`nav-item ${activeSection === sectionId ? 'active' : ''}`}
              onClick={() => setActiveSection(sectionId)}
            >
              <div className="nav-item-content">
                <span className="nav-name">{section.name}</span>
                <span className="nav-weight">{section.weight}%</span>
                <span className="nav-score">
                  {calculateSectionAverage(sectionId) || '-'}/100
                </span>
              </div>
            </button>
          ))}
        </nav>

        <div className="scoring-main">
          <div className="section-header">
            <h3>{evaluationDimensions[activeSection].name}</h3>
            <div className="section-meta">
              <span className="section-weight">
                Weight: {evaluationDimensions[activeSection].weight}%
              </span>
              <span className="section-average">
                Average: {calculateSectionAverage(activeSection)}/100
              </span>
            </div>
          </div>

          <div className="criteria-list">
            {evaluationDimensions[activeSection].criteria.map(criterion => {
              const currentScore = scores[activeSection]?.[criterion.id] || 0
              const scoreLevel = getScoreLevel(currentScore, criterion.rubric)
              const errorKey = `${activeSection}_${criterion.id}`
              
              return (
                <div key={criterion.id} className="criterion-item">
                  <div className="criterion-header">
                    <h4>{criterion.name}</h4>
                    <span className="max-score">Max: {criterion.maxScore}</span>
                  </div>
                  
                  <p className="criterion-description">{criterion.description}</p>

                  <div className="scoring-input-group">
                    <div className="score-input-container">
                      <input
                        type="number"
                        min="0"
                        max={criterion.maxScore}
                        value={currentScore}
                        onChange={(e) => handleScoreChange(activeSection, criterion.id, e.target.value)}
                        className={`score-input ${validationErrors[errorKey] ? 'error' : ''} ${scoreLevel}`}
                        placeholder="0"
                      />
                      <span className="score-suffix">/ {criterion.maxScore}</span>
                    </div>

                    <div className="score-slider-container">
                      <input
                        type="range"
                        min="0"
                        max={criterion.maxScore}
                        value={currentScore}
                        onChange={(e) => handleScoreChange(activeSection, criterion.id, e.target.value)}
                        className={`score-slider ${scoreLevel}`}
                      />
                    </div>

                    <div className={`score-level ${scoreLevel}`}>
                      {scoreLevel.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>

                  {validationErrors[errorKey] && (
                    <div className="validation-error">
                      {validationErrors[errorKey]}
                    </div>
                  )}

                  {showRubric && (
                    <div className="rubric-guide">
                      <h5>Scoring Rubric:</h5>
                      <div className="rubric-levels">
                        {Object.entries(criterion.rubric).map(([level, details]) => (
                          <div 
                            key={level} 
                            className={`rubric-level ${level} ${scoreLevel === level ? 'current' : ''}`}
                          >
                            <div className="rubric-range">
                              {details.min}+ points
                            </div>
                            <div className="rubric-description">
                              {details.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="scoring-summary">
        <h3>Evaluation Summary</h3>
        <div className="summary-sections">
          {Object.entries(evaluationDimensions).map(([sectionId, section]) => {
            const sectionAverage = calculateSectionAverage(sectionId)
            const weightedScore = sectionAverage * (section.weight / 100)
            
            return (
              <div key={sectionId} className="summary-section">
                <div className="summary-header">
                  <span className="summary-name">{section.name}</span>
                  <span className="summary-weight">({section.weight}%)</span>
                </div>
                <div className="summary-scores">
                  <span className="summary-average">{sectionAverage}/100</span>
                  <span className="summary-weighted">
                    Weighted: {weightedScore.toFixed(1)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="total-score">
          <div className="total-label">Total Weighted Score:</div>
          <div className="total-value">{calculateWeightedTotal()}/100</div>
          <div className="total-grade">
            Grade: {calculateWeightedTotal() >= 90 ? 'A' : 
                    calculateWeightedTotal() >= 80 ? 'B' : 
                    calculateWeightedTotal() >= 70 ? 'C' : 
                    calculateWeightedTotal() >= 60 ? 'D' : 'F'}
          </div>
        </div>

        <div className="completion-status">
          <div className="completion-bar">
            <div 
              className="completion-fill"
              style={{ 
                width: `${(Object.values(scores).reduce((total, section) => 
                  total + Object.keys(section || {}).length, 0) / 
                  Object.values(evaluationDimensions).reduce((total, section) => 
                    total + section.criteria.length, 0)) * 100}%` 
              }}
            />
          </div>
          <span className="completion-text">
            {Object.values(scores).reduce((total, section) => 
              total + Object.keys(section || {}).length, 0)} / {
              Object.values(evaluationDimensions).reduce((total, section) => 
                total + section.criteria.length, 0)} criteria scored
          </span>
        </div>
      </div>
    </div>
  )
}

export default ScoringSystem