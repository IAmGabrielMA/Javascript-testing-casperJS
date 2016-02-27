//var casper  = require('casper').create(); 
/* 
casper instance cannot be overwritten
*/

var url = 'http://stocksncode.com/wp-admin'

casper.start(url, function(){
	// page found?
	console.log('page loaded');
	// login form found?
	this.test.assertExists('form#loginform','form found!');
	// fill the form
	this.fill('form#loginform', {
		// fill with login details
		log: '',
		pwd: ''
	}, true);
	// test the title
	this.test.assertTitle("StocksnCode › Log In", "stockncode homepage title is the one expected");

});

// casper.then(function(test){
// 	test.assertTitle('stocksncode title', 'title is ok');
// });

// casper.thenEvaluate(function(){
// 	console.log('Page title ' + document.title);

// });

casper.run();
/* EXECUTE WITH $CASPERJS TEST FILE-NAME.JS */