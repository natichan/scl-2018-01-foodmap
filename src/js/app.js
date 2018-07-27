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
        console.log(results[i].id);
        showInformationPhoto(results[i]);

      }
    }
  }
  function showInformationPhoto(place){
    const photo = place.photos[0].getUrl({'maxHeight': 200});
    const containerInfo = document.getElementById('showPhoto');
    containerInfo.innerHTML += `<img src='${photo}'></img>`
    // console.log(photo);
    showModal(place)
}
  function showModal(mod){
    const name = mod.name;
    const address = mod.vicinity;
    const containerModal = document.getElementById('modalInfo');
    containerModal.innerHTML = `<h2>${name}</h2><p>${address}</p>` 
    // console.log(name);
    // console.log(address);
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
    var input = document.getElementById('searchInput');
    var searchBox = new google.maps.places.SearchBox(input);

    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // escucha el evento que gatilla el usuario al seleccionar la predicción, resive los detalles de ese lugar
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }
      // Limpiar los marcadores anteriores
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // Por cada lugar, obtener el incono, nombre y lugar
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        var icon = {
          url: place.icon, // icono cuchillo y tenedor
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(50, 50)
        };
        // creo un nuevo marcador por búsqueda 
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
 }
