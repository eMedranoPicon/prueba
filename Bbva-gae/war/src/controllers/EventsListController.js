/**
* LibrosListController
* Controlador del listado de libros
*/
function EventsListController($scope, $http) {
  $http.get('https://sopragroupux.appspot.com/_ah/api/evento/v4/event/').success(function(data) {
	$scope.events = data.items;
  });

  //defines una variable
  $scope.var1 = "EventsListController variable definida desde el controlador";

  //selecciona el desplegable y ordena automaticamente, variable definida en la vista con ng-model
  $scope.orderField = "title";
  $scope.orderReverse = "true";
}