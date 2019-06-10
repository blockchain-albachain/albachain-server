var express = require('express');
var router = express.Router();
var passport = require('passport');
var fnregistration = require('../function/funRegistration/MRegistration');
// var LocalStrategy = require('passport-local').Strategy;
// var cookieSession = require('cookie-session');
// var flash = require('connect-flash');


// store up
router.post('/Mstoreup', function(req,res,next){
  console.log("M_storeup");
  fnregistration.storeup(req,res,next);
});

// store push
router.get('/Mstorepush', function(req,res,next){
  console.log("M_storePush");
  fnregistration.storepush(req,res,next);
});


module.exports = router;
