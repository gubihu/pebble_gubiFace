function locationSuccess(pos) {
  // We will request the weather here
  var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
	pos.coords.latitude + '&lon=' + pos.coords.longitude;
    console.log(url);
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
  }                     
);

