<!-- include backend-navbar.jsp -->
<nav class="navbar" ng-controller="NavController" >
	<div class="navbar-inner">
		<div class="container">

			<!-- .btn-navbar is used as the toggle for collapsed navbar content -->
			<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span class="icon-bar"></span> <span
				class="icon-bar"></span> <span class="icon-bar"></span>
			</a>

			<!-- Be sure to leave the brand out there if you want it shown -->
			<a class="brand visible-phone" href="#">BBVA in Google Cloud</a>

			<!-- Everything you want hidden at 940px or less, place within here -->
			<div class="nav-collapse collapse">
				<!-- .nav, .navbar-search, .navbar-form, etc -->
				<ul class="nav" >
					<li ng-class="{ active: isActive('/index.jsp')}" class="divider-vertical"><a href="/backend/index.jsp">Home</a></li>
					<!-- Eventos -->
					<li ng-class="{ active: isActive('/event')}" class="divider-vertical dropdown">
						<a class="dropdown-toggle" data-toggle="dropdown">Eventos <b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="/backend/events/event-new.jsp">Dar de <strong>alta</strong> un evento</a></li>
							<li><a href="/backend/events/events-app.jsp#/events-table-list"><strong>Listar/Editar/Borrar</strong> eventos</a></li>
							<li class="divider"></li>
							<li><a href="/backend/events/events-map.jsp">Localizar eventos en Google <strong>Maps</strong></a></li>
							<li><a href="/backend/events/events-calendar.jsp">Localizar	eventos en Google <strong>Calendar</strong></a></li>
						</ul>
					</li>
					<!-- Lugares de interes -->
					<li ng-class="{ active: isActive('/place')}" class="divider-vertical dropdown"><a class="dropdown-toggle" data-toggle="dropdown">Lugares de inter&eacute;s <bclass="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="/backend/places/places-app.jsp#/place-new">Dar	de <strong>alta</strong> un lugar de interés
							</a></li>
							<li><a href="/backend/places/places-app.jsp"><strong>Listar/Editar/Borrar</strong>
									lugares de interés</a></li>
							<li class="divider"></li>
							<li><a href="/backend/places/places-map.jsp#/place-map">Localizar
									lugares de inter&eacute;s en Google <strong>Maps</strong>
							</a></li>
						</ul></li>
					<!-- Vídeos -->
					<li ng-class="{ active: isActive('/video')}"
						class="divider-vertical dropdown"><a href="#"
						class="dropdown-toggle" data-toggle="dropdown">V&iacute;deos <b
							class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="/backend/video/videos-new.jsp"><strong>Subir</strong> un v&iacute;deo
							</a></li>
							<li><a href="/backend/video/videos.jsp"><strong>Listar/Borrar</strong>
									v&iacute;deos</a></li>
						</ul></li>
					<!-- Slider -->
					<li ng-class="{ active: isActive('/banner')}" class="divider-vertical dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Slider <b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="/backend/banner/banner-app.jsp#/banner-new">Dar de <strong>alta</strong> un slide</a></li>
							<li><a href="/backend/banner/banner-app.jsp#/banner-list"><strong>Listar/Editar/Borrar</strong> slides</a></li>
						</ul>
					</li>
					<!-- Utilidades -->
					<li ng-class="{ active: isActive('/webservices.jsp')}" class="divider-vertical dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Utilidades <b class="caret"></b></a>
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
