/**
* LibroDetailController
* Controlador de la ficha del libro
* $scope - ámbito
* $http -
* $routeParams - parámetros de la ruta
*/
function EventDetailController($scope, $http, $routeParams)
{
    $scope.showError = false;
    $scope.textError = "";
    $scope.is_backend_ready = false;
    $scope.textTitle = "Editar evento";
    $scope.showEditLayout = false;

    console.log('EventDetailController');

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
        $scope.indexEvent = findIndexById(idEvent,$scope.events);
        //console.log('EventEditController getEvent $scope.indexEvent: '+$scope.indexEvent)

        if ($scope.indexEvent != -1)
        {
            $scope.event = $scope.events[$scope.indexEvent];
        }
        else
        {
            $scope.showError = true;
            $scope.textError = "Evento" + idEvent + "no encontrado";
        }
    }

}