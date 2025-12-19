const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const userData = {
      username: 'testadmin',
      email: 'test@cloudritz.com',
      password: 'test123',
      role: 'ADMIN'
    };

    const existingUser = await User.findOne({ 
      $or: [{ email: userData.email }, { username: userData.username }] 
    });

    if (existingUser) {
      console.log('User already exists');
      return;
    }

    const user = await User.create(userData);
    console.log('User created successfully:', {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    });

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

createUser();