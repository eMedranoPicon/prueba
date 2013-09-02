var appBanner = angular.module("appBanner", ['ui.bootstrap']);


//definimos las rutas de la 'appBanner'
appBanner.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider)
{
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$routeProvider.when('/banner-edit/:id', {
		templateUrl: '/src/views/banner/banner-edit-layout.html',
		controller: BannerEditController
	}).
	when('/banner-new/', {
		templateUrl: '/src/views/banner/banner-insert-layout.html',
		controller: BannerInsertController
	}).
	  //cualquier ruta no definida
	  otherwise({
		   templateUrl: '/src/views/banner/banner-list-table.html',
		  controller: appControllerBanner

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