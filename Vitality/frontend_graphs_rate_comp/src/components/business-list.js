import React from 'react';
import '../App.css';

function  BusinessList(props){
  if (props.list)
  {
      return (
          <React.Fragment>
             <div>
                {props.list.map( bus => {
                    return <h4 key={bus.license_num}> { bus.dba_name } </h4>;
                })}
             </div>
        </React.Fragment>
      );
  }
  else return <h3>Loading List</h3>;

}


export default BusinessList;
