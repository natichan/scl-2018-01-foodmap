// api key: AIzaSyCYQW0o0YMY9NDMjOI3ur2BPA60bLU08xM

let map;
let infowindow;

navigator.geolocation.getCurrentPosition(initMap);

function initMap(position) {
    
    const lat = position.coords.latitude;
    const lng = position.coords.longitude
    const pos = {lat, lng};
    map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 16
  });
       
    infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pos,
      radius: 500,
      type: ['restaurant']
    }, callback);
  
    function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
        console.log(results[i]);
        showInformationPhoto(results[i]);

      }
    }
  }
  function showInformationPhoto(place){
    const photo = place.photos[0].getUrl({'maxHeight': 200});
    const containerInfo = document.getElementById('showPhoto');
    containerInfo.innerHTML += `<img class='col s6 center' src='${photo}'></img>`
    // console.log(photo);
    showModal(place)
}
  function showModal(mod){
    const name = mod.name;
    const address = mod.vicinity;
    const rating = mod.rating;

    const containerModal = document.getElementById('modalInfo');
    containerModal.innerHTML = `<h2>${name}</h2><p>Dirección ${address}</p><p>Rating ${rating}</p>` 
    // console.log(name);
    // console.log(address);
  }

  const iconMap = {
    url: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
    scaledSize: new google.maps.Size(30, 30)
  }
  
  function createMarker(place) {
    const placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
      map: map,
      icon: iconMap,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }
    let input = document.getElementById('searchInput');
    let searchBox = new google.maps.places.SearchBox(input);

    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];
    // escucha el evento que gatilla el usuario al seleccionar la predicción, resive los detalles de ese lugar
    searchBox.addListener('places_changed', function() {
      let places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }
      // Limpiar los marcadores anteriores
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // Por cada lugar, obtener el incono, nombre y lugar
      let bounds = new google.maps.LatLngBounds(); 
      places.forEach(function(place) {
        let icon = {
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
