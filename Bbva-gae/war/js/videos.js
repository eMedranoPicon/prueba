/**
 * Start the file upload.
 * 
 * @param {Object}
 *            evt Arguments from the file selector.
 */
function uploadFile(evt) {
	var file = evt.target.files[0];
	insertFile(file);

}

/**
 * Insert new file.
 * 
 * @param {File}
 *            fileData File object to read data from.
 * @param {Function}
 *            callback Function to call when the request is complete.
 */
function insertFile(fileData, callback) {
	//
	$('.progress').removeClass('hide_bar').addClass('show_bar');
	$('.exito').removeClass('successOn').addClass('successOff');
	//
	var titleVideo = document.getElementById("titleVideo").value;	
	var description = document.getElementById("description").value;
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
		if (!(typeof titleVideo === 'undefined')){
			titleVideo = fileData.name;
		}
		if (!(typeof description === 'undefined')){
			description = "No description";
		}
		var metadata = {
			'title' : titleVideo,
			'description' : description,
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
				+ 'Content-Transfer-Encoding: base64\r\n' + '\r\n' + base64Data
				+ close_delim;

		var request = gapi.client.request({
			'path' : '/upload/drive/v2/files',
			'method' : 'POST',
			'params' : {
				'uploadType' : 'multipart'
			},
			'headers' : {
				'Content-Type' : 'multipart/mixed; boundary="' + boundary + '"'
			},
			'body' : multipartRequestBody
		});
		if (!callback) {
			callback = function(file) {
				
				
				$('.progress').removeClass('show_bar').addClass('hide_bar');
				$('.exito').removeClass('successOff').addClass('successOn');
				
				videoData = {};
				videoData.id = file.id;
				videoData.videoID = file.id;
				videoData.title = file.title;
				videoData.trashed = false;
				// Insert a video data
				gapi.client.video.insertVideo(videoData).execute(function(resp) {
					console.log(resp);
					console.log('Guardado Correctamente en Video API');
				});
				
				/* Que sea tipo video y que no este borrado */
				if (!(typeof file.embedLink === 'undefined')
						&& (file.explicitlyTrashed != true)) {
					var linkAll = file.webContentLink;
					var link = linkAll.substr(0, linkAll.indexOf('&'));
					var html = '<video class="videoSize" controls autoplay>'
							+ '<source src='
							+ link
							+ ' type="video/mp4">'
							+ '<source src='
							+ link
							+ ' type="video/ogg">'
							+ 'Tu Navegador No Soporta Video</video><br>'
							+ '<div class="well"><b>'
							+ file.title
							+ '</b><br>'
							+ file.description + '</div>';
				}
				document.getElementById('videoPreview').innerHTML = html;

			}
			request.execute(callback);
		}
	}
}
/**
 * Show Videos from the folder with id:0B7sf9nIuNLe-S0VBdXlrNVl3eGs
 * 
 */
var retrieveAllFiles = function() {
	$('.progress').removeClass('hide_bar').addClass('show_bar');
	var retrievePageOfFiles = function(request, result) {
		request
				.execute(function(resp, status) {
					$('.progress').removeClass('show_bar').addClass('hide_bar');
					document.getElementById('contentList').innerHTML = "";
					var htmlVideos = '<ul>';
					for ( var key in resp.items) {
						/* Que sea tipo video y que no este borrado */
						if (!(typeof resp.items[key].embedLink === 'undefined')
								&& (resp.items[key].explicitlyTrashed != true)) {
							var linkAll = resp.items[key].webContentLink;
							var link = linkAll.substr(0, linkAll.indexOf('&'));
							
							var html = '<tr><td>'
									+ resp.items[key].title
									+ '</td><td>'
									+ resp.items[key].description
									+ '</td><td><a href=\"'
									+link+'\">'
									+link+'</a></td>'
									+'<td><a onClick="removeVideo(\''+resp.items[key].id+'\')" class="btn btn-warning btn-small" ><i class="icon-trash icon-white"></i>Borrar</a></td></tr>';
							
							htmlVideos += '<li><video class="videoSize" controls>'
									+ '<source src='
									+ link
									+ ' type="video/mp4">'
									+ '<source src='
									+ link
									+ ' type="video/ogg">'
									+ 'Your browser does not support the video tag.</video></li>';
							$('#contentList').append(html);
						}
					}
					htmlVideos += '</ul>';					
					document.getElementById('ListadoVideos').innerHTML = htmlVideos;
				});
	}
	var initialRequest = gapi.client.drive.files.list({
		'maxResults' : 10,
		'q' : '"0B7sf9nIuNLe-S0VBdXlrNVl3eGs" in parents and trashed = false'
	});
	console.log("initialRequest = " + initialRequest);
	retrievePageOfFiles(initialRequest, []);
}


