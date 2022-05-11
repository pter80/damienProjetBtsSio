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
    zoom: 13
    });
     
    
    // Load custom data to supplement the search results.
    const customData = {
    'features': [
    {
    'type': 'Feature',
    'properties': {
    'title': 'map'
    },
    'geometry': {
    'coordinates': [map.dataset.lng, map.dataset.lat],
    'type': 'Point'
    }
    },
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
    feature['center'] = feature.geometry.coordinates;
    feature['place_type'] = ['park'];
    matchingFeatures.push(feature);
    }
    }
    return matchingFeatures;
    }
     
    // Add the control to the map.
    addr.addControl(
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