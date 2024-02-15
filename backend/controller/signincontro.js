// const pool=require('../config/db')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')

const getusersdata=async (req, res) => {
    try {
      
      res.status(200).json({msg:"success"});
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  }


const addUser=async (req, res) => {
    try {
      const { username, password, email, role,admincode } = req.body;
      if (role == "admin" && admincode!="secretkey") {
        return res.status(400).json({msg:"Invalid Admin Code"});
      }
      if (!username || !password || !email || !role) {
        return res.status(400).send("Username, password, and email are required");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert user into database
      const newUser = await prisma.users.create({
        data: {
          username,
          password,
          email,
          hashedpassword:hashedPassword, // Assuming your schema uses `hashedPassword` instead of `password`
          role,
        },
      });
      delete newUser.password;
      delete newUser.hashedpassword;
      res.status(201).json({...newUser,token:generateToken(newUser.user_id)});
    } catch (err) {
      if (err.code === "P2002") {
        // unique_violation
        return res.status(409).json({msg:"Username or email already exists"});
      }
      console.error(err);
      res.status(500).json({msg:" sigin Server error"});
    }
  }  


const checkuser=async (req, res) => {
    try {
      const {password, email } = req.body;
  
      if ( !password || !email) {
        return res.status(400).send("password and email are required");
      }
  
      // Retrieve the user data, including the hashed password
      const user = await prisma.users.findUnique({
        where: {
          email,
        },
      });
      
      if (user) {
        // Compare provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.hashedpassword);
  
        if (isMatch) {
          return res.status(200).json({
            msg: "Login successful",
            user_id: user.user_id,
            token: generateToken(user.user_id),
            email: user.email,
            username: user.username,
            role: user.role,
          });
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