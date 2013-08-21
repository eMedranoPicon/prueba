//var app = angular.module('app', []);
//para hacer uso de $resource debemos colocarlo al crear el modulo
var app = angular.module("app", []);



//definimos las rutas de la 'app'
app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider)
{
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];





	$routeProvider.

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




//Tambien podemos obtener los datos con una factoria, en models/factory.js

app.filter('getById', function()
{

 	return function(input, id)
 	{
    	var i=0, len=input.length;
    	for (; i<len; i++)
    	{
      		if (+input[i].id == +id)
      		{
        		return input[i];
      		}
    	}
    	return null;
  	}
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