import React from 'react';
import PropTypes from 'prop-types';

const Summary = ({
  summary: {
    cleaningFee,
    baseRate,
    numberOfNightsSelected,
    baseRateXNights,
    occupancyTaxes,
    serviceFee,
    totalCost,
  },
}) => {
  const infoStyle = {
    textAlign: 'left',
    width: '100%',
    paddingTop: '.75em',
    paddingBottom: '1em',
    marginBottom: '.5em',
    borderBottom: '1px solid grey',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const passStyle = {
    width: '80%',
    height: '100%',
  };

  return (
    <div style={passStyle}>
      <div style={infoStyle}>
        <span>{`$${baseRate} x ${numberOfNightsSelected} Nights`}</span>
        <span>{`$${baseRateXNights}`}</span>
      </div>
      <div style={infoStyle}>
        <span>Cleaning Fee</span>
        <span>{`$${cleaningFee}`}</span>
      </div>
      <div style={infoStyle}>
        <span>Service Fee</span>
        <span>{`$${serviceFee}`}</span>
      </div>
      <div style={infoStyle}>
        <span>Occupancy Taxes</span>
        <span>{`$${occupancyTaxes}`}</span>
      </div>
      <div style={infoStyle}>
        <span>Total</span>
        <span>{`$${totalCost}`}</span>
      </div>
    </div>
  );
};

Summary.propTypes = {
  summary: PropTypes.shape({
    cleaningFee: PropTypes.number.isRequired,
    baseRate: PropTypes.number.isRequired,
    numberOfNightsSelected: PropTypes.number.isRequired,
    baseRateXNights: PropTypes.number.isRequired,
    occupancyTaxes: PropTypes.number.isRequired,
    serviceFee: PropTypes.number.isRequired,
    totalCost: PropTypes.number.isRequired,
  }).isRequired,
};

export default Summary;
