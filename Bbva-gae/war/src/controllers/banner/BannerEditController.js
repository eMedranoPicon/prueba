/**
* BannerEditController
* Controlador de edicion de Banner
*/

function BannerEditController($scope, $http, $routeParams, $rootScope)
{
	console.log('BannerEditController');
	
	$scope.showError = false;
    $scope.textError = "";
    $scope.is_backend_ready = false;
    $scope.textTitle = "Editar Banner";
    $scope.showEditLayout = false;

    $scope.placeModal = false;
    $scope.errorModal = false;
    $scope.optsModal = {
      backdropFade: true,
      dialogFade:true
    };


    		if (angular.isUndefined($scope.bannerList))
    {
        console.log('recargar el scope');
        /* Balance de carga AppEngine - Usando otro servidor.*/
        $http.get('https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/').success(function(data)
        {
            $scope.showError = false;
            $scope.textError = "";
            $scope.is_backend_ready = true;
            $scope.bannerList = data.items;
            getBanner($routeParams.id);
            $scope.$apply();

        }).error(function(data, status)
        {
              $scope.textError = "Error al cargar los datos. Por favor, intentalo mas tarde";
              $scope.is_backend_ready = false;
              $scope.showError = true;
        });
    }
    else
    {
        console.log('Scope no recargado. getBanner');
        getBanner($routeParams.id);
    }
    		


   function getBanner(idBanner)
    {

        $scope.indexBanner = findIndexById(idBanner,$scope.bannerList);

        if ($scope.indexBanner != -1)
        {
            $scope.banner = $scope.bannerList[$scope.indexBanner];           
        }
        else {
            $scope.showError = true;
            $scope.textError = "Banner con id " + idBanner + "no encontrado";
        }
    }

   $scope.updateBanner = function() 
    {

    	console.log('Editando Banner con id:'+$scope.banner.id)
    	
    	/* Balance de carga AppEngine - Usando otro servidor.*/
		$http.put('https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/', $scope.banner).success(function()
        {
            console.log('Guardando');      
            $scope.$apply();

        }).error(function(data, status)
        {
              $scope.textError = "Error al insertar los datos. Por favor, intentelo mas tarde";
              $scope.showError = true;
        });
    }
    
   
/*
    $scope.openModalUpdate = function()
    {
    	$scope.updatePlaceLocation();
        console.log('openModal');
        $scope.placeModal = true;
    };

    $scope.closeModal  = function()
    {
        $scope.placeModal = false;
        console.log('closeModal');
        //if (!$scope.$$phase) { $scope.$apply(); }
        $scope.$apply();
        $location.path('/');
    };*/

}