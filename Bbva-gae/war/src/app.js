//var app = angular.module('app', []);
//para hacer uso de $resource debemos colocarlo al crear el modulo
var app = angular.module("app", []);

//definimos las rutas de la 'app'
app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider)
{
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$routeProvider.when("/", {
		templateUrl: "/src/views/events/events-list-table.html",
	})
	.when('/event-edit/:id', {
		templateUrl: '/src/views/events/event-edit-layout.html',
		controller: EventEditController
	}).


/*
	  when('/events', {
		  templateUrl: '/src/views/events/events-list.html',
		  controller: EventsListController
		  }).

	  //mediante dos puntos (:) definimos un parámetro
	  when('/event/:id', {
		  templateUrl: '/src/views/events/event.html',
		  controller: EventDetailController
		  }).

	  when('/events-table-list', {
		  templateUrl: '/src/views/events/events-list-table.html',
		  controller: EventsListController
		  }).

	 //mediante dos puntos (:) definimos un parámetro
	 when('/event-edit/', {
		  redirectTo: '/events'
		  }).
*/
	 //mediante dos puntos (:) definimos un parámetro
	 when('/event-edit/:id', {
		  templateUrl: '/src/views/events/event-edit-layout.html',
		  controller: EventEditController
		  }).


	  //cualquier ruta no definida
	  otherwise({
		   templateUrl: '/src/views/events/events-list-table.html',
		  controller: EventsListController

		});

	 /*  otherwise({
		  redirectTo: '/events'});*/


}]);


app.controller("appController", function appController($scope, $http, $routeParams)
{
	$scope.showError = false;
	$scope.textError = "";
	$scope.is_backend_ready = false;

    $http.get('https://sopragroupux.appspot.com/_ah/api/evento/v5/event/').success(function(data)
	{
		$scope.showError = false;
		$scope.textError = "";
		$scope.is_backend_ready = true;
		$scope.events = data.items;

  	}).error(function(data, status)
    {
		$scope.textError = "Error al cargar los datos. Por favor, inténtelo más tarde";
		$scope.is_backend_ready = false;
		$scope.showError = true;
	});

});



/*
  var app = angular.module('angular-auth-demo', ['http-auth-interceptor']);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider.
        when('/home', { templateUrl: 'partial-content.html', controller: 'ContentController' }).
        otherwise({ redirectTo: '/home' });
}]);*/