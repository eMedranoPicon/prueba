/*
 * Watch Equivalent to trigger 'active' class in li elements.
 * */
function NavController($scope, $location) 
{ 
    $scope.isActive = function (viewLocation) {
    	var s=false;
    	if($location.path().indexOf(viewLocation) != -1){
    	 s = true;
    	}
        return s;
    };
}