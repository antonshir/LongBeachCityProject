import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown, Card, Drawer, Button } from "antd";
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import PriorirtDrawer from '@/components/PriorityDrawer/index'
import Map from '@/components/Map/Map'





class Analysis extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <Map/>
    );
  }




}

export default Analysis;