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
			<div id="myCarousel" class="carousel slide">
				<ol class="carousel-indicators">
					<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
					<li data-target="#myCarousel" data-slide-to="1"></li>
					<li data-target="#myCarousel" data-slide-to="2"></li>
				</ol>
				<!-- Carousel items -->
				<div class="carousel-inner">
					<div class="active item">
					<video width="480" height="320" controls="">
					<source src="https://docs.google.com/uc?id=0B8IzyUkbosWjRUk4M3g3VVpCWlE" type="video/mp4">
					<source src="https://docs.google.com/uc?id=0B8IzyUkbosWjRUk4M3g3VVpCWlE" type="video/ogg">
					Your browser does not support the video tag.
					</video>
					</div>
					<div class="item">
						<video width="480" height="320" controls="">
							<source	src="https://docs.google.com/uc?id=0B8IzyUkbosWjMm5WREwxbEhMU2M" type="video/mp4">
							<source
								src="https://docs.google.com/uc?id=0B8IzyUkbosWjMm5WREwxbEhMU2M" type="video/ogg">
							Your browser does not support the video tag.
						</video>
					</div>
					<div class="item"><video width="480" height="320" controls="">
					<source src="https://docs.google.com/uc?id=0B8IzyUkbosWjRUk4M3g3VVpCWlE" type="video/mp4">
					<source src="https://docs.google.com/uc?id=0B8IzyUkbosWjRUk4M3g3VVpCWlE" type="video/ogg">
					Your browser does not support the video tag.
					</video></div>
				</div>
				<!-- Carousel nav -->
				<a class="carousel-control left" href="#myCarousel"
					data-slide="prev">&lsaquo;</a> <a class="carousel-control right"
					href="#myCarousel" data-slide="next">&rsaquo;</a>
			</div>
				<!--Add a file picker for the user to start the upload process -->
				<div style="display: none">
					<input type="file" id="filePicker" style="display: none" /> <input
						type="button" id="authorizeButton" style="display: none"
						value="Authorize" />
				</div>
				<input class="btn" type="button" id="listFiles"
					onclick="retrieveAllFiles()" value="ListFiles" />
				<div id="Listado"></div>
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