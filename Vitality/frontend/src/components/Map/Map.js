import React, { Component } from 'react';
import { render } from 'react-dom';
import './Map.css'
import zip__90802 from './model/zip_90802.json';
import zip__90803 from './model/zip_90803.json';
import zip__90804 from './model/zip_90804.json';
import zip__90805 from './model/zip_90805.json';
import zip__90806 from './model/zip_90806.json';
import zip__90807 from './model/zip_90807.json';
import zip__90808 from './model/zip_90808.json';
import zip__90810 from './model/zip_90810.json';
import zip__90813 from './model/zip_90813.json';
import zip__90814 from './model/zip_90814.json';
import zip__90815 from './model/zip_90815.json';
import zip__90822 from './model/zip_90822.json';
import zip__90831 from './model/zip_90831.json';











var map = ''
var ctaLayer = ''

class Map extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  onScriptLoad() {
     map = new window.google.maps.Map(
      document.getElementById('map'),
      {
        center: { lat: 33.7971, lng: -118.1637 },
        zoom: 10,
        gestureHandling: 'greedy',
        disableDefualtUI: true,

      });
    ctaLayer = new google.maps.KmlLayer({
      url: 'https://sites.google.com/site/longbeachprojectqwer/kml/City_Of_Long_Beach_City_Boundary.kml',
      map: map
    });


    var lb_boundary = new google.maps.Data();
    var zip_90802 = new google.maps.Data();
    var zip_90803 = new google.maps.Data();
    var zip_90804 = new google.maps.Data();
    var zip_90805 = new google.maps.Data();
    var zip_90806 = new google.maps.Data();
    var zip_90807 = new google.maps.Data();
    var zip_90808 = new google.maps.Data();
    var zip_90810 = new google.maps.Data();
    var zip_90813 = new google.maps.Data();
    var zip_90814 = new google.maps.Data();
    var zip_90815 = new google.maps.Data();
    var zip_90822 = new google.maps.Data();
    var zip_90831 = new google.maps.Data();

    //  var lb_boundary = new google.maps.Data();

    //  lb_boundary.loadGeoJson('Long_Beach.json');

    zip_90802.addGeoJson(zip__90802);
    zip_90803.addGeoJson(zip__90803);
    zip_90804.addGeoJson(zip__90804);
    zip_90805.addGeoJson(zip__90805);
    zip_90806.addGeoJson(zip__90806);
    zip_90807.addGeoJson(zip__90807);
    zip_90808.addGeoJson(zip__90808);
    zip_90810.addGeoJson(zip__90810);
    zip_90813.addGeoJson(zip__90813);
    zip_90814.addGeoJson(zip__90814);
    zip_90815.addGeoJson(zip__90815);
    zip_90822.addGeoJson(zip__90822);
    zip_90831.addGeoJson(zip__90831);




    zip_90802.setStyle({
      strokeColor: 'black',
      strokeWeight: 2,
      fillColor: 'green'
    });
    zip_90803.setStyle({
      strokeColor: 'black',
      strokeWeight: 2
    });
    zip_90804.setStyle({
      strokeColor: 'black',
      strokeWeight: 2
    });
    zip_90805.setStyle({
      strokeColor: 'black',
      strokeWeight: 1,
      fillColor: 'yellow'
    });
    zip_90806.setStyle({
      strokeColor: 'black',
      strokeWeight: 2,
      fillColor: 'red'
    });
    zip_90807.setStyle({
      strokeColor: 'black',
      strokeWeight: 2,
      fillColor: 'dark blue'
    });
    zip_90808.setStyle({
      strokeColor: 'black',
      strokeWeight: 2,
      fillColor: 'orange'
    });
    zip_90810.setStyle({
      strokeColor: 'black',
      strokeWeight: 1,
      fillColor: 'blue'
    });
    zip_90813.setStyle({
      strokeColor: 'black',
      strokeWeight: 2,
      fillColor: 'black'
    });
    zip_90814.setStyle({
      strokeColor: 'black',
      strokeWeight: 2,
      fillColor: 'brown'
    });
    zip_90815.setStyle({
      strokeColor: 'black',
      strokeWeight: 2,
      fillColor: 'purple',
    });
    zip_90822.setStyle({
      strokeColor: 'black',
      strokeWeight: 2
    });
    zip_90831.setStyle({
      strokeColor: 'black',
      strokeWeight: 2
    });
    //  lb_boundary.setMap(map);
    zip_90802.setMap(map);
    zip_90803.setMap(map);
    zip_90804.setMap(map);
    zip_90805.setMap(map);
    zip_90806.setMap(map);
    zip_90807.setMap(map);
    zip_90808.setMap(map);
    zip_90810.setMap(map);
    zip_90813.setMap(map);
    zip_90814.setMap(map);
    zip_90815.setMap(map);
    zip_90822.setMap(map);
    zip_90831.setMap(map);

  }


  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=API_KEY`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return (
      <div id = 'mapContainer'>
      <div style={{ width: 900, height: 600 }} id="map"/>
      </div>
    );
  }
}

export default Map