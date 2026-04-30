import { useState, useEffect } from 'react';
import { projectAPI } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import { FiPlus } from 'react-icons/fi';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await projectAPI.getAll();
      setProjects(data);
    } catch (err) { setError('Failed to load projects'); }
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    try {
      if (editing) await projectAPI.update(editing.id, form);
      else await projectAPI.create(form);
      setShowModal(false);
      setEditing(null);
      setForm({ name: '', description: '' });
      fetchProjects();
    } catch (err) { setError('Operation failed'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete project? All tasks will be lost.')) {
      await projectAPI.delete(id);
      fetchProjects();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div><h1 className="text-3xl font-bold text-gray-900">Dashboard</h1><p className="text-gray-600 mt-1">Manage your projects</p></div>
        <button onClick={() => { setEditing(null); setForm({ name: '', description: '' }); setShowModal(true); }} className="flex items-center space-x-2 btn-primary"><FiPlus size={18} /><span>New Project</span></button>
      </div>
      {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6">{error}</div>}
      {loading ? <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div></div>
      : projects.length === 0 ? <div className="text-center py-12 bg-white rounded-xl shadow-sm"><p className="text-gray-500">No projects yet. Create one!</p></div>
      : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{projects.map(p => <ProjectCard key={p.id} project={p} onDelete={handleDelete} onEdit={(proj) => { setEditing(proj); setForm({ name: proj.name, description: proj.description || '' }); setShowModal(true); }} />)}</div>}
      {showModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setShowModal(false)}><div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-scale-up" onClick={e => e.stopPropagation()}><h2 className="text-xl font-bold mb-4">{editing ? 'Edit Project' : 'New Project'}</h2><form onSubmit={handleSubmit}><div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg input-focus" /></div><div className="mb-6"><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows="3" className="w-full px-3 py-2 border rounded-lg input-focus" /></div><div className="flex justify-end space-x-3"><button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button><button type="submit" className="btn-primary">{editing ? 'Update' : 'Create'}</button></div></form></div></div>}
    </div>
  );
};

export default Dashboard;