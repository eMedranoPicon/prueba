		// Abrimos ventana
		
		function abreVentana(){ 

			var ventana = window.open('https://webcorporativa.bankinter.com/www2/corporativa/es/cumplimiento_normativo/politica_de_cookies','','scrollbars=yes,resizable=yes,width=450,height=420,top=0,left=0');
 			ventana.focus(); 
		}
		
		function parseUri (str) {
			var o = parseUri.options,
			m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
			uri = {},
			i = 14;
			while (i--) uri[o.key[i]] = m[i] || "";
			uri[o.q.name] = {};
			uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
			if ($1) uri[o.q.name][$1] = $2;
			});
			return uri;
		}
			
		parseUri.options = {
			strictMode: false,
			key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
			q: {
			name: "queryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
			},
			parser: {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
			}
		}; 		
		
		//Obtiene el valor de una cookie	
			function getCookie(c_name) {
				var c_value = document.cookie;
				var c_start = c_value.indexOf(" " + c_name + "=");
				if (c_start == -1) {
				  c_start = c_value.indexOf(c_name + "=");
				  }
				if (c_start == -1) {
				  c_value = null;
				
				} else {
				  c_start = c_value.indexOf("=", c_start) + 1;
				  var c_end = c_value.indexOf(";", c_start);
				
				  if (c_end == -1) {
					c_end = c_value.length;
				  }
					c_value = unescape(c_value.substring(c_start,c_end));
				}
				return c_value;
			}		
			
			//Oculta el mensaje de politica de cookie
			function ocultarMensaje(){
				
				var value = getCookie('bkCookieLegal');
				if(value=='si'){
					muestra_oculta('divCookie', false);
				} else{
						if(value=='InicioSesion')
						{
							var uri=parseUri (document.location); 
							var refererr = document.referrer;
							var dominio = uri.authority;
							if (refererr==''){
								muestra_oculta('divCookie', true);
							}else				
								if (refererr.indexOf (dominio)){
									setCookie('bkCookieLegal','si',365);
									muestra_oculta('divCookie', false);
								}else{
									muestra_oculta('divCookie', true);
								}
						}else
						{
							setCookie('bkCookieLegal','InicioSesion',null);
							muestra_oculta('divCookie', true);
						}
					}
			}
			
			//Crea una cookie con nombre, valor, y dias en los que expirara
			function setCookie(c_name,value,exdays){
				
				var exdate=new Date();
				exdate.setDate(exdate.getDate() + exdays);
				var c_value=escape(value) + ((exdays==null) ? "" : ";expires="+exdate.toUTCString()) + ";path=/";
				document.cookie=c_name + "=" + c_value;
			}
			
			
			//oculta o muestra una capa en función del valor booleano "esVisible"
			function muestra_oculta(id, esVisible){
				if (document.getElementById){ 
					var el = document.getElementById(id); 
					(esVisible)?el.style.display = 'block':el.style.display = 'none';
				}
			}
			
			ocultarMensaje();