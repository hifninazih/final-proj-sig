import React, { useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  GeoJSON,
  Marker,
  Pane,
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

import * as birumarker from "./assets/icon-marker/biru.png";

export default function App() {
  const center = [-6.221551441519991, 106.832041015625];

  var LeafIcon = L.Icon.extend({
    options: {
      iconSize: [95, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76],
    },
  });

  var redIcon = new LeafIcon({
    iconUrl: "http://leafletjs.com/examples/custom-icons/leaf-red.png",
    shadowUrl: "http://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  });

  var greenIcon = new LeafIcon({
    iconUrl: "http://leafletjs.com/examples/custom-icons/leaf-green.png",
    shadowUrl: "http://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  });

  var orangeIcon = new LeafIcon({
    // iconUrl: "http://leafletjs.com/examples/custom-icons/leaf-orange.png",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Map_marker.svg",
    // shadowUrl: "http://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  });

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

        <LayersControl.Overlay checked name="Area Rawan Banjir">
          <Pane name="Area Rawan Banjir" style={{ zIndex: 203 }}>
            <GeoJSON data={clip} style={banjirStyle}></GeoJSON>
          </Pane>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Jakarta Utara">
          <Pane name="Jakarta Utara" style={{ zIndex: 202 }}>
            <GeoJSON
              data={jakut}
              style={batasKecStyle}
              onEachFeature={onEachKec}
            ></GeoJSON>
          </Pane>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="DKI Jakarta">
          <Pane name="DKI Jakarta" style={{ zIndex: 201 }}>
            <GeoJSON
              data={batasDKI}
              style={batasDKIStyle}
              onEachFeature={onEachCity}
            ></GeoJSON>
          </Pane>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Pemerintahan">
          <Pane name="Pemerintahan" style={{ zIndex: 601 }}>
            <GeoJSON
              data={pemerintahan}
              onEachFeature={onEachPoint}
              pointToLayer={(point, latlng) => {
                return L.marker(latlng, {
                  icon: orangeIcon,
                });
              }}
              style={{ color: "green" }}
            ></GeoJSON>
          </Pane>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Pendidikan">
          <Pane name="Pendidikan" style={{ zIndex: 601 }}>
            <GeoJSON
              data={pendidikan}
              onEachFeature={onEachPoint}
              pointToLayer={(point, latlng) => {
                return L.marker(latlng, {
                  icon: greenIcon,
                });
              }}
              style={{ color: "blue" }}
            ></GeoJSON>
          </Pane>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Rumah Sakit">
          <Pane name="Rumah Sakit" style={{ zIndex: 601 }}>
            <GeoJSON
              data={rumahsakit}
              onEachFeature={onEachPoint}
              pointToLayer={(point, latlng) => {
                return L.marker(latlng, {
                  icon: redIcon,
                });
              }}
              style={{ color: "red" }}
            ></GeoJSON>
          </Pane>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}
