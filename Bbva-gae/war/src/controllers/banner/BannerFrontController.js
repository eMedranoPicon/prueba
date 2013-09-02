function BannerFrontController($scope, $http, $routeParams,$rootScope)
{
  $scope.showError = false;
  $scope.textError = "";
  $scope.is_backend_ready = false;
  $scope.textTitle = "Listado de Lugares de Interes";

  $scope.orderField = "namePlace";
  $scope.orderReverse = "true";
  var slides = $scope.slides = [];
  /*timer*/
  $scope.myInterval = 2500;

  console.log('AngularJS - Banner');  
 /* Balance de carga AppEngine - Usando otro servidor.*/
  $http.get('https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/').success(function(data)
  {
      $scope.showError = false;
      $scope.textError = "";
      $scope.is_backend_ready = true;      
      $scope.slides = data.items;
      slides = $scope.slides;
    }).error(function(data, status)
    {
      $scope.textError = "Error al cargar los datos. Por favor, intentalo más tarde";
      $scope.is_backend_ready = false;
      $scope.showError = true;
  });
  
  /*var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 200 + ((slides.length + (25 * slides.length)) % 150);
    slides.push({
      image: 'http://placekitten.com/' + newWidth + '/200',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();
  }*/
  

 

};