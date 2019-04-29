import React, { Component } from "react";
import { render } from "react-dom";
import "./Map.css";
import zip__90802 from "./model/zip_90802.json";
import zip__90803 from "./model/zip_90803.json";
import zip__90804 from "./model/zip_90804.json";
import zip__90805 from "./model/zip_90805.json";
import zip__90806 from "./model/zip_90806.json";
import zip__90807 from "./model/zip_90807.json";
import zip__90808 from "./model/zip_90808.json";
import zip__90810 from "./model/zip_90810.json";
import zip__90813 from "./model/zip_90813.json";
import zip__90814 from "./model/zip_90814.json";
import zip__90815 from "./model/zip_90815.json";
import zip__90822 from "./model/zip_90822.json";
import zip__90831 from "./model/zip_90831.json";
import CardDrawer from "@/components/Drawer/CardDrawer";
import Button from "antd/es/button";
import PageHeaderWrapper from "@/pages/Dashboard/AdvancedProfile";
import { queryBusinessList } from "@/services/api";

var map = "";
var ctaLayer = "";

class Map extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this);
    this.drawer = React.createRef();
    var self = this;
  }

  onZip(zip) {
    console.log(zip);
    this.drawer.current.showDrawer();
  }

  onMe = zipC => {};

  generate_marker(lat, lon) {}

  addMarker(props) {
    console.log(props);

    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      icon: props.markerImage
      //icon: "http://maps.google.com/mapfiles/ms/micons/yellow.png"
    });
  }

  determine_marker_color(score) {
    var marker_color = "";
    if (score == 1 || score == 2 || score == 3 || score == 4) {
      marker_color = "http://maps.google.com/mapfiles/ms/micons/red.png";
    } else if (score == 5 || score == 6 || score == 7) {
      marker_color = "http://maps.google.com/mapfiles/ms/micons/yellow.png";
    } else {
      marker_color = "http://maps.google.com/mapfiles/ms/micons/green.png";
    }
    //console.log(score);
    //var color_url = "http://maps.google.com/mapfiles/ms/micons/red.png"

    return marker_color;
  }

  set_markers(zip) {
    var config = {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    };
    //http://localhost:8000/api/buinesslist/?zipcode={zipcode}&startindex={startindex}&endindex={endindex}
    //returns a list of businesses of zipcode randomly of that zipcode
    var url =
      "http://localhost:8000/api/businesslist/?zipcode=" +
      zip +
      "&startindex=0&endindex=10";
    jQuery
      .get(url, config)
      .then(res => {
        console.log(res[0].business.google.latitude);
        console.log(res[0].business.google.longtitude);
        for (var i = 0; i < 10; i++) {
          //  console.log(i);
          //  console.log(res[i].business.google.latitude);
          //  console.log(res[i].business.google.longtitude);
          //this.determine_marker_color(res[i].score);
          //console.log(score);
          this.addMarker({
            coords: {
              lat: parseFloat(res[i].business.google.latitude),
              lng: parseFloat(res[i].business.google.longtitude)
            },
            markerImage: this.determine_marker_color(res[i].score)
          });

          //generate_marker(res[i].business.google.latitude, res[i].business.google.longtitude);
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  onScriptLoad() {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 33.7971, lng: -118.1637 },
      zoom: 10,
      gestureHandling: "greedy",
      disableDefualtUI: true
    });
    ctaLayer = new google.maps.KmlLayer({
      url:
        "https://sites.google.com/site/longbeachprojectqwer/kml/City_Of_Long_Beach_City_Boundary.kml",
      map: map
    });
    let self = this;

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

    // map.data.addGeoJson(zip__90813);

    //  var infowwindow1 = google.maps.data.
    google.maps.event.addListener(zip_90815, "click", function(event) {
      self.onZip(90813);
      self.set_markers("90815");
      map.setZoom(14);
      map.setCenter({ lat: 33.795, lng: -118.118 });
    });
    google.maps.event.addListener(zip_90810, "click", function(event) {
      self.onZip(90813);
      self.set_markers("90810");
      map.setZoom(14);
      map.setCenter({ lat: 33.816, lng: -118.215 });
    });
    google.maps.event.addListener(zip_90813, "click", function(event) {
      self.onZip(90813);
      self.set_markers("90813");
      map.setZoom(14);
      map.setCenter({ lat: 33.781, lng: -118.175 });
    });
    google.maps.event.addListener(zip_90814, "click", function(event) {
      self.onZip(90813);
      self.set_markers("90814");
      map.setZoom(14);
      map.setCenter({ lat: 33.771, lng: -118.145 });
    });
    google.maps.event.addListener(zip_90808, "click", function(event) {
      self.onZip(90813);
      self.set_markers("90808");
      map.setZoom(14);
      map.setCenter({ lat: 33.823, lng: -118.113 });
    });

    google.maps.event.addListener(zip_90807, "click", function(event) {
      self.onZip(90813);
      self.set_markers("90807");
      map.setZoom(14);
      map.setCenter({ lat: 33.828, lng: -118.182 });
    });
    google.maps.event.addListener(zip_90822, "click", function(event) {
      self.onZip(90813);
      self.set_markers("90822");
      map.setZoom(14);
      map.setCenter({ lat: 33.776, lng: -118.118 });
    });

    google.maps.event.addListener(zip_90831, "click", function(event) {
      self.onZip(90831);
      self.set_markers("90831");
      map.setZoom(14);
      map.setCenter({ lat: 33.768, lng: -118.199 });
    });

    google.maps.event.addListener(zip_90802, "click", function(event) {
      self.onZip(90831);
      self.set_markers("90802");
      map.setZoom(14);
      map.setCenter({ lat: 33.769, lng: -118.192 });
    });
    google.maps.event.addListener(zip_90803, "click", function(event) {
      self.onZip(90831);
      self.set_markers("90803");
      map.setZoom(14);
      map.setCenter({ lat: 33.761, lng: -118.13 });
    });
    google.maps.event.addListener(zip_90804, "click", function(event) {
      self.onZip(90831);
      self.set_markers("90804");
      map.setZoom(14);
      map.setCenter({ lat: 33.783, lng: -118.152 });
    });
    google.maps.event.addListener(zip_90805, "click", function(event) {
      self.onZip(90831);
      self.set_markers("90805");
      map.setZoom(14);
      map.setCenter({ lat: 33.866, lng: -118.184 });
    });
    google.maps.event.addListener(zip_90806, "click", function(event) {
      self.onZip(90831);
      self.set_markers("90806");
      map.setZoom(14);
      map.setCenter({ lat: 33.802, lng: -118.186 });
    });

    // infowindow1.setContent('zip code: 90813');
    // infowindow1.setPosition(
    //   self.onZip(90813);
    // });

    // this.onZip(90813);

    var zip_codes = [
      90802,
      90803,
      90804,
      90805,
      90806,
      90807,
      90808,
      90810,
      90813,
      90814,
      90815,
      90822,
      90831
    ];

    //var zip_colors = new Map();

    var zip_colors = new Array();

    // var obj = {
    //   zipcode: 98098,
    //   color: "ssdf"
    //  };

    var config = {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    };

    //http://localhost:8000/api/buinesslist/?zipcode={zipcode}&startindex={startindex}&endindex={endindex}
    //returns a list of businesses of zipcode randomly of that zipcode

    //.get("api.json", config)
    jQuery
      .get("http://127.0.0.1:8000/api/zipcoderatio/", config)
      .then(res => {
        //for (var j = 0; j < res.length; i++) {
        //  rest.push(res.data[i]);
        // }
        //rest = res.data;
        //yikes(res);
        for (var i = 0; i < zip_codes.length; i++) {
          //let zip = api[i];
          //let zip = rest[i];
          let data = [];
          //      console.log(zip);

          if (this.check_zipcode(zip_codes[i], res) == false) {
            //  console.log("yay");
            //  let zip_color_obj = {
            //    zipcode: zip_codes[i],
            //    color: "#fdffe1"
            //  };
            zip_colors.push({
              zipcode: zip_codes[i],
              color: "#f1f3d6"
              //color: "#fdffe1"
            });

            //count_out++;
            //zip_colors.set(zip_codes[i], "#fdffe1");
          } else {
            //count_in++;
            data = this.get_license_status(zip_codes[i], res);
            //   console.log(data);
            let color = this.set_color(data[1], data[0]);
            //   let zip_color_obj = {
            //     zipcode: zip_codes[i],
            //     color: color
            //   };
            zip_colors.push({
              zipcode: zip_codes[i],
              color: color
            });

            //zip_colors.set(zip_codes[i], color);
          }
        }
        //    console.log(zip_colors);
        //    console.log(zip_colors.length);
        //    console.log(zip_colors[0]);
        //    console.log(zip_colors[0].zipcode);

        for (var i = 0; i < zip_colors.length; i++) {
          //      console.log(zip_colors[i].zipcode);
          //      console.log(key);
          //      console.log(value);
          if (zip_colors[i].zipcode == 90802) {
            zip_90802.setStyle({
              strokeColor: "black",
              strokeWeight: 2,
              fillColor: zip_colors[i].color
            });
          } else if (zip_colors[i].zipcode == 90803) {
            zip_90803.setStyle({
              strokeColor: "black",
              strokeWeight: 2,
              fillColor: zip_colors[i].color
            });
          } else if (zip_colors[i].zipcode == 90804) {
            zip_90804.setStyle({
              strokeColor: "black",
              strokeWeight: 2,
              fillColor: zip_colors[i].color
            });
          } else if (zip_colors[i].zipcode == 90805) {
            zip_90805.setStyle({
              strokeColor: "black",
              strokeWeight: 2,
              fillColor: zip_colors[i].color
            });
          } else if (zip_colors[i].zipcode == 90806) {
            zip_90806.setStyle({
              strokeColor: "black",
              strokeWeight: 2,
              fillColor: zip_colors[i].color
            });
          } else if (zip_colors[i].zipcode == 90807) {
            zip_90807.setStyle({
              strokeColor: "black",
              strokeWeight: 2,
              fillColor: zip_colors[i].color
            });
          } else if (zip_colors[i].zipcode == 90808) {
            zip_90808.setStyle({
              strokeColor: "black",
              strokeWeight: 2,
              fillColor: zip_colors[i].color
            });
          } else if (zip_colors[i].zipcode == 90809) {
            zip_90809.setStyle({
              strokeColor: "black",
              strokeWeight: 2,
              fillColor: zip_colors[i].color
            });
          } else if (zip_colors[i].zipcode == 90810) {
            zip_90810.setStyle({
              strokeColor: "black",
              strokeWeight: 2,
              fillColor: zip_colors[i].color
            });
          } else if (zip_colors[i].zipcode == 90813) {
            zip_90813.setStyle({
              strokeColor: "black",
              strokeWeight: 2,
              fillColor: zip_colors[i].color
            });
          } else if (zip_colors[i].zipcode == 90814) {
            zip_90814.setStyle({
              strokeColor: "black",
              strokeWeight: 2,
              fillColor: zip_colors[i].color
            });
          } else if (zip_colors[i].zipcode == 90815) {
            zip_90815.setStyle({
              strokeColor: "black",
              strokeWeight: 2,
              fillColor: zip_colors[i].color
            });
          } else if (zip_colors[i].zipcode == 90822) {
            zip_90822.setStyle({
              strokeColor: "black",
              strokeWeight: 2,
              fillColor: zip_colors[i].color
            });
          } else if (zip_colors[i].zipcode == 90831) {
            zip_90831.setStyle({
              strokeColor: "black",
              strokeWeight: 2,
              fillColor: zip_colors[i].color
            });
          }
        }
      })
      .catch(error => {
        console.log("error", error);
      });

    /*
    zip_90802.setStyle({
      strokeColor: "black",
      strokeWeight: 2,
      fillColor: "green"
    });
    zip_90803.setStyle({
      strokeColor: "black",
      strokeWeight: 2
    });
    zip_90804.setStyle({
      strokeColor: "black",
      strokeWeight: 2
    });
    zip_90805.setStyle({
      strokeColor: "black",
      strokeWeight: 1,
      fillColor: "yellow"
    });
    zip_90806.setStyle({
      strokeColor: "black",
      strokeWeight: 2,
      fillColor: "red"
    });
    zip_90807.setStyle({
      strokeColor: "black",
      strokeWeight: 2,
      fillColor: "dark blue"
    });
    zip_90808.setStyle({
      strokeColor: "black",
      strokeWeight: 2,
      fillColor: "orange"
    });
    zip_90810.setStyle({
      strokeColor: "black",
      strokeWeight: 1,
      fillColor: "blue"
    });
    zip_90813.setStyle({
      strokeColor: "black",
      strokeWeight: 2,
      fillColor: "black"
    });
    zip_90814.setStyle({
      strokeColor: "black",
      strokeWeight: 2,
      fillColor: "brown"
    });
    zip_90815.setStyle({
      strokeColor: "black",
      strokeWeight: 2,
      fillColor: "purple"
    });
    zip_90822.setStyle({
      strokeColor: "black",
      strokeWeight: 2
    });
    zip_90831.setStyle({
      strokeColor: "black",
      strokeWeight: 2
    });
    */
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

  set_color(active, delinquent) {
    //  console.log(active);
    //  console.log(delinquent);
    var ratio = delinquent / active;
    //    console.log(ratio);
    var color = "#000000";
    if (ratio > 0.3) {
      color = "#d60000";
    } else if (ratio > 0.2) {
      color = "#b36a00";
    } else if (ratio > 0.15) {
      color = "#b69a48";
    } else if (ratio > 0.1) {
      color = "#d2d200";
    } else if (ratio > 0.05) {
      color = "#99bc57";
    } else {
      color = "#6b915b";
    }
    return color;
  }

  check_zipcode(zip, zip_list) {
    // console.log(zip_list);
    var present = false;
    //console.log(zip_list.length);
    for (var k = 0; k < zip_list.length; k++) {
      if (zip == zip_list[k].zipcode) {
        present = true;
        break;
      }
    }
    return present;
  }

  get_license_status(zip, api) {
    //  console.log("api");
    //  console.log(api);
    //  console.log(api[0]);
    //  console.log(api[0].zipcode);
    //  console.log(api[0].business_count);
    var licenses = [];
    var index = 0;
    for (var m = 0; m < api.length; m++) {
      if (zip == api[m].zipcode) {
        licenses[0] = api[m].delinquent_count;
        licenses[1] = api[m].active_count;
        index = m;
        break;
      }
    }
    // console.log("licenses");
    // console.log(api[m].delinquent_count);
    // console.log(licenses);
    return licenses;
  }

  /*
  set_markers(zip) {
    var config = {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    };
    //http://localhost:8000/api/buinesslist/?zipcode={zipcode}&startindex={startindex}&endindex={endindex}
    //returns a list of businesses of zipcode randomly of that zipcode
    var url =
      "http://localhost:8000/api/buinesslist/?zipcode={" +
      zip +
      "}&startindex={1}&endindex={10}";
    jQuery
      .get(url, config)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log("error", error);
      });
  }
  */

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyCys__gg8EEH6Mor2NnnVYL8Y5qukV_mI4`;
      var x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener("load", e => {
        this.onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
  }

  render() {
    return (
      <div style={{ margin: "-24px -24px 0" }}>
        <div id="mapContainer">
          <div style={{ width: "100%", height: "92vh" }} id="map" />
        </div>
        <CardDrawer ref={this.drawer} zipcode={90813} />
      </div>
    );
  }
}

export default Map;
