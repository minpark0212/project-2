const express = require('express');
const router = express.Router();
const db = require('../config/connection.js');
const beer = require('../models/beer.js');

//currently unused 
router.get('/add', function (req, res) {
  var hbsObject = {
    loggedIn: true
  }
  res.render('add', hbsObject);
});

//greeting router
router.get('/', function (req, res) {
  res.render('greeting');
});

//index router
router.get('/index', function (req, res) {
  res.render('index');
});

//login page router
router.get('/login', function (req, res) {
  res.render('login');
});

//signup page router
router.get('/signup', function (req, res) {
  res.render('signup');
});

//creating user router
router.post("/api/user/create", function (req, res) {
  console.log(req.body);
  db.query("CALL insertUser(?,?,?,?,?,?,?,?,?)", [req.body.userName, req.body.firstName, req.body.lastName, req.body.password, req.body.address, req.body.email, req.body.city, req.body.state, req.body.zipCode])
});

//user profile router
router.get('/profile/:userName', function (req, res) {
  beer.selectOneUser([req.params.userName], function (data) {
    var hbsObject = {
      userId: data[0].userId,
      userName: data[0].userName,
      firstName: data[0].firstName,
      lastName: data[0].lastName,
      email: data[0].email,
      city: data[0].city,
      state: data[0].state,
      zipCode: data[0].zipCode
    };
    console.log(hbsObject);
    res.render('userprofile', hbsObject);
  });
});

//user profile page route
router.get('/api/profile/:userId', function (req, res) {
  beer.oneUserAllRecipes(req.params.userId, function (data) {
    res.json(data);
  });
});

module.exports = router;