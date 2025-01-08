// index.js

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/User');  // Import the User model
// Initialize dotenv to use environment variables
dotenv.config();

// Initialize the express app
const app = express();

// Use JSON parser middleware
app.use(express.json());

const cors = require('cors');
app.use(cors());  // Allow all domains to access the backend


// Connect to MongoDB using Mongoose
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Define a Mongoose Schema for Employee Travel Data
const travelSchema = new mongoose.Schema({
  employeeName: String,
  travelDates: {
    from: Date,
    to: Date
  },
  destination: String,
  purpose: String,
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
});

// Create a Mongoose model based on the schema
const Travel = mongoose.model('Travel', travelSchema);

// Dummy data to insert into MongoDB


// POST route to create dummy travel data
app.post('/api/dummy-data', async (req, res) => {
  const dummyData = req.body; // Get the data sent in the request body

  if (!Array.isArray(dummyData) || dummyData.length === 0) {
    return res.status(400).json({ message: "Invalid data format. Must be an array." });
  }

  try {
    // Insert the received data into the MongoDB collection
    await Travel.insertMany(dummyData);
    res.status(200).json({ message: "Dummy data inserted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error inserting dummy data", error });
  }
});


// GET route to fetch all travel requests
// GET route to fetch all travel requests
// GET route to fetch travel requests by status
app.get('/api/travel', async (req, res) => {
  const { status } = req.query;  // Get the status from query parameter

  try {
    const filter = status ? { status } : {};  // If status is provided, filter by it
    const travels = await Travel.find(filter); // Retrieve filtered travel requests from MongoDB
    res.status(200).json(travels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});



// PATCH route to approve/reject travel requests
app.patch('/api/travel/:id', async (req, res) => {
  const { id } = req.params;  // Get the ID from the URL parameter
  const { status } = req.body;  // Get the status from the request body

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const updatedRequest = await Travel.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true } // Return the updated document
    );
    
    if (!updatedRequest) {
      return res.status(404).json({ message: "Travel request not found" });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: "Error updating travel request", error });
  }
});




// UPDATE TRAVEL INFORMATION 

// PUT route to update travel request details
app.put('/api/travel/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedRequest = await Travel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Travel request not found" });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: "Error updating travel request", error });
  }
});





//AUTHENTICATION                                                                       LOGIN SIGNUP


const authenticate = require('./middleware/auth');

// GET route to fetch travel requests (protected route)
app.get('/api/travel', authenticate, async (req, res) => {
  // Your travel fetching logic here
  res.status(200).json({ message: 'Data fetched successfully' });
});




app.post('/api/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ username, email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// POST route for user login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token, role: user.role, username: user.username });
    // res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});




//                                                ROLE 


app.post("/api/get-role", async (req, res) => {
  const { email } = req.body; // Get email from request body

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Fetch user from the database using email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user's role as response
    res.json({ role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
