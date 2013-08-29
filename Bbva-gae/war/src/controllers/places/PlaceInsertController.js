/**
* PlaceEditController
* Controlador de edicion de Places
*/

function PlaceInsertController($scope, $http, $routeParams, $rootScope, $location, sharedService)
{
	console.log(' controller : PlaceInsertController');
	
	$scope.showError = false;
    $scope.textError = "";
    $scope.is_backend_ready = false;
    $scope.textTitle = "Insertar lugar de interes";  
    

    $scope.placeModal = false;
    $scope.errorModal = false;
    $scope.optsModal = {
      backdropFade: true,
      dialogFade:true
    };

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
    
    function savePlace()
    {

    	console.log('EventPlaceController $scope.place: '+$scope.place)
    	sharedService.prepForBroadcast($scope.place.latitude, $scope.place.longitud,$scope.place.street, $scope.place.zipcode, $scope.place.city, $scope.place.country);
    	$http.post('https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/', $scope.place).success(function()
        //$http.post('https://sopragroupux.appspot.com/_ah/api/place/v1/place', $scope.place).success(function()
        {
            console.log('Guardando');
        }).error(function(data, status)
        {
              $scope.textError = "Error al insertar los datos. Por favor, intentelo mas tarde";
              $scope.showError = true;
        });
    }
    
     function insertPlaceLocation()
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
						var street_num = components.street_number;
					}

					if (!(typeof components.route === 'undefined')) {
						// address number
						var street_name = components.route;
					}
					
					$scope.place.street =  street_name+' '+street_num;

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
                  //$scope.savePlace();
  					savePlace();
              }
              else
              {
                console.log("Geocode was not successful for the following reason: " + status);
                //$scope.savePlace();
                savePlace();
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
    
    $scope.openModalInsert = function()
    {
      console.log('openModal saveEvent');
      insertPlaceLocation();
        console.log('openModal');
        $scope.placeModal = true;
    };

    $scope.closeModal  = function()
    {
        $scope.placeModal = false;
        console.log('closeModal');
        $location.path('/');
    };

}