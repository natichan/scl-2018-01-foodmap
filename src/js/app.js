// api key: AIzaSyCYQW0o0YMY9NDMjOI3ur2BPA60bLU08xM

let map;
let infowindow;

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
        //console.log(results[i].id);
        showInformationPlaces(results[i]);
      }
    }
  }

  function showInformationPlaces(place){
    /*  */
    const photo = place.photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200});
    
    const containerInfo = document.getElementById('showPhoto');
    containerInfo.innerHTML += `<img src='${photo}'></img>` 

    const name = place.name;
    const address = place.vicinity;
    const containerModal = document.getElementById('modalInfo');
    containerModal.innerHTML += `<h4>${name}</h4><p>${address}</p>` 
    // console.log(name);
    // console.log(radius);
    // console.log(photo);
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
 