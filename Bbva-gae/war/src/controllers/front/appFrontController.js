function appFrontController($scope, $http, $routeParams)
{
  console.log('appFrontController');

  $scope.showError = false;
  $scope.textError = "";
  $scope.is_backend_ready = false;
  $scope.textTitle = "Listado de eventos";

  $scope.showEditLayout = false;
  $scope.eventosTodos = "";

  $scope.filterCriteria = {};

  $scope.orderField = "dateStart";
  $scope.orderReverse = "true";


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
      $scope.textError = "Error al cargar los datos. Por favor, inténtelo más tarde";
      $scope.is_backend_ready = false;
      $scope.showError = true;
    });

   var indexedTeams = [];

    $scope.playersToFilter = function() {
        indexedTeams = [];
        return $scope.events;
    }

    $scope.filterTeams = function(player)
    {
      var teamIsNew = indexedTeams.indexOf(player.datesArray[2]) == -1;
      if (teamIsNew)
      {
          indexedTeams.push(player.datesArray[2]);
      }
      return teamIsNew;
    }


};