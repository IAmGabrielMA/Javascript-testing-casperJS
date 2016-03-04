var baseURL = 'http://dev.gabrielmaldonado.me'

// Access to login and try a wrong username and password
casper.test.begin('TEST: Login into wp-admin with wrong credentials', function(){

	casper.start(baseURL + '/wp-admin', function(){
	
		this.test.assertExists('form#loginform','form found!');
		this.fill('form#loginform', {
			log: 'nope',
			pwd: 'nope'
		}, true);
		this.click('#wp-submit');
		this.test.assertExists('div#login_error', 'error div appears');

	});

});

casper.run(function(){
	casper.test.done();
});