const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyparser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const router = require('./router');
const userRoute = require('./router');

const app = express();
const port = process.env.PORT || 4519;

// Middleware to disable caching
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    next();
});

// Body parser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

// Router middleware
app.use('/', userRoute);

// Home route
app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        
        res.render('login', { title: 'Login System' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => console.log(`Your server is running at http://localhost:${port}`));
