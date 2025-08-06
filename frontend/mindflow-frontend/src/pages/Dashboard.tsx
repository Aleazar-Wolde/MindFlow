import React from 'react';

const Dashboard: React.FC = () => {
  const userName = 'Aleazar';
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const tasks = [
    { id: 1, title: 'Review PRs' },
    { id: 2, title: 'Write blog post' },
    { id: 3, title: 'Plan next sprint' },
  ];

  const reflections = [
    { id: 1, content: 'Today I learned how to structure my dashboard UI.', date: 'Aug 4, 2025' },
  ];

  const insights = [
    'Start with high-priority task: Review PRs before anything else.',
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-6">
        <h2 className="text-xl font-semibold mb-6">MindFlow</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-blue-500">Tasks</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-blue-500">Calendar</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-blue-500">AI</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-blue-500">Reflection</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        {/* Top Section */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Good morning, {userName}!</h1>
          <p className="text-gray-600">{today}</p>
        </header>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Tasks Card */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Today's Tasks</h2>
            {tasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex justify-between items-center mb-2">
                <span>{task.title}</span>
                <button className="text-sm text-blue-500 hover:underline">Mark Done</button>
              </div>
            ))}
            <button className="mt-4 w-full py-2 border border-blue-500 rounded-xl hover:bg-blue-50">
              + New Task
            </button>
          </div>

          {/* Reflections Card */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Latest Reflection</h2>
            <p className="text-gray-700 mb-4">"{reflections[0].content}"</p>
            <button className="py-2 w-full border border-green-500 rounded-xl hover:bg-green-50">
              Write Reflection
            </button>
          </div>

          {/* AI Insights Card */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">AI Insights</h2>
            <p className="text-gray-700 mb-4">{insights[0]}</p>
            <button className="py-2 w-full border border-purple-500 rounded-xl hover:bg-purple-50">
              Declutter My Mind
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-white p-4 rounded-2xl shadow flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h3 className="font-semibold mb-2">Weekly Calendar</h3>
            <div className="h-24 bg-gray-100 rounded-lg" />
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="font-semibold mb-2">Streak</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="h-4 rounded-full bg-blue-500" style={{ width: '70%' }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
