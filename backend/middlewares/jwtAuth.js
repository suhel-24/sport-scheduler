const jwt=require('jsonwebtoken')
const pool=require('../config/db')

const protect = async (req, res, next) => {
    let token
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1]
  
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [decoded.user_id]);
        req.user = result.rows[0]
        delete req.user.password;
        delete req.user.hashedpassword;
        // Get user from the token
        // req.user = await User.findById(decoded.id).select('-password')
  
        next()
      } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
      }
    }
  
    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  }
  
  module.exports = { protect }