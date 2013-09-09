/*
 * Login to Access Google API Calendar
 */
function auth() {
	console.log('Login');
	var config = {
		'client_id' : '785790985795-pf206je1417kten4jbd5funo77vlkuvf.apps.googleusercontent.com',
		'scope' : 'https://www.googleapis.com/auth/calendar',
		'immediate' : true
	};
	gapi.auth.authorize(config, function(data) {
		console.log('login completed');
		var tokenText_auto = data.token_type + ' ' + data.access_token;
		localStorage.setItem('calendarToken_local', tokenText_auto);
	});
	gapi.client.setApiKey('AIzaSyBXuLdZ43wnWNuBltblkukaj97WDfArpfE');	
	gapi.client.load('calendar', 'v3', function() {
		console.log("Dentro del API Calendar");
	});
}