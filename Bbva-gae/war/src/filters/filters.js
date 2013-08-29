
angular.module('checkImg', []).filter('checkImg', function()
{
  	return function(input)
  			{
   				var urlDefault = "/img/events/events3.jpg";
   				if ((input==undefined) || (input==""))
      			{
          			return urlDefault;
      			}
      			else
        		{
          			return input;
        		}
			};
});


angular.module('acronimoPais', []).filter('acronimoPais', function()
{
  	return function(input)
  			{
   				switch(input)
				{
					case 'España':
					  return 'es';
					  break;
					case 'Spain':
					  return 'es';
					  break;
					case 'Estados Unidos':
					  return 'us';
					  break;
					default:
					   return 'es';
				}
			};
});


angular.module('weDontLike', []).filter('weDontLike', function(){

    return function(items, name){

        var arrayToReturn = [];
        for (var i=0; i<items.length; i++){
            if (items[i].name != name) {
                arrayToReturn.push(items[i]);
            }
        }

        return arrayToReturn;
    };
});

angular.module('months', []).filter('months', function(){

    return function(items, month){

        var arrayToReturn = [];
        for (var i=0; i<items.length; i++){
            if (items[i].dateStart == month) {
                arrayToReturn.push(items[i]);
            }
        }
        return arrayToReturn;
    };
});


