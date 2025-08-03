import { useState } from 'react'
import './HelpFAQ.css'

const HelpFAQ = ({ faqData = [] }) => {
  const [expandedItems, setExpandedItems] = useState(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const toggleItem = (faqId) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId)
    } else {
      newExpanded.add(faqId)
    }
    setExpandedItems(newExpanded)
  }

  const expandAll = () => {
    setExpandedItems(new Set(filteredFAQs.map(faq => faq.id)))
  }

  const collapseAll = () => {
    setExpandedItems(new Set())
  }

  // Get unique categories
  const categories = [
    { id: 'all', name: '全部问题', count: faqData.length },
    ...Object.entries(
      faqData.reduce((acc, faq) => {
        acc[faq.category] = (acc[faq.category] || 0) + 1
        return acc
      }, {})
    ).map(([id, count]) => ({
      id,
      name: getCategoryName(id),
      count
    }))
  ]

  function getCategoryName(categoryId) {
    const categoryNames = {
      account: '账号相关',
      technical: '技术问题',
      support: '支持服务',
      course: '课程管理',
      reporting: '报告数据',
      analytics: '分析统计',
      notifications: '通知设置',
      calendar: '日历功能',
      data: '数据安全'
    }
    return categoryNames[categoryId] || categoryId
  }

  // Filter FAQs based on search query and category
  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = !searchQuery || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="help-faq">
      <div className="faq-header">
        <div className="faq-intro">
          <h2>常见问题解答</h2>
          <p>这里汇总了用户最常遇到的问题和解决方案。如果您没有找到答案，请联系技术支持。</p>
        </div>

        <div className="faq-search">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="搜索问题..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="clear-btn"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="faq-filters">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          <div className="expand-controls">
            <button className="control-btn" onClick={expandAll}>
              📖 展开全部
            </button>
            <button className="control-btn" onClick={collapseAll}>
              📚 收起全部
            </button>
          </div>
        </div>
      </div>

      <div className="faq-content">
        {filteredFAQs.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">❓</div>
            <h4>未找到相关问题</h4>
            <p>尝试使用不同的关键词或选择其他分类</p>
            <button 
              className="btn-secondary"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
            >
              查看全部问题
            </button>
          </div>
        ) : (
          <div className="faq-list">
            <div className="faq-results-info">
              显示 {filteredFAQs.length} 个问题
              {searchQuery && ` · 搜索："${searchQuery}"`}
              {selectedCategory !== 'all' && ` · 分类：${getCategoryName(selectedCategory)}`}
            </div>

            {filteredFAQs.map((faq, index) => (
              <div 
                key={faq.id} 
                className={`faq-item ${expandedItems.has(faq.id) ? 'expanded' : ''}`}
              >
                <div 
                  className="faq-question"
                  onClick={() => toggleItem(faq.id)}
                >
                  <div className="question-content">
                    <span className="question-number">{index + 1}</span>
                    <h4 className="question-text">{faq.question}</h4>
                  </div>
                  <div className="question-meta">
                    <span className="category-tag">
                      {getCategoryName(faq.category)}
                    </span>
                    <span className={`expand-icon ${expandedItems.has(faq.id) ? 'rotated' : ''}`}>
                      ▼
                    </span>
                  </div>
                </div>

                {expandedItems.has(faq.id) && (
                  <div className="faq-answer">
                    <div className="answer-content">
                      <p>{faq.answer}</p>
                    </div>
                    <div className="answer-footer">
                      <div className="answer-tags">
                        {faq.tags.map(tag => (
                          <span key={tag} className="answer-tag">{tag}</span>
                        ))}
                      </div>
                      <div className="answer-actions">
                        <button 
                          className="helpful-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            // TODO: Implement helpful feedback
                            console.log('FAQ helpful:', faq.id)
                          }}
                        >
                          👍 有用
                        </button>
                        <button 
                          className="share-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigator.clipboard.writeText(`Q: ${faq.question}\nA: ${faq.answer}`)
                            alert('问题和答案已复制到剪贴板')
                          }}
                        >
                          📋 复制
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="faq-footer">
        <div className="footer-actions">
          <h4>没有找到您要的答案？</h4>
          <p>我们的技术支持团队随时为您提供帮助</p>
          <div className="footer-buttons">
            <button className="btn-primary">
              💬 联系技术支持
            </button>
            <button className="btn-secondary">
              📧 发送邮件
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpFAQ