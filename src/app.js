/* // api key: AIzaSyCYQW0o0YMY9NDMjOI3ur2BPA60bLU08xM
var map;
var infowindow;

navigator.geolocation.getCurrentPosition(initMap);

function initMap(position) {
    
    var lat = position.coords.latitude;
    var lng = position.coords.longitude
    var pos = {lat, lng};
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat, lng},
    zoom: 13
  });
  
    // Load the stores GeoJSON onto the map.
    map.data.loadGeoJson('places.json');

    const infoWindow = new google.maps.InfoWindow();

    // Show the information for a store when its marker is clicked.
    map.data.addListener('click', event => {

      let name = event.feature.getProperty('name');
      let description = event.feature.getProperty('description');
      let hours = event.feature.getProperty('hours');
      let phone = event.feature.getProperty('phone');
      let position = event.feature.getGeometry().get();
      let content = `
        <h2>${name}</h2><p>${description}</p>
        <p><b>Open:</b> ${hours}<br/><b>Phone:</b> ${phone}</p>
      `
      infoWindow.setContent(content);
      infoWindow.setPosition(position);
      infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
      infoWindow.open(map);
    });
}
 */

 // api key: AIzaSyCYQW0o0YMY9NDMjOI3ur2BPA60bLU08xM

var map;
var infowindow;

navigator.geolocation.getCurrentPosition(initMap);

function initMap(position) {
    
    var lat = position.coords.latitude;
    var lng = position.coords.longitude
    var pos = {lat, lng};
    map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 16
  });
  
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pos,
      radius: 500,
      type: ['restaurant']
    }, callback);
  

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        console.log(results);
        
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

}