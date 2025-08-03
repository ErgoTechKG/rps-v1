import { useState, useEffect } from 'react'
import './HelpSearch.css'

const HelpSearch = ({ onSearch, initialValue = '', placeholder = '搜索帮助文档...', showSuggestions = true }) => {
  const [query, setQuery] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)

  // Common search suggestions
  const searchSuggestions = [
    '如何登录系统',
    '忘记密码',
    '创建课程',
    '申请课程', 
    '通知设置',
    '日历使用',
    '生成报告',
    '系统问题',
    '浏览器兼容',
    '联系支持'
  ]

  useEffect(() => {
    setQuery(initialValue)
  }, [initialValue])

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    
    // Trigger search with debounce
    if (onSearch) {
      clearTimeout(window.helpSearchTimeout)
      window.helpSearchTimeout = setTimeout(() => {
        onSearch(value)
      }, 300)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch && query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    setIsFocused(false)
    if (onSearch) {
      onSearch(suggestion)
    }
  }

  const handleClear = () => {
    setQuery('')
    if (onSearch) {
      onSearch('')
    }
  }

  const filteredSuggestions = showSuggestions 
    ? searchSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase()) && 
        suggestion.toLowerCase() !== query.toLowerCase()
      ).slice(0, 5)
    : []

  return (
    <div className="help-search">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder={placeholder}
              value={query}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
            {query && (
              <button 
                type="button" 
                className="clear-btn"
                onClick={handleClear}
              >
                ✕
              </button>
            )}
          </div>
          <button type="submit" className="search-btn">
            搜索
          </button>
        </div>

        {isFocused && query && filteredSuggestions.length > 0 && (
          <div className="search-suggestions">
            <div className="suggestions-header">
              <span>搜索建议</span>
            </div>
            <ul className="suggestions-list">
              {filteredSuggestions.map((suggestion, index) => (
                <li 
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="suggestion-icon">💡</span>
                  <span className="suggestion-text">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isFocused && !query && showSuggestions && (
          <div className="search-suggestions">
            <div className="suggestions-header">
              <span>热门搜索</span>
            </div>
            <ul className="suggestions-list">
              {searchSuggestions.slice(0, 6).map((suggestion, index) => (
                <li 
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="suggestion-icon">🔥</span>
                  <span className="suggestion-text">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  )
}

export default HelpSearch