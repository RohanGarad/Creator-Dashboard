// services/redditService.js
const axios = require('axios');

const fetchRedditPosts = async () => {
  try {
    const response = await axios.get('https://www.reddit.com/r/technology.json');
    const posts = response.data.data.children.map((item) => ({
      id: item.data.id,
      source: 'Reddit',
      title: item.data.title,
      url: item.data.url,
      createdAt: new Date(item.data.created_utc * 1000),
    }));
    return posts;
  } catch (error) {
    console.error('Reddit API error:', error.message);
    return [];
  }
};

module.exports = fetchRedditPosts;
