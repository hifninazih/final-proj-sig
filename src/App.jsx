import React, { useState } from "react";
import { MapContainer, TileLayer, LayersControl, GeoJSON } from "react-leaflet";
import "./App.css";
import "./reset.css";
import { Icon } from "leaflet";
import * as batasDKI from "./fitur/Batas_DKI_GeoJSON.json";
import * as banjir from "./fitur/banjirjakartaGeoJSON.json";

export default function App() {
  const center = [-6.142602896107601, 106.83071136474611];

  const batasDKIStyle = {
    fillColor: "red",
    color: "blue",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.2,
  };

  const banjirStyle = {
    fillColor: "yellow",
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };

  const onEachCity = (city, layer) => {
    const cityName = city.properties.name;

    layer.bindPopup(cityName);

    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          fillColor: "blue",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.2,
        });
      },
      click: (e) => {
        e.target.setStyle({
          fillColor: "blue",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.5,
        });
      },
      mouseout: (e) => {
        e.target.setStyle(batasDKIStyle);
        layer.closePopup();
      },
    });
  };

  return (
    <MapContainer center={center} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LayersControl position="topright">
        <LayersControl.Overlay checked name="Jakarta">
          <GeoJSON
            data={batasDKI}
            style={batasDKIStyle}
            onEachFeature={onEachCity}
          ></GeoJSON>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Banjir Jakarta">
          <GeoJSON data={banjir} style={banjirStyle}></GeoJSON>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}
