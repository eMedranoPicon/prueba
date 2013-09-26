// JavaScript with common functions in the medical guide

	function setCookie(c_name, value, exdays) {
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()) + "; path=/";
		document.cookie=c_name + "=" + c_value;
	}
		
	function getCookie(c_name)	{
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++) {
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		  	y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		  	x=x.replace(/^\s+|\s+$/g,"");
			  
		  	if (x==c_name) {
				return unescape(y);
		 	}
		}
	}
		
	// Function to calculate the default zoom in the Milenium centers page.
	// Higher or lower level depending on whether a province is selected or not.
	function defaultZoomLevel(provinceCod) {
		var zoomlevel;
		if (provinceCod == 0) {
			zoomlevel = 5;
		} else {
			zoomlevel = 11;
		}
			
		return zoomlevel;
	}
	
	// Validates required fields
	function validateFields(idPoblacion) {
		var valid = true;
			
		if (idPoblacion == null || idPoblacion == '') {
			valid = false;
			alert("No disponible");
		} 
			
		return valid;
	}
	
	// Calculates the default zoom level in a map taking the southwest and northeast coordinates in the extremes
	// and the size of the map to be displayed.
	function getZoomLevel(swlat, swlong, nelat, nelong, mapHeight, mapWidth) {
		var intmapHeight = parseInt(mapHeight, 10);
		var intmapWidth = parseInt(mapWidth, 10);
		var result = 8;

		if (swlat != nelat && swlong != nelong) {

			var lngAngle = nelong - swlong;
			var latAngle = nelat - swlat;

			// Height of a google map that displays the entire world when zoomed all the way out
			var GLOBE_HEIGHT = 256; 
			// Width of a google map that displays the entire world when zoomed all the way out
			var GLOBE_WIDTH = 256; 

			var latZoomLevel = Math.floor(Math.log(intmapHeight * 360 / latAngle / GLOBE_HEIGHT) / Math.log(2));

			var lngZoomLevel = Math.floor(Math.log(intmapWidth * 360 / lngAngle / GLOBE_WIDTH) / Math.log(2));

			result = Math.max(latZoomLevel, lngZoomLevel);
		}
		
		return result;
	}