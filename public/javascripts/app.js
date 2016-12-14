var cargarPagina = function(){
  calendario();
};

$(document).ready(cargarPagina);
     // $("#btn").click(sigt);

var directionsService = new google.maps.DirectionsService();
var directionsRenderer = new google.maps.DirectionsRenderer();
var map=$("#mapa");
var marker;
var lat;
var long;

var calendario = function() {
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
  };

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

var mostrarMapa =function(){
 
    var input = $("#buscador1");
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', function() {
        directionsRenderer.setMap(null);
        
        if (marker != null) {
            marker.setMap(null);    
        }
        
        marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
        });
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }
        marker.setIcon(({
          url: '../img/map-pin-blue.png'
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { "address": $input.val()}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                lat = results[0].geometry.location.lat();
                long = results[0].geometry.location.lng();
            } 
        });

    });
};
google.maps.event.addDomListener(window, 'load', mostrarMapa);