// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../layouts/MainLayout';            // your single sidebar layout
import { StatCard } from '../components/ui/stat-card';
import { List, CheckCircle, Clock, CircleDot } from 'lucide-react';
import { getTasks } from '../services/taskService';
import type { Task } from '../types';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    getTasks()
      .then(res => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Metrics
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'COMPLETED').length;
  const inProgress = tasks.filter(t => t.status === 'IN_PROGRESS').length;
  const pending = tasks.filter(t => t.status === 'PENDING').length;
  const totalDelta = 12, completedDelta = 8, inProgressDelta = -5, pendingDelta = -2;

  // Chart data for last 7 days
  const activityData = Array.from({ length: 7 }).map((_, i) => {
    const day = new Date();
    day.setDate(day.getDate() - (6 - i));
    const dateLabel = day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const createdCount = tasks.filter(t =>
      new Date(t.createdAt).toDateString() === day.toDateString()
    ).length;

    const completedCount = tasks.filter(t =>
      t.dueDate &&
      new Date(t.dueDate).toDateString() === day.toDateString() &&
      t.status === 'COMPLETED'
    ).length;

    return { date: dateLabel, created: createdCount, completed: completedCount };
  });

  // Tasks for selected date
  const dailyTasks = tasks.filter(t =>
    t.dueDate && new Date(t.dueDate).toDateString() === selectedDate.toDateString()
  );

  return (
    <Layout>
      {loading && <p className="p-6 font-sans">Loading dashboard...</p>}
      {error && <p className="p-6 text-danger font-sans">Error: {error}</p>}

      {!loading && !error && (
        <motion.div initial="initial" animate="animate" className="space-y-8 p-6 font-sans">

          {/* Stats Row */}
          <motion.div
            variants={fadeInUp}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: <List />,       label: 'Total Tasks', value: total,     delta: totalDelta,       pos: true },
              { icon: <CheckCircle />,label: 'Completed',    value: completed, delta: completedDelta,  pos: true },
              { icon: <Clock />,      label: 'In Progress', value: inProgress, delta: inProgressDelta, pos: inProgressDelta >= 0 },
              { icon: <CircleDot />,  label: 'Pending',      value: pending,    delta: pendingDelta,    pos: pendingDelta >= 0 },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <StatCard
                  icon={stat.icon}
                  label={stat.label}
                  value={stat.value}
                  delta={stat.delta}
                  deltaPositive={stat.pos}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Activity Chart */}
          <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle>Task Activity (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={activityData} margin={{ top: 10, right: 30, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="created" barSize={20} className="fill-primary-500" />
                    <Line type="monotone" dataKey="completed" className="stroke-success" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Table & Calendar */}
          <motion.div variants={fadeInUp} transition={{ delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>All Tasks</CardTitle>
              </CardHeader>
              <CardContent className="overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-primary-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-primary-700 uppercase">Title</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-primary-700 uppercase">Due Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-primary-700 uppercase">Status</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-primary-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map(task => (
                      <tr key={task.id}>
                        <td className="px-4 py-2">{task.title}</td>
                        <td className="px-4 py-2">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</td>
                        <td className="px-4 py-2">{task.status.replace('_', ' ')}</td>
                        <td className="px-4 py-2 text-right">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendar & Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  className="w-full"
                  value={selectedDate}
                  onChange={d => setSelectedDate(d as Date)}
                />
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Tasks on {selectedDate.toLocaleDateString()}</h4>
                  {dailyTasks.length ? (
                    dailyTasks.map(t => (
                      <div key={t.id} className="flex justify-between py-1">
                        <span>{t.title}</span>
                        <span className="text-sm text-primary-700 uppercase">{t.status.replace('_', ' ')}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No tasks for this day.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Insights & Reflections */}
          <motion.div variants={fadeInUp} transition={{ delay: 0.4 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="italic text-primary-600">
                  “Consider tackling your highest priority task first thing in the morning to maximize focus.”
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reflections</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="p-4 bg-primary-50 rounded-lg">
                    <p>Mastered first-principles API design.</p>
                    <p className="text-xs text-gray-400">Aug 6, 2025</p>
                  </li>
                  <li className="p-4 bg-primary-50 rounded-lg">
                    <p>Built reusable StatCard components.</p>
                    <p className="text-xs text-gray-400">Aug 5, 2025</p>
                  </li>
                </ul>
                <div className="flex space-x-2">
                  <textarea
                    className="flex-1 p-3 border border-primary-100 rounded-lg"
                    rows={2}
                    placeholder="Write a reflection..."
                  />
                  <Button size="md">Add</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </Layout>
  );
};

export default Dashboard;
