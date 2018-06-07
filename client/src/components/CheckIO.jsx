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
  }

  handleClick(calendarType) {
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
    const infoStyle = {
      textAlign: 'left',
      width: '80%',
      paddingTop: '.75em',
      paddingBottom: '1em',
      marginBottom: '.5em',
    };

    const inCalendar = this.state.inCalendarOpen ? (<Calendar
      daysUnav={this.props.calendar.currentCalendarDatesUnavailable}
      firstDayPosition={this.props.calendar.firstDayPosition}
      daysInMonth={this.props.calendar.numberOfDaysInMonth}
      currentYearMonth={`${this.props.calendar.currentMonthName} ${this.props.calendar.currentYear}`}
      incrementCalendar={this.props.calendar.incrementCalendar}
      decrementCalendar={this.props.calendar.decrementCalendar}
    />) : null;

    const outCalendar = this.state.outCalendarOpen ? (<Calendar
      daysUnav={this.props.calendar.currentCalendarDatesUnavailable}
      firstDayPosition={this.props.calendar.firstDayPosition}
      daysInMonth={this.props.calendar.numberOfDaysInMonth}
      currentYearMonth={`${this.props.calendar.currentMonthName} ${this.props.calendar.currentYear}`}
      incrementCalendar={this.props.calendar.incrementCalendar}
      decrementCalendar={this.props.calendar.decrementCalendar}
    />) : null;

    return (
      <div style={infoStyle}>
        <label>
          Dates
        </label>
        <div>
          <input placeholder="Check In" onClick={() => this.handleClick('in')} />
          -&gt;
          <input placeholder="Check Out" onClick={() => this.handleClick('out')} />
          {inCalendar}
          {outCalendar}
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
    currentYear: PropTypes.number.isRequired,
    currentMonthName: PropTypes.string.isRequired,
    incrementCalendar: PropTypes.func.isRequired,
    decrementCalendar: PropTypes.func.isRequired,
  }),
};

export default CheckIO;
