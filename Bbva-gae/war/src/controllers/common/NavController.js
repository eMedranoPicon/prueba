/*
 * Watch Equivalent to trigger 'active' class in li elements.
 * */
function NavController($scope, $location)
{
	//console.log('NavController');
	$scope.isActive = function (viewLocation)
    {
    	var s=false;
        //console.log($location.path());
    	if($location.path().indexOf(viewLocation) != -1)
    	{
    		s = true;
    	}
        return s;
    };
}