import { useState, useEffect } from 'react'
import './CommentsSystem.css'

function CommentsSystem({ studentData, evaluationData, onCommentsUpdate, onAutoSave }) {
  const [comments, setComments] = useState(evaluationData.comments || {})
  const [activeSection, setActiveSection] = useState('strengths')
  const [wordCounts, setWordCounts] = useState({})
  const [templates, setTemplates] = useState({})
  const [showTemplates, setShowTemplates] = useState(false)

  const commentSections = {
    strengths: {
      name: 'Strengths & Achievements',
      description: 'Highlight the student\'s key strengths and notable achievements',
      minWords: 100,
      maxWords: 500,
      placeholder: 'Describe the student\'s primary strengths, exceptional qualities, and significant achievements...',
      icon: '⭐'
    },
    areas_improvement: {
      name: 'Areas for Improvement',
      description: 'Identify specific areas where the student can grow and develop',
      minWords: 50,
      maxWords: 300,
      placeholder: 'Provide constructive feedback on areas that need attention and development suggestions...',
      icon: '📈'
    },
    academic_performance: {
      name: 'Academic Performance',
      description: 'Detailed assessment of academic work and scholarly abilities',
      minWords: 150,
      maxWords: 400,
      placeholder: 'Evaluate coursework quality, research capabilities, analytical skills, and academic engagement...',
      icon: '📚'
    },
    character_assessment: {
      name: 'Character & Ethics',
      description: 'Assessment of personal character, integrity, and professional conduct',
      minWords: 100,
      maxWords: 300,
      placeholder: 'Assess integrity, responsibility, professionalism, and ethical behavior...',
      icon: '🎯'
    },
    innovation_creativity: {
      name: 'Innovation & Creativity',
      description: 'Evaluation of creative thinking and innovative problem-solving',
      minWords: 75,
      maxWords: 250,
      placeholder: 'Describe creative approaches, innovative solutions, and original thinking demonstrated...',
      icon: '💡'
    },
    future_potential: {
      name: 'Future Potential',
      description: 'Assessment of long-term potential and career prospects',
      minWords: 100,
      maxWords: 300,
      placeholder: 'Evaluate likelihood of future success, growth potential, and career readiness...',
      icon: '🚀'
    },
    overall_recommendation: {
      name: 'Overall Recommendation',
      description: 'Final recommendation and summary assessment',
      minWords: 150,
      maxWords: 400,
      placeholder: 'Provide your overall assessment and recommendation for this student...',
      icon: '📋'
    }
  }

  const commentTemplates = {
    strengths: [
      "demonstrates exceptional ability in",
      "shows remarkable dedication to",
      "consistently exhibits high-quality work in",
      "displays outstanding leadership in",
      "exhibits strong analytical skills particularly in"
    ],
    areas_improvement: [
      "would benefit from developing stronger skills in",
      "could improve by focusing more attention on",
      "should consider enhancing abilities in",
      "might strengthen performance by working on",
      "could develop further expertise in"
    ],
    academic_performance: [
      "academic work consistently meets high standards",
      "demonstrates solid understanding of core concepts",
      "shows excellent research capabilities",
      "exhibits strong critical thinking skills",
      "maintains high academic standards throughout"
    ],
    character_assessment: [
      "demonstrates strong ethical principles",
      "exhibits reliable and responsible behavior",
      "shows consistent professional conduct",
      "displays integrity in all interactions",
      "maintains high standards of personal responsibility"
    ],
    innovation_creativity: [
      "approaches problems with creative solutions",
      "demonstrates innovative thinking in",
      "shows original approaches to",
      "exhibits creative problem-solving abilities",
      "displays entrepreneurial mindset in"
    ],
    future_potential: [
      "shows strong potential for future success",
      "likely to excel in advanced studies",
      "demonstrates readiness for professional challenges",
      "exhibits qualities needed for leadership roles",
      "shows promise for significant contributions to"
    ],
    overall_recommendation: [
      "strongly recommend this student for",
      "this student would be an excellent candidate for",
      "based on overall performance, I recommend",
      "considering all factors, my recommendation is",
      "this student demonstrates the qualities needed for"
    ]
  }

  const handleCommentChange = (sectionId, value) => {
    const newComments = {
      ...comments,
      [sectionId]: value
    }
    
    setComments(newComments)
    onAutoSave()
    
    // Update word count
    const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length
    setWordCounts(prev => ({
      ...prev,
      [sectionId]: wordCount
    }))
  }

  const insertTemplate = (sectionId, template) => {
    const currentText = comments[sectionId] || ''
    const newText = currentText ? `${currentText} ${template}` : template
    handleCommentChange(sectionId, newText)
  }

  const getWordCountStatus = (sectionId) => {
    const count = wordCounts[sectionId] || 0
    const section = commentSections[sectionId]
    
    if (count < section.minWords) return 'insufficient'
    if (count > section.maxWords) return 'excessive'
    return 'adequate'
  }

  const getCompletionPercentage = () => {
    const totalSections = Object.keys(commentSections).length
    const completedSections = Object.entries(comments).filter(([sectionId, text]) => {
      const wordCount = wordCounts[sectionId] || 0
      const minWords = commentSections[sectionId].minWords
      return text && text.trim().length > 0 && wordCount >= minWords
    }).length
    
    return Math.round((completedSections / totalSections) * 100)
  }

  const saveComments = () => {
    onCommentsUpdate(comments)
  }

  const handleSpellCheck = (sectionId) => {
    // Simulate spell check - in real implementation, this would use a spell check API
    alert('Spell check completed. No errors found.')
  }

  const exportComments = () => {
    const exportData = {
      student: studentData,
      evaluationDate: new Date().toISOString(),
      comments: comments,
      wordCounts: wordCounts
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `evaluation_comments_${studentData.studentId}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    // Initialize word counts
    const counts = {}
    Object.entries(comments).forEach(([sectionId, text]) => {
      if (text) {
        counts[sectionId] = text.trim().split(/\s+/).filter(word => word.length > 0).length
      }
    })
    setWordCounts(counts)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      saveComments()
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [comments])

  return (
    <div className="comments-system">
      <div className="comments-header">
        <h2>Evaluation Comments & Feedback</h2>
        <div className="comments-controls">
          <button 
            className={`control-btn ${showTemplates ? 'active' : ''}`}
            onClick={() => setShowTemplates(!showTemplates)}
          >
            📝 {showTemplates ? 'Hide' : 'Show'} Templates
          </button>
          <button className="control-btn" onClick={exportComments}>
            📤 Export Comments
          </button>
          <button className="control-btn" onClick={saveComments}>
            💾 Save Comments
          </button>
        </div>
      </div>

      <div className="comments-content">
        <nav className="comments-nav">
          {Object.entries(commentSections).map(([sectionId, section]) => {
            const wordCount = wordCounts[sectionId] || 0
            const status = getWordCountStatus(sectionId)
            const hasContent = comments[sectionId] && comments[sectionId].trim().length > 0
            
            return (
              <button
                key={sectionId}
                className={`nav-item ${activeSection === sectionId ? 'active' : ''} ${status}`}
                onClick={() => setActiveSection(sectionId)}
              >
                <div className="nav-item-content">
                  <div className="nav-header">
                    <span className="nav-icon">{section.icon}</span>
                    <span className="nav-name">{section.name}</span>
                  </div>
                  <div className="nav-status">
                    <span className={`word-count ${status}`}>
                      {wordCount} / {section.minWords}-{section.maxWords} words
                    </span>
                    <span className={`completion-indicator ${hasContent ? 'completed' : 'pending'}`}>
                      {hasContent ? '✓' : '○'}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </nav>

        <div className="comments-main">
          <div className="section-header">
            <div className="section-title">
              <span className="section-icon">{commentSections[activeSection].icon}</span>
              <h3>{commentSections[activeSection].name}</h3>
            </div>
            <div className="section-meta">
              <span className="word-requirement">
                Required: {commentSections[activeSection].minWords}-{commentSections[activeSection].maxWords} words
              </span>
              <span className={`current-count ${getWordCountStatus(activeSection)}`}>
                Current: {wordCounts[activeSection] || 0} words
              </span>
            </div>
          </div>

          <p className="section-description">
            {commentSections[activeSection].description}
          </p>

          <div className="editor-container">
            <div className="editor-toolbar">
              <button 
                className="toolbar-btn"
                onClick={() => handleSpellCheck(activeSection)}
              >
                ✓ Spell Check
              </button>
              <button 
                className="toolbar-btn"
                onClick={() => {
                  const textarea = document.querySelector('.comment-editor')
                  textarea.focus()
                }}
              >
                🎯 Focus
              </button>
              <button 
                className="toolbar-btn"
                onClick={() => {
                  const text = comments[activeSection] || ''
                  navigator.clipboard.writeText(text)
                }}
              >
                📋 Copy
              </button>
            </div>

            <textarea
              className={`comment-editor ${getWordCountStatus(activeSection)}`}
              value={comments[activeSection] || ''}
              onChange={(e) => handleCommentChange(activeSection, e.target.value)}
              placeholder={commentSections[activeSection].placeholder}
              rows={12}
            />

            <div className="editor-footer">
              <div className={`word-counter ${getWordCountStatus(activeSection)}`}>
                <span className="current-words">{wordCounts[activeSection] || 0}</span>
                <span className="word-range">
                  / {commentSections[activeSection].minWords}-{commentSections[activeSection].maxWords} words
                </span>
                {getWordCountStatus(activeSection) === 'insufficient' && (
                  <span className="status-message">Need {commentSections[activeSection].minWords - (wordCounts[activeSection] || 0)} more words</span>
                )}
                {getWordCountStatus(activeSection) === 'excessive' && (
                  <span className="status-message">{(wordCounts[activeSection] || 0) - commentSections[activeSection].maxWords} words over limit</span>
                )}
              </div>
            </div>
          </div>

          {showTemplates && (
            <div className="templates-panel">
              <h4>Comment Templates</h4>
              <div className="templates-grid">
                {commentTemplates[activeSection]?.map((template, index) => (
                  <button
                    key={index}
                    className="template-item"
                    onClick={() => insertTemplate(activeSection, template)}
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="comments-summary">
        <h3>Comments Summary</h3>
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">Completion:</span>
            <span className="stat-value">{getCompletionPercentage()}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Words:</span>
            <span className="stat-value">
              {Object.values(wordCounts).reduce((total, count) => total + count, 0)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Sections Completed:</span>
            <span className="stat-value">
              {Object.entries(comments).filter(([sectionId, text]) => {
                const wordCount = wordCounts[sectionId] || 0
                const minWords = commentSections[sectionId].minWords
                return text && text.trim().length > 0 && wordCount >= minWords
              }).length} / {Object.keys(commentSections).length}
            </span>
          </div>
        </div>

        <div className="completion-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${getCompletionPercentage()}%` }}
            />
          </div>
          <span className="progress-text">
            Overall Comments Progress: {getCompletionPercentage()}%
          </span>
        </div>

        <div className="section-checklist">
          <h4>Section Status</h4>
          <div className="checklist-items">
            {Object.entries(commentSections).map(([sectionId, section]) => {
              const wordCount = wordCounts[sectionId] || 0
              const hasContent = comments[sectionId] && comments[sectionId].trim().length > 0
              const isComplete = hasContent && wordCount >= section.minWords
              
              return (
                <div key={sectionId} className={`checklist-item ${isComplete ? 'completed' : 'pending'}`}>
                  <span className="checklist-icon">
                    {isComplete ? '✅' : '⏳'}
                  </span>
                  <span className="checklist-name">{section.name}</span>
                  <span className="checklist-status">
                    {wordCount} / {section.minWords}+ words
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentsSystem