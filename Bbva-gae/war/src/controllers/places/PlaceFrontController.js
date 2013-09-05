/**
 * PlaceEditController Controlador de edicion de Places
 */

function PlaceFrontController($scope, $http, $routeParams, $rootScope, $location, sharedService) {
	console.log(' controller : PlaceFrontController');

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

	if (angular.isUndefined($scope.places)) {
		console.log('recargar el scope');
		// $http.get('https://sopragroupux.appspot.com/_ah/api/place/v1/place/').success(function(data)
		$http
				.get('https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/')
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
		console.log('llamada a getPlace');
		getPlace($routeParams.id);
	}

	function getPlace(idPlace) {

		$scope.indexPlace = findIndexById(idPlace, $scope.places);

		if ($scope.indexPlace != -1) {
			$scope.place = $scope.places[$scope.indexPlace];
			$scope.showDetailLayout = true;
			 //sharedService.prepForBroadcastLatLong($scope.place.latitude,$scope.place.longitud);
		} else {
			$scope.showError = true;
			$scope.textError = "Lugar de Interes" + idPlace + "no encontrado";
		}
	}

}
