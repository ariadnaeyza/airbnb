var cargarPagina = function() {
	scroll();
	$("#busqueda").keyup(buscar);
};

$(document).ready(cargarPagina);

var distrito = localStorage.getItem("buscar");
var busqueda = $("#busqueda").val();

var scroll = function() {
	$(window).scroll(function() {
		var scrollPos = $(window).scrollTop(),
        navbar = $(".navbar-fixed-top");
    	if (scrollPos > 30) {
      		navbar.css("background-color", "#FFF");
      		$("#busqueda").removeClass("ocultar");
    	} else {
      		navbar.css("background-color", "transparent");
      		$("#busqueda").addClass("ocultar");
    	}
    });
};

var buscar = function(e) {
	if (e.keyCode == 13) {
    	window.location.href = "home.html";
    	localStorage.setItem("buscar", busqueda);
    }
};