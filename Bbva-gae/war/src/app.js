var app = angular.module('app', []);

//definimos las rutas de la 'app'
app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider)
{
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$routeProvider.
	  when('/events', {
		  templateUrl: '/src/views/events-list.html',
		  controller: EventsListController
		  }).

	  //mediante dos puntos (:) definimos un parámetro
	  when('/event/:id', {
		  templateUrl: '/src/views/event.html',
		  controller: EventDetailController
		  }).

	  when('/events-table-list', {
		  templateUrl: '/src/views/events-list-table.html',
		  controller: EventsListController
		  }).

	  //cualquier ruta no definida
	  otherwise({
		  redirectTo: '/events'});

}]);

/*
  var app = angular.module('angular-auth-demo', ['http-auth-interceptor']);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider.
        when('/home', { templateUrl: 'partial-content.html', controller: 'ContentController' }).
        otherwise({ redirectTo: '/home' });
}]);*/