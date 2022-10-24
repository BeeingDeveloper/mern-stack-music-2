const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();






const app = express();
const port = process.env.PORT || 8000;



// ---------------------------------------------------------------
//SETUP MIDDLEWARE:
app.use(cors());
app.use(express.json());
// ---------------------------------------------------------------




// ---------------------------------------------------------------
//MONGOOSE CONNECT:
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("Connected to MongoDB database...");
}).on("error", (err)=>{
    console.log("Error: ", err);
})
// ---------------------------------------------------------------






// GETTING ALL ROUTES---------------------------------------------
const userRoute = require('./routes/auth');
app.use("/api/users/", userRoute);
// ---------------------------------------------------------------





//START SERVER:
app.get('/', (req, res)=>{
    return res.json("Hi there...");
})

app.listen(port, ()=>{
    console.log(`Server running at port: ${port}`);
})
// ---------------------------------------------------------------