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

    const guestSum = this.props.currentGuestSum > 1 ?
      `${this.props.currentGuestSum} Guests` :
      `${this.props.currentGuestSum} Guest`;

    const guestSelector = this.state.guestSelectorOpen ? (
      <div style={selectorStyle}>
        <div>
          Adults
          <button type="button" onClick={() => this.props.decrementGuests('adult')}>-</button>
          {this.props.currentAdultSum}
          <button type="button" onClick={() => this.props.incrementGuests('adult')}>+</button>
        </div>
        <div>
          Children
          <button type="button" onClick={() => this.props.decrementGuests('child')}>-</button>
          {this.props.currentChildSum}
          <button type="button" onClick={() => this.props.incrementGuests('child')}>+</button>
        </div>
        <div>
          Infants
          <button type="button" onClick={() => this.props.decrementGuests('infant')}>-</button>
          {this.props.currentInfantSum}
          <button type="button" onClick={() => this.props.incrementGuests('infant')}>+</button>
        </div>
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
  currentGuestSum: PropTypes.number.isRequired,
  currentAdultSum: PropTypes.number.isRequired,
  currentChildSum: PropTypes.number.isRequired,
  currentInfantSum: PropTypes.number.isRequired,
  incrementGuests: PropTypes.func.isRequired,
  decrementGuests: PropTypes.func.isRequired,
};

export default Guests;
