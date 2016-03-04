var baseURL = 'http://dev.gabrielmaldonado.me'

// Access to login and try a wrong username and password
casper.test.begin('TEST: Checking if the pages are in good standing', function(){

	// array with the pages in the website
	websitePages = ['/web-development', '/seo', '/performance-speed-optimization', '/testimonials-and-feedback', '/contact'];

	//check homepage or base url
	casper.start(baseURL, function(){
		this.test.assert(this.getTitle()!='', 'Title exists!');
		console.log('Page: ' + this.echo(this.getTitle()));
	});

	//check the rest
	casper.then(function(){
		for (var i = websitePages.length - 1; i >= 0; i--) {
			casper.thenOpen(baseURL + websitePages[i], function(){
				this.test.assert(this.getTitle()!='', 'Title exists!');
				console.log('Page: ' + this.echo(this.getTitle()));		
			})
		}
	});

});

casper.run(function(){
	casper.test.done();
});