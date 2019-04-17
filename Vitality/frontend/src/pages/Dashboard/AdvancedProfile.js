import React, { Component, Fragment } from 'react';
import '@/services/api'
import '@/utils/request'
import { queryBusiness } from '@/services/api';
import  axios from 'axios';

import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import CardDrawer from '@/components/Drawer/CardDrawer'
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
    Divider,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import classNames from 'classnames';
import DescriptionList from '@/components/DescriptionList';
import styles from './AdvancedProfile.less';



const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

const description = (

    <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="Business Name">Something</Description>
        <Description term="Rating?">Something</Description>
        <Description term="?">Something</Description>
        <Description term="?">
        </Description>
        <Description term="?">Placeholder</Description>
        <Description term="?">Placeholder</Description>
    </DescriptionList>
);

class AdvancedProfile extends Component {

  state = {
    zipcode: []
  }
  componentDidMount() {
    var config = {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    };

    jQuery
      .get("/api/business")
      .then(res => {
        const zipcode = res.data;
        this.setState({zipcode})
      })
      .catch(error => {
        console.log("error", error);
      });
  }


    render()
    {
        return (
            <PageHeaderWrapper
            title = "Business Name"
            content = {description}>

            </PageHeaderWrapper>

        );
    }
}




export default AdvancedProfile;