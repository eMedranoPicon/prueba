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
  <title>backend - webservices:: BBVA in cloud</title>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
  <!-- styles -->
  <link rel="stylesheet" type="text/css" href="/css/main.css" />

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
      <script src="/js/lib/html5shiv.js"></script>
    <![endif]-->

  <!-- Bloque de Librerias - libreriasjs -->
  <jsp:include page="/libraries-js.jsp" />
  <script src="/js/application.js"></script>


</head>
<body>

<div class="container">

  <!-- include backend-header.jsp -->
  <jsp:include page="/content/common/backend-header.jsp"/>
  <!-- EO include backend-header.jsp -->

  <!-- include navbar.jsp -->
  <jsp:include page="/content/common/backend-navbar.jsp"/>
  <!-- EO include navbar.jsp -->

  <!-- include events-home.html -->
  <section class="section-page">

    <header class="header-section">
   		<h1>Utilidades - Web Services</h1>
  	</header>

    <div class="container-fluid">
      <div class="row-fluid">
        <div class="span24">

          <div class="accordion" id="accordion2">
            <div class="accordion-group">
              <div class="accordion-heading">
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">
                  Web Services :: Eventos
                </a>
              </div>
              <div id="collapseOne" class="accordion-body collapse in">
                <div class="accordion-inner">
                  <ul class="decorated-list">
                    <li>
                      <a href="https://sopragroupux.appspot.com/_ah/api/evento/v5/event/" target="_blank">Listado de eventos</a>
                      <p>https://sopragroupux.appspot.com/_ah/api/evento/v4/event/</p>
                      <p>httpMethod: "GET"</p>
                    </li>
                    <li>
                      <a href="https://sopragroupux.appspot.com/_ah/api/evento/v5/event/" target="_blank">Listado de un evento</a>
                      <br>https://sopragroupux.appspot.com/_ah/api/evento/v4/event/{id}
                      <br>httpMethod: "GET"
                    </li>
                    <li>
                      <a href="https://sopragroupux.appspot.com/_ah/api/evento/v5/event/" target="_blank">Insertar Evento</a>
                      <br>https://sopragroupux.appspot.com/_ah/api/evento/v4/event/
                      <br>httpMethod: "POST"
                      <br>data: jSON de la estructura de Event.
                    </li>
                    <li>
                      <a href="https://sopragroupux.appspot.com/_ah/api/evento/v5/event/" target="_blank">Eliminar Evento</a>
                      <br>https://sopragroupux.appspot.com/_ah/api/evento/v5/event/{id}
                      <br>httpMethod: "DELETE"
                      <br>data: {id} del elemento a eliminar
                    </li>
                    <li>
                      <a href="https://sopragroupux.appspot.com/_ah/api/evento/v5/event/" target="_blank">Actualizar Evento</a>
                      <br>https://sopragroupux.appspot.com/_ah/api/evento/v4/event/
                      <br>httpMethod: "PUT"
                      <br>data: jSON de la estructura de Event.
                    </li>
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
</body>
</html>