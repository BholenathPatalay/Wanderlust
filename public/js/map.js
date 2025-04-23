// Get URL parameters (if needed for search)
const urlParams = new URLSearchParams(window.location.search);
maptilersdk.config.apiKey = mapToken;

// Initialize all maps on the page
document.addEventListener('DOMContentLoaded', function() {
  const mapContainers = document.querySelectorAll('[id^="map-"]');
  
  mapContainers.forEach(container => {
    const listingId = container.id.split('-')[1];
    const locationQuery = container.dataset.location || urlParams.get('q') || "Malibu, United States";
    
    initializeMapForListing(locationQuery, container.id);
  });
});

async function initializeMapForListing(locationQuery, containerId) {
  try {
    // First geocode the location
    const results = await maptilersdk.geocoding.forward(locationQuery, {
      limit: 1
    });

    let coordinates, zoomLevel;
    
    if (results.features.length > 0) {
      coordinates = results.features[0].geometry.coordinates;
      zoomLevel = 12; // Default zoom when we have coordinates
    } else {
      console.warn("No results found for:", locationQuery);
      // Fallback to default view (India)
      coordinates = [78.9629, 20.5937];
      zoomLevel = 12;
    }

    // Create the map already centered on the location (no fly animation)
    const map = new maptilersdk.Map({
      container: containerId,
      style: maptilersdk.MapStyle.STREETS,
      center: coordinates,
      zoom: zoomLevel,
    });

    // Add source and layer for search results (if you still want these)
    map.on('load', () => {
      map.addSource('search-results', {
        type: 'geojson',
        data: {
          "type": "FeatureCollection",
          "features": results.features
        }
      });

      map.addLayer({
        'id': 'point-result',
        'type': 'circle',
        'source': 'search-results',
        'paint': {
          'circle-radius': 50,
          'circle-color': '#B42222',
          'circle-opacity': 0.2
        },
        'filter': ['==', '$type', 'Point']
      });

      // Add a marker
      new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat(coordinates)
        .setPopup(new maptilersdk.Popup().setText(locationQuery))
        .addTo(map);
    });

  } catch (error) {
    console.error("Map initialization error:", error);
    // Basic fallback map
    new maptilersdk.Map({
      container: containerId,
      style: maptilersdk.MapStyle.STREETS,
      center: [-118.6775, 34.0374],
      zoom: 12,
    });
  }
}