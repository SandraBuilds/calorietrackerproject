import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Signup({ onBack }) {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) login(username);
    else alert(data.message || 'Signup failed');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-pink-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-sm w-full space-y-4">
        <h2 className="text-2xl font-bold text-center">
          Sign Up for CalorieCare
        </h2>
        <input
          className="w-full p-2 rounded-lg border"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-2 rounded-lg border"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 w-full text-white py-2 rounded-lg"
          onClick={handleSignup}
        >
          Sign Up
        </button>
        <p className="text-sm text-center">
          Already have an account?{' '}
          <button className="text-green-500 underline" onClick={onBack}>
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
