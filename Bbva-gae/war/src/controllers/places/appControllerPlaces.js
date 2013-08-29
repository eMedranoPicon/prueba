function appControllerPlaces($scope, $http, $routeParams, $timeout)
{
  $scope.showError = false;
  $scope.textError = "";
  $scope.is_backend_ready = false;
  $scope.textTitle = "Listado de Lugares de Interes";

  $scope.orderField = "namePlace";
  $scope.orderReverse = "true";

  console.log('AngularJS - Place');

  //$http.get('https://sopragroupux.appspot.com/_ah/api/place/v1/place/').success(function(data)
  $http.get('https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/').success(function(data)
  {
      $scope.showError = false;
      $scope.textError = "";
      $scope.is_backend_ready = true;
      $scope.places = data.items;
      
    }).error(function(data, status)
    {
      $scope.textError = "Error al cargar los datos. Por favor, intentalo más tarde";
      $scope.is_backend_ready = false;
      $scope.showError = true;
  });

  $scope.deletePlaceRemote = function(idPlace)
  {
    console.log('appController deletePlaceRemote');

    $http["delete"]('https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/' + idPlace).success(function(data, status)
    {

      var indexPlaceDelete = findIndexById(idPlace,$scope.places);
      console.log('appController  -> indexPlaceDelete: '+indexPlaceDelete);
      $scope.places.splice(indexPlaceDelete, 1);

      $scope.hideInfoModal = true;
      $scope.errorModal = false;
      $scope.textStatusModal = "Evento " + idPlace + " eliminado correctamente.";

      $timeout(function() { $scope.deletePlaceModal = false; }, 2500);
    }).
    error(function(data, status)
    {
      $scope.hideInfoModal = true;
      $scope.errorModal = true;
      $scope.textStatusModal = "Error: No se ha borrado el evento. Por favor intentelo mas tarde. {{ " + status + " }}";

      $timeout(function() { $scope.deletePlaceModal = false; }, 4000);
    });

  };


  $scope.openModalRemove  = function(idPlace,name,description)
  {
      console.log('openModalRemove');

      $scope.deletePlaceModal = true;

      $scope.idPlaceDialog = idPlace;
      $scope.titleDialog = name;
      $scope.descriptionDialog = description;
  };


  $scope.closeModalRemove  = function()
  {
      $scope.deletePlaceModal = false;
      console.log('closeModalRemove');
  };

};