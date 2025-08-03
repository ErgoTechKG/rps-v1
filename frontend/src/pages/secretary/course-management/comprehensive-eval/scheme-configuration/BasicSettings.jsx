import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Space,
  Switch,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Divider,
  Alert,
  message,
  Tooltip,
  Tag
} from 'antd'
import {
  SaveOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  CalendarOutlined,
  TeamOutlined,
  FileTextOutlined
} from '@ant-design/icons'
import './SchemeConfiguration.css'

const { Option } = Select
const { TextArea } = Input
const { RangePicker } = DatePicker

const BasicSettings = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [schemeData, setSchemeData] = useState(null)

  useEffect(() => {
    fetchSchemeData()
  }, [courseId])

  const fetchSchemeData = async () => {
    setLoading(true)
    setTimeout(() => {
      const data = {
        courseName: '高级计算机科学',
        evaluationType: 'comprehensive',
        evaluationPeriod: ['2025-01-01', '2025-03-31'],
        description: '研究生综合评估',
        status: 'active',
        allowLateSubmission: true,
        lateSubmissionDays: 3,
        requireVideoPresentation: true,
        requirePeerReview: false,
        anonymousEvaluation: true,
        minimumExperts: 3,
        maximumExperts: 5,
        autoAssignExperts: true,
        notificationSettings: {
          studentReminders: true,
          expertReminders: true,
          reminderDays: [7, 3, 1]
        }
      }
      setSchemeData(data)
      form.setFieldsValue(data)
      setLoading(false)
    }, 1000)
  }

  const handleSubmit = async (values) => {
    setSaving(true)
    setTimeout(() => {
      message.success('基本设置保存成功')
      setSaving(false)
    }, 1000)
  }

  return (
    <div className="scheme-configuration">
      <Card className="page-header">
        <Row align="middle" justify="space-between">
          <Col>
            <h2>方案配置 - 基本设置</h2>
            <p>配置基本评估参数</p>
          </Col>
          <Col>
            <Space>
              <Button onClick={() => navigate(`/secretary/courses/comprehensive-eval/${courseId}/evaluation-management`)}>
                返回管理
              </Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />}
                onClick={() => form.submit()}
                loading={saving}
              >
                保存设置
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card loading={loading}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark="optional"
            >
              <Row gutter={[16, 0]}>
                <Col span={24}>
                  <Divider orientation="left">
                    <Space>
                      <FileTextOutlined />
                      General Information
                    </Space>
                  </Divider>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="courseName"
                    label="Course Name"
                    rules={[{ required: true, message: 'Please enter course name' }]}
                  >
                    <Input placeholder="Enter course name" disabled />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="evaluationType"
                    label="Evaluation Type"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select evaluation type">
                      <Option value="comprehensive">Comprehensive Evaluation</Option>
                      <Option value="midterm">Midterm Evaluation</Option>
                      <Option value="final">Final Evaluation</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="evaluationPeriod"
                    label="Evaluation Period"
                    rules={[{ required: true, message: 'Please select evaluation period' }]}
                  >
                    <RangePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="status"
                    label="Status"
                  >
                    <Select>
                      <Option value="draft">
                        <Tag color="default">Draft</Tag>
                      </Option>
                      <Option value="active">
                        <Tag color="blue">Active</Tag>
                      </Option>
                      <Option value="closed">
                        <Tag color="red">Closed</Tag>
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Description"
                  >
                    <TextArea 
                      rows={3} 
                      placeholder="Enter evaluation description and objectives"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Divider orientation="left">
                    <Space>
                      <SettingOutlined />
                      Submission Settings
                    </Space>
                  </Divider>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    name="allowLateSubmission"
                    label="Allow Late Submission"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    name="lateSubmissionDays"
                    label={
                      <Space>
                        Late Submission Days
                        <Tooltip title="Number of days after deadline to accept late submissions">
                          <InfoCircleOutlined />
                        </Tooltip>
                      </Space>
                    }
                  >
                    <InputNumber 
                      min={0} 
                      max={7} 
                      style={{ width: '100%' }}
                      disabled={!form.getFieldValue('allowLateSubmission')}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    name="requireVideoPresentation"
                    label="Require Video Presentation"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Divider orientation="left">
                    <Space>
                      <TeamOutlined />
                      Expert Settings
                    </Space>
                  </Divider>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    name="minimumExperts"
                    label="Minimum Experts per Student"
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={1} max={10} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    name="maximumExperts"
                    label="Maximum Experts per Student"
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={1} max={10} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    name="autoAssignExperts"
                    label="Auto-assign Experts"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="anonymousEvaluation"
                    label={
                      <Space>
                        Anonymous Evaluation
                        <Tooltip title="Hide student names from experts during evaluation">
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
                    name="requirePeerReview"
                    label="Require Peer Review"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Divider orientation="left">
                    <Space>
                      <CalendarOutlined />
                      Notification Settings
                    </Space>
                  </Divider>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    name={['notificationSettings', 'studentReminders']}
                    label="Student Reminders"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    name={['notificationSettings', 'expertReminders']}
                    label="Expert Reminders"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    name={['notificationSettings', 'reminderDays']}
                    label="Reminder Days Before Deadline"
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select days"
                      disabled={
                        !form.getFieldValue(['notificationSettings', 'studentReminders']) &&
                        !form.getFieldValue(['notificationSettings', 'expertReminders'])
                      }
                    >
                      <Option value={1}>1 day</Option>
                      <Option value={3}>3 days</Option>
                      <Option value={7}>7 days</Option>
                      <Option value={14}>14 days</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Divider />

              <Alert
                message="Configuration Notes"
                description={
                  <ul style={{ marginBottom: 0, paddingLeft: 20 }}>
                    <li>Changes to basic settings will affect all participants in the evaluation</li>
                    <li>Expert assignment settings can be overridden manually if needed</li>
                    <li>Notification settings will apply to future reminders only</li>
                  </ul>
                }
                type="info"
                showIcon
              />
            </Form>
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <h3>Additional Configuration</h3>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Button 
                  block 
                  icon={<CalendarOutlined />}
                  onClick={() => navigate(`/secretary/courses/comprehensive-eval/${courseId}/scheme-configuration/timeline-setup`)}
                >
                  Timeline Setup
                </Button>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Button 
                  block 
                  icon={<FileTextOutlined />}
                  onClick={() => navigate(`/secretary/courses/comprehensive-eval/${courseId}/scheme-configuration/criteria-management`)}
                >
                  Criteria Management
                </Button>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Button 
                  block 
                  icon={<SettingOutlined />}
                  onClick={() => navigate(`/secretary/courses/comprehensive-eval/${courseId}/scheme-configuration/weight-configuration`)}
                >
                  Weight Configuration
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default BasicSettings