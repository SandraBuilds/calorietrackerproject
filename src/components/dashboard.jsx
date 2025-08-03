import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import WrapUp from './WrapUp'

export default function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2x1 font-bold mb-4">Welcome!</h1>
      <WrapUp />{/*import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import DarkModeToggle from './DarkModeToggle';

export default function Topbar() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="flex items-center justify-between p-4 bg-pink-100 dark:bg-gray-900 rounded-xl shadow">
      <h1 className="text-xl font-bold text-pink-600 dark:text-pink-300">CalorieCare</h1>
      <div className="flex gap-4 items-center">
        <DarkModeToggle />
        {user && (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

 */}
    </div>
  )
}
 */}
  )
  const [summary, setSummary] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`/api/today?user=${user}`)
      .then((res) => res.json())
      .then((data) => setSummary(data));
  }, [user]);

  if (!summary) return <p>Loading summary...</p>;

  const calPercent = Math.min(
    (summary.totalCalories / summary.goalCalories) * 100,
    100
  );
  const stepPercent = Math.min(
    (summary.totalSteps / summary.goalSteps) * 100,
    100
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Today's Summary
      </h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-2">
        <p>
          Calories: {summary.totalCalories} / {summary.goalCalories}
        </p>
        <div className="w-full bg-pink-200 h-4 rounded-full">
          <div
            className="bg-pink-500 h-4 rounded-full"
            style={{ width: `${calPercent}%` }}
          />
        </div>
        <p>
          Steps: {summary.totalSteps} / {summary.goalSteps}
        </p>
        <div className="w-full bg-green-200 h-4 rounded-full">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${stepPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
