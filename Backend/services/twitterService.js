// services/twitterService.js
const fetchTwitterPosts = async () => {
    // Simulated Twitter posts
    return [
      {
        id: 'tw1',
        source: 'Twitter',
        title: 'Twitter Post 1',
        url: 'https://twitter.com/post1',
        createdAt: new Date(),
      },
      {
        id: 'tw2',
        source: 'Twitter',
        title: 'Twitter Post 2',
        url: 'https://twitter.com/post2',
        createdAt: new Date(),
      },
    ];
  };
  
  module.exports = fetchTwitterPosts;
  