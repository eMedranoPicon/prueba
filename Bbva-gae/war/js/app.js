//para hacer uso de $resource debemos colocarlo al crear el modulo
var app = angular.module("app", ["ngResource"]);
var url = "https://sopragroupux.appspot.com/_ah/api/evento/v5/event";


//con dataResource inyectamos la factoría
app.controller("appController", function ($scope, $http, dataResource) {

    $window.init= function() {
        $scope.$apply($scope.load_events_lib);
    };

    $scope.load_events_lib = function() {
      gapi.client.load('guestbook', 'v1', function() {
        $scope.is_backend_ready = true;
        $scope.list();
      }, '/_ah/api');
    };


})



//de esta forma tan sencilla consumimos con $resource en AngularJS
app.factory("dataResource", function ($resource) {
    return $resource("https://sopragroupux.appspot.com/_ah/api/evento/v5/event", //la url donde queremos consumir
        {}, //aquí podemos pasar variables que queramos pasar a la consulta
        //a la función get le decimos el método, y, si es un array lo que devuelve
        //ponemos isArray en true
        { get: { method: "GET", isArray: true }
    })
})