function removeVideo(idVideo){
	console.log('Enviando Video a la Papelera');
	  var request = gapi.client.drive.files.trash({
		    'fileId': idVideo
		  });
		  request.execute(function(resp,status) {
			  console.log(status);
			  alert('Eliminado Correctamente');
			  
			// Insert a video data
				gapi.client.video.removeVideo(idVideo).execute(function(resp) {
					console.log(resp);
					console.log('Borrado Correctamente en Video API');
				});			  
			  
			  retrieveAllFiles();
		  });	
	
}
/**
 * Show Videos from the folder with id:0B7sf9nIuNLe-S0VBdXlrNVl3eGs
 * FrontEnd View
 */
var retrieveAllFilesFront = function() {
	$('.progress').removeClass('hide_bar').addClass('show_bar');
	var retrievePageOfFiles = function(request, result) {
		request
				.execute(function(resp, status) {
					$('.progress').removeClass('show_bar').addClass('hide_bar');
					var htmlVideos = '<ul>';
					for ( var key in resp.items) {
						/* Que sea tipo video y que no este borrado */
						if (!(typeof resp.items[key].embedLink === 'undefined')
								&& (resp.items[key].explicitlyTrashed != true)) {
							var linkAll = resp.items[key].webContentLink;
							var link = linkAll.substr(0, linkAll.indexOf('&'));	
							htmlVideos += '<li><video class="videoSize" controls>'
									+ '<source src='
									+ link
									+ ' type="video/mp4">'
									+ '<source src='
									+ link
									+ ' type="video/ogg">'
									+ 'Your browser does not support the video tag.</video></li>';
						}
					}
					htmlVideos += '</ul>';					
					document.getElementById('ListadoVideos').innerHTML = htmlVideos;
				});
	}
	var initialRequest = gapi.client.drive.files.list({
		'maxResults' : 10,
		'q' : '"0B7sf9nIuNLe-S0VBdXlrNVl3eGs" in parents'
	});
	console.log("initialRequest = " + initialRequest);
	retrievePageOfFiles(initialRequest, []);
}





/**
 * Show Videos from the folder with id:0B7sf9nIuNLe-S0VBdXlrNVl3eGs
 * FrontEnd View
 */
var retrieveAllFilesFrontVideo = function() {
	$('.progress').removeClass('hide_bar').addClass('show_bar');
	var retrievePageOfFiles = function(request, result) {
		request
				.execute(function(resp, status) {
					$('.progress').removeClass('show_bar').addClass('hide_bar');
					var htmlVideos = '<ul>';
					for ( var key in resp.items) {
						/* Que sea tipo video y que no este borrado 
						 * !(typeof resp.items[key].embedLink === 'undefined')
								&& */
						if ((resp.items[key].trashed == false)) {
							/*var linkAll = resp.items[key].webContentLink;						
							var link = linkAll.substr(0, linkAll.indexOf('&'));	*/
							
						    var URL_BASE = 'https://googledrive.com/host/';
						    var url_total = URL_BASE+resp.items[key].id+'/';
						    
							htmlVideos += '<li><video class="videoSize" controls>'
									+ '<source src='
									+ url_total
									+ ' type="video/mp4">'
									+ '<source src='
									+ url_total
									+ ' type="video/ogg">'
									+ 'Your browser does not support the video tag.</video></li>';
						}
					}
					htmlVideos += '</ul>';					
					document.getElementById('ListadoVideos').innerHTML = htmlVideos;
				});
	}
	var initialRequest = gapi.client.video.listVideo();
	retrievePageOfFiles(initialRequest, []);
}