var baseURL = 'http://www.susanegan.net'
var images = [];

casper.test.begin('TEST: init testing resource checker ' + baseURL, function(){

	// grab all the images in the site
	function getImages(){
		images = document.querySelectorAll('img');
		return Array.prototype.map.call(images, function(e){
			console.log(images);
			return e.getAttribute('src');
		});
	}
	

	casper.start(baseURL, function(){
		console.log('resource check homepage...');

		// check specific resources
		if (this.resourceExists('softly4.jpg')) {
    	    this.echo(' loaded');
    	} else {
    	    this.echo(' not loaded', 'ERROR');
    	}
    	if (this.resourceExists('logo.png')) {
    	    this.echo(' logo loaded');
    	} else {
    	    this.echo(' logo not loaded', 'ERROR');
    	}

    	console.log('changing to about page...');
    });

	// prints out all the images in the site
    casper.then(function(){
		images = images.concat(this.evaluate(getImages));
		console.log(images);
	});

    // check specific resource 
    casper.then(function(){
    	this.clickLabel('About', 'a');
    	casper.then(function(){
    		if (this.resourceExists('Susan-145-300x199.jpg')) {
    		    this.echo(' loaded');
	    	} else {
	    	    this.echo(' not loaded', 'ERROR');
	    	}
    	});
    });
});

casper.run(function(){
	casper.test.done();
});