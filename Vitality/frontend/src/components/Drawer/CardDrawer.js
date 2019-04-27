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
    console.log(zip.zipcode);
    queryBusinessList(zip.zipcode).then(res => {
      // this.setState({
      //   businesses: res
      // })
      console.log("Hi");
      console.log(res);

      queryBusiness(res.business).then(result => {
        console.log(result);
        this.setState({
          businesses: result
        })
      })

    })
  }

  componentDidUpdate(nextProps) {
    if (this.props !== nextProps) {
      console.log("Yes");
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
          title="Basic Drawer"
          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          mask = {false}
          closable={true}
          placement={'right'}
          width = {420}
        >
          <div>
          {/*<BusinessList data={this.state.businesses}/> <br/>*/}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default CardDrawer;