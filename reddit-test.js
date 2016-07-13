urlToCheck = 'http://www.reddit.com/r/programming'
casper.options.waitTimeout = 10000;
// var casper = require('casper').create ({
//     waitTimeout: 10000,
//     stepTimeout: 10000
// });

casper.test.begin('This is a test', function(){
	casper.start(urlToCheck ,function(){
		casper.test.assertTitleMatch(/programming/, 'Title is as expected');
		casper.click("a[href*='/programming/new/']");
		
		/* ================ */
		casper.waitForUrl(/\/programming\/new\/$/ ,function(){
			casper.test.assertElementCount('p.title', 25, '25 links has been found');
		});
		/* ================ */

	}).run(function(){
		casper.test.done();
	});
});