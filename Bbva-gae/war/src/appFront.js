var appFront = angular.module("appFront", ['checkImg','acronimoPais','mesEnLiteral','ui.bootstrap','ui.map','ui.event']);

//definimos las rutas de la 'app'
appFront.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider)
{
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$routeProvider
	.when('/event-detail/:id', {
		templateUrl: '/src/views/events/front/event-detail.html',
		controller: EventDetailController
	})
	.when('/events2', {
		templateUrl: '/src/views/events/front/events-list2.html',
		controller: appFrontController
	})
	//cualquier ruta no definida
	.otherwise({
		templateUrl: '/src/views/events/front/events-list.html',
		controller: appFrontController
	});

	EventDetailController.$inject = ['$scope', '$http', '$routeParams', '$rootScope', '$location', 'mySharedService'];
	MapController.$inject = ['$scope', '$rootScope', 'mySharedService'];	
}]);


appFront.factory('mySharedService', function($rootScope)
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


function findIndexById(id,arrayList)
{
	if (!id) return null;
	var index = -1;

	for(var i = 0; i < arrayList.length; i++)
	{
	  var o = arrayList[i];
	  if (id == o.id)
	  {
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

