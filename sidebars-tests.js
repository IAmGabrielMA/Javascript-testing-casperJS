var config = require('160323wip-lbi-config.json');
var baseURL = config.urlDev;
var website = config.website;
paginationLinks = [];

casper.test.begin('Testing development version of ' + website, function(){

	casper.start(baseURL, function(){
			
		console.log('checking sidebars');
		//fail
		casper.then(function(){
			console.log('checking sidebar most read');
			if (this.visible('.most-read')) {
				this.test.assert(true, 'most-read container is visible');
			} else {
				this.test.assert(false, 'most-read container is not visible');	
			}
		});

		casper.then(function(){
			console.log('checking sidebar sign me up');
			if (this.visible('.small-newsletter-container')) {
				this.test.assert(true, 'small-newsletter-container container is visible');
			} else {
				this.test.assert(false, 'small-newsletter-container container is not visible');			
			}
		});
		// fail
		casper.waitForSelector('div.widget:nth-child(4)', function(){
		console.log('waiting...');
			if (this.visible('.most-read')) {
				this.test.assert(true, 'most-read container is visible');
			} else {
				this.test.assert(false, 'most-read container is not visible');	
			}		
		});
		//works
		casper.then(function(){
			if (this.exists('.most-read')) {
				console.log('found');
			} else {
				console.log('not found');
			}
		});

	});

	// outside casper start
	casper.waitForSelector('div.widget:nth-child(4)', function(){
		console.log('waiting...');
			if (this.visible('.most-read')) {
				this.test.assert(true, 'most-read container is visible');
			} else {
				this.test.assert(false, 'most-read container is not visible');	
			}		
	});
});

casper.run(function(){
	casper.test.done();
});