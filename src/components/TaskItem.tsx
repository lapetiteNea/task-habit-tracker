import React from 'react';
import type { Task } from '../types';
interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div style={{ textDecoration: task.completed ? 'line-through' : 'none', margin: '8px 0' }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span> <strong>{task.title}</strong> [{task.priority}] ({task.category})</span>
      <button onClick={() => onDelete(task.id)} style={{ marginLeft: '10px' }}>
        წაშლა
      </button>
    </div>
  );
};