var express = require('express');
var router = express.Router();

// 처음 저장된 코인 보여주기 및 계좌 보여주기
router.get('/', function(req, res) {
	web3.eth.getAccounts(function(e,adress){
		simpleStorage.getReceivedMoney(function(e,coin){
			console.log("저장된 코인 coin: " + coin);
		});
	});
 res.send("done");
});

// -----------사장

// 사장 잔액 표시해주는 것.
router.get('/balance', function(req, res){
	console.log(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0])).c[0]);
	var balance = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0])).c[0];
	// res.send(balance);
	res.json({ result : balance});
})

// // 알바생 계좌 등록 하는 곳 (:address 부분에는 주소값을 입력해주어야 함)
// router.get('/inputAddress/:address', function(req, res){
// 	simpleStorage.setReceivedUser(req.params.address,function(e,r){
//         console.log("done" + r);
// 	});
// 	res.send("done");
// });
//
// // 사장이 컨트렉트에 코인을 올리는 곳 (:addcoin 뿌분에는 코인의 개수를 입력해 주어야 함)
// router.get('/setcoin/:addcoin', function(req, res){
// 	simpleStorage.deposit({value: web3.toWei(req.params.addcoin, 'ether')}, function(e, r){
// 		if(!e){
// 			console.log(r);
// 		}
//
// 	});
// 	res.send("done");
// });

router.get('/setinfo/:address/:addcoin', function(req, res){

	simpleStorage.setReceivedUser(req.params.address,function(e,r){
		if(!e){
			console.log("address : " + req.params.address);
		}
	});

	simpleStorage.deposit({value: web3.toWei(req.params.addcoin, 'ether')}, function(e, r){
		if(!e){
			console.log("send coin : " + req.params.addcoin);
		}

	});
	res.json({result: true});
})
// ---------------


// --------------알바생

// 현재 저장된 코인을 보여주는 곳
router.get('/coin', function(req, res){
	simpleStorage.getReceivedMoney(function(e,r){
		var coin = web3.fromWei(r, 'ether');
		console.log("저장된 코인 coin: " + r);
		res.send(coin);
	});
});

router.get('/alaccount', function(req, res){
	web3.eth.getAccounts(function(e,address){
		res.json({result: address[1]})
	});
})

router.get('/alblance', function(req,res) {
	console.log(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[1])).c[0]);
	var balance = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[1])).c[0];
	// res.send(balance);
	res.json({ result : balance});
})

// 컨트렉트에 올려있는 코인을 받는 곳.( 알바생한테 지급하는 곳 )
router.get('/tfcoin', function(req, res){
	simpleStorage.withdraw(function(e,r){

	})
	// res.send('지급완료 ');
	res.json({result: true});
})
// --------------------


// 순서 : / -> /inputAddress -> /setcoin -> /tfcoin ->

module.exports = router;
