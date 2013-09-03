/*
 * Watch Equivalent to trigger 'active' class in li elements.
 * */
function NavController($scope, $location) 
{ 
    $scope.isActive = function (viewLocation) {
    	var s=false;
    	console.log('path :'+$location.path());
    	console.log('view :'+viewLocation);
    	if($location.path().indexOf(viewLocation) != -1){
    	 s = true;
     	console.log(s);
    	}
        return s;
    };
}