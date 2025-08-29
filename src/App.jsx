import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";

// Fix default Leaflet icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function App() {
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    )
      .then((res) => res.json())
      .then((data) => setEarthquakes(data.features))
      .catch(console.error);
  }, []);

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {earthquakes.map((quake) => {
        const [lon, lat] = quake.geometry.coordinates;
        const mag = quake.properties.mag;
        const place = quake.properties.place;

        return (
          <Marker key={quake.id} position={[lat, lon]}>
            <Popup>
              <strong>{place}</strong>
              <br />
              Magnitude: {mag}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

