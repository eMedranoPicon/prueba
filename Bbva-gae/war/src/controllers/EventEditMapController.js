
function EventEditMapController($scope,$rootScope,sharedService)
{
		console.log(' controller : EventEditMapController');

    $scope.myMarkers = [];
    $scope.latitud = 0;
    $scope.longitud = 0;
    var LATITUDE_DEFAULT = 40.416949;
    var LONGITUDE_DEFAULT =  -3.703347;

    var ll = new google.maps.LatLng(LATITUDE_DEFAULT, LONGITUDE_DEFAULT);

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
        var llUpdate = new google.maps.LatLng(lat,lon);

        console.log('upDateMap '+ lat + '  '+ lon);

        $scope.myMap.setCenter(llUpdate);
        removeAllMarkers();
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


    function calcLatLon(calle,cp,ciudad,pais)
    {
      var address = calle + "," +cp+","+ciudad+","+pais;
      console.log('address:'+address);
      geocoder = new google.maps.Geocoder();

      geocoder.geocode
       (
          {
            'address' : address
          },
          function(results, status)
          {
              if (status == google.maps.GeocoderStatus.OK)
              {
                  console.log('calcLatLon:' + results[0].geometry.location);
                  upDateMap(results[0].geometry.location.mb,results[0].geometry.location.nb)
              }
              else
              {
                console.log("Geocode was not successful for the following reason: " + status);
              }
          }
        );
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
        console.log('LANZADO EVENTO DESDE EL CLICK');
        calcLatLon($scope.calleBdc,$scope.cpBdc,$scope.ciudadBdc,$scope.paisBdc);
        //console.log('sharedService en EventEditMapController datos: '+ $scope.latitud + ' ' + $scope.longitud + ' calle: ' + $scope.calleBdc+ ' cpBdc: ' + $scope.cpBdc+ ' ciudadBdc: ' + $scope.ciudadBdc+ ' paisBdc: ' + $scope.paisBdc);
    });


    $scope.$watch('latitud', function()
    {
        console.log('watch latitud: en EvenEditController: '+ sharedService.latitud + ' ' + sharedService.longitud + ' calle: ' + sharedService.calleBdc+ ' cpBdc: ' + sharedService.cpBdc+ ' ciudadBdc: ' + sharedService.ciudadBdc+ ' paisBdc: ' + sharedService.paisBdc);
        //upDateMap(sharedService.latitud,sharedService.longitud);
        calcLatLon(sharedService.calleBdc,sharedService.cpBdc,sharedService.ciudadBdc,sharedService.paisBdc);
    });

    //var myLatlngIni = new google.maps.LatLng(LATITUDE_DEFAULT,LONGITUDE_DEFAULT);


}


