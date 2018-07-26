// api key: AIzaSyCYQW0o0YMY9NDMjOI3ur2BPA60bLU08xM
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
  
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pos,
      radius: 5000,
      type: ['restaurant']
    }, callback);
  

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
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