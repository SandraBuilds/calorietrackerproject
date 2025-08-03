import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function StepForm() {
  const [steps, setSteps] = useState('');
  const { user } = useContext(UserContext);

  const submit = async () => {
    await fetch('/api/steps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ steps: +steps, user }),
    });
    setSteps('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Log Steps</h2>
      <input
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        type="number"
        placeholder="Steps walked"
        className="w-full mb-2 p-2 rounded-lg border"
      />
      <button
        onClick={submit}
        className="bg-green-500 text-white w-full py-2 rounded-lg"
      >
        Submit
      </button>
    </div>
  );
}
