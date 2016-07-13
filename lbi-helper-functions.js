module.exports...

	// get all links
	function getLinks(){
		links = document.querySelectorAll('a');
		return Array.prototype.map.call(links, function(e){
			return e.getAttribute('href');
		});
	}
	// get all pagination links
	function getPaginationLinks(){
		paginationLinks = document.querySelectorAll('a.page-numbers');
		return Array.prototype.map.call(paginationLinks, function(e){
			return e.getAttribute('href');
		});
	}