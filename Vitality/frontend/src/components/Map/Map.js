import React, { Component } from 'react';
import { compose, withProps } from "recompose"

const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  KmlLayer,
} = require("react-google-maps");
const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=API_HERE",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `86%` }} />,
  }),
  withScriptjs,
  withGoogleMap
) (props =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat:33.7971,lng:-118.1637 }}
  >
    <KmlLayer
      url={"https://sites.google.com/site/longbeachprojectqwer/kml/City_Of_Long_Beach_City_Boundary.kml"}
      options={{ preserveViewport: true }}
    />
  </GoogleMap>
);
function generateRandom() {
  return Math.random() * 10000000000000000
}
export default Map
