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

};