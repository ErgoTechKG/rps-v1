import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Card,
  Row,
  Col,
  Slider,
  InputNumber,
  Button,
  Space,
  Alert,
  message,
  Progress,
  Tag,
  Divider,
  Switch,
  Tooltip
} from 'antd'
import {
  SaveOutlined,
  CalculatorOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  PercentageOutlined
} from '@ant-design/icons'
import './SchemeConfiguration.css'

const WeightConfiguration = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [weights, setWeights] = useState({
    academicPerformance: 35,
    technicalSkills: 30,
    communication: 15,
    teamwork: 10,
    innovation: 10
  })
  const [autoNormalize, setAutoNormalize] = useState(true)

  useEffect(() => {
    fetchWeightData()
  }, [courseId])

  const fetchWeightData = async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const handleWeightChange = (criterion, value) => {
    const newWeights = { ...weights, [criterion]: value }
    
    if (autoNormalize) {
      const total = Object.values(newWeights).reduce((sum, val) => sum + val, 0)
      if (total !== 100) {
        const factor = 100 / total
        Object.keys(newWeights).forEach(key => {
          newWeights[key] = Math.round(newWeights[key] * factor)
        })
      }
    }
    
    setWeights(newWeights)
  }

  const getTotalWeight = () => {
    return Object.values(weights).reduce((sum, val) => sum + val, 0)
  }

  const handleSave = () => {
    const total = getTotalWeight()
    if (total !== 100) {
      message.error('Total weight must equal 100%')
      return
    }
    
    setSaving(true)
    setTimeout(() => {
      message.success('Weight configuration saved successfully')
      setSaving(false)
    }, 1000)
  }

  const weightCategories = [
    {
      key: 'academicPerformance',
      name: 'Academic Performance',
      description: 'Course grades, research output, and academic achievements',
      color: '#1890ff'
    },
    {
      key: 'technicalSkills',
      name: 'Technical Skills',
      description: 'Programming, system design, and technical competencies',
      color: '#52c41a'
    },
    {
      key: 'communication',
      name: 'Communication',
      description: 'Presentation skills, documentation, and verbal communication',
      color: '#faad14'
    },
    {
      key: 'teamwork',
      name: 'Teamwork',
      description: 'Collaboration, peer feedback, and group contributions',
      color: '#722ed1'
    },
    {
      key: 'innovation',
      name: 'Innovation',
      description: 'Creative problem-solving and original ideas',
      color: '#13c2c2'
    }
  ]

  const renderWeightCard = (category) => (
    <Card key={category.key} className="weight-card">
      <h4>{category.name}</h4>
      <p style={{ color: '#666', fontSize: '12px' }}>{category.description}</p>
      
      <div className="weight-value" style={{ color: category.color }}>
        {weights[category.key]}%
      </div>
      
      <Slider
        min={0}
        max={100}
        value={weights[category.key]}
        onChange={(value) => handleWeightChange(category.key, value)}
        className="weight-slider"
        trackStyle={{ backgroundColor: category.color }}
        handleStyle={{ borderColor: category.color }}
      />
      
      <InputNumber
        min={0}
        max={100}
        value={weights[category.key]}
        onChange={(value) => handleWeightChange(category.key, value)}
        formatter={value => `${value}%`}
        parser={value => value.replace('%', '')}
        style={{ width: '100%' }}
      />
    </Card>
  )

  const totalWeight = getTotalWeight()
  const isValidTotal = totalWeight === 100

  return (
    <div className="scheme-configuration weight-configuration">
      <Card className="page-header">
        <Row align="middle" justify="space-between">
          <Col>
            <h2>Scheme Configuration - Weight Configuration</h2>
            <p>Configure evaluation criteria weights</p>
          </Col>
          <Col>
            <Space>
              <Button onClick={() => navigate(`/secretary/courses/comprehensive-eval/${courseId}/scheme-configuration/criteria-management`)}>
                Back to Criteria
              </Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />}
                onClick={handleSave}
                loading={saving}
                disabled={!isValidTotal}
              >
                Save Weights
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={18}>
          <Card loading={loading}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>Weight Distribution</h3>
                  <Space>
                    <span>Auto-normalize:</span>
                    <Switch 
                      checked={autoNormalize} 
                      onChange={setAutoNormalize}
                    />
                    <Tooltip title="Automatically adjust weights to total 100%">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </Space>
                </div>
              </Col>
              
              {weightCategories.map(category => (
                <Col xs={24} sm={12} lg={8} key={category.key}>
                  {renderWeightCard(category)}
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={6}>
          <Card className="weight-summary">
            <h4>
              <CalculatorOutlined /> Weight Summary
            </h4>
            <Divider />
            
            <div className={`total-weight ${isValidTotal ? 'valid' : 'invalid'}`}>
              <PercentageOutlined /> Total: {totalWeight}%
            </div>
            
            <Progress
              percent={totalWeight}
              status={isValidTotal ? 'success' : 'exception'}
              strokeColor={isValidTotal ? '#52c41a' : '#f5222d'}
            />
            
            {!isValidTotal && (
              <Alert
                message={`Adjust by ${100 - totalWeight}%`}
                type="error"
                showIcon
                icon={<WarningOutlined />}
                style={{ marginTop: 16 }}
              />
            )}
            
            {isValidTotal && (
              <Alert
                message="Configuration Valid"
                type="success"
                showIcon
                icon={<CheckCircleOutlined />}
                style={{ marginTop: 16 }}
              />
            )}
          </Card>

          <Card style={{ marginTop: 16 }}>
            <h4>Distribution Chart</h4>
            <div style={{ marginTop: 16 }}>
              {weightCategories.map(category => (
                <div key={category.key} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: '12px' }}>{category.name}</span>
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                      {weights[category.key]}%
                    </span>
                  </div>
                  <Progress
                    percent={weights[category.key]}
                    showInfo={false}
                    strokeColor={category.color}
                    size="small"
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ marginTop: 16 }}>
            <Alert
              message="Weight Guidelines"
              description={
                <ul style={{ marginBottom: 0, paddingLeft: 20, fontSize: '12px' }}>
                  <li>Total must equal 100%</li>
                  <li>Consider course objectives</li>
                  <li>Balance theory and practice</li>
                  <li>Weights affect final grades</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default WeightConfiguration