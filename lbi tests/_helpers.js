var getUrl = function getUrl( env, site ) {
	return 'http://' + ( ( env == 'production' ) ? 'www' : env ) + '.' + site + '.com/';
}

module.exports.getUrl = getUrl;
