var config = require('160323wip-lbi-config.json');
//var baseURL = config.urlDev;
var devURL = config.urlDev;
var productionURL = config.urlProduction;
var website = config.website;
paginationLinks = [];


casper.test.begin('Testing prod version of ' + website, function(){

	casper.start(productionURL, function(){
			
		console.log('checking prod');
		casper.test.assertUrlMatch('http://www.businessreport.com', 'businessreport.com is live');

	});
		//ok
	// 	casper.start(productionURL, function(){
	// 		console.log('checking sidebar sign me up');
	// 		if (this.visible('.small-newsletter-container')) {
	// 			this.test.assert(true, 'small-newsletter-container container is visible');
	// 		} else {
	// 			this.test.assert(false, 'small-newsletter-container container is not visible');			
	// 		}
	// });
	//stuck all the time
	/* puede que falle porque estoy usando dos webs diferentes? */
	casper.then(function(){
		
	// 	casper.test.begin('Testing prod version of ' + website, function(){		
			casper.start(productionURL, function(){
			console.log('checking prod');
			casper.test.assertUrlMatch('https://www.businessreport.com/', 'businessreport.com is prod');
		});
	// 	});
	});
});

// casper.test.begin('checking sidebar sign me up ' + website, function(){

// 	casper.start(productionURL, function(){
// 			console.log('checking sidebar sign me up');
// 			if (this.visible('.small-newsletter-container')) {
// 				this.test.assert(true, 'small-newsletter-container container is visible');
// 			} else {
// 				this.test.assert(false, 'small-newsletter-container container is not visible');			
// 			}
// 	});
// });

casper.run(function(){
	casper.test.done();
});