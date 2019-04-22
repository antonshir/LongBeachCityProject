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
import googleIcon from "./google.png"

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


  business = "this is business";
  // constructor(props){
  //   super(props);
  //   this.business;
  // }

  

  getInfo = (res) => {
    console.log("from get info")
    console.log(res);
    console.log("from get info")
    return res;
  }

  // state = {
  //   obj: []
  // };

  state = {
    name: "BEACH JEWELRY CENTER",
    liceseNum: "",
    address: "",
    phone: "",
    vitalityScore: 3,
    yelpUrl: "https://www.yelp.com/biz/beach-jewelry-center-long-beach?adjust_creative=OorxPpvbQO7_P_C9N1Ciwg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=OorxPpvbQO7_P_C9N1Ciwg",
    yelpRating: 4.3,
    yelpReviewCount: 11,
    yelpImageUrl: "https://s3-media3.fl.yelpcdn.com/bphoto/AhGyKgEVNNQ3s_VanTO0iA/o.jpg",
    googleUrl: "https://www.google.com/maps/place/Beach+Jewelry+Center/@33.7685104,-118.1948095,17z/data=!3m1!4b1!4m5!3m4!1s0x80dd3139940f442b:0xaf4f16d7e3f5a33c!8m2!3d33.7685104!4d-118.1926208",
    googleRating: 4.4,
    googleReviewCount: 13
  }


  componentDidMount() {
    
      jQuery
      .get("http://localhost:8000/api/business/BU20357460/")
      .then(response => {
        // handle success
        console.log(response);
        this.setState({obj: response.yelp})
        console.log(this.state.obj);
        this.getInfo(response);
      }) 
        
      .catch(function(error) {
        console.log("Error in AdvancedProfile");
        // handle error
        console.log(error);
      }) 
      .then(function() {
        // always executed
      });
    // console.log("hello there");
    // console.log(this.state.obj);     
    
  
    // jQuery
    //   .get("http://localhost:8000/api/business/BU20357460/")
    //   .then(response => this.setState({obj: response}) 
    //     // handle success
    //     // console.log(response);
    //   )
    //   .catch(function(error) {
    //     console.log("Error in AdvancedProfile");
    //     // handle error
    //     console.log(error);
    //   }) 
    //   .then(function() {
    //     // always executed
    //   });

  }



  render() {

  
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
