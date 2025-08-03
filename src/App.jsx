import React, { useContext, useState } from 'react';
import Dashboard from './components/Dashboard';
import FoodForm from './components/FoodForm';
import StepForm from './components/StepForm';
import HistoryView from './components/HistoryView';
import Login from './components/Login';
import Signup from './components/Signup';
import GoalForm from './components/GoalForm';
import Charts from './components/Charts';
import DarkModeToggle from './components/DarkModeToggle';
import { UserContext } from './context/UserContext';
import Topbar from './components/Topbar';

export default function App() {
  const { user, logout } = useContext(UserContext);
  const [page, setPage] = useState('dashboard');

  if (!user) return <Login />;
  return (
    <div className="min-h-screen p-6 bg-pink-50 dark:bg-gray-900 transition">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-green-600">CalorieCare</h1>
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          <button
            onClick={logout}
            className="bg-red-400 px-4 py-2 rounded-lg text-white hover:bg-red-500 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          'dashboard',
          'add-food',
          'add-steps',
          'history',
          'goals',
          'charts',
        ].map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-4 py-2 rounded-lg ${
              page === p ? 'bg-green-300' : 'bg-pink-200'
            } hover:bg-green-200 transition`}
          >
            {p.replace('-', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {page === 'dashboard' && <Dashboard />}
      {page === 'add-food' && <FoodForm />}
      {page === 'add-steps' && <StepForm />}
      {page === 'history' && <HistoryView />}
      {page === 'goals' && <GoalForm />}
      {page === 'charts' && <Charts />}
    </div>
  );
}
function App() {
  return (
    <>
      <Topbar />
      <Routes>{/* your routes */}</Routes>
    </>
  );
}
