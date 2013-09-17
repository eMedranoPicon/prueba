//Add the requried module 'angular-ui' as a dependency
var maptesting = angular.module('maptesting', ['ui.map','ui.event']);


maptesting.controller('MapCtrl', ['$scope', function ($scope)
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

}]);
