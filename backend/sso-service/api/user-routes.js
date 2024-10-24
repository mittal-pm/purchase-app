const express = require('express'); 
const userModel = require('./user-model');  
const router = express.Router();  
const axios = require('axios');  

// Route for logging out the user
router.post('/logout', async (req, res, next) => {
  try {
    // Check if the request contains a user object in the body
    if (!req.body.user) {
      // If the user is not present in the request body, redirect to the frontend (e.g., login page)
      return res.redirect(process.env.FRONTEND_URL);
    }

    const reqUser = req.body.user;  

    // Send a notification to the notification service after the user successfully logs out
    await axios.post(process.env.NOTIFICATIONS_SERVICE_URL, {
      email: reqUser.email, 
      subject: 'Successful Logout Notification', 
      message: "You have successfully logged out from your account. If this was not you, please contact our support team immediately for assistance.", 
      title: "Logout successful",  
      name: reqUser.name  
    });

    return res.status(200).json({
      error: false,
      message: "Successfully logged out"
    });

  } catch (e) {
    next(e);
  }
});

// Route for handling successful login of the user
router.post('/login/success', async (req, res, next) => {
  try {

    if (!req.body.user) {
      return res.redirect(process.env.FRONTEND_URL);
    }

    const reqUser = req.body.user;  

    // Check if the user already exists in the database
    const user = await userModel.find({ email: reqUser.email }, {role: 1});

    // If the user does not exist (new user), save the user's information to the database
    if (user.length === 0) {
      const newUser = new userModel({
        name: reqUser.name, 
        email: reqUser.email, 
        createDate: Date.now() 
      });
      await newUser.save();  
    }

    res.status(200).json({
      message: "Successfully logged in",
      user: {
        role: user[0].role || "General"
      }
    });

    // Send a notification to the notification service after the user successfully logs in
    await axios.post(process.env.NOTIFICATIONS_SERVICE_URL, {
      email: reqUser.email,
      subject: 'Successful Login Notification',  
      message: "You have successfully logged in to your account. If this was not you, please contact our support team immediately for assistance.",  
      title: "Login successful", 
      name: reqUser.name  
    });

  

  } catch (e) {
    next(e);
  }
});

// Route for retrieving users from the database
router.post('/user', async (req, res, next) => {
  try {

    const users = await userModel.find(req.body);

    return res.status(200).send({ users: users });
    
  } catch (e) {
    next(e);
  }
});

module.exports = router; 
