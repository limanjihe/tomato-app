import React from 'react'
import { Card, Statistic, Row, Col, Progress, Typography } from 'antd'
import { ClockCircleOutlined, CheckCircleOutlined, TrophyOutlined } from '@ant-design/icons'
import { useTaskStore } from '@/store/useTaskStore'

const { Title, Text } = Typography

const StatsView: React.FC = () => {
  const { getTodayPomodoros, getWeeklyStats, tasks } = useTaskStore()

  const todayPomodoros = getTodayPomodoros()
  const weeklyStats = getWeeklyStats()
  const completedTasks = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length

  const maxWeekly = Math.max(...weeklyStats.map((s) => s.count), 1)

  return (
    <div style={{ padding: '0 8px' }}>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card style={{ textAlign: 'center', background: 'rgba(255,255,255,0.95)' }}>
            <Statistic
              title="今日番茄"
              value={todayPomodoros}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ textAlign: 'center', background: 'rgba(255,255,255,0.95)' }}>
            <Statistic
              title="完成任务"
              value={completedTasks}
              suffix={`/ ${totalTasks}`}
              prefix={<TrophyOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ textAlign: 'center', background: 'rgba(255,255,255,0.95)' }}>
            <Statistic
              title="专注时间"
              value={todayPomodoros * 25}
              suffix="分钟"
              prefix={<ClockCircleOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="本周统计" style={{ background: 'rgba(255,255,255,0.95)' }}>
        <div style={{ padding: '16px 0' }}>
          {weeklyStats.map((stat, index) => (
            <div key={index} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text strong>{stat.date}</Text>
                <Text>{stat.count} 个番茄</Text>
              </div>
              <Progress
                percent={(stat.count / maxWeekly) * 100}
                showInfo={false}
                strokeColor="#52c41a"
                size="small"
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default StatsView
