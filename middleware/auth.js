const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT tokens from Authorization header
module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Ensure header exists and uses Bearer scheme
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  // Verify the token using the secret
  jwt.verify(token, process.env.JWT_SECRET || 'test', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded; // Attach user info to request object
    next();
  });
};
