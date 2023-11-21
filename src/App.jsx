import React, { useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  GeoJSON,
  Marker,
} from "react-leaflet";
import "./App.css";
import "./reset.css";
import { Icon } from "leaflet";
import * as batasDKI from "./fitur/Batas_DKI_GeoJSON.json";
import * as clip from "./fitur/ClipJakutGeoJSON.json";
import * as jakut from "./fitur/JakartaUtaraGeoJSON.json";

import * as pendidikan from "./fitur/PendidikanGeoJSON.json";
import * as pemerintahan from "./fitur/PemerintahanGeoJSON.json";
import * as rumahsakit from "./fitur/RumahSakitGeoJSON.json";

export default function App() {
  const center = [-6.221551441519991, 106.832041015625];

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

  const batasKecStyle = {
    fillColor: "grey",
    color: "blue",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.4,
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
        console.log(e);
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
          fillOpacity: 0.1,
        });
      },
      click: (e) => {
        e.target.setStyle({
          fillColor: "blue",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.3,
        });
      },
      mouseout: (e) => {
        e.target.setStyle(batasKecStyle);
        layer.closePopup();
      },
    });
  };

  const onEachPoint = (point, layer) => {
    layer.bindPopup(`${point.properties.NAMOBJ}`);
  };
  return (
    <MapContainer center={center} zoom={12} scrollWheelZoom={true}>
      <LayersControl position="topright">
        <LayersControl.Overlay checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Area Rawan Banjir">
          <GeoJSON data={clip} style={banjirStyle}></GeoJSON>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Jakarta Utara">
          <GeoJSON
            data={jakut}
            style={batasKecStyle}
            onEachFeature={onEachKec}
          ></GeoJSON>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="DKI Jakarta">
          <GeoJSON
            data={batasDKI}
            style={batasDKIStyle}
            onEachFeature={onEachCity}
          ></GeoJSON>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Pemerintahan">
          <GeoJSON
            data={pemerintahan}
            onEachFeature={onEachPoint}
            pointToLayer={(point, latlng) => {
              return L.circleMarker(latlng, {
                radius: 5,
              });
            }}
            style={{ color: "green" }}
          ></GeoJSON>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Pendidikan">
          <GeoJSON
            data={pendidikan}
            onEachFeature={onEachPoint}
            pointToLayer={(point, latlng) => {
              return L.circleMarker(latlng, {
                radius: 5,
              });
            }}
            style={{ color: "blue" }}
          ></GeoJSON>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Rumah Sakit">
          <GeoJSON
            data={rumahsakit}
            onEachFeature={onEachPoint}
            pointToLayer={(point, latlng) => {
              return L.circleMarker(latlng, {
                radius: 5,
              });
            }}
            style={{ color: "red" }}
          ></GeoJSON>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}
