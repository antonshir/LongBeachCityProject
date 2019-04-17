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
  componentDidMount() {
    jQuery
      .get("http://localhost:8000/api/business/BU20357460/")
      .then(function(response) {
        // handle success
        console.log("XD");
        console.log(response);
        console.log("XD");
      })
      .catch(function(error) {
        console.log("wtf");
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }
  render() {
    return <PageHeaderWrapper title="Business Name" content={description} />;
  }
}

export default AdvancedProfile;
