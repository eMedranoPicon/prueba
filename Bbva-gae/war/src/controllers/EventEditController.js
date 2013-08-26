/**
* EventEditController
* Controlador de edicion de Eventos
*/

function EventEditController($scope, $http, $routeParams, sharedService)
{
    $scope.showError = false;
    $scope.textError = "";
    $scope.is_backend_ready = false;
    $scope.textTitle = "Editar evento";
    $scope.showEditLayout = false;

    if (angular.isUndefined($scope.events))
    {
        console.log('recargar el scope');

        $http.get('https://sopragroupux.appspot.com/_ah/api/evento/v5/event/').success(function(data)
        {
            $scope.showError = false;
            $scope.textError = "";
            $scope.is_backend_ready = true;
            $scope.events = data.items;
            //console.log('EventEditController recargar el scope $scope.events:' +$scope.events)
            getEvent($routeParams.id);

        }).error(function(data, status)
        {
              $scope.textError = "Error al cargar los datos. Por favor, inténtelo más tarde";
              $scope.is_backend_ready = false;
              $scope.showError = true;
        });
    }
    else
    {
        console.log('llamada a getEvent');
        getEvent($routeParams.id);
    }


    //Obtiene los datos del evento para editarlo
    function getEvent(idEvent)
    {
        //console.log('EventEditController getEvent $scope.events: '+$scope.events)

        $scope.indexEvent = findIndexById(idEvent,$scope.events);

        console.log('EventEditController getEvent $scope.indexEvent: '+$scope.indexEvent)

        if ($scope.indexEvent != -1)
        {
            $scope.event = $scope.events[$scope.indexEvent];
            //console.log('EventEditController getEvent $scope.event: '+$scope.event)
        }
        else {
            $scope.showError = true;
            $scope.textError = "Evento" + idEvent + "no encontrado";
        }


    }

    $scope.handleClick = function(lat,lon)
    {
        sharedService.prepForBroadcast(lat,lon);
    };

    $scope.$on('handleBroadcast', function()
    {
        $scope.latitud = sharedService.latitud;
        $scope.longitud = sharedService.longitud;

        console.log('sharedService datos'+ $scope.latitud)
    });


    //Actualiza el envento enviado en el formulario
    $scope.upDateEvent = function()
    {
        console.log('EventEditController upDateEvent $scope.indexEvent: '+$scope.indexEvent)

        $http.put('https://sopragroupux.appspot.com/_ah/api/evento/v5/event', $scope.event).success(function()
        {
            console.log('Haciendo PUT upDateEvent');
            $('#confirmaEvento').modal('show');

        }).error(function(data, status)
        {
              $scope.textError = "Error al insertar los datos. Por favor, inténtelo más tarde";
              $scope.showError = true;
        });
    }


}