import React from 'react';
import PropTypes from 'prop-types';
import Calendar from '../Calendar/Calendar';
import { CheckIOInput, CheckIOInputWrapper } from './CheckIOStyles';
import { FieldLabel, FieldWrapper } from '../Guests/GuestsStyles';

class CheckIO extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inCalendarOpen: false,
      outCalendarOpen: false,
    };

    this.inToggleCalendar = this.toggleCalendar.bind(this, 'in');
    this.outToggleCalendar = this.toggleCalendar.bind(this, 'out');
  }

  toggleCalendar(calendarType) {
    if (calendarType === 'in') {
      this.setState(prevState => ({
        inCalendarOpen: !prevState.inCalendarOpen,
        outCalendarOpen: false,
      }));
    } else if (calendarType === 'out') {
      this.setState(prevState => ({
        inCalendarOpen: false,
        outCalendarOpen: !prevState.outCalendarOpen,
      }));
    }
  }

  render() {
    const {
      calendar: {
        currentCalendarDatesUnavailable,
        firstDayPosition,
        numberOfDaysInMonth,
        currentMonthName,
        currentYear,
        currentMonth,
        incrementCalendar,
        decrementCalendar,
        selectedCheckInDate,
        selectedCheckOutDate,
        selectCheckInDate,
        selectCheckOutDate,
      },
    } = this.props;

    const inCalendar = this.state.inCalendarOpen ? (<Calendar
      id="inCal"
      daysUnav={currentCalendarDatesUnavailable}
      firstDayPosition={firstDayPosition}
      daysInMonth={numberOfDaysInMonth}
      currentYear={currentYear}
      currentMonth={currentMonth}
      currentYearMonth={`${currentMonthName} ${currentYear}`}
      incrementCalendar={incrementCalendar}
      decrementCalendar={decrementCalendar}
      selectedCheckInDate={selectedCheckInDate}
      selectedCheckOutDate={selectedCheckOutDate}
      selectDate={selectCheckInDate}
      toggleCalendar={this.inToggleCalendar}
    />) : null;

    const outCalendar = this.state.outCalendarOpen ? (<Calendar
      id="outCal"
      daysUnav={currentCalendarDatesUnavailable}
      firstDayPosition={firstDayPosition}
      daysInMonth={numberOfDaysInMonth}
      currentYear={currentYear}
      currentMonth={currentMonth}
      currentYearMonth={`${currentMonthName} ${currentYear}`}
      incrementCalendar={incrementCalendar}
      decrementCalendar={decrementCalendar}
      selectedCheckInDate={selectedCheckInDate}
      selectedCheckOutDate={selectedCheckOutDate}
      selectDate={selectCheckOutDate}
      toggleCalendar={this.outToggleCalendar}
    />) : null;

    const inDate = selectedCheckInDate || '';
    const outDate = selectedCheckOutDate || '';

    const arrow = (
      <svg
        viewBox="0 0 24 24"
        role="presentation"
        aria-hidden="true"
        focusable="false"
        style={{
          height: '24px',
          width: '24px',
          display: 'block',
          fill: 'currentColor',
        }}
      >
        <path
          d="m0 12.5a.5.5 0 0 0 .5.5h21.79l-6.15 6.15a.5.5 0 1 0
            .71.71l7-7v-.01a.5.5 0 0 0 .14-.35.5.5 0 0 0
            -.14-.35v-.01l-7-7a .5.5 0 0 0 -.71.71l6.15
            6.15h-21.79a.5.5 0 0 0 -.5.5z"
          fillRule="evenodd"
        />
      </svg>
    );

    return (
      <FieldWrapper>
        <FieldLabel>
          <span>Dates</span>
        </FieldLabel>
        <CheckIOInputWrapper>
          <CheckIOInput
            calendarOpen={this.state.inCalendarOpen}
            id="checkIn"
            placeholder="Check In"
            value={inDate}
            onClick={() => this.inToggleCalendar()}
          />
          {arrow}
          <CheckIOInput
            calendarOpen={this.state.outCalendarOpen}
            id="checkOut"
            placeholder="Check Out"
            value={outDate}
            onClick={() => this.outToggleCalendar()}
          />
        </CheckIOInputWrapper>
        {inCalendar}
        {outCalendar}
      </FieldWrapper>
    );
  }
}

CheckIO.propTypes = {
  calendar: PropTypes.shape({
    currentCalendarDatesUnavailable: PropTypes.arrayOf(PropTypes.number).isRequired,
    firstDayPosition: PropTypes.number.isRequired,
    numberOfDaysInMonth: PropTypes.number.isRequired,
    currentMonth: PropTypes.number.isRequired,
    currentYear: PropTypes.number.isRequired,
    currentMonthName: PropTypes.string.isRequired,
    incrementCalendar: PropTypes.func.isRequired,
    decrementCalendar: PropTypes.func.isRequired,
    selectedCheckInDate: PropTypes.string.isRequired,
    selectedCheckOutDate: PropTypes.string.isRequired,
    selectCheckInDate: PropTypes.func.isRequired,
    selectCheckOutDate: PropTypes.func.isRequired,
  }).isRequired,
};

export default CheckIO;
