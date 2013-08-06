<%
   response.setHeader( "Pragma", "no-cache" );
   response.setHeader( "Cache-Control", "no-cache" );
   response.setDateHeader( "Expires", 0 );
%>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  <meta charset="utf-8">
  <!--<link rel="icon" href="img/favicon.ico" type="image/icon">-->
  <title>BBVA in cloud</title>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="">

  <!-- styles -->
  <link href="/css/main.css" rel="stylesheet">

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
    <script src="js/lib/html5shiv.js"></script>
  <![endif]-->

  <!-- Bloque de Librerias - libreriasjs -->
  <jsp:include page="libraries-js.jsp"/>
  <!-- EO Bloque de Librerias - libreriasjs -->

</head>
<!--  http://alefeuvre.github.io/foundation-grid-displayer/ -->
<!-- <body data-grid-framework="bo" data-grid-color="blue" data-grid-opacity="0.5" data-grid-zindex="10" data-grid-nbcols="12">-->
<body>

<div class="container">

  <!-- include header.jsp -->
  <jsp:include page="/content/common/header.jsp"/>
  <!-- EO include header.jsp -->

  <!-- include navbar.jsp -->
  <jsp:include page="/content/common/navbar.jsp"/>
  <!-- EO include navbar.jsp -->

  <!-- include events-home.html -->
  <section class="section-page">
    <header class="header-section">
      <h1>Parser json</h1>
    </header>

    <div class="container-fluid">
      <div class="row-fluid">

        <div class="span24">


<script type="text/javascript">
 function newpostReq(url,callBack)
{
    var xmlhttp;
    if (window.XDomainRequest)
    {
        xmlhttp=new XDomainRequest();
        xmlhttp.onload = function(){callBack(xmlhttp.responseText)};
    }
    else if (window.XMLHttpRequest)
        xmlhttp=new XMLHttpRequest();
    else
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
            callBack(xmlhttp.responseText);
    }

    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

$( document ).ready(function() {

var returnedJSON;
var url="https://sopragroupux.appspot.com/_ah/api/evento/v4/event";


newpostReq(url, function(jsonString)
{
  var parsedJSON = $.parseJSON(String(jsonString));

out="";

$("#jsontext2").text("jsonString"+jsonString);
$("#jsontext3").text("parsedJSON"+parsedJSON);



  //out += jsonPath(parsedJSON, "$.items.*")+ "\n\n";
 /*out += jsonPath(parsedJSON, "$.items[*].id") + "\n\n";
  out += jsonPath(parsedJSON, "$.items[0]") + "\n\n";
  out += jsonPath(parsedJSON, "$.items[-1:]") + "\n\n";*/
  out += jsonPath(parsedJSON, "$.items[?(@.id==2721)].id").toString() + "\n\n";


 $("#jsontext").text("OUT"+out);

}
);





});
  </script>
    <pre id="jsontextjsonPath">
</pre>
  <pre id="jsontext">
</pre>
 <pre id="jsontext2">
</pre>
 <pre id="jsontext3">
</pre>
<pre>
<script type="text/javascript">


