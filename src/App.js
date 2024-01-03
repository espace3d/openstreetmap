import React from 'react';
import './style.css';
import 'leaflet/dist/leaflet.css';
import OpenStreetMap from './OpenStreetMap';

export default function App() {
  // Exemple de valeurs pour city et country
  const city = 'Wellin';
  const country = 'Belgique';

  return (
    <div>
      {/* Autres composants ou éléments JSX */}
      <OpenStreetMap city={city} country={country} />
      {/* Autres composants ou éléments JSX */}
    </div>
  );
}
