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

    const guestSum = this.props.guests.currentGuestSum > 1 ?
      `${this.props.guests.currentGuestSum} Guests` :
      `${this.props.guests.currentGuestSum} Guest`;

    const guestSelector = this.state.guestSelectorOpen ? (
      <div style={selectorStyle}>
        <div>
          Adults
          <button
            type="button"
            onClick={() => this.props.guests.decrementGuests('adult')}
            disabled={!this.props.guests.adultDecButtonActive}
          >
          -
          </button>
          {this.props.guests.currentAdultSum}
          <button 
            type="button"
            onClick={() => this.props.guests.incrementGuests('adult')}
            disabled={!this.props.guests.allIncButtonsActive}
          >
          +
          </button>
        </div>
        <div>
          Children
          <button
            type="button"
            onClick={() => this.props.guests.decrementGuests('child')}
            disabled={!this.props.guests.childDecButtonActive}
          >
          -
          </button>
          {this.props.guests.currentChildSum}
          <button 
            type="button"
            onClick={() => this.props.guests.incrementGuests('child')}
            disabled={!this.props.guests.allIncButtonsActive}
          >
          +
          </button>
        </div>
        <div>
          Infants
          <button
            type="button"
            onClick={() => this.props.guests.decrementGuests('infant')}
            disabled={!this.props.guests.infantDecButtonActive}
          >
          -
          </button>
          {this.props.guests.currentInfantSum}
          <button type="button" onClick={() => this.props.guests.incrementGuests('infant')}>+</button>
        </div>
        {this.props.guests.maxGuests} guests maximum. Infants don’t count toward the number of guests.
      </div>) :
      null;

    return (
      <div style={infoStyle}>
        <label>
          Guests
        </label>
        <div>
          <input readOnly value={guestSum} onClick={() => this.handleClick()} />
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
