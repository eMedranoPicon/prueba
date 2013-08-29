var appFront = angular.module("appFront", ['checkImg','acronimoPais','ui.bootstrap','ui.map','ui.event']);

//definimos las rutas de la 'app'
appFront.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider)
{
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$routeProvider
	/*.when('/event-detail/:id', {
		templateUrl: '/src/views/events/front/event-detail.html',
		controller: EventDetailController
	})*/
	//cualquier ruta no definida
	.otherwise({
		templateUrl: '/src/views/events/front/events-list.html',
		controller: appFrontController
	});
	//otherwise({ redirectTo: '/events'});
}]);


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
