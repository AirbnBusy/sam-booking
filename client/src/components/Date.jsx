import React from 'react';
import PropTypes from 'prop-types';

const Date = (props) => {
  const availStyle = {
    color: 'black',
  };

  const unavailStyle = {
    color: 'red',
  };

  const blankStyle = {
    backgroundColor: 'black',
  };

  const availDate = props.status === 'available' ?
    (<div style={availStyle}> {props.index} </div>) : null;

  const unavailDate = props.status === 'unavailable' ?
    (<div style={unavailStyle}> {props.index} </div>) : null;

  const blankDate = props.status === 'blank' ?
    (<div style={blankStyle}> {props.index} </div>) : null;

  return (
    <div className="date">
      {availDate}
      {unavailDate}
      {blankDate}
    </div>
  );
};

Date.propTypes = {
  status: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Date;
