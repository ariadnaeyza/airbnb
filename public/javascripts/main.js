$(document).ready(function(){
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
    var distrito = localStorage.getItem("buscar");
    $("#busqueda").keyup(buscar);
    var buscar = function(e) {
    	var busqueda = $("#busqueda").val();
    	if (e.keyCode == 13) {
    		window.location.href = "home.html";
    		localStorage.setItem("buscar", busqueda);
    	}
    };
    
});