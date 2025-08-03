import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const getDashboardRoute = (role) => {
    switch (role) {
      case 'professor':
        return '/professor/dashboard'
      case 'student':
        return '/student/dashboard'
      case 'secretary':
        return '/secretary/dashboard'
      case 'leader':
        return '/leader/dashboard'
      default:
        return '/login'
    }
  }

  return <Navigate to={getDashboardRoute(user.role)} replace />
}

export default Dashboard