var express = require('express');
var router = express.Router();


var infor = require('../function/funUsers/funUsers');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieSession = require('cookie-session');
var flash = require('connect-flash');


/* user infor */
router.get('/allInfo', function(req, res, next) {
  infor.userinfo(req, res, next);
});

// sign up
router.post('/signup', function(req,res,next){
  infor.signup(req,res,next);
});

router.post('/login', passport.authenticate('local',{failureRedirect: '/users/login', failureFlash: true}
),function(req, res){
  console.log('ID : '+ req.body.username);
  console.log('******* Login *******');
  res.json({success: true, msg: 'Login success'});
});
// 로그인 false 시 값 보내주는곳
router.get('/signin', function (req,res) {
  res.json({success: false, msg: 'Login false'});
});


// delete
router.delete('/delete', function(req, res, next) {
res.json({success: false, msg: '아직 구현하지 않음.'});
});




module.exports = router;
