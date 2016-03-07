
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
		
		links = links.concat(this.evaluate(getLinks));
		
		for (var i = links.length - 1; i >= 0; i--) {
			// insert regex here
			// if (links[i] == '#') {
			// 	links[i] = '';
			// }
			// regex to find the links to clickthrough
			var re = new RegExp('www.susanegan.net\/.*');
			//var re2 = new RegExp('susanegan.net\/.*');
			if (re.test(links[i])) {
				this.echo(links[i]);
			}
			// 	//good, now add to new array
				
			// 	linksToCheck.push(links[i]);
			// 	console.log(linksToCheck[i])
			// 	//this.echo(linksToCheck[i]);
			// 	var output = linksToCheck[i]
			// 	//console.log(output.toString());
			// 	//this.test.assertUrlMatch(output, 'New location is ' + this.getCurrentUrl());
			// }

			// regOk = RegExp('www.susanegan.net\/.*').test(links[i]);
			// 	if (regOk) {
			// 		this.test.assertUrlMatch(regOk, 'New location is ' + this.getCurrentUrl());					
			// 	}
			
		}
		
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