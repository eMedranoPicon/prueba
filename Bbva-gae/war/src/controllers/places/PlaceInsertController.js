/**
* PlaceEditController
* Controlador de edicion de Places
*/

function PlaceInsertController($scope, $http, $routeParams)
{
    $scope.showError = false;
    $scope.textError = "";
    $scope.is_backend_ready = false;
    $scope.textTitle = "Insertar lugar de interes";  

    $scope.place = {};
    $scope.savePlace = function()
    {

    	console.log('EventPlaceController updasavePlacetePlace $scope.place: '+$scope.place)

        $http.post('https://sopragroupux.appspot.com/_ah/api/place/v1/place', $scope.place).success(function()
        {
            console.log('Guardando');
            $('#confirmaPlace').modal('show');

        }).error(function(data, status)
        {
              $scope.textError = "Error al insertar los datos. Por favor, intentelo más tarde";
              $scope.showError = true;
        });
    }

}