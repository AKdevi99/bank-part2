// models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
// const financialInfo = require('./FinancialInfo');

const userSchema = new Schema({
  id: Number,
  user: String,       // Username field
  password: String,   // Plain text password for testing
  financialInfo: {    // Reference to FinancialInfo collection
    type: Schema.Types.ObjectId,
    ref: 'FinancialInfo'
  }
});

module.exports = mongoose.model('User', userSchema);
