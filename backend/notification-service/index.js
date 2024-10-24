
require("dotenv").config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs')

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user:process.env.EMAIL_AUTH,
  pass: process.env.EMAIL_PASSWORD } 
});

// API to send email notification
app.post('/send-notification', (req, res) => {
  const { email, subject, message, name, title } = req.body;
  var htmlText = fs .readFileSync('./templates/email-template.html','utf8');
  htmlText = htmlText.replace("{user_name}", name)
  htmlText = htmlText.replace("{message}", message)
  htmlText = htmlText.replace("{title}", title)
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: subject,
    html: htmlText
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Notification sent!');
  });
});

app.listen(5001, () => {
  console.log('Notification service running on http://localhost:5001');
});
