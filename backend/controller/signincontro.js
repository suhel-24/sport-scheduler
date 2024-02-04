const pool=require('../config/db')
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')

const getusersdata=async (req, res) => {
    try {
      console.log(req.user);
      res.status(200).json(req.user);
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  }


const addUser=async (req, res) => {
    try {
      const { username, password, email, role } = req.body;
  
      if (!username || !password || !email || !role) {
        return res.status(400).send("Username, password, and email are required");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert user into database
      const result = await pool.query("INSERT INTO users (username, password, email, hashedPassword, role) VALUES ($1, $2, $3, $4, $5) RETURNING *", [username, password, email, hashedPassword, role]);
  
      // Return the new user
      const newUser = result.rows[0];
      delete newUser.password;
      delete newUser.hashedpassword;
      res.status(201).json({...newUser,token:generateToken(newUser.user_id)});
    } catch (err) {
      if (err.code === "23505") {
        // unique_violation
        return res.status(409).send("Username or email already exists");
      }
      console.error(err);
      res.status(500).send("Server error");
    }
  }  


const checkuser=async (req, res) => {
    try {
      const {password, email } = req.body;
  
      if ( !password || !email) {
        return res.status(400).send("password and email are required");
      }
  
      // Retrieve the user data, including the hashed password
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      
      if (result.rows.length > 0) {
        const user = result.rows[0];
        // Compare provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.hashedpassword); // Ensure 'hashedPassword' matches your database column name
  
        if (isMatch) {
          return res.status(200).json({ msg: "Login successful",user_id : user.user_id ,token:generateToken(user.user_id),email:user.email,username:user.username,role:user.role});
        } else {
          return res.status(401).json({ msg: "Invalid password" });
        }
      } else {
        return res.status(404).json({ msg: "User not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }

  const generateToken = (id) => {
    return jwt.sign({ user_id:id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }

  module.exports={getusersdata,addUser,checkuser}