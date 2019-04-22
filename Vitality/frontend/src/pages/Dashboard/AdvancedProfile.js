import React, { Component, Fragment } from "react";
import Debounce from "lodash-decorators/debounce";
import Bind from "lodash-decorators/bind";
import { connect } from "dva";
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider
} from "antd";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import classNames from "classnames";
import DescriptionList from "@/components/DescriptionList";
import styles from "./AdvancedProfile.less";
import googleIcon from "../../assets/google.png"

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () =>
  window.innerWidth || document.documentElement.clientWidth;

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="Business Name">Something</Description>
    <Description term="Rating?">Something</Description>
    <Description term="?">Something</Description>
    <Description term="?" />
    <Description term="?">Placeholder</Description>
    <Description term="?">Placeholder</Description>
  </DescriptionList>
);


class AdvancedProfile extends Component {


  constructor(props){
    super(props);
    this.setInfo = this.setInfo.bind(this);
    this.setYelpInfo = this.setYelpInfo.bind(this);
    this.setGoogleInfo = this.setGoogleInfo.bind(this);
    this.setScore = this.setScore.bind(this);
  }



  // state = {
  //   obj: []
  // };

  state = {
    name: "",
    licenseNum: "",
    address: "",
    vitalityScore: 0,
    yelpUrl: "",
    yelpRating: 0,
    yelpReviewCount: 0,
    yelp_id: "",
    yelpImageUrl: "",
    yelpPriceRange: "",
    googleUrl: "",
    googleRating: 0,
    googleReviewCount: 0,
    google_id: ""
  }


  setInfo = (res) => {
    this.setState({
      name: res.name,
      licenseNum: res.license_num,
      address: res.address,
      yelpUrl: res.yelp.url,
      yelpImageUrl: res.yelp.image_url,
      yelp_id: res.yelp.yelp_id,
      google_id: res.google.google_id
    });

    console.log("from setInfo")
    console.log(this.state.yelp_id);
    console.log("from setInfo")

    return res;
  }

  setYelpInfo = (res) => {
    this.setState({
      yelpRating: res.rating,
      yelpReviewCount: res.review_count,
      yelpPriceRange: res.price
    });
    // return res;
  }

  setGoogleInfo = (res) => {
    this.setState({
      googleRating: res.rating,
      yelpPriceRange: res.price
    });
    return res;
  }

  setScore = (res) => {
    this.setState({
      vitalityScore:  res.score
    });
    return res;
  }

  componentDidMount() {

    jQuery
      .get("http://localhost:8000/api/business/BU20357460/")
      .then(response => {
        // handle success
        this.setInfo(response);
        console.log(response);

        jQuery
          .get(yelpHistoryAPI)
          .then(response => {
            // handle success
            console.log("Yelp: ")
            console.log(response);
            this.setYelpInfo(response);
            console.log(this.state.yelp_id);
            console.log("hello");
          })
          .catch(function(error) {
            // handle error
            console.log("Error in AdvancedProfile");
            console.log(error);
          })
          .then(function() {
            // always executed
          });

      })
      .catch(function(error) {
        // handle error
        console.log("Error in AdvancedProfile");
        console.log(error);
      })
      .then(function() {
        // always executed
      });

    console.log("Yelp ID:");
    console.log(this.state.yelp_id);
    let yelpHistoryAPI = "http://localhost:8000/api/yelphistory/" + this.state.yelp_id;

    // jQuery
    // .get(yelpHistoryAPI)
    // .then(response => {
    //   // handle success
    //   console.log("Yelp: ")
    //   console.log(response);
    //   this.setYelpInfo(response);
    //   console.log(this.state.yelp_id);
    //   console.log("hello");
    // })
    // .catch(function(error) {
    //   // handle error
    //   console.log("Error in AdvancedProfile");
    //   console.log(error);
    // })
    // .then(function() {
    //   // always executed
    // });

  }



  render() {

    console.log("from render");
    console.log(this.state)
    const des = (
      <div className="profile">
        <a href="http://www.google.com" target="_blank">
          <img src = {this.state.yelpImageUrl} height="300" width="500"/>
        </a>
        <h1 style={{fontSize:30,fontWeight:'bold',color:'#397CE1'}}>{this.state.name}</h1>
        <h2 style={{fontSize:25,color:'#397CE1'}}>Social Media Present: </h2>

        {/* <a href="http://www.google.com" target="_blank">
          <Icon type="google" style={{color:'brown'}}/>
        </a> */}

        {/* http://pluspng.com/img-png/google-logo-png-open-2000.png */}
        <a href={this.state.googleUrl} target="_blank">
          <img src={googleIcon} height="40" width="40"/>
        </a>

        <a href={this.state.yelpUrl} target="_blank">
          <img src="http://www.sclance.com/pngs/yelp-logo-png/yelp_logo_png_1550416.png" height="80" width="80"/>
        </a>


        <DescriptionList className={styles.headerList} size="small" col="2">
          <Description term="Business Name">Something</Description>
          <Description term="Rating?">Something</Description>
          <Description term="?">Something</Description>
          <Description term="?" />
          <Description term="?">Placeholder</Description>
          <Description term="?">Placeholder</Description>
        </DescriptionList>
      </div>
    );

    return(
      <div>
        {/* <PageHeaderWrapper title="Business Name" content={description} /> */}

        <PageHeaderWrapper content={des}/>

      </div>
    ) ;
  }
}

export default AdvancedProfile;
