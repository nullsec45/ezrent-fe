'use client';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useState, useEffect } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';

function LocationMarker({ position, setPosition }) {
  const [isLocated, setIsLocated] = useState(false);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
    dragstart() {
      setIsLocated(true);
      if (!isLocated) return map.locate();
    },
    locationerror() {
      alert('Silahkan ijinkan lokasi untuk menggunakan lokasi saat ini');
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const customIcon = new Icon({
    iconUrl: '/locationMarker.png',
    iconSize: [60, 60],
  });

  if (!position) return null;

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default function Map({ position, setPosition, latitude }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) return <div>Loading</div>;

  return (
    <div>
      <MapContainer
        center={latitude ? [Number(latitude)] : [-6.2, 106.816666]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-96 block"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={20}
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
    </div>
  );
}
