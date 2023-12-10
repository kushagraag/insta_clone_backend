const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (replace YOUR_CONNECTION_STRING with your actual MongoDB connection string)
mongoose.connect('mongodb+srv://kush:kush@insta-test.s5uur97.mongodb.net/testdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a simple User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve your HTML and JS files
app.use(express.static('public'));

// Handle signup requests
app.post('/signup', async (req, res) => {
	console.log(req.body)
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    // const existingUser = await User.findOne({ username });
    // if (existingUser) {
    //   res.status(409).send('Username already exists. Please choose a different one.');
    // } else {
      // Create a new user
	  console.log(username)
	  console.log(password)
      const newUser = new User({ username, password });
	  console.log(newUser);
      await newUser.save();
      res.send('Sign-up successful!');
    // }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Handle login requests
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.send('Login successful!');
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
