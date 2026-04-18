import React, { useState } from 'react'
import {
  List,
  Checkbox,
  Button,
  Input,
  Card,
  Tag,
  Popconfirm,
  Space,
  Typography,
} from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { useTaskStore } from '@/store/useTaskStore'
import { useTimerStore } from '@/store/useTimerStore'
import type { Task } from '@/types'

const { Text } = Typography

interface TaskListProps {
  showCompleted?: boolean
}

const TaskList: React.FC<TaskListProps> = ({ showCompleted = false }) => {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskComplete, incrementTaskPomodoros } =
    useTaskStore()
  const { currentTaskId, setCurrentTaskId } = useTimerStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskEstimate, setNewTaskEstimate] = useState(1)

  const filteredTasks = tasks.filter((task) => task.completed === showCompleted)

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle.trim(),
        estimatedPomodoros: newTaskEstimate,
      })
      setNewTaskTitle('')
      setNewTaskEstimate(1)
    }
  }

  const handleStartEdit = (task: Task) => {
    setEditingId(task.id)
    setEditTitle(task.title)
  }

  const handleSaveEdit = (id: string) => {
    if (editTitle.trim()) {
      updateTask(id, { title: editTitle.trim() })
    }
    setEditingId(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  const handleSelectTask = (taskId: string) => {
    setCurrentTaskId(currentTaskId === taskId ? null : taskId)
  }

  return (
    <Card
      title={showCompleted ? '已完成任务' : '任务列表'}
      size="small"
      style={{ background: 'rgba(255,255,255,0.95)' }}
    >
      {!showCompleted && (
        <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
          <Input
            placeholder="添加新任务..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onPressEnter={handleAddTask}
            allowClear
          />
          <Input.Number
            min={1}
            max={20}
            value={newTaskEstimate}
            onChange={(v) => setNewTaskEstimate(v || 1)}
            style={{ width: 80 }}
            addonBefore="×"
          />
          <Button type="primary" onClick={handleAddTask} disabled={!newTaskTitle.trim()}>
            添加
          </Button>
        </Space.Compact>
      )}

      <List
        dataSource={filteredTasks}
        renderItem={(task) => (
          <List.Item
            style={{
              padding: '8px 0',
              background: currentTaskId === task.id ? '#e6f7ff' : 'transparent',
              borderRadius: 4,
              paddingLeft: 8,
              paddingRight: 8,
              cursor: 'pointer',
            }}
            onClick={() => !showCompleted && handleSelectTask(task.id)}
            actions={
              !showCompleted
                ? [
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStartEdit(task)
                      }}
                    />,
                    <Popconfirm
                      title="确定删除这个任务？"
                      onConfirm={() => deleteTask(task.id)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Popconfirm>,
                  ]
                : []
            }
          >
            {editingId === task.id ? (
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onPressEnter={() => handleSaveEdit(task.id)}
                  autoFocus
                />
                <Button
                  icon={<CheckOutlined />}
                  onClick={() => handleSaveEdit(task.id)}
                />
                <Button
                  icon={<CloseOutlined />}
                  onClick={handleCancelEdit}
                />
              </Space.Compact>
            ) : (
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Space>
                  {!showCompleted && (
                    <Checkbox
                      checked={task.completed}
                      onChange={(e) => {
                        e.stopPropagation()
                        toggleTaskComplete(task.id)
                      }}
                    />
                  )}
                  <Text delete={task.completed}>{task.title}</Text>
                </Space>
                <Tag color={task.completedPomodoros >= task.estimatedPomodoros ? 'green' : 'blue'}>
                  {task.completedPomodoros}/{task.estimatedPomodoros}
                </Tag>
              </Space>
            )}
          </List.Item>
        )}
        locale={{
          emptyText: showCompleted ? '暂无已完成任务' : '暂无任务，添加一个吧！',
        }}
      />
    </Card>
  )
}

export default TaskList
