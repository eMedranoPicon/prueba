/*angular.module('app', []).

  //definimos las rutas de la 'app'
  config(['$routeProvider', function($routes) {


  $routes.
      when('/libros', {
		  templateUrl: 'src/views/libros-list.html',
		  controller: LibrosListController
		  }).

	  //mediante dos puntos (:) definimos un parámetro
      when('/libro/:libroId', {
		  templateUrl: 'src/views/libro.html',
		  controller: LibroDetailController
		  }).

	  //cualquier ruta no definida
      otherwise({
		  redirectTo: '/libros'});

}]);
*/

var app = angular.module('app', []);

  //definimos las rutas de la 'app'
  app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {


 $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $routeProvider.
      when('/events', {
		  templateUrl: 'src/views/events-list.html',
		  controller: EventsListController
		  }).

	  //mediante dos puntos (:) definimos un parámetro
      when('/event/:id', {
		  templateUrl: 'src/views/event.html',
		  controller: EventDetailController
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