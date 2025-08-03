import React, { useEffect, useState, useContext } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { UserContext } from '../context/UserContext';

export default function Charts() {
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const dates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    });

    Promise.all(
      dates.map((date) =>
        fetch(`/api/history?date=${date}&user=${user}`).then((res) =>
          res.json()
        )
      )
    ).then((entries) => {
      const chartData = entries
        .map((entry, idx) => ({
          date: dates[idx].slice(5),
          calories: entry.food.reduce((acc, f) => acc + f.calories, 0),
          steps: entry.steps.reduce((acc, s) => acc + s.steps, 0),
        }))
        .reverse();

      setData(chartData);
    });
  }, [user]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Past 7 Days</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="calories" fill="#f472b6" name="Calories" />
          <Bar dataKey="steps" fill="#34d399" name="Steps" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
