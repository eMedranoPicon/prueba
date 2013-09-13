<!-- include navbar.jsp -->
<nav class="navbar">
	<div class="navbar-inner">
		<div class="container">

			<!-- .btn-navbar is used as the toggle for collapsed navbar content -->
			<a class="btn btn-navbar" data-toggle="collapse"
				data-target=".nav-collapse"> <span class="icon-bar"></span> <span
				class="icon-bar"></span> <span class="icon-bar"></span>
			</a>

			<!-- Be sure to leave the brand out there if you want it shown -->
			<a class="brand visible-phone" href="#">BBVA in Google Cloud</a>

			<!-- Everything you want hidden at 940px or less, place within here -->
			<div class="nav-collapse collapse">
				<!-- .nav, .navbar-search, .navbar-form, etc -->
				<ul class="nav" ng-controller="NavController">
					<li class="divider-vertical" ng-class="{ active: isActive('/index.jsp')}"><a href="/index.jsp#/">Home</a></li>
					<!--
					<li class="divider-vertical" ng-class="{ active: isActive('/events.jsp')}"><a href="/events.jsp#/events-list">Eventos</a></li>-->

					<li ng-class="{ active: isActive('/events.jsp')}" class="divider-vertical dropdown">
						<a class="dropdown-toggle" data-toggle="dropdown2">Eventos <b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="/events.jsp#/events-list">Ver <strong>todos</strong> los eventos</a></li>
							<li><a href="/events.jsp#/events-prox">Ver eventos <strong>próximos</strong></a></li>
							<li><a href="/events.jsp#/events-past">Ver eventos <strong>pasados</strong></a></li>
							<li class="divider"></li>
							<li><a href="/events.jsp#/events-map">Localizar eventos en Google <strong>Maps</strong></a></li>
							<li><a href="/events.jsp#/events-calendar">Localizar eventos en Google <strong>Calendar</strong></a></li>
							<li class="divider"></li>
							<li><a href="/backend/events/events-map.jsp">Localizar eventos en Google <strong>Maps</strong></a></li>
							<li><a href="/backend/events/events-calendar.jsp">Localizar	eventos en Google <strong>Calendar</strong></a></li>
						</ul>
					</li>
						<!-- Lugares de interes -->
					<li ng-class="{ active: isActive('/place')}" class="divider-vertical dropdown"><a class="dropdown-toggle" data-toggle="dropdown">Lugares de inter&eacute;s <b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="/places.jsp#/places-list">Listado lugares de inter&eacute;s
							</a></li>
							<li><a href="/places.jsp#/places-map">Localizar
									lugares de inter&eacute;s en Google <strong>Maps</strong></a></li>
						</ul>
					</li>
					<li class="divider-vertical" ng-class="{ active: isActive('/videos.jsp')}">
					<a href="/videos.jsp">V&iacute;deos</a></li>
					<li class="divider-vertical">
					<a href="/videos-test.jsp">V&iacute;deos</a></li>
				</ul>

				<form class="navbar-search">
					<input type="text" class="search-query" placeholder="Buscar">
				</form>

			</div>

		</div>
	</div>
</nav>
<!-- EO include navbar.jsp -->
