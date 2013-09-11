/*
 * Login to Access Google API Drive
 */
var CLIENT_ID = '785790985795-pf206je1417kten4jbd5funo77vlkuvf.apps.googleusercontent.com';
var CLIENT_ID_FRONT = '785790985795-0vf2bfiimlndb3jbti86ju054av973u8.apps.googleusercontent.com';
var SCOPES = 'https://www.googleapis.com/auth/drive';
var SCOPES_READ = 'https://www.googleapis.com/auth/drive.readonly';
var APIKEY = "AIzaSyAhyF-UL_Qr1eChaf3KrlgerqkerutsFzw"
/**
 * Called when the client library is loaded to start the auth flow.
 */
function handleClientLoad() {
	gapi.client.setApiKey(APIKEY);
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
	var authButton = document.getElementById('authorizeButton');
	var filePicker = document.getElementById('filePicker');
	authButton.style.display = 'none';
	filePicker.style.display = 'none';
	if (authResult && !authResult.error) {
		// Access token has been successfully retrieved, requests can be sent to
		// the API.
		gapi.client.load('drive', 'v2', function(status) {
			console.log("Dentro del API");
		});
		filePicker.style.display = 'block';
		filePicker.onchange = uploadFile;
	} else {
		// No access token could be retrieved, show the button to start the
		// authorization flow.
		authButton.style.display = 'block';
		authButton.onclick = function() {
			gapi.auth.authorize({
				'client_id' : CLIENT_ID,
				'scope' : SCOPES,
				'immediate' : true
			}, handleAuthResult);
		};
	}
}

/*
 * Login to Access Google API Drive
 */
/**
 * Called when the client library is loaded to start the auth flow.
 */
function handleClientLoadList() {
	gapi.client.setApiKey(APIKEY);
	window.setTimeout(checkAuthList, 1);
}

/**
 * Check if the current user has authorized the application.
 */
function checkAuthList() {
	gapi.auth.authorize({
		'client_id' : CLIENT_ID,
		'scope' : SCOPES,
		'immediate' : true
	}, handleAuthResultList);
}

/**
 * Called when authorization server replies.
 * 
 * @param {Object}
 *            authResult Authorization result.
 */
function handleAuthResultList(authResultList) {
	// Access token has been successfully retrieved, requests can be sent to the
	// API.
	gapi.client.load('drive', 'v2', function(status) {
		console.log(status);
		console.log("Dentro del API for Listing");
		retrieveAllFiles();
	});

}

/*
 * Login to Access Google API Drive
 */
/**
 * Called when the client library is loaded to start the auth flow.
 */
function handleClientLoadFront() {
	gapi.client.setApiKey(APIKEY);
	window.setTimeout(checkAuthFront, 1);
}

/**
 * Check if the current user has authorized the application.
 */
function checkAuthFront() {
	gapi.auth.authorize({
		'client_id' : CLIENT_ID,
		'scope' : SCOPES,
		'immediate' : true
	}, handleAuthResultFront);
}

/**
 * Called when authorization server replies.
 * 
 * @param {Object}
 *            authResult Authorization result.
 */
function handleAuthResultFront(authResultList) {
	// Access token has been successfully retrieved, requests can be sent to the
	// API.
	gapi.client.load('drive', 'v2', function(status) {
		console.log(status);
		console.log("Dentro del API for Front");
		retrieveAllFilesFront();
	});

}