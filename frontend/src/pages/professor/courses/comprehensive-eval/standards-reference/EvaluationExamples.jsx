import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './EvaluationExamples.css'

function EvaluationExamples() {
  const { courseId } = useParams()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedExample, setSelectedExample] = useState(null)
  const [viewMode, setViewMode] = useState('list')

  const [examples, setExamples] = useState([
    {
      id: 1,
      title: 'Excellent Technical Performance - Full Stack Development',
      category: 'technical-skills',
      level: 'excellent',
      score: 95,
      student: 'Anonymous Student A',
      description: 'Comprehensive example of excellent technical skills demonstration',
      materials: {
        code: {
          title: 'Clean Architecture Implementation',
          description: 'Well-structured full-stack application with clean code practices',
          highlights: [
            'Modular architecture with clear separation of concerns',
            'Comprehensive unit and integration tests (90% coverage)',
            'Efficient algorithms with O(log n) complexity optimizations',
            'Proper error handling and edge case management',
            'RESTful API design following best practices'
          ]
        },
        documentation: {
          title: 'Comprehensive Technical Documentation',
          description: 'Clear, detailed documentation covering all aspects',
          highlights: [
            'API documentation with interactive examples',
            'Architecture diagrams and system design explanations',
            'Setup and deployment instructions',
            'Code comments explaining complex logic',
            'Performance optimization notes'
          ]
        },
        problemSolving: {
          title: 'Complex Algorithm Optimization',
          description: 'Innovative solution to computationally complex problem',
          highlights: [
            'Identified bottleneck in original O(n²) algorithm',
            'Developed novel approach reducing complexity to O(n log n)',
            'Implemented caching strategy reducing memory usage by 40%',
            'Provided multiple solution variants with trade-off analysis',
            'Benchmarked performance across different data sizes'
          ]
        }
      },
      feedback: {
        evaluator: 'Professor Smith',
        strengths: [
          'Exceptional code quality with industry-standard practices',
          'Deep understanding of software architecture principles',
          'Outstanding problem-solving methodology',
          'Excellent documentation and communication skills'
        ],
        improvements: [
          'Could explore more advanced design patterns',
          'Consider scalability for larger datasets'
        ],
        overallComment: 'This submission demonstrates mastery of technical skills expected at the highest level. The student shows not only technical competence but also the ability to think systematically about complex problems and communicate solutions effectively.'
      }
    },
    {
      id: 2,
      title: 'Good Research Methodology - Data Analysis Study',
      category: 'research-ability',
      level: 'good',
      score: 84,
      student: 'Anonymous Student B',
      description: 'Solid research approach with good methodology and analysis',
      materials: {
        methodology: {
          title: 'Mixed-Methods Research Design',
          description: 'Well-planned research study combining quantitative and qualitative approaches',
          highlights: [
            'Clear research questions and hypotheses',
            'Appropriate sample size calculation (n=150)',
            'Valid and reliable measurement instruments',
            'Proper control for confounding variables',
            'Ethical considerations addressed'
          ]
        },
        analysis: {
          title: 'Statistical Analysis and Interpretation',
          description: 'Comprehensive data analysis with appropriate statistical methods',
          highlights: [
            'Descriptive statistics with proper visualization',
            'Appropriate inferential tests (ANOVA, regression)',
            'Effect size calculations and confidence intervals',
            'Assumption checking for statistical tests',
            'Clear interpretation of statistical significance'
          ]
        },
        literature: {
          title: 'Literature Review and Synthesis',
          description: 'Good coverage of relevant literature with synthesis',
          highlights: [
            '45 peer-reviewed sources from last 10 years',
            'Systematic search strategy documented',
            'Critical evaluation of existing research',
            'Identification of research gaps',
            'Theoretical framework development'
          ]
        }
      },
      feedback: {
        evaluator: 'Dr. Johnson',
        strengths: [
          'Solid research design with appropriate methodology',
          'Good statistical analysis and interpretation',
          'Comprehensive literature review',
          'Clear presentation of findings'
        ],
        improvements: [
          'Could strengthen theoretical framework',
          'More detailed discussion of limitations needed',
          'Consider alternative analytical approaches'
        ],
        overallComment: 'This research demonstrates good understanding of research methodology and execution. The study is well-conducted with appropriate analysis, though there are opportunities to deepen the theoretical contribution.'
      }
    },
    {
      id: 3,
      title: 'Satisfactory Communication - Presentation and Report',
      category: 'communication',
      level: 'satisfactory',
      score: 74,
      student: 'Anonymous Student C',
      description: 'Adequate communication meeting basic requirements',
      materials: {
        written: {
          title: 'Technical Report',
          description: 'Clear written communication meeting basic standards',
          highlights: [
            'Logical structure with clear sections',
            'Appropriate technical vocabulary',
            'Correct grammar and spelling',
            'Basic use of figures and tables',
            'Adequate length and depth'
          ]
        },
        presentation: {
          title: 'Oral Presentation',
          description: 'Acceptable presentation with room for improvement',
          highlights: [
            'Clear speaking voice and pace',
            'Organized content with logical flow',
            'Basic use of visual aids',
            'Addressed most key points',
            'Responded to questions adequately'
          ]
        }
      },
      feedback: {
        evaluator: 'Professor Davis',
        strengths: [
          'Clear and organized written work',
          'Met all basic requirements',
          'Appropriate technical content',
          'Acceptable presentation delivery'
        ],
        improvements: [
          'Enhance visual design of presentation materials',
          'Improve audience engagement techniques',
          'Strengthen conclusion and recommendations',
          'Work on confidence in delivery'
        ],
        overallComment: 'The communication meets basic academic standards but lacks the polish and engagement expected for higher levels. Focus on audience connection and visual presentation would significantly improve impact.'
      }
    },
    {
      id: 4,
      title: 'Needs Improvement - Professional Development Case',
      category: 'professional-development',
      level: 'needs-improvement',
      score: 67,
      student: 'Anonymous Student D',
      description: 'Example showing areas requiring significant development',
      materials: {
        conduct: {
          title: 'Professional Behavior Assessment',
          description: 'Mixed performance in professional conduct',
          highlights: [
            'Generally punctual but occasional tardiness',
            'Adequate collaboration in group settings',
            'Sometimes requires reminders for deadlines',
            'Basic understanding of professional ethics',
            'Limited initiative in seeking feedback'
          ]
        },
        learning: {
          title: 'Learning and Adaptation',
          description: 'Slow adaptation to new concepts and feedback',
          highlights: [
            'Requires multiple explanations for complex concepts',
            'Slow to implement feedback suggestions',
            'Relies heavily on structured guidance',
            'Limited exploration of additional resources',
            'Basic self-reflection capabilities'
          ]
        }
      },
      feedback: {
        evaluator: 'Dr. Wilson',
        strengths: [
          'Shows willingness to learn',
          'Accepts feedback when provided',
          'Maintains basic professional standards',
          'Demonstrates effort and persistence'
        ],
        improvements: [
          'Develop more proactive learning approach',
          'Improve time management and deadline adherence',
          'Seek feedback more regularly',
          'Take more initiative in professional development',
          'Strengthen self-reflection and growth mindset'
        ],
        overallComment: 'While the student meets minimum professional standards, there are significant opportunities for growth in proactive learning and professional initiative. Developing these areas will be crucial for future success.'
      }
    }
  ])

  const [trainingMaterials, setTrainingMaterials] = useState([
    {
      id: 1,
      title: 'Calibration Exercise: Technical Skills Assessment',
      type: 'calibration',
      difficulty: 'beginner',
      description: 'Practice evaluating technical skills using provided examples',
      duration: '45 minutes',
      materials: [
        'Sample code repositories (3 different quality levels)',
        'Evaluation rubric and scoring guidelines',
        'Expected score ranges and reasoning',
        'Comparative analysis worksheet'
      ]
    },
    {
      id: 2,
      title: 'Advanced Research Evaluation Workshop',
      type: 'training',
      difficulty: 'advanced',
      description: 'In-depth training on evaluating research methodology and outcomes',
      duration: '2 hours',
      materials: [
        'Research paper examples with hidden scores',
        'Methodology evaluation checklist',
        'Statistical analysis verification guide',
        'Peer discussion prompts'
      ]
    },
    {
      id: 3,
      title: 'Communication Assessment Best Practices',
      type: 'best-practices',
      difficulty: 'intermediate',
      description: 'Guidelines for consistent evaluation of written and oral communication',
      duration: '60 minutes',
      materials: [
        'Video presentations with transcripts',
        'Writing samples across quality levels',
        'Evaluation criteria breakdown',
        'Common assessment pitfalls'
      ]
    }
  ])

  const [caseStudies, setCaseStudies] = useState([
    {
      id: 1,
      title: 'Handling Disagreement Between Evaluators',
      scenario: 'Two evaluators give significantly different scores (25-point difference) for the same student',
      challenge: 'Determining final evaluation approach',
      resolution: 'Third evaluator review process with documented reasoning',
      outcome: 'Consensus achieved through structured discussion',
      lessons: [
        'Importance of clear evaluation criteria',
        'Value of multiple perspectives',
        'Need for systematic conflict resolution'
      ]
    },
    {
      id: 2,
      title: 'Student with Exceptional Strength in One Area',
      scenario: 'Student scores 98% in technical skills but 55% in communication',
      challenge: 'Balancing exceptional performance against significant weakness',
      resolution: 'Weighted evaluation with development plan for weak areas',
      outcome: 'Student passed with mandatory communication skills support',
      lessons: [
        'Importance of holistic evaluation',
        'Role of support systems in student development',
        'Balance between strengths and minimum competencies'
      ]
    }
  ])

  const filteredExamples = examples.filter(example => 
    selectedCategory === 'all' || example.category === selectedCategory
  )

  const handleExampleSelect = (example) => {
    setSelectedExample(selectedExample?.id === example.id ? null : example)
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'excellent': return '#4caf50'
      case 'good': return '#8bc34a'
      case 'satisfactory': return '#ffc107'
      case 'needs-improvement': return '#ff9800'
      case 'unsatisfactory': return '#f44336'
      default: return '#666'
    }
  }

  return (
    <Layout role="professor">
      <div className="evaluation-examples">
        <header className="examples-header">
          <div className="header-content">
            <h1>Evaluation Examples & Benchmarks</h1>
            <p className="header-description">
              Exemplary evaluations, case studies, and training materials for consistent assessment
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
              to={`/professor/courses/comprehensive-eval/${courseId}/standards-reference/rubrics`}
              className="nav-link"
            >
              View Rubrics
            </Link>
          </div>
        </header>

        <section className="examples-controls">
          <div className="filter-section">
            <label htmlFor="category-filter">Category:</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              <option value="all">All Categories</option>
              <option value="technical-skills">Technical Skills</option>
              <option value="research-ability">Research Ability</option>
              <option value="communication">Communication</option>
              <option value="professional-development">Professional Development</option>
              <option value="innovation">Innovation & Creativity</option>
            </select>
          </div>

          <div className="view-controls">
            <label>View:</label>
            <div className="view-buttons">
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
            </div>
          </div>

          <div className="quick-actions">
            <button className="action-btn download">
              📄 Download All
            </button>
            <button className="action-btn bookmark">
              🔖 Bookmark
            </button>
          </div>
        </section>

        <section className="evaluation-examples-list">
          <h2>Evaluation Examples</h2>
          <div className={`examples-container ${viewMode}`}>
            {filteredExamples.map(example => (
              <div key={example.id} className="example-card">
                <div 
                  className="example-header"
                  onClick={() => handleExampleSelect(example)}
                >
                  <div className="example-info">
                    <h3>{example.title}</h3>
                    <p className="example-description">{example.description}</p>
                  </div>
                  <div className="example-meta">
                    <div className="score-badge" style={{ background: getLevelColor(example.level) }}>
                      {example.score}%
                    </div>
                    <div className="level-badge" style={{ color: getLevelColor(example.level) }}>
                      {example.level.replace('-', ' ')}
                    </div>
                    <span className="expand-icon">
                      {selectedExample?.id === example.id ? '▼' : '▶'}
                    </span>
                  </div>
                </div>

                {selectedExample?.id === example.id && (
                  <div className="example-details">
                    <div className="materials-section">
                      <h4>Student Materials</h4>
                      <div className="materials-grid">
                        {Object.entries(example.materials).map(([key, material]) => (
                          <div key={key} className="material-item">
                            <h5>{material.title}</h5>
                            <p className="material-description">{material.description}</p>
                            <div className="highlights">
                              <h6>Key Highlights:</h6>
                              <ul>
                                {material.highlights.map((highlight, index) => (
                                  <li key={index}>{highlight}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="feedback-section">
                      <h4>Evaluator Feedback</h4>
                      <div className="feedback-content">
                        <div className="evaluator-info">
                          <strong>Evaluator:</strong> {example.feedback.evaluator}
                        </div>
                        
                        <div className="feedback-grid">
                          <div className="strengths">
                            <h5>Strengths</h5>
                            <ul>
                              {example.feedback.strengths.map((strength, index) => (
                                <li key={index}>{strength}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="improvements">
                            <h5>Areas for Improvement</h5>
                            <ul>
                              {example.feedback.improvements.map((improvement, index) => (
                                <li key={index}>{improvement}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="overall-comment">
                          <h5>Overall Comment</h5>
                          <p>{example.feedback.overallComment}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="training-materials">
          <h2>Training & Calibration Materials</h2>
          <div className="training-grid">
            {trainingMaterials.map(material => (
              <div key={material.id} className="training-card">
                <div className="training-header">
                  <h3>{material.title}</h3>
                  <div className="training-meta">
                    <span className={`type-badge ${material.type}`}>
                      {material.type}
                    </span>
                    <span className={`difficulty-badge ${material.difficulty}`}>
                      {material.difficulty}
                    </span>
                  </div>
                </div>
                
                <p className="training-description">{material.description}</p>
                
                <div className="training-details">
                  <div className="duration">
                    <strong>Duration:</strong> {material.duration}
                  </div>
                  
                  <div className="materials-list">
                    <strong>Includes:</strong>
                    <ul>
                      {material.materials.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="training-actions">
                  <button className="training-btn primary">Start Training</button>
                  <button className="training-btn secondary">Preview</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="case-studies">
          <h2>Case Studies & Best Practices</h2>
          <div className="case-studies-list">
            {caseStudies.map(caseStudy => (
              <div key={caseStudy.id} className="case-study-card">
                <h3>{caseStudy.title}</h3>
                
                <div className="case-study-content">
                  <div className="scenario">
                    <h4>Scenario</h4>
                    <p>{caseStudy.scenario}</p>
                  </div>
                  
                  <div className="challenge">
                    <h4>Challenge</h4>
                    <p>{caseStudy.challenge}</p>
                  </div>
                  
                  <div className="resolution">
                    <h4>Resolution</h4>
                    <p>{caseStudy.resolution}</p>
                  </div>
                  
                  <div className="outcome">
                    <h4>Outcome</h4>
                    <p>{caseStudy.outcome}</p>
                  </div>
                  
                  <div className="lessons">
                    <h4>Key Lessons</h4>
                    <ul>
                      {caseStudy.lessons.map((lesson, index) => (
                        <li key={index}>{lesson}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="evaluation-tips">
          <h2>Evaluation Best Practices</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>Before Evaluation</h3>
              <ul>
                <li>Review evaluation criteria and rubrics</li>
                <li>Familiarize yourself with student background</li>
                <li>Prepare evaluation environment and materials</li>
                <li>Set aside adequate time for thorough review</li>
              </ul>
            </div>
            
            <div className="tip-card">
              <h3>During Evaluation</h3>
              <ul>
                <li>Use evidence-based assessment</li>
                <li>Take detailed notes with specific examples</li>
                <li>Consider multiple perspectives and sources</li>
                <li>Avoid bias and maintain objectivity</li>
              </ul>
            </div>
            
            <div className="tip-card">
              <h3>After Evaluation</h3>
              <ul>
                <li>Review scores for consistency</li>
                <li>Provide constructive, specific feedback</li>
                <li>Document reasoning for edge cases</li>
                <li>Reflect on evaluation process for improvement</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default EvaluationExamples