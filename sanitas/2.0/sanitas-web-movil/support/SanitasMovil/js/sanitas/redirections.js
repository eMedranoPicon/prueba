// JavaScript con funciones para calcular la redireccion en funcion de la URL base recibida

	function processUrl(urlToCheck) {
		var newUrl = urlToCheck;
		if (urlToCheck.indexOf("?") > 0) {
			newUrl += "&";
		} else {
			newUrl += "?";
		}
		
		return newUrl;
	}