var cargarPagina = function() {
	scroll();
	$("#busqueda").keyup(buscar);
};

$(document).ready(cargarPagina);

var distrito = localStorage.getItem("buscar");

var scroll = function() {
	$(window).scroll(function() {
		var scrollPos = $(window).scrollTop(),
        navbar = $(".navbar-fixed-top");
    	if (scrollPos > 10) {
      		navbar.css("background-color", "#FFF");
      		$("#busqueda").removeClass("ocultar");
    	} else {
      		navbar.css("background-color", "transparent");
      		$("#busqueda").addClass("ocultar");
    	}
    });
};

var buscar = function(e) {
	var busqueda = $("#busqueda").val();
	if (e.keyCode == 13) {
    	window.location.href = "home.html";
    	localStorage.setItem("buscar", busqueda);
    }
};