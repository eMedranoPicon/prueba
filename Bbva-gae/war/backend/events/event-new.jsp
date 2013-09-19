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
	<title>backend - events:: BBVA in cloud</title>
	<meta charset="utf-8">
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
	<!-- styles -->
	<link rel="stylesheet" type="text/css" href="/css/main.css" />
	<link rel="stylesheet" type="text/css" href="/css/bootstrap-datetimepicker.min.css" />
	<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
	<script src="/js/lib/html5shiv.js"></script>
	<![endif]-->
</head>
<body>
<div class="container">

	<jsp:include page="/backend/backend-header.jsp" />

	<jsp:include page="/backend/backend-navbar.jsp" />

	<section class="section-page">
		<header class="header-section">
			<h1>Dar de alta un nuevo evento</h1>
		</header>
		<div class="container-fluid">
			<div class="row-fluid">
				<%
					if (user == null) {
				%>
				No puedes crear Eventos. Logueate <a href="<%=url%>"><%=urlLinktext%></a>
				<%
					} else {
				%>
				<div class="span9">
					<form class="form-horizontal" id="new-form">
						<!-- hiddden fields -->
						<input type="hidden" id="idEvent">
						<input type="hidden" id="host" value="<%=user.getEmail()%>">
						<!-- End -->
						<div class="control-group">
							<label class="control-label" for="title">Titulo Evento*</label>
							<div class="controls">
								<input type="text" id="title" name="title" placeholder="Titulo Evento">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="dateStart">Fecha y Hora de Inicio*</label>
							<div class="controls">
								<input id="dateStart" data-format="dd/MM/yyyy hh:mm"placeholder="dd/MM/yyyy hh:mm" type="text" required />
								<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar"> </i></span>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" id="dateEndLabel" for="dateEnd">Fecha y Hora de Fin*</label>
							<div class="controls">
								<input id="dateEnd" data-format="dd/MM/yyyy hh:mm" placeholder="dd/MM/yyyy hh:mm" type="text" required onblur="validateDateRange()" />
								<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar"></i></span>
							</div>
						</div>
						<fieldset>
							<legend>Localización del evento</legend>
							<div class="control-group">
								<label class="control-label" for="address">Dirección*</label>
								<div class="controls">
									<input type="text" id="street" name="street" placeholder=""	required>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="zipcode">Código Postal</label>
								<div class="controls">
									<input type="text" id="zipcode" name="zipcode" placeholder="">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="city">Ciudad*</label>
								<div class="controls">
									<input type="text" id="city" name="city" placeholder=""	required>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="country">País*</label>
								<div class="controls">
									<input type="text" id="country" name="country" placeholder="" required>
								</div>
							</div>
							<div class="control-group">
								<div class="controls form-action">
									<a class="btn btn-success btn-small" href="javascript:previewMap();">Ubicar en Google Maps</a>
								</div>
							</div>
						</fieldset>
						<div class="control-group">
							<label class="control-label" for="description">Descripción*</label>
							<div class="controls">
								<textarea rows="4" cols="30" name="description" id="description" required></textarea>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="urlEvent">URL Evento*</label>
							<div class="controls">
								<input type="text" id="urlEvent" name="urlEvent" placeholder=""	required>
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
							<div class="controls">
								<button type="submit" class="btn btn-primary ">Guardar	Evento</button>
							</div>
						</div>
					</form>
				</div>
				<div class="span15">
					<div class="Flexible-container">
						<div id="map-canvas-event" class="map_canvas"></div>
					</div>
					<div class="Flexible-container">
						<iframe
							src="https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;src=72o4s6adl0uhbebjssl4dpraeo%40group.calendar.google.com&amp;color=%23B1440E&amp;ctz=Europe%2FMadrid"
							style="border-width: 0" width="100%" height="400px"
							frameborder="0" scrolling="no"></iframe>
					</div>
				</div>
				<%
					}
				%>
			</div>
		</div>
	</section>
	<jsp:include page="/content/common/footer.html" />
</div>

<div id="confirmaEvento" class="modal hide fade">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"varia-hidden="true">&times;</button>
		<h3>Evento</h3>
	</div>
	<div class="modal-body">
		<p>El evento ha sido creado correctamente.</p>
	</div>
	<div class="modal-footer">
		<a href="/backend/events/events-app.jsp" class="btn btn-primary">Aceptar</a>
	</div>
</div>

<!-- Bloque de Librerias - libreriasjs -->
<jsp:include page="/libraries-js.jsp" />
<!-- Bloque de Librerias - Angularjs - genericas -->
<jsp:include page="/libraries-angular.jsp" />
<script src="/src/appBack.js"></script>
<!-- EO Bloque de Librerias -  Angularjs - genericas -->
<script	src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true"></script>
<script src="/js/auth.js"></script>
<script src="/js/application.js"></script>
<script src="/js/calendar.js"></script>
<script src="/js/maps.js"></script>
<script src="/js/backend.js"></script>
<script src="https://apis.google.com/js/client.js?onload=handleClientLoadCalendar"></script>
<script type="text/javascript">
	$(function() {
		$('#dateStart').datetimepicker({
			language : 'es',
			pickSeconds : false,
			startDate : new Date()
		});
		$('#dateEnd').datetimepicker({
			language : 'es',
			pickSeconds : false,
			startDate : new Date()
		});
		//Fecha de Finalizacion Obligatoria para poder crear evento en google calendar
		$('#dateEnd').click(function() {
			if ($('#dateEnd').val() == '') {
				$('#dateEnd').val($('#dateStart').val());
			}
		});
	});
</script>
</body>
</html>