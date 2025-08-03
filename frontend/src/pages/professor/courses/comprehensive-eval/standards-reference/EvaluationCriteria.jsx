import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../../../../../components/Layout'
import './EvaluationCriteria.css'

function EvaluationCriteria() {
  const { courseId } = useParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDimension, setSelectedDimension] = useState(null)

  const [evaluationCriteria, setEvaluationCriteria] = useState([
    {
      id: 1,
      dimension: 'Technical Skills',
      category: 'core',
      weight: 25,
      description: 'Assessment of programming, software development, and technical problem-solving abilities',
      criteria: [
        {
          id: '1.1',
          name: 'Programming Proficiency',
          weight: 40,
          description: 'Ability to write clean, efficient, and maintainable code',
          levels: [
            { level: 'Excellent (90-100)', description: 'Demonstrates mastery of multiple programming languages, writes optimal algorithms' },
            { level: 'Good (80-89)', description: 'Solid programming skills with minor areas for improvement' },
            { level: 'Satisfactory (70-79)', description: 'Basic programming competency, meets minimum requirements' },
            { level: 'Needs Improvement (60-69)', description: 'Limited programming skills, requires significant development' },
            { level: 'Unsatisfactory (0-59)', description: 'Inadequate programming abilities' }
          ]
        },
        {
          id: '1.2',
          name: 'Problem Solving',
          weight: 35,
          description: 'Ability to analyze complex problems and develop effective solutions',
          levels: [
            { level: 'Excellent (90-100)', description: 'Consistently identifies optimal solutions to complex problems' },
            { level: 'Good (80-89)', description: 'Effectively solves most problems with minimal guidance' },
            { level: 'Satisfactory (70-79)', description: 'Can solve routine problems independently' },
            { level: 'Needs Improvement (60-69)', description: 'Requires assistance for complex problem solving' },
            { level: 'Unsatisfactory (0-59)', description: 'Unable to solve problems independently' }
          ]
        },
        {
          id: '1.3',
          name: 'Technical Documentation',
          weight: 25,
          description: 'Quality of technical writing and documentation skills',
          levels: [
            { level: 'Excellent (90-100)', description: 'Clear, comprehensive, and well-structured documentation' },
            { level: 'Good (80-89)', description: 'Good documentation with minor clarity issues' },
            { level: 'Satisfactory (70-79)', description: 'Adequate documentation that meets basic requirements' },
            { level: 'Needs Improvement (60-69)', description: 'Incomplete or unclear documentation' },
            { level: 'Unsatisfactory (0-59)', description: 'Poor or missing documentation' }
          ]
        }
      ]
    },
    {
      id: 2,
      dimension: 'Research Ability',
      category: 'core',
      weight: 20,
      description: 'Evaluation of research methodology, critical thinking, and academic rigor',
      criteria: [
        {
          id: '2.1',
          name: 'Research Methodology',
          weight: 50,
          description: 'Understanding and application of appropriate research methods',
          levels: [
            { level: 'Excellent (90-100)', description: 'Demonstrates sophisticated understanding of research methods' },
            { level: 'Good (80-89)', description: 'Good grasp of research methodology with minor gaps' },
            { level: 'Satisfactory (70-79)', description: 'Basic understanding of research approaches' },
            { level: 'Needs Improvement (60-69)', description: 'Limited research methodology knowledge' },
            { level: 'Unsatisfactory (0-59)', description: 'Inadequate research skills' }
          ]
        },
        {
          id: '2.2',
          name: 'Critical Analysis',
          weight: 30,
          description: 'Ability to critically evaluate information and draw valid conclusions',
          levels: [
            { level: 'Excellent (90-100)', description: 'Exceptional analytical thinking and insight' },
            { level: 'Good (80-89)', description: 'Strong analytical abilities with good reasoning' },
            { level: 'Satisfactory (70-79)', description: 'Adequate critical thinking skills' },
            { level: 'Needs Improvement (60-69)', description: 'Weak analytical reasoning' },
            { level: 'Unsatisfactory (0-59)', description: 'Poor critical thinking abilities' }
          ]
        },
        {
          id: '2.3',
          name: 'Literature Review',
          weight: 20,
          description: 'Ability to conduct comprehensive literature reviews',
          levels: [
            { level: 'Excellent (90-100)', description: 'Thorough and insightful literature analysis' },
            { level: 'Good (80-89)', description: 'Comprehensive review with good synthesis' },
            { level: 'Satisfactory (70-79)', description: 'Adequate literature coverage' },
            { level: 'Needs Improvement (60-69)', description: 'Incomplete literature review' },
            { level: 'Unsatisfactory (0-59)', description: 'Poor literature review skills' }
          ]
        }
      ]
    },
    {
      id: 3,
      dimension: 'Communication Skills',
      category: 'core',
      weight: 20,
      description: 'Assessment of written and oral communication abilities',
      criteria: [
        {
          id: '3.1',
          name: 'Written Communication',
          weight: 50,
          description: 'Clarity, organization, and effectiveness of written work',
          levels: [
            { level: 'Excellent (90-100)', description: 'Clear, engaging, and professionally written' },
            { level: 'Good (80-89)', description: 'Well-written with minor issues' },
            { level: 'Satisfactory (70-79)', description: 'Acceptable writing quality' },
            { level: 'Needs Improvement (60-69)', description: 'Writing needs significant improvement' },
            { level: 'Unsatisfactory (0-59)', description: 'Poor writing quality' }
          ]
        },
        {
          id: '3.2',
          name: 'Oral Presentation',
          weight: 50,
          description: 'Effectiveness of verbal presentations and public speaking',
          levels: [
            { level: 'Excellent (90-100)', description: 'Engaging, clear, and confident presentations' },
            { level: 'Good (80-89)', description: 'Good presentation skills with minor areas for improvement' },
            { level: 'Satisfactory (70-79)', description: 'Adequate presentation abilities' },
            { level: 'Needs Improvement (60-69)', description: 'Presentation skills need development' },
            { level: 'Unsatisfactory (0-59)', description: 'Poor presentation abilities' }
          ]
        }
      ]
    },
    {
      id: 4,
      dimension: 'Professional Development',
      category: 'supplementary',
      weight: 15,
      description: 'Growth mindset, learning ability, and professional behavior',
      criteria: [
        {
          id: '4.1',
          name: 'Learning Agility',
          weight: 40,
          description: 'Ability to learn new concepts and adapt to changes',
          levels: [
            { level: 'Excellent (90-100)', description: 'Rapidly learns and applies new concepts' },
            { level: 'Good (80-89)', description: 'Good learning ability with some guidance' },
            { level: 'Satisfactory (70-79)', description: 'Learns at an acceptable pace' },
            { level: 'Needs Improvement (60-69)', description: 'Slow to learn new concepts' },
            { level: 'Unsatisfactory (0-59)', description: 'Difficulty learning new material' }
          ]
        },
        {
          id: '4.2',
          name: 'Professional Conduct',
          weight: 35,
          description: 'Professional behavior, ethics, and workplace conduct',
          levels: [
            { level: 'Excellent (90-100)', description: 'Exemplary professional behavior and ethics' },
            { level: 'Good (80-89)', description: 'Good professional conduct with minor issues' },
            { level: 'Satisfactory (70-79)', description: 'Meets professional standards' },
            { level: 'Needs Improvement (60-69)', description: 'Some professional conduct concerns' },
            { level: 'Unsatisfactory (0-59)', description: 'Poor professional behavior' }
          ]
        },
        {
          id: '4.3',
          name: 'Initiative',
          weight: 25,
          description: 'Self-direction and proactive behavior',
          levels: [
            { level: 'Excellent (90-100)', description: 'Consistently takes initiative and leads' },
            { level: 'Good (80-89)', description: 'Shows good initiative most of the time' },
            { level: 'Satisfactory (70-79)', description: 'Takes initiative when prompted' },
            { level: 'Needs Improvement (60-69)', description: 'Rarely shows initiative' },
            { level: 'Unsatisfactory (0-59)', description: 'Lacks initiative and self-direction' }
          ]
        }
      ]
    },
    {
      id: 5,
      dimension: 'Innovation and Creativity',
      category: 'supplementary',
      weight: 20,
      description: 'Creative thinking, innovation, and novel problem-solving approaches',
      criteria: [
        {
          id: '5.1',
          name: 'Creative Problem Solving',
          weight: 60,
          description: 'Ability to develop innovative solutions',
          levels: [
            { level: 'Excellent (90-100)', description: 'Consistently develops innovative solutions' },
            { level: 'Good (80-89)', description: 'Shows creativity in problem solving' },
            { level: 'Satisfactory (70-79)', description: 'Occasionally demonstrates creativity' },
            { level: 'Needs Improvement (60-69)', description: 'Limited creative thinking' },
            { level: 'Unsatisfactory (0-59)', description: 'Lacks creative problem-solving skills' }
          ]
        },
        {
          id: '5.2',
          name: 'Innovation Impact',
          weight: 40,
          description: 'Impact and practicality of innovative ideas',
          levels: [
            { level: 'Excellent (90-100)', description: 'Ideas have significant practical impact' },
            { level: 'Good (80-89)', description: 'Good ideas with measurable impact' },
            { level: 'Satisfactory (70-79)', description: 'Ideas show promise but limited impact' },
            { level: 'Needs Improvement (60-69)', description: 'Ideas lack practical application' },
            { level: 'Unsatisfactory (0-59)', description: 'No meaningful innovative contributions' }
          ]
        }
      ]
    }
  ])

  const [institutionalPolicies, setInstitutionalPolicies] = useState([
    {
      id: 1,
      title: 'Academic Integrity Policy',
      category: 'ethics',
      summary: 'Guidelines for maintaining academic honesty and preventing plagiarism',
      lastUpdated: '2024-12-15',
      version: '2.1',
      content: 'All evaluations must be conducted with strict adherence to academic integrity principles...'
    },
    {
      id: 2,
      title: 'Fair Assessment Guidelines',
      category: 'assessment',
      summary: 'Ensuring equitable evaluation across all student populations',
      lastUpdated: '2024-11-20',
      version: '1.8',
      content: 'Evaluators must consider diverse backgrounds and learning styles when assessing students...'
    },
    {
      id: 3,
      title: 'Conflict of Interest Policy',
      category: 'ethics',
      summary: 'Managing potential conflicts in evaluation processes',
      lastUpdated: '2024-10-30',
      version: '1.5',
      content: 'Evaluators must disclose any potential conflicts of interest that might affect their judgment...'
    }
  ])

  const filteredCriteria = evaluationCriteria.filter(criterion => {
    const matchesCategory = selectedCategory === 'all' || criterion.category === selectedCategory
    const matchesSearch = criterion.dimension.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         criterion.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleDimensionClick = (dimension) => {
    setSelectedDimension(selectedDimension?.id === dimension.id ? null : dimension)
  }

  return (
    <Layout role="professor">
      <div className="evaluation-criteria">
        <header className="criteria-header">
          <div className="header-content">
            <h1>Evaluation Criteria & Standards</h1>
            <p className="header-description">
              Comprehensive reference for evaluation criteria, scoring guidelines, and institutional policies
            </p>
          </div>
          <div className="header-nav">
            <Link 
              to={`/professor/courses/comprehensive-eval/${courseId}/standards-reference/rubrics`}
              className="nav-link"
            >
              View Rubrics
            </Link>
            <Link 
              to={`/professor/courses/comprehensive-eval/${courseId}/standards-reference/examples`}
              className="nav-link"
            >
              View Examples
            </Link>
          </div>
        </header>

        <section className="criteria-controls">
          <div className="search-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search criteria, dimensions, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
          
          <div className="filter-section">
            <label htmlFor="category-filter">Category:</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              <option value="all">All Categories</option>
              <option value="core">Core Dimensions</option>
              <option value="supplementary">Supplementary Dimensions</option>
            </select>
          </div>

          <div className="quick-actions">
            <button className="action-btn download">
              📄 Download PDF
            </button>
            <button className="action-btn print">
              🖨️ Print Guide
            </button>
          </div>
        </section>

        <section className="criteria-overview">
          <h2>Evaluation Dimensions Overview</h2>
          <div className="dimensions-grid">
            {filteredCriteria.map(dimension => (
              <div 
                key={dimension.id} 
                className={`dimension-card ${selectedDimension?.id === dimension.id ? 'expanded' : ''}`}
                onClick={() => handleDimensionClick(dimension)}
              >
                <div className="dimension-header">
                  <h3>{dimension.dimension}</h3>
                  <div className="dimension-meta">
                    <span className={`category-badge ${dimension.category}`}>
                      {dimension.category}
                    </span>
                    <span className="weight-badge">
                      {dimension.weight}%
                    </span>
                  </div>
                </div>
                
                <p className="dimension-description">{dimension.description}</p>
                
                {selectedDimension?.id === dimension.id && (
                  <div className="dimension-details">
                    <h4>Assessment Criteria</h4>
                    <div className="criteria-list">
                      {dimension.criteria.map(criterion => (
                        <div key={criterion.id} className="criterion-item">
                          <div className="criterion-header">
                            <h5>{criterion.name}</h5>
                            <span className="criterion-weight">{criterion.weight}%</span>
                          </div>
                          <p className="criterion-description">{criterion.description}</p>
                          
                          <div className="performance-levels">
                            <h6>Performance Levels:</h6>
                            {criterion.levels.map((level, index) => (
                              <div key={index} className="level-item">
                                <div className="level-header">
                                  <span className="level-name">{level.level}</span>
                                </div>
                                <p className="level-description">{level.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="dimension-footer">
                  <span className="expand-indicator">
                    {selectedDimension?.id === dimension.id ? '▼ Collapse' : '▶ Expand Details'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="methodology-section">
          <h2>Evaluation Methodology</h2>
          <div className="methodology-grid">
            <div className="methodology-card">
              <h3>Scoring Approach</h3>
              <ul>
                <li>Weighted scoring based on dimension importance</li>
                <li>Holistic assessment combining quantitative and qualitative measures</li>
                <li>Multiple evaluation perspectives for comprehensive coverage</li>
                <li>Calibration exercises to ensure consistency</li>
              </ul>
            </div>
            
            <div className="methodology-card">
              <h3>Assessment Guidelines</h3>
              <ul>
                <li>Evidence-based evaluation using multiple data sources</li>
                <li>Clear documentation of reasoning and judgment</li>
                <li>Constructive feedback for student development</li>
                <li>Regular review and updates of criteria</li>
              </ul>
            </div>
            
            <div className="methodology-card">
              <h3>Quality Assurance</h3>
              <ul>
                <li>Peer review of evaluation decisions</li>
                <li>Regular calibration sessions among evaluators</li>
                <li>Systematic bias detection and mitigation</li>
                <li>Continuous improvement based on feedback</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="policies-section">
          <h2>Institutional Evaluation Policies</h2>
          <div className="policies-list">
            {institutionalPolicies.map(policy => (
              <div key={policy.id} className="policy-item">
                <div className="policy-header">
                  <h3>{policy.title}</h3>
                  <div className="policy-meta">
                    <span className={`policy-category ${policy.category}`}>
                      {policy.category}
                    </span>
                    <span className="policy-version">v{policy.version}</span>
                  </div>
                </div>
                <p className="policy-summary">{policy.summary}</p>
                <div className="policy-footer">
                  <span className="last-updated">Last updated: {policy.lastUpdated}</span>
                  <button className="view-full-btn">View Full Policy</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="version-history">
          <h2>Criteria Version History</h2>
          <div className="version-timeline">
            <div className="version-item current">
              <div className="version-marker"></div>
              <div className="version-content">
                <h4>Version 3.2 (Current)</h4>
                <p className="version-date">January 8, 2025</p>
                <p className="version-changes">
                  Added Innovation and Creativity dimension, updated Technical Skills weighting
                </p>
              </div>
            </div>
            <div className="version-item">
              <div className="version-marker"></div>
              <div className="version-content">
                <h4>Version 3.1</h4>
                <p className="version-date">December 15, 2024</p>
                <p className="version-changes">
                  Refined Communication Skills criteria, added Professional Development assessment
                </p>
              </div>
            </div>
            <div className="version-item">
              <div className="version-marker"></div>
              <div className="version-content">
                <h4>Version 3.0</h4>
                <p className="version-date">November 20, 2024</p>
                <p className="version-changes">
                  Major revision with new scoring system and updated research criteria
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default EvaluationCriteria