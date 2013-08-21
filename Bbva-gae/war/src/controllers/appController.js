function appController($scope, $http, $routeParams)
{
  $scope.showError = false;
  $scope.textError = "";
  $scope.is_backend_ready = false;
  $scope.textTitle = "Listado de eventos";

  $scope.orderField = "dateStart";
  $scope.orderReverse = "true";

  console.log('appController');// +$scope.events)

  $http.get('https://sopragroupux.appspot.com/_ah/api/evento/v5/event/').success(function(data)
  {
      $scope.showError = false;
      $scope.textError = "";
      $scope.is_backend_ready = true;
      $scope.events = data.items;
      //console.log('appController $scope.events:' +$scope.events)
    }).error(function(data, status)
    {
      $scope.textError = "Error al cargar los datos. Por favor, inténtelo más tarde";
      $scope.is_backend_ready = false;
      $scope.showError = true;
  });

  $scope.deleteEventRemote = function(idEvent)
  {
    console.log('appController deleteEventRemote');


    $http["delete"]('https://sopragroupux.appspot.com/_ah/api/evento/v5/event/' + idEvent).success(function(data, status)
    {
      //$scope.status = status;
      //  alert(idEvent);
      //alert(index);
      //alert($scope.events.indexOf(idEvent));
      var indexEventDelete = findIndexById(idEvent,$scope.events);
      console.log('appController deleteEventRemote -> indexEventDelete: '+indexEventDelete);
      $scope.events.splice(indexEventDelete, 1);
      //$scope.events.splice(index, 1)
    }).
    error(function(data, status)
    {
      alert("Refresh table. User already deleted.");
      //$scope.deleteModalShown = false;
    });
  };

};