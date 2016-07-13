var config = require('160323wip-lbi-config.json');
// staging retrieves 0 links, maybe for the security step involved?
//var baseURL = config.urlStaging;
//var baseURL = config.urlDev;
var baseURL = config.urlProduction;
var website = config.website;
paginationLinks = [];

casper.test.begin('Suite #2: Checking widgetized areas',function suiteTwo(){



	casper.start(config.urlProduction, function(){

		function getPaginationLinks(){
			paginationLinks = document.querySelectorAll('a.page-numbers');
			return Array.prototype.map.call(paginationLinks, function(e){
				return e.getAttribute('href');
			});
		}

		//var paginationLinksToCheck = [];
		casper.then(function(){
					console.log('------------------- Checking Pagination -------------------');

		paginationLinks = paginationLinks.concat(this.evaluate(getPaginationLinks));
	 	console.log('There are ' + paginationLinks.length + ' pagination links:');

	 	for (var i = paginationLinks.length; i > 0; i--) {
		 	if (paginationLinks[i] == undefined) {
		 		console.log('· current page-number')
		 	} else {
		 		console.log('· ' + paginationLinks[i]);	
		 	}
		 	//paginationLinksToCheck.push()
	 	}

	 	/* clickable? */
	 	casper.each(paginationLinks ,function(self, paginationLink){
	 		if (casper.clickLabel(paginationLink, 'a') == true) {
	 			casper.assert(true, i + '/' + paginationLinks.length + ' ' + paginationLink + ' -> ' + casper.clickLabel(paginationLink, 'a'));
	 		}

	 	});
		});




	});

	casper.run(function() {
        casper.test.done();
    });
});

// first draft
/*
casper.test.begin('Testing development version of ' + website, function(){

	function getPaginationLinks(){
		
		paginationLinks = document.querySelectorAll('a.page-numbers');
		return Array.prototype.map.call(paginationLinks, function(e){
			return e.getAttribute('href');
		});
	}

	casper.start(baseURL, function(){
			
		console.log('checking pagination');
		//console.log('pre: ' + paginationLinks);

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
	 	// checking if there is 6 links
	 	if (paginationLinks.length == 6) {
			casper.test.assert(true, "pagination links loaded: " + paginationLinks.length);
				} else {
					casper.test.assert(false, "pagination is not working properly, links loaded: " + paginationLinks.length);
				}
		// checking if links are correct, 1 2 and 3 digits
		// https://www.businessreport.com/page/2
		//https://www.businessreport.com/page/22
		//https://www.businessreport.com/page/222
		
		

		var paginationLinksRegex = new RegExp('https://www.businessreport.com/page/\/.*');
		for (var i = paginationLinks.length; i > 0; i--) {
			if (paginationLinks[i] == undefined) {
				console.log('current page');
			}
			else if (paginationLinks[i] == paginationLinksRegex) {
				casper.test.assert(true, "pagination links are working");
			} else {
					casper.test.assert(false, "pagination is not working properly: " + paginationLinks);

			}			
		}
		console.log('regex: ' + paginationLinksRegex);



	});
});
*/
casper.run(function(){
	casper.test.done();
});