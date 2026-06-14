const mongoose = require('mongoose');
const DB_name = require('./DB_NAME.js')
const connectDB = async () => {
  try {
    await mongoose.connect(
        `${process.env.MONGO_URI}/${DB_name}`

    );
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;