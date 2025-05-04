import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch admin users:', err);
      }
    };

    fetchAdminData();
  }, []);

  // 📌 Handle input value change
  const handleCreditChange = (userId, value) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, credits: value } : user
      )
    );
  };

  const updateCredits = async (userId, newCredits) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3000/api/admin/users/${userId}/credits`,
        { credits: Number(newCredits) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Credits updated successfully!');
    } catch (err) {
      console.error('Failed to update credits:', err);
      alert('Failed to update credits');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Credits</th>
            <th className="border border-gray-300 px-4 py-2">Update Credits</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={user.credits}
                  onChange={(e) => handleCreditChange(user._id, e.target.value)}
                  className="w-20 border border-gray-300 rounded px-2 py-1"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => updateCredits(user._id, user.credits)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
