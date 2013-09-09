
var appPlace = angular.module("appPlace", ['ui.bootstrap','ui.map','ui.event','acronimoLugar']);


//definimos las rutas de la 'appPlace'
appPlace.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider)
{
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$routeProvider.when('/place-edit/:id', {
		templateUrl: '/src/views/places/place-edit-layout.html',
		controller: PlaceEditController
	}).
	when('/place-new/', {
		templateUrl: '/src/views/places/place-insert-layout.html',
		controller: PlaceInsertController
	}).
	when('/place-map/', {
		templateUrl: '/src/views/places/places-map.html',
		controller: PlaceMapListController
	}).
	  //cualquier ruta no definida
	  otherwise({
		   templateUrl: '/src/views/places/places-list-table.html',
		  controller: appControllerPlaces

		});


	PlaceInsertController.$inject = ['$scope', '$http', '$routeParams', '$rootScope', '$location', 'mySharedService'];
	PlaceEditController.$inject = ['$scope', '$http', '$routeParams', '$rootScope', '$location', 'mySharedService'];
	PlaceMapController.$inject = ['$scope', '$http','$rootScope', 'mySharedService'];
	PlaceMapListController.$inject = ['$scope', '$http', '$routeParams', '$rootScope', '$location', 'mySharedService'];

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


function myIndexOf(arr,o)
{

  for (var i = 0; i < arr.length; i++)
  {
      if (arr[i].id == o.id)
      {
          return i;
      }
  }

  return -1;
}

appPlace.factory('mySharedService', function($rootScope)
		{
		    var sharedService = {};

		    sharedService.latitud = '';
		    sharedService.longitud = '';
		    sharedService.calleBdc = '';
		    sharedService.cpBdc = '';
		    sharedService.ciudadBdc = '';
		    sharedService.paisBdc = '';

		    sharedService.prepForBroadcast = function(lat,lon,calle,cp,ciudad,pais)
		    {
		        this.latitud = lat;
		        this.longitud = lon;
		        this.calleBdc = calle;
		        this.cpBdc = cp;
		        this.ciudadBdc = ciudad;
		        this.paisBdc = pais;
		        this.broadcastItem();
		    };

		    sharedService.broadcastItem = function()
		    {
		        $rootScope.$broadcast('handleBroadcast');
		    };

		    return sharedService;
		});
