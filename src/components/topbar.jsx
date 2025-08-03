import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-brandGreen dark:bg-gray-800 shadow rounded-2xl m-4">
      <h1 className="text-xl font-bold">CalorieCare</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="px-3 py-1 bg-white dark:bg-gray-700 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
