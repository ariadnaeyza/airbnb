var cargarPagina = function() {
  autocompletar();
  initMap();
  $("#btn").click(buscar);
  $(".btn-filtros").click(aparece);
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
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ "address": busqueda} , ubicacion);
};

var ubicacion = function(result, status) {
    if (status){
      var posMapa = {
          center: result[0].geometry.location,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      console.log(result);
      var mapa = new google.maps.Map(document.getElementById("mapa"), posMapa);
      mapa.fitBounds(result[0].geometry.viewport);

      var markerOption = { position: result[0].geometry.location }
      var marker = new google.maps.Marker(markerOption);
      marker.setMap(mapa);
    }
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var icons = {
          parking: {
            icon: iconBase + 'parking_lot_maps.png'
          },
          library: {
            icon: iconBase + 'library_maps.png'
          },
          info: {
            icon: iconBase + 'info-i_maps.png'
          }
};
//marker
function addMarker(feature) {
  var marker = new google.maps.Marker({
    position: feature.position,
    icon: icons[feature.type].icon,
    map: map
  });
}
var features = [
    {
      position: new google.maps.LatLng(-12.118974, -77035439),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-12.117575, -77.038598),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91747, 151.22912),
      type: 'info'
    }, 
];

for (var i = 0, feature; feature = features[i]; i++) {
  addMarker(feature);
}
}

//marker
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
var aparece=function(){
  $(".contenedorDesaparece").removeClass("none");
}
