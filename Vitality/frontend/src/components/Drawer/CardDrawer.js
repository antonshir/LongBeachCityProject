import { Drawer, Button, Radio } from 'antd';
import React from 'react'
import BusinessList from '@/components/BusinessList/BusinessList'
import { queryBusiness, queryBusinessList, zipcoderatio } from "@/services/api";


const RadioGroup = Radio.Group;

class CardDrawer extends React.Component {

  constructor(props){
    super(props);
  }

  state = {
    visible: false,
    placement: 'left',
    businesses: []
  };

  fetchBusinesses = (zip) => {
    queryBusinessList(zip.zipcode).then(res => {
      this.setState({
        businesses: res
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps && this.props !==null) {
     this.fetchBusinesses(this.props);
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
        <Drawer
          title="Businesses"
          placement={this.state.placement}
          onClose={this.onClose}
          visible={this.state.visible}
          mask = {true}
          closable={false}
          placement={'right'}
          width = {420}
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