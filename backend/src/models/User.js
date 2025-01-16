
// models/User.js
const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, // The email field is mandatory
    unique: true, // Ensures no two users can have the same email
  },
  passwordHash: { 
    type: String, 
    required: true, // Stores the hashed version of the user's password
  },
  createdAt: { 
    type: Date, 
    default: Date.now, // Automatically sets the creation date
  },
});

// Export the User model based on the user schema
module.exports = mongoose.model('User', userSchema);
