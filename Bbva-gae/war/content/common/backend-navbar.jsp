<!-- include backend-navbar.jsp -->
<nav class="navbar">
  <div class="navbar-inner">
    <div class="container">

      <!-- .btn-navbar is used as the toggle for collapsed navbar content -->
      <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>

      <!-- Be sure to leave the brand out there if you want it shown -->
      <a class="brand visible-phone" href="#">BBVA in Google Cloud</a>

      <!-- Everything you want hidden at 940px or less, place within here -->
      <div class="nav-collapse collapse">
        <!-- .nav, .navbar-search, .navbar-form, etc -->
        <ul class="nav">
          <li class="active divider-vertical">
            <a href="/backend/index.jsp">Home</a>
          </li>

          <li class="divider-vertical dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Eventos <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li><a href="/backend/event-new.jsp">Dar de <strong>alta</strong> un evento</a></li>
              <li><a href="/backend/events-app.jsp#/events-table-list"><strong>Listar/Editar/Borrar</strong> eventos</a></li>
              <li class="divider"></li>
              <li><a href="/backend/events-map.jsp">Localizar eventos en Google <strong>Maps</strong></a></li>
              <li><a href="/backend/events-calendar.jsp">Localizar eventos en Google <strong>Calendar</strong></a></li>
            </ul>
          </li>

          <li class="divider-vertical dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Lugares de inter&eacute;s <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li><a href="/backend/places-app.jsp#/place-new">Dar de <strong>alta</strong> un lugar de interés</a></li>
              <li><a href="/backend/places-app.jsp"><strong>Listar/Editar/Borrar</strong> lugares de interés</a></li>
              <li class="divider"></li>
              <li><a href="#">Localizar lugares de inter&eacute;s en Google <strong>Maps</strong></a></li>
            </ul>
          </li>

          <li class="divider-vertical dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">V&iacute;deos <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li><a href="#">Dar de <strong>alta</strong> un lugar de inter&eacute;s</a></li>
              <li><a href="#"><strong>Listar/Borrar</strong> v&iacute;deos</a></li>
            </ul>
          </li>

          <li class="divider-vertical dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Slider <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li><a href="#">Dar de <strong>alta</strong> un slide</a></li>
              <li><a href="#"><strong>Listar/Editar/Borrar</strong> slides</a></li>
            </ul>
          </li>

          <li class="divider-vertical dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Utilidades <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li><a href="/backend/webservices.jsp">Ver <strong>web services</strong> disponibles</a></li>
              <li><a href="/index.jsp" target="_blank">Volver a <strong>BBVA in Google Cloud</strong></a></li>
            </ul>
          </li>

        </ul>

      </div>

    </div>
  </div>
</nav>
<!-- EO include backend-navbar.jsp -->
