import { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const [credit, setCredit] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/user/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        setError('Failed to load dashboard. Please try again.', err);
      }
    };

    fetchUserData();
  }, [token]);

  useEffect(() => {
    const fetchCredits = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/credits/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCredit(res.data.credits);
    };
    fetchCredits();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  const { username, credits, recentActivity, savedPosts } = userData;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">Welcome, {username} 👋</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Credit Stats */}
          <div className="p-4 bg-indigo-100 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Your Credit Points</h2>
            <p className="text-4xl font-bold text-indigo-700">{credit}</p>
          </div>

          {/* Recent Activity */}
          <div className="p-4 bg-blue-100 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
            <ul className="space-y-1 text-sm text-gray-700">
              {recentActivity?.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <li key={index}>• {activity}</li>
                ))
              ) : (
                <li>No recent activity</li>
              )}
            </ul>
          </div>

          {/* Saved Posts */}
          <div className="col-span-1 md:col-span-2 p-4 bg-green-100 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Saved Posts</h2>
            {savedPosts?.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
                {savedPosts.map((post, index) => (
                  <li key={index}>
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {post.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No saved posts yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
