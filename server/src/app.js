const express = require('express');
const {apiRoute, apiProtected} = require('./routes/api');
const mongoose = require('mongoose');
const AuthMiddleware = require('./middlewares/AuthMidleware');
const cors = require('cors');


const app = express();

mongoose.connect("mongodb://localhost:27017/todo",{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Error connecting to the database:', error);
});
db.once('open', () => {
  console.log('Connected to the database');
});

const PORT = 8000;

app.use(cors());

app.use(express.json());
app.use('/api/',apiRoute); 
app.use('/api/',AuthMiddleware,apiProtected);


app.listen(PORT,() => console.log('server is running'));