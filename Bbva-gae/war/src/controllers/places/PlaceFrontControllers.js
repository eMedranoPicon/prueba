/**
 * PlaceEditController Controlador de edicion de Places
 */

function PlaceDetailController($scope, $http, $routeParams, $rootScope, $location, sharedServicePlace) {
	
	console.log("PlaceDetailController");
	$scope.URL_API = 'https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/';
	$scope.showError = false;
	$scope.textError = "";
	$scope.is_backend_ready = false
	$scope.showEditLayout = false;

	$scope.typePlaceSelect = [ {
		'type' : '',
		'description' : ''
	}, {
		'type' : 'Restaurante',
		'description' : 'Restaurante'
	}, {
		'type' : 'Museo',
		'description' : 'Museo'
	}, {
		'type' : 'Plaza',
		'description' : 'Plaza'
	}, {
		'type' : 'Gimnasio',
		'description' : 'Gimnasio'
	}, {
		'type' : 'Centro Covenciones',
		'description' : 'Centro Convenciones'
	} ];
	
	console.log('$routeParams.id: '+$routeParams.id)
	if (angular.isUndefined($scope.places)) {
		console.log('recargar el scope');
		$http
				.get($scope.URL_API)
				.success(function(data) {
					$scope.showError = false;
					$scope.textError = "";
					$scope.is_backend_ready = true;
					$scope.places = data.items;
					getPlace($routeParams.id);

				})
				.error(
						function(data, status) {
							$scope.textError = "Error al cargar los datos. Por favor, intentalo mas tarde";
							$scope.is_backend_ready = false;
							$scope.showError = true;
						});
	} else {
		//console.log('llamada a getPlace');
		getPlace($routeParams.id);
	}

	function getPlace(idPlace) {

		$scope.indexPlace = findIndexById(idPlace, $scope.places);

		if ($scope.indexPlace != -1) {
			$scope.place = $scope.places[$scope.indexPlace];
			sharedServicePlace.prepForBroadcastPlace($scope.place.latitude,
					$scope.place.longitud);
			$scope.showDetailLayout = true;
		} else {
			$scope.showError = true;
			$scope.textError = "Lugar de Interes" + idPlace + "no encontrado";
		}
	}

}

function PlaceMapHomeController($scope, $http, $rootScope) {
	console.log(' controller : PlaceMapHomeController');
	$scope.URL_API = 'https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/';
	$scope.myMarkers = [];
	$scope.latitud = 0;
	$scope.longitud = 0;
	var LATITUDE_DEFAULT = 40.416949;
	var LONGITUDE_DEFAULT = -3.703347;

	$scope.showError = false;
	$scope.textError = "";
	$scope.is_backend_ready = false;
	$scope.textTitle = "Listado de Lugares de Interes";

	var pinColor = "0066AE";
	var pinImage = new google.maps.MarkerImage(
			"http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|"
					+ pinColor, new google.maps.Size(21, 34),
			new google.maps.Point(0, 0), new google.maps.Point(10, 34));

	var bbvaIcon = {
		url : '/img/bbva-icon.png',
		size : new google.maps.Size(20, 32),
		origin : new google.maps.Point(0, 0),
		scaledSize : new google.maps.Size(20, 32),
		anchor : new google.maps.Point(10, 32)
	};

	var bbvaIconv = {
		url : '/img/bbva-icon-verde.png',
		size : new google.maps.Size(20, 32),
		origin : new google.maps.Point(0, 0),
		scaledSize : new google.maps.Size(20, 32),
		anchor : new google.maps.Point(10, 32)
	};

	var bbvaIconf = {
		url : '/img/bbva-icon-fuc.png',
		size : new google.maps.Size(20, 32),
		origin : new google.maps.Point(0, 0),
		scaledSize : new google.maps.Size(20, 32),
		anchor : new google.maps.Point(10, 32)
	};

	var bbvaIcont = {
		url : '/img/bbva-icon-turquesa.png',
		size : new google.maps.Size(20, 32),
		origin : new google.maps.Point(0, 0),
		scaledSize : new google.maps.Size(20, 32),
		anchor : new google.maps.Point(10, 32)
	};

	var bbvaIconn = {
		url : '/img/bbva-icon-naranja.png',
		size : new google.maps.Size(20, 32),
		origin : new google.maps.Point(0, 0),
		scaledSize : new google.maps.Size(20, 32),
		anchor : new google.maps.Point(10, 32)
	};

	var pinShadow = new google.maps.MarkerImage(
			"http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
			new google.maps.Size(40, 37), new google.maps.Point(0, 0),
			new google.maps.Point(12, 35));

	var ll = new google.maps.LatLng(LATITUDE_DEFAULT, LONGITUDE_DEFAULT);

	$scope.mapOptions = {
		center : ll,
		zoom : 6,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	// Markers should be added after map is loaded
	$scope.onMapIdle = function() {
		if ($scope.myMarkers === undefined) {
			var marker = new google.maps.Marker({
				map : $scope.myMap,
				position : ll
			});
			$scope.myMarkers = [ marker, ];
		}

		// hace que se ejecuten los watch
		$scope.$digest();
	};

	function addMarker(pos) {
		$scope.myMarkers.push(new google.maps.Marker({
			map : $scope.myMap,
			position : pos
		}));
	}
	;

	function addMarkerComplete(pos, title, iconColor) {
		$scope.myMarkers.push(new google.maps.Marker({
			map : $scope.myMap,
			position : pos,
			title : title,
			icon : iconColor,
			shadow : pinShadow
		}));
	}
	;

	function removeAllMarkers() {
		angular.forEach($scope.myMarkers, function(marker) {
			marker.setMap(null);
		});
	}

	$http
			.get($scope.URL_API)
			.success(function(data) {
				$scope.showError = false;
				$scope.textError = "";
				$scope.is_backend_ready = true;
				$scope.places = data.items;
				$scope.placesFull = data.items;

				$scope.mapMakers($scope.places);

			})
			.error(
					function(data, status) {
						$scope.textError = "Error al cargar los datos. Por favor, intentalo m�s tarde";
						$scope.is_backend_ready = false;
						$scope.showError = true;
					});

	$scope.mapMakers = function($obj) {
		for (p in $obj) {
			latlong = new google.maps.LatLng($obj[p].latitude, $obj[p].longitud);

			switch ($obj[p].typePlace) {
			case 'Gimnasio':
				icono = bbvaIcont;
				break;
			case 'Centro Convenciones':
				icono = bbvaIconf;
				break;
			case 'Museo':
				icono = bbvaIconn;
				break;
			case 'Plaza':
				icono = bbvaIconv;
				break;
			default:
				icono = bbvaIcon;
			}

			var cabecera = $obj[p].namePlace + '(' + $obj[p].typePlace + ') - '
					+ $obj[p].fullAddress;

			addMarkerComplete(latlong, cabecera, icono);
		}

	}

	$scope.filterMarker = function(param) {
		removeAllMarkers();
		$scope.myMarkers = [];
		if (param != '') {
			$scope.placeFiltered = [];

			for (m in $scope.places) {

				if ($scope.places[m].typePlace == param) {
					$scope.placeFiltered.push($scope.places[m]);
				}

			}
			$scope.mapMakers($scope.placeFiltered);
		} else {
			$scope.mapMakers($scope.placesFull);
		}
	}

}
