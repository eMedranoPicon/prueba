function lugaresapi(){

	var BASE4 = 'https://api.foursquare.com/v2/venues/search?oauth_token=BQM2OJ1DQX40YM45WU4D5FN4MERRQBEAANCGFCPIN500JSTL&v=20130916';
	var location ='&near=cantabria,spain'
	var extra = '&locale=es&limit=5&intent=checkin';
	var tipoGimnasio = '&categoryId=4bf58dd8d48988d175941735';
	var tipoCentroCovenciones = '&categoryId=4bf58dd8d48988d1ff931735';
	var tipoPlaza = '&categoryId=4bf58dd8d48988d164941735';
	var tipoMuseo = '&categoryId=4bf58dd8d48988d181941735';
	
	var tipoCat = "Plaza";
	console.log('scraping');
	
	var apiUrl = BASE4+extra+location+tipoPlaza;
	console.log(apiUrl);
	$.getJSON(apiUrl,
		    function(data) {
				console.log(data);
				
				for ( j in data.response.venues){
					
					var obj = {};
					obj.namePlace=data.response.venues[j].name;
					obj.typePlace = tipoCat;
					obj.description = 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum';
					obj.street = data.response.venues[j].location.address;
					obj.zipcode = data.response.venues[j].location.postalCode;
					obj.city = data.response.venues[j].location.city;					
					obj.country = data.response.venues[j].location.country;
					obj.fullAddress = obj.street+', '+obj.city;
					obj.latitude = data.response.venues[j].location.lat;
				    obj.longitud = data.response.venues[j].location.lng;
				    obj.name = "Luis Duran";
					obj.email = "luis.duran@bbva.com";
					
					var request = gapi.client.place.insertPlace(obj);
					request.execute(function(resp, status) {
				     console.log("exito");
						
					});
					
				}
				
		});
	
	
	
}
