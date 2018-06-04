import React from 'react';

const Date = (props) => {
  const styledDate = props.status === 'available' || props.status === 'blank' ? 
    (<div style={{ color: 'black' }}> {props.index} </div>) :
    (<div style={{ color: 'red' }}> {props.index} </div>);

  return (
    <div>
      { styledDate }
    </div>
  );
};

export default Date;