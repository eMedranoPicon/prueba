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

  $scope.orderField = "dateStartStamp";
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


  /* filtrado de eventos */
  var indexedEvents = [];


  $scope.eventsToFilter = function() {
      indexedEvents = [];
      return $scope.events;
  };


  $scope.filterEvents = function(event)
  {
    var teamIsNew = indexedEvents.indexOf(event.datesArray[2]) == -1;
    if (teamIsNew)
    {
        indexedEvents.push(event.datesArray[2]);
    }
    return teamIsNew;
  };


  $scope.filterEvents2 = function(event)
  {
    var teamIsNew = indexedEvents.indexOf(event.datesArray[2]) == -1;
    if ((teamIsNew)&&(event.eventPast==eventPast))
    {
        indexedEvents.push(event.datesArray[2]);
    }
    return teamIsNew;
  };


  $scope.eventsPerMonth = function(mes)
  {
    //console.log('eventsPerMonth mes[2]:'+mes)
    return function(event)
    {
     // console.log('eventsPerMonth event.datesArray[2]:'+event.datesArray[2])
      return event.datesArray[2] == mes;
    }
  };  
};