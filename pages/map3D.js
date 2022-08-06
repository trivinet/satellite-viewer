import React from "react";
import { useMap, useGraphics,useWebScene,useScene } from "esri-loader-hooks";

const latitude=50.321;
const longitude=27.321;

// hooks allow us to create a map component as a function
export default function PointMap() {
  const geometry = {
    type: "point", // autocasts as new Point()
    latitude,
    longitude
  };
  var symbol = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: [226, 119, 40],
  };
  const map = {
    basemap: "dark-gray-vector",
    ground: "world-elevation"
  };
  const options = {
    view: {
      center: [longitude, latitude],
      zoom: 1
    }
  };
  const [ref] = useScene(map, options);
  // takes a view instance and graphic as a POJO
  // the point will be replaced if the lat/lng props change
  /* useGraphics(options.view, { geometry, symbol} ); */
  return <div style={{ height: 400 }} ref={ref} />;
}