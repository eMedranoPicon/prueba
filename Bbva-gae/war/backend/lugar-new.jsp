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
<title>backend - lugares de interés:: BBVA in cloud</title>
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<!-- styles -->
<link rel="stylesheet" type="text/css" href="/css/main.css" />
<style>
#map-canvas {
	width: 100%;
	height: 360px;
}
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
<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
			<script src="/js/lib/html5shiv.js"></script>
			<![endif]-->
<!-- Bloque de Librerias - libreriasjs -->
<jsp:include page="/libraries-js.jsp" />
<script
	src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true"></script>
<script src="https://apis.google.com/js/client.js?onload=auth"></script>
<script src="/js/backend.js"></script>

</head>
<body>
	<div class="container">
		<!-- include backend-header.jsp -->
		<jsp:include page="/content/common/backend-header.jsp" />
		<!-- EO include backend-header.jsp -->
		<!-- include backend-navbar.jsp -->
		<jsp:include page="/content/common/backend-navbar.jsp" />
		<!-- EO include backend-navbar.jsp -->
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
						<input type="hidden" id="idLugar"> <input type="hidden"
							id="creador" value="<%=user.getEmail()%>">
						<!-- End -->
						<div class="control-group">
							<label class="control-label" for="title">Nombre Lugar*</label>
							<div class="controls">
								<input type="text" id="title" name="title"
									placeholder="Nombre Lugar">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="tipoLugar">Tipo Lugar*</label>
							<div class="controls">
									<select id="tipoLugar" name="tipoLugar">
									  <option value="Restaurante">Restaurante</option>
									  <option value="Convenciones">Convenciones</option>
									  <option value="Centro de Ocio">Centro de Ocio</option>
									  <option value="Convenciones">Otro</option>
									</select>
							</div>
						</div>
				
						<fieldset>
							<legend>Localización del evento</legend>

							<div class="control-group">
								<label class="control-label" for="address">Dirección*</label>
								<div class="controls">
									<input type="text" id="street" name="street" placeholder=""
										required>
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
									<input type="text" id="city" name="city" placeholder=""
										required>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="country">País*</label>
								<div class="controls">
									<input type="text" id="country" name="country" placeholder=""
										required>
								</div>
							</div>

							<div class="control-group">

								<div class="controls form-action">
									<a class="btn btn-success btn-small"
										href="javascript:previewMap();">Ubicar en Google Maps</a>
								</div>
							</div>
						</fieldset>
						<fieldset>
							<legend>Observaciones</legend>
						<div class="control-group">
							<div class="controls">
								<textarea rows="4" cols="30" name="description" id="description"
									required></textarea>
							</div>
						</div>
						</fieldset>
						<fieldset>
							<legend>Datos de Contacto</legend>
							<div class="control-group">
							<label class="control-label" for="nombreContacto">Nombre Completo*</label>
							<div class="controls">
								<input type="text" id="nombreContacto" name="nombreContacto"
									placeholder="Nombre de Contacto">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="emailContacto">Email Contacto*</label>
							<div class="controls">
								<input type="text" id="emailContacto" name="emailContacto"
									placeholder="Email de Contacto">
							</div>
						</div>
							
						</fieldset>
						<div class="control-group">
							<div class="controls">
								<button type="submit" class="btn btn-primary ">Guardar
									Lugar</button>
							</div>
						</div>
					</form>
				</div>
				<div class="span15">
					<div class="Flexible-container">
						<div id="map-canvas"></div>
					</div>
				</div>
				<%
					}
				%>
			</div>
		</div>
	</div>
	<div id="confirmaEvento" class="modal hide fade">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">&times;</button>
			<h3>Evento</h3>
		</div>
		<div class="modal-body">
			<p>El evento ha sido creado correctamente.</p>
		</div>
		<div class="modal-footer">
			<a href="/backend/events-app.jsp#/events-table-list"
				class="btn btn-primary">Aceptar</a>
		</div>
	</div>
	<script src="/js/maps.js"></script>
<script src="/js/lugar.js"></script>
<script type="text/javascript">
	$(function() {
		//Limpiando Mapa						
		//newEventMap();
	});
</script>
</body>
</html>