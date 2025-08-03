import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Card,
  Form,
  DatePicker,
  Button,
  Space,
  Switch,
  Row,
  Col,
  Alert,
  message,
  Timeline,
  Tag,
  Tooltip,
  InputNumber,
  Select
} from 'antd'
import {
  SaveOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  WarningOutlined,
  InfoCircleOutlined
} from '@ant-design/icons'
import './SchemeConfiguration.css'

const { RangePicker } = DatePicker
const { Option } = Select

const TimelineSetup = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [timelineData, setTimelineData] = useState(null)

  useEffect(() => {
    fetchTimelineData()
  }, [courseId])

  const fetchTimelineData = async () => {
    setLoading(true)
    setTimeout(() => {
      const data = {
        phases: [
          {
            name: 'Collection',
            dateRange: ['2025-01-15', '2025-02-01'],
            duration: 17,
            autoTransition: true,
            allowExtension: true,
            maxExtensionDays: 7,
            notifications: {
              enabled: true,
              reminderDays: [7, 3, 1]
            }
          },
          {
            name: 'Verification',
            dateRange: ['2025-02-02', '2025-02-08'],
            duration: 7,
            autoTransition: false,
            allowExtension: false,
            maxExtensionDays: 0,
            notifications: {
              enabled: true,
              reminderDays: [3, 1]
            }
          },
          {
            name: 'Evaluation',
            dateRange: ['2025-02-09', '2025-02-20'],
            duration: 12,
            autoTransition: false,
            allowExtension: true,
            maxExtensionDays: 5,
            notifications: {
              enabled: true,
              reminderDays: [5, 3, 1]
            }
          },
          {
            name: 'Review',
            dateRange: ['2025-02-21', '2025-02-25'],
            duration: 5,
            autoTransition: true,
            allowExtension: false,
            maxExtensionDays: 0,
            notifications: {
              enabled: true,
              reminderDays: [2, 1]
            }
          },
          {
            name: 'Finalization',
            dateRange: ['2025-02-26', '2025-03-01'],
            duration: 4,
            autoTransition: false,
            allowExtension: false,
            maxExtensionDays: 0,
            notifications: {
              enabled: false,
              reminderDays: []
            }
          }
        ]
      }
      setTimelineData(data)
      form.setFieldsValue(data)
      setLoading(false)
    }, 1000)
  }

  const handleSubmit = async (values) => {
    setSaving(true)
    setTimeout(() => {
      message.success('Timeline settings saved successfully')
      setSaving(false)
    }, 1000)
  }

  const renderPhaseCard = (phase, index) => (
    <Card key={index} className="timeline-phase-card">
      <div className="phase-header">
        <h4>{phase.name} Phase</h4>
        <Tag color={index === 0 ? 'blue' : 'default'}>
          {phase.duration} days
        </Tag>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item
            name={['phases', index, 'dateRange']}
            label="Date Range"
            rules={[{ required: true, message: 'Please select date range' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name={['phases', index, 'autoTransition']}
            label={
              <Space>
                Auto Transition
                <Tooltip title="Automatically move to next phase when this phase ends">
                  <InfoCircleOutlined />
                </Tooltip>
              </Space>
            }
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name={['phases', index, 'allowExtension']}
            label="Allow Extension"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>

        {form.getFieldValue(['phases', index, 'allowExtension']) && (
          <Col xs={24} md={12}>
            <Form.Item
              name={['phases', index, 'maxExtensionDays']}
              label="Max Extension Days"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} max={30} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        )}

        <Col span={24}>
          <Form.Item
            name={['phases', index, 'notifications', 'enabled']}
            label="Enable Notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>

        {form.getFieldValue(['phases', index, 'notifications', 'enabled']) && (
          <Col span={24}>
            <Form.Item
              name={['phases', index, 'notifications', 'reminderDays']}
              label="Send Reminders (days before deadline)"
            >
              <Select mode="multiple" placeholder="Select reminder days">
                <Option value={1}>1 day</Option>
                <Option value={2}>2 days</Option>
                <Option value={3}>3 days</Option>
                <Option value={5}>5 days</Option>
                <Option value={7}>7 days</Option>
                <Option value={14}>14 days</Option>
              </Select>
            </Form.Item>
          </Col>
        )}
      </Row>
    </Card>
  )

  const renderTimelineVisualization = () => {
    if (!timelineData) return null

    return (
      <Card title="Timeline Visualization" className="timeline-visualization">
        <Timeline mode="left">
          <Timeline.Item
            dot={<CalendarOutlined style={{ fontSize: '16px' }} />}
            color="green"
          >
            <strong>Evaluation Start</strong>
            <br />
            {timelineData.phases[0]?.dateRange[0]}
          </Timeline.Item>

          {timelineData.phases.map((phase, index) => (
            <Timeline.Item
              key={index}
              dot={
                index === 0 ? <SyncOutlined spin style={{ fontSize: '16px' }} /> :
                index === timelineData.phases.length - 1 ? <CheckCircleOutlined style={{ fontSize: '16px' }} /> :
                <ClockCircleOutlined style={{ fontSize: '16px' }} />
              }
              color={index === 0 ? 'blue' : 'gray'}
            >
              <strong>{phase.name} Phase</strong>
              <br />
              {phase.dateRange[0]} to {phase.dateRange[1]}
              <br />
              <Space>
                <Tag>{phase.duration} days</Tag>
                {phase.autoTransition && <Tag color="blue">Auto-transition</Tag>}
                {phase.allowExtension && <Tag color="orange">Extendable</Tag>}
              </Space>
            </Timeline.Item>
          ))}

          <Timeline.Item
            dot={<CheckCircleOutlined style={{ fontSize: '16px' }} />}
            color="green"
          >
            <strong>Evaluation Complete</strong>
            <br />
            {timelineData.phases[timelineData.phases.length - 1]?.dateRange[1]}
          </Timeline.Item>
        </Timeline>
      </Card>
    )
  }

  return (
    <div className="scheme-configuration timeline-setup">
      <Card className="page-header">
        <Row align="middle" justify="space-between">
          <Col>
            <h2>Scheme Configuration - Timeline Setup</h2>
            <p>Configure evaluation phase timelines and transitions</p>
          </Col>
          <Col>
            <Space>
              <Button onClick={() => navigate(`/secretary/courses/comprehensive-eval/${courseId}/scheme-configuration/basic-settings`)}>
                Back to Basic Settings
              </Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />}
                onClick={() => form.submit()}
                loading={saving}
              >
                Save Timeline
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark="optional"
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {loading ? (
                <Card loading />
              ) : (
                timelineData?.phases.map((phase, index) => renderPhaseCard(phase, index))
              )}
            </Space>
          </Col>

          <Col xs={24} lg={8}>
            {renderTimelineVisualization()}

            <Card style={{ marginTop: 24 }}>
              <Alert
                message="Timeline Guidelines"
                description={
                  <ul style={{ marginBottom: 0, paddingLeft: 20 }}>
                    <li>Ensure phases don't overlap</li>
                    <li>Allow sufficient time for each phase</li>
                    <li>Consider holidays and weekends</li>
                    <li>Set reminders appropriately</li>
                  </ul>
                }
                type="info"
                showIcon
                icon={<InfoCircleOutlined />}
              />
            </Card>

            <Card style={{ marginTop: 16 }}>
              <h4>Timeline Summary</h4>
              <p><strong>Total Duration:</strong> 45 days</p>
              <p><strong>Start Date:</strong> 2025-01-15</p>
              <p><strong>End Date:</strong> 2025-03-01</p>
              <Alert
                message="No conflicts detected"
                type="success"
                showIcon
                style={{ marginTop: 16 }}
              />
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default TimelineSetup