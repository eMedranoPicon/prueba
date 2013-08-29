function appController($scope, $http, $routeParams, $timeout)
{
  $scope.showError = false;
  $scope.textError = "";
  $scope.is_backend_ready = false;
  $scope.textTitle = "Listado de eventos";
  $scope.errorModal = false;
  $scope.showEditLayout = false;
  $scope.eventosTodos = "";

  $scope.filterCriteria = {};

  $scope.orderField = "dateStart";
  $scope.orderReverse = "true";

  $scope.optsModal = {
    backdropFade: true,
    dialogFade:true
  };

  console.log('appController');// +$scope.events)

  $http.get('https://sopragroupux.appspot.com/_ah/api/evento/v5/event/').success(function(data)
  {
      $scope.showError = false;
      $scope.textError = "";
      $scope.is_backend_ready = true;

      $scope.events = data.items;
      $scope.eventosTodos = $scope.events.length;

      //console.log('appController $scope.events:' +$scope.events)
    }).error(function(data, status)
    {
      $scope.textError = "Error al cargar los datos. Por favor, intentelo mas tarde";
      $scope.is_backend_ready = false;
      $scope.showError = true;
  });


  $scope.deleteEventRemote = function(idEvent)
  {
    console.log('appController deleteEventRemote');

    $http["delete"]('https://sopragroupux.appspot.com/_ah/api/evento/v5/event/' + idEvent).success(function(data, status)
    {

      var indexEventDelete = findIndexById(idEvent,$scope.events);
      console.log('appController deleteEventRemote -> indexEventDelete: '+indexEventDelete);
      $scope.events.splice(indexEventDelete, 1);

      $scope.hideInfoModal = true;
      $scope.errorModal = false;
      $scope.textStatusModal = "Evento " + idEvent + " eliminado correctamente.";

      $timeout(function() { $scope.deleteEventModal = false; }, 2500);
    }).
    error(function(data, status)
    {
      $scope.hideInfoModal = true;
      $scope.errorModal = true;
      $scope.textStatusModal = "Error: No se ha borrado el evento. Por favor intentelo más tarde. {{ " + status + " }}";

      $timeout(function() { $scope.deleteEventModal = false; }, 4000);
    });

  };


  $scope.openModalRemove  = function(idEvent,title,dateStart,description)
  {
      console.log('openModalRemove');

      $scope.deleteEventModal = true;

      $scope.idEventDialog = idEvent;
      $scope.titleDialog = title;
      $scope.dateStartDialog = dateStart;
      $scope.descriptionDialog = description;
  };


  $scope.closeModalRemove  = function()
  {
      $scope.deleteEventModal = false;
      console.log('closeModalRemove');
  };


  $scope.checkURLImg = function (urlImg)
  {
      var urlDefault = "/img/events/events3.jpg";

      if ((urlImg==undefined) || (urlImg==""))
      {
          return urlDefault;
      }
      else
        {
          return urlImg;
        }
  }

};