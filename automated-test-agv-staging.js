
var baseURL = 'http://staging.amazinggracevineyard.com/'
var links = [];
var linksToCheck = [];

casper.test.begin('Testing staging version of ' + baseURL, function(){

	/*
	*	Grab all the links in the website
	*/
	function getLinks(){
		links = document.querySelectorAll('a');
		return Array.prototype.map.call(links, function(e){
			return e.getAttribute('href');
		});
	}

	/*
	*	Grab all the images in the website
	*/
	function getImages(){
		images = document.querySelectorAll('img');
		return Array.prototype.map.call(images, function(e){
			console.log(images);
			return e.getAttribute('src');
		});
	}

	/*
	*	Casper start
	*/
	casper.start(baseURL, function(){

		console.log('Checking that all the pages are in good standing...');

	});

	/*
	*	Grabs all the URL's and filter the ones we must check
	*/
	casper.then(function(){

		links = links.concat(this.evaluate(getLinks));
		var validElements = []
		var re = new RegExp('http://staging.amazinggracevineyard.com\/.*');

		function replaceElement(element, index, array){

			if (re.test(element)) {
				validElements.push(array[index]);
			}
		}
		links.forEach(replaceElement);
		
		/*
		*	Loop through all the valid pages and check we are in the correct one
		*/
		casper.each(validElements, function(self, validElement){
			self.thenOpen(validElement, function(){
				console.log('Moving to: ' + this.getTitle() + '...');
				this.test.assertUrlMatch(validElement, 'New location is ' + this.getCurrentUrl());				

				/*
				*	Checks if the DOM element matching class="content" is visible
				*/
				casper.then(function(){
			        
			        if (this.visible('.content')) {
			            casper.test.assert(true, "Content is rendering correctly");
			        } else {
			        	casper.test.assert(false, "Content is not rendering at " + this.getCurrentUrl());
			        }
			    });

				/*
				*	Check social media icon at the footer of each page.
				*/
				casper.then(function(){
					//.fb-like
					//.fb-like
					if (this.visible('.fb-like') ) {					
						casper.test.assert(true, "Footer is rendering correctly");
					} else{
						casper.test.assert(false, "Footer is not rendering at " + this.getCurrentUrl());
					}
				});
			});
		});

	});

});

casper.run(function(){
	casper.test.done();
});