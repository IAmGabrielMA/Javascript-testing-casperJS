var config = require('160323wip-lbi-config.json');
var baseURL = config.urlProduction;

casper.test.begin('Suite #1', function suiteOne(){
	casper.start(config.urlProduction, function(){
		var getURL = casper.getCurrentUrl()
		console.log(getURL);
		if (getURL == 'https://www.businessreport.com/') {
			casper.test.assert(true, 'url is ok');
		} else {
			casper.test.assert(false, 'url is not ok');
		}
	});

	casper.run(function() {
        casper.test.done();
    });
});

casper.test.begin('Suite #2',function suiteTwo(){
	casper.start('http://www.google.co.jp', function(){
		var getURL = casper.getCurrentUrl()
		console.log(getURL);
		if (getURL == 'http://www.google.co.jp') {
			casper.test.assert(true, 'url is ok');
		} else {
			casper.test.assert(false, 'url is not ok');
		}
	});

	casper.run(function() {
        casper.test.done();
    });
});