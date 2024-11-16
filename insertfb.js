// insertdata.js

const mongoose = require('mongoose');
const FinancialInfo = require('./models/FinancialInfo'); // Adjust paths if needed
const User = require('./models/User'); // Adjust paths if needed

mongoose.connect('mongodb://localhost:27017/bank');

async function insertData() {
  try {
    // Step 1: Insert financialInfo objects
    const financialInfo1 = new FinancialInfo({
      MonthlyIncome: 56881.92,
      MonthlyExpend: 46711.58,
      LoanRequest: 13251.44,
      outstandingDebt: 8709.94,
      totalAssets: 337705.07,
      totalLiabilities: 143645.42,
      loanHistory: {
        "L1": {
          LoanType: "Home Loan",
          LoanAmount: 40333.64,
          loanStatus: "Paid",
          startDate: "2019-05-31",
          endDate: "2025-06-01",
          interestRate: 5.36,
          regularityLack: {
            "2019": { "1": 63, "2": 21, "3": 45, "4": 89, "5": 56, "6": 70, "7": 92, "8": 38, "9": 44, "10": 79, "11": 63, "12": 18 },
            "2020": { "1": 94, "2": 4, "3": 11, "4": 27, "5": 94, "6": 25, "7": 81, "8": 89, "9": 79, "10": 73, "11": 57, "12": 21 },
            "2021": { "1": 34, "2": 45, "3": 78, "4": 23, "5": 55, "6": 31, "7": 59, "8": 92, "9": 18, "10": 26, "11": 43, "12": 12 },
            "2022": { "1": 19, "2": 29, "3": 43, "4": 68, "5": 33, "6": 48, "7": 22, "8": 54, "9": 61, "10": 47, "11": 39, "12": 15 }
          }
        },
        "L2": {
          LoanType: "Education Loan",
          LoanAmount: 11422.92,
          loanStatus: "Paid",
          startDate: "2019-08-05",
          endDate: "2025-07-16",
          interestRate: 6.44,
          regularityLack: {
            "2019": { "1": 14, "2": 76, "3": 47, "4": 24, "5": 50, "6": 36, "7": 20, "8": 57, "9": 82, "10": 42, "11": 39, "12": 27 },
            "2020": { "1": 63, "2": 48, "3": 46, "4": 64, "5": 11, "6": 41, "7": 71, "8": 25, "9": 70, "10": 43, "11": 33, "12": 7 },
            "2021": { "1": 14, "2": 98, "3": 47, "4": 24, "5": 20, "6": 6, "7": 20, "8": 37, "9": 80, "10": 42, "11": 35, "12": 77 },
            "2022": { "1": 51, "2": 42, "3": 78, "4": 87, "5": 18, "6": 80, "7": 69, "8": 10, "9": 89, "10": 73, "11": 53, "12": 97 }
          }
        }
      }
    });

    const financialInfo2 = new FinancialInfo({
      MonthlyIncome: 45432.22,
      MonthlyExpend: 33211.45,
      LoanRequest: 20250.76,
      outstandingDebt: 12015.38,
      totalAssets: 215000.34,
      totalLiabilities: 103500.00,
      loanHistory: {
        "L3": {
          LoanType: "Car Loan",
          LoanAmount: 25000.50,
          loanStatus: "Pending",
          startDate: "2020-04-15",
          endDate: "2027-03-22",
          interestRate: 6.75,
          regularityLack: {
            "2020": { "1": 11, "2": 27, "3": 15, "4": 55, "5": 44, "6": 73, "7": 19, "8": 42, "9": 35, "10": 67, "11": 72, "12": 31 },
            "2021": { "1": 22, "2": 35, "3": 48, "4": 30, "5": 61, "6": 52, "7": 76, "8": 83, "9": 37, "10": 50, "11": 64, "12": 29 },
            "2022": { "1": 31, "2": 43, "3": 54, "4": 65, "5": 46, "6": 38, "7": 57, "8": 42, "9": 73, "10": 81, "11": 33, "12": 49 }
          }
        }
      }
    });

    await financialInfo1.save();
    await financialInfo2.save();

    console.log("FinancialInfo objects saved.");

    // Step 2: Insert user objects with references to financialInfo
    const user1 = new User({
      user: "user1",
      password:"qwerty123",
      financialInfo: financialInfo1._id // Reference to F001
    });

    const user2 = new User({
      user: "adi",
      password: "password123",
      financialInfo: financialInfo2._id // Reference to F002
    });

    await user1.save();
    await user2.save();

    console.log("User objects saved.");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    mongoose.connection.close();
  }
}

insertData();
