// src/pages/TaskList.tsx
import React, { useEffect, useState } from 'react';
import { getTasks } from '../services/taskService';
import type { Task } from '../types';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTasks()
      .then((res: { data: React.SetStateAction<Task[]>; }) => setTasks(res.data))
      .catch((err: { message: React.SetStateAction<string | null>; }) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="p-2 border-b">
            <h3 className="font-semibold">{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            {task.dueDate && <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;