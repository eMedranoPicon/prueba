function appControllerBanner($scope, $http, $routeParams,$location, $timeout)
{
  $scope.showError = false;
  $scope.textError = "";
  $scope.is_backend_ready = false;
  $scope.textTitle = "Listado de Lugares de Interes";

  $scope.orderField = "namePlace";
  $scope.orderReverse = "true";

  console.log('AngularJS - Banner');  
 /* Balance de carga AppEngine - Usando otro servidor.*/
  $http.get('https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/').success(function(data)
  {
      $scope.showError = false;
      $scope.textError = "";
      $scope.is_backend_ready = true;      
      $scope.bannerList = data.items; 
      $scope.$apply();
    }).error(function(data, status)
    {
      $scope.textError = "Error al cargar los datos. Por favor, intentalo más tarde";
      $scope.is_backend_ready = false;
      $scope.showError = true;
  });

  $scope.removeBanner = function(idBanner)
  {
    console.log('Remove Banner');

    $http["delete"]('https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/' + idBanner).success(function(data, status)
    {

      var indexBannerDelete = findIndexById(idBanner,$scope.bannerList);
      console.log('Banner id to Delete: '+indexBannerDelete);
      $scope.bannerList.splice(indexBannerDelete, 1);

      $scope.hideInfoModal = true;
      $scope.errorModal = false;
      $scope.textStatusModal = "Evento " + idBanner + " eliminado correctamente.";
      $location.path("/");
      //$timeout(function() { $scope.deletePlaceModal = false; }, 1500);
    }).
    error(function(data, status)
    {
      $scope.hideInfoModal = true;
      $scope.errorModal = true;
      $scope.textStatusModal = "Error: No se ha borrado el evento. Por favor intentelo mas tarde. {{ " + status + " }}";

      //$timeout(function() { $scope.deletePlaceModal = false; }, 3000);
    });

  };

/*
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
  };*/

};