
require("dotenv").config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL);

const purchaseRoutes = require('./api/purchase-routes')
app.use('/', purchaseRoutes );

app.use((error, req, res, next) => {
    console.log(error.message)
     res.status(error.status || 500);
     res.json({
         message: error.message
     });
 
 });

app.listen(5002, () => {
  console.log('Purchases service running on http://localhost:5002');
});
