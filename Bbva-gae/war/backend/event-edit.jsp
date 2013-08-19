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
	<title>backend - events - new:: BBVA in cloud</title>
	<meta charset="utf-8">
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no">

	<!-- styles -->
	<link rel="stylesheet" type="text/css" href="/css/main.css" />
	<link rel="stylesheet" type="text/css" href="/css/bootstrap-datetimepicker.min.css" />

	<style>
		#map-canvas
		{
			width: 100%;
			height: 360px;
		}
		.mapWrapper {

		}
	</style>

	<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  	<!--[if lt IE 9]>
      <script src="/js/lib/html5shiv.js"></script>
    <![endif]-->

	<!-- Bloque de Librerias - libreriasjs -->
	<jsp:include page="/libraries-js.jsp" />

	<script src="https://apis.google.com/js/client.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true"></script>

	<script src="/js/maps.js"></script>
	<script src="/js/calendar.js"></script>

	<script type="text/javascript">
		$(function()
		{
			$('#dateStart').datetimepicker({
				language : 'es-ES',
				pickSeconds: false
			});
			$('#dateEnd').datetimepicker({
				language : 'es-ES',
				pickSeconds: false
			});
		});
	</script>

	<jsp:include page="/libraries-angular.jsp"/>

</head>
<body>

<div class="container">

	<!-- include backend-header -->
  	<jsp:include page="/content/common/backend-header.jsp"/>
  	<!-- EO include backend-header -->

  	<!-- include backend-navbar -->
  	<jsp:include page="/content/common/backend-navbar.jsp"/>
  	<!-- EO include backend-navbar -->

  	<div class="container-fluid">

		<section>
			<h2 class="headerPage">Edición del evento</h2>
			<%
				if (user == null)
				{
			%>
					<p>No puedes crear Eventos. Logueate
					<a href="<%=url%>"><%=urlLinktext%></a></p>
			<%
				}
				else
				{
			%>

			<div class="row-fluid">
				<div class="span9">
					<div ng-view></div>
				</div>

				<div class="span15">
					<div class="mapWrapper">
						<div id="map-canvas"></div>
					</div>
					 <iframe src="https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;src=72o4s6adl0uhbebjssl4dpraeo%40group.calendar.google.com&amp;color=%23B1440E&amp;ctz=Europe%2FMadrid" style=" border-width:0 " width="100%" height="400px" frameborder="0" scrolling="no"></iframe>

				</div>
			</div>
			<%
				}
			%>
		</section>

	</div>
</div>
<div id="confirmaEvento" class="modal hide fade">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h3>Evento</h3>
  </div>
  <div class="modal-body">
    <p>El evento ha sido creado correctamente.</p>
  </div>
  <div class="modal-footer">
    <a href="/backend/events-list.jsp#/events-table-list" class="btn btn-primary">Aceptar</a>
  </div>
</div>
</body>
</html>