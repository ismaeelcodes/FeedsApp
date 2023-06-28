const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


module.exports = async (req, res) => {
  const subreddit = req.query.subreddit;

  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=20`);
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).end();
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).end();
  }
};