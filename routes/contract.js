var express = require('express');
var router = express.Router();
var passport = require('passport');
var fnregistration = require('../function/funContract/funContract');
// var LocalStrategy = require('passport-local').Strategy;
// var cookieSession = require('cookie-session');
// var flash = require('connect-flash');


// 알바생이 계약 신청
router.post('/contractUp', function(req,res,next){
  console.log("contractUp");
  fnregistration.contractUp(req,res,next);
});

// 사장 관리화면에 신청된 계약서 확인
router.get('/contractPush', function(req,res,next){
  console.log("contractPush");
  fnregistration.contractPush(req,res,next);
});

// 사장 신청된 계약서 승인
router.put('/contractSuccess', function(req,res,next){
  console.log("contractSuccess");
  fnregistration.contractSuccess(req,res,next);
});

// 알바 홈화면에 계약된 가게 확인
router.get('/contractStorePush', function(req,res,next){
  console.log("contractStorePush");
  fnregistration.contractStorePush(req,res,next);
});


module.exports = router;
