var template= "<div>{{titulo}}</div>"
var templateDivs= "";

var cargarPagina = function() {
  autocompletar();
  initMap();
  $("#btn").click(buscar);
};

var map = document.getElementById("mapa");

$(document).ready(cargarPagina);

var initMap = function() {
    var myLatlng = new google.maps.LatLng(-12.046374, -77.0427934);
    var myOptions = {
        zoom: 12,
        center: myLatlng,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(map, myOptions);
};

var buscar = function(e) {
    e.preventDefault();
    var busqueda = $("#tags").val();

    if(busqueda.trim().length > 0){
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ "address": busqueda} , ubicacion);
      if(busqueda === "Miraflores"){
        templateDivs= ""; 
        $.get("/demo.json", function(response){
          $.each(response.miraflores, function(indice, response){
            if( indice == 0){
              loop(template, response.CasaEntera);
            } else if(indice == 1){
              loop(template, response.HabitacionPrivada);
            } else{
              loop(template, response.HabitacionCompartida);
            }
          });
          $("#contenedor-depas").html(templateDivs);
        });
      } else if(busqueda === "San Isidro"){
        templateDivs= "";        
        $.get("/demo.json", function(response){
          $.each(response.SanIsidro, function(indice, response){
            if( indice == 0){
              loop(template, response.CasaEntera);
            } else if(indice == 1){
              loop(template, response.HabitacionPrivada);
            } else{
              loop(template, response.HabitacionCompartida);
            }
          });
          $("#contenedor-depas").html(templateDivs);
        });
      } else{
        $("#contenedor-depas").html("<h2> No se encontraron Resultados </h2>");
      }
    }
};

var loop = function(c,d){
  for(var i = 0; i < 5; i ++){
    templateDivs += c.replace("{{titulo}}", d[i].Descripción.titulo);
  }
};

var ubicacion = function(result, status) {
    if (status){
      var posMapa = {
          center: result[0].geometry.location,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      var mapa = new google.maps.Map(document.getElementById("mapa"), posMapa);
      mapa.fitBounds(result[0].geometry.viewport);

      var markerOption = { position: result[0].geometry.location }
      var marker = new google.maps.Marker(markerOption);
      marker.setMap(mapa);
    }
};

var autocompletar = function() {
     
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
};