const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Configure our Mongo DB
const url = `mongodb+srv://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PASS)}@${process.env.DB_URL}`;
mongoose.connect(url);

//Import Routes
const authRoute = require('./routes/auth');
const pingRoute = require('./routes/ping');
const postsRoute = require('./routes/posts');

//Middleware
app.use(express.json());

//Route Middleware
app.use('/', pingRoute);
app.use('/api/user', authRoute);
app.use('/api/posts', postsRoute);

app.listen(3000, () => console.log('server running.'));
