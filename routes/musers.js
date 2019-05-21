var express = require('express');
var router = express.Router();
var passport = require('passport');
var funMUsers = require('../function/funUsers/funMUsers');
// var LocalStrategy = require('passport-local').Strategy;
// var cookieSession = require('cookie-session');
// var flash = require('connect-flash');


/* user infor */
router.get('/allInfo', function(req, res, next) {
  funMUsers.userinfo(req, res, next);
});

// sign up
router.post('/Msignup', function(req,res,next){
  console.log("M_signup");
  funMUsers.signup(req,res,next);
});

router.post('/Msignin', passport.authenticate('m_localsignin',{
  failureRedirect: '/musers/signin_f', failureFlash: true}
),function(req, res){
  console.log('ID : '+ req.body.username);
  console.log('******* Signin *******');
  res.json({success: true, msg: 'Signin success'});
});
// 로그인 false 시 값 보내주는곳
router.get('/Msignin_f', function (req,res) {
  console.log('signin false');
  res.json({success: false, msg: 'Signin false'});
});

// User signout
router.get('/Msignout', function (req,res){
  req.logout();
  res.json({success: true, msg: 'signout success'});
});


// delete
router.delete('/Mdelete', function(req, res, next) {
res.json({success: false, msg: '아직 구현하지 않음.'});
});




module.exports = router;
