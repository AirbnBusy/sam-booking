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
      textAlign: 'left',
      width: '80%',
      paddingTop: '.75em',
      paddingBottom: '1em',
      marginBottom: '.5em',
    };

    const guestSum = this.props.currentGuestSum > 1 ?
      `${this.props.currentGuestSum} Guests` :
      `${this.props.currentGuestSum} Guest`;

    const guestSelector = this.state.guestSelectorOpen ?
      (<div>guestSelector</div>) :
      null;

    return (
      <div>
        <div style={infoStyle}>
          <label>
            Guests
          </label>
          <div>
            <input value={guestSum} onClick={() => this.handleClick()} />
          </div>
        </div>
        {guestSelector}
      </div>
    );
  }
}

Guests.propTypes = {
  currentGuestSum: PropTypes.number,
};

export default Guests;
