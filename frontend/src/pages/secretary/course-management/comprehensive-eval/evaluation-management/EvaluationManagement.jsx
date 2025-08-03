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
        courseName: '高级计算机科学',
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
          { type: 'warning', message: '15名学生材料缺失', category: 'submission' },
          { type: 'info', message: '阶段截止日期还有3天', category: 'timeline' },
          { type: 'error', message: '2名专家需要更换', category: 'expert' }
        ],
        timeline: [
          { date: '2025-01-01', event: '评估期开始', status: 'completed' },
          { date: '2025-01-15', event: '收集阶段开放', status: 'completed' },
          { date: '2025-02-01', event: '收集截止日期', status: 'upcoming' },
          { date: '2025-02-15', event: '专家评估截止日期', status: 'future' }
        ]
      })
      setLoading(false)
    }, 1000)
  }

  const handlePhaseTransition = () => {
    Modal.confirm({
      title: '确认阶段转换',
      content: '您确定要进入下一阶段吗？此操作无法撤销。',
      onOk: () => {
        message.success('阶段转换已启动')
        setShowPhaseModal(false)
      }
    })
  }

  const renderOverviewTab = () => (
    <div className="evaluation-overview">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card className="phase-progress-card">
            <h3>评估进度</h3>
            <div className="phase-timeline">
              {Object.entries(evaluationData?.phases || {}).map(([phase, data], index) => (
                <div key={phase} className={`phase-item ${data.status}`}>
                  <div className="phase-icon">
                    {data.status === 'completed' ? <CheckCircleOutlined /> : 
                     data.status === 'in-progress' ? <SyncOutlined spin /> : 
                     <ClockCircleOutlined />}
                  </div>
                  <div className="phase-name">{phase === 'collection' ? '收集' : phase === 'verification' ? '验证' : phase === 'evaluation' ? '评估' : phase === 'review' ? '审核' : '定稿'}</div>
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
              管理阶段转换
            </Button>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="学生总数"
              value={evaluationData?.statistics.totalStudents}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="已收到提交"
              value={evaluationData?.statistics.submissionsReceived}
              suffix={`/ ${evaluationData?.statistics.totalStudents}`}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="已分配专家"
              value={evaluationData?.statistics.expertsAssigned}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="平均进度"
              value={evaluationData?.statistics.averageProgress}
              suffix="%"
              prefix={<DashboardOutlined />}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Card title="系统警报" extra={<Badge count={evaluationData?.alerts.length} />}>
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
                    查看详情
                  </Button>
                }
              />
            ))}
          </Card>
        </Col>

        <Col span={24}>
          <Card title="评估时间线" extra={<CalendarOutlined />}>
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
            title="阶段管理" 
            extra={
              <Space>
                <Button icon={<SyncOutlined />}>刷新状态</Button>
                <Button type="primary" icon={<ControlOutlined />}>高级控制</Button>
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
                  <h4>{phase === 'collection' ? '收集阶段' : phase === 'verification' ? '验证阶段' : phase === 'evaluation' ? '评估阶段' : phase === 'review' ? '审核阶段' : '定稿阶段'}</h4>
                  <Tag color={
                    data.status === 'completed' ? 'green' : 
                    data.status === 'in-progress' ? 'blue' : 'default'
                  }>
                    {data.status.toUpperCase()}
                  </Tag>
                  <Progress percent={data.progress} />
                  <div className="phase-actions">
                    <Button size="small">查看详情</Button>
                    {data.status === 'in-progress' && (
                      <Button size="small" type="primary">管理</Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="快速操作">
            <Space wrap size="large">
              <Button icon={<SendOutlined />}>发送提醒</Button>
              <Button icon={<ExportOutlined />}>导出进度报告</Button>
              <Button icon={<BellOutlined />}>配置通知</Button>
              <Button icon={<AuditOutlined />}>审计记录</Button>
              <Button icon={<FileProtectOutlined />}>归档数据</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )

  const expertColumns = [
    {
      title: '专家姓名',
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
      title: '操作',
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
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '提交状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'complete' ? 'green' : 
                     status === 'partial' ? 'orange' : 'red'
        return <Tag color={color}>{status.toUpperCase()}</Tag>
      }
    },
    {
      title: '材料',
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
      title: '最后更新',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button size="small">审核</Button>
          <Button size="small">发送提醒</Button>
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
        { type: '报告', submitted: true },
        { type: '代码', submitted: true },
        { type: '视频', submitted: true }
      ],
      lastUpdated: '2025-01-28 14:30'
    },
    {
      key: '2',
      studentId: 'S002',
      name: 'Bob Smith',
      status: 'partial',
      materials: [
        { type: '报告', submitted: true },
        { type: '代码', submitted: true },
        { type: '视频', submitted: false }
      ],
      lastUpdated: '2025-01-27 10:15'
    }
  ]

  const renderCollectionMonitoringTab = () => (
    <div className="collection-monitoring">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="提交跟踪">
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Select 
                  placeholder="按状态筛选"
                  style={{ width: 200 }}
                  allowClear
                >
                  <Select.Option value="complete">完整</Select.Option>
                  <Select.Option value="partial">部分</Select.Option>
                  <Select.Option value="missing">缺失</Select.Option>
                </Select>
                <Input.Search 
                  placeholder="搜索学生..."
                  style={{ width: 300 }}
                />
                <Button type="primary" icon={<ExportOutlined />}>
                  导出报告
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
          <Card title="收集统计">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="完整提交"
                    value={45}
                    suffix="/ 120"
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="部分提交"
                    value={33}
                    valueStyle={{ color: '#faad14' }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="缺失提交"
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
            <h2>综合评估管理</h2>
            <p>课程：{evaluationData?.courseName}</p>
          </Col>
          <Col>
            <Space>
              <Button 
                icon={<SettingOutlined />}
                onClick={() => navigate(`/secretary/courses/comprehensive-eval/${courseId}/scheme-configuration/basic-settings`)}
              >
                方案配置
              </Button>
              <Button type="primary" icon={<DashboardOutlined />}>
                完整仪表板
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