/**
* LibrosListController
* Controlador del listado de libros
*/

  if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj, start) {
	     for (var i = (start || 0), j = this.length; i < j; i++) {
	         if (this[i] === obj) { return i; }
	     }
	     return -1;
	};
     }


function EventsListController($scope, $http) {
  $http.get('https://sopragroupux.appspot.com/_ah/api/evento/v5/event/').success(function(data) {
	$scope.events = data.items;
  });

  //defines una variable
  //$scope.var1 = "EventsListController variable definida desde el controlador";

  //selecciona el desplegable y ordena automaticamente, variable definida en la vista con ng-model
  $scope.orderField = "title";
  $scope.orderReverse = "true";

  $scope.destroyEvent = function(index) {
        // only work with your model, no scope manipulation or DOM...
        // remove the item from the model
        //alert('destroyEvente');
        $scope.events.splice(index, 1);
        // and let angular update the DOM, etc...
    };

    $scope.deleteEventRemote = function(idEvent,index)
    {
    	alert('deleteEVent');
		$http["delete"]('https://sopragroupux.appspot.com/_ah/api/evento/v5/event/' + idEvent).success(function(data, status)
		{
			//$scope.status = status;
			alert(idEvent);
			//alert(index);
			alert($scope.events.indexOf(idEvent));
			$scope.events.splice($scope.events.indexOf(idEvent), 1);

			//$scope.events.splice(index, 1)


		}).error(function(data, status) {
			alert("Refresh table. User already deleted.");
			//$scope.deleteModalShown = false;
		});
	}


}