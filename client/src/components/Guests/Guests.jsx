import React from 'react';
import PropTypes from 'prop-types';

class Guests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guestSelectorOpen: false,
    };
  }

  handleClick() {
    this.setState(prevState => ({
      guestSelectorOpen: !prevState.guestSelectorOpen,
    }));
  }

  render() {
    const {
      guests: {
        currentGuestSum,
        currentAdultSum,
        currentChildSum,
        currentInfantSum,
        incrementGuests,
        decrementGuests,
        maxGuests,
        adultDecButtonActive,
        childDecButtonActive,
        infantDecButtonActive,
        allIncButtonsActive,
      },
    } = this.props;

    const infoStyle = {
      position: 'relative',
      textAlign: 'left',
      width: '90%',
      color: '#484848',
      marginBottom: '1em',
    };

    const labelStyle = {
      marginBottom: '5px',
      fontSize: '12px',
      fontWeight: 600,
    };

    const selectorStyle = {
      position: 'absolute',
      backgroundColor: 'white',
      border: '1px solid #e4e4e4',
      width: '100%',
    };

    const incDecButtonStyle = {
      display: 'flex',
      justifyContent: 'center',
      height: '35px',
      width: '35px',
      borderRadius: '50%',
      outline: 'none',
    };

    const incDecContainerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px',
    };

    const buttonContainer = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '45%',
    };

    const selectorContainerStyle = {
      margin: '15px',
    };

    const inputContainerStyle = {
      fontFamily: 'Roboto',
      border: '1px solid #e4e4e4',
    };

    const inputStyle = {
      height: '100%',
      width: '40%',
      fontFamily: 'Roboto',
      border: 'none',
      margin: '6px 10px',
      fontSize: '17px',
      outline: 'none',
      color: 'transparent',
      textShadow: '0 0 0 #757575',
      userSelect: 'none',
      borderRadius: '3px',
      padding: '2px',
    };

    const guestSum = currentGuestSum > 1 ?
      `${currentGuestSum} Guests` :
      `${currentGuestSum} Guest`;

    const guestSelector = this.state.guestSelectorOpen ? (
      <div style={selectorStyle}>
        <div style={selectorContainerStyle}>
          <div className="guestIncDec" style={incDecContainerStyle}>
            Adults
            <div style={buttonContainer}>
              <button
                style={incDecButtonStyle}
                type="button"
                id="adultDec"
                onClick={() => decrementGuests('adult')}
                disabled={!adultDecButtonActive}
              >
              <svg viewBox="0 0 24 24" role="img" style={{ height: '1em', width: '1em', display: 'block', fill: 'currentcolor' }}>
                  <rect height="2" rx="1" width="12" x="6" y="11" />
              </svg>
              </button>
              {currentAdultSum}
              <button
                style={incDecButtonStyle}
                type="button"
                id="adultInc"
                onClick={() => incrementGuests('adult')}
                disabled={!allIncButtonsActive}
              >
                <svg viewBox="0 0 24 24" role="img" style={{ height: '1em', width: '1em', display: 'block', fill: 'currentcolor' }}>
                  <rect height="2" rx="1" width="12" x="6" y="11" />
                  <rect height="12" rx="1" width="2" x="11" y="6" />
                </svg>
              </button>
            </div>
          </div>
          <div className="guestIncDec" style={incDecContainerStyle}>
            Children
            <div style={buttonContainer}>
              <button
                style={incDecButtonStyle}
                type="button"
                id="childDec"
                onClick={() => decrementGuests('child')}
                disabled={!childDecButtonActive}
              >
              <svg viewBox="0 0 24 24" role="img" style={{ height: '1em', width: '1em', display: 'block', fill: 'currentcolor' }}>
                  <rect height="2" rx="1" width="12" x="6" y="11" />
              </svg>
              </button>
              {currentChildSum}
              <button
                style={incDecButtonStyle}
                type="button"
                id="childInc"
                onClick={() => incrementGuests('child')}
                disabled={!allIncButtonsActive}
              >
                <svg viewBox="0 0 24 24" role="img" style={{ height: '1em', width: '1em', display: 'block', fill: 'currentcolor' }}>
                  <rect height="2" rx="1" width="12" x="6" y="11" />
                  <rect height="12" rx="1" width="2" x="11" y="6" />
                </svg>
              </button>
            </div>
          </div>
          <div className="guestIncDec" style={incDecContainerStyle}>
            Infants
            <div style={buttonContainer}>
              <button
                style={incDecButtonStyle}
                type="button"
                id="infantInc"
                onClick={() => decrementGuests('infant')}
                disabled={!infantDecButtonActive}
              >
                <svg viewBox="0 0 24 24" role="img" style={{ height: '1em', width: '1em', display: 'block', fill: 'currentcolor' }}>
                  <rect height="2" rx="1" width="12" x="6" y="11" />
                </svg>
              </button>
              {currentInfantSum}
              <button type="button" id="infantInc" onClick={() => incrementGuests('infant')} style={incDecButtonStyle}>
                <svg viewBox="0 0 24 24" role="img" style={{ height: '1em', width: '1em', display: 'block', fill: 'currentcolor' }}>
                  <rect height="2" rx="1" width="12" x="6" y="11" />
                  <rect height="12" rx="1" width="2" x="11" y="6" />
                </svg>
              </button>
            </div>
          </div>
          {maxGuests} guests maximum. Infants don’t count toward the number of guests.
        </div>
      </div>) :
      null;

    return (
      <div style={infoStyle} className="guests">
        <div style={labelStyle}>
          <span>Guests</span>
        </div>
        <div style={inputContainerStyle} onClick={() => this.handleClick()}>
          <input
            readOnly
            id="guestInput"
            style={inputStyle}
            value={guestSum}
          />
        </div>
        {guestSelector}
      </div>
    );
  }
}

Guests.propTypes = {
  guests: PropTypes.shape({
    currentGuestSum: PropTypes.number.isRequired,
    currentAdultSum: PropTypes.number.isRequired,
    currentChildSum: PropTypes.number.isRequired,
    currentInfantSum: PropTypes.number.isRequired,
    incrementGuests: PropTypes.func.isRequired,
    decrementGuests: PropTypes.func.isRequired,
    maxGuests: PropTypes.number.isRequired,
    adultDecButtonActive: PropTypes.bool.isRequired,
    childDecButtonActive: PropTypes.bool.isRequired,
    infantDecButtonActive: PropTypes.bool.isRequired,
    allIncButtonsActive: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Guests;
