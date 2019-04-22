import { Drawer, Button, Radio } from 'antd';
import React from 'react'
import BusinessList from '@/components/BusinessList/BusinessList'
import { queryBusiness, queryBusinessList, zipcoderatio } from "@/services/api";


const RadioGroup = Radio.Group;

class CardDrawer extends React.Component {

  // constructor(props){
  //   super(props);
  // }

  state = {
    visible: false,
    placement: 'left',
    businesses: []
  };

  fetchBusinesses = () => {
    queryBusinessList(90813).then(res => {
      this.setState({
        businesses: res
      })
    })
  }

  componentDidMount() {
  this.fetchBusinesses()
  }

  componentWillReceiveProps(newProps) {
   // this.fetchBusinesses(newProps);
    if(newProps.token){
      this.fetchBusinesses(newProps)
    }
  }

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

  onChange = (e) => {
    this.setState({
      placement: e.target.value,
    });
  }

  render() {
    return (
      <div id='CardContainer'>
        <Button type="primary" onClick={this.showDrawer}>
          Open drawer
        </Button>
        <Drawer
          title="Basic Drawer"
          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          mask = {false}
          closable={true}
          placement={'right'}
          width = {520}
        >
          <div>
          <BusinessList data={this.state.businesses}/> <br/>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default CardDrawer;