import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Card,
  Row,
  Col,
  Button,
  Progress,
  Tabs,
  Badge,
  Space,
  Tag,
  Alert,
  Statistic,
  Table,
  Select,
  DatePicker,
  Input,
  Modal,
  message,
  Timeline,
  Divider,
  Tooltip,
  Dropdown,
  Menu
} from 'antd'
import {
  ControlOutlined,
  TeamOutlined,
  FileSearchOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  SettingOutlined,
  ExportOutlined,
  BellOutlined,
  DashboardOutlined,
  FileProtectOutlined,
  AuditOutlined,
  SendOutlined
} from '@ant-design/icons'
import './EvaluationManagement.css'

const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { TextArea } = Input

const EvaluationManagement = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [evaluationData, setEvaluationData] = useState(null)
  const [selectedPhase, setSelectedPhase] = useState('collection')
  const [showPhaseModal, setShowPhaseModal] = useState(false)
  const [showAssignmentModal, setShowAssignmentModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  useEffect(() => {
    fetchEvaluationData()
  }, [courseId])

  const fetchEvaluationData = async () => {
    setLoading(true)
    setTimeout(() => {
      setEvaluationData({
        courseName: 'Advanced Computer Science',
        currentPhase: 'collection',
        phases: {
          collection: { status: 'in-progress', progress: 65 },
          verification: { status: 'pending', progress: 0 },
          evaluation: { status: 'pending', progress: 0 },
          review: { status: 'pending', progress: 0 },
          finalization: { status: 'pending', progress: 0 }
        },
        statistics: {
          totalStudents: 120,
          submissionsReceived: 78,
          expertsAssigned: 24,
          evaluationsComplete: 0,
          averageProgress: 16
        },
        alerts: [
          { type: 'warning', message: '15 students have missing materials', category: 'submission' },
          { type: 'info', message: 'Phase deadline in 3 days', category: 'timeline' },
          { type: 'error', message: '2 experts need replacement', category: 'expert' }
        ],
        timeline: [
          { date: '2025-01-01', event: 'Evaluation period started', status: 'completed' },
          { date: '2025-01-15', event: 'Collection phase opened', status: 'completed' },
          { date: '2025-02-01', event: 'Collection deadline', status: 'upcoming' },
          { date: '2025-02-15', event: 'Expert evaluation deadline', status: 'future' }
        ]
      })
      setLoading(false)
    }, 1000)
  }

  const handlePhaseTransition = () => {
    Modal.confirm({
      title: 'Confirm Phase Transition',
      content: 'Are you sure you want to advance to the next phase? This action cannot be undone.',
      onOk: () => {
        message.success('Phase transition initiated')
        setShowPhaseModal(false)
      }
    })
  }

  const renderOverviewTab = () => (
    <div className="evaluation-overview">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card className="phase-progress-card">
            <h3>Evaluation Progress</h3>
            <div className="phase-timeline">
              {Object.entries(evaluationData?.phases || {}).map(([phase, data], index) => (
                <div key={phase} className={`phase-item ${data.status}`}>
                  <div className="phase-icon">
                    {data.status === 'completed' ? <CheckCircleOutlined /> : 
                     data.status === 'in-progress' ? <SyncOutlined spin /> : 
                     <ClockCircleOutlined />}
                  </div>
                  <div className="phase-name">{phase.charAt(0).toUpperCase() + phase.slice(1)}</div>
                  <Progress 
                    percent={data.progress} 
                    size="small" 
                    status={data.status === 'in-progress' ? 'active' : 'normal'}
                  />
                </div>
              ))}
            </div>
            <Button 
              type="primary" 
              icon={<ControlOutlined />}
              onClick={() => setShowPhaseModal(true)}
              style={{ marginTop: 16 }}
            >
              Manage Phase Transition
            </Button>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Students"
              value={evaluationData?.statistics.totalStudents}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Submissions Received"
              value={evaluationData?.statistics.submissionsReceived}
              suffix={`/ ${evaluationData?.statistics.totalStudents}`}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Experts Assigned"
              value={evaluationData?.statistics.expertsAssigned}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Average Progress"
              value={evaluationData?.statistics.averageProgress}
              suffix="%"
              prefix={<DashboardOutlined />}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Card title="System Alerts" extra={<Badge count={evaluationData?.alerts.length} />}>
            {evaluationData?.alerts.map((alert, index) => (
              <Alert
                key={index}
                message={alert.message}
                type={alert.type}
                showIcon
                closable
                style={{ marginBottom: 8 }}
                action={
                  <Button size="small" type="link">
                    View Details
                  </Button>
                }
              />
            ))}
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Evaluation Timeline" extra={<CalendarOutlined />}>
            <Timeline mode="left">
              {evaluationData?.timeline.map((item, index) => (
                <Timeline.Item 
                  key={index}
                  color={item.status === 'completed' ? 'green' : 
                         item.status === 'upcoming' ? 'blue' : 'gray'}
                  label={item.date}
                >
                  {item.event}
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  )

  const renderProcessControlTab = () => (
    <div className="process-control">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            title="Phase Management" 
            extra={
              <Space>
                <Button icon={<SyncOutlined />}>Refresh Status</Button>
                <Button type="primary" icon={<ControlOutlined />}>Advanced Controls</Button>
              </Space>
            }
          >
            <div className="phase-control-grid">
              {Object.entries(evaluationData?.phases || {}).map(([phase, data]) => (
                <Card 
                  key={phase} 
                  className={`phase-control-card ${data.status}`}
                  hoverable
                >
                  <h4>{phase.charAt(0).toUpperCase() + phase.slice(1)} Phase</h4>
                  <Tag color={
                    data.status === 'completed' ? 'green' : 
                    data.status === 'in-progress' ? 'blue' : 'default'
                  }>
                    {data.status.toUpperCase()}
                  </Tag>
                  <Progress percent={data.progress} />
                  <div className="phase-actions">
                    <Button size="small">View Details</Button>
                    {data.status === 'in-progress' && (
                      <Button size="small" type="primary">Manage</Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Quick Actions">
            <Space wrap size="large">
              <Button icon={<SendOutlined />}>Send Reminders</Button>
              <Button icon={<ExportOutlined />}>Export Progress Report</Button>
              <Button icon={<BellOutlined />}>Configure Notifications</Button>
              <Button icon={<AuditOutlined />}>Audit Trail</Button>
              <Button icon={<FileProtectOutlined />}>Archive Data</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )

  const expertColumns = [
    {
      title: 'Expert Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department'
    },
    {
      title: 'Assigned Students',
      dataIndex: 'assignedCount',
      key: 'assignedCount',
      render: (count) => <Badge count={count} showZero />
    },
    {
      title: 'Completed',
      dataIndex: 'completedCount',
      key: 'completedCount',
      render: (count, record) => (
        <Progress 
          percent={Math.round((count / record.assignedCount) * 100)} 
          size="small" 
          format={() => `${count}/${record.assignedCount}`}
        />
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => setShowAssignmentModal(true)}>
            Manage Assignments
          </Button>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1">View Details</Menu.Item>
                <Menu.Item key="2">Send Message</Menu.Item>
                <Menu.Item key="3">Replace Expert</Menu.Item>
              </Menu>
            }
          >
            <Button size="small">More</Button>
          </Dropdown>
        </Space>
      )
    }
  ]

  const expertData = [
    {
      key: '1',
      name: 'Dr. John Smith',
      department: 'Computer Science',
      assignedCount: 5,
      completedCount: 2,
      status: 'active'
    },
    {
      key: '2',
      name: 'Dr. Jane Doe',
      department: 'Software Engineering',
      assignedCount: 6,
      completedCount: 0,
      status: 'active'
    },
    {
      key: '3',
      name: 'Prof. Robert Johnson',
      department: 'AI Research',
      assignedCount: 4,
      completedCount: 1,
      status: 'inactive'
    }
  ]

  const renderExpertCoordinationTab = () => (
    <div className="expert-coordination">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            title="Expert Panel Management"
            extra={
              <Space>
                <Button icon={<UserOutlined />}>Add Expert</Button>
                <Button icon={<TeamOutlined />}>Bulk Assignment</Button>
              </Space>
            }
          >
            <Table
              columns={expertColumns}
              dataSource={expertData}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Workload Distribution">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <h4>Assignment Statistics</h4>
                <Progress
                  type="dashboard"
                  percent={75}
                  format={() => '75%\nAssigned'}
                />
              </Col>
              <Col span={12}>
                <h4>Completion Rate</h4>
                <Progress
                  type="dashboard"
                  percent={25}
                  format={() => '25%\nComplete'}
                  strokeColor="#52c41a"
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )

  const submissionColumns = [
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Submission Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'complete' ? 'green' : 
                     status === 'partial' ? 'orange' : 'red'
        return <Tag color={color}>{status.toUpperCase()}</Tag>
      }
    },
    {
      title: 'Materials',
      dataIndex: 'materials',
      key: 'materials',
      render: (materials) => (
        <Space>
          {materials.map((mat, index) => (
            <Tag key={index} color={mat.submitted ? 'green' : 'default'}>
              {mat.type}
            </Tag>
          ))}
        </Space>
      )
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button size="small">Review</Button>
          <Button size="small">Send Reminder</Button>
        </Space>
      )
    }
  ]

  const submissionData = [
    {
      key: '1',
      studentId: 'S001',
      name: 'Alice Johnson',
      status: 'complete',
      materials: [
        { type: 'Report', submitted: true },
        { type: 'Code', submitted: true },
        { type: 'Video', submitted: true }
      ],
      lastUpdated: '2025-01-28 14:30'
    },
    {
      key: '2',
      studentId: 'S002',
      name: 'Bob Smith',
      status: 'partial',
      materials: [
        { type: 'Report', submitted: true },
        { type: 'Code', submitted: true },
        { type: 'Video', submitted: false }
      ],
      lastUpdated: '2025-01-27 10:15'
    }
  ]

  const renderCollectionMonitoringTab = () => (
    <div className="collection-monitoring">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Submission Tracking">
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Select 
                  placeholder="Filter by status"
                  style={{ width: 200 }}
                  allowClear
                >
                  <Select.Option value="complete">Complete</Select.Option>
                  <Select.Option value="partial">Partial</Select.Option>
                  <Select.Option value="missing">Missing</Select.Option>
                </Select>
                <Input.Search 
                  placeholder="Search students..."
                  style={{ width: 300 }}
                />
                <Button type="primary" icon={<ExportOutlined />}>
                  Export Report
                </Button>
              </Space>
            </div>
            <Table
              columns={submissionColumns}
              dataSource={submissionData}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Collection Statistics">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Complete Submissions"
                    value={45}
                    suffix="/ 120"
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Partial Submissions"
                    value={33}
                    valueStyle={{ color: '#faad14' }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Missing Submissions"
                    value={42}
                    valueStyle={{ color: '#cf1322' }}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )

  return (
    <div className="evaluation-management">
      <Card className="page-header">
        <Row align="middle" justify="space-between">
          <Col>
            <h2>Comprehensive Evaluation Management</h2>
            <p>Course: {evaluationData?.courseName}</p>
          </Col>
          <Col>
            <Space>
              <Button 
                icon={<SettingOutlined />}
                onClick={() => navigate(`/secretary/courses/comprehensive-eval/${courseId}/scheme-configuration/basic-settings`)}
              >
                Scheme Configuration
              </Button>
              <Button type="primary" icon={<DashboardOutlined />}>
                Full Dashboard
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card loading={loading}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Overview" key="overview">
            {renderOverviewTab()}
          </TabPane>
          <TabPane tab="Process Control" key="process">
            {renderProcessControlTab()}
          </TabPane>
          <TabPane tab="Expert Coordination" key="experts">
            {renderExpertCoordinationTab()}
          </TabPane>
          <TabPane tab="Collection Monitoring" key="collection">
            {renderCollectionMonitoringTab()}
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title="Phase Transition Management"
        visible={showPhaseModal}
        onCancel={() => setShowPhaseModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowPhaseModal(false)}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" onClick={handlePhaseTransition}>
            Confirm Transition
          </Button>
        ]}
      >
        <Alert
          message="Phase Transition Warning"
          description="Advancing to the next phase will lock current phase data and notify all participants."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <div>
          <p><strong>Current Phase:</strong> Collection (65% complete)</p>
          <p><strong>Next Phase:</strong> Verification</p>
          <p><strong>Pending Items:</strong></p>
          <ul>
            <li>42 students with missing submissions</li>
            <li>15 students with partial submissions</li>
            <li>2 unresolved expert issues</li>
          </ul>
        </div>
      </Modal>

      <Modal
        title="Expert Assignment Management"
        visible={showAssignmentModal}
        onCancel={() => setShowAssignmentModal(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setShowAssignmentModal(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary">
            Save Assignments
          </Button>
        ]}
      >
        <p>Manage student assignments for the selected expert</p>
      </Modal>
    </div>
  )
}

export default EvaluationManagement