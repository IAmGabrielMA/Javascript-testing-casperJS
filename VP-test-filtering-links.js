
var baseURL = 'http://www.susanegan.net'
var links = [];
var linksToCheck = [];

casper.test.begin('TEST: init testing ' + baseURL, function(){

	function getLinks(){
		links = document.querySelectorAll('a');
		return Array.prototype.map.call(links, function(e){
			return e.getAttribute('href');
		});
	}

	casper.start(baseURL, function(){
		// casper.start must be here or returns an error stack not provided
		console.log('testing');

	});

	casper.then(function(){
		// comma separated strings for all the links in the website
		links = links.concat(this.evaluate(getLinks));

		// =========================
		// FILTER WAY 2: BETTER WAY TO DEAL WITH FILTERED VALID LINKS
		var validElements = []
		var re = new RegExp('www.susanegan.net\/.*');

		function replaceElement(element, index, array){

			if (re.test(element)) {
				validElements.push(array[index]);
			}
		}
		links.forEach(replaceElement);
		//console.log(validElements);
		// from here we have a array with all the valid pages we must check
		//this.test.assertUrlMatch(validElements[0], 'New location is ' + this.getCurrentUrl()); //pass
		//this.test.assertUrlMatch(validElements[1], 'New location is ' + this.getCurrentUrl()); //fail because we must click first and change page
		// PROBLEM NOW: ~~do it recursively~~solved with casper.each()
		
		casper.each(validElements, function(self, validElement){
			self.thenOpen(validElement, function(){
				this.echo(this.getTitle());
				this.test.assertUrlMatch(validElement, 'New location is ' + this.getCurrentUrl());
			});
		});

		// this does not works for some reason		
		// for (var i = 0; i >= validElements.length - 1; i++) {
		// 	//console.log(validElements[i]);
		// 	this.test.assertUrlMatch(validElements[i], 'New location is ' + this.getCurrentUrl());
		// }

		// =========================

		// =========================
		// FILTER WAY 1: WORKS
		//for (var i = links.length - 1; i >= 0; i--) {
			// prints out all the links
			//this.echo(links[i]);

			// prints out the valid links
			// var re = new RegExp('www.susanegan.net\/.*');
			// if (re.test(links[i])) {
			// 	this.echo(links[i]);
			// }
			
		//}
		// =========================
	});


// 	casper.then(function(){
// 		// WIP ABOUT
// 		//this.clickLabel('About', 'a');
		
// 		this.test.assertUrlMatch(/susanegan.net\/about\//, 'New location is ' + this.getCurrentUrl());
// 		//this.test.assertUrlMatch(/contact/, 'New location is ' + this.getCurrentUrl());

// 		// cascade clicking as I find better solution, maybe through the link locator function
// 		this.clickLabel('Calendar', 'a');
		
// 	});

// 	casper.then(function(){

// 		this.test.assertUrlMatch(/susanegan.net\/appearances\//, 'New location is ' + this.getCurrentUrl());
// 		// cascade clicking as I find better solution, maybe through the link locator function
// 		this.clickLabel('Contact', 'a');
// 	});

// 	casper.then(function(){

// 		this.test.assertUrlMatch(/susanegan.net\/contact\//, 'New location is ' + this.getCurrentUrl());
// 	});
});

casper.run(function(){
	casper.test.done();
});