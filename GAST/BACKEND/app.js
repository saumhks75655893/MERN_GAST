const dotenv = require('dotenv'); 
dotenv.config(); 
const express = require('express');
const cors = require('cors');  
const app = express(); 
const userRoutes = require('./routes/user.routes'); 
const captainRoutes = require('./routes/captain.routes');
const cookieParser = require('cookie-parser');
const mapRoutes = require('./routes/maps.routes'); 
const rideRoutes = require('./routes/rides.routes'); 

//mongodb database connection 
const connectToDb = require('./db/db'); 
//database connection function call
connectToDb(); 

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser());


app.get('/',(req, res) => {
  res.send('Hello World'); 
}); 

// /users route for user authentication and registration
app.use('/users', userRoutes); 

// /captains route for captain management
app.use('/captains', captainRoutes);

app.use('/maps', mapRoutes); 

app.use('/rides', rideRoutes);



module.exports = app; 