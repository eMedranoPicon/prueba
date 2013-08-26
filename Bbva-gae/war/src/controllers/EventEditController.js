/**
* EventEditController
* Controlador de edicion de Eventos
*/

function EventEditController($scope, $http, $routeParams)
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


    $scope.$watch('myMap', function()
    {
        $scope.setHome();
        $scope.showEditLayout = true;
    });


    $scope.setHome = function()
    {
        console.log('visible myMap setHome')

        var ll = new google.maps.LatLng(13.0810, 80.2740);

        $scope.mapOptions = {
        center: ll,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };

    }




    //Markers should be added after map is loaded
    $scope.onMapIdle = function()
    {
        if ($scope.myMarkers === undefined)
        {
            var marker = new google.maps.Marker({
                map: $scope.myMap,
                position: ll
            });
            $scope.myMarkers = [marker, ];
        }
    };

    $scope.markerClicked = function(m)
    {
        window.alert("clicked");
    };


}