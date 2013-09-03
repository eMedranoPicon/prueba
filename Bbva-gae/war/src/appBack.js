var appBack = angular.module("appBack",[]);

//definimos las rutas de la 'app'
appBack.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider)
{
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	
}]);
