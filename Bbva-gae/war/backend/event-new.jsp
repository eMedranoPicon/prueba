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
	<title>backend - events:: BBVA in cloud</title>
	<meta charset="utf-8">
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no">

	<!-- styles -->
	<link rel="stylesheet" type="text/css" href="/css/main.css" />
	<link rel="stylesheet" type="text/css" href="/css/bootstrap-datetimepicker.min.css" />

	<style>
		#map-canvas		{
			width: 100%;
			height: 360px;		}
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
	<script src="/js/application.js"></script>
	<script src="/js/maps.js"></script>
	<script src="/js/calendar.js"></script>
	<script src="/js/lib/bootstrap-datetimepicker.min.js"></script>
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
</head>
<body onload=oneAuth();>

<div class="container">

	<!-- include backend-header.jsp -->
  	<jsp:include page="/content/common/backend-header.jsp"/>
  	<!-- EO include backend-header.jsp -->

  	<!-- include backend-navbar.jsp -->
  	<jsp:include page="/content/common/backend-navbar.jsp"/>
  	<!-- EO include backend-navbar.jsp -->

  	<div class="container-fluid">
		<div class="row-fluid">

		<%
			if (user == null)
			{
		%>
				No puedes crear Eventos. Logueate
				<a href="<%=url%>"><%=urlLinktext%></a>
		<%
			}
			else
			{
		%>

			<div class="span9">
				<form class="form-horizontal">
					<!-- hiddden fields -->
					<input type="hidden" id="idEvent">
					<input type="hidden" id="host" value="<%=user.getEmail()%>">
					<!-- End -->
					<div class="control-group">
						<label class="control-label" for="title">Titulo Evento</label>
						<div class="controls">
							<input type="text" id="title" name="title" placeholder="Titulo Evento">
						</div>
					</div>

					<div class="control-group">
						<label class="control-label" for="dateStart">Fecha y Hora de Inicio</label>
						<div class="controls">
					  		<input id="dateStart" data-format="dd/MM/yyyy hh:mm" placeholder="dd/MM/yyyy hh:mm"
								type="text"></input> <span class="add-on"> <i
									data-time-icon="icon-time" data-date-icon="icon-calendar"> </i>
							</span>
						</div>
					</div>

					<div class="control-group">
						<label class="control-label" for="dateEnd">Fecha y Hora de Fin</label>
						<div class="controls">
					  		<input id="dateEnd" data-format="dd/MM/yyyy hh:mm" placeholder="dd/MM/yyyy hh:mm"
								type="text"></input> <span class="add-on"> <i
									data-time-icon="icon-time" data-date-icon="icon-calendar"> </i>
							</span>
						</div>
					</div>

					<div class="control-group">
						<label class="control-label" for="description">Descripción</label>
						<div class="controls">
							<textarea rows="4" cols="30" name="description" id="description"></textarea>
						</div>
					</div>

					<div class="control-group">
						<label class="control-label" for="urlEvent">URL Evento</label>
						<div class="controls">
							<input type="text" id="urlEvent" name="urlEvent" placeholder="">
						</div>
					</div>

					<div class="control-group">
						<label class="control-label" for="urlImg">URL Imagen</label>
						<div class="controls">
							<input type="text" id="urlImg" name="urlImg" placeholder="">
						</div>
					</div>

					<div class="control-group">
						<label class="control-label" for="audience">Asistentes(separados por comas)</label>
						<div class="controls">
							<input type="text" id="audience" name="audience" placeholder="">
						</div>
					</div>

					<div class="control-group">
						<label class="control-label" for="tags">Etiquetas(separadas por comas)</label>
						<div class="controls">
							<input type="text" id="tags" name="tags" placeholder="">
						</div>
					</div>

					<div class="control-group">
						<label class="control-label" for="address">Dirección</label>
						<div class="controls">
							<input type="text" id="street" name="street" placeholder="">
						</div>
					</div>

					<div class="control-group">
						<label class="control-label" for="zipcode">Código Postal</label>
						<div class="controls">
							<input type="text" id="zipcode" name="zipcode" placeholder="">
						</div>
					</div>

					<div class="control-group">
						<label class="control-label" for="city">Ciudad</label>
						<div class="controls">
							<input type="text" id="city" name="city" placeholder="">
						</div>
					</div>

					<div class="control-group">
						<label class="control-label" for="country">País</label>
						<div class="controls">
							<input type="text" id="country" name="country" placeholder="">
						</div>
					</div>

					<div class="control-group">
						<div class="controls">
							<a class="btn btn-success btn-small" href="javascript:jEvenBuilder();">Guardar
					Evento</a><div id="resultjs"></div>
							<a class="btn btn-success btn-small" href="javascript:previewMap();">Ubicar en Google Maps</a>							
						</div>
					</div>
				</form>
			</div>

			<div class="span15">				
				<div class="mapWrapper">
					<div id="map-canvas"></div>
				</div>
				 <iframe src="https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;src=72o4s6adl0uhbebjssl4dpraeo%40group.calendar.google.com&amp;color=%23B1440E&amp;ctz=Europe%2FMadrid" style=" border-width:0 " width="100%" height="400px" frameborder="0" scrolling="no"></iframe>
				
			</div>
		<%
			}
		%>
		</div>
	</div>
</div>
</body>
</html>