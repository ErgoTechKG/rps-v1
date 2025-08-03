import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  message,
  Popconfirm,
  Tag,
  Row,
  Col,
  Alert,
  Tooltip,
  Switch,
  Divider
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  FileTextOutlined,
  UnorderedListOutlined,
  InfoCircleOutlined,
  CopyOutlined,
  EyeOutlined
} from '@ant-design/icons'
import './SchemeConfiguration.css'

const { TextArea } = Input
const { Option } = Select

const CriteriaManagement = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [criteria, setCriteria] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [editingCriterion, setEditingCriterion] = useState(null)
  const [form] = Form.useForm()
  const [expandedRowKeys, setExpandedRowKeys] = useState([])

  useEffect(() => {
    fetchCriteria()
  }, [courseId])

  const fetchCriteria = async () => {
    setLoading(true)
    setTimeout(() => {
      setCriteria([
        {
          key: '1',
          name: 'Academic Performance',
          description: 'Evaluation of academic achievements and coursework',
          type: 'quantitative',
          required: true,
          maxScore: 100,
          subCriteria: [
            {
              key: '1-1',
              name: 'Course Grades',
              description: 'Overall course performance',
              maxScore: 40
            },
            {
              key: '1-2',
              name: 'Research Output',
              description: 'Quality and quantity of research work',
              maxScore: 60
            }
          ]
        },
        {
          key: '2',
          name: 'Technical Skills',
          description: 'Assessment of technical competencies',
          type: 'quantitative',
          required: true,
          maxScore: 100,
          subCriteria: [
            {
              key: '2-1',
              name: 'Programming Proficiency',
              description: 'Coding skills and problem-solving ability',
              maxScore: 50
            },
            {
              key: '2-2',
              name: 'System Design',
              description: 'Architecture and design capabilities',
              maxScore: 50
            }
          ]
        },
        {
          key: '3',
          name: 'Communication',
          description: 'Presentation and communication skills',
          type: 'qualitative',
          required: false,
          maxScore: 100,
          subCriteria: []
        }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleAdd = () => {
    form.resetFields()
    setEditingCriterion(null)
    setModalVisible(true)
  }

  const handleEdit = (record) => {
    setEditingCriterion(record)
    form.setFieldsValue(record)
    setModalVisible(true)
  }

  const handleDelete = (key) => {
    setCriteria(criteria.filter(item => item.key !== key))
    message.success('Criterion deleted successfully')
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingCriterion) {
        setCriteria(criteria.map(item => 
          item.key === editingCriterion.key ? { ...item, ...values } : item
        ))
        message.success('Criterion updated successfully')
      } else {
        const newCriterion = {
          key: Date.now().toString(),
          ...values,
          subCriteria: []
        }
        setCriteria([...criteria, newCriterion])
        message.success('Criterion added successfully')
      }
      setModalVisible(false)
      form.resetFields()
    })
  }

  const handleAddSubCriterion = (parentKey) => {
    Modal.confirm({
      title: 'Add Sub-criterion',
      content: (
        <Form layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item label="Name" required>
            <Input id="subName" placeholder="Enter sub-criterion name" />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea id="subDescription" rows={2} placeholder="Enter description" />
          </Form.Item>
          <Form.Item label="Max Score" required>
            <InputNumber id="subMaxScore" min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      ),
      onOk: () => {
        const name = document.getElementById('subName').value
        const description = document.getElementById('subDescription').value
        const maxScore = parseInt(document.getElementById('subMaxScore').value)

        if (!name || !maxScore) {
          message.error('Please fill in required fields')
          return
        }

        setCriteria(criteria.map(item => {
          if (item.key === parentKey) {
            return {
              ...item,
              subCriteria: [
                ...item.subCriteria,
                {
                  key: `${parentKey}-${item.subCriteria.length + 1}`,
                  name,
                  description,
                  maxScore
                }
              ]
            }
          }
          return item
        }))
        message.success('Sub-criterion added successfully')
      }
    })
  }

  const columns = [
    {
      title: 'Criterion Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <FileTextOutlined />
          <strong>{text}</strong>
          {record.required && <Tag color="red">Required</Tag>}
        </Space>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'quantitative' ? 'blue' : 'green'}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Tag>
      )
    },
    {
      title: 'Max Score',
      dataIndex: 'maxScore',
      key: 'maxScore',
      render: (score, record) => (
        <Space>
          {score}
          {record.subCriteria?.length > 0 && (
            <Tooltip title={`${record.subCriteria.length} sub-criteria`}>
              <UnorderedListOutlined />
            </Tooltip>
          )}
        </Space>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            size="small" 
            icon={<PlusOutlined />} 
            onClick={() => handleAddSubCriterion(record.key)}
          >
            Add Sub
          </Button>
          <Button 
            size="small" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Delete this criterion?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button size="small" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      )
    }
  ]

  const expandedRowRender = (record) => {
    if (!record.subCriteria || record.subCriteria.length === 0) {
      return <p style={{ margin: 0 }}>No sub-criteria defined</p>
    }

    return (
      <div className="sub-criteria-list">
        {record.subCriteria.map(sub => (
          <div key={sub.key} className="sub-criteria-item">
            <div>
              <strong>{sub.name}</strong>
              {sub.description && <p style={{ margin: '4px 0 0 0', color: '#666' }}>{sub.description}</p>}
            </div>
            <div>
              <Tag>Max Score: {sub.maxScore}</Tag>
              <Button size="small" icon={<DeleteOutlined />} type="text" danger />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="scheme-configuration criteria-management">
      <Card className="page-header">
        <Row align="middle" justify="space-between">
          <Col>
            <h2>Scheme Configuration - Criteria Management</h2>
            <p>Define and manage evaluation criteria</p>
          </Col>
          <Col>
            <Space>
              <Button onClick={() => navigate(`/secretary/courses/comprehensive-eval/${courseId}/scheme-configuration/timeline-setup`)}>
                Back to Timeline
              </Button>
              <Button type="primary" icon={<SaveOutlined />}>
                Save Criteria
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <div className="criteria-actions">
              <Space>
                <Button icon={<PlusOutlined />} type="primary" onClick={handleAdd}>
                  Add Criterion
                </Button>
                <Button icon={<CopyOutlined />}>
                  Import Template
                </Button>
                <Button icon={<EyeOutlined />}>
                  Preview Rubric
                </Button>
              </Space>
            </div>

            <Table
              columns={columns}
              dataSource={criteria}
              loading={loading}
              expandable={{
                expandedRowRender,
                expandedRowKeys,
                onExpandedRowsChange: setExpandedRowKeys
              }}
              pagination={false}
              className="criteria-table"
            />

            <Alert
              message="Criteria Configuration Notes"
              description={
                <ul style={{ marginBottom: 0, paddingLeft: 20 }}>
                  <li>Each criterion can have multiple sub-criteria for detailed evaluation</li>
                  <li>Required criteria must be evaluated for all students</li>
                  <li>Quantitative criteria use numerical scoring, qualitative use descriptive assessment</li>
                  <li>Total scores across all criteria will be normalized to 100%</li>
                </ul>
              }
              type="info"
              showIcon
              style={{ marginTop: 24 }}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title={editingCriterion ? 'Edit Criterion' : 'Add Criterion'}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
        }}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          className="criteria-form-modal"
        >
          <Form.Item
            name="name"
            label="Criterion Name"
            rules={[{ required: true, message: 'Please enter criterion name' }]}
          >
            <Input placeholder="e.g., Academic Performance" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea 
              rows={2} 
              placeholder="Describe what this criterion evaluates"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select type">
                  <Option value="quantitative">Quantitative</Option>
                  <Option value="qualitative">Qualitative</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maxScore"
                label="Max Score"
                rules={[{ required: true }]}
              >
                <InputNumber 
                  min={0} 
                  max={1000} 
                  style={{ width: '100%' }}
                  placeholder="100"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="required"
            label="Required Criterion"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Divider />

          <Alert
            message="Sub-criteria can be added after creating the main criterion"
            type="info"
            showIcon
          />
        </Form>
      </Modal>
    </div>
  )
}

export default CriteriaManagement