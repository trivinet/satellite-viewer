import React from 'react';
import ReactDOM from 'react-dom';
import './Map3d.css';
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'

const layer = new FeatureLayer({
  portalItem: {
    id: 'b234a118ab6b4c91908a1cf677941702',
  },
  outFields: ['NAME', 'STATE_NAME','VACANT','HSE_UNITS'],
  title: 'U.S. Countries',
  opacity: 0.8,
});

const view = new MapView ({
  container: 'map3d',
  map: new Map ({
    basemap: "topo-vector",
    layers: [layer]
  }),
  center: [-100.33,33.69],
  zoom: 1,
  ui: {
    components: ['attribution']
  }
});
export default function map3d() {
  return(
    <div id={'map3d'} />
  )
}
//ReactDOM.render()