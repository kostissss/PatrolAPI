
const { verifyAuthToken } = require('../jwt/jwtUtils');
function authMiddleware(req, res, next) {

    if (req.path == '/accounts/login' || req.path === '/register') { 
      console.log('Skipping authentication for login and registration routes');
        return next();  // Skip authentication for login and registration routes
      }  
  console.log(req.path);
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error('Authorization header missing');
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // Assuming Bearer token format
  console.log(token);

  try {
    const decoded = verifyAuthToken(token); 
    req.user = decoded; 
    next(); 
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(403).json({ message: error });
  }
}

module.exports = authMiddleware;