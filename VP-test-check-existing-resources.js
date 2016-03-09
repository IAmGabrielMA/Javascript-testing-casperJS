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
            //var resource = 'logo';
            // casper.test.assertResourceExists(function(resource) {
            //     return resource.url.match('logo.png');
            // });
            casper.test.assertVisible('img.logo');

    	} else {
    	    this.echo(' logo not loaded', 'ERROR');
    	}

    	//console.log('changing to about page...');
    	// here we would do a casper.then() and change page to check
    });

	// prints out all the images in the site, ok
 //    casper.then(function(){
	// 	images = images.concat(this.evaluate(getImages));
	// 	console.log(images);
	// });

    // change to about page clicking on the link and check specific resource 
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

    casper.then(function(){
        //.content
        console.log('content check...');
        if (this.visible('.content')) {
            casper.test.assert(true, "Content is rendering correctly");
        }
    });

    // list of resources to check
    // everypage: bottom
    // individual pages, logo.png?
    // programs/concert concert-1.jpg, belle-232x300.jpg, housewife-232x300.jpg
    // the problem is that is spefific for each page, won't run in the page loop (?)
    // possible solution
    // casper.then(function(){
    // 	console.log('testing wildcards');
    // 	this.clickLabel('About', 'a');
    // 	casper.then(function(){
    // 		if (this.resourceExists(/^*.jpg/)) {
    // 		    this.echo(' loaded');
	   //  	} else {
	   //  	    this.echo(' not loaded', 'ERROR');
	   //  	}
    // 	});
    // });
    // appearances no images
});

casper.run(function(){
	casper.test.done();
});