// JavaScript con funciones para extraer el codigo de provincia a partir de la informacion devuelta por el API de GoogleMaps

	// Obtiene el codigo de provincia a partir de los 2 primerso digitos del codigo postal, si viene informado
	function getProvinceCodFromPostalCode(result) {
		var provCod = "";
					
		for (var ind=0; ind < result[0].address_components.length; ind++) {
			if (result[0].address_components[ind].types == "postal_code") {
				provCod = result[0].address_components[ind].short_name.substr(0,2);
			}
		}
					
		return provCod;
	}
	
	// Obtiene el codigo de provicia a partir de la descripion del campo "administrative_area_level_2"
	function getProvinceCodFromAdministrativeArea(result) {
		var provCod = "";
					
		for (var ind=0; ind < result[0].address_components.length; ind++) {
			if (result[0].address_components[ind].types[0] == "administrative_area_level_2") {
				provCod = getProvinceCodFromName(result[0].address_components[ind].short_name);
			}
		}
		return provCod;
	}
	
	// Relacion entre codigos y descripciones de los campos administrative_area_level_2.short_name
	function getProvinceCodFromName(provinceDesc) {
		var cod = "";
		
		// Replace accents
		var provinceName = provinceDesc.replace("\u00C1","A");
		provinceName = provinceName.replace("\u00E1","a");
		provinceName = provinceName.replace("\u00E9","e");
		provinceName = provinceName.replace("\u00F3","o");
		
		if (provinceName == 'Alava') cod = "01";
		else if (provinceName == 'Albacete') cod = "02";
		else if (provinceName == 'A') cod = "03";
		else if (provinceName == 'AL') cod = "04";
		else if (provinceName == 'Avila') cod = "05";
		else if (provinceName == 'Badajoz') cod = "06";
		else if (provinceName == 'Islas Baleares') cod = "07";
		else if (provinceName == 'B') cod = "08";
		else if (provinceName == 'Burgos') cod = "09";
		else if (provinceName == 'Caceres') cod = "10";
		else if (provinceName == 'CA') cod = "11";
		else if (provinceName == 'Castellon') cod = "12";
		else if (provinceName == 'Ciudad Real') cod = "13";
		else if (provinceName == 'Cordoba') cod = "14";
		else if (provinceName == 'C') cod = "15";
		else if (provinceName == 'Cuenca') cod = "16";
		else if (provinceName == 'Girona') cod = "17";
		else if (provinceName == 'Granada') cod = "18";
		else if (provinceName == 'Guadalajara') cod = "19";
		else if (provinceName == 'SS') cod = "20";
		else if (provinceName == 'Huelva') cod = "21";
		else if (provinceName == 'Huesca') cod = "22";
		else if (provinceName == 'Jaen') cod = "23";
		else if (provinceName == 'Leon') cod = "24";
		else if (provinceName == 'Lleida') cod = "25";
		else if (provinceName == 'LO') cod = "26";
		else if (provinceName == 'Lugo') cod = "27";
		else if (provinceName == 'M') cod = "28";
		else if (provinceName == 'Málaga') cod = "29";
		else if (provinceName == 'MU') cod = "30";
		else if (provinceName == 'NA') cod = "31";
		else if (provinceName == 'Ourense') cod = "32";
		else if (provinceName == 'O') cod = "33";
		else if (provinceName == 'Palencia') cod = "34";
		else if (provinceName == 'Las Palmas') cod = "35";
		else if (provinceName == 'Pontevedra') cod = "36";
		else if (provinceName == 'SA') cod = "37";
		else if (provinceName == 'TF') cod = "38";
		else if (provinceName == 'TF') cod = "39";
		else if (provinceName == 'SG') cod = "40";
		else if (provinceName == 'SE') cod = "41";
		else if (provinceName == 'SO') cod = "42";
		else if (provinceName == 'T') cod = "43";
		else if (provinceName == 'TE') cod = "44";
		else if (provinceName == 'TO') cod = "45";
		else if (provinceName == 'V') cod = "46";
		else if (provinceName == 'VA') cod = "47";
		else if (provinceName == 'BI') cod = "48";
		else if (provinceName == 'ZA') cod = "49";
		else if (provinceName == 'Z') cod = "50";
		else if (provinceName == 'Ceuta') cod = "51";
		else if (provinceName == 'Melilla') cod = "52";
			
		return cod;
	}
