var helpers = require( '../_helpers.js' )
    baseUrl = helpers.getUrl( casper.cli.options.env, casper.cli.options.site );

var paginationLinks = [];

casper.test.begin('Suite #6: Checking Pagination',function suiteTwo(){

	casper.start( baseUrl, function(){

		function getPaginationLinks(){
			paginationLinks = document.querySelectorAll('a.page-numbers');
			return Array.prototype.map.call(paginationLinks, function(e){
				return e.getAttribute('href');
			});
		}

		casper.then(function(){

			console.log('---- Checking Pagination ----');
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
	});

	casper.run(function() {
        casper.test.done();
    });
});

casper.run(function(){
	casper.test.done();
});
