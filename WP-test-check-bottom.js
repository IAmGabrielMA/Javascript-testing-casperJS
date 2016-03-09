/*
This script looks for the social media icons at the footer of each page, the reason is that they're at the bottom of the site's HTML, if there's a PHP error, PHP will stop rendering as the full HTML, telling us that might be an error.
*/


var baseURL = 'http://www.susanegan.net/'
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

		console.log('testing');

	});

	casper.then(function(){

		links = links.concat(this.evaluate(getLinks));

		var validElements = []
		var re = new RegExp('http://www.susanegan.net\/.*');

		function replaceElement(element, index, array){

			if (re.test(element)) {
				validElements.push(array[index]);
			}
		}
		links.forEach(replaceElement);
		
		casper.each(validElements, function(self, validElement){
			self.thenOpen(validElement, function(){
				
				this.echo(this.getTitle());
				this.test.assertUrlMatch(validElement, 'New location is ' + this.getCurrentUrl());
				casper.then(function(){
					
					if (this.visible('.fa-facebook') && this.visible('.fa-youtube') && this.visible('.fa-twitter') ) {					
						casper.test.assert(true, "Footer is rendering correctly");
					} else{
						casper.test.assert(false, "Footer is not rendering");
					}

				});
			});
		});

	});

});

casper.run(function(){
	casper.test.done();
});