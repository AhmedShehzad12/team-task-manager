import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLayout, FiList, FiLogOut, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ProjectFlow
              </span>
            </Link>
            <div className="hidden md:flex space-x-1">
              <Link to="/" className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition">
                <FiLayout size={18} /><span>Dashboard</span>
              </Link>
              <Link to="/tasks" className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition">
                <FiList size={18} /><span>All Tasks</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full">
              <FiUser size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
            </div>
            <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition px-3 py-1.5 rounded-lg hover:bg-red-50">
              <FiLogOut size={18} /><span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;