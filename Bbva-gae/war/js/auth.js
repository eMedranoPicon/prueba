// Token
var calendarToken;
//no usado de momento
      function auth_2() {
    	  //gapi.client.setApiKey('AIzaSyBXuLdZ43wnWNuBltblkukaj97WDfArpfE');
      	var config = {
      		'client_id' : '785790985795-pf206je1417kten4jbd5funo77vlkuvf.apps.googleusercontent.com',
      		'scope' : 'https://www.googleapis.com/auth/calendar',
      		'inmediate': true
      	};
      	gapi.auth.authorize(config, function(data) {
      		console.log('login complete');
      		console.log(data);
      		//calendarToken = gapi.auth.getToken();
      	});
      	
  }

      
