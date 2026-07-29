import React, { useState } from 'react';
import type { Habit } from '../types';

interface HabitTrackerProps {
  habits: Habit[];
  onAddHabit: (title: string) => void;
  onToggleHabit: (id: string) => void;
  onDeleteHabit: (id: string) => void;
}

export const HabitTracker: React.FC<HabitTrackerProps> = ({
  habits,
  onAddHabit,
  onToggleHabit,
  onDeleteHabit,
}) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddHabit(title);
    setTitle('');
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>ჩვევების თრექერი (Habits)</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="ახალი ჩვევა..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">ჩვევის დამატება</button>
      </form>

      {habits.length === 0 ? (
        <p>ჩვევები არ არის დამატებული</p>
      ) : (
        habits.map((habit) => (
          <div key={habit.id} style={{ margin: '8px 0' }}>
            <input
              type="checkbox"
              checked={habit.completedToday}
              onChange={() => onToggleHabit(habit.id)}
            />
            <span>
              {' '}<strong>{habit.title}</strong> — Streak: 🔥 {habit.streak} დღე
            </span>
            <button onClick={() => onDeleteHabit(habit.id)} style={{ marginLeft: '10px' }}>
              წაშლა
            </button>
          </div>
        ))
      )}
    </div>
  );
};