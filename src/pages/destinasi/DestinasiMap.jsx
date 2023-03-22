import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useLocation } from "react-router-dom";
import RoutingMachine from "../../components/destinasi/RoutingMachine";
delete L.Icon.Default.prototype._getIconUrl;

const DestinasiMap = (props) => {
  const { lat, lng, lokasi, nama } = useLocation().state;
  console.log({ lat });
  console.log({ lng });
  console.log({ lokasi });
  console.log({ nama });
  return (
    <div className="">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "1000px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} draggable={false}>
          <Popup>{lokasi}</Popup>
        </Marker>
        <RoutingMachine lat={lat} lng={lng} />
      </MapContainer>
    </div>
  );
};

export default DestinasiMap;
