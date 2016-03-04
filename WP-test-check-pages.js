var baseURL = 'http://dev.gabrielmaldonado.me'

// Access to login and try a wrong username and password
casper.test.begin('TEST: Checking if the pages are in good standing', function(){

	casper.start(baseURL, function(){
		// check if title empty
		this.test.assert(this.getTitle()!='', 'Title exists!');
		//console.log('Page: ' + this.echo(this.getTitle()));
		console.log('Page: ' + this.echo(this.getTitle()));
		//check if baseURL +  /web-development/ exists
	});

});

casper.run(function(){
	casper.test.done();
});