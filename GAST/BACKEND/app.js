const dotenv = require('dotenv'); 
dotenv.config(); 
const express = require('express');
const cors = require('cors');  
const app = express(); 

//mongodb database connection 
const connectToDb = require('./db/db'); 
//database connection function call
connectToDb(); 




app.use(cors()); 


app.get('/',(req, res) => {
  res.send('Hello World'); 
}); 

module.exports = app; 