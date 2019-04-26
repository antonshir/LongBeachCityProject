import React, { Component, Fragment } from "react";
import Debounce from "lodash-decorators/debounce";
import Bind from "lodash-decorators/bind";
import { connect } from "dva";
import {
  Avatar,
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
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from "./AdvancedProfile.less";
import googleIcon from "../../assets/google.png"

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () =>
  window.innerWidth || document.documentElement.clientWidth;




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
      name: res.dba_name,
      licenseNum: res.license_num,
      address: res.address,
      yelpUrl: res.yelp.url,
      yelpImageUrl: res.yelp.image_url,
      yelp_id: res.yelp.yelp_id,
      google_id: res.google.google_id
    });

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
            this.setYelpInfo(response);
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
    const description = (
      <div>
      {/*<a href="http://www.google.com" target="_blank">*/}
        {/*<img src = {this.state.yelpImageUrl} height="300" width="500"/>*/}
      {/*</a>*/}
      <DescriptionList className={styles.headerList} size="medium" col="2">
        {/*<img width={140} alt="logo" src={this.state.yelpImageUrl} />*/}
        {/*<a href="http://www.google.com" target="_blank">*/}
          {/*<img width = {140} alt = "" src = {this.state.yelpImageUrl} height="140"/>*/}
        {/*</a>*/}
        <Description term="Business Name">{this.state.name}</Description>
        <Description term="Social Media Rating:">{this.state.vitalityScore}</Description>
        <Description term="License Number:">{this.state.licenseNum}</Description>
        <Description term="Address:" > {this.state.address}</Description>
        <Description term="Yelp Rating: ">{this.state.yelpRating}</Description>
        <Description term="Reviews: ">{this.state.yelpReviewCount}</Description>
      </DescriptionList>
      </div>
    );


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

        {/*<a href={this.state.yelpUrl} target="_blank">*/}
          {/*<img src="http://www.sclance.com/pngs/yelp-logo-png/yelp_logo_png_1550416.png" height="80" width="80"/>*/}
        {/*</a>*/}
        <DescriptionList className={styles.headerList} size="small" col="3">
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
        <PageHeaderWrapper
        title = {this.state.name}
        backIcon = {<Icon type="arrow-left" />}
        content = {description}
        logo = {
          <img width={140} alt="logo" src={this.state.yelpImageUrl} />
        }
        >
          <GridContent>
            <Row gutter={24}>
              <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <Card title="Card" style={{ marginBottom: 24 }} bordered={true}>
            <DescriptionList >
              <Description term="??">?</Description>
              <Description term="??">?</Description>
              <Description term="??">?</Description>
              <Description term="??">?</Description>
              <Description term="??">
                ??
              </Description>
            </DescriptionList>
          </Card>
              </Col>
              <Row>
                <Col md={6} sm={12} xs={24}>
          <Card
            bodyStyle={{ paddingTop: 12, paddingBottom: 12, paddingRight:12 }}
            bordered={false}
            title="Card"
          >
          </Card>
                </Col>
              </Row>
            </Row>
          </GridContent>
        </PageHeaderWrapper>

    ) ;
  }
}

export default AdvancedProfile;