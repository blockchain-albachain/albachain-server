var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passportConfig = require('./function/funUsers/passport');
const flash = require('connect-flash');
const passport = require('passport')
        , LocalStrategy = require('passport-local').Strategy;
// var session = require('express-session'); //세션연결
var mpassportConfig = require('./function/funUsers/Mpassport');
var cookieSession = require('cookie-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var musersRouter = require('./routes/musers');
var mregistrationRouter = require('./routes/mregistration');
var contractRouter = require('./routes/contract');
var smartContractRouter = require('./routes/smartContract');


// DB connection
var dbconfig = require('./dbconfig/albachaindb')();
var connection = dbconfig.init();
dbconfig.start_db(connection);
connection.on('error', function() {})


var app = express();

/* session middleware */
app.use(cookieSession({
  cookie: { maxAge: 1000 * 60 * 60 // 1h
    , httpOnly: true
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
passportConfig();
mpassportConfig();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// device server 접속 허용
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// var bodyParser = require("body-parser");
// var mysql = require('mysql');
// var router = express.Router();
// var bcrypt = require('bcrypt');

// Parse application/json inputs.
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json());
// app.set("json spaces", 4);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/musers', musersRouter);
app.use('/mregistration', mregistrationRouter);
app.use('/contract', contractRouter);
app.use('/smartContract', smartContractRouter);


// smartContract 부분
var Web3 = require('web3');

///
var contractAddress = '0x9121142019ffe11e66d455216038586af5eb4aae';
var abi = [
	{
		"constant": false,
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_receivedUserAddress",
				"type": "address"
			}
		],
		"name": "setReceivedUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_sendUserAddress",
				"type": "address"
			}
		],
		"name": "setSendUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getReceivedMoney",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getReceivedUser",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getSendUser",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "receivedUserAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "sendUserAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
// global.addEventListener('load', function() {
  // web3 = new Web3(web3.currentProvider);
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// });
simpleStorageContract = web3.eth.contract(abi);
simpleStorage = simpleStorageContract.at(contractAddress);
web3.eth.defaultAccount = web3.eth.accounts[0]; // 기본 주소(defaultAccount)를 정해줘야 한다.
///



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
