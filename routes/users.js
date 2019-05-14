var express = require('express');
var router = express.Router();
var passport = require('passport');
var funUsers = require('../function/funUsers/funUsers');
// var LocalStrategy = require('passport-local').Strategy;
// var cookieSession = require('cookie-session');
// var flash = require('connect-flash');


/* user infor */
router.get('/allInfo', function(req, res, next) {
  funUsers.userinfo(req, res, next);
});

// sign up
router.post('/signup', function(req,res,next){
  console.log("signup");
  funUsers.signup(req,res,next);
});

// sign in
router.post('/signin', passport.authenticate('local-signin'),function(req, res){
  console.log('ID : '+ req.body.username);
  console.log('******* signin *******');
  res.json({success: true, msg: 'signin success'});
});

// 로그인 false 시 값 보내주는곳
router.get('/signin_f', function (req,res){
  console.log('signin false');
  res.json({success: false, msg: 'signin false'});
});

// User signout
router.get('/signout', function (req,res){
  req.logout();
  res.json({success: true, msg: 'signout success'});
});

// delete
router.delete('/delete', function(req, res, next) {
res.json({success: false, msg: '아직 구현하지 않음.'});
});




module.exports = router;
