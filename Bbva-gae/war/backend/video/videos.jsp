<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-type" content="text/html;charset=UTF-8">
<script type="text/javascript">
	var CLIENT_ID = '785790985795-pf206je1417kten4jbd5funo77vlkuvf.apps.googleusercontent.com';
	var SCOPES = 'https://www.googleapis.com/auth/drive';

	/**
	 * Called when the client library is loaded to start the auth flow.
	 */
	function handleClientLoad() {
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
	 * @param {Object} authResult Authorization result.
	 */
	function handleAuthResult(authResult) {
		var authButton = document.getElementById('authorizeButton');
		var filePicker = document.getElementById('filePicker');
		authButton.style.display = 'none';
		filePicker.style.display = 'none';
		if (authResult && !authResult.error) {
			// Access token has been successfully retrieved, requests can be sent to the API.
			filePicker.style.display = 'block';
			filePicker.onchange = uploadFile;
		} else {
			// No access token could be retrieved, show the button to start the authorization flow.
			authButton.style.display = 'block';
			authButton.onclick = function() {
				gapi.auth.authorize({
					'client_id' : CLIENT_ID,
					'scope' : SCOPES,
					'immediate' : false
				}, handleAuthResult);
			};
		}
	}

	/**
	 * Start the file upload.
	 *
	 * @param {Object} evt Arguments from the file selector.
	 */
	function uploadFile(evt) {
		gapi.client.load('drive', 'v2', function() {
			var file = evt.target.files[0];
			insertFile(file);
		});
	}

	/**
	 * Insert new file.
	 *
	 * @param {File} fileData File object to read data from.
	 * @param {Function} callback Function to call when the request is complete.
	 */
	function insertFile(fileData, callback) {
		const
		boundary = '-------314159265358979323846';
		const
		delimiter = "\r\n--" + boundary + "\r\n";
		const
		close_delim = "\r\n--" + boundary + "--";

		var reader = new FileReader();
		reader.readAsBinaryString(fileData);
		reader.onload = function(e) {
			var contentType = fileData.type || 'application/octet-stream';
			var metadata = {
				'title' : fileData.name,
				'parents' : [ {
					"id" : "0B7sf9nIuNLe-S0VBdXlrNVl3eGs"
				} ],
				'mimeType' : contentType
			};

			var base64Data = btoa(reader.result);
			var multipartRequestBody = delimiter
					+ 'Content-Type: application/json\r\n\r\n'
					+ JSON.stringify(metadata) + delimiter + 'Content-Type: '
					+ contentType + '\r\n'
					+ 'Content-Transfer-Encoding: base64\r\n' + '\r\n'
					+ base64Data + close_delim;

			var request = gapi.client.request({
				'path' : '/upload/drive/v2/files',
				'method' : 'POST',
				'params' : {
					'uploadType' : 'multipart'
				},
				'headers' : {
					'Content-Type' : 'multipart/mixed; boundary="' + boundary
							+ '"'
				},
				'body' : multipartRequestBody
			});
			if (!callback) {
				callback = function(file) {
					console.log(file);
					retrieveAllFiles();
				};
			}
			request.execute(callback);
		}
	}

	/**
	 * Show Files new file.
	 *
	 * @param {Function} callback Function to call when the request is complete.
	 */
	 var retrieveAllFiles = function () {
         var retrievePageOfFiles = function(request, result) {
             request.execute(function(resp) {
                 console.log(resp);
                 result = result.concat(resp.items);
                 var nextPageToken = resp.nextPageToken;
                 console.log("nextPageToken ="+nextPageToken);
                 if (nextPageToken) {
                     request = gapi.client.drive.files.list({'pageToken': nextPageToken});
                     retrievePageOfFiles(request, result);
                 } else {
                     printFileList(result);
                 }
             });
         }
     var initialRequest = gapi.client.drive.files.list({'maxResults': 10});
     console.log("initialRequest = "+initialRequest);
      retrievePageOfFiles(initialRequest, []);
     }
</script>
<script type="text/javascript"
	src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>
</head>
<body>
	<!--Add a file picker for the user to start the upload process -->
	<input type="file" id="filePicker" style="display: none" />
	<input type="button" id="authorizeButton" style="display: none"
		value="Authorize" />
</body>
</html>