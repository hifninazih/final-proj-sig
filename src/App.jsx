import React, { useState } from "react";
import { MapContainer, TileLayer, LayersControl, GeoJSON } from "react-leaflet";
import "./App.css";
import "./reset.css";
import { Icon } from "leaflet";
import * as batasDKI from "./fitur/Batas_DKI_GeoJSON.json";
import * as banjir from "./fitur/banjirjakartaGeoJSON.json";
import * as clip from "./fitur/ClipJakutGeoJSON.json";
import * as jakut from "./fitur/JakartaUtaraGeoJSON.json";

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
    const cityName = city.properties.WADMKK;

    layer.bindPopup(`${cityName}`);

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

  const onEachKec = (kec, layer) => {
    const kecName = kec.properties.WADMKC;
    const cityName = kec.properties.WADMKK;
    layer.bindPopup(`Kecamatan : ${kecName}<br>Kota : ${cityName}`);
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
        <LayersControl.Overlay name="Area Rawan Banjir">
          <GeoJSON data={clip} zIndex={2} style={banjirStyle}></GeoJSON>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Jakarta Utara">
          <GeoJSON
            data={jakut}
            zIndex={1}
            style={batasDKIStyle}
            onEachFeature={onEachKec}
          ></GeoJSON>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="DKI Jakarta">
          <GeoJSON
            data={batasDKI}
            zIndex={0}
            style={batasDKIStyle}
            onEachFeature={onEachCity}
          ></GeoJSON>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}
