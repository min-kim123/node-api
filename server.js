require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');


const app = express();


const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

var corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5174'],
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.use('/api/products', productRoute);

app.get('/', (req, res) => {
  res.send('hello ode api');
})

app.get('/blog', (req, res) => {
  res.send('hello blog');
})

app.use(errorMiddleware);

mongoose.connect(MONGO_URL).then(()=> {
  app.listen(PORT, ()=>{
    console.log('connected to mongodb')
    console.log(`Node app running on port ${PORT}`)
  })
}).catch(()=> {
  console.log(error)
})