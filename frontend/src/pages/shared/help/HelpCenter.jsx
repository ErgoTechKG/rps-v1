import { useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import Layout from '../../../components/Layout'
import HelpSearch from './HelpSearch'
import HelpArticle from './HelpArticle'
import HelpFAQ from './HelpFAQ'
import ContactSupport from './ContactSupport'
import { 
  helpCategories, 
  getArticlesByCategory, 
  getFAQByRole,
  searchHelpContent 
} from '../../../data/helpData'
import './HelpCenter.css'

const HelpCenter = () => {
  const { user } = useAuth()
  const [currentView, setCurrentView] = useState('home') // home, search, article, faq, contact
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Reset view when user changes
  useEffect(() => {
    setCurrentView('home')
    setSelectedArticle(null)
    setSearchQuery('')
    setSearchResults([])
    setSelectedCategory(null)
  }, [user])

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.trim()) {
      const results = searchHelpContent(query, user?.role)
      setSearchResults(results)
      setCurrentView('search')
    } else {
      setSearchResults([])
      setCurrentView('home')
    }
  }

  const handleArticleSelect = (article) => {
    setSelectedArticle(article)
    setCurrentView('article')
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    const articles = getArticlesByCategory(category.id, user?.role)
    setSearchResults(articles)
    setCurrentView('search')
    setSearchQuery(`分类: ${category.name}`)
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedArticle(null)
    setSearchQuery('')
    setSearchResults([])
    setSelectedCategory(null)
  }

  const handleViewFAQ = () => {
    setCurrentView('faq')
  }

  const handleViewContact = () => {
    setCurrentView('contact')
  }

  const getRoleDisplayName = (role) => {
    const roleNames = {
      professor: '教授',
      student: '学生',
      secretary: '秘书',
      leader: '领导'
    }
    return roleNames[role] || role
  }

  const renderHomeView = () => (
    <div className="help-home">
      <div className="help-header">
        <h1>帮助中心</h1>
        <p>欢迎使用科研管理平台帮助中心，您当前以 <strong>{getRoleDisplayName(user?.role)}</strong> 身份登录</p>
      </div>

      <HelpSearch 
        onSearch={handleSearch}
        placeholder="搜索帮助文档、功能说明、常见问题..."
      />

      <div className="help-quick-actions">
        <button 
          className="quick-action-btn primary"
          onClick={handleViewFAQ}
        >
          <span className="action-icon">❓</span>
          <span className="action-label">常见问题</span>
          <span className="action-desc">快速解答常见疑问</span>
        </button>
        
        <button 
          className="quick-action-btn"
          onClick={handleViewContact}
        >
          <span className="action-icon">💬</span>
          <span className="action-label">联系支持</span>
          <span className="action-desc">获取专业技术支持</span>
        </button>
        
        <button 
          className="quick-action-btn"
          onClick={() => handleCategorySelect(helpCategories.find(c => c.id === 'getting-started'))}
        >
          <span className="action-icon">🚀</span>
          <span className="action-label">新手指南</span>
          <span className="action-desc">快速了解系统使用</span>
        </button>
      </div>

      <div className="help-categories">
        <h2>帮助分类</h2>
        <div className="categories-grid">
          {helpCategories.map(category => {
            const articles = getArticlesByCategory(category.id, user?.role)
            return (
              <div 
                key={category.id} 
                className="category-card"
                onClick={() => handleCategorySelect(category)}
              >
                <div className="category-icon">{category.icon}</div>
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span className="category-count">{articles.length} 篇文章</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="help-recent">
        <h2>最近更新</h2>
        <div className="recent-articles">
          {getArticlesByCategory('updates', user?.role).slice(0, 3).map(article => (
            <div 
              key={article.id} 
              className="recent-article"
              onClick={() => handleArticleSelect(article)}
            >
              <div className="article-meta">
                <span className="article-date">{article.lastUpdated}</span>
                <span className="article-category">系统更新</span>
              </div>
              <h4>{article.title}</h4>
              <p>了解最新功能和改进...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSearchView = () => (
    <div className="help-search-view">
      <div className="search-header">
        <button className="back-btn" onClick={handleBackToHome}>
          ← 返回首页
        </button>
        <HelpSearch 
          onSearch={handleSearch}
          initialValue={selectedCategory ? '' : searchQuery}
          placeholder="搜索帮助文档..."
        />
      </div>

      <div className="search-results">
        {selectedCategory && (
          <div className="category-header">
            <span className="category-icon">{selectedCategory.icon}</span>
            <h2>{selectedCategory.name}</h2>
            <p>{selectedCategory.description}</p>
          </div>
        )}

        <div className="results-info">
          <h3>
            {selectedCategory 
              ? `${selectedCategory.name} - ${searchResults.length} 篇文章`
              : `搜索结果 - 找到 ${searchResults.length} 篇相关文章`
            }
          </h3>
        </div>

        <div className="results-list">
          {searchResults.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h4>未找到相关内容</h4>
              <p>尝试使用不同的关键词或浏览分类目录</p>
              <button onClick={handleBackToHome} className="btn-secondary">
                浏览全部分类
              </button>
            </div>
          ) : (
            searchResults.map(article => (
              <div 
                key={article.id} 
                className="result-item"
                onClick={() => handleArticleSelect(article)}
              >
                <div className="result-header">
                  <h4>{article.title}</h4>
                  <div className="result-meta">
                    <span className="result-category">
                      {helpCategories.find(c => c.id === article.category)?.name}
                    </span>
                    <span className="result-date">{article.lastUpdated}</span>
                  </div>
                </div>
                <div className="result-tags">
                  {article.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )

  const renderArticleView = () => (
    <div className="help-article-view">
      <div className="article-header">
        <button className="back-btn" onClick={handleBackToHome}>
          ← 返回首页
        </button>
        <button 
          className="back-btn secondary" 
          onClick={() => setCurrentView('search')}
          style={{ marginLeft: '8px' }}
        >
          ← 返回搜索
        </button>
      </div>
      <HelpArticle article={selectedArticle} />
    </div>
  )

  const renderFAQView = () => (
    <div className="help-faq-view">
      <div className="faq-header">
        <button className="back-btn" onClick={handleBackToHome}>
          ← 返回首页
        </button>
        <h2>常见问题</h2>
      </div>
      <HelpFAQ faqData={getFAQByRole(user?.role)} />
    </div>
  )

  const renderContactView = () => (
    <div className="help-contact-view">
      <div className="contact-header">
        <button className="back-btn" onClick={handleBackToHome}>
          ← 返回首页
        </button>
        <h2>联系支持</h2>
      </div>
      <ContactSupport />
    </div>
  )

  const renderContent = () => {
    switch (currentView) {
      case 'search':
        return renderSearchView()
      case 'article':
        return renderArticleView()
      case 'faq':
        return renderFAQView()
      case 'contact':
        return renderContactView()
      default:
        return renderHomeView()
    }
  }

  return (
    <Layout>
      <div className="help-center">
        {renderContent()}
      </div>
    </Layout>
  )
}

export default HelpCenter