import { FiCheckCircle, FiCircle, FiTrash2, FiEdit2 } from 'react-icons/fi';

const TaskCard = ({ task, onToggle, onDelete, onEdit, showProjectName = false }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 group animate-slide-up">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button onClick={() => onToggle(task.id, !task.completed)} className="mt-0.5 focus:outline-none">
            {task.completed ? <FiCheckCircle className="text-green-500 hover:text-green-600" size={20} /> : <FiCircle className="text-gray-400 hover:text-indigo-500" size={20} />}
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4 className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</h4>
              {showProjectName && task.projectName && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{task.projectName}</span>}
            </div>
            {task.description && <p className={`text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>{task.description}</p>}
          </div>
        </div>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
          <button onClick={() => onEdit(task)} className="p-1.5 text-gray-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"><FiEdit2 size={14} /></button>
          <button onClick={() => onDelete(task.id)} className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50"><FiTrash2 size={14} /></button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;