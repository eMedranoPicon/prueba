//var app = angular.module('app', []);
//para hacer uso de $resource debemos colocarlo al crear el modulo
var app = angular.module("app", ['ui.bootstrap','ui.map','ui.event']);

//definimos las rutas de la 'app'
app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider)
{
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$routeProvider.when('/event-edit/:id', {
		templateUrl: '/src/views/events/event-edit-layout.html',
		controller: EventEditController
	})
	//cualquier ruta no definida
	.otherwise({
		templateUrl: '/src/views/events/events-list-table.html',
		controller: appController
	});
	//otherwise({ redirectTo: '/events'});

	EventEditController.$inject = ['$scope', '$http', '$routeParams', '$rootScope', 'mySharedService'];
	EventEditMapController.$inject = ['$scope', '$rootScope', 'mySharedService'];


}]);

app.factory('mySharedService', function($rootScope)
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

/*
if (!Array.prototype.indexOf)
{
	Array.prototype.indexOf = function(obj, start)
	{
	    for (var i = (start || 0), j = this.length; i < j; i++)
	    {
	        if (this[i] === obj)
	        	{
	        		return i;
	        	}
	     }
	     return -1;
	};
}
*/