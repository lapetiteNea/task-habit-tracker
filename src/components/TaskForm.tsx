import React, { useState } from 'react';
import type { Priority, Task } from '../types';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title,
      priority,
      category: category || 'General',
    });

    setTitle('');
    setCategory('');
    setPriority('medium');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="დავალების დასახელება..."
        value={title}
        onChange={handleTitleChange}
        required
      />
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="text"
        placeholder="კატეგორია..."
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">დამატება</button>
    </form>
  );
};