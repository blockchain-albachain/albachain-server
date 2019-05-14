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
router.post('/signup', function(req,res,next){
  console.log("M_signup");
  funMUsers.signup(req,res,next);
});

router.post('/signin', passport.authenticate('local',{
  failureRedirect: '/musers/signin', failureFlash: true}
),function(req, res){
  console.log('ID : '+ req.body.username);
  console.log('******* Signin *******');
  res.json({success: true, msg: 'Signin success'});
});
// 로그인 false 시 값 보내주는곳
router.get('/signin', function (req,res) {
  console.log('signin false');
  res.json({success: false, msg: 'Signin false'});
});


// delete
router.delete('/delete', function(req, res, next) {
res.json({success: false, msg: '아직 구현하지 않음.'});
});




module.exports = router;
