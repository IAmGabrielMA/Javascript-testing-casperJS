var config = require('lbi-config.json');
var baseURL = config.urlProduction;
var site = config.site;
var links = [];
var paginationLinks = [];

casper.test.begin('Suite #1: Checking scaffolding, links, images and general structure', function suiteOne(){

	function getLinks(){
		links = document.querySelectorAll('a');
		return Array.prototype.map.call(links, function(e){
			return e.getAttribute('href');
		});
	}

	casper.start(config.urlProduction, function(){

		/* check all links */
		console.log('starting...');
		links = links.concat(this.evaluate(getLinks));
		console.log('A total of ' + links.length + ' links have been found.');

		// checks valid links
		casper.then(function(){
			console.log('cleaning up links...and locating valid ones to check');
			var validElements = [];
			var re = new RegExp('https://www.businessreport.com\/.*');

			function replaceElement(element, index, array){
				if (re.test(element)) {
					validElements.push(array[index]);
				}
			}
			links.forEach(replaceElement);

			console.log('A total of ' + validElements.length + ' links to pages have been found.');		
		});

		//header
		casper.then(function(){

			console.log('------------------- Checking Header Elements -------------------');

			if (this.visible('.header-logo')) {
				this.test.assert(true, '1/3 Logo is rendering correctly');
			} else {
				this.test.assert(false, 'Logo is not rendering correctly');	
			}
			if (this.visible('.header-search')) {
				this.test.assert(true, '2/3 Search bar is rendering correctly');
			} else {
				this.test.assert(false, 'Search bar is not rendering correctly');	
			}
			if (this.visible('.header-social')) {
				this.test.assert(true, '3/3 Social media icons are rendering correctly');
			} else {
				this.test.assert(false, 'Social media icons are not rendering correctly');	
			}
		});

		casper.then(function(){

			console.log('------------------- Checking Featured Article -------------------');

			if (this.visible('.big-article-image')) {
				this.test.assert(true, '1/2 Featured article image is rendering correctly');
			} else {
				this.test.assert(false, 'Featured article image is not rendering correctly');	
			}
			if (this.visible('.big-article-title')) {
				this.test.assert(true, '2/2 Featured article title is rendering correctly');
			} else {
				this.test.assert(false, 'Featured article title is not rendering correctly');	
			}
		});

		casper.then(function(){
			console.log('------------------- Checking 10 Articles Display -------------------');
			casper.test.assertElementCount('.article-list-article', 10, '10 articles has been found.');
		});

		casper.then(function(){
			var i = 1;
			console.log('------------------- Checking Top Navigation: Visible and Clickable? -------------------');
			var navTopLabels = ['Home', 'Business', 'Politics','Real Estate','Daily Report AM', 'Daily Report PM', 'Events'];
			casper.each(navTopLabels, function(self, navTopLabel){
				if (casper.clickLabel(navTopLabel, 'a') == true) {
					this.test.assert(true, i + '/' + navTopLabels.length + ' ' + navTopLabel + ' -> ' + casper.clickLabel(navTopLabel, 'a'));
				}
				i++;
			});
		});

		casper.then(function(){
			var i = 1;
			console.log('------------------- Checking Footer Items: Visible and Clickable? -------------------');
			var footerLabels = ['About Us', 'Contact Us', 'Terms of Use','Privacy Policy','Circulation', 'Advertising'];
			casper.each(footerLabels, function(self, footerLabel){
				if (casper.clickLabel(footerLabel, 'a') == true) {
					this.test.assert(true, i + '/' + footerLabels.length + ' ' + footerLabel + ' -> ' + casper.clickLabel(footerLabel, 'a'));
				}
				i++;
			});
			
		});

	});

	casper.run(function() {
        casper.test.done();
    });
});

casper.test.begin('Suite #2: Checking widgetized areas',function suiteTwo(){
	/* WORK IN PROGRESS -> FILE: pagination-tests.js*/ 
	function getPaginationLinks(){
		paginationLinks = document.querySelectorAll('a.page-numbers');
		return Array.prototype.map.call(paginationLinks, function(e){
			return e.getAttribute('href');
		});
	}

	casper.start(config.urlProduction, function(){

		console.log('------------------- Checking Pagination -------------------');

		paginationLinks = paginationLinks.concat(this.evaluate(getPaginationLinks));
	 	console.log('There are ' + paginationLinks.length + ' pagination links:');

	 	for (var i = paginationLinks.length; i > 0; i--) {
		 	if (paginationLinks[i] == undefined) {
		 		console.log('· current page-number')
		 	} else {
		 		console.log('· ' + paginationLinks[i]);	
		 	}
	 	}

	});

	casper.run(function() {
        casper.test.done();
    });
});

casper.test.begin('Suite #3: Checking infinite scrolling',function suiteThree(){
	casper.start(config.urlProduction, function(){

	});

	casper.run(function() {
        casper.test.done();
    });
});