const jwt = require('jsonwebtoken');

const ErrorResponse = require('../utils/errorResponse');
const userRepository = require('../repositories/UserRepository');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
   
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
   
    
    // Set token from cookie
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {

    
    
    return res.status(401).json({ success: false ,error: "Not authorized to access this route"});
    //next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userRepository.findById(decoded.id);

    next();
  } catch (err) {
    return res.status(401).json({ success: false ,error: "Not authorized to access this route"}); 
   // next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false ,error: `User role ${req.user.role} is not authorized to access this route`});
      
    }
    next();
  };
};