import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function GoalForm() {
  const { user } = useContext(UserContext);
  const [calories, setCalories] = useState('');
  const [steps, setSteps] = useState('');

  useEffect(() => {
    fetch(`/api/today?user=${user}`)
      .then((res) => res.json())
      .then((data) => {
        setCalories(data.goalCalories);
        setSteps(data.goalSteps);
      });
  }, [user]);

  const submit = async () => {
    await fetch('/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ calories: +calories, steps: +steps, user }),
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Set Daily Goals</h2>
      <input
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        type="number"
        placeholder="Calorie Goal"
        className="w-full mb-2 p-2 rounded-lg border"
      />
      <input
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        type="number"
        placeholder="Step Goal"
        className="w-full mb-2 p-2 rounded-lg border"
      />
      <button
        onClick={submit}
        className="bg-green-500 text-white w-full py-2 rounded-lg"
      >
        Save Goals
      </button>
    </div>
  );
}
