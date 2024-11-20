const Bank = require('../models/bank');  // Import the Bank model

// Function to get loan offers based on user's financial profile
const getLoanOffers = async (financialInfo,cibilscore) => {
    try {
      // Fetch all banks and their loan offers
      const banks = await Bank.find({
        // Pre-filter banks with basic eligibility
        "loan_offers.eligibility_criteria.min_income": { $lte: financialInfo.MonthlyIncome },
        "loan_offers.eligibility_criteria.minCIBILscore": { $lte: cibilscore },
        "loan_offers.eligibility_criteria.maxCIBILscore": { $gte: cibilscore },
      });
  
      // Process the loan offers to extract relevant information
      const loanOffers = [];
  
      banks.forEach((bank) => {
        bank.loan_offers.forEach((offer) => {
          if (
            offer.eligibility_criteria.min_income <= financialInfo.MonthlyIncome &&
            offer.eligibility_criteria.minCIBILscore <= cibilscore &&
            offer.eligibility_criteria.maxCIBILscore >= cibilscore 
          ) {
            loanOffers.push({
              bankName: bank.name, // Include the bank name
              loan_type: offer.loan_type, // Loan type (e.g., Home Loan, Personal Loan)
              interest_rate: offer.interest_rate, // Interest rate
              min_loan_amount: offer.min_loan_amount,
              max_loan_amount: offer.max_loan_amount,
              term: offer.term, // Term information
            });
          }
        });
      });
  
      return loanOffers;
    } catch (error) {
      console.error('Error fetching loan offers:', error);
      throw new Error('Could not fetch loan offers');
    }
  };
  

module.exports = { getLoanOffers };
