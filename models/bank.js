const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for loan offers
const loanOfferSchema = new Schema({
  loan_type: {
    type: String,
    required: true,  // e.g., "Home Loan", "Car Loan"
  },
  interest_rate: {
    type: Number,
    required: true,  // e.g., 5.5 (for 5.5% interest)
  },
  min_loan_amount: {
    type: Number,
    required: true,  // e.g., 50000 (minimum loan amount)
  },
  max_loan_amount: {
    type: Number,
    required: true,  // e.g., 500000 (maximum loan amount)
  },
  term: {
    min_years: {
      type: Number,
      required: true,  // e.g., 5 (minimum years)
    },
    max_years: {
      type: Number,
      required: true,  // e.g., 30 (maximum years)
    },
  },
  eligibility_criteria: {
    min_income: {
      type: Number,
      required: true,  // e.g., 40000 (minimum income required)
    },
    minCIBILscore: {
      type: Number,
      required: true,  // e.g., 300 (minimum credit score)
    },    
    maxCIBILscore: {
      type: Number,
      required: true,  // e.g., 650 (maximum credit score)
    },
    max_debt_to_income_ratio: {
      type: Number,
      required: true,  // e.g., 0.4 (maximum debt-to-income ratio)
    },
  },
});

// Define the schema for a Bank
const bankSchema = new Schema({
  name: {
    type: String,
    required: true,  // e.g., "ABC Bank"
  },
  loan_offers: [loanOfferSchema],  // Array of loan offer documents
},{ collection: 'loans' });

// Create the Bank model
const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;
