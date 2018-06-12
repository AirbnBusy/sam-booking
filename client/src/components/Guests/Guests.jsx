import React from 'react';
import PropTypes from 'prop-types';
import {
  GuestSelector,
  GuestInput,
  IncrementButton,
  DecrementButton,
  IncDecButtonWrapper,
  IncDecWrapper,
  GuestInputBorder,
  FieldLabel,
  FieldWrapper,
} from './GuestsStyles';

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

    const guestSum =
      currentGuestSum > 1
        ? `${currentGuestSum} Guests`
        : `${currentGuestSum} Guest`;

    const plusImg = (
      <svg
        viewBox="0 0 24 24"
        role="img"
        style={{
          height: '1.5em',
          width: '1.5em',
          display: 'block',
          fill: 'currentcolor',
        }}
      >
        <rect height="2" rx="1" width="12" x="6" y="11" />
        <rect height="12" rx="1" width="2" x="11" y="6" />
      </svg>
    );

    const minusImg = (
      <svg
        viewBox="0 0 24 24"
        role="img"
        style={{
          height: '1.5em',
          width: '1.5em',
          display: 'block',
          fill: 'currentcolor',
        }}
      >
        <rect height="2" rx="1" width="12" x="6" y="11" />
      </svg>
    );

    const guestSelector = this.state.guestSelectorOpen ? (
      <GuestSelector>
        <IncDecWrapper className="guestIncDec">
          Adults
          <IncDecButtonWrapper>
            <DecrementButton
              type="button"
              onClick={() => decrementGuests('adult')}
              disabled={!adultDecButtonActive}
            >
              {minusImg}
            </DecrementButton>
            {currentAdultSum}
            <IncrementButton
              type="button"
              onClick={() => incrementGuests('adult')}
              disabled={!allIncButtonsActive}
            >
              {plusImg}
            </IncrementButton>
          </IncDecButtonWrapper>
        </IncDecWrapper>
        <IncDecWrapper className="guestIncDec">
          Children
          <IncDecButtonWrapper>
            <DecrementButton
              type="button"
              onClick={() => decrementGuests('child')}
              disabled={!childDecButtonActive}
            >
              {minusImg}
            </DecrementButton>
            {currentChildSum}
            <IncrementButton
              type="button"
              onClick={() => incrementGuests('child')}
              disabled={!allIncButtonsActive}
            >
              {plusImg}
            </IncrementButton>
          </IncDecButtonWrapper>
        </IncDecWrapper>
        <IncDecWrapper className="guestIncDec">
          Infants
          <IncDecButtonWrapper>
            <DecrementButton
              type="button"
              onClick={() => decrementGuests('infant')}
              disabled={!infantDecButtonActive}
            >
              {minusImg}
            </DecrementButton>
            {currentInfantSum}
            <IncrementButton type="button" id="infantInc" onClick={() => incrementGuests('infant')}>
              {plusImg}
            </IncrementButton>
          </IncDecButtonWrapper>
        </IncDecWrapper>
        {maxGuests} guests maximum. Infants don’t count toward the number of guests.
      </GuestSelector>) :
      null;

    return (
      <FieldWrapper className="guests">
        <FieldLabel>
          <span>Guests</span>
        </FieldLabel>
        <GuestInputBorder onClick={() => this.handleClick()}>
          <GuestInput readOnly value={guestSum} />
        </GuestInputBorder>
        {guestSelector}
      </FieldWrapper>
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
