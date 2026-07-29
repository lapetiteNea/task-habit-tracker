export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  category: string;
}

export interface Habit {
  id: string;
  title: string;
  streak: number;
  completedToday: boolean;
}

export type FilterStatus = 'all' | 'active' | 'completed';