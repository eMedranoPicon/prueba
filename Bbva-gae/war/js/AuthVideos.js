function cargando(){
	console.log('intento de carga');
	mxGoogleDrive.isDriveReady();
	mxGoogleDrive.checkAuthorization(mxGoogleDrive.authConfig);
}

/*
 * Set of variables and method specific to the Google Drive integration 
 */
var mxGoogleDrive =
{
	// Use these settings for testdrawio.appspot.com
	/*appID : '163632362748',
	clientID : '163632362748-upgu5tdab5bjgntq3qmvo9dvhqfeu1hm.apps.googleusercontent.com',
	apiKey : 'AIzaSyCEqguTW7a75lGDc9EzRNIGB2pg-UYBfDc',
	scopes : [ 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.install',
		'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile' ],*/
	appID : '785790985795',
	clientID : '785790985795-pf206je1417kten4jbd5funo77vlkuvf.apps.googleusercontent.com',
	apiKey : 'AIzaSyAhyF-UL_Qr1eChaf3KrlgerqkerutsFzw',
	scopes : [ 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.install',
			'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile' ],
	mimeType : 'application/mxe',		
	accessToken : null,
	accessTokenRefreshIntervalLength : 50 * 60000,//50 minutes
	accessTokenRefreshIntervalId : null,
	integrationButton : null,
	isOperationInProgress : false,
	editorUi : null,
	openAction : null,
	retryLimit : 5,//maximum number of times to retry a failed operation
	timeoutId : null,//timeout object
	timeoutLength : 7000,
	loadTimeout : null,//how long to wait before declaring an ongoing load attempt a failure
	loadRetryTimeout : null,//how long to wait before initiating a new load attempt
	tryCount : 0,//current number of retries
	response : null,
	cookieName : 'drive',
	cookieRegex : /\s?drive=.*/,
	saveArgs : null,//arguments used when retrying save during error recovery
	autosaveArgs : null,//arguments used when retrying save during error recovery
	authConfig : null,//auth args are stored in case auth is automatically repeated
	fileInfo :
	{
		'id' : null,
		'title' : 'Untitled Diagram',
		'content' : '',
		'mimeType' : this.mimeType,
		'description' : '',
		'parents' : []
	},
	defaultFileName : 'Untitled Diagram',
	stateMachine : null,//state machine object
	sharing : null,//sharing dialog object
	checkAuthorization : function(authConfig)
	{
		//mxLog.show();
		mxGoogleDrive.authConfig = authConfig;

		// Temp to get stack on error
		try
		{
			gapi.auth.authorize(authConfig, mxGoogleDrive.handleAuth);
		}
		catch (err)
		{
    		mxGoogleDrive.sendErrorReport(err.stack);
		}
		// End temp debugging
	},
	/**
	 * Handles the click on 'Connect with Google Drive' button 
	 */
	connectClick : function()
	{
		var stateObj = mxGoogleDrive.getStateObject();
		var userId = stateObj != null ? stateObj.userId : null;

		var config = mxGoogleDrive.createAuthConfig(userId, false);
		mxGoogleDrive.startIntegration(config);//disconnected -> authorizing
	},
	handleLoginRepeatAttempt : function(authConfig)
	{
		if (mxGoogleDrive.tryCount < mxGoogleDrive.retryLimit)
		{
			mxGoogleDrive.tryCount += 1;
			mxIntegration.setMessage(mxResources.get('retryingLogin'));
			mxLog.debug('handleLoginRepeatAttempt ' + mxGoogleDrive.tryCount);
			mxGoogleDrive.checkAuthorization.apply(mxGoogleDrive, [ authConfig ]);
		}
		else
		{
			mxGoogleDrive.tryCount = 0;
			mxGoogleDrive.showIntegrationButton(true);
			mxIntegration.showUserControls(false);
			mxUtils.alert(mxResources.get('cannotLogin'));
		}
	},

	loadDriveApi : function(callback)
	{
		
		mxLog.debug('loadDriveApi');
		gapi.client.load('drive', 'v2', callback);
	},
	loadOauth2Api : function(callback)
	{
		mxLog.debug('loadOauth2Api');
		gapi.client.load('oauth2', 'v2', callback);
	},
	handleAuth : function(auth)
	{
		mxLog.debug('handleAuth');
		console.log("entro");
		mxIntegration.setActiveIntegration(mxGoogleDrive);
		if (auth == null)
		{
			mxGoogleDrive.accessToken = null;

			//if token is revoked and cookie is present do not proceed with auth flow as it will trigger the popup that will get blocked by browser
			if (mxGoogleDrive.getCookie() != null)
			{
				mxIntegration.clearCookies();
			}
			
			// Force login if fileId or state parameter exists
			mxLog.debug('force login');
		}
		else
		{
			mxGoogleDrive.timeoutId = setTimeout(function()
			{
				mxGoogleDrive.stateMachine.timeout();
			}, mxGoogleDrive.timeoutLength);
			
			mxIntegration.setIntegrationProgress(25);
			mxGoogleDrive.showIntegrationButton(false);
			mxIntegration.showUserControls(true);
			mxGoogleDrive.accessToken = auth.access_token;
			mxGoogleDrive.loadOauth2Api(mxGoogleDrive.handleOauth2ApiLoad);
		}
	},
	handleOauth2ApiLoad : function(res)
	{
		mxLog.debug('handleOauth2ApiLoad');
		if (res != null && res.error != null)//OAuth2 API failed to load, repeat the auth after timeout 
		{
			mxLog.debug('handleOauth2ApiLoad response :', res);
		}
		else
		{
			mxIntegration.setIntegrationProgress(50);
			mxGoogleDrive.loadDriveApi(function(res)
			{
				if (res != null && res.error != null)//drive API failed to load, repeat the auth after timeout 
				{
					mxLog.debug('loadDriveApi response :', res);
				}
				else
				{
					mxIntegration.setIntegrationProgress(75);
					mxGoogleDrive.getUserInfo(mxGoogleDrive.accessToken, function(res)
					{
						mxLog.debug('getUserInfo response');
						var responseText = res.getText ? res.getText() : res.responseText;
						var userInfo = JSON.parse(responseText);
						mxIntegration.setUsername(userInfo.email);
						mxIntegration.setDisplayName(userInfo.name);

						mxIntegration.setUserId(userInfo.id);
						mxIntegration.loggedOut = false;
						mxIntegration.setCookie(mxGoogleDrive.cookieName, Base64.encode(mxIntegration.userId), 365);// cookie expires after 365 days
						mxIntegration.setIntegrationProgress(100);
						mxIntegration.setLoggedIn(true);
						clearTimeout(mxGoogleDrive.timeoutId);
						mxGoogleDrive.tryCount = 0;
						mxGoogleDrive.stateMachine.ok();
						
						// TODO implement as listener to state machine change
						var googleAd = document.getElementById("gePlug2");
						
						if (googleAd != null)
						{
							googleAd.innerHTML = "<a title='Please rate us' href=https://www.google.com/enterprise/marketplace/viewListing?productListingId=18806+14512935155953175632 target=&quot;_blank&quot; style=text-decoration:none;>Please help us to 1000 ratings.</a>";
						}
					}, function(err)
					{
						var responseText = res.getText ? res.getText() : res.responseText;
						var errorInfo = JSON.parse(responseText);
					});
				}
			});
		}
	},
	getUserInfo : function(accessToken, onSuccess, onFailure)
	{
		mxLog.debug('getUserInfo');
		var endPointURL = 'https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=' + accessToken;
		mxIntegration.sendHttpRequest(endPointURL, onSuccess, onFailure);
	},
	isDriveReady : function()
	{
		console.log(gapi.client.drive);
		return gapi.client.drive != null;
		
	},
	createIntegrationButton : function()
	{
		var driveImg = document.createElement('img');
		driveImg.src = 'images/google-drive-20x20.png';
		driveImg.style.padding = '0px 5px 0px 10px';
		driveImg.style.border = 'none';
		driveImg.style.verticalAlign = 'middle';
		var text = document.createElement('span');
		text.innerHTML = mxResources.get('connectWithDrive');
		text.style.verticalAlign = 'middle';

		this.integrationButton = document.createElement('div');

		this.integrationButton.appendChild(text);
		this.integrationButton.appendChild(driveImg);

		this.integrationButton.className = 'geItem';

		mxEvent.addListener(this.integrationButton, 'click', mxGoogleDrive.connectClick);

		return this.integrationButton;
	},
	showIntegrationButton : function(show)
	{
		this.integrationButton.style.display = show ? 'inline' : 'none';
	},
	startIntegration : function(authConfig)
	{
		mxGoogleDrive.stateMachine = new Stately(mxGoogleDrive.machineStatesObject);
		mxGoogleDrive.stateMachine.bind(function(event, oldState, newState)
		{
			mxLog.debug(oldState, ' -> ', newState, event != null ? 'on ' + event : '');

			if (oldState == "postAuth" && newState == "ready")
			{
				if(mxGoogleDrive.getFileID() != null)//share only if fileId parameter is present
				{
					mxGoogleDrive.stateMachine.initializeSharing();
				} else 
				{
					// Blocks graph after retrieving XML to reload the page with a fileId
					mxGoogleDrive.editorUi.editor.graph.setEnabled(false);
					mxIntegration.spinner = mxIntegration.createSpinner(mxGoogleDrive.editorUi.editor.graph.container);
					
					var xml = mxUtils.getXml(mxGoogleDrive.editorUi.editor.getGraphXml());
					mxGoogleDrive.stateMachine.save(null, mxGoogleDrive.fileInfo.parents, mxGoogleDrive.defaultFileName, xml);
				}
			}
		});

		mxGoogleDrive.stateMachine.connect(authConfig);
	},
	saveOrUpdateFile : function(fileId, parents, fileName, content, tryCount, stateObject)
	{
		stateObject.setMachineState(stateObject.saving);
		mxGoogleDrive.saveArgs = arguments;

		if (typeof tryCount === "undefined")
		{
			tryCount = 0;

			if (this.timeoutId != null)//if user initiated the save again, stop the expo backoff save 
			{
				clearTimeout(this.timeoutId);
				this.timeoutId = null;
			}
		}

		if (this.isOperationInProgress)//previous save attempt has not finished yet
		{
			mxGoogleDrive.stateMachine.ok();
			return;
		}

		if (fileId != null)
		{
			mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('saving') + '...');
		}
		else
		{
			mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('loading') + '...');
		}
		
		var request = this.createSaveRequest(fileId, fileName, content, parents);

		this.isOperationInProgress = true;

		var callback = function(resp)
		{
			if (resp.error == null && resp)
			{
				mxGoogleDrive.fileInfo = resp;
				mxGoogleDrive.editorUi.editor.setModified(false);
				
				if (fileId != null)
				{
					mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('allChangesSavedInDrive'));
				}

				mxGoogleDrive.stateMachine.ok();//saving -> ready
				if (mxGoogleDrive.getFileID() == null || mxGoogleDrive.getFileID() != resp.id)//do we need to redirect to match the ID of the working file to fileID in URL?
				{
					window.location.replace(mxGoogleDrive.editorUi.getUrl(window.location.pathname + '?fileId=' + resp.id));
				}
			}
			else if (resp.error.code == 401)
			{
				mxGoogleDrive.stateMachine.unauthorized(mxGoogleDrive.saveArgs);
			}
			else if (resp.error.code == 403 && resp.error.errors[0].reason == "userAccess")
			{
				mxGoogleDrive.stateMachine.retryOnError(null, parents, fileName, content, tryCount);//if we're denied access to the opened file, save a new copy
			}
			else if (resp.error.code == 404)
			{
				mxGoogleDrive.stateMachine.giveUpOnError(resp.error);
			}
			else
			{
				if (tryCount < mxGoogleDrive.retryLimit)
				{
					mxGoogleDrive.stateMachine.retryOnError(fileId, parents, fileName, content, tryCount);

				}
				else
				{
					mxGoogleDrive.stateMachine.giveUpOnError(resp.error);
				}
			}

			mxGoogleDrive.isOperationInProgress = false;
		};

		request.execute(callback);
	},
	saveFile : function(fileId, fileName, parents, content, stateObject, fn)
	{
		if (this.isOperationInProgress)
		{
			return;
		}

		mxGoogleDrive.autosaveArgs = arguments;
		
		if (stateObject != null)
		{
			mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('saving') + '...');
			stateObject.setMachineState(stateObject.autosaving);
		}
		
		this.isOperationInProgress = true;
		var request = this.createSaveRequest(fileId, fileName, content, parents, true);

		var callback = function(resp)
		{
			if (resp != null && resp.error == null)
			{
				mxGoogleDrive.fileInfo = resp;
				mxGoogleDrive.stateMachine.ok();//autosaving -> ready
			}
			else if (resp != null && resp.error.code == 401)
			{
				mxGoogleDrive.stateMachine.unauthorized(mxGoogleDrive.autosaveArgs);
			}
			else
			{
				mxGoogleDrive.stateMachine.giveUpOnError(resp.error.code);
			}
			
			if (fn != null)
			{
				fn(resp);
			}
			
			mxGoogleDrive.isOperationInProgress = false;
		};

		request.execute(callback);
	},
	createSaveRequest : function(fileId, fileName, content, parents, isAutosave)
	{
		var isAutosave = isAutosave || false;
		var boundary = '-------314159265358979323846';
		var delimiter = "\r\n--" + boundary + "\r\n";
		var close_delim = "\r\n--" + boundary + "--";

		var contentType = 'application/octect-stream';
		var metadata =
		{
			'title' : fileName,
			'mimeType' : mxGoogleDrive.mimeType
		};

		if (parents != null)
		{
			metadata.parents = parents;
		}

		var base64Data = Base64.encode(content);
		var multipartRequestBody = delimiter + 'Content-Type: application/json\r\n\r\n' + JSON.stringify(metadata) + delimiter
				+ 'Content-Type: ' + contentType + '\r\n' + 'Content-Transfer-Encoding: base64\r\n' + '\r\n' + base64Data + close_delim;

		var reqObj = 
		{
			'path' : '/upload/drive/v2/files' + (fileId != null ? '/' + fileId : ''),
			'method' : fileId != null ? 'PUT' : 'POST',
			'params' :
			{
				'uploadType' : 'multipart'
			},
			'headers' :
			{
				'Content-Type' : 'multipart/mixed; boundary="' + boundary + '"'
			},
			'body' : multipartRequestBody
		}
		
		if (isAutosave) //Google Drive best practice, do not create a new revision for autosave
		{
			reqObj.params['newRevision'] = false;
		}
		var request = gapi.client.request(reqObj);

		return request;
	},
	loadFileMetaData : function(fileId, stateObject)
	{
		mxLog.debug('loadFileMetaData');
	
		if (mxIntegration.spinner == null)
		{
			mxIntegration.spinner = mxIntegration.createSpinner(this.editorUi.editor.graph.container);
			mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('loading') + '...');
		}

		var handleFileMetaDataLoad = function(resp)
		{
			mxLog.debug('loadFileMetaData resp : ' + resp);
			if (resp.error == null)
			{
				mxGoogleDrive.fileInfo = resp;
				mxGoogleDrive.loadFileContents(resp.downloadUrl + '&access_token=' + mxGoogleDrive.accessToken);
			}
			else
			{
				mxLog.debug('loadFileMetaData error, try count  : ' + mxGoogleDrive.tryCount);
				mxGoogleDrive.response = resp;
				mxGoogleDrive.handleFileLoadError(resp);
			}
		};

		mxGoogleDrive.loadTimeout = setTimeout(function()
		{
			if (mxGoogleDrive.tryCount < mxGoogleDrive.retryLimit)
			{
				clearTimeout(mxGoogleDrive.loadTimeout);
				mxGoogleDrive.stateMachine.retryOnError(fileId, stateObject);
			}
			else
			{
				mxGoogleDrive.stateMachine.giveUpOnError();
			}
		}, mxGoogleDrive.timeoutLength);

		var request = gapi.client.drive.files.get(
		{
			'fileId' : fileId
		});
		request.execute(handleFileMetaDataLoad);
	},
	loadFileContents : function(downloadUrl)
	{
		var onError = function(res)// we cannot differentiate errors in IE9 in second stage of load procedure
		{
			mxLog.debug('loadFileContents error, try count  : ' + mxGoogleDrive.tryCount);
			mxGoogleDrive.handleFileLoadError(res);
		};

		mxIntegration.sendHttpRequest(downloadUrl, this.handleFileContentsLoad, onError);
	},
	handleFileContentsLoad : function(res)
	{
		//we're OK if status is 200 in proper browsers or we got here in IE9
		if ((res.constructor === mxXmlRequest && res.request.status == 200) ||
			(window.XDomainRequest && res.constructor === XDomainRequest))
		{
			clearTimeout(mxGoogleDrive.loadTimeout);

			var responseText = res.getText ? res.getText() : res.responseText;
			var doc = mxUtils.parseXml(responseText);

			mxGoogleDrive.editorUi.editor.setGraphXml(doc.documentElement);
			mxGoogleDrive.editorUi.editor.undoManager.clear();
			mxGoogleDrive.editorUi.editor.setFilename(mxGoogleDrive.fileInfo.title);
			mxGoogleDrive.editorUi.editor.updateDocumentTitle();
			mxGoogleDrive.editorUi.editor.setModified(false);
			mxGoogleDrive.editorUi.editor.graph.container.focus();
			
			mxGoogleDrive.updateGraphPermission(mxGoogleDrive.fileInfo.editable);

			mxIntegration.spinner.stop();
			mxGoogleDrive.tryCount = 0;
			mxGoogleDrive.editorUi.editor.setStatus('');
			mxGoogleDrive.stateMachine.ok();//loading -> ready
		}
		else
		{
			mxGoogleDrive.handleFileLoadError(res);
		}
	},
	handleFileLoadError : function(resp)
	{
		//mxIntegration.spinner.stop();
		//clearTimeout(mxGoogleDrive.loadTimeout);
		//mxLog.debug('handleFileLoadError response : ' + resp);
		//mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('retryingLoad'));
	},
	postAuthorization : function(stateObject)
	{
		stateObject.setMachineState(stateObject.postAuth);//authorizing -> post-auth

		this.openAction = this.editorUi.actions.get('open');
		var editorUi = this.editorUi;
		this.editorUi.actions.addAction('open', mxUtils.bind(this, function()
		{
			if (typeof (google) != 'undefined' && typeof (google.picker) != 'undefined')
			{
				var view = new google.picker.View(google.picker.ViewId.DOCS);
				view.setMimeTypes(mxGoogleDrive.mimeType + ",application/mxe");

				new google.picker.PickerBuilder().addView(view).setAppId(mxGoogleDrive.appID).setAuthUser(mxIntegration.userId)
						.enableFeature(google.picker.Feature.NAV_HIDDEN).enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
						.setCallback(function(data)
						{
							if (data.action == google.picker.Action.PICKED)
							{
								var dialog = new FilePickerDialog(editorUi, data.docs);
								editorUi.showDialog(dialog.container, 320, 50, true, true);
							}
						}).build().setVisible(true);
			}
			else
			{
				window.open('https://drive.google.com');
			}
		}));
		
		this.editorUi.actions.addAction('rename', mxUtils.bind(this, function()
		{
			var onRenameClick = mxUtils.bind(this, function(fileName)
			{
				this.stateMachine.rename(fileName);
				this.editorUi.hideDialog();
			});
			this.editorUi.showDialog(new RenameDialog(this.editorUi,mxGoogleDrive.fileInfo.title, onRenameClick).container, 300, 80, true, true);
		}));
		
		if (this.editorUi.sharing != null)
		{
			var action = this.editorUi.actions.addAction('chatWindowTitle', mxUtils.bind(this, function()
					{
				this.editorUi.sharing.chatWindow.window.setVisible(!this.editorUi.sharing.chatWindow.window.isVisible());
					}));
			action.setToggleAction(true);
			action.setSelectedCallback(mxUtils.bind(this, function() { return this.editorUi.sharing.chatWindow.window.isVisible(); }));
		}
		
		var fileId = urlParams['fileId'];
		var state = urlParams['state'];
		
		if (state != null)
		{
			try
			{
				var tmp = JSON.parse(decodeURIComponent(state));
				
				if (tmp.ids != null && tmp.ids.length > 0)
				{
					fileId = tmp.ids[0];
				}
				else if (tmp.folderId != null)//check for folderId...
				{
					mxGoogleDrive.fileInfo.parents = [{'kind' : 'drive#fileLink', 'id' : tmp.folderId }];
				}
				else if (tmp.parentId != null)//and parentId in case Google can't decide which one they like more
				{
					mxGoogleDrive.fileInfo.parents = [{'kind' : 'drive#fileLink', 'id' : tmp.parentId }];
				}
			}
			catch (e)
			{
				// Invalid state ignored
			}
		}
		mxGoogleDrive.stateMachine.ok();

		//open the file if there's a fileId parameter present in the URL
		if (fileId != null)
		{
			mxGoogleDrive.stateMachine.load(fileId);
		}
	},
	disconnect : function()
	{
		mxGoogleDrive.stateMachine.disconnect();
	},
	getCookie : function()
	{
		var cookies = document.cookie.split(";");
		for ( var i = 0; i < cookies.length; i++)
		{
			var cookie = cookies[i];
			if (cookie.match(this.cookieRegex) != null)
			{
				return cookie;
			}
		}

		return null;
	},
	getUserIDFromCookie : function(cookie)
	{
		if (cookie != null)
		{
			var parts = cookie.split("=");
			var val = decodeURIComponent(parts[1]);
			return Base64.decode(val);
		}

		return null;
	},
	getStateObject : function()
	{
		var state = urlParams['state'];
		var stateObj = null;

		if (state != null)
		{
			var stateObj = JSON.parse(decodeURIComponent(state));
		}

		return stateObj;
	},
	createAuthConfig : function(userID, immediate)
	{
		var obj =
		{
			client_id : mxGoogleDrive.clientID,
			scope : mxGoogleDrive.scopes.join(' '),
			immediate : immediate
		};

		if (userID == null)
		{
			obj.authuser = -1;
		}
		else
		{
			obj.user_id = userID;
		}

		return obj;

	},
	getFileID : function()
	{
		var fileID = null;
		var stateObj = this.getStateObject();

		if (stateObj != null && stateObj.ids != null && stateObj.ids.length > 0)
		{
			fileID = stateObj.ids[0];
		}
		else if (urlParams['fileId'] != null)
		{
			fileID = urlParams['fileId'];
		}

		return fileID;
	},
	addDebugStuff : function()
	{
		var intCont = document.getElementById('integrationContainer');
		var btn = document.createElement('button');
		btn.innerHTML = 'The button';
		mxEvent.addListener(btn, 'click', function(evt)
		{
			mxGoogleDrive.stateMachine.deleteFile();
		});

		intCont.appendChild(btn);
	},
	refreshToken : function()
	{
		authConfig = mxGoogleDrive.createAuthConfig(mxIntegration.userId, true);

		gapi.auth.authorize(authConfig, function(resp)
		{
			if (resp != null && resp.access_token != null)
			{
				mxGoogleDrive.accessToken = resp.access_token;
			}
			else 
			{
				mxGoogleDrive.disconnect();
			}
		});
	},
	updateGraphPermission : function(isFileEditable) 
	{
		this.editorUi.editor.graph.setEnabled(isFileEditable);
		
		if(!isFileEditable) 
		{
			mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('readOnly'));
		}
	},
	sendErrorReport : function(errorMessage) 
	{
		var img = new Image();
		img.src = "images/1x1.png?msg=" + encodeURIComponent(errorMessage);
	},
	machineStatesObject :
	{
		'disconnected' :
		{
			connect : function(authConfig)
			{
				if (authConfig == null)
				{
					var state = urlParams['state'];
					var userID = null;

					if (state != null)
					{
						var stateObj = JSON.parse(decodeURIComponent(state));
						userID = stateObj.userId;
					}

					if (userID == null)
					{
						userID = mxGoogleDrive.getUserIDFromCookie(mxGoogleDrive.getCookie());
					}

					authConfig = mxGoogleDrive.createAuthConfig(userID, true);
					mxGoogleDrive.checkAuthorization(authConfig);
				}
				else
				{
					mxGoogleDrive.checkAuthorization(authConfig);
				}
				return this.authorizing;
			}
		},
		'authorizing' :
		{
			ok : function()
			{
				mxGoogleDrive.postAuthorization(this);
				mxGoogleDrive.accessTokenRefreshIntervalId = setInterval(function()
				{
					mxGoogleDrive.refreshToken();
				}, mxGoogleDrive.accessTokenRefreshIntervalLength);

			},
			timeout : function()
			{
				mxGoogleDrive.handleLoginRepeatAttempt(mxGoogleDrive.createAuthConfig(mxIntegration.userID, true));
			}
		},
		'postAuth' :
		{
			ok : function()
			{
				return this.ready;
			}
		},
		'ready' :
		{
			save : function(fileId, parents, name, xml)
			{
				mxGoogleDrive.saveOrUpdateFile(fileId, parents, name, xml, 0, this);
			},
			load : function(fileId)
			{
				mxGoogleDrive.loadFileMetaData(fileId, this);
				return this.loading;
			},
			disconnect : function()
			{
				clearInterval(mxGoogleDrive.accessTokenRefreshIntervalId);
				mxGoogleDrive.editorUi.actions.put('open', mxGoogleDrive.openAction);
				mxIntegration.setLoggedIn(false);
				mxIntegration.showUserControls(false);
				
				mxGoogleDrive.editorUi.actions.put('share', null);
				mxGoogleDrive.editorUi.actions.put('rename', null);
				window.location.replace(mxGoogleDrive.editorUi.getUrl(window.location.pathname));
				

				return this.disconnected;
			},
			initializeSharing : function() 
			{
				var stateObject = this;
				var editorUi = mxGoogleDrive.editorUi;

				var init = function()
				{
					if (mxGoogleDrive.sharing == null)
					{
						mxGoogleDrive.sharing = new gapi.drive.share.ShareClient(mxGoogleDrive.appID);
						mxGoogleDrive.sharing.setItemIds([ mxGoogleDrive.getFileID() ]);
					}

					editorUi.actions.put('share', new Action(mxResources.get('share'), mxUtils.bind(this, function()
					{
						mxGoogleDrive.sharing.showSettingsDialog();
					})));
				}

				gapi.load('drive-share', init);
			},
			rename : function(fileName) 
			{
				this.setMachineState(this.renaming);
				mxGoogleDrive.isOperationInProgress = true;
				
				var reqObj = 
				{
					'path' : '/drive/v2/files/' + mxGoogleDrive.fileInfo.id,
					'method' : 'PUT',
					'params' :
					{
						'uploadType' : 'multipart'
					},
					'headers' :
					{
						'Content-Type' : 'application/json; charset=UTF-8'
					},
					'body' : JSON.stringify({'title' : fileName})
				}
				
				var request = gapi.client.request(reqObj);
				
				var callback = function(resp) 
				{
					if (resp.error == null && resp)
					{
						mxGoogleDrive.fileInfo = resp;
						mxGoogleDrive.editorUi.editor.setFilename(resp.title);
						mxGoogleDrive.editorUi.editor.updateDocumentTitle();
						mxGoogleDrive.stateMachine.ok();//renaming -> ready
					}
					else
					{
						mxGoogleDrive.stateMachine.giveUpOnError(resp.error.code);
					}

					mxGoogleDrive.isOperationInProgress = false;
				}

				request.execute(callback);
				mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('renaming') + '...');
			},
			//TODO switch to Google JS client's delete method if Google ever fixes it
			deleteFile : function(callback) 
			{
				var request = gapi.client.drive.files.trash({
				    'fileId': mxGoogleDrive.fileInfo.id
				  });
				request.execute(function(resp) {callback.apply(this); });
			}
		},
		'saving' :
		{
			ok : function()
			{
				return this.ready;
			},
			unauthorized : function(args)
			{
				var stateObject = this;
				var dialog = new SessionTimeoutDialog(mxGoogleDrive.editorUi);

				dialog.buttons.appendChild(mxUtils.button(mxResources.get('ok'), function()
				{
					mxIntegration.setLoggedIn(false);
					stateObject.setMachineState(stateObject.reauthorizing);
					var authConfig = mxGoogleDrive.createAuthConfig(mxIntegration.userId, false);
					mxGoogleDrive.checkAuthorization.apply(mxGoogleDrive, [ authConfig ]);
					mxGoogleDrive.editorUi.hideDialog();
				}));

				dialog.buttons.appendChild(mxUtils.button(mxResources.get('cancel'), function()
				{
					mxIntegration.setLoggedIn(false);
					mxIntegration.showUserControls(false);
					mxGoogleDrive.editorUi.hideDialog();
				}));

				mxGoogleDrive.editorUi.showDialog(dialog.container, 370, 70, true, true);
			},
			retryOnError : function(fileId, parents, fileName, content, tryCount)
			{
				var stateObject = this;
				var retryInterval = Math.pow(2, tryCount) * 1000;

				mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('errorSavingFile') + '. '
						+ mxResources.get('retryingIn', [ retryInterval / 1000 ]));
				mxGoogleDrive.timeoutId = setTimeout(function()
				{
					mxGoogleDrive.saveOrUpdateFile(fileId, parents, fileName, content, tryCount + 1, stateObject);
				}, retryInterval + Math.random() * 1000);
			},
			giveUpOnError : function(error)
			{
				if (error.code == 404)
				{
					mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('errorSavingFileNotFound'));
					mxUtils.alert(mxResources.get('errorSavingFileNotFound'));
				} else 
				{
					mxGoogleDrive.sendErrorReport("Error Code : " + error.code + ";Error Message : " + error.message)
					mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('errorSavingFileDiagramLocked'));
					mxUtils.alert(mxResources.get('errorSavingFileDiagramLocked'));
					mxGoogleDrive.editorUi.editor.graph.setEnabled(false);
				}

				return this.ready;
			}
		},
		'autosaving' :
		{
			ok : function()
			{
				mxGoogleDrive.editorUi.editor.setModified(false);
				mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('allChangesSavedInDrive'));
				mxGoogleDrive.isOperationInProgress = false;
				return this.ready;
			},
			unauthorized : function(args)
			{
				var authConfig = mxGoogleDrive.createAuthConfig(mxIntegration.userId, true);
				gapi.auth.authorize(authConfig, function(resp)
				{
					if (resp != null && resp.access_token != null)
					{
						mxGoogleDrive.accessToken = resp.access_token;
						mxGoogleDrive.saveFile.apply(mxGoogleDrive, args);
					} 
					else
					{
						mxGoogleDrive.isOperationInProgress = false;
						mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('errorSavingFile'));
					}
				});
			},
			giveUpOnError : function(errorCode)
			{
				if (errorCode == null)
				{
					mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('errorSavingFile'));
				} 
				else if (errorCode == 403)
				{
					mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('errorSavingFileForbidden'));
				} 
				else if (errorCode == 404)
				{
					mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('errorSavingFileNotFound'));
				}

				mxGoogleDrive.isOperationInProgress = false;
				return this.ready;
			}
		},
		'reauthorizing' :
		{
			ok : function()
			{
				mxGoogleDrive.saveOrUpdateFile.apply(mxGoogleDrive, mxGoogleDrive.saveArgs);
			}
		},
		'loading' :
		{
			ok : function()
			{
				return this.ready;
			},
			retryOnError : function(fileId, stateObject)
			{
				mxLog.debug('loading timeout, try count  : ' + mxGoogleDrive.tryCount);
				mxIntegration.spinner.stop();

				var retryInterval = Math.pow(2, mxGoogleDrive.tryCount++) * 1000;

				mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('errorLoadingFile') + '. '
						+ mxResources.get('retryingIn', [ retryInterval / 1000 ]));
				mxLog.debug('Before : ', new Date(), 'interval : ' + retryInterval);
				mxGoogleDrive.loadRetryTimeout = setTimeout(function()
				{
					mxLog.debug('After : ', new Date());
					mxGoogleDrive.loadFileMetaData.apply(mxGoogleDrive, [ fileId, stateObject ]);
				}, retryInterval + Math.random() * 1000);

			},
			giveUpOnError : function()
			{
				mxGoogleDrive.tryCount = 0;
				mxIntegration.spinner.stop();
				var msg = mxResources.get('errorLoadingFile');

				if (mxGoogleDrive.response != null)
				{
					if (mxGoogleDrive.response.error.code == 404)
					{
						msg = mxResources.get('fileNotFound');
					}
				}

				mxGoogleDrive.editorUi.editor.setStatus(msg);
				mxUtils.alert(msg);
				return this.ready;
			}
		},
		'renaming' :
		{
			ok : function()
			{
				mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('renamed'));
				return this.ready;
			},
			giveUpOnError : function(errorCode)
			{
				if (errorCode == null)
				{
					mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('errorRenamingFile'));
				} 
				else if (errorCode == 403)
				{
					mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('errorRenamingFileForbidden'));
				} 
				else if (errorCode == 404)
				{
					mxGoogleDrive.editorUi.editor.setStatus(mxResources.get('errorRenamingFileNotFound'));
				}

				mxGoogleDrive.isOperationInProgress = false;
				return this.ready;
			}
		}
	}
}