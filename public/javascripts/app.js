// function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 6,
//   });
//   var infoWindow = new google.maps.InfoWindow({map: map});

//   // Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };

//       infoWindow.setPosition(pos);
//       infoWindow.setContent('Location found.');
//       map.setCenter(pos);
//     }, function() {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }


// function cargarMapa(position) {
//   var lat = position.coords.latitude; // Guardamos nuestra latitud
//     var lon = position.coords.longitude; // Guardamos nuestra longitud
//     var latlon = new google.maps.LatLng(lat, lon); // Creamos un punto con nuestras coordenadas
//   $("#mapa").addClass("classMap");

//     var propiedadMapa = {
//       center: latlon, // Definimos la posicion del mapa con el punto
//       zoom: 16,
//       mapTypeId: google.maps.MapTypeId.ROADMAP,
//       mapTypeControl: false,
//       disableDefaultUI: true,
//       streetViewControl: false,
//       zoomControl: false
//     };
//     // Creamos el mapa y lo situamos en su capa
//     map = new google.maps.Map(document.getElementById('mapa'), propiedadMapa);
//     // Creamos el objeto principal para realizar la petición de consulta a Google Maps
//     geocoder = new google.maps.Geocoder();
//     // Marcamos nuestra ubicación
//   miUbicacion();

//  };

// function miUbicacion() {
//   var latlon = map.getCenter(); // Obtener la posición del mapa
//     var propiedadMarker = {
//       map: map, // Vinculamos al mapa
//       position: latlon, // Nos situamos en nuestro punto
//       draggable: true, // Nos permite poder mover el marcador
//       icon: 'img/marker.png'
//     };

//     // Creamos un marcador en el mapa
//     markerInicio = new google.maps.Marker(propiedadMarker);
//     // Cada vez que insertemos un marcador, la insertamos en el array mediante el método .push()
//     markers.push(markerInicio);
//     // Agregamos la dirección en el input (Punto de Partida)
//   agregarDireccionInicio();
//   // Agregamos la function a ejecutar al evento de mover el marcador
//     google.maps.event.addListener(markerInicio, 'position_changed', agregarDireccionInicio);
// };

// function geolocate() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(function(position) {
//       var geolocation = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };
//       var circle = new google.maps.Circle({
//         center: geolocation,
//         radius: position.coords.accuracy
//       });
//       autocomplete.setBounds(circle.getBounds());
//       });
//   }
// };

// var sigt = function(e){
// 	e.preventDefault();
// 	var distritoIngresado = $('#icon_prefix').val();  
// 		$.ajax({ 
// 		  url: "/sitios?lugar="+distritoIngresado,
// 		  type: "GET",
// 		  success: function(response) {
// 		  	console.log(response);
// 		  } 
// 		});
// }
$(document).ready(function(){
     // $("#btn").click(sigt);

    $(function() {
    var dateFormat = "mm/dd/yy",
		from = $("#from")
		.datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		changeYear: true,
		minDate: '10/10/2016',
		maxDate: '5/5/2020',
		numberOfMonths: 1
    })
    .on("change", function() {
       to.datepicker("option", "minDate", getDate(this));
    }),
	to = $("#to").datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		changeYear: true,
		minDate: '10/10/2016',
		maxDate: '5/5/2020',
		numberOfMonths: 1
	})
	.on("change", function() {
		from.datepicker("option", "maxDate", getDate(this));
	});
	function getDate(element) {
	var date;
		try {
		date = $.datepicker.parseDate(dateFormat, element.value);
		} catch (error) {
		date = null;
		}
		return date;
		}
		$("#showTo").click(function() {
			$("#from").datepicker("show");
	   });
    });
	$( "#slider-range" ).slider({
		range: true,
		min: 0,
		max: 500,
		values: [ 75, 300 ],
		slide: function( event, ui ) {
		$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		}
	});
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
    var availableTags = [
      "Cercado de Lima",
      "Bellavista",
      "Carmen de la Legua",
      "La Perla",
      "La Punta",
      "Ventanilla",
      "Callao",
      "Ate",
      "Barranco",
      "Breña",
      "Comas",
      "Chorrillos",
      "El Agustino",
      "Jesús María",
      "La Molina",
      "La Victoria",
      "Lince",
      "Magdalena",
      "Miraflores",
      "Pueblo Libre",
      "Puente Piedra",
      "Rimac",
      "San Isidro",
      "Independencia",
      "San Juan de Miraflores",
      "San Luis",
      "San Martín de Porres",
      "San Miguel",
      "antiago de Surco",
      "Surquillo",
      "Villa María del Triunfo",
      "San Juan de Lurigancho",
      "Santa Rosa",
      "Los Olivos",
      "San Borja",
      "Villa el Salvador",
      "Santa Anita"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
});