/**
* EventEditController
* Controlador de edicion de Eventos
*/

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

function EventEditController($scope, $http, $routeParams)
{

/*	$http.get('https://sopragroupux.appspot.com/_ah/api/evento/v5/event/'+$routeParams.id).success(function(data)
	{
		$scope.events = data;

		//buscar un elemento dentro de un array
		//var indexData = myIndexOf($scope.events,{id:$routeParams.id});
		//$scope.titleEdit = $scope.events[indexData].title;
		//$scope.dateStartEdit = $scope.events[indexData].dateStart;
		//$scope.dateEndEdit = $scope.events[indexData].dateEnd;

  	}).error(function(data, status)
    {
		alert("Try again later");
		//$scope.deleteModalShown = false;
	});
*/
	$scope.showJson = function()
    {
		alert('showJson');
       //var $scope.json = angular.toJson($scope.event);

    };

    $scope.iniMap = function()
    {
        console.log('iniMap  ini en inimap');

        initialize();

        //this is our gem
        google.maps.event.addDomListener(window, "resize", function()
        {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });

    };

  	$scope.upDateEvent = function(idEvent)
  	{
        /*var elem = angular.element($element);
        var dt = $(elem).serialize();
        alert(id);
        dt = dt+"&id="+id;
        dt = dt+"&action=fetch";
        console.log($(elem).serialize());*/

        console.log (idEvent);
        $http(
        {
            method: 'PUT',
            url: 'https://sopragroupux.appspot.com/_ah/api/evento/v5/event',
            data: $scope.events,
            dataType : 'json',
			contentType : 'application/json',
            headers: {'Content-Type': 'application/json'}
        }).success(function(data, status)
        {
            alert('guardado');
            console.log(data); // Show result from server in our <pre></pre> element

        }).error(function(data, status)
        {
            alert('error:'+status);
        });
    }

 /*   $scope.copyMaster = function(event)
  	{

		$scope.master= angular.copy(event);

    }*/
}


