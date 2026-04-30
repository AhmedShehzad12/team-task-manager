import { useNavigate } from 'react-router-dom';
import { FiFolder, FiCheckCircle, FiTrash2, FiEdit2 } from 'react-icons/fi';

const ProjectCard = ({ project, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const percentage = project.taskCount > 0 ? (project.completedTasks / project.taskCount) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-md card-hover cursor-pointer animate-fade-in" onClick={() => navigate(`/project/${project.id}`)}>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg"><FiFolder className="text-indigo-600" size={20} /></div>
            <h3 className="font-semibold text-gray-800 text-lg">{project.name}</h3>
          </div>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={(e) => { e.stopPropagation(); onEdit(project); }} className="p-1.5 text-gray-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
              <FiEdit2 size={16} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(project.id); }} className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50">
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description || 'No description'}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span className="flex items-center space-x-1"><FiCheckCircle size={12} /><span>{project.completedTasks}/{project.taskCount} tasks</span></span>
            <span>{Math.round(percentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;