<!DOCTYPE  html>
<!--ng-app hace referencia al nombre de nuestro modulo-->
<html lang="es" ng-app="app">
    <head>
        <meta charset="UTF-8" />
    </head>
    <body>
        <!--añadimos aquí el controlador appController ya que será donde mostremos los datos-->
        <div class="row" ng-controller="appController">
            <h1 class="subheader">Consumir un json con $http en AngularJS</h1>
            <ul class="panel callout radius">
                <li ng-repeat="data in datos">
                    <p>Id: {{ data.id }}<!-- Nombre: {{ data.nombre }} Profesión: {{ data.profesion }}--></p>
                </li>
            </ul>
<!--
            <h1 class="subheader">Consumir un json con resource en AngularJS</h1>
            <ul class="panel callout radius">
                <li ng-repeat="data in datosResource">
                    <p>Id: {{ data.id }} Nombre: {{ data.nombre }} Profesión: {{ data.profesion }}</p>
                </li>
            </ul>-->
        </div>
        <script type="text/javascript" src="js/lib/angular/angular.js"></script>
        <script type="text/javascript" src="js/lib/angular/angular_resource.js"></script>
        <script type="text/javascript" src="js/app.js"></script>
    </body>
</html>