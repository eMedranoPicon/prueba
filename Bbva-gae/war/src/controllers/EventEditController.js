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

    /*
    $http.get('https://sopragroupux.appspot.com/_ah/api/evento/v5/event/'+$routeParams.id).success(function(data)
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

/*
        gapi.client.load('evento', 'v5', function()
        {
            console.log('cargada api en edicontroller');
             console.log('$routeParams.id:'+$routeParams.id);
            $scope.is_backend_ready = true;
            $scope.getEvent($routeParams.id);
        }, 'https://sopragroupux.appspot.com/_ah/api');


    $scope.getEvent = function($idEvent)
    {
         console.log('getEvent: '+$idEvent);
        gapi.client.evento.getEvent($idEvent).execute(function(resp)
        {
            $scope.events = resp.items;
            $scope.$apply();
        });
    };

*/

	$scope.showJson = function()
    {
		alert('showJson');
       //var $scope.json = angular.toJson($scope.event);

    };

/*
    $scope.iniMap = function(o)
    {
    	//console.log(o);
    	//console.log($scope);
    	//previewMap();
    };
*/
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


