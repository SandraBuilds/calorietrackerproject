import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function HistoryView() {
  const [date, setDate] = useState('');
  const [entries, setEntries] = useState(null);
  const { user } = useContext(UserContext);

  const fetchHistory = async () => {
    const res = await fetch(`/api/history?date=${date}&user=${user}`);
    const data = await res.json();
    setEntries(data);
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">View History</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 rounded-lg border"
      />
      <button
        onClick={fetchHistory}
        className="bg-green-500 text-white w-full py-2 rounded-lg"
      >
        Fetch
      </button>

      {entries && (
        <div>
          <h3 className="font-bold mt-4">Food:</h3>
          {entries.food.map((f, i) => (
            <div key={i} className="text-sm">
              🍽 {f.mealType}: {f.name} - {f.calories} cal
            </div>
          ))}
          <h3 className="font-bold mt-4">Steps:</h3>
          {entries.steps.map((s, i) => (
            <div key={i} className="text-sm">
              👣 {s.steps} steps
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
