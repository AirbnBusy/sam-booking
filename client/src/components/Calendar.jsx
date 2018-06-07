import React from 'react';
import PropTypes from 'prop-types';
import Date from './Date';

const Calendar = ({
  firstDayPosition,
  daysUnav,
  daysInMonth,
  currentYearMonth,
  incrementCalendar,
  decrementCalendar,
}) => {
  const firstBlankDates = Array.from(Array(firstDayPosition).keys())
    .map(day => <Date key={day} index={0} status="blank" />);

  const monthDates = Array.from(new Array(daysInMonth), (val, index) => index + 1)
    .map((day) => {
      if (daysUnav.indexOf(day) === -1) {
        return <Date key={day} index={day} status="available" />;
      }
      return <Date key={day} index={day} status="unavailable" />;
    });

  const wrapperStyle = {
    backgroundColor: 'lightblue',
    width: '55%',
    textAlign: 'center',
    zIndex: '1',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
  };

  return (
    <div style={wrapperStyle}>
      <button id="back" type="button" onClick={() => decrementCalendar()}>&lt;</button>
      {currentYearMonth}
      <button id="forward" type="button" onClick={() => incrementCalendar()}>&gt;</button>
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
