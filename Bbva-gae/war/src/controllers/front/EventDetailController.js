/*
* EventDetailController
*/

function EventDetailController($scope, $http, $routeParams, $rootScope, $location, sharedService)
{
    $scope.showError = false;
    $scope.textError = "";
    $scope.is_backend_ready = false;
    $scope.textTitle = "Editar evento";
    $scope.showEditLayout = false;

    $scope.eventModal = false;
    $scope.errorModal = false;
    $scope.optsModal = {
      backdropFade: true,
      dialogFade:true
    };


    if (angular.isUndefined($scope.events))
    {
        console.log('recargar el scope');

        $http.get('https://sopragroupux.appspot.com/_ah/api/evento/v5/event/').success(function(data)
        {
            $scope.showError = false;
            $scope.textError = "";
            $scope.is_backend_ready = true;
            $scope.events = data.items;
            getEvent($routeParams.id);

        }).error(function(data, status)
        {
              $scope.textError = "Error al cargar los datos. Por favor, intentalo mas tarde";
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
        //$scope.event.$apply();
        $scope.indexEvent = findIndexById(idEvent,$scope.events);
        //console.log('EventEditController getEvent $scope.indexEvent: '+$scope.indexEvent)

        if ($scope.indexEvent != -1)
        {

            $scope.event = $scope.events[$scope.indexEvent];
            sharedService.prepForBroadcast($scope.event.address[5],$scope.event.address[6],$scope.event.address[0],$scope.event.address[1],$scope.event.address[2],$scope.event.address[3]);
        }
        else
        {
            $scope.showError = true;
            $scope.textError = "Evento" + idEvent + "no encontrado";
        }
    }

    $scope.handleClick = function(lat,lon,calle,cp,ciudad,pais)
    {
        sharedService.prepForBroadcast(lat,lon,calle,cp,ciudad,pais);
    };

    $scope.$on('handleBroadcast', function()
    {
        $scope.latitud = sharedService.latitud;
        $scope.longitud = sharedService.longitud;
        $scope.calleBdc = sharedService.calleBdc;
        $scope.cpBdc = sharedService.cpBdc;
        $scope.ciudadBdc = sharedService.ciudadBdc;
        $scope.paisBdc = sharedService.paisBdc;

        console.log('sharedService en EvenEditController datos: '+ $scope.latitud + ' ' + $scope.longitud + ' calle: ' + $scope.calleBdc+ ' cpBdc: ' + $scope.cpBdc+ ' ciudadBdc: ' + $scope.ciudadBdc+ ' paisBdc: ' + $scope.paisBdc);
    });

}