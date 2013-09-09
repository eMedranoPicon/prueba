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

<html lang="es" ng-app="appBack">
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
			<header class="header-section">
				<h1>Listado Videos</h1>
			</header>
			<div class="container-fluid videoLayout">
			    <table id="contentList" class="table table-striped">
                <tr>
                    <th>Titulo Video</th>
                    <th>Descripcion</th>
                    <th>URL</th>
                </tr>
			    </table>
				<!--Add a file picker for the user to start the upload process -->
				<div style="display: none">
					<input type="file" id="filePicker" style="display: none" /> <input
						type="button" id="authorizeButton" style="display: none"
						value="Authorize" />
				</div>				
				<input class="btn" type="button" id="listFiles"
					onclick="retrieveAllFiles()" value="ListFiles" />
				<div id="ListadoVideos"></div>
			</div>
			
		</section>
	</div>

	<jsp:include page="/libraries-angular.jsp" />
	<script
		src="/src/lib/angular-ui/ui-bootstrap/ui-bootstrap-tpls-0.5.0.js"></script>
	<!-- Bloque de Librerias - libreriasjs -->
	<jsp:include page="/libraries-js.jsp" />
	<script src="/src/appBack.js"></script>
	<script src="/js/authDrive.js"></script>
	<script src="/js/videos.js"></script>
	<script type="text/javascript"
		src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>

</body>
</html>