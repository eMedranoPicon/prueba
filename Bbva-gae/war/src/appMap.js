


//Add the requried module 'angular-ui' as a dependency
angular.module('maptesting', ['ui.map','ui.event']);

function MapCtrl($scope)
{
    var ll = new google.maps.LatLng(13.0810, 80.2740);
    $scope.mapOptions = {
        center: ll,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //Markers should be added after map is loaded
    $scope.onMapIdle = function()
    {
        if ($scope.myMarkers === undefined)
        {
            var marker = new google.maps.Marker({
                map: $scope.myMap,
                position: ll
            });
            $scope.myMarkers = [marker, ];
        }
    };

    $scope.markerClicked = function(m)
    {
        window.alert("clicked");
    };

}

/*
function onGoogleReady()
{
	angular.bootstrap(document.getElementById("map"), ['ui.map','ui.event']);
}

var appMaps = angular.module('appMaps', ['ui.map','ui.event']);

appMaps.controller('MapCtrl', ['$scope', function ($scope) {


    $scope.mapOptions = {
      center: new google.maps.LatLng(35.784, -78.670),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

     $scope.homeMarker = new google.maps.Marker({
    map: $scope.myMap,
    position: $scope.mapOptions.center
  });

  }]);
  */