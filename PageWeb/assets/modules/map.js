import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default class Map {

  static init () {
    let map = document.querySelector('#map')
    if (map === null) {
      return
    }
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFyaWV0bm0iLCJhIjoiY2wydTQxcTJrMGFyYTNubzJxbHk1aGFvNCJ9.nqt3Bpe0SCpn8ymoswJQBg';
    const addr = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [map.dataset.lng, map.dataset.lat],
    zoom: 9
    });
     
    // Load custom data to supplement the search results.
    const customData = {
    'features': [
    {
    'type': 'Feature',
    'properties': {
    'title': 'Lincoln Park is special'
    },
    'geometry': {
    'coordinates': [-87.637596, 41.940403],
    'type': 'Point'
    }
    },
    {
    'type': 'Feature',
    'properties': {
    'title': 'Burnham Park is special'
    },
    'geometry': {
    'coordinates': [-87.603735, 41.829985],
    'type': 'Point'
    }
    },
    {
    'type': 'Feature',
    'properties': {
    'title': 'Millennium Park is special'
    },
    'geometry': {
    'coordinates': [-87.622554, 41.882534],
    'type': 'Point'
    }
    }
    ],
    'type': 'FeatureCollection'
    };
     
    function forwardGeocoder(query) {
    const matchingFeatures = [];
    for (const feature of customData.features) {
    // Handle queries with different capitalization
    // than the source data by calling toLowerCase().
    if (
    feature.properties.title
    .toLowerCase()
    .includes(query.toLowerCase())
    ) {
    // Add a tree emoji as a prefix for custom
    // data results using carmen geojson format:
    // https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
    feature['place_name'] = `🌲 ${feature.properties.title}`;
    feature['center'] = feature.geometry.coordinates;
    feature['place_type'] = ['park'];
    matchingFeatures.push(feature);
    }
    }
    return matchingFeatures;
    }
     
    // Add the control to the map.
    map.addControl(
    new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    localGeocoder: forwardGeocoder,
    zoom: 14,
    placeholder: "Entrer l'adresse",
    mapboxgl: mapboxgl
    })
    );
  }
}