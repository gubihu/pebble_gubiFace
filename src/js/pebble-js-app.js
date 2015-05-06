
function locationSuccess(pos) {
  // We will request the weather here
  var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
	pos.coords.latitude + '&lon=' + pos.coords.longitude;
    console.log(url);
  var lat_int = parseInt(pos.coords.latitude);
  var lon_int = parseInt(pos.coords.longitude);
  var lat_frac = parseInt(Math.abs(pos.coords.latitude-lat_int+0.0005)*1000);
  var lon_frac = parseInt(Math.abs(pos.coords.longitude-lon_int+0.0005)*1000);

	// Assemble dictionary using our keys
	var dictionary = {
		'KEY_LAT_INT': lat_int,
		'KEY_LON_INT': lon_int,
		'KEY_LAT_FRAC': lat_frac,
		'KEY_LON_FRAC': lon_frac,
	};

	// Send to Pebble
	Pebble.sendAppMessage(dictionary,
        function(e) {
			console.log('Weather info sent to Pebble successfully!');
		},
		function(e) {
			console.log('Error sending weather info to Pebble!');
		}
	);

}

function locationError(err) {
  console.log('Error requesting location!');
}

function getWeather() {
  navigator.geolocation.getCurrentPosition(
    locationSuccess,
    locationError,
    {timeout: 15000, maximumAge: 60000}
  );
}

// Listen for when the watchface is opened
Pebble.addEventListener('ready', 
  function(e) {
    console.log('PebbleKit JS ready!');

    // Get the initial weather
    getWeather();
  }
);

// Listen for when the watchface is opened
//Pebble.addEventListener('ready', 
//  function(e) {
//    console.log('PebbleKit JS ready!');
//  }
//);

// Listen for when an AppMessage is received
Pebble.addEventListener('appmessage',
  function(e) {
    console.log('AppMessage received!');
	  getWeather();
  }                     
);

