
const { findRefreshToken } = require('../dbFunctions/authTokenFunctions');
const { verifyAuthToken } = require('../jwt/jwtUtils');
function authMiddleware(req, res, next) {

    if (req.path == '/accounts/login' || req.path === '/register' ) { 
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
    console.log('Verifying token:', token);
    const decoded = verifyAuthToken(token); 
    console.log('Decoded:', decoded);
    req.user = decoded; 
    console.log('Cookies:', req.cookies);
    const refreshToken = req.cookies['Refresh-Token'];
    if (!refreshToken) {
      console.error('Refresh token missing');
      return res.status(401).json({ message: 'Refresh token missing' });
    }
    if (findRefreshToken(refreshToken)) {
      next(); 
    }
    else {
      console.error('Refresh token not Found');
      return res.status(401).json({ message: 'Refresh token notFound' });
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: error });
  }
}

module.exports = authMiddleware;