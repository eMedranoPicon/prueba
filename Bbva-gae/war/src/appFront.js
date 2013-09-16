
var appFront = angular.module("appFront", ['checkImg','acronimoPais','acronimoLugar','mesEnLiteral','ui.bootstrap','ui.map','ui.event','titlePage','guthub.directives']);



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
	.when('/events-list', {
		templateUrl: '/src/views/events/front/events-list.html',
		controller: appFrontController
	})
	.when('/events-past', {
		templateUrl: '/src/views/events/front/events-list-past.html',
		controller: appFrontController
	})
	.when('/events-prox', {
		templateUrl: '/src/views/events/front/events-list-prox.html',
		controller: appFrontController
	})
	.when('/events-map', {
		templateUrl: '/src/views/events/front/events-map.html',
		controller: EventsMapListController
	})
	.when('/events-calendar', {
		templateUrl: '/src/views/events/events-calendar.html',
		controller: appFrontController
	})
	.when('/events.jsp', {
		templateUrl: '/src/views/events/front/events-list.html',
		controller: appFrontController
	})
	.when('/place-detail/:id', {
		templateUrl: '/src/views/places/place-detail.html',
		controller: PlaceDetailController
	})
	.when('/places-list', {
		templateUrl: '/src/views/places/places-list-front.html',
		controller: PlaceController
	}).when('/places-map', {
		templateUrl: '/src/views/places/places-map-front.html',
		controller: PlaceMapHomeController
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
    sharedService.broadcastItem = function()    {
        $rootScope.$broadcast('handleBroadcast');
    };
    return sharedService;
});
/*
appFront.service('mapView', function($rootScope) {    
    var latitudeView="";
    var longitudView="";   
    
    return {       
        setLat: function(value) {
        	latitudeView = value;
        	 $rootScope.$broadcast('LatChanged', latitudeView);
        },
        setLong: function(value) {
        	longitudView = value;
            $rootScope.$broadcast('LongChanged', longitudView);
        }        
    }
});*/

appFront.service('mapView', function($rootScope) {    
    var latitudeView=1;   
    
    return {       
        setLat: function() {
        	latitudeView++;
        	 $rootScope.$broadcast('LatChanged', latitudeView);
        }        
    }
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

