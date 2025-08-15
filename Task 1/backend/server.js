require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const imageRoutes = require('./routes/imageRoutes')
const jobRoutes = require('./routes/jobRoutes')
const advancedRoutes = require('./routes/advancedRoutes')

const app = express()

app.use(express.json()) 

//routes
app.use('/api/images', imageRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/advanced', advancedRoutes);

//connect to DB and start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Connected to database and listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();