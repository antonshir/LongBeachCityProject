import React, { Component } from 'react';
var FontAwesome = require('react-fontawesome');

class CompanyDetails extends Component {

  state = {
    highlighted: -1
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

  getDetails = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/companys/${this.props.company.id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ad40f2637372be950afb452b5ae14fed8fd50e94'
      }
      }).then( resp => resp.json())
      .then( res => this.props.updateCompany(res))
      .catch( error => console.log(error))
  }

  render() {
    const comp = this.props.company;

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
          </div>
        ) : null }
      </React.Fragment>
     )
  }
}

export default CompanyDetails;
