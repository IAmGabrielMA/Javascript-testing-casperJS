/* 
OBJECTIVES:
# click links from page to page
# check the existence of different elements on the page and make sure is rendering
*/

// Fill the baseURL variable, removed from public repo
var baseURL = 'http://www.susanegan.net'
var links = [];

casper.test.begin('TEST: init testing ' + baseURL, function(){

	// Get all the links in the (?) website, (?) homepage?
	function getLinks(){
		links = document.querySelectorAll('a');
		return Array.prototype.map.call(links, function(e){
			return e.getAttribute('href');
		});
	}
	// title of the baseURL
	casper.start(baseURL, function(){
		this.test.assert(this.getTitle()!='', 'Title exists!');
		console.log('Page: ' + this.echo(this.getTitle()));

		});
	// OK number of links found + print them in the terminal
	casper.then(function(){
		console.log('Looking for the links...');
		links = links.concat(this.evaluate(getLinks));
		this.echo(links.length + ' links found');
	});

	// OK check the existence of main blocks in the homepage
	casper.then(function(){
		
		console.log('Testing existence of main blocks');
    	this.test.assertExists('header.page-header')
    	this.test.assertExists('nav.menu')
    	this.test.assertExists('main.content');
    	this.test.assertExists('aside.anuncios');
		this.test.assertExists('div.footer-content');

		this.clickLabel('About', 'a');

	});
	// If I write it here is a non-existent selector, however works inside the previous then() function
	//casper.clickLabel('Calendar', 'a');
	casper.then(function(){
		// WIP ABOUT
		//this.clickLabel('About', 'a');
		
		this.test.assertUrlMatch(/susanegan.net\/about\//, 'New location is ' + this.getCurrentUrl());
		//this.test.assertUrlMatch(/contact/, 'New location is ' + this.getCurrentUrl());
		
	});
});

casper.run(function(){
	casper.test.done();
});