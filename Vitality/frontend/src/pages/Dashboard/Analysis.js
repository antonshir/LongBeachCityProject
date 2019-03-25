import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown, Card, Drawer, Button } from "antd";
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import PriorirtDrawer from '@/components/PriorityDrawer/index'

const MapCard = React.lazy(() => import('./MapCard'));



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
      <GridContent>
        <Button type="primary" size={'small'} onClick={this.showDrawer}>Open</Button>
         <Drawer
          title="Priority"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
        </Drawer>
        <Suspense fallback={null}>
          <MapCard>
          </MapCard>
        </Suspense>
      </GridContent>
    );
  }




}

export default Analysis;