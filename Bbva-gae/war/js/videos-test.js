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