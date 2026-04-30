import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectAPI, taskAPI } from '../services/api';
import TaskCard from '../components/TaskCard';
import { FiArrowLeft, FiPlus, FiTrash2 } from 'react-icons/fi';

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const proj = await projectAPI.getById(id);
      setProject(proj);
      const tasksData = await taskAPI.getByProject(id);
      setTasks(tasksData);
    } catch (err) { setError('Failed to load'); }
    setLoading(false);
  }, [id]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;
    try {
      if (editingTask) await taskAPI.update(editingTask.id, taskForm);
      else await taskAPI.create({ ...taskForm, projectId: id });
      setShowModal(false);
      setEditingTask(null);
      setTaskForm({ title: '', description: '' });
      fetchData();
    } catch (err) { setError('Task operation failed'); }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Delete this task?')) {
      await taskAPI.delete(taskId);
      fetchData();
    }
  };

  const handleToggleTask = async (taskId, completed) => {
    await taskAPI.update(taskId, { completed });
    fetchData();
  };

  const handleDeleteProject = async () => {
    if (window.confirm('Delete entire project? All tasks will be lost.')) {
      await projectAPI.delete(id);
      navigate('/');
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div></div>;
  if (!project) return <div className="text-center py-12 text-gray-500">Project not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button onClick={() => navigate('/')} className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 mb-6"><FiArrowLeft size={18} /><span>Back</span></button>
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-start">
          <div><h1 className="text-2xl font-bold text-gray-900">{project.name}</h1><p className="text-gray-600 mt-1">{project.description || 'No description'}</p></div>
          <button onClick={handleDeleteProject} className="text-red-500 hover:text-red-700 p-2"><FiTrash2 size={20} /></button>
        </div>
        <div className="mt-4 flex items-center space-x-4 text-sm"><span className="text-gray-500">{tasks.length} total</span><span className="text-green-600">{tasks.filter(t => t.completed).length} completed</span></div>
      </div>
      <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-semibold">Tasks</h2><button onClick={() => { setEditingTask(null); setTaskForm({ title: '', description: '' }); setShowModal(true); }} className="flex items-center space-x-2 btn-primary text-sm"><FiPlus size={16} /><span>Add Task</span></button></div>
      {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6">{error}</div>}
      {tasks.length === 0 ? <div className="text-center py-12 bg-white rounded-xl"><p>No tasks yet. Create one!</p></div> : <div className="space-y-3">{tasks.map(t => <TaskCard key={t.id} task={t} onToggle={handleToggleTask} onDelete={handleDeleteTask} onEdit={(task) => { setEditingTask(task); setTaskForm({ title: task.title, description: task.description || '' }); setShowModal(true); }} />)}</div>}
      {showModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}><div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}><h2 className="text-xl font-bold mb-4">{editingTask ? 'Edit Task' : 'New Task'}</h2><form onSubmit={handleTaskSubmit}><div className="mb-4"><input type="text" required value={taskForm.title} onChange={e => setTaskForm({ ...taskForm, title: e.target.value })} placeholder="Task title" className="w-full px-3 py-2 border rounded-lg input-focus" /></div><div className="mb-6"><textarea value={taskForm.description} onChange={e => setTaskForm({ ...taskForm, description: e.target.value })} rows="3" placeholder="Description (optional)" className="w-full px-3 py-2 border rounded-lg input-focus" /></div><div className="flex justify-end space-x-3"><button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button><button type="submit" className="btn-primary">{editingTask ? 'Update' : 'Create'}</button></div></form></div></div>}
    </div>
  );
};

export default ProjectPage;