const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const financialInfo = require('./models/FinancialInfo');
const multer = require('multer');
const { createFinancialInfoFromFile } = require('./util/parseFinancialData');
const fs = require('fs').promises;
const app = express();




const upload = multer({ dest: 'uploads/' });



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));






mongoose.connect('mongodb://localhost:27017/bank').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});






app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ user: username }).populate('financialInfo');
  
      if (!user) {
        return res.status(400).send('Invalid username or password');
      }
  
      if (password !== user.password) {
        return res.status(400).send('Invalid username or password');
      }
  
      let financialInfo = user.financialInfo.toObject();
      if (financialInfo.loanHistory instanceof Map) {
        financialInfo.loanHistory = Object.fromEntries(financialInfo.loanHistory);
      }

      //send data to model and create creditscrore  and save in var
  
      res.render('dashboard.ejs', {
        username: user.user,
        financialInfo
        

      });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Server Error');
    }
  });
  
app.get('/register',(req,res)=>{
    res.render('register.ejs')
})



app.post('/register', upload.single('file'), async (req, res) => {
  try {
    const { username, password } = req.body;
    const filepath = req.file.path;

    // Use the function to create financial info from the uploaded file
    const financialInfoDoc = await createFinancialInfoFromFile(filepath);

    // Here you can insert user data (assuming you already have a User model setup)
    const userDoc = new User({
      user: username,
      password: password,
      financialInfo: financialInfoDoc._id, // Link to the financialInfo document
    });
    await userDoc.save();

    // Remove the uploaded file after processing
    await fs.unlink(filepath);

    res.status(200).send('Registration successful');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Server error');
  }
});




app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
