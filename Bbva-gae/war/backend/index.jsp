<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="com.google.appengine.api.users.User"%>
<%@ page import="com.google.appengine.api.users.UserService"%>
<%@ page import="com.google.appengine.api.users.UserServiceFactory"%>

<!DOCTYPE html>
<html lang="es" ng-app="appBack">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  <meta charset="utf-8">
  <!--<link rel="icon" href="img/favicon.ico" type="image/icon">-->
  <title>backend:: BBVA in cloud</title>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="">

  <!-- styles -->
  <link href="/css/main.css" rel="stylesheet">

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
    <script src="/js/lib/html5shiv.js"></script>
  <![endif]-->

  <!-- Bloque de Librerias - libreriasjs -->
  <jsp:include page="/libraries-js.jsp"/>
  <!-- EO Bloque de Librerias - libreriasjs -->
  <!-- Bloque de Librerias - Angularjs - genericas -->
  <jsp:include page="/libraries-angular.jsp" />
  <!-- EO Bloque de Librerias -  Angularjs - genericas -->
  <script src="/src/appBack.js"></script>
  <script src="https://apis.google.com/js/client.js"></script>

</head>

<body>

<div class="container">

  <!-- include backend-header.jsp -->
  <jsp:include page="/content/common/backend-header.jsp"/>
  <!-- EO include backend-header.jsp -->

  <!-- include navbar.jsp -->
  <jsp:include page="/content/common/backend-navbar.jsp" />
  <!-- EO include navbar.jsp -->

  <div class="container-fluid">

    <div class="row-fluid">

      <div class="span8">

        <article class="control-panel">
          <h1>Eventos</h1>
          <div class="option-panel">
            <div class="container-img pull-left">
              <img src="/img/events/events.jpg"  />
            </div>
            <div class="container-data pull-right">
              <!--<p> Desde aquí podrás gestionar tus eventos:</p>-->
              <ul class="decorated-list">
                <li><a href="/backend/event-new.jsp">Dar de <strong>alta</strong> un evento</a></li>
                <li><a href="/backend/events-app.jsp#/events-table-list"><strong>Listar/Editar/Borrar</strong> eventos</a></li>
                <li><a href="/backend/events-map.jsp">Localizar eventos en Google <strong>Maps</strong></a></li>
                <li><a href="/backend/events-calendar.jsp">Localizar eventos en Google <strong>Calendar</strong></a></li>
              </ul>
            </div>
          </div>
        </article>

      </div>

      <div class="span8">

        <article class="control-panel">
          <h1>Lugares de interés</h1>
          <div class="option-panel">
            <div class="container-img pull-left">
              <img src="/img/google-map-push-pin2.jpg"  />
            </div>
            <div class="container-data pull-right">
              <!--<p> Desde aquí podrás gestionar tus lugares de interés:</p>-->
              <ul class="decorated-list">
                <li><a href="/backend/places/places-app.jsp#/place-new">Dar de <strong>alta</strong> un lugar de interés</a></li>
                <li><a href="/backend/places/places-app.jsp"><strong>Listar/Editar/Borrar</strong> lugares de interés</a></li>
                <li><a href="/backend/places/places-map.jsp#/place-map">Localizar lugares de interés en Google <strong>Maps</strong></a></li>
              </ul>
            </div>
          </div>
        </article>

      </div>

      <div class="span8">

        <article class="control-panel">
          <h1>Videos</h1>
          <div class="option-panel">
            <div class="container-img pull-left">
              <img src="/img/Video.png"  />
            </div>
            <div class="container-data pull-right">
              <!--<p> Desde aquí podrás gestionar tus videos:</p>-->
              <ul class="decorated-list">
                <li><a href="#">Dar de <strong>alta</strong> un video</a></li>
                <li><a href="#"><strong>Listar/Borrar</strong> videos</a></li>

              </ul>
            </div>
          </div>
        </article>

      </div>

    </div>

    <div class="row-fluid">

      <div class="span8">

        <article class="control-panel">
          <h1>Slider</h1>
          <div class="option-panel">
            <div class="container-img pull-left">
              <img src="/img/slider.jpg"  />
            </div>
            <div class="container-data pull-right">
              <!--<p> Desde aquí podrás gestionar tus eventos:</p>-->
              <ul class="decorated-list">
                <li><a href="/backend/banner/banner-app.jsp#/banner-new">Dar de <strong>alta</strong> un slide</a></li>
                <li><a href="/backend/banner/banner-app.jsp"><strong>Listar/Editar/Borrar</strong> slides</a></li>
              </ul>
            </div>
          </div>
        </article>

      </div>

      <div class="span8">

        <article class="control-panel">
          <h1>Utilidades</h1>
          <div class="option-panel">
            <div class="container-img pull-left">
              <img src="/img/tools.jpg"  />
            </div>
            <div class="container-data pull-right">
              <!--<p> Desde aquí podrás gestionar tus eventos:</p>-->
              <ul class="decorated-list">
                <li><a href="https://appengine.google.com" target="_blank">Dashboard app engine</a></li>
                <li><a href="/backend/webservices.jsp">Ver estado de los <strong>web services</strong></a></li>
                <li><a href="/index.jsp">Volver a <strong>BBVA in Google Cloud</strong></a></li>
              </ul>
            </div>
          </div>
        </article>

      </div>

    </div>

  </div>

   <jsp:include page="/content/common/footer.html"/>

</div> <!-- EO Container Page -->
</body>
</html>