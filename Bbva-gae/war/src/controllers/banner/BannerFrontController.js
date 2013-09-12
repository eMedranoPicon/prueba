function BannerFrontController($scope, $http, $routeParams,$rootScope)
{
  /* Balance de carga AppEngine - Usando otro servidor.*/
  $scope.URL_API = 'https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/';
  
  $scope.showError = false;
  $scope.textError = "";
  $scope.is_backend_ready = false;
  $scope.textTitle = "Listado de Lugares de Interes";

  $scope.orderField = "namePlace";
  $scope.orderReverse = "true";
  var slides = $scope.slides = [];
  /*timer*/
  $scope.myInterval = 2500;

  console.log('BannerFrontController');

  $http.get($scope.URL_API).success(function(data)
  {
      $scope.showError = false;
      $scope.textError = "";
      $scope.is_backend_ready = true;
      $scope.slides = data.items;
      slides = $scope.slides;
    }).error(function(data, status)
    {
      $scope.textError = "Error al cargar los datos. Por favor, intentalo mas tarde";
      $scope.is_backend_ready = false;
      $scope.showError = true;
  });

};