// src/pages/TaskList.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { getTasks, deleteTask, createTask } from '../services/taskService';
import type { Task } from '../types';
import { Button } from '../components/ui/button';
import Input from '../components/ui/input';
import Select from '../components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

const PAGE_SIZE = 5;

type SortField = 'title' | 'dueDate' | 'status';
type SortOrder = 'asc' | 'desc';
type StatusFilter = 'All' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

const TaskList: React.FC = () => {
  // Core state
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New-task form
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Filters, sorting, pagination
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [page, setPage] = useState(1);

  // Fetch tasks
  useEffect(() => {
    getTasks()
      .then(res => setTasks(res.data))
      .catch(err => setError(err.message))
      .then(() => setLoading(false));
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createTask({ title: newTitle, description: newDescription });
      setTasks(prev => [...prev, res.data]);
      setNewTitle('');
      setNewDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  // Filtering
  const filtered = useMemo(
    () => tasks.filter(t => {
      if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== 'All' && t.status !== statusFilter) return false;
      return true;
    }),
    [tasks, search, statusFilter]
  );

  // Sorting
  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const aVal = sortField === 'dueDate' ? (a.dueDate || '') : sortField === 'status' ? a.status : a.title;
      const bVal = sortField === 'dueDate' ? (b.dueDate || '') : sortField === 'status' ? b.status : b.title;
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const onSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setPage(1);
  };

  if (loading) return <p className="p-6">Loading tasks...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Tasks</h2>

      {/* New Task Form */}
      <Card>
        <CardHeader><CardTitle>Add Task</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleAddTask} className="space-y-4">
            <Input
              placeholder="Task title"
              value={newTitle}
              onChange={value => setNewTitle(value)}
            />
            <textarea
              className="w-full p-2 border rounded-lg"
              placeholder="Description"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
            />
            <Button type="submit">Add Task</Button>
          </form>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={value => setSearch(value)}
          className="flex-1 max-w-sm"
        />
        <Select
          value={statusFilter}
          onChange={value => setStatusFilter(value as StatusFilter)}
        >
          <option>All</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </Select>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Title','Due Date','Status'].map((label, idx) => {
                const field: SortField = idx === 0 ? 'title' : idx === 1 ? 'dueDate' : 'status';
                return (
                  <th
                    key={field}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                    onClick={() => onSort(field)}
                  >
                    {label}
                    {sortField === field && <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                  </th>
                );
              })}
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paged.map(task => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{task.title}</td>
                <td className="px-4 py-2">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</td>
                <td className="px-4 py-2">{task.status.replace('_', ' ')}</td>
                <td className="px-4 py-2 text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => {/* TODO: edit */}}>Edit</Button>
                  <Button size="sm" variant="outline" onClick={() => deleteTask(task.id).then(() => setTasks(prev => prev.filter(t => t.id !== task.id)))}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">Page {page} of {totalPages}</p>
        <div className="space-x-2">
          <Button size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
          <Button size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
