var template= "<div>{{titulo}}</div>"
var templateDivs= "";

var cargarPagina = function() {
  autocompletar();
  initMap();
  $("#btn").click(buscar);
  $(".btn-filtros").click(aparece);
};

var map = document.getElementById("mapa");
var marcadoresMiraflores = [{
    latitud: "-12.120104",
    longitud: "-77.039648",
    info: "Precio: S/. 420"},
    {latitud: "-12.124605",
    longitud: "-77.037252",
    info: "Precio: S/. 684"},
    {latitud: "-12.121693",
    longitud: "-77.040173",
    info: "Precio: S/. 780"},
    {latitud: "-12.118948",
    longitud: "-77.038886",
    info: "Precio: S/. 352"},
    {latitud: "-12.120089",
    longitud: "-77.035264",
    info: "Precio: S/. 458"},
    {latitud: "-12.122268",
    longitud: "-77.031666",
    info: "Precio: S/. 75"},
    {latitud: "-12.123285",
    longitud: "-77.036507",
    info: "Precio: S/. 136"},
    {latitud: "-12.125845",
    longitud: "-77.031988",
    info: "Precio: S/. 72"},
    {latitud: "-12.117575",
    longitud: "-77.038598",
    info: "Precio: S/. 58"},
    {latitud: "-12.117389",
    longitud: "-77.034754",
    info: "Precio: S/. 51"},
    {latitud: "-12.118955",
    longitud: "-77.036570",
    info: "Precio: S/. 34"},
    {latitud: "-12.118974",
    longitud: "-77035439",
    info: "Precio: S/. 37"},
    {latitud: "-12.119006",
    longitud: "-77.029915",
    info: "Precio: S/. 51"},
    {latitud: "-12.116908",
    longitud: "-77.035772",
    info: "Precio: S/. 34"},
    {latitud: "-12.123112",
    longitud: "-77.027956",
    info: "Precio: S/. 51"}];

var marcadoresSanIsidro =  [{
    latitud: "-12.092573",
    longitud: "-77.033317",
    info: "Precio: S/. 133"},
    {latitud: "-12.097392",
    longitud: "-77.036292",
    info: "Precio: S/. 129"},
    {latitud: "-12.095250",
    longitud: "-77.040694",
    info: "Precio: S/. 109"},
    {latitud: "-12.091410",
    longitud: "-77.052284",
    info: "Precio: S/. 204"},
    {latitud: "-12.094786",
    longitud: "-77.037064",
    info: "Precio: S/. 1363"},
    {latitud: "-12.095803",
    longitud: "-77.040176",
    info: "Precio: S/. 92"},
    {latitud: "-12.096041",
    longitud: "-77.034998",
    info: "Precio: S/. 55"},
    {latitud: "-12.93366",
    longitud: "-77.033571",
    info: "Precio: S/. 65"},
    {latitud: "-12.095380",
    longitud: "-77.033742",
    info: "Precio: S/. 65"},
    {latitud: "-12.097027",
    longitud: "-77.032433",
    info: "Precio: S/. 211"},
    {latitud: "-12.096797",
    longitud: "-77.034708",
    info: "Precio: S/. 51"},
    {latitud: "-12.094426",
    longitud: "-77.029762",
    info: "Precio: S/. 170"},
    {latitud: "-12.095768",
    longitud: "-77.031232",
    info: "Precio: S/. 37"},
    {latitud: "-12.098097",
    longitud: "-77.030406",
    info: "Precio: S/. 37"},
    {latitud: "-12.096985",
    longitud: "-77.029472",
    info: "Precio: S/. 119"}];

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

    addMarkers();
    if(busqueda.trim().length > 0){
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

var aparece = function() {
    $(".contenedorDesaparece").removeClass("none");
};

var addMarker = function(position, map) {
    /*var infowindow = new google.maps.InfoWindow();*/
    var markerOption = { position: position };
    var marker = new google.maps.Marker(markerOption);
    marker.setMap(map);
};

var addMarkers = function() {
    if ($("#tags").val() === "Miraflores") {
      for (var i = 0; i < marcadoresMiraflores.length; i++) {
          var location = new google.maps.LatLng(marcadoresMiraflores[i].latitud, marcadoresMiraflores[i].longitud);
          addMarker(location, map);
      }
    } else if ($("#tags").val() === "San Isidro") {
      for (var i = 0; i < marcadoresSanIsidro.length; i++) {
          var location = new google.maps.LatLng(marcadoresSanIsidro[i].latitud, marcadoresSanIsidro[i].longitud);
          addMarker(location, map);
      }
    }
};