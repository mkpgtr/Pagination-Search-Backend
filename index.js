const express = require('express')
const { userRoutes } = require('./routes/users')
const mongoose = require('mongoose')
const connectDB = require('./db/connect');
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
const port = 5000

app.use('/users',userRoutes)


const start = async () => {
    try {
      await connectDB("mongodb://127.0.0.1:27017/persons");
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();