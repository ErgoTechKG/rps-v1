import { useAuth } from '../contexts/AuthContext'
import './Unauthorized.css'

const Unauthorized = () => {
  const { logout } = useAuth()

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1 className="unauthorized-title">访问被拒绝</h1>
        <p className="unauthorized-message">
          抱歉，您没有权限访问此页面。请联系管理员或使用正确的账户登录。
        </p>
        <div className="unauthorized-actions">
          <button onClick={logout} className="back-button">
            返回登录
          </button>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized