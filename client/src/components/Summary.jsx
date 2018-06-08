import React from 'react';

const Summary = (props) => {
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
        <span>Nights</span>
        <span>NightsValue</span>
      </div>
      <div style={infoStyle}>
        <span>Cleaning Fee</span>
        <span>CleaningFeeValue</span>
      </div>
      <div style={infoStyle}>
        <span>Service Fee</span>
        <span>ServiceFeeValue</span>
      </div>
      <div style={infoStyle}>
        <span>Occupancy Taxes</span>
        <span>OccTaxesValue</span>
      </div>
      <div style={infoStyle}>
        <span>Total</span>
        <span>Total value</span>
      </div>
    </div>
    
  );
}

export default Summary;
