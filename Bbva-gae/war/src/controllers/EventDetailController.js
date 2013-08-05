/**
* LibroDetailController
* Controlador de la ficha del libro
* $scope - ámbito
* $http -
* $routeParams - parámetros de la ruta
*/
function EventDetailController($scope, $http, $routeParams) {
  $scope.id = $routeParams.id;

  $http.get('https://sopragroupux.appspot.com/_ah/api/evento/v4/event/').success(function(data) {
	  $scope.event = data[0];
  });

}