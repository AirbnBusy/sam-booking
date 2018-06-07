import React from 'react';
import PropTypes from 'prop-types';

const Date = ({ index, status }) => {
  const availStyle = {
    color: 'black',
  };

  const unavailStyle = {
    color: 'grey',
    textDecoration: 'line-through',
  };

  const blankStyle = {
    backgroundColor: 'grey',
  };

  const availDate = status === 'available' ?
    (<div style={availStyle}> {index} </div>) : null;

  const unavailDate = status === 'unavailable' ?
    (<div style={unavailStyle}> {index} </div>) : null;

  const blankDate = status === 'blank' ?
    (<div style={blankStyle} />) : null;

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
