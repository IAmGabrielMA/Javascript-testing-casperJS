
var baseURL = 'http://www.susanegan.net'
var links = [];

casper.test.begin('TEST: Navigating through ' + baseURL, function(){

	casper.start(baseURL, function checkHomePageElementsAndNavigate(){

		this.echo('Page loaded...');
		// WAY 1: Check main blocks of the HomePage, a test
		// this.test.assertExists('header.page-header')
  		// this.test.assertExists('nav.menu')
  		// this.test.assertExists('main.content');
		// this.test.assertExists('div.footer-content');
		// this.test.assertExists('aside.anuncios');

		// WAY 2: Check main blocks of the HomePage, not a test, just true/false thingy
		if (this.exists('header.page-header')) {
			this.echo('Home 1/5 ok ');
		}
		if (this.exists('nav.menu')) {
			this.echo('Home 2/5 ok');
		}
		if (this.exists('main.content')) {
			this.echo('Home 3/5 ok');
		}
		if (this.exists('div.footer-content')) {
			this.echo('Home 4/5 ok');
		}
		if (this.exists('aside.anuncios')) {
			this.echo('Home 5/5 ok');
		}

		// Move to the next page
		this.echo('Clicking on "About" button...');
		this.clickLabel('About', 'a');
		
		casper.then(function checkAboutPageElementsAndNavigate(){
			
			this.test.assertUrlMatch(/susanegan.net\/about\//, 'New location -> ' + this.getCurrentUrl());
			
			casper.then(function checkAboutPageElements(){

				this.test.assertExists('header.page-header')
    			this.test.assertExists('nav.menu')
    			this.test.assertExists('main.content');
				this.test.assertExists('div.footer-content');

			});
			// Move to the next page
			this.echo('Clicking on "Calendar" button...');
			this.clickLabel('Calendar', 'a');
			// fix: in the console shows this message when the previous tests are still running but not completed.
		});

		casper.then(function checkCalendarPageElementsAndNavigate(){

			this.test.assertUrlMatch(/susanegan.net\/appearances\//, 'New location -> ' + this.getCurrentUrl());
			// Move to the next page
			this.echo('Clicking on "Contact" button...');
			this.clickLabel('Contact', 'a');
		});

		casper.then(function checkContactPageElementsAndNavigate(){
			this.test.assertUrlMatch(/susanegan.net\/contact\//, 'New location -> ' + this.getCurrentUrl());
		});

		casper.then(function getAllTheLinksAndPlay(){

			// gets all the links in the website
			function getLinks(){
				links = document.querySelectorAll('a');
				return Array.prototype.map.call(links, function(e){
					return e.getAttribute('href');
				});
			}
			
			// filter the correct ones
			links = links.concat(this.evaluate(getLinks));
			
			for (var i = links.length - 1; i >= 0; i--) {
				var re = new RegExp('www.susanegan.net\/.*');
			
				if (re.test(links[i])) {
					this.echo(links[i]);
					var output = links[i];
					console.log(typeof output);
					// This asserts fails due to "assertUrlMatch() only accepts strings or regexps", maybe assertUrlMatch() is not the best choice. 
					// casper.then(function checkEachURL(output){
					// 	this.test.assertUrlMatch(links[i], 'New location -> ' + this.getCurrentUrl());	
					// });
				}
			}
		});

	});

});

casper.run(function(){
	casper.test.done();
});