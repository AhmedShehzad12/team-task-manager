import { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import TaskCard from '../components/TaskCard';
import { FiFilter } from 'react-icons/fi';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await taskAPI.getAll();
      setTasks(data);
    } catch (err) { setError('Failed to load tasks'); }
    setLoading(false);
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleToggle = async (id, completed) => {
    await taskAPI.update(id, { completed });
    fetchTasks();
  };
  const handleDelete = async (id) => {
    if (window.confirm('Delete task?')) {
      await taskAPI.delete(id);
      fetchTasks();
    }
  };

  const filtered = tasks.filter(t => filter === 'all' ? true : filter === 'completed' ? t.completed : !t.completed);
  const stats = { total: tasks.length, completed: tasks.filter(t => t.completed).length, pending: tasks.filter(t => !t.completed).length };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8"><h1 className="text-3xl font-bold text-gray-900">All Tasks</h1><p className="text-gray-600">Manage all tasks across projects</p></div>
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6"><div className="grid grid-cols-3 gap-4 text-center"><div><div className="text-2xl font-bold">{stats.total}</div><div className="text-sm text-gray-500">Total</div></div><div><div className="text-2xl font-bold text-green-600">{stats.completed}</div><div className="text-sm text-gray-500">Completed</div></div><div><div className="text-2xl font-bold text-orange-600">{stats.pending}</div><div className="text-sm text-gray-500">Pending</div></div></div></div>
      <div className="flex items-center space-x-3 mb-6"><FiFilter className="text-gray-500" /><div className="flex gap-2">{[{ label: 'All', value: 'all' }, { label: 'Pending', value: 'pending' }, { label: 'Completed', value: 'completed' }].map(opt => <button key={opt.value} onClick={() => setFilter(opt.value)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${filter === opt.value ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{opt.label}</button>)}</div></div>
      {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6">{error}</div>}
      {loading ? <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div></div> : filtered.length === 0 ? <div className="text-center py-12 bg-white rounded-xl"><p>No tasks found</p></div> : <div className="space-y-3">{filtered.map(t => <TaskCard key={t.id} task={t} onToggle={handleToggle} onDelete={handleDelete} showProjectName={true} />)}</div>}
    </div>
  );
};

export default TaskPage;