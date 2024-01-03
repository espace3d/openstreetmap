import React, { useState, useEffect, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function OpenStreetMap({ city, country }) {
  const [position, setPosition] = useState([50.8499, 4.38]); // Default to Liège, Belgium
  const [mapKey, setMapKey] = useState(0);

  async function fetchData(city, country) {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${city},${country}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.length > 0) {
        const latitude = parseFloat(data[0].lat);
        const longitude = parseFloat(data[0].lon);
        updatePosition(latitude, longitude);
        console.log(
          `Coordonnées de ${city}, ${country}: Latitude ${latitude}, Longitude ${longitude}`
        );
      } else {
        console.error('Aucun résultat trouvé pour la géocodage.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête HTTP:', error);
    }
  }

  // Function to update the position
  function updatePosition(latitude, longitude) {
    setPosition([latitude, longitude]);
    // Update the map key to force a re-render
    setMapKey((prevKey) => prevKey + 1);
  }

  // Function to handle marker drag end
  function handleMarkerDragEnd(event) {
    const { lat, lng } = event.target.getLatLng();
    updatePosition(lat, lng);
  }

  useEffect(() => {
    // Call the function to fetch coordinates
    fetchData(city, country);
  }, [city, country]);

  // Use useMemo to create a new key only when mapKey changes
  const memoizedKey = useMemo(() => mapKey, [mapKey]);

  // Create a custom icon
  const customIcon = new L.Icon({
    iconUrl: '/icons/icon.svg', // Replace with the path to your custom icon
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <MapContainer
      key={memoizedKey}
      center={position}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={position}
        icon={customIcon}
        draggable={true}
        eventHandlers={{ dragend: handleMarkerDragEnd }}
      >
        <Popup>Un marqueur sur la carte.</Popup>
      </Marker>
    </MapContainer>
  );
}
