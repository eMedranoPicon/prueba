/**
* PlaceEditController
* Controlador de edicion de Places
*/

function PlaceEditController($scope, $http, $routeParams)
{
    $scope.showError = false;
    $scope.textError = "";
    $scope.is_backend_ready = false;
    $scope.textTitle = "Editar lugar de inter�s";


    if (angular.isUndefined($scope.places))
    {
        console.log('recargar el scope');

        $http.get('https://sopragroupux.appspot.com/_ah/api/place/v1/place/').success(function(data)
        {
            $scope.showError = false;
            $scope.textError = "";
            $scope.is_backend_ready = true;
            $scope.places = data.items;
            getPlace($routeParams.id);

        }).error(function(data, status)
        {
              $scope.textError = "Error al cargar los datos. Por favor, inténtelo más tarde";
              $scope.is_backend_ready = false;
              $scope.showError = true;
        });
    }
    else
    {
        console.log('llamada a getPlace');
        getPlace($routeParams.id);
    }


    function getPlace(idPlace)
    {

        $scope.indexPlace = findIndexById(idPlace,$scope.places);

        console.log('EditPlaceController getPlace $scope.indexPlace: '+$scope.indexPlace)

        if ($scope.indexPlace != -1)
        {
            $scope.place = $scope.places[$scope.indexPlace];
        }
        else {
            $scope.showError = true;
            $scope.textError = "Lugar de Inter�s" + idPlace + "no encontrado";
        }
    }


    $scope.updatePlace = function()
    {
        console.log('EventPlaceController updatePlace $scope.indexPlace: '+$scope.indexPlace)

        $http.put('https://sopragroupux.appspot.com/_ah/api/place/v1/place', $scope.place).success(function()
        {
            console.log('Haciendo PUT updatePlace');
            $('#confirmaPlace').modal('show');

        }).error(function(data, status)
        {
              $scope.textError = "Error al insertar los datos. Por favor, intentelo m�s tarde";
              $scope.showError = true;
        });
    }

}