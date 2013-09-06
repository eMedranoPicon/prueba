<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="com.google.appengine.api.users.User"%>
<%@ page import="com.google.appengine.api.users.UserService"%>
<%@ page import="com.google.appengine.api.users.UserServiceFactory"%>
<%
	UserService userService = UserServiceFactory.getUserService();
	User user = userService.getCurrentUser();

	String url = userService.createLoginURL(request.getRequestURI());
	String urlLinktext = "Login";
	if (user != null) {
		url = userService.createLogoutURL(request.getRequestURI());
		urlLinktext = "Logout";
	}
%>
<!DOCTYPE html>

<html lang="es">
<head>
<title>backend - places:: BBVA in cloud</title>
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<!-- styles -->
<link rel="stylesheet" type="text/css" href="/css/main.css" />

<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
      <script src="/js/lib/html5shiv.js"></script>
    <![endif]-->
<meta http-equiv="Content-type" content="text/html;charset=UTF-8">
<script type="text/javascript">	

	/**
	 * Start the file upload.
	 *
	 * @param {Object} evt Arguments from the file selector.
	 */
	function uploadFile(evt) {
			var file = evt.target.files[0];
			insertFile(file);
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
				};
			}
			request.execute(callback);
		}
	}

	/**
	 * Show Files new file.
	 *
	 */
	var retrieveAllFiles = function() {
		var retrievePageOfFiles = function(request, result) {
			request.execute(function(resp) {
				//result = result.concat(resp.items);			
				
				var html = '<ul>';
				for (var key in resp.items)
				{
					/*Que sea tipo video y que no este borrado*/
					if (!(typeof resp.items[key].embedLink === 'undefined') && (resp.items[key].explicitlyTrashed != true)
) {
						console.log(resp.items[key]);
					var linkAll =resp.items[key].webContentLink;
					var link = linkAll.substr(0, linkAll.indexOf('&')); 
					
					var linkVideoAll = resp.items[key].embedLink;
					var linkVideo = linkVideoAll.substr(0, linkVideoAll.indexOf('&BASE_URL=https://docs.google.com/')); 
					html += '<li><b>' + key + '</b> ' + 
					resp.items[key].title +'<br>'+resp.items[key].mimeType+'<br>'+link+'<br>'+linkVideo+'<br>'+
					'INICIO<video width="320" height="240" controls>'+
					'<source src='+linkVideo+' type="video/mp4">'+
					'<source src='+linkVideo+' type="video/ogg">'+					
					'Your browser does not support the video tag.</video>FIN'+
					'<br>embed<embed src='+linkVideo+'&output=embed type="application/x-shockwave-flash" wmode="transparent"><br>'+
					'<br>iframe<iframe src='+linkVideo+'&output=embed type="application/x-shockwave-flash" wmode="transparent"></iframe><hr>'+
					'START<video width="320" height="240" controls>'+
					'<source src='+link+' type="video/mp4">'+
					'<source src='+link+' type="video/ogg">'+
					'Your browser does not support the video tag.</video>END'+
					'<br>embed<embed src='+link+'&output=embed type="application/x-shockwave-flash" wmode="transparent">'+
					'<br>iframe<iframe src='+link+'&output=embed type="application/x-shockwave-flash" wmode="transparent"></iframe></li><hr><hr><hr>';
				    }
				}

				html += '</ul>';

				document.getElementById('Listado').innerHTML = html;
				
				/*
				var nextPageToken = resp.nextPageToken;
				console.log("nextPageToken =" + nextPageToken);
				if (nextPageToken) {
					request = gapi.client.drive.files.list({
						'pageToken' : nextPageToken
					});
					retrievePageOfFiles(request, result);
				} else {
					console.log(result);
				}*/
			});
		}
		var initialRequest = gapi.client.drive.files.list({
			'maxResults' : 10,'q':'"0B7sf9nIuNLe-S0VBdXlrNVl3eGs" in parents'
		});
		console.log("initialRequest = " + initialRequest);
		retrievePageOfFiles(initialRequest, []);
	}
</script>
</head>
<body>

	<div class="container">

		<!-- include backend-header.jsp -->
		<jsp:include page="/content/common/backend-header.jsp" />
		<!-- EO include backend-header.jsp -->

		<!-- include navbar.jsp -->
		<jsp:include page="/content/common/backend-navbar.jsp" />
		<!-- EO include navbar.jsp -->

		<!-- include events-home.html-->
		<section class="section-page">

			<div class="container-fluid">
				<!--Add a file picker for the user to start the upload process -->
				<input type="file" id="filePicker" style="display: none" /> 
				<input type="button" id="authorizeButton" style="display: none"	value="Authorize" />
				<input type="button" id="listFiles" onclick="retrieveAllFiles()" value="ListFiles" />
				<div id="Listado">
				</div>

			</div>
	</div>

	</section>

	</div>

	<jsp:include page="/libraries-angular.jsp" />
	<script
		src="/src/lib/angular-ui/ui-bootstrap/ui-bootstrap-tpls-0.5.0.js"></script>
	<!-- Bloque de Librerias - libreriasjs -->
	<jsp:include page="/libraries-js.jsp" />
	<script src="/js/authDrive.js"></script>
	<script type="text/javascript" src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>

</body>
</html>