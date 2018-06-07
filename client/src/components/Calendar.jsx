import React from 'react';
import PropTypes from 'prop-types';
import Date from './Date.jsx';

const Calendar = (props) => {
  const firstBlankDates = Array.from(Array(props.firstDayPosition).keys())
    .map(day => <Date key={day} index={0} status="blank" />);

  const monthDates = Array.from(Array(props.daysInMonth).keys())
    .map((day) => {
      if (props.daysUnav.indexOf(day) === -1) {
        return <Date key={day} index={day} status="available" />;
      }
      return <Date key={day} index={day} status="unavailable" />;
    });

  const style = {

  };

  return (
    <div style={style}>
      {props.currentYearMonth}
      {firstBlankDates}
      {monthDates}
    </div>
  );
};

Calendar.propTypes = {
  daysUnav: PropTypes.arrayOf(PropTypes.number).isRequired,
  firstDayPosition: PropTypes.number.isRequired,
  daysInMonth: PropTypes.number.isRequired,
  currentYearMonth: PropTypes.string.isRequired,
};

export default Calendar;
