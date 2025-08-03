import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function FoodForm() {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [mealType, setMealType] = useState('breakfast');
  const { user } = useContext(UserContext);

  const submit = async () => {
    await fetch('/api/food', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, calories: +calories, mealType, user }),
    });
    setName('');
    setCalories('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Add Food</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Food name"
        className="w-full mb-2 p-2 rounded-lg border"
      />
      <input
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        type="number"
        placeholder="Calories"
        className="w-full mb-2 p-2 rounded-lg border"
      />
      <select
        value={mealType}
        onChange={(e) => setMealType(e.target.value)}
        className="w-full mb-2 p-2 rounded-lg border"
      >
        <option>breakfast</option>
        <option>lunch</option>
        <option>dinner</option>
        <option>snack</option>
      </select>
      <button
        onClick={submit}
        className="bg-green-500 text-white w-full py-2 rounded-lg"
      >
        Submit
      </button>
    </div>
  );
}
