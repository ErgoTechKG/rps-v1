import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import './Confirmation.css'

const Confirmation = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [acceptedStudents, setAcceptedStudents] = useState([])
  const [emailTemplate, setEmailTemplate] = useState({
    acceptance: `尊敬的{studentName}同学：

恭喜您！经过认真评审，您已被录取参加我的研究课题"{topicTitle}"。

您的申请给我留下了深刻印象，特别是您在{strongPoint}方面的表现。我相信您将为这个项目做出重要贡献。

请在收到此邮件后3个工作日内确认是否接受录取。如有任何问题，请随时与我联系。

期待与您合作！

祝好，
{professorName}`,
    rejection: `尊敬的{studentName}同学：

感谢您申请我的研究课题"{topicTitle}"。

经过认真考虑，很遗憾地通知您，由于名额有限和竞争激烈，我们无法录取您参加本次课题。这并不代表您的能力不足，而是我们必须在众多优秀申请者中做出艰难的选择。

希望您继续努力，相信您会找到更适合的研究机会。

祝学业进步！

祝好，
{professorName}`,
    waitlist: `尊敬的{studentName}同学：

感谢您申请我的研究课题"{topicTitle}"。

您的申请表现优秀，但由于名额限制，我们暂时将您列入候补名单。如果有学生放弃录取机会，我们将按照候补顺序与您联系。

请保持联系方式畅通，我们将在两周内给您最终答复。

感谢您的理解！

祝好，
{professorName}`
  })
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (location.state?.acceptedStudents) {
      setAcceptedStudents(location.state.acceptedStudents)
    } else {
      // Load from localStorage if navigating back
      const storedSelection = localStorage.getItem(`final_selection_${courseId}`)
      if (storedSelection) {
        setAcceptedStudents(JSON.parse(storedSelection))
      }
    }
  }, [courseId, location.state])

  const handleSendNotifications = async () => {
    setSending(true)
    
    // Save final selection
    localStorage.setItem(`final_selection_${courseId}`, JSON.stringify(acceptedStudents))
    
    // Simulate sending emails
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update notification system
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]')
    
    acceptedStudents.forEach(student => {
      notifications.push({
        id: Date.now() + Math.random(),
        userId: student.studentId,
        title: '录取通知',
        message: `恭喜！您已被录取参加"${student.topicTitle}"课题`,
        type: 'success',
        timestamp: new Date().toISOString(),
        read: false
      })
    })
    
    localStorage.setItem('notifications', JSON.stringify(notifications))
    
    setSending(false)
    alert('通知已发送！')
    navigate(`/professor/courses/lab-rotation/${courseId}/topic-management`)
  }

  const handleEditTemplate = (type) => {
    const newTemplate = prompt('编辑邮件模板：', emailTemplate[type])
    if (newTemplate) {
      setEmailTemplate({
        ...emailTemplate,
        [type]: newTemplate
      })
    }
  }

  const getPreview = (template, student) => {
    return template
      .replace('{studentName}', student.studentName)
      .replace('{topicTitle}', student.topicTitle)
      .replace('{strongPoint}', '技术基础和研究热情')
      .replace('{professorName}', '张教授')
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-header">
        <h2>确认录取通知</h2>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate(`/professor/courses/lab-rotation/${courseId}/student-selection/selection`)}
        >
          返回选择页面
        </button>
      </div>

      <div className="summary-section">
        <h3>录取名单汇总</h3>
        <div className="summary-stats">
          <div className="stat">
            <span className="stat-label">录取总人数：</span>
            <span className="stat-value">{acceptedStudents.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">涉及课题数：</span>
            <span className="stat-value">{new Set(acceptedStudents.map(s => s.topicId)).size}</span>
          </div>
        </div>

        <div className="accepted-list">
          {acceptedStudents.map((student, index) => (
            <div key={student.id} className="accepted-student">
              <span className="student-number">{index + 1}</span>
              <div className="student-details">
                <strong>{student.studentName}</strong>
                <span>{student.studentMajor} | GPA: {student.gpa}</span>
              </div>
              <div className="topic-details">
                <small>课题：{student.topicTitle}</small>
              </div>
              <div className="matching-info">
                <span className="matching-score">匹配度: {student.matchingScore}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="template-section">
        <h3>邮件通知模板</h3>
        <div className="template-tabs">
          <button className="tab-btn active">录取通知</button>
          <button className="tab-btn" onClick={() => handleEditTemplate('rejection')}>
            拒绝通知
          </button>
          <button className="tab-btn" onClick={() => handleEditTemplate('waitlist')}>
            候补通知
          </button>
        </div>

        <div className="template-preview">
          <h4>预览（以第一位学生为例）</h4>
          {acceptedStudents.length > 0 && (
            <pre>{getPreview(emailTemplate.acceptance, acceptedStudents[0])}</pre>
          )}
          <button 
            className="btn btn-secondary"
            onClick={() => handleEditTemplate('acceptance')}
          >
            编辑模板
          </button>
        </div>
      </div>

      <div className="action-section">
        <div className="action-notes">
          <h4>发送前请确认：</h4>
          <ul>
            <li>所有录取学生信息正确无误</li>
            <li>邮件模板内容适当</li>
            <li>系统将同时发送录取、拒绝和候补通知</li>
            <li>通知发送后将无法撤回</li>
          </ul>
        </div>

        <div className="action-buttons">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate(`/professor/courses/lab-rotation/${courseId}/student-selection/selection`)}
          >
            返回修改
          </button>
          <button 
            className={`btn btn-primary btn-large ${sending ? 'loading' : ''}`}
            onClick={handleSendNotifications}
            disabled={sending || acceptedStudents.length === 0}
          >
            {sending ? '发送中...' : '发送所有通知'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirmation