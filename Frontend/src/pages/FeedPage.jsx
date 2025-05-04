import { useEffect, useState } from 'react';
import FeedCard from '../components/FeedCard';
import axios from 'axios';

const FeedPage = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/feed');
      console.log('Fetched feed:', response.data); // 🧪 Debug

      // Ensure it’s an array
      if (Array.isArray(response.data)) {
        setFeeds(response.data);
      } else {
        console.error('API did not return an array:', response.data);
        setFeeds([]); // fallback
      }
    } catch (err) {
      console.error('Error fetching feed:', err);
      setFeeds([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleSave = async (post) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:3000/api/feed/save-external',
        { post },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Saved external post:', response.data);
      fetchFeed(); // Re-fetch the feed after saving
    } catch (error) {
      console.error('Error saving external post:', error.response?.data || error.message);
    }
  };
  
  const handleReport = async (post) => {
    try {
      const token = localStorage.getItem('token'); // or sessionStorage
  
      const response = await axios.post(
        'http://localhost:3000/api/feed/interact',
        { action: 'report', postId: post._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log('Reported:', response.data);
    } catch (error) {
      console.error('Error reporting post:', error);
      throw error; // to be caught in FeedCard
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">📰 Your Feed</h1>

      {loading ? (
        <p className="text-gray-600">Loading feed...</p>
      ) : feeds.length === 0 ? (
        <p className="text-gray-500">No posts available at the moment.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {feeds.map((post) => (
            <FeedCard
              key={post._id}
              post={post}
              onSave={handleSave}  // Pass handleSave to FeedCard
              onReport={handleReport} // Pass handleReport to FeedCard
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedPage;
