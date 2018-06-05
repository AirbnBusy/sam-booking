import React from 'react';
import PropTypes from 'prop-types';

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

Date.propTypes = {
  status: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Date;
