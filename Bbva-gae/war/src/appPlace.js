
var appPlace = angular.module("appPlace", []);


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
		templateUrl: '/src/views/places/place-edit-layout.html',
		controller: PlaceEditController
	}).

	  //cualquier ruta no definida
	  otherwise({
		   templateUrl: '/src/views/places/places-list-table.html',
		  controller: appControllerPlaces

		});

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