var output = document.getElementById("data");

function toggleTemp(){
	var x = document.getElementById("temp1");
	var t = document.getElementById("temp2");
	if(t.style.display == "none"){
		t.style.display = "block";
		x.style.display = "none";
	} else {
        t.style.display = "none";
		x.style.display = "block";
    }
}
if(navigator.geolocation){
	navigator.geolocation.getCurrentPosition(success, error);
} else{
	output.innerHTML = "<p>Geolocation is not supported for this browser.</p>";
}
function success(position){
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;

	$.getJSON("http://api.wunderground.com/api/2df36d017d547aed/forecast/geolookup/conditions/q/" + lat + "," + lon + ".json", function(json){
		var location = json['location']['city'] + ", " + json['location']['state'];
		var icon = json['current_observation']['icon_url'];
		var condition = json['current_observation']['weather'];
		var tempF = json['current_observation']['temp_f'] + " &deg; F"; //temp_f
		var tempC = json['current_observation']['temp_c'] + " &deg; C";
		
		$('#location').html(location);
		$('#icon').attr('src', icon);
		$('#condition').html(condition);
		$('#temp1').html(tempF);
		$('#temp2').html(tempC);
		
	});
}
function error(){
	output.innerHTML = "<p>Unable to retrieve your location</p>";
}