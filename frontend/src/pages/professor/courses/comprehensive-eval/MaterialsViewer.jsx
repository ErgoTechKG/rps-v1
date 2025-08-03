import { useState } from 'react'
import './MaterialsViewer.css'

function MaterialsViewer({ materials, studentData, onMaterialUpdate }) {
  const [selectedMaterial, setSelectedMaterial] = useState(null)
  const [filterCategory, setFilterCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('list')
  const [annotations, setAnnotations] = useState({})

  const categories = [
    { value: 'all', label: 'All Materials' },
    { value: 'academic', label: 'Academic Records' },
    { value: 'research', label: 'Research Work' },
    { value: 'achievements', label: 'Achievements' }
  ]

  const filteredMaterials = materials.filter(material => {
    const matchesCategory = filterCategory === 'all' || material.type === filterCategory
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.filename.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material)
    // Mark as reviewed when opened
    if (material.status === 'pending') {
      const updatedMaterials = materials.map(m => 
        m.id === material.id ? { ...m, status: 'reviewed' } : m
      )
      onMaterialUpdate(updatedMaterials)
    }
  }

  const handleAddAnnotation = (materialId, annotation) => {
    setAnnotations(prev => ({
      ...prev,
      [materialId]: [...(prev[materialId] || []), annotation]
    }))
  }

  const getMaterialIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase()
    switch (ext) {
      case 'pdf': return '📄'
      case 'doc':
      case 'docx': return '📝'
      case 'ppt':
      case 'pptx': return '📊'
      case 'xls':
      case 'xlsx': return '📈'
      default: return '📎'
    }
  }

  const formatFileSize = (sizeStr) => {
    return sizeStr
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="materials-viewer">
      <div className="materials-header">
        <h2>Student Materials Review</h2>
        <div className="materials-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-controls">
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="category-filter"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="view-controls">
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              📋 List
            </button>
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ⚏ Grid
            </button>
          </div>
        </div>
      </div>

      <div className="materials-layout">
        <div className="materials-list">
          <div className="list-header">
            <h3>Materials ({filteredMaterials.length})</h3>
            <div className="status-summary">
              <span className="status-count reviewed">
                ✅ {materials.filter(m => m.status === 'reviewed').length} Reviewed
              </span>
              <span className="status-count pending">
                ⏳ {materials.filter(m => m.status === 'pending').length} Pending
              </span>
            </div>
          </div>

          <div className={`materials-container ${viewMode}`}>
            {filteredMaterials.map(material => (
              <div 
                key={material.id}
                className={`material-item ${selectedMaterial?.id === material.id ? 'selected' : ''} ${material.status}`}
                onClick={() => handleMaterialSelect(material)}
              >
                <div className="material-icon">
                  {getMaterialIcon(material.filename)}
                </div>
                
                <div className="material-info">
                  <h4 className="material-title">{material.title}</h4>
                  <p className="material-filename">{material.filename}</p>
                  <div className="material-meta">
                    <span className="category">{material.category}</span>
                    <span className="upload-date">
                      Uploaded: {formatDate(material.uploadDate)}
                    </span>
                    <span className="file-size">{formatFileSize(material.size)}</span>
                  </div>
                </div>

                <div className="material-status">
                  <span className={`status-badge ${material.status}`}>
                    {material.status === 'reviewed' ? '✅' : '⏳'}
                    {material.status}
                  </span>
                  {annotations[material.id] && (
                    <span className="annotation-count">
                      📝 {annotations[material.id].length}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredMaterials.length === 0 && (
            <div className="empty-state">
              <p>No materials found matching your criteria.</p>
            </div>
          )}
        </div>

        <div className="material-viewer">
          {selectedMaterial ? (
            <div className="viewer-content">
              <div className="viewer-header">
                <h3>{selectedMaterial.title}</h3>
                <div className="viewer-actions">
                  <button className="action-btn">🔍 Zoom In</button>
                  <button className="action-btn">🔎 Zoom Out</button>
                  <button className="action-btn">📱 Fit to Width</button>
                  <button className="action-btn">💾 Download</button>
                  <button className="action-btn">🔗 Original</button>
                </div>
              </div>

              <div className="document-preview">
                <div className="preview-placeholder">
                  <div className="preview-icon">
                    {getMaterialIcon(selectedMaterial.filename)}
                  </div>
                  <h4>{selectedMaterial.filename}</h4>
                  <p>Document preview would appear here</p>
                  <div className="preview-info">
                    <div className="info-item">
                      <span className="label">Type:</span>
                      <span className="value">{selectedMaterial.category}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Size:</span>
                      <span className="value">{selectedMaterial.size}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Uploaded:</span>
                      <span className="value">{formatDate(selectedMaterial.uploadDate)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="annotation-panel">
                <h4>Annotations & Notes</h4>
                <div className="annotation-input">
                  <textarea 
                    placeholder="Add your notes about this material..."
                    className="annotation-textarea"
                  />
                  <button 
                    className="add-annotation-btn"
                    onClick={() => {
                      const textarea = document.querySelector('.annotation-textarea')
                      if (textarea.value.trim()) {
                        handleAddAnnotation(selectedMaterial.id, {
                          id: Date.now(),
                          text: textarea.value,
                          timestamp: new Date().toISOString()
                        })
                        textarea.value = ''
                      }
                    }}
                  >
                    Add Note
                  </button>
                </div>

                <div className="annotations-list">
                  {annotations[selectedMaterial.id]?.map(annotation => (
                    <div key={annotation.id} className="annotation-item">
                      <div className="annotation-text">{annotation.text}</div>
                      <div className="annotation-timestamp">
                        {formatDate(annotation.timestamp)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="viewer-placeholder">
              <div className="placeholder-content">
                <h3>📄 Material Viewer</h3>
                <p>Select a material from the list to preview and review it.</p>
                <div className="viewer-tips">
                  <h4>Review Guidelines:</h4>
                  <ul>
                    <li>Examine each document thoroughly</li>
                    <li>Add notes and annotations as needed</li>
                    <li>Check for completeness and authenticity</li>
                    <li>Consider relevance to evaluation criteria</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="materials-summary">
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">Total Materials:</span>
            <span className="stat-value">{materials.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Reviewed:</span>
            <span className="stat-value">{materials.filter(m => m.status === 'reviewed').length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Pending Review:</span>
            <span className="stat-value">{materials.filter(m => m.status === 'pending').length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Annotations:</span>
            <span className="stat-value">
              {Object.values(annotations).reduce((total, arr) => total + arr.length, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaterialsViewer