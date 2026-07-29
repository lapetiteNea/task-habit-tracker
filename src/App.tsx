import { useLocalStorage } from './hooks/useLocalStorage';
import type { Task, Habit } from './types';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { HabitTracker } from './components/HabitTracker';

export function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', []);

  // Tasks Handlers
  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: crypto.randomUUID(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Habits Handlers
  const handleAddHabit = (title: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      title,
      streak: 0,
      completedToday: false,
    };
    setHabits([...habits, newHabit]);
  };

  const handleToggleHabit = (id: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const isDone = !habit.completedToday;
          return {
            ...habit,
            completedToday: isDone,
            streak: isDone ? habit.streak + 1 : Math.max(0, habit.streak - 1),
          };
        }
        return habit;
      })
    );
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Task & Habit Tracker</h1>
      
      <section>
        <h2>დავალებები (Tasks)</h2>
        <TaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
      </section>

      <hr style={{ margin: '30px 0' }} />

      <section>
        <HabitTracker
          habits={habits}
          onAddHabit={handleAddHabit}
          onToggleHabit={handleToggleHabit}
          onDeleteHabit={handleDeleteHabit}
        />
      </section>
    </div>
  );
}

export default App;