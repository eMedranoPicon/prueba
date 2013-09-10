/*
 * Login to Access Google API Calendar
 */
var CLIENT_ID = '785790985795-pf206je1417kten4jbd5funo77vlkuvf.apps.googleusercontent.com';
var SCOPES = 'https://www.googleapis.com/auth/calendar';

/**
 * Called when the client library is loaded to start the auth flow.
 */
function handleClientLoadCalendar() {
	window.setTimeout(checkAuth, 1);
}

/**
 * Check if the current user has authorized the application.
 */
function checkAuth() {
	gapi.auth.authorize({
		'client_id' : CLIENT_ID,
		'scope' : SCOPES,
		'immediate' : true
	}, handleAuthResult);
}
/**
 * Called when authorization server replies.
 * 
 * @param {Object}
 *            authResult Authorization result.
 */
function handleAuthResult(authResult) {
	if (authResult && !authResult.error) {
		// Access token has been successfully retrieved, requests can be sent to
		// the API.
		gapi.client.load('calendar', 'v3', function() {
			console.log("Dentro del API Calendar");
		});
	} else {
		console.log("Error al acceder del API Calendar");
	}
}