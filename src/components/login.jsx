import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Signup from './Signup';

export default function Login() {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) login(username);
    else alert(data.message || 'Login failed');
  };

  return showSignup ? (
    <Signup onBack={() => setShowSignup(false)} />
  ) : (
    <div className="h-screen flex items-center justify-center bg-pink-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-sm w-full space-y-4">
        <h2 className="text-2xl font-bold text-center">Login to CalorieCare</h2>
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
          className="bg-green-500 w-full text-white py-2 rounded-lg"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-sm text-center">
          No account?{' '}
          <button
            className="text-blue-500 underline"
            onClick={() => setShowSignup(true)}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
