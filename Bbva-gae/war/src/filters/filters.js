
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

angular.module('acronimoLugar', []).filter('acronimoLugar', function()
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
				case 'Museo':
				  return 'mu';
				  break;
				default:
				   return 'other';
			}
		};
});

angular.module('titlePage', []).filter('titlePage', function()
{
    return function(input)
    {
      if ((input==undefined) || (input==""))
      {
        return '';
      }
      else
      {
       //console.log('titlePage filter:'+input);
        if (input.indexOf('banner-list') != -1 )
        {
          return 'Listado de sliders';
        }
        if (input.indexOf('banner-edit') != -1 )
        {
          return 'Editar slider';
        }
        if (input.indexOf('banner-new') != -1 )
        {
          return 'Dar de alta un nuevo slider';
        }
        if (input.indexOf('banner-app.jsp') != -1 )
        {
          return 'Listado de sliders';
        }
        if (input.indexOf('events-list') != -1 )
        {
          return 'Listado de eventos';
        }
        if (input.indexOf('events.jsp') != -1 )
        {
          return 'Listado de eventos';
        }
        if (input.indexOf('events2') != -1 )
        {
          return 'Listado de eventos';
        }
        if (input.indexOf('events-past') != -1 )
        {
          return 'Listado de eventos pasados';
        }
        if (input.indexOf('events-prox') != -1 )
        {
          return 'Listado de eventos proximos';
        }
        if (input.indexOf('events-map') != -1 )
        {
          return 'Mapa de eventos';
        }
        if (input.indexOf('events-calendar') != -1 )
        {
          return 'Calendario de eventos';
        }


        else{ return input;}
      }
    };
});

angular.module('titlePageBack', []).filter('titlePageBack', function()
		{
		    return function(input)
		    {
		      if ((input==undefined) || (input==""))
		      {
		        return '';
		      }
		      else
		      {
		        if (input.indexOf('place-edit') != -1 )
		        {
		          return 'Edición Lugar de Interés';
		        }
		        if (input.indexOf('place-new') != -1 )
		        {
		          return 'Nuevo Lugar de Interés';
		        }
		        if (input.indexOf('place-map') != -1 )
		        {
		          return 'Mapa Lugares de Interés';
		        }  
		        if (input.indexOf('/places-app') != -1 )
		        {
			          return 'Listado Lugares de Interés';
			    }
		        else{ return input;}
		      }
		    };
		});

