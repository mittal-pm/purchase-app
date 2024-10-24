require("dotenv").config();

const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());
app.use(cors());



mongoose.connect(process.env.MONGO_URL);


const userRoutes = require('./api/user-routes')
app.use('/', userRoutes );

app.use((error, req, res, next) => {
  console.log(error.message)
     res.status(error.status || 500);
     res.json({
         message: error.message
     });
 
 });

app.listen(5000, () => {
  console.log('SSO service running on http://localhost:5000');
});
