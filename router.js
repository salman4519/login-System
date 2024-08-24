var express = require('express');
var userRoute = express();

// Mock user data
const regList = {
    username: 'salman',
    password: 'salman123'
};



// Login user
userRoute.post('/', (req, res) => {
    if (req.body.username === regList.username && req.body.password === regList.password) {
        req.session.user = req.body.username;
        res.redirect('/dashboard');
    } else {
        res.render('login', { title: 'Not Valid', invalid: 'Invalid Username Or Password' });
    }
});

// Route to dashboard
userRoute.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user });
    } else {
        res.redirect('/');
    }
});

// Route for logout
userRoute.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        
            res.redirect('/');
        
    });
});

module.exports = userRoute;
