var dbconfig = require('../../dbconfig/albachaindb')();
var connection = dbconfig.init();
var bcrypt = require('bcrypt');
const session = require('express-session');

var fn = {};

fn.storepush =  function (req, res, next) {
  var sql = 'SELECT * FROM m_registration';

  connection.query(sql, function(err, data) {
      if(!err){
        res.send(data);
        // res.json({success: true, result: data});
      } else {
        console.log('Error');
        res.json({success: false, msg: 'err!'});
      }
  });
}

fn.storeup = function (req, res, next) {
  console.log("m_storeup function start");

  var sql_insert = 'INSERT INTO m_registration (business_number, store_name, call_number, address, store_number) VALUES(?,?,?,?,?)';
  // var sql_check = 'SELECT * FROM m_userinfo WHERE `id`= ? or `business_number` = ?'
  var snum_check = 'SELECT * FROM m_registration WHERE `store_number`= ? '
  var bnum_check = 'SELECT * FROM store WHERE `business_number` = ? '
  const saltRounds = 5;

  console.log("m_storeup function check1");
  console.log(req.body);

  var
   bnum = req.body.business_number,
   snum = req.body.store_number,
   // new_pw_hash = bcrypt.hashSync(req.body.password, saltRounds),
   params = [bnum, req.body.store_name , req.body.call_number ,req.body.address, snum];

   console.log("m_storeup function check2");



    // store테이블에서 등록된 사업자 번호 체크
    connection.query(bnum_check, bnum, function(err, result){
      console.log("m_storeup function connection business_number_check");
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


    // 가게 고유 번호 중복 체크
    connection.query(bnum_check, snum, function(err, result){
      console.log("m_storeup function connection store_number_check");
      console.log(result);
      if (err) {
          console.log('err :' + err);
          return res.json({success: false, msg: err});
        }else {
          if (result.length != 0) {
            console.log('가게고유번호 중복!' );
            return res.json({success: false, msg: '가게고유번호 중복입니다.'});
          }
        }
        console.log('business_number check - pass');

    // 가게 생성
    connection.query(sql_insert,params, function (err, result) {
      // console.log(new_pw_hash);
     if(err){
       console.log(err);
        res.json({success: false, msg: err});
      }
      else{
        console.log('새로운 가게가 생성되었습니다. ==> ' + req.body.store_name);
        res.json({success: true, msg: 'storeup success'});
      }
    });

    });
  });
}

module.exports = fn;
