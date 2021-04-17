const express = require('express'); 
const mongoose = require('mongoose'); 

const app = express();
const PORT = process.env.PORT || 3001;

const db = require('./Models'); 

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/populatedb', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  
