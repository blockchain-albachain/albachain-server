// var express = require('express');
// var router = express.Router();
var dbconfig = require('../../dbconfig/albachaindb')();
var connection = dbconfig.init();
// var mysql      = require('mysql');
// var connection = mysql.createConnection(dbconfig);
var bcrypt = require('bcrypt');

const session = require('express-session');
// const FileStore = require('session-file-store')(session);

var fn = {};

fn.userinfo =  function (req, res, next) {
  var sql = 'SELECT * FROM m_userinfo WHERE id = ?' ;

  connection.query(sql,req.params.id,function(err, result) {
    if(!err){
      console.log('result value = ' + result);
      res.send(result);
    } else {
      console.log('Error');
      res.json({success: false, msg: 'err!'});
    }
  });
}


fn.signup = function (req, res, next) {
  console.log("m_signup function start");
  var sql_insert = 'INSERT INTO m_userinfo (id, password, name, gender, birth, phone_number, business_number) VALUES(?,?,?,?,?,?,?)';
  // var sql_check = 'SELECT * FROM m_userinfo WHERE `id`= ? or `business_number` = ?'
  var sql_check = 'SELECT * FROM m_userinfo WHERE `id`= ? '
  var bnum_check = 'SELECT * FROM m_userinfo WHERE `business_number` = ? '
  var bnum_check2 = 'SELECT * FROM store WHERE `business_number` = ? '
  const saltRounds = 5;

  console.log("m_signup function check1");
  console.log(req.body);

  var
   bnum = req.body.business_number,
   new_id = req.body.id,
   new_pw_hash = bcrypt.hashSync(req.body.password, saltRounds),
   params = [new_id, new_pw_hash , req.body.name ,req.body.gender, req.body.birth, req.body.phone_number, req.body.business_number];

   console.log("m_signup function check2");


   // 아이디 중복 체크
   connection.query(sql_check, new_id, function (err, result) {
     console.log("m_signup function connection id_check");
     console.log(result);
     if (err) {
         console.log('err :' + err);
         return res.json({success: false, msg: err});
       }else {
         if (result.length != 0) {
           console.log('아이디 중복!' );
           return res.json({success: false, msg: '아이디 중복입니다.'});
         }
       }
       console.log('id check - pass');


    // store테이블에서 등록된 사업자 번호 체크
    connection.query(bnum_check2, bnum, function(err, result){
      console.log("m_signup function connection business_number_check2");
      console.log(result);
      if (err) {
          console.log('err :' + err);
          return res.json({success: false, msg: err});
        }else {
          if (result.length == 0) {
            console.log('등록되지 않은 사업자번호!' );
            return res.json({success: false, msg: '등록되지 않은 사업자번호입니다.'});
          }
        }
        console.log('business_number check - pass');


    // 사업자 번호 중복 체크
    connection.query(bnum_check, bnum, function(err, result){
      console.log("m_signup function connection business_number_check");
      console.log(result);
      if (err) {
          console.log('err :' + err);
          return res.json({success: false, msg: err});
        }else {
          if (result.length != 0) {
            console.log('사업자번호 중복!' );
            return res.json({success: false, msg: '사업자번호 중복입니다.'});
          }
        }
        console.log('business_number check - pass');

    // 아이디 생성
    connection.query(sql_insert,params, function (err, result) {
      // console.log(new_pw_hash);
     if(err){
       console.log(err);
        res.json({success: false, msg: err});
      }
      else{
        console.log('새로운 아이디가 생성되었습니다. ==> ' + new_id);
        res.json({success: true, msg: 'signup success'});
      }
    });

    });
    });
  });
}

module.exports = fn;
