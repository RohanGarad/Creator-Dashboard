const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.split(" ")[1];

  if (!token || token === '') {
    return res.status(401).json({ message: 'Access Denied: No Token Provided or Invalid Format' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid Token' });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
