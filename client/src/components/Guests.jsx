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
      width: '80%',
      paddingTop: '.75em',
      paddingBottom: '1em',
      marginBottom: '.5em',
    };

    const selectorStyle = {
      position: 'absolute',
      backgroundColor: 'white',
      border: '1px solid black',
      width: '100%',
    };

    const guestSum = currentGuestSum > 1 ?
      `${currentGuestSum} Guests` :
      `${currentGuestSum} Guest`;

    const guestSelector = this.state.guestSelectorOpen ? (
      <div style={selectorStyle}>
        <div className="guestIncDec">
          Adults
          <button
            type="button"
            id="adultDec"
            onClick={() => decrementGuests('adult')}
            disabled={!adultDecButtonActive}
          >
          -
          </button>
          {currentAdultSum}
          <button 
            type="button"
            id="adultInc"
            onClick={() => incrementGuests('adult')}
            disabled={!allIncButtonsActive}
          >
          +
          </button>
        </div>
        <div className="guestIncDec">
          Children
          <button
            type="button"
            id="childDec"
            onClick={() => decrementGuests('child')}
            disabled={!childDecButtonActive}
          >
          -
          </button>
          {currentChildSum}
          <button 
            type="button"
            id="childInc"
            onClick={() => incrementGuests('child')}
            disabled={!allIncButtonsActive}
          >
          +
          </button>
        </div>
        <div className="guestIncDec">
          Infants
          <button
            type="button"
            id="infantInc"
            onClick={() => decrementGuests('infant')}
            disabled={!infantDecButtonActive}
          >
          -
          </button>
          {currentInfantSum}
          <button type="button" id="infantInc" onClick={() => incrementGuests('infant')}>+</button>
        </div>
        {maxGuests} guests maximum. Infants don’t count toward the number of guests.
      </div>) :
      null;

    return (
      <div style={infoStyle} className="guests">
        <label>
          Guests
        </label>
        <div>
          <input readOnly id="guestInput" value={guestSum} onClick={() => this.handleClick()} />
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
