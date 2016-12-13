var sigt = function(e){
	e.preventDefault();
	var distritoIngresado = $('#icon_prefix').val();  
		$.ajax({ 
		  url: "/sitios?lugar="+distritoIngresado,
		  type: "GET",
		  success: function(response) {
		  	console.log(response);
		  } 
		});
}
$(document).ready(function(){
     $("#btn").click(sigt);

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