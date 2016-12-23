$(document).ready(function() {
$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $(this).children().toggleClass("cerrar");
        $("#wrapper").toggleClass("toggled");
    });
});