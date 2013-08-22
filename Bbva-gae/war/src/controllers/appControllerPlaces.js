function appControllerPlaces($scope, $http, $routeParams)
{
  $scope.showError = false;
  $scope.textError = "";
  $scope.is_backend_ready = false;
  $scope.textTitle = "Listado de Lugares de Interes";

  $scope.orderField = "namePlace";
  $scope.orderReverse = "true";

  console.log('appControllerPlaces');

  $http.get('https://sopragroupux.appspot.com/_ah/api/place/v1/place/').success(function(data)
  {
      $scope.showError = false;
      $scope.textError = "";
      $scope.is_backend_ready = true;
      $scope.events = data.items;
      
    }).error(function(data, status)
    {
      $scope.textError = "Error al cargar los datos. Por favor, intentalo más tarde";
      $scope.is_backend_ready = false;
      $scope.showError = true;
  });

  $scope.deleteEventRemote = function(idPlace)
  {
    console.log('appControllerPlaces deletePlaceRemote');


    $http["delete"]('https://sopragroupux.appspot.com/_ah/api/place/v1/place/' + idPlace).success(function(data, status)
    {
      
      var indexPlaceDelete = findIndexById(idPlace,$scope.places);
      console.log('appControllerPlaces deletePlaceRemote -> indexPlaceDelete: '+indexPlaceDelete);
      $scope.events.splice(indexPlaceDelete, 1);
    }).
    error(function(data, status)
    {
      alert("Refresh table. User already deleted.");
    });
  };

};