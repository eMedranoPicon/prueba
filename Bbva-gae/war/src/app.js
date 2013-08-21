//var app = angular.module('app', []);
//para hacer uso de $resource debemos colocarlo al crear el modulo
var app = angular.module("app", []);


//definimos las rutas de la 'app'
app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider)
{
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$routeProvider
	/*.when("/", {
		templateUrl: "/src/views/events/events-list-table.html",
		controller: appController
	})*/
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
	/* when('/event-edit/:id', {
		  templateUrl: '/src/views/events/event-edit-layout.html',
		  controller: EventEditController
		  }).*/


	  //cualquier ruta no definida
	  otherwise({
		   templateUrl: '/src/views/events/events-list-table.html',
		  controller: appController

		});

	 /*  otherwise({
		  redirectTo: '/events'});*/


}]);




function findIndexById(id,arrayList) {
	if (!id) return null;
	var index = -1;

	for(var i = 0; i < arrayList.length; i++) {
	  var o = arrayList[i];
	  if (id == o.id) {
	    index = i;
	    break;
	  }
	}

	return index;
}


/*
  var app = angular.module('angular-auth-demo', ['http-auth-interceptor']);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider.
        when('/home', { templateUrl: 'partial-content.html', controller: 'ContentController' }).
        otherwise({ redirectTo: '/home' });
}]);*/