/**
* EventDetailController
* Controlador de edicion de Eventos
*/

function EventDetailController($scope, $http, $routeParams, $rootScope, $location, sharedService)
{
  $scope.showError = false;
  $scope.textError = "";
  $scope.is_backend_ready = false;
  $scope.textTitle = "Editar evento";
  $scope.showDetailLayout = false;

  $scope.eventModal = false;
  $scope.errorModal = false;
  $scope.optsModal = {
    backdropFade: true,
    dialogFade:true
  };

  console.log('EventDetailController');

  if (angular.isUndefined($scope.events))
  {
      console.log('recargar el scope');

      $http.get('https://sopragroupux.appspot.com/_ah/api/evento/v5/event/').success(function(data)
      {
          $scope.showError = false;
          $scope.textError = "";
          $scope.showDetailLayout = true;
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
    console.log('EventDetailController getEvent idEvent: ' + idEvent);
    $scope.indexEvent = findIndexById(idEvent,$scope.events);
    console.log('EventDetailController getEvent $scope.indexEvent: ' + $scope.indexEvent)

    if ($scope.indexEvent != -1)
    {
      $scope.event = $scope.events[$scope.indexEvent];
      sharedService.prepForBroadcast($scope.event.address[5],$scope.event.address[6],$scope.event.address[0],$scope.event.address[1],$scope.event.address[2],$scope.event.address[3]);
      $scope.showDetailLayout = true;
    }
    else
    {
      $scope.showError = true;
      $scope.textError = "Evento" + idEvent + "no encontrado";
    }
  }


  function updateEventWithPosition()
  {
    var address = $scope.event.address[0] + "," +$scope.event.address[1]+","+$scope.event.address[2]+","+$scope.event.address[3];
    $scope.event.address[4] = address;
    geocoder = new google.maps.Geocoder();

    geocoder.geocode
    (
      {
        'address' : address
      },
      function(results, status)
      {
        if (status == google.maps.GeocoderStatus.OK)
        {
          $scope.event.address[5] = results[0].geometry.location.lat();
          $scope.event.address[6] = results[0].geometry.location.lng();
          upDateEvent();
        }
        else
        {
          console.log("Geocode was not successful for the following reason: " + status);
          upDateEvent();
        }
      }
    );
  };


  //Actualiza el envento enviado en el formulario
  function upDateEvent()
  {
    console.log('EventEditController upDateEvent $scope.indexEvent: '+$scope.indexEvent);

    $http.put('https://sopragroupux.appspot.com/_ah/api/evento/v5/event', $scope.event).success(function()
    {
        console.log('Haciendo PUT upDateEvent');

    }).error(function(data, status)
    {
          $scope.textError = "Error al insertar los datos. Por favor, inténtelo más tarde";
          $scope.showError = true;
    });
  }


  $scope.openModal = function()
  {
    console.log('openModal updateEventWithPosition');
    updateEventWithPosition();
    console.log('openModal');
    $scope.eventModal = true;
  };


  $scope.closeModal  = function()
  {
    $scope.eventModal = false;
    console.log('closeModal');
    $scope.$apply();
    $location.path('/');
  };


  $scope.$on('handleBroadcast', function()
  {
      $scope.latitud = sharedService.latitud;
      $scope.longitud = sharedService.longitud;
      $scope.calleBdc = sharedService.calleBdc;
      $scope.cpBdc = sharedService.cpBdc;
      $scope.ciudadBdc = sharedService.ciudadBdc;
      $scope.paisBdc = sharedService.paisBdc;

      console.log('sharedService en EventDetailController datos: '+ $scope.latitud + ' ' + $scope.longitud + ' calle: ' + $scope.calleBdc+ ' cpBdc: ' + $scope.cpBdc+ ' ciudadBdc: ' + $scope.ciudadBdc+ ' paisBdc: ' + $scope.paisBdc);
  });

}