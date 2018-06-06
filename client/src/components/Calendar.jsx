import React from 'react';
import PropTypes from 'prop-types';
import Date from './Date';

const Calendar = (props) => {
  const firstBlankDates = Array.from(Array(props.firstDayPosition).keys())
    .map(day => <Date key={day} index={0} status="blank" />);

  const monthDates = Array.from(new Array(props.daysInMonth), (val, index) => index + 1)
    .map((day) => {
      if (props.daysUnav.indexOf(day) === -1) {
        return <Date key={day} index={day} status="available" />;
      }
      return <Date key={day} index={day} status="unavailable" />;
    });

  const wrapperStyle = {
    backgroundColor: 'lightblue',
    width: '20%',
    textAlign: 'center',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
  };

  return (
    <div style={wrapperStyle}>
      <button id="back" onClick={() => props.decrementCalendar()}>&lt;</button>
      {props.currentYearMonth}
      <button id="forward" onClick={() => props.incrementCalendar()}>&gt;</button>
      <div style={gridStyle}>
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      <div style={gridStyle} className="calendar">
        {firstBlankDates}
        {monthDates}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  daysUnav: PropTypes.arrayOf(PropTypes.number).isRequired,
  firstDayPosition: PropTypes.number.isRequired,
  daysInMonth: PropTypes.number.isRequired,
  currentYearMonth: PropTypes.string.isRequired,
  incrementCalendar: PropTypes.func.isRequired,
  decrementCalendar: PropTypes.func.isRequired,
};

export default Calendar;
