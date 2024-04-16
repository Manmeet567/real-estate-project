const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

const app = express();
const PORT = process.env.PORT ||4000;

// middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res) => {
    res.status(200).json({message:'Home Page'})
})

//routes
app.use('/auth', userRoutes);
app.use('/api', propertyRoutes)

mongoose.connect(process.env.MONGODB_URI)
 .then(() => {
    app.listen(PORT, () => {
        console.log('Server connected to DB and listening on PORT:',PORT);
    })
 })
 .catch((error) => {
    console.log(error)
 })
