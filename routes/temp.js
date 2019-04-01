var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var dbconfig   = require('../dbconfig/tempdb.js');
var connection = mysql.createConnection(dbconfig);


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  var select = 'SELECT * FROM tempdata'
  connection.query(select, function(err, rows) {
    if(err) {
      console.log('err : '+err);
      res.json({success: false, msg : 'do not send your information'});
    } else{
      console.log('update_success_get');
      console.log(rows);
      res.json({success: true, msg : 'update success', body: [rows[0]] });
    }
  });
});


router.post('/', function(req, res, next) {
  var insert = 'INSERT INTO tempdata ( Temperature, Umidita) VALUES(?,?)';
  var param = [req.body.Temperature, req.body.Umidita];
  connection.query(insert,param, function(err, rows) {
    if(err) {
      console.log('err : '+err);
      res.json({success: false, msg : 'do not send your information'});
    } else{
      console.log('update_success_post');
      res.json({success: true, msg : 'update success'});
    }
  });
});


module.exports = router;
