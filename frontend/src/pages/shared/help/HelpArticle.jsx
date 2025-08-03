import { useState } from 'react'
import { helpCategories } from '../../../data/helpData'
import './HelpArticle.css'

const HelpArticle = ({ article }) => {
  const [isHelpful, setIsHelpful] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState('')

  if (!article) {
    return (
      <div className="help-article error">
        <h2>文章未找到</h2>
        <p>抱歉，无法找到您要查看的帮助文章。</p>
      </div>
    )
  }

  const category = helpCategories.find(c => c.id === article.category)

  const handleHelpfulClick = (helpful) => {
    setIsHelpful(helpful)
    if (!helpful) {
      setShowFeedback(true)
    }
  }

  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement feedback submission to backend
    console.log('Feedback submitted:', { articleId: article.id, feedback, isHelpful })
    setShowFeedback(false)
    setFeedback('')
    // Show success message
    alert('感谢您的反馈！我们会持续改进帮助文档。')
  }

  const renderMarkdownContent = (content) => {
    // Simple markdown renderer for basic formatting
    const lines = content.split('\n')
    const elements = []
    let currentList = null
    let currentListItems = []

    lines.forEach((line, index) => {
      const trimmedLine = line.trim()
      
      if (trimmedLine === '') {
        if (currentList) {
          elements.push(
            <ul key={`list-${index}`} className="article-list">
              {currentListItems}
            </ul>
          )
          currentList = null
          currentListItems = []
        }
        elements.push(<br key={`br-${index}`} />)
        return
      }

      // Headers
      if (trimmedLine.startsWith('# ')) {
        elements.push(<h1 key={index} className="article-h1">{trimmedLine.slice(2)}</h1>)
      } else if (trimmedLine.startsWith('## ')) {
        elements.push(<h2 key={index} className="article-h2">{trimmedLine.slice(3)}</h2>)
      } else if (trimmedLine.startsWith('### ')) {
        elements.push(<h3 key={index} className="article-h3">{trimmedLine.slice(4)}</h3>)
      } else if (trimmedLine.startsWith('#### ')) {
        elements.push(<h4 key={index} className="article-h4">{trimmedLine.slice(5)}</h4>)
      }
      // List items
      else if (trimmedLine.startsWith('- ')) {
        const listItem = <li key={`item-${index}`}>{trimmedLine.slice(2)}</li>
        currentListItems.push(listItem)
        if (!currentList) {
          currentList = 'ul'
        }
      }
      // Regular paragraphs
      else if (trimmedLine) {
        if (currentList) {
          elements.push(
            <ul key={`list-${index}`} className="article-list">
              {currentListItems}
            </ul>
          )
          currentList = null
          currentListItems = []
        }
        
        // Bold text **text**
        let formattedText = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        
        elements.push(
          <p 
            key={index} 
            className="article-paragraph"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        )
      }
    })

    // Handle remaining list items
    if (currentList && currentListItems.length > 0) {
      elements.push(
        <ul key="final-list" className="article-list">
          {currentListItems}
        </ul>
      )
    }

    return elements
  }

  return (
    <div className="help-article">
      <article className="article-content">
        <div className="article-header">
          <div className="article-breadcrumb">
            {category && (
              <span className="breadcrumb-category">
                <span className="category-icon">{category.icon}</span>
                {category.name}
              </span>
            )}
          </div>
          
          <h1 className="article-title">{article.title}</h1>
          
          <div className="article-meta">
            <div className="article-tags">
              {article.tags.map(tag => (
                <span key={tag} className="article-tag">{tag}</span>
              ))}
            </div>
            <div className="article-date">
              最后更新：{article.lastUpdated}
            </div>
          </div>
        </div>

        <div className="article-body">
          {renderMarkdownContent(article.content)}
        </div>

        <div className="article-footer">
          <div className="article-helpful">
            <h4>这篇文章有帮助吗？</h4>
            <div className="helpful-buttons">
              <button 
                className={`helpful-btn ${isHelpful === true ? 'active positive' : ''}`}
                onClick={() => handleHelpfulClick(true)}
              >
                👍 有帮助
              </button>
              <button 
                className={`helpful-btn ${isHelpful === false ? 'active negative' : ''}`}
                onClick={() => handleHelpfulClick(false)}
              >
                👎 没有帮助
              </button>
            </div>

            {isHelpful === true && (
              <div className="feedback-message success">
                <p>谢谢您的反馈！很高兴这篇文章对您有帮助。</p>
              </div>
            )}

            {showFeedback && (
              <div className="feedback-form">
                <h5>请告诉我们如何改进这篇文章：</h5>
                <form onSubmit={handleFeedbackSubmit}>
                  <textarea
                    className="feedback-textarea"
                    placeholder="请描述您遇到的问题或建议..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows="4"
                    required
                  />
                  <div className="feedback-actions">
                    <button type="submit" className="btn-primary">
                      提交反馈
                    </button>
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={() => setShowFeedback(false)}
                    >
                      取消
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="article-actions">
            <button 
              className="action-btn"
              onClick={() => window.print()}
            >
              🖨️ 打印文章
            </button>
            <button 
              className="action-btn"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                alert('文章链接已复制到剪贴板')
              }}
            >
              📋 复制链接
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default HelpArticle