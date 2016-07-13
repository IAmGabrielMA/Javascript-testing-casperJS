/*
Business Report have categories along the top, a featured article at the top, then the articles as you scroll down
same within each category
no infinite scrolling here

1) check if 404
2) check if everything is visible/exists
3) check if everything works

*/

// info for the base url
var config = require('160323wip-lbi-config.json');

//var baseURL = 'http://dev.businessreport.com/';
//var baseURL = config.urlDev;
var baseURL = config.urlProduction;

links = [];
paginationLinks = [];

casper.test.begin('Testing ' + baseURL, function(){

	// get all links
	function getLinks(){
		links = document.querySelectorAll('a');
		return Array.prototype.map.call(links, function(e){
			return e.getAttribute('href');
		});
	}
	// get all pagination links
	function getPaginationLinks(){
		paginationLinks = document.querySelectorAll('a.page-numbers');
		return Array.prototype.map.call(paginationLinks, function(e){
			return e.getAttribute('href');
		});
	}

	// checks all links
	casper.start(baseURL, function(){
		console.log('starting...');
		links = links.concat(this.evaluate(getLinks));
		for (var i = links.length - 1; i >= 0; i--) {
			console.log(links[i]);
		}
		console.log('total of ' + links.length + ' links have been found.');

		// checks valid links
		casper.then(function(){
			console.log('cleaning up links...and locating valid ones to check');
			var validElements = [];

			/* There is a 'problem' here s RegExp does not accept a variable passing through the string so it have to be hardcoded to filter the right links, tryed concatenation and ecmascript6 `${baseURL}` and sprintf() */
			var re = new RegExp('https://www.businessreport.com\/.*');
			//var re = new RegExp(sprintf('%s\/.*'), baseURL);

			function replaceElement(element, index, array){
				if (re.test(element)) {
					validElements.push(array[index]);
				}
			}
			links.forEach(replaceElement);
			for (var i = validElements.length - 1; i >= 0; i--) {
				console.log(validElements[i]);
			}
			console.log('total of ' + validElements.length + ' valid links have been found.');		
		});

		//header
		casper.then(function(){
			console.log('checking header, 3 tests');

			// 1/3 logo
			if (this.visible('.header-logo')) {
				this.test.assert(true, 'Logo is rendering correctly');
			} else {
				this.test.assert(false, 'Logo is not rendering correctly');	
			}
			// 2/3 search bar
			if (this.visible('.header-search')) {
				this.test.assert(true, 'Search bar is rendering correctly');
			} else {
				this.test.assert(false, 'Search bar is not rendering correctly');	
			}
			// 3/3 social media icons
			if (this.visible('.header-social')) {
				this.test.assert(true, 'Social media icons are rendering correctly');
			} else {
				this.test.assert(false, 'Social media icons are not rendering correctly');	
			}
		});

		//featured article at the top
		casper.then(function(){
			console.log('checking featured article, 2 tests');

			// 1/3 image
			if (this.visible('.big-article-image')) {
				this.test.assert(true, 'Featured article image is rendering correctly');
			} else {
				this.test.assert(false, 'Featured article image is not rendering correctly');	
			}
			// 2/3 title
			if (this.visible('.big-article-title')) {
				this.test.assert(true, 'Featured article title is rendering correctly');
			} else {
				this.test.assert(false, 'Featured article title is not rendering correctly');	
			}
		});

		// FAIL (WIDGET)
		casper.then(function(){
			console.log('checking sign me up');
			if (this.visible('.newsletter')) {
				this.test.assert(true, 'Newsletter container is visible');
			} else {
				this.test.assert(false, 'Newsletter container is not visible');	
			}
		});
		// top stories (10 stories)
		casper.then(function(){
			console.log('checking if 10 articles are here...');
			casper.test.assertElementCount('.article-list-article', 10, '10 articles has been found');
			
			// var info = casper.getElementsInfo(".article-list-article");
			// for (var i = info.length; i > 0; i--) {
			// 	casper.echo("Is " + i + "/" + i + " visible? " + info[0].visible);
			// }
		});
		// categories at the top.
		/*
		Weird behavior ->
		The test will not pass if we test first the navigation links are the footer
		Is ok if we do it in order, first top navigation links and later footer links */
		casper.then(function(){
			console.log('checking navigation top');
			console.log('checking if 7 top items are here and are clickable');
			var navTopLabels = ['Home', 'Business', 'Politics','Real Estate','Daily Report AM', 'Daily Report PM', 'Events'];
			casper.each(navTopLabels, function(self, navTopLabel){
				console.log( navTopLabel + ' -> ' + casper.clickLabel(navTopLabel, 'a'));
			});
		});
		//footer: about us, contact us, terms of use, privacy policy, circulation, advertising (different one) 
		// 6 nav items, <a>
		casper.then(function(){
			console.log('checking footer');
			console.log('checking if 6 footer items are here and are clickable');
			var footerLabels = ['About Us', 'Contact Us', 'Terms of Use','Privacy Policy','Circulation', 'Advertising'];
			casper.each(footerLabels, function(self, footerLabel){
				console.log( footerLabel + ' -> ' + casper.clickLabel(footerLabel, 'a'));
			});
			
		});
		//pagination -> doesn't load all of them 
		casper.then(function(){ 
			console.log('checking pagination');

			paginationLinks = paginationLinks.concat(this.evaluate(getPaginationLinks));
	 		console.log('there are ' + paginationLinks.length + ' pagination links:');

	 		for (var i = paginationLinks.length; i > 0; i--) {
		 		//current page number does not have a link asociated, will enter as an undefined value into the array when running getPaginationLinks()
		 		if (paginationLinks[i] == undefined) {
		 			console.log('· current page-number')
		 		} else {
		 			console.log('· ' + paginationLinks[i]);	
		 		}
	 		}

		});
		// FAIL (WIDGET)
		casper.then(function(){
			console.log('checking sidebar most read');
			if (this.exists('.most-read')) {
				this.test.assert(true, 'most-read container exists');
			} else {
				this.test.assert(false, 'most-read container does not exists');	
			}
		});
		// FAIL (WIDGET)
		casper.then(function(){
			console.log('checking sidebar sign me up');
			if (this.visible('.small-newsletter-container')) {
				this.test.assert(true, 'small-newsletter-container container is visible');
			} else {
				this.test.assert(false, 'small-newsletter-container container is not visible');			
			}
		});
	});

//[Daily Report AM] category have infinite scrolling

//[Daily Report PM] category have infinite scrolling



});

casper.run(function(){
	casper.test.done();
});
//fs.write(myfile, this.getPageContent(),'w');

