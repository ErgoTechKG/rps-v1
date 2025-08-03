import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../../../contexts/AuthContext'
import { useNotification } from '../../../../../contexts/NotificationContext'
import './TaskAssignment.css'

const TaskAssignment = () => {
  const { courseId } = useParams()
  const { user } = useAuth()
  const { addNotification } = useNotification()
  const [students, setStudents] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState('')
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    deadline: '',
    type: 'research'
  })

  // Mock data for demonstration
  useEffect(() => {
    const loadData = () => {
      setStudents([
        { id: '1', name: '张三', email: 'zhangsan@university.edu' },
        { id: '2', name: '李四', email: 'lisi@university.edu' },
        { id: '3', name: '王五', email: 'wangwu@university.edu' }
      ])
      
      setTasks([
        {
          id: '1',
          title: 'Literature Review on ML Applications',
          description: 'Review recent papers on machine learning applications in healthcare',
          studentId: '1',
          studentName: '张三',
          priority: 'high',
          deadline: '2025-08-15',
          status: 'in_progress',
          createdAt: '2025-08-01',
          type: 'research'
        },
        {
          id: '2',
          title: 'Data Collection Protocol Design',
          description: 'Design a protocol for collecting patient data for the study',
          studentId: '2',
          studentName: '李四',
          priority: 'medium',
          deadline: '2025-08-20',
          status: 'pending',
          createdAt: '2025-08-02',
          type: 'methodology'
        }
      ])
      setLoading(false)
    }
    
    setTimeout(loadData, 500)
  }, [courseId])

  const handleTaskSubmit = () => {
    if (!taskForm.title || !taskForm.deadline || !selectedStudent) {
      addNotification('Please fill in all required fields', 'error')
      return
    }

    const selectedStudentData = students.find(s => s.id === selectedStudent)
    const newTask = {
      id: Date.now().toString(),
      ...taskForm,
      studentId: selectedStudent,
      studentName: selectedStudentData.name,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    }

    setTasks([...tasks, newTask])
    addNotification('Task assigned successfully', 'success')
    setShowTaskForm(false)
    setTaskForm({
      title: '',
      description: '',
      priority: 'medium',
      deadline: '',
      type: 'research'
    })
    setSelectedStudent('')
  }

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
    addNotification(`Task status updated to ${newStatus}`, 'success')
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
    addNotification('Task deleted successfully', 'success')
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e74c3c'
      case 'medium': return '#f39c12'
      case 'low': return '#27ae60'
      default: return '#7f8c8d'
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: '#7f8c8d', label: 'Pending' },
      in_progress: { color: '#3498db', label: 'In Progress' },
      completed: { color: '#27ae60', label: 'Completed' },
      overdue: { color: '#e74c3c', label: 'Overdue' }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span style={{
        padding: '4px 12px',
        borderRadius: '12px',
        backgroundColor: config.color + '20',
        color: config.color,
        fontSize: '12px',
        fontWeight: '500'
      }}>
        {config.label}
      </span>
    )
  }

  if (loading) {
    return <div className="component-container">Loading task management...</div>
  }

  return (
    <div className="component-container">
      <div className="component-header">
        <h2>Task Assignment & Management</h2>
        <button 
          className="primary-button"
          onClick={() => setShowTaskForm(true)}
        >
          Assign New Task
        </button>
      </div>

      {/* Task Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{tasks.length}</h3>
          <p>Total Tasks</p>
        </div>
        <div className="stat-card">
          <h3>{tasks.filter(t => t.status === 'in_progress').length}</h3>
          <p>In Progress</p>
        </div>
        <div className="stat-card">
          <h3>{tasks.filter(t => t.status === 'completed').length}</h3>
          <p>Completed</p>
        </div>
        <div className="stat-card">
          <h3>{tasks.filter(t => new Date(t.deadline) < new Date() && t.status !== 'completed').length}</h3>
          <p>Overdue</p>
        </div>
      </div>

      {/* Task List */}
      <div className="list-container">
        <h3>Active Tasks</h3>
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks assigned yet.</p>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map(task => (
              <div key={task.id} className="task-card">
                <div className="task-header">
                  <h4>{task.title}</h4>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: getPriorityColor(task.priority)
                    }}></span>
                    {getStatusBadge(task.status)}
                  </div>
                </div>
                
                <p className="task-description">{task.description}</p>
                
                <div className="task-meta">
                  <span>Assigned to: <strong>{task.studentName}</strong></span>
                  <span>Due: <strong>{new Date(task.deadline).toLocaleDateString()}</strong></span>
                  <span>Type: <strong>{task.type}</strong></span>
                </div>

                <div className="task-actions">
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button 
                    className="action-button"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Task Assignment Form Modal */}
      {showTaskForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Assign New Task</h3>
            
            <div className="form-group">
              <label>Select Student *</label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="form-select"
              >
                <option value="">Select a student...</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Task Title *</label>
              <input
                type="text"
                value={taskForm.title}
                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                placeholder="Enter task title"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={taskForm.description}
                onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                placeholder="Enter task description"
                className="form-textarea"
                rows={4}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Priority</label>
                <select
                  value={taskForm.priority}
                  onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                  className="form-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="form-group">
                <label>Task Type</label>
                <select
                  value={taskForm.type}
                  onChange={(e) => setTaskForm({ ...taskForm, type: e.target.value })}
                  className="form-select"
                >
                  <option value="research">Research</option>
                  <option value="methodology">Methodology</option>
                  <option value="experiment">Experiment</option>
                  <option value="analysis">Analysis</option>
                  <option value="writing">Writing</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Deadline *</label>
              <input
                type="date"
                value={taskForm.deadline}
                onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })}
                className="form-input"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="modal-actions">
              <button 
                className="secondary-button"
                onClick={() => {
                  setShowTaskForm(false)
                  setTaskForm({
                    title: '',
                    description: '',
                    priority: 'medium',
                    deadline: '',
                    type: 'research'
                  })
                  setSelectedStudent('')
                }}
              >
                Cancel
              </button>
              <button 
                className="primary-button"
                onClick={handleTaskSubmit}
              >
                Assign Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskAssignment