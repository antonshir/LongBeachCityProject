import React from 'react';
import '../App.css';

function CompanyList(props) {

  const companyClicked = company => evt => {
      props.companyClicked(company);
  };

  return (
    <div>
       { props.companys.map( company => {
        return (
          <h3 key={company.id} onClick={companyClicked(company)}>
            {company.name}
          </h3>
        )
      })}
    </div>
  )
}

export default CompanyList;
