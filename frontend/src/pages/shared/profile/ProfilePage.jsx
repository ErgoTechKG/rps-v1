import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { useNotifications } from '../../../contexts/NotificationContext'
import Layout from '../../../components/Layout'
import './ProfilePage.css'

const ProfilePage = () => {
  const { user, updateUser } = useAuth()
  const { addNotification } = useNotifications()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('personal')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    // Role-specific fields
    // Professor
    academicTitle: '',
    department: '',
    researchInterests: '',
    officeLocation: '',
    officeHours: '',
    bio: '',
    publicationLinks: '',
    // Student
    studentId: '',
    major: '',
    yearOfStudy: '',
    academicAdvisor: '',
    emergencyContact: '',
    academicInterests: '',
    // Secretary
    administrativeRole: '',
    contactInfo: '',
    accessLevel: '',
    backupContact: '',
    // Leader
    leadershipPosition: '',
    responsibilityAreas: '',
    delegationSettings: '',
    strategicFocus: ''
  })

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [preferences, setPreferences] = useState({
    language: 'zh-CN',
    timezone: 'Asia/Shanghai',
    dateFormat: 'YYYY-MM-DD',
    notificationSound: true,
    autoLogoutTime: 30
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
    allowMessages: true
  })

  const [profilePhoto, setProfilePhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)

  useEffect(() => {
    if (user) {
      setPersonalInfo({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        academicTitle: user.academicTitle || '',
        department: user.department || '',
        researchInterests: user.researchInterests || '',
        officeLocation: user.officeLocation || '',
        officeHours: user.officeHours || '',
        bio: user.bio || '',
        publicationLinks: user.publicationLinks || '',
        studentId: user.studentId || '',
        major: user.major || '',
        yearOfStudy: user.yearOfStudy || '',
        academicAdvisor: user.academicAdvisor || '',
        emergencyContact: user.emergencyContact || '',
        academicInterests: user.academicInterests || '',
        administrativeRole: user.administrativeRole || '',
        contactInfo: user.contactInfo || '',
        accessLevel: user.accessLevel || '',
        backupContact: user.backupContact || '',
        leadershipPosition: user.leadershipPosition || '',
        responsibilityAreas: user.responsibilityAreas || '',
        delegationSettings: user.delegationSettings || '',
        strategicFocus: user.strategicFocus || ''
      })
      setPhotoPreview(user.profilePhoto || null)
    }
  }, [user])

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSecurityChange = (field, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePreferencesChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePrivacyChange = (field, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validatePassword = () => {
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      addNotification('error', '新密码与确认密码不匹配')
      return false
    }
    if (securitySettings.newPassword && securitySettings.newPassword.length < 8) {
      addNotification('error', '密码长度至少需要8个字符')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Handle different tab submissions
      switch (activeTab) {
        case 'personal':
          await updateUser({ ...personalInfo, profilePhoto: photoPreview })
          break
        case 'security':
          if (securitySettings.newPassword) {
            if (!validatePassword()) {
              setLoading(false)
              return
            }
            // TODO: Implement password change API
          }
          break
        case 'preferences':
          await updateUser({ preferences })
          break
        case 'privacy':
          await updateUser({ privacySettings })
          break
      }
      
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      addNotification('success', '设置已保存')
    } catch (error) {
      console.error('Failed to save settings:', error)
      addNotification('error', '保存失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const renderPersonalInfoFields = () => {
    const commonFields = (
      <>
        <div className="form-row">
          <div className="form-group">
            <label>姓名</label>
            <input
              type="text"
              value={personalInfo.name}
              onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>邮箱</label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        <div className="form-group">
          <label>联系电话</label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
            className="form-input"
          />
        </div>
      </>
    )

    const roleSpecificFields = {
      professor: (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>学术头衔</label>
              <input
                type="text"
                value={personalInfo.academicTitle}
                onChange={(e) => handlePersonalInfoChange('academicTitle', e.target.value)}
                className="form-input"
                placeholder="教授 / 副教授 / 讲师"
              />
            </div>
            <div className="form-group">
              <label>所属部门</label>
              <input
                type="text"
                value={personalInfo.department}
                onChange={(e) => handlePersonalInfoChange('department', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label>研究方向</label>
            <textarea
              value={personalInfo.researchInterests}
              onChange={(e) => handlePersonalInfoChange('researchInterests', e.target.value)}
              className="form-textarea"
              rows="3"
              placeholder="请输入您的研究方向，多个方向请用逗号分隔"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>办公地点</label>
              <input
                type="text"
                value={personalInfo.officeLocation}
                onChange={(e) => handlePersonalInfoChange('officeLocation', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>办公时间</label>
              <input
                type="text"
                value={personalInfo.officeHours}
                onChange={(e) => handlePersonalInfoChange('officeHours', e.target.value)}
                className="form-input"
                placeholder="例：周一至周五 14:00-17:00"
              />
            </div>
          </div>
          <div className="form-group">
            <label>个人简介</label>
            <textarea
              value={personalInfo.bio}
              onChange={(e) => handlePersonalInfoChange('bio', e.target.value)}
              className="form-textarea"
              rows="4"
            />
          </div>
          <div className="form-group">
            <label>发表论文链接</label>
            <textarea
              value={personalInfo.publicationLinks}
              onChange={(e) => handlePersonalInfoChange('publicationLinks', e.target.value)}
              className="form-textarea"
              rows="2"
              placeholder="请输入您的学术论文链接，多个链接请换行"
            />
          </div>
        </>
      ),
      student: (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>学号</label>
              <input
                type="text"
                value={personalInfo.studentId}
                onChange={(e) => handlePersonalInfoChange('studentId', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>专业</label>
              <input
                type="text"
                value={personalInfo.major}
                onChange={(e) => handlePersonalInfoChange('major', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>年级</label>
              <select
                value={personalInfo.yearOfStudy}
                onChange={(e) => handlePersonalInfoChange('yearOfStudy', e.target.value)}
                className="form-select"
              >
                <option value="">请选择</option>
                <option value="1">大一</option>
                <option value="2">大二</option>
                <option value="3">大三</option>
                <option value="4">大四</option>
                <option value="研一">研一</option>
                <option value="研二">研二</option>
                <option value="研三">研三</option>
                <option value="博士">博士</option>
              </select>
            </div>
            <div className="form-group">
              <label>指导教师</label>
              <input
                type="text"
                value={personalInfo.academicAdvisor}
                onChange={(e) => handlePersonalInfoChange('academicAdvisor', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label>紧急联系人</label>
            <input
              type="text"
              value={personalInfo.emergencyContact}
              onChange={(e) => handlePersonalInfoChange('emergencyContact', e.target.value)}
              className="form-input"
              placeholder="姓名及电话"
            />
          </div>
          <div className="form-group">
            <label>学术兴趣</label>
            <textarea
              value={personalInfo.academicInterests}
              onChange={(e) => handlePersonalInfoChange('academicInterests', e.target.value)}
              className="form-textarea"
              rows="3"
              placeholder="请描述您的学术兴趣和目标"
            />
          </div>
        </>
      ),
      secretary: (
        <>
          <div className="form-group">
            <label>行政职务</label>
            <input
              type="text"
              value={personalInfo.administrativeRole}
              onChange={(e) => handlePersonalInfoChange('administrativeRole', e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>工作联系方式</label>
            <textarea
              value={personalInfo.contactInfo}
              onChange={(e) => handlePersonalInfoChange('contactInfo', e.target.value)}
              className="form-textarea"
              rows="2"
              placeholder="办公电话、内线等"
            />
          </div>
          <div className="form-group">
            <label>权限级别</label>
            <input
              type="text"
              value={personalInfo.accessLevel}
              onChange={(e) => handlePersonalInfoChange('accessLevel', e.target.value)}
              className="form-input"
              readOnly
              disabled
            />
          </div>
          <div className="form-group">
            <label>备份联系人</label>
            <input
              type="text"
              value={personalInfo.backupContact}
              onChange={(e) => handlePersonalInfoChange('backupContact', e.target.value)}
              className="form-input"
              placeholder="当您不在时的替代联系人"
            />
          </div>
        </>
      ),
      leader: (
        <>
          <div className="form-group">
            <label>领导职务</label>
            <input
              type="text"
              value={personalInfo.leadershipPosition}
              onChange={(e) => handlePersonalInfoChange('leadershipPosition', e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>负责领域</label>
            <textarea
              value={personalInfo.responsibilityAreas}
              onChange={(e) => handlePersonalInfoChange('responsibilityAreas', e.target.value)}
              className="form-textarea"
              rows="3"
              placeholder="请描述您负责的部门或领域"
            />
          </div>
          <div className="form-group">
            <label>授权代理设置</label>
            <textarea
              value={personalInfo.delegationSettings}
              onChange={(e) => handlePersonalInfoChange('delegationSettings', e.target.value)}
              className="form-textarea"
              rows="2"
              placeholder="设置授权代理人及权限范围"
            />
          </div>
          <div className="form-group">
            <label>战略重点</label>
            <textarea
              value={personalInfo.strategicFocus}
              onChange={(e) => handlePersonalInfoChange('strategicFocus', e.target.value)}
              className="form-textarea"
              rows="3"
              placeholder="当前的战略重点和目标"
            />
          </div>
        </>
      )
    }

    return (
      <>
        {commonFields}
        {roleSpecificFields[user?.role] || null}
      </>
    )
  }

  const tabs = [
    { id: 'personal', label: '个人信息', icon: '👤' },
    { id: 'security', label: '账户安全', icon: '🔐' },
    { id: 'preferences', label: '偏好设置', icon: '⚙️' },
    { id: 'privacy', label: '隐私设置', icon: '🔒' },
    { id: 'activity', label: '登录记录', icon: '📊' },
    { id: '2fa', label: '双重认证', icon: '🛡️' }
  ]

  return (
    <Layout>
      <div className="profile-page">
        <div className="profile-header">
          <button 
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← 返回
          </button>
          <h1>个人设置</h1>
        </div>

        <div className="profile-container">
          <div className="profile-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            {activeTab === 'personal' && (
              <div className="tab-content">
                <h2>个人信息</h2>
                
                <div className="profile-photo-section">
                  <div className="photo-preview">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Profile" />
                    ) : (
                      <div className="photo-placeholder">
                        <span>📷</span>
                      </div>
                    )}
                  </div>
                  <div className="photo-actions">
                    <label className="photo-upload-btn">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        hidden
                      />
                      上传头像
                    </label>
                    <p className="photo-hint">支持 JPG、PNG 格式，大小不超过 5MB</p>
                  </div>
                </div>

                {renderPersonalInfoFields()}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="tab-content">
                <h2>账户安全</h2>
                
                <div className="form-group">
                  <label>当前密码</label>
                  <input
                    type="password"
                    value={securitySettings.currentPassword}
                    onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                    className="form-input"
                    placeholder="请输入当前密码"
                  />
                </div>
                
                <div className="form-group">
                  <label>新密码</label>
                  <input
                    type="password"
                    value={securitySettings.newPassword}
                    onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                    className="form-input"
                    placeholder="至少8个字符"
                  />
                </div>
                
                <div className="form-group">
                  <label>确认新密码</label>
                  <input
                    type="password"
                    value={securitySettings.confirmPassword}
                    onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                    className="form-input"
                    placeholder="请再次输入新密码"
                  />
                </div>

                <div className="password-requirements">
                  <h4>密码要求：</h4>
                  <ul>
                    <li>至少包含 8 个字符</li>
                    <li>包含大小写字母</li>
                    <li>包含数字</li>
                    <li>包含特殊字符（可选）</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="tab-content">
                <h2>偏好设置</h2>
                
                <div className="form-group">
                  <label>语言</label>
                  <select
                    value={preferences.language}
                    onChange={(e) => handlePreferencesChange('language', e.target.value)}
                    className="form-select"
                  >
                    <option value="zh-CN">简体中文</option>
                    <option value="zh-TW">繁体中文</option>
                    <option value="en-US">English</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>时区</label>
                  <select
                    value={preferences.timezone}
                    onChange={(e) => handlePreferencesChange('timezone', e.target.value)}
                    className="form-select"
                  >
                    <option value="Asia/Shanghai">中国标准时间 (UTC+8)</option>
                    <option value="Asia/Hong_Kong">香港时间 (UTC+8)</option>
                    <option value="Asia/Tokyo">日本标准时间 (UTC+9)</option>
                    <option value="America/New_York">美国东部时间 (UTC-5)</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>日期格式</label>
                  <select
                    value={preferences.dateFormat}
                    onChange={(e) => handlePreferencesChange('dateFormat', e.target.value)}
                    className="form-select"
                  >
                    <option value="YYYY-MM-DD">2024-01-01</option>
                    <option value="DD/MM/YYYY">01/01/2024</option>
                    <option value="MM/DD/YYYY">01/01/2024</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={preferences.notificationSound}
                      onChange={(e) => handlePreferencesChange('notificationSound', e.target.checked)}
                    />
                    启用通知声音
                  </label>
                </div>
                
                <div className="form-group">
                  <label>自动登出时间（分钟）</label>
                  <input
                    type="number"
                    value={preferences.autoLogoutTime}
                    onChange={(e) => handlePreferencesChange('autoLogoutTime', parseInt(e.target.value))}
                    className="form-input"
                    min="5"
                    max="1440"
                  />
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="tab-content">
                <h2>隐私设置</h2>
                
                <div className="form-group">
                  <label>个人资料可见性</label>
                  <select
                    value={privacySettings.profileVisibility}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    className="form-select"
                  >
                    <option value="public">公开</option>
                    <option value="colleagues">仅同事可见</option>
                    <option value="private">仅自己可见</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={privacySettings.showEmail}
                      onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
                    />
                    显示邮箱地址
                  </label>
                </div>
                
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={privacySettings.showPhone}
                      onChange={(e) => handlePrivacyChange('showPhone', e.target.checked)}
                    />
                    显示电话号码
                  </label>
                </div>
                
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={privacySettings.allowMessages}
                      onChange={(e) => handlePrivacyChange('allowMessages', e.target.checked)}
                    />
                    允许接收私信
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="tab-content">
                <h2>登录记录</h2>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-info">
                      <span className="activity-time">2024-01-15 14:30:25</span>
                      <span className="activity-device">Chrome - Windows</span>
                      <span className="activity-ip">192.168.1.100</span>
                    </div>
                    <span className="activity-status success">成功</span>
                  </div>
                  <div className="activity-item">
                    <div className="activity-info">
                      <span className="activity-time">2024-01-15 09:15:10</span>
                      <span className="activity-device">Safari - iPhone</span>
                      <span className="activity-ip">192.168.1.50</span>
                    </div>
                    <span className="activity-status success">成功</span>
                  </div>
                  <div className="activity-item">
                    <div className="activity-info">
                      <span className="activity-time">2024-01-14 20:45:30</span>
                      <span className="activity-device">Firefox - Mac</span>
                      <span className="activity-ip">192.168.1.75</span>
                    </div>
                    <span className="activity-status failed">失败</span>
                  </div>
                </div>
                <div className="export-section">
                  <button type="button" className="btn-secondary">
                    导出登录记录
                  </button>
                </div>
              </div>
            )}

            {activeTab === '2fa' && (
              <div className="tab-content">
                <h2>双重认证</h2>
                <div className="two-factor-section">
                  <div className="two-factor-status">
                    <span className="status-icon">🔓</span>
                    <h3>双重认证未启用</h3>
                    <p>启用双重认证可以为您的账户提供额外的安全保护</p>
                  </div>
                  <button type="button" className="btn-primary">
                    启用双重认证
                  </button>
                  <div className="two-factor-methods">
                    <h4>支持的验证方式：</h4>
                    <ul>
                      <li>身份验证器应用（推荐）</li>
                      <li>短信验证码</li>
                      <li>备用恢复码</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate(-1)}
              >
                取消
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading || ['activity', '2fa'].includes(activeTab)}
              >
                {loading ? '保存中...' : '保存设置'}
              </button>
            </div>

            {saved && (
              <div className="save-notification">
                ✓ 设置已保存
              </div>
            )}
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default ProfilePage