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
					<li class="divider-vertical"
						ng-class="{ active: isActive('/index.jsp')}"><a
						href="/index.jsp">Home</a></li>
					<li class="divider-vertical"
						ng-class="{ active: isActive('/events.jsp')}"><a
						href="/events.jsp">Eventos</a></li>
					<li class="divider-vertical"
						ng-class="{ active: isActive('/places.jsp')}"><a
						href="/places.jsp">Lugar&eacute;s de inter&eacute;s</a></li>
					<li class="divider-vertical"
						ng-class="{ active: isActive('/videos.jsp')}"><a
						href="/videos.jsp">V&iacute;deos</a></li>
				</ul>

				<form class="navbar-search">
					<input type="text" class="search-query" placeholder="Search">
				</form>

			</div>

		</div>
	</div>
</nav>
<!-- EO include navbar.jsp -->
