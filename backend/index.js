

// var bodyparser = require('body-parser');
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true }));

// var mongoose = require("mongoose");
// mongoose.Promise= global.Promise
// mongoose.connect("mongodb://127.0.0.1:27017/mydatabase");

// Schema


const express = require('express');
const mongoose = require('mongoose');


// const FormHtml = require('./Form.html');

const app = express();

app.use(express.json());

// Connect to MongoDB
const DB = 'mongodb+srv://ditya0504:1cEHekDkohjY5396@cluster0.2ynvy8x.mongodb.net/studets';
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

// Define a Mongoose model
const Student = mongoose.model('Student', {
  name: String,
  email: String,
  contact:Number,
  location:String,
  subject:String,
  messege:String
});

// Middleware for parsing form data

// Parse request body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Route for handling form submissions
app.post('/submit', async (req, res) => {
  // Create a new User instance with form data
  let studentlist = await Student.create({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    location: req.body.location,
    subject: req.body.subject,
    messege: req.body.messege
  });
  console.log('User saved to database:', studentlist);
    res.send('Form submitted successfully');
  // const student = new Student({
    
  // });

  // Save the user to the database
  // student.save().then(() => {
  //   console.log('User saved to database:', student);
  //   res.send('Form submitted successfully');
  // }).catch((err) => {
  //   console.error('Failed to save user to database:', err);
  //   res.send('Failed to submit form');
  // });
});

// Start the server
app.listen(3000);

