import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './ScoringRubrics.css'

function ScoringRubrics() {
  const { courseId } = useParams()
  const [selectedRubric, setSelectedRubric] = useState('comprehensive')
  const [viewMode, setViewMode] = useState('detailed')
  const [expandedCriterion, setExpandedCriterion] = useState(null)

  const [rubrics, setRubrics] = useState({
    comprehensive: {
      name: 'Comprehensive Evaluation Rubric',
      description: 'Complete rubric for comprehensive student assessment',
      totalPoints: 100,
      passingScore: 70,
      criteria: [
        {
          id: 'technical-skills',
          name: 'Technical Skills',
          weight: 25,
          maxPoints: 25,
          description: 'Assessment of programming, problem-solving, and technical documentation abilities',
          levels: [
            {
              level: 'Excellent',
              points: '23-25',
              percentage: '90-100%',
              description: 'Demonstrates mastery across all technical areas',
              indicators: [
                'Writes clean, efficient, and maintainable code',
                'Solves complex problems independently',
                'Creates comprehensive technical documentation',
                'Shows deep understanding of best practices'
              ]
            },
            {
              level: 'Good',
              points: '20-22',
              percentage: '80-89%',
              description: 'Strong technical skills with minor areas for improvement',
              indicators: [
                'Writes good quality code with occasional issues',
                'Solves most problems with minimal guidance',
                'Provides adequate documentation',
                'Demonstrates solid technical understanding'
              ]
            },
            {
              level: 'Satisfactory',
              points: '18-19',
              percentage: '70-79%',
              description: 'Meets minimum technical requirements',
              indicators: [
                'Code functionality meets requirements',
                'Can solve routine problems independently',
                'Basic documentation provided',
                'Shows fundamental technical knowledge'
              ]
            },
            {
              level: 'Needs Improvement',
              points: '15-17',
              percentage: '60-69%',
              description: 'Technical skills below expectations',
              indicators: [
                'Code has significant quality issues',
                'Requires assistance for problem solving',
                'Incomplete or unclear documentation',
                'Limited technical understanding'
              ]
            },
            {
              level: 'Unsatisfactory',
              points: '0-14',
              percentage: '0-59%',
              description: 'Inadequate technical performance',
              indicators: [
                'Code is non-functional or poorly written',
                'Cannot solve problems independently',
                'Poor or missing documentation',
                'Lacks basic technical skills'
              ]
            }
          ]
        },
        {
          id: 'research-ability',
          name: 'Research Ability',
          weight: 20,
          maxPoints: 20,
          description: 'Evaluation of research methodology, critical thinking, and academic rigor',
          levels: [
            {
              level: 'Excellent',
              points: '18-20',
              percentage: '90-100%',
              description: 'Demonstrates sophisticated research capabilities',
              indicators: [
                'Uses appropriate research methodologies',
                'Shows exceptional critical analysis skills',
                'Conducts thorough literature reviews',
                'Demonstrates original thinking'
              ]
            },
            {
              level: 'Good',
              points: '16-17',
              percentage: '80-89%',
              description: 'Strong research skills with good methodology',
              indicators: [
                'Applies research methods correctly',
                'Shows good analytical reasoning',
                'Comprehensive literature coverage',
                'Some evidence of original insights'
              ]
            },
            {
              level: 'Satisfactory',
              points: '14-15',
              percentage: '70-79%',
              description: 'Adequate research approach and analysis',
              indicators: [
                'Basic understanding of research methods',
                'Adequate critical thinking skills',
                'Acceptable literature review',
                'Limited original contributions'
              ]
            },
            {
              level: 'Needs Improvement',
              points: '12-13',
              percentage: '60-69%',
              description: 'Research skills need development',
              indicators: [
                'Limited research methodology knowledge',
                'Weak analytical reasoning',
                'Incomplete literature review',
                'Lacks research rigor'
              ]
            },
            {
              level: 'Unsatisfactory',
              points: '0-11',
              percentage: '0-59%',
              description: 'Inadequate research capabilities',
              indicators: [
                'Poor understanding of research methods',
                'No critical analysis evident',
                'Inadequate literature review',
                'No research contribution'
              ]
            }
          ]
        },
        {
          id: 'communication',
          name: 'Communication Skills',
          weight: 20,
          maxPoints: 20,
          description: 'Assessment of written and oral communication effectiveness',
          levels: [
            {
              level: 'Excellent',
              points: '18-20',
              percentage: '90-100%',
              description: 'Outstanding communication across all formats',
              indicators: [
                'Clear, engaging, and professional writing',
                'Confident and articulate presentations',
                'Adapts communication style to audience',
                'Uses visual aids effectively'
              ]
            },
            {
              level: 'Good',
              points: '16-17',
              percentage: '80-89%',
              description: 'Strong communication with minor issues',
              indicators: [
                'Well-written with good organization',
                'Effective presentations with good delivery',
                'Generally appropriate communication style',
                'Good use of supporting materials'
              ]
            },
            {
              level: 'Satisfactory',
              points: '14-15',
              percentage: '70-79%',
              description: 'Adequate communication meeting requirements',
              indicators: [
                'Acceptable writing quality',
                'Basic presentation skills',
                'Communication meets minimum standards',
                'Limited use of visual aids'
              ]
            },
            {
              level: 'Needs Improvement',
              points: '12-13',
              percentage: '60-69%',
              description: 'Communication skills need development',
              indicators: [
                'Writing needs significant improvement',
                'Presentation skills are weak',
                'Difficulty conveying ideas clearly',
                'Poor use of supporting materials'
              ]
            },
            {
              level: 'Unsatisfactory',
              points: '0-11',
              percentage: '0-59%',
              description: 'Poor communication across all areas',
              indicators: [
                'Unclear or unprofessional writing',
                'Ineffective presentation skills',
                'Cannot communicate ideas effectively',
                'No use of supporting materials'
              ]
            }
          ]
        },
        {
          id: 'professional-development',
          name: 'Professional Development',
          weight: 15,
          maxPoints: 15,
          description: 'Growth mindset, learning ability, and professional behavior',
          levels: [
            {
              level: 'Excellent',
              points: '14-15',
              percentage: '90-100%',
              description: 'Exceptional professional growth and conduct',
              indicators: [
                'Rapidly learns and applies new concepts',
                'Exemplary professional behavior',
                'Consistently takes initiative',
                'Seeks feedback and acts on it'
              ]
            },
            {
              level: 'Good',
              points: '12-13',
              percentage: '80-89%',
              description: 'Good professional development',
              indicators: [
                'Good learning ability with guidance',
                'Professional conduct with minor issues',
                'Shows initiative most of the time',
                'Generally receptive to feedback'
              ]
            },
            {
              level: 'Satisfactory',
              points: '11',
              percentage: '70-79%',
              description: 'Meets professional standards',
              indicators: [
                'Learns at acceptable pace',
                'Meets professional standards',
                'Takes initiative when prompted',
                'Accepts feedback when given'
              ]
            },
            {
              level: 'Needs Improvement',
              points: '9-10',
              percentage: '60-69%',
              description: 'Professional conduct concerns',
              indicators: [
                'Slow to learn new concepts',
                'Some professional conduct issues',
                'Rarely shows initiative',
                'Resistant to feedback'
              ]
            },
            {
              level: 'Unsatisfactory',
              points: '0-8',
              percentage: '0-59%',
              description: 'Poor professional development',
              indicators: [
                'Difficulty learning new material',
                'Poor professional behavior',
                'Lacks initiative and self-direction',
                'Does not respond to feedback'
              ]
            }
          ]
        },
        {
          id: 'innovation',
          name: 'Innovation & Creativity',
          weight: 20,
          maxPoints: 20,
          description: 'Creative thinking, innovation, and novel problem-solving approaches',
          levels: [
            {
              level: 'Excellent',
              points: '18-20',
              percentage: '90-100%',
              description: 'Outstanding innovation and creative solutions',
              indicators: [
                'Consistently develops innovative solutions',
                'Ideas have significant practical impact',
                'Thinks outside conventional approaches',
                'Inspires creativity in others'
              ]
            },
            {
              level: 'Good',
              points: '16-17',
              percentage: '80-89%',
              description: 'Good creative problem-solving abilities',
              indicators: [
                'Shows creativity in problem solving',
                'Ideas show promise and some impact',
                'Occasionally thinks beyond standard solutions',
                'Contributes creative ideas to team'
              ]
            },
            {
              level: 'Satisfactory',
              points: '14-15',
              percentage: '70-79%',
              description: 'Adequate creativity and innovation',
              indicators: [
                'Occasionally demonstrates creativity',
                'Ideas have limited but measurable impact',
                'Can adapt existing solutions creatively',
                'Shows some innovative thinking'
              ]
            },
            {
              level: 'Needs Improvement',
              points: '12-13',
              percentage: '60-69%',
              description: 'Limited creative thinking',
              indicators: [
                'Limited creative problem-solving skills',
                'Ideas lack practical application',
                'Relies heavily on conventional approaches',
                'Rarely contributes innovative ideas'
              ]
            },
            {
              level: 'Unsatisfactory',
              points: '0-11',
              percentage: '0-59%',
              description: 'No meaningful innovation',
              indicators: [
                'No evidence of creative thinking',
                'No meaningful innovative contributions',
                'Cannot think beyond standard solutions',
                'Does not contribute creative ideas'
              ]
            }
          ]
        }
      ]
    },
    midterm: {
      name: 'Mid-term Progress Rubric',
      description: 'Rubric for mid-term progress evaluation',
      totalPoints: 100,
      passingScore: 65,
      criteria: [
        {
          id: 'progress-tracking',
          name: 'Progress Tracking',
          weight: 30,
          maxPoints: 30,
          description: 'Student\'s ability to track and demonstrate progress',
          levels: [
            {
              level: 'Excellent',
              points: '27-30',
              percentage: '90-100%',
              description: 'Exceptional progress tracking and documentation',
              indicators: [
                'Comprehensive progress documentation',
                'Clear milestone achievements',
                'Proactive issue identification',
                'Excellent self-reflection'
              ]
            },
            {
              level: 'Good',
              points: '24-26',
              percentage: '80-89%',
              description: 'Good progress tracking with minor gaps',
              indicators: [
                'Good progress documentation',
                'Most milestones achieved',
                'Some issue identification',
                'Good self-awareness'
              ]
            },
            {
              level: 'Satisfactory',
              points: '20-23',
              percentage: '65-79%',
              description: 'Adequate progress tracking',
              indicators: [
                'Basic progress documentation',
                'Some milestones achieved',
                'Limited issue identification',
                'Basic self-reflection'
              ]
            },
            {
              level: 'Needs Improvement',
              points: '15-19',
              percentage: '50-64%',
              description: 'Poor progress tracking',
              indicators: [
                'Incomplete progress documentation',
                'Few milestones achieved',
                'No issue identification',
                'Poor self-awareness'
              ]
            },
            {
              level: 'Unsatisfactory',
              points: '0-14',
              percentage: '0-49%',
              description: 'No progress tracking',
              indicators: [
                'No progress documentation',
                'No milestones achieved',
                'No self-reflection',
                'No awareness of progress'
              ]
            }
          ]
        }
      ]
    }
  })

  const [scoringGuidelines, setScoringGuidelines] = useState({
    general: [
      'Use evidence-based assessment supported by specific examples',
      'Consider student background and starting point when evaluating progress',
      'Provide specific, actionable feedback for improvement',
      'Maintain consistency across all evaluations',
      'Document reasoning for scores in the 60-79% range',
      'Seek second opinion for scores below 60% or above 95%'
    ],
    calculation: [
      'Weighted average based on criterion importance',
      'Round final scores to nearest whole number',
      'Consider overall performance pattern, not just numerical average',
      'Account for significant strength in one area compensating for weaknesses',
      'Apply institutional grade boundaries and policies'
    ],
    edgeCases: [
      'Student with exceptional strength in one area but significant weakness in another',
      'Student showing rapid improvement during evaluation period',
      'External factors affecting student performance',
      'Disagreement between multiple evaluation sources',
      'Student challenging evaluation or requesting review'
    ]
  })

  const handleRubricChange = (rubricKey) => {
    setSelectedRubric(rubricKey)
    setExpandedCriterion(null)
  }

  const toggleCriterion = (criterionId) => {
    setExpandedCriterion(expandedCriterion === criterionId ? null : criterionId)
  }

  const currentRubric = rubrics[selectedRubric]

  return (
    <Layout role="professor">
      <div className="scoring-rubrics">
        <header className="rubrics-header">
          <div className="header-content">
            <h1>Scoring Rubrics & Guidelines</h1>
            <p className="header-description">
              Detailed scoring rubrics, performance level descriptions, and evaluation guidelines
            </p>
          </div>
          <div className="header-nav">
            <Link 
              to={`/professor/courses/comprehensive-eval/${courseId}/standards-reference/criteria`}
              className="nav-link"
            >
              View Criteria
            </Link>
            <Link 
              to={`/professor/courses/comprehensive-eval/${courseId}/standards-reference/examples`}
              className="nav-link"
            >
              View Examples
            </Link>
          </div>
        </header>

        <section className="rubric-controls">
          <div className="rubric-selector">
            <label htmlFor="rubric-select">Select Rubric:</label>
            <select
              id="rubric-select"
              value={selectedRubric}
              onChange={(e) => handleRubricChange(e.target.value)}
              className="rubric-select"
            >
              {Object.keys(rubrics).map(key => (
                <option key={key} value={key}>
                  {rubrics[key].name}
                </option>
              ))}
            </select>
          </div>

          <div className="view-controls">
            <label>View Mode:</label>
            <div className="view-buttons">
              <button 
                className={`view-btn ${viewMode === 'detailed' ? 'active' : ''}`}
                onClick={() => setViewMode('detailed')}
              >
                Detailed
              </button>
              <button 
                className={`view-btn ${viewMode === 'compact' ? 'active' : ''}`}
                onClick={() => setViewMode('compact')}
              >
                Compact
              </button>
              <button 
                className={`view-btn ${viewMode === 'matrix' ? 'active' : ''}`}
                onClick={() => setViewMode('matrix')}
              >
                Matrix
              </button>
            </div>
          </div>

          <div className="quick-actions">
            <button className="action-btn download">
              📄 Download Rubric
            </button>
            <button className="action-btn print">
              🖨️ Print
            </button>
            <button className="action-btn calculator">
              🧮 Score Calculator
            </button>
          </div>
        </section>

        <section className="rubric-overview">
          <div className="rubric-info">
            <h2>{currentRubric.name}</h2>
            <p className="rubric-description">{currentRubric.description}</p>
            <div className="rubric-stats">
              <div className="stat">
                <span className="stat-label">Total Points:</span>
                <span className="stat-value">{currentRubric.totalPoints}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Passing Score:</span>
                <span className="stat-value">{currentRubric.passingScore}%</span>
              </div>
              <div className="stat">
                <span className="stat-label">Criteria Count:</span>
                <span className="stat-value">{currentRubric.criteria.length}</span>
              </div>
            </div>
          </div>
        </section>

        {viewMode === 'matrix' ? (
          <section className="rubric-matrix">
            <h3>Scoring Matrix</h3>
            <div className="matrix-table">
              <table>
                <thead>
                  <tr>
                    <th>Criterion</th>
                    <th>Weight</th>
                    <th>Excellent<br/>(90-100%)</th>
                    <th>Good<br/>(80-89%)</th>
                    <th>Satisfactory<br/>(70-79%)</th>
                    <th>Needs Improvement<br/>(60-69%)</th>
                    <th>Unsatisfactory<br/>(0-59%)</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRubric.criteria.map(criterion => (
                    <tr key={criterion.id}>
                      <td className="criterion-name">
                        <strong>{criterion.name}</strong>
                        <div className="criterion-desc">{criterion.description}</div>
                      </td>
                      <td className="weight">{criterion.weight}%</td>
                      {criterion.levels.map((level, index) => (
                        <td key={index} className={`level-cell level-${index}`}>
                          <div className="points">{level.points} pts</div>
                          <div className="description">{level.description}</div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="rubric-details">
            <h3>Detailed Rubric Criteria</h3>
            <div className="criteria-list">
              {currentRubric.criteria.map(criterion => (
                <div key={criterion.id} className="criterion-card">
                  <div 
                    className="criterion-header"
                    onClick={() => toggleCriterion(criterion.id)}
                  >
                    <div className="criterion-info">
                      <h4>{criterion.name}</h4>
                      <p className="criterion-description">{criterion.description}</p>
                    </div>
                    <div className="criterion-meta">
                      <span className="weight-badge">{criterion.weight}%</span>
                      <span className="points-badge">{criterion.maxPoints} pts</span>
                      <span className="expand-icon">
                        {expandedCriterion === criterion.id ? '▼' : '▶'}
                      </span>
                    </div>
                  </div>

                  {expandedCriterion === criterion.id && (
                    <div className="criterion-levels">
                      {criterion.levels.map((level, index) => (
                        <div key={index} className={`level-detail level-${index}`}>
                          <div className="level-header">
                            <h5>{level.level}</h5>
                            <div className="level-scoring">
                              <span className="points">{level.points} points</span>
                              <span className="percentage">{level.percentage}</span>
                            </div>
                          </div>
                          <p className="level-description">{level.description}</p>
                          <div className="level-indicators">
                            <h6>Key Indicators:</h6>
                            <ul>
                              {level.indicators.map((indicator, idx) => (
                                <li key={idx}>{indicator}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="scoring-guidelines">
          <h3>Scoring Guidelines</h3>
          <div className="guidelines-grid">
            <div className="guideline-section">
              <h4>General Guidelines</h4>
              <ul>
                {scoringGuidelines.general.map((guideline, index) => (
                  <li key={index}>{guideline}</li>
                ))}
              </ul>
            </div>

            <div className="guideline-section">
              <h4>Score Calculation</h4>
              <ul>
                {scoringGuidelines.calculation.map((guideline, index) => (
                  <li key={index}>{guideline}</li>
                ))}
              </ul>
            </div>

            <div className="guideline-section">
              <h4>Handling Edge Cases</h4>
              <ul>
                {scoringGuidelines.edgeCases.map((guideline, index) => (
                  <li key={index}>{guideline}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="calibration-tools">
          <h3>Calibration & Consistency Tools</h3>
          <div className="tools-grid">
            <div className="tool-card">
              <h4>Score Calculator</h4>
              <p>Interactive tool to calculate weighted scores and final grades</p>
              <button className="tool-btn">Open Calculator</button>
            </div>
            
            <div className="tool-card">
              <h4>Calibration Exercises</h4>
              <p>Practice exercises to ensure consistent scoring across evaluators</p>
              <button className="tool-btn">Start Exercise</button>
            </div>
            
            <div className="tool-card">
              <h4>Scoring Comparison</h4>
              <p>Compare your scores with other evaluators for consistency</p>
              <button className="tool-btn">View Comparison</button>
            </div>
            
            <div className="tool-card">
              <h4>Common Errors Guide</h4>
              <p>Learn about common scoring errors and how to avoid them</p>
              <button className="tool-btn">View Guide</button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default ScoringRubrics