mongoose.connect('mongodb://localhost:27017/bank').then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

  const express= require("express");
 

  const app=express();
  

  app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
  });