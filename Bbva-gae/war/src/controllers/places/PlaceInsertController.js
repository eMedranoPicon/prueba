/**
* PlaceEditController
* Controlador de edicion de Places
*/

function PlaceInsertController($scope, $http, $routeParams, $rootScope, sharedService)
{
	console.log(' controller : PlaceInsertController');
	
	$scope.showError = false;
    $scope.textError = "";
    $scope.is_backend_ready = false;
    $scope.textTitle = "Insertar lugar de interes";  

    $scope.place = {};
    $scope.place.namePlace="";
    $scope.place.typePlace="";
    $scope.place.street="";
    $scope.place.zipcode="";
    $scope.place.city="";
    $scope.place.country="";
    $scope.place.fullAddress="";
    $scope.place.latitude="";
    $scope.place.longitud="";
    $scope.place.name="";
    $scope.place.email="";
    $scope.place.description="";
    
    $scope.savePlace = function()
    {

    	console.log('EventPlaceController $scope.place: '+$scope.place)
    	sharedService.prepForBroadcast($scope.place.latitude, $scope.place.longitud,$scope.place.street, $scope.place.zipcode, $scope.place.city, $scope.place.country);
    	$http.post('https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/', $scope.place).success(function()
        //$http.post('https://sopragroupux.appspot.com/_ah/api/place/v1/place', $scope.place).success(function()
        {
            console.log('Guardando');
            $('#confirmaPlace').modal('show');

        }).error(function(data, status)
        {
              $scope.textError = "Error al insertar los datos. Por favor, intentelo más tarde";
              $scope.showError = true;
        });
    }
    
    $scope.insertPlaceLocation = function()
    {
    	var address = $scope.place.street + "," +$scope.place.zipcode+","+$scope.place.city+","+$scope.place.country;      

        geocoder = new google.maps.Geocoder();

        geocoder.geocode
         (
            {
              'address' : address
            },
            function(results, status)
            {
                if (status == google.maps.GeocoderStatus.OK)
                {
                    
              	  /*
  					 * Magia Json
  					 */
  					var address_components = results[0].address_components;
  					var components = {};
  					jQuery.each(address_components, function(k, v1) {
  						jQuery.each(v1.types, function(k2, v2) {
  							components[v2] = v1.long_name
  						});
  					});
  					/*
  					 * Fin Magia
  					 */
  					console.log(components);

  					if (!(typeof components.street_number === 'undefined')) {
  						// address number
  						localStorage.setItem('scope_maps_stnumber',
  								components.street_number);
  					}

  					if (!(typeof components.route === 'undefined')) {
  						// address number
  						localStorage.setItem('scope_maps_stname',
  								components.route);
  					}
  					
  					$scope.place.street = localStorage.getItem('scope_maps_stname') + ' '
  					+ localStorage.getItem('scope_maps_stnumber');

  					if (!(typeof components.locality === 'undefined')) {
  						// ciudad
  						$scope.place.city = components.locality;
  					}

  					if (!(typeof components.country === 'undefined')) {
  						// ciudad
  						$scope.place.country = components.country;
  					}

  					if (!(typeof components.postal_code === 'undefined')) {
  						// zipcode
  						$scope.place.zipcode = components.postal_code;
  					}

  					// lat
  					$scope.place.latitude =	results[0].geometry.location.lat();
  					// long
  					$scope.place.longitud = results[0].geometry.location.lng();
  					$scope.place.fullAddress = results[0].formatted_address;            
                  $scope.savePlace();
              }
              else
              {
                console.log("Geocode was not successful for the following reason: " + status);
                $scope.savePlace();
              }
          }
        );
    }
    
    $scope.handleClick = function(lat,lon,calle,cp,ciudad,pais)
    {
        sharedService.prepForBroadcast(lat,lon,calle,cp,ciudad,pais);
    };


    $scope.$on('handleBroadcast', function()
    {
        $scope.latitud = sharedService.latitud;
        $scope.longitud = sharedService.longitud;
        $scope.calleBdc = sharedService.calleBdc;
        $scope.cpBdc = sharedService.cpBdc;
        $scope.ciudadBdc = sharedService.ciudadBdc;
        $scope.paisBdc = sharedService.paisBdc;

        console.log('sharedService en EvenEditController datos: '+ $scope.latitud + ' ' + $scope.longitud + ' calle: ' + $scope.calleBdc+ ' cpBdc: ' + $scope.cpBdc+ ' ciudadBdc: ' + $scope.ciudadBdc+ ' paisBdc: ' + $scope.paisBdc);
    });

}