$( document ).ready(function() {


var json=
{
 "items": [
  {
   "id": "1474",
   "title": "nuevo evento js1474",
   "host": "BBVA",
   "description": "Descripcion Evento1474",
   "dateStart": "1378067074",
   "dateEnd": "1378067174",
   "audience": [
    "miguel",
    "juan",
    "francisco",
    "luis",
    "jose",
    "maria",
    "ana"
   ],
   "tags": [
    "etiqueta 1",
    "etiqueta 2",
    "etiqueta 3",
    "etiqueta 4"
   ],
   "address": [
    "calle alcala, 474",
    "",
    "Madrid",
    "Spain",
    "",
    ""
   ],
   "kind": "evento#resourcesItem"
  },
  {
   "id": "1498",
   "title": "Evento importante 2",
   "host": "dummy host",
   "description": "evento 2",
   "dateStart": "165106513203",
   "dateEnd": "165106513252",
   "audience": [
    "luis, juan, david, fernando"
   ],
   "tags": [
    "negocios, estrategia"
   ],
   "address": [
    "Diagonal, 300",
    "",
    "Barcelona",
    "España"
   ],
   "kind": "evento#resourcesItem"
  },
  {
   "id": "1525",
   "title": "Nuevo Evento",
   "host": "dummy host",
   "dateStart": "1378065500",
   "dateEnd": "1378065600",
   "audience": [
    "juan, fernando, luis, andres, miguel, jose"
   ],
   "tags": [
    "fiesta,relax,otros"
   ],
   "address": [
    "Calle de la Antigua Senda de Senent, 11",
    "46023",
    "Valencia",
    "España"
   ],
   "kind": "evento#resourcesItem"
  },
  {
   "id": "1848",
   "title": "Nuevo Evento",
   "host": "dummy host",
   "audience": [
    "miguel, juan, luis, pedro"
   ],
   "tags": [
    "negocios, estrategia"
   ],
   "address": [
    "Ayuntamiento Valencia",
    "",
    "valencia",
    ""
   ],
   "kind": "evento#resourcesItem"
  },
  {
   "id": "2049",
   "title": "Evento importante 3",
   "host": "dummy host",
   "description": "evento 2",
   "dateStart": "165106513203",
   "dateEnd": "165106513252",
   "audience": [
    "luis, juan, david, fernando"
   ],
   "tags": [
    "negocios, estrategia"
   ],
   "address": [
    "Diagonal, 300",
    "",
    "Barcelona",
    "España"
   ],
   "kind": "evento#resourcesItem"
  },
  {
   "id": "2098",
   "title": "Evento importante",
   "host": "dummy host",
   "description": "evento 2",
   "dateStart": "165106513203",
   "dateEnd": "165106513252",
   "audience": [
    "luis, juan, david, fernando"
   ],
   "tags": [
    "negocios, estrategia"
   ],
   "address": [
    "Diagonal, 300",
    "",
    "Barcelona",
    "España"
   ],
   "kind": "evento#resourcesItem"
  },
  {
   "id": "2580",
   "title": "Evento Zaragoza",
   "host": "dummy host",
   "description": "Evento Descripcion",
   "dateStart": "1378085600",
   "dateEnd": "1378085600",
   "audience": [
    "miguel, juan, luis, pedro"
   ],
   "tags": [
    "negocios, estrategia"
   ],
   "address": [
    "Andador Teniente General Gutiérrez Mellado 11",
    "50009 ",
    "Zaragoza ",
    "España"
   ],
   "kind": "evento#resourcesItem"
  },
  {
   "id": "2705",
   "title": "GAE-Prototype",
   "host": "dummy host",
   "description": "asd",
   "dateStart": "12313213180",
   "dateEnd": "12313213225",
   "audience": [
    ""
   ],
   "tags": [
    ""
   ],
   "address": [
    "estadio mestalla",
    "",
    "Valencia",
    ""
   ],
   "kind": "evento#resourcesItem"
  },
  {
   "id": "2721",
   "title": "Evento importante 4",
   "host": "dummy host",
   "description": "evento 2",
   "dateStart": "165106513203",
   "dateEnd": "165106513252",
   "audience": [
    "luis, juan, david, fernando"
   ],
   "tags": [
    "negocios, estrategia"
   ],
   "address": [
    "Diagonal, 300",
    "",
    "Barcelona",
    "España"
   ],
   "kind": "evento#resourcesItem"
  },
  {
   "id": "2787",
   "title": "evento 2",
   "host": "dummy host",
   "description": "malaga descripcion",
   "dateStart": "1378064600",
   "dateEnd": "1378064660",
   "audience": [
    "juan, fernando, luis, andres, miguel, jose"
   ],
   "tags": [
    "fiesta,relax,otros"
   ],
   "address": [
    "Av de Cervantes, 4",
    "29016 ",
    "Málaga",
    ""
   ],
   "kind": "evento#resourcesItem"
  }
 ],
 "kind": "evento#resources",
 "etag": "\"4kPaRpEBqLLOLkA0SUmZiHi0Jaw/qFBtm-Meqnen7iyAXhjNW4_ZLbw\""
},

  out="";
/*
  out += jsonPath(json, "$.items.*").toJSONString() + "\n\n";
  out += jsonPath(json, "$.items[*].id").toJSONString() + "\n\n";
  out += jsonPath(json, "$.items[0]").toJSONString() + "\n\n";
  out += jsonPath(json, "$.items[-1:]").toJSONString() + "\n\n";
  out += jsonPath(json, "$.items[?(@.id==2721)]").toJSONString() + "\n\n";

*/
 $("#jsontextjsonPath").text(out);

});

  </script>
</pre>
        </div>


      </div>
    </div>
  </section>
  <!-- EO include events-home.html -->

</div> <!-- EO Container Page -->

</body>
</html>