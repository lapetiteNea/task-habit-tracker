import React, { useState } from 'react';
import type { Task, FilterStatus } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setFilter('all')}>ყველა</button>
        <button onClick={() => setFilter('active')}>აქტიური</button>
        <button onClick={() => setFilter('completed')}>დასრულებული</button>
      </div>

      {filteredTasks.length === 0 ? (
        <p>დავალებები არ არის</p>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
          />
        ))
      )}
    </div>
  );
};