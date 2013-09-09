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
<title>backend - webservices:: BBVA in cloud</title>
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<!-- styles -->
<link rel="stylesheet" type="text/css" href="/css/main.css" />

<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
      <script src="/js/lib/html5shiv.js"></script>
    <![endif]-->
</head>
<body>

	<div class="container">

		<!-- include backend-header.jsp -->
		<jsp:include page="/backend/backend-header.jsp" />
		<!-- EO include backend-header.jsp -->

		<!-- include navbar.jsp -->
		<jsp:include page="/backend/backend-navbar.jsp" />
		<!-- EO include navbar.jsp -->

		<!-- include events-home.html -->
		<section class="section-page">

			<header class="header-section">
				<h1>Utilidades - Web Services</h1>
			</header>

			<div class="container-fluid">
				<div class="row-fluid">
					<div class="span24">
						<div class="accordion">
							<div class="accordion-group">
								<div class="accordion-heading">
									<a class="accordion-toggle" data-toggle="collapse"
										data-parent="#accordion2" href="#collapseOne"> Web
										Services :: Eventos </a>
								</div>
								<div id="collapseOne" class="accordion-body collapse in">
									<div class="accordion-inner">
										<ul class="decorated-list">
											<li><a
												href="https://sopragroupux.appspot.com/_ah/api/evento/v5/event/"
												target="_blank">Listado de eventos</a>
												<p>https://sopragroupux.appspot.com/_ah/api/evento/v4/event/</p>
												<p>httpMethod: "GET"</p></li>
											<li><a
												href="https://sopragroupux.appspot.com/_ah/api/evento/v5/event/"
												target="_blank">Listado de un evento</a>
												<p>https://sopragroupux.appspot.com/_ah/api/evento/v4/event/{id}</p>
												<p>httpMethod: "GET"</p></li>
											<li><a
												href="https://sopragroupux.appspot.com/_ah/api/evento/v5/event/"
												target="_blank">Insertar Evento</a>
												<p>https://sopragroupux.appspot.com/_ah/api/evento/v4/event/</p>
												<p>httpMethod: "POST"</p>
												<p>data: jSON de la estructura de Event.</p></li>
											<li><a
												href="https://sopragroupux.appspot.com/_ah/api/evento/v5/event/"
												target="_blank">Eliminar Evento</a>
												<p>https://sopragroupux.appspot.com/_ah/api/evento/v5/event/{id}</p>
												<p>httpMethod: "DELETE"</p>
												<p>data: {id} del elemento a eliminar</p></li>
											<li><a
												href="https://sopragroupux.appspot.com/_ah/api/evento/v5/event/"
												target="_blank">Actualizar Evento</a>
												<p>https://sopragroupux.appspot.com/_ah/api/evento/v4/event/</p>
												<p>httpMethod: "PUT"</p>
												<p>data: jSON de la estructura de Event.</p></li>
										</ul>
									</div>
								</div>
							</div>
							<div class="accordion-group">
								<div class="accordion-heading">
									<a class="accordion-toggle" data-toggle="collapse"
										data-parent="#accordion3" href="#collapseTwo"> Web
										Services :: Lugares de Interes </a>
								</div>
								<div id="collapseTwo" class="accordion-body collapse in">
									<div class="accordion-inner">
										<ul class="decorated-list">
											<li><a
												href="https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/"
												target="_blank">Listado de Lugars</a>
												<p>https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/</p>
												<p>httpMethod: "GET"</p></li>
											<li><a
												href="https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/"
												target="_blank">Listado de un Lugar</a>
												<p>https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/{id}</p>
												<p>httpMethod: "GET"</p></li>
											<li><a
												href="https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/"
												target="_blank">Insertar Lugar</a>
												<p>https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/</p>
												<p>httpMethod: "POST"</p>
												<p>data: jSON de la estructura de Lugar.</p></li>
											<li><a
												href="https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/"
												target="_blank">Eliminar Lugar</a>
												<p>https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/{id}</p>
												<p>httpMethod: "DELETE"</p>
												<p>data: {id} del elemento a eliminar</p></li>
											<li><a
												href="https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/"
												target="_blank">Actualizar Lugar</a>
												<p>https://sopraux-bbva.appspot.com/_ah/api/place/v1/place/</p>
												<p>httpMethod: "PUT"</p>
												<p>data: jSON de la estructura de Lugar.</p></li>
										</ul>
									</div>
								</div>
							</div>
							<div class="accordion-group">
								<div class="accordion-heading">
									<a class="accordion-toggle" data-toggle="collapse"
										data-parent="#accordion4" href="#collapseThree"> Web
										Services :: Banner </a>
								</div>
								<div id="collapseThree" class="accordion-body collapse in">
									<div class="accordion-inner">
										<ul class="decorated-list">
											<li><a
												href="https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/"
												target="_blank">Listado Banner</a>
												<p>https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/</p>
												<p>httpMethod: "GET"</p></li>
											<li><a
												href="https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/"
												target="_blank">Listado de Banner</a>
												<p>https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/{id}</p>
												<p>httpMethod: "GET"</p></li>
											<li><a
												href="https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/"
												target="_blank">Insertar Banner</a>
												<p>https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/</p>
												<p>httpMethod: "POST"</p>
												<p>data: jSON de la estructura de Lugar.</p></li>
											<li><a
												href="https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/"
												target="_blank">Eliminar Banner</a>
												<p>https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/{id}</p>
												<p>httpMethod: "DELETE"</p>
												<p>data: {id} del elemento a eliminar</p></li>
											<li><a
												href="https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/"
												target="_blank">Actualizar Banner</a>
												<p>https://sopraux-bbva.appspot.com/_ah/api/banner/v1/banner/</p>
												<p>httpMethod: "PUT"</p>
												<p>data: jSON de la estructura de Lugar.</p></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

	</div>
	<jsp:include page="/libraries-js.jsp" />
	<!-- Bloque de Librerias - Angularjs - genericas -->
	<jsp:include page="/libraries-angular.jsp" />
	<!-- EO Bloque de Librerias -  Angularjs - genericas -->
	<script src="/src/appBack.js"></script>
	<script src="/js/application.js"></script>
</body>
</html>