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
      textAlign: 'left',
      width: '80%',
      paddingTop: '.75em',
      paddingBottom: '1em',
      marginBottom: '.5em',
    };

    const inOutStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      position: 'relative',
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
        Dates
        <div style={inOutStyle}>
          <div>
            <input
              id="checkIn"
              placeholder="Check In"
              value={inDate}
              onClick={() => this.toggleCalendar('in')}
            />
            {inCalendar}
          </div>
          -&gt;
          <div>
            <input
              id="checkOut"
              placeholder="Check Out"
              value={outDate}
              onClick={() => this.toggleCalendar('out')}
            />
            {outCalendar}
          </div>
        </div>
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
