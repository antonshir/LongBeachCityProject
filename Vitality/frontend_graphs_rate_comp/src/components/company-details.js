import React, { Component } from 'react';
import BusinessList from './business-list';

var FontAwesome = require('react-fontawesome');

class CompanyDetails extends Component {

  state = {
    highlighted: -1,
    businesses: [],
     data: {}
  }

   highlightRate = high => evt => {
     this.setState({highlighted: high});
   }

    rateClicked = stars => evt => {
       
      fetch(`${process.env.REACT_APP_API_URL}/api/companys/${this.props.company.id}/rate_company/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ad40f2637372be950afb452b5ae14fed8fd50e94'
        },
        body: JSON.stringify({stars: stars + 1})
        }).then( resp => resp.json())
        .then( res => this.getDetails())
        .catch( error => console.log(error))

  }

  getDetails = (props) => {
    
    fetch(`${process.env.REACT_APP_API_URL}/api/companys/${this.props.company.id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ba809f29097d05d76e97e0b9ea3ed7d007f18105'
      }
      }).then( resp => resp.json())
        .then(res => this.props.updateCompany(res))
          .catch(error => console.log(error))
   }

    getList = () => {
        fetch(`http://127.0.0.1:8000/api/companys/271/get_bus_list/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ba809f29097d05d76e97e0b9ea3ed7d007f18105'
            }
        }).then(resp => resp.json())
            .then(res => this.setState({ businesses: res.result }))
            .catch(error => console.log(error))
    }

  render() {
      
      if (this.props.company)
          this.getList();
      const comp = this.props.company;
      console.log("comp-detail-method");
      console.log(this.state.businesses);

    return (
      <React.Fragment>
        { comp ? (
          <div>
            <h3>{comp.name}</h3>

            <FontAwesome name="star" className={comp.avg_rating > 0 ? 'orange': ''}/>
            <FontAwesome name="star" className={comp.avg_rating > 1 ? 'orange': ''}/>
            <FontAwesome name="star" className={comp.avg_rating > 2 ? 'orange': ''}/>
            <FontAwesome name="star" className={comp.avg_rating > 3 ? 'orange': ''}/>
            <FontAwesome name="star" className={comp.avg_rating > 4 ? 'orange': ''}/>
            ({comp.no_of_ratings})
            <p>{comp.id}</p>

            <div className="rate_container">
              <h3>Rate Company!</h3>
              { [...Array(5)].map( (e, i) => {
                return <FontAwesome key={i} name="star" className={this.state.highlighted > i -1 ? 'purple': ''}
                    onMouseEnter={this.highlightRate(i)} onMouseLeave={this.highlightRate(-1)} onClick={this.rateClicked(i)}/>
              })}
             </div>

             <h3>Businesses Owned By {this.props.company.name} </h3>
              <BusinessList list={this.state.businesses} comp={this.props.company} />
            
          </div>
        ) : null }
      </React.Fragment>
     )
  }
}

export default CompanyDetails;
