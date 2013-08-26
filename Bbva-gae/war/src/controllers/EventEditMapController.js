
function EventEditMapController($scope,$rootScope,sharedService)
{
		console.log(' controller : EventEditMapController');

    $scope.myMarkers = [];
    $scope.latitud = 0;
    $scope.longitud = 0;

    var ll = new google.maps.LatLng(0, 0);

    $scope.mapOptions = {
        center: ll,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    console.log('$scope.mapOptions : '+ $scope.mapOptions);


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

        //hace que se ejecuten los watch
        $scope.$digest();
    };


    function upDateMap(lat, lon)
    {
        llUpdate = new google.maps.LatLng(lat,lon);

        console.log('upDateMap '+ lat + '  '+ lon);

        $scope.myMap.setCenter(llUpdate);
        addMarker(llUpdate);

    }


    function addMarker(pos)
    {
      $scope.myMarkers.push(new google.maps.Marker({
          map : $scope.myMap,
          position : pos
      }));
    };


    //$scope.myMarkers.splice(0, $scope.myMarkers.length);
    function removeAllMarkers()
    {
      angular.forEach($scope.myMarkers, function(marker) {
        marker.setMap(null);
      });
    }


    $scope.$on('handleBroadcast', function()
    {
        $scope.latitud = sharedService.latitud;
        $scope.longitud = sharedService.longitud;
        $scope.calleBdc = sharedService.calleBdc;
        $scope.cpBdc = sharedService.cpBdc;
        $scope.ciudadBdc = sharedService.ciudadBdc;
        $scope.paisBdc = sharedService.paisBdc;

        //upDateMap($scope.latitud,$scope.longitud);

        console.log('sharedService en EventEditMapController datos: '+ $scope.latitud + ' ' + $scope.longitud + ' calle: ' + $scope.calleBdc+ ' cpBdc: ' + $scope.cpBdc+ ' ciudadBdc: ' + $scope.ciudadBdc+ ' paisBdc: ' + $scope.paisBdc);
    });


    $scope.$watch('latitud', function()
    {
      console.log('watch latitud: '+sharedService.latitud);
      console.log('watch longitud: '+sharedService.longitud);
      upDateMap(sharedService.latitud,sharedService.longitud);
    });

    //var myLatlngIni = new google.maps.LatLng(LATITUDE_DEFAULT,LONGITUDE_DEFAULT);


}


