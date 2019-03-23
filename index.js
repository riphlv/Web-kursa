const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/db');
const mappy = require('./models/mapModel');


// Connection to DB
mongoose.connect(config.database, {
    useNewUrlParser: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to DB ' + config.database)
})
mongoose.connection.on('error', (err) => {
    console.log('Connection failed to DB: ' + err)
})

// Server essentials
const app = express();
const port = 8080;
const users = require('./routes/users');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
// Static folder
app.use(express.static(path.join(__dirname, 'client')));

// Routes
app.use('/users', users);
// Index route
app.get('/', (req, res) => {
    res.send('Nothing here');
});

// Starting server
app.listen(port, () => {
    console.log("Server started on " + port);
})