function EventsMapListController($scope, $http, $rootScope, $location) {
	console.log(' controller : PlaceMapList');

	$rootScope.titlePageText3 = $location.path();

	$scope.myMarkers = [];
	$scope.tagsFilter = [];
	$scope.latitud = 0;
	$scope.longitud = 0;
	var LATITUDE_DEFAULT = 40.416949;
	var LONGITUDE_DEFAULT = -3.703347;

	$scope.showError = false;
	$scope.textError = "";
	$scope.is_backend_ready = false;
	$scope.textTitle = "Listado de Lugares de Interes";
	var contentString = '';
	var infowindow = new google.maps.InfoWindow({
		content : contentString
	});
	
	
	var pinColor = "0066AE";
	var pinImage = new google.maps.MarkerImage(
			"http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|"
					+ pinColor, new google.maps.Size(21, 34),
			new google.maps.Point(0, 0), new google.maps.Point(10, 34));
	var bbvaIcon = {
		url : '/img/bbva-icon.png',
		size : new google.maps.Size(20, 32),
		origin : new google.maps.Point(0, 0),
		scaledSize : new google.maps.Size(20, 32),
		anchor : new google.maps.Point(10, 32)
	};
	var pinShadow = new google.maps.MarkerImage(
			"http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
			new google.maps.Size(40, 37), new google.maps.Point(0, 0),
			new google.maps.Point(12, 35));

	var ll = new google.maps.LatLng(LATITUDE_DEFAULT, LONGITUDE_DEFAULT);

	$scope.mapOptions = {
		center : ll,
		zoom : 6,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	// Markers should be added after map is loaded
	$scope.onMapIdle = function() {
		if ($scope.myMarkers === undefined) {
			var marker = new google.maps.Marker({
				map : $scope.myMap,
				position : ll
			});
			$scope.myMarkers = [ marker, ];
		}

		// hace que se ejecuten los watch
		// $scope.$digest();
	};

	function addMarker(pos) {
		$scope.myMarkers.push(new google.maps.Marker({
			map : $scope.myMap,
			position : pos
		}));
	}
	;

	function addMarkerComplete(pos, title) {
		$scope.myMarkers.push(new google.maps.Marker({
			map : $scope.myMap,
			position : pos,
			title : title,
			icon : bbvaIcon,
			shadow : pinShadow
		}));
	}
	;

	function removeAllMarkers() {
		angular.forEach($scope.myMarkers, function(marker) {
			marker.setMap(null);
		});
	}

	$http
			.get('https://sopragroupux.appspot.com/_ah/api/evento/v5/event/')
			.success(function(data) {
				$scope.showError = false;
				$scope.textError = "";
				$scope.is_backend_ready = true;
				$scope.events = data.items;
				$scope.eventsFull = data.items;

				$scope.mapMakers($scope.events);

			})
			.error(
					function(data, status) {
						$scope.textError = "Error al cargar los datos. Por favor, intentalo m�s tarde";
						$scope.is_backend_ready = false;
						$scope.showError = true;
					});

	$scope.mapMakers = function($obj) {

		for (p in $obj) {
			latlong = new google.maps.LatLng($obj[p].address[5],
					$obj[p].address[6]);

			for (k in $obj[p].tagsArray) {
				$scope.tagsFilter.push($obj[p].tagsArray[k]);
			}

			var cabecera = $obj[p].title + ' (' + $obj[p].dateStart + ' - '
					+ $obj[p].dateStart + ') - ' + $obj[p].address[4];
			
			var contentW = '<div class="contentWin">'+
		      '<a href="/events.jsp#/event-detail/'+$obj[p].id+'"><h3>'+$obj[p].title+'</h3></a>'+
		      '<div id="bodyContent">'+
		      '<p>'+$obj[p].dateStart+' - '+ $obj[p].dateStart+'</p>'+
		      '<p>'+$obj[p].address[4]+'</p>'+
		      '</div></div>';
			
			addMarkerCompleteW(latlong, cabecera,contentW);
		}
		$scope.getTags();
	}
		
	function addMarkerCompleteW(pos, title,contentW) {
		var marker = new google.maps.Marker({
			map : $scope.myMap,
			position : pos,
			title : title,
			icon : bbvaIcon,
			shadow : pinShadow
		});
		$scope.myMarkers.push(marker);
		
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(contentW);
		    infowindow.open($scope.myMap,marker);
		  });
	}
	;

	$scope.filterMarker = function(param) {
		removeAllMarkers();
		$scope.myMarkers = [];
		if (param != '') {
			$scope.eventsFiltered = [];

			for (m in $scope.events) {
				if ($scope.events[m].tagsArray.indexOf(param) != -1) {
					$scope.eventsFiltered.push($scope.events[m]);
				}
			}
			$scope.mapMakers($scope.eventsFiltered);
		} else {
			$scope.mapMakers($scope.eventsFull);
		}
	}

	$scope.getTags = function() {
		for (a in $scope.tagsFilter) {
			$scope.tagsFilter[a] = $scope.tagsFilter[a].removeAccents();
		}
		eliminateDuplicates($scope.tagsFilter);
		$scope.tagsFilter.sort();
	}

	String.prototype.removeAccents = function() {
		return this.replace(/[áàãâä]/gi, "a").replace(/[éè¨ê]/gi, "e").replace(
				/[íìïî]/gi, "i").replace(/[óòöôõ]/gi, "o").replace(/[úùüû]/gi,
				"u").replace(/[ç]/gi, "c").replace(/[ñ]/gi, "n").replace(
				/[^a-zA-Z0-9]/g, " ");
	}

	function eliminateDuplicates(arr) {
		var i, len = arr.length, out = [], obj = {};

		for (i = 0; i < len; i++) {
			obj[arr[i]] = 0;
		}
		for (i in obj) {
			out.push(i);
		}

		return $scope.tagsFilter = out;
	}

}
