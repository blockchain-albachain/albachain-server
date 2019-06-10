var dbconfig = require('../../dbconfig/albachaindb')();
var connection = dbconfig.init();
var bcrypt = require('bcrypt');
const session = require('express-session');

var fn = {};

// 알바 홈화면에 계약된 가게 확인
fn.contractStorePush =  function (req, res, next) {
  // var sql = 'SELECT *from contract JOIN m_registration on contract.store_number=m_registration.store_number';
  var sql = 'SELECT *from contract';

  console.log("contractSotrePush function start");

  connection.query(sql, function(err, data) {
      if(!err){
        res.send(data);
      } else {
        console.log('Error');
        res.json({success: false, msg: 'err!'});
      }
  });
}


// 사장 관리화면에 신청된 계약서 확인
fn.contractPush =  function (req, res, next) {
  var sql = 'SELECT * FROM contract';
  console.log("contractPush function start");

  connection.query(sql, function(err, data) {
      if(!err){
        res.send(data);
      } else {
        console.log('Error');
        res.json({success: false, msg: 'err!'});
      }
  });
}

// 사장 신청된 계약서 승인
fn.contractSuccess =  function (req, res, next) {
  var sql = 'UPDATE contract SET checking = 1 where `store_number` = ?';
  console.log("contractSuccess function start");
  console.log(req.body);
  connection.query(sql, req.body.store_number, function(err, data) {
      if(!err){
        res.json({success: true, msg: 'check change 1'});
      } else {
        console.log(err);
        res.json({success: false, msg: 'err!'});
      }
  });
}



// 알바생이 계약 신청
fn.contractUp = function (req, res, next) {
  console.log("contractUp function start");

  var sql_insert = 'INSERT INTO contract (pay, workingDay, workingTime, account, store_number, period, userid, checking) VALUES(?,?,?,?,?,?,?,?)';
  //var sql_check = 'SELECT * FROM contract WHERE `id`= ? AND `store_number` = ?'
  var sql_check = 'SELECT * FROM contract WHERE `store_number` = ?'

  // var snum_check = 'SELECT * FROM m_registration WHERE `store_number`= ? '
  var registration_check = 'SELECT * FROM m_registration WHERE `store_number` = ? '
  const saltRounds = 5;

  console.log("contractUp function check1");
  console.log(req.body);

  var
   // check = [req.body.userid, req.body.store_number]
   stroeNumCheck = req.body.store_number
   // new_pw_hash = bcrypt.hashSync(req.body.password, saltRounds),
   params = [req.body.pay , req.body.workingDay ,req.body.workingTime, req.body.account, req.body.store_number, req.body.period, req.body.userid, 0];

   console.log("contractUp function check2");



    // contract테이블에서 신청된 계약 체크
    connection.query(sql_check, stroeNumCheck, function(err, result){
      console.log("contractUp function connection check");
      if (err) {
          console.log('err :' + err);
          return res.json({success: false, msg: err});
        }else {
          if (result.length != 0) {
            console.log('이미 계약 신청한 가게입니다!' );
            return res.json({success: false, msg: '계약 신청한 가게 입니다.'});
          }
        }
        console.log('contract table store_number check - pass');


        // m_registration테이블에서 store_number 존재 확인
        connection.query(registration_check, stroeNumCheck, function(err, result){
          console.log("comparable m_registration table");
          if (err) {
              console.log('err :' + err);
              return res.json({success: false, msg: err});
            }else {
              if (result.length == 0) {
                console.log('등록되지 않은 가게입니다!' );
                return res.json({success: false, msg: '등록되지 않은 가게입니다!'});
              }
            }
            console.log('m_registration table store_number check - pass');



                // 계약 신청 생성
                connection.query(sql_insert,params, function (err, result) {
                  // console.log(new_pw_hash);
                 if(err){
                   console.log(err);
                    res.json({success: false, msg: err});
                  }
                  else{
                    console.log('새로운 계약이 신청되었습니다. ==> ' + req.body.store_name);
                    res.json({success: true, msg: 'storeup success'});
                  }
                });
            });
      });
}

module.exports = fn;
