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

<html lang="es" ng-app="app">
<head>
<title>backend - events:: BBVA in cloud</title>
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<!-- styles -->
<link rel="stylesheet" type="text/css" href="/css/main.css" />
<link rel="stylesheet" type="text/css"
	href="/css/bootstrap-datetimepicker.min.css" />

<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
      <script src="/js/lib/html5shiv.js"></script>
    <![endif]-->

<!-- Bloque de Librerias - libreriasjs -->
<jsp:include page="/libraries-js.jsp" />
<script src="/src/lib/angular.min.js"></script>
<script src="/src/app.js"></script>
<script src="/src/controllers/EventsListController.js"></script>
<script src="/src/controllers/EventDetailController.js"></script>
<script src="https://apis.google.com/js/client.js"></script>
<script
	src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true"></script>
<script src="/js/application.js"></script>

<style>
/* Flexible iFrame */
.Flexible-container {
	position: relative;
	padding-bottom: 56.25%;
	padding-top: 30px;
	height: 0;
	overflow: hidden;
}

.Flexible-container iframe,.Flexible-container object,.Flexible-container embed
	{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>

</head>
<body>

	<div class="container">

		<!-- include backend-header.jsp -->
		<jsp:include page="/content/common/backend-header.jsp" />
		<!-- EO include backend-header.jsp -->
		<!-- include navbar.jsp -->
		<jsp:include page="/content/common/backend-navbar.jsp" />
		<!-- EO include navbar.jsp -->


		<!-- include events-home.html -->
		<section class="section-page">

			<header class="header-section">
				<h1>Calendario de eventos</h1>
			</header>

			<div class="container-fluid">
				<div class="row-fluid">
					<div class="span24">
						<div class="Flexible-container">
							<iframe
								src="https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;src=72o4s6adl0uhbebjssl4dpraeo%40group.calendar.google.com&amp;color=%23B1440E&amp;ctz=Europe%2FMadrid"
								style="border-width: 0" width="100%" height="400px"
								frameborder="0" scrolling="no"></iframe>
						</div>
					</div>
				</div>
			</div>

		</section>
	</div>

</body>
</html>