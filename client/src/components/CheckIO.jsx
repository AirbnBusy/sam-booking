import React from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar';

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
      if (this.state.inCalendarOpen && !this.props.calendar.selectedCheckOutDate) {
        this.setState(prevState => ({
          inCalendarOpen: !prevState.inCalendarOpen,
          outCalendarOpen: true,
        }));
      } else {
        this.setState(prevState => ({
          inCalendarOpen: !prevState.inCalendarOpen,
          outCalendarOpen: false,
        }));
      }
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

    const infoStyle = {
      position: 'relative',
      textAlign: 'left',
      width: '90%',
      marginBottom: '.75em',
    };

    const inOutStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid #e4e4e4',
    };

    const inInputStyle = {
      ':focus': {
        userSelect: 'none',
      },
      height: '100%',
      width: '40%',
      fontFamily: 'Roboto',
      border: 'none',
      margin: '8px 10px',
      fontSize: '17px',
      outline: 'none',
      color: 'transparent',
      textShadow: this.state.inCalendarOpen ? '0 0 0 #118488' : '0 0 0 #757575',
      backgroundColor: this.state.inCalendarOpen ? '#9CEDE6' : 'inherit',
      userSelect: 'none',
      borderRadius: '3px',
      padding: '2px',
    };

    const outInputStyle = {
      height: '100%',
      width: '40%',
      fontFamily: 'Roboto',
      border: 'none',
      margin: '8px 10px',
      fontSize: '17px',
      outline: 'none',
      color: 'transparent',
      textShadow: this.state.outCalendarOpen ? '0 0 0 #118488' : '0 0 0 #757575',
      backgroundColor: this.state.outCalendarOpen ? '#9CEDE6' : 'inherit',
      userSelect: 'none',
      borderRadius: '3px',
      padding: '2px',
    };

    const labelStyle = {
      marginBottom: '5px',
      fontSize: '12px',
      fontWeight: 600,
    };

    const arrowStyle = {
      height: '24px',
      width: '24px',
      display: 'block',
      fill: 'currentColor',
    };

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

    return (
      <div style={infoStyle}>
        <div style={labelStyle}>
          <span>Dates</span>
        </div>
        <div style={inOutStyle}>
          <input
            style={inInputStyle}
            id="checkIn"
            placeholder="Check In"
            value={inDate}
            onClick={() => this.inToggleCalendar()}
          />
          <svg
            viewBox="0 0 24 24"
            role="presentation"
            aria-hidden="true"
            focusable="false"
            style={arrowStyle}
          >
            <path
              d="m0 12.5a.5.5 0 0 0 .5.5h21.79l-6.15 6.15a.5.5 0 1 0
                .71.71l7-7v-.01a.5.5 0 0 0 .14-.35.5.5 0 0 0
                -.14-.35v-.01l-7-7a .5.5 0 0 0 -.71.71l6.15
                6.15h-21.79a.5.5 0 0 0 -.5.5z"
              fillRule="evenodd"
            />
          </svg>
          <input
            style={outInputStyle}
            id="checkOut"
            placeholder="Check Out"
            value={outDate}
            onClick={() => this.outToggleCalendar()}
          />
        </div>
        {inCalendar}
        {outCalendar}
      </div>
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
