
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

angular.module('mesEnLiteral', []).filter('mesEnLiteral', function()
{
    return function(input)
        {
          switch(input)
        {
          case '1':
            return 'enero';
            break;
          case '2':
            return 'febrero';
            break;
          case '3':
            return 'marzo';
            break;
          case '4':
            return 'abril';
            break;
          case '5':
            return 'mayo';
            break;
          case '6':
            return 'junio';
            break;
          case '7':
            return 'julio';
            break;
          case '8':
            return 'agosto';
            break;
          case '9':
            return 'septiembre';
            break;
          case '10':
            return 'octubre';
            break;
          case '11':
            return 'noviembre';
            break;
          case '12':
            return 'diciembre';
            break;
        }
      };
});

angular.module('lugares', []).filter('acronimoLugar', function()
		{
		  	return function(input)
		  			{
		   				switch(input)
						{
							case 'Restaurante':
							  return 're';
							  break;
							case 'Centro Convenciones':
							  return 'cc';
							  break;
							case 'Gimnasio':
							  return 'gm';
							  break;
							default:
							   return 'other';
						}
					};
		});


