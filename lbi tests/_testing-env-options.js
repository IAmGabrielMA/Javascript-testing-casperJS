var options = casper.cli.options;
var baseUrl = 'http://' + ( ( options.env == 'production' ) ? 'www' : options.env ) + '.' + options.site + '.com/';

casper.test.begin('Suite #0: Just checking the gulpfile "env" thingy, do not mind me :)...', function(){

	casper.start( baseUrl, function(){

		console.log( 'Hello from ' + baseUrl );

	});

	casper.run( function() {
        casper.test.done();
    });

});
