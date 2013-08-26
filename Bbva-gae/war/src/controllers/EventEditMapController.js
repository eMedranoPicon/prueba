
function EventEditMapController($scope,$attrs)
{
		console.log(' controller : EventEditMapController');

    var ll = new google.maps.LatLng(13.0810, 80.2740);

    console.log('EventEditMapController: '+$scope.event);

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


