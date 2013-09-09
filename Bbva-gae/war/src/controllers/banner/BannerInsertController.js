/**
* Controlador de edicion de Banner
*/

function BannerInsertController($scope, $http, $routeParams, $rootScope,$location)
{
	console.log('BanneInsertController');

	$scope.showError = false;
    //$scope.textError = "";
    $scope.is_backend_ready = false;
    $scope.textTitle = "Nuevo Banner";

    $scope.banner = {};

   $scope.saveBanner = function ()
    {

    	console.log("New Banner");
 		console.log("Insertando: "+$scope.banner);

    	/* Balance de carga AppEngine - Usando otro servidor.*/
    	$http.post('https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/', $scope.banner).success(function()
        {
            console.log('Guardando');
            $location.path("#/banner-list");

        }).error(function(data, status)
        {
              $scope.textError = "Error al insertar los datos. Por favor, intentelo mas tarde";
              $scope.showError = true;
        });
    }

  /*
    $scope.openModalInsert = function()
    {
      console.log('openModal saveEvent');
      $scope.insertPlaceLocation();
        console.log('openModal');
        $scope.placeModal = true;
    };

    $scope.closeModal  = function()
    {
        $scope.placeModal = false;
        console.log('closeModal');
        // apply...
        $scope.$apply();
        $location.path('/');
    };*/

}