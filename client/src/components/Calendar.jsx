import React from 'react';
import Date from './Date.jsx';

const Calendar = (props) => {
  const style = {

  };

  return (
    <div style={style}>
      {
        Array.from(Array(props.firstDayPosition).keys()).map(day => <Date key={day} index={0} status="blank" />)
      }
      {
        Array.from(Array(props.daysInMonth).keys()).map((day) => {
          if (props.daysUnav.indexOf(day) === -1) {
            return <Date key={day} index={day} status="available" />;
          }
          return <Date key={day} index={day} status="unavailable" />;
        })
      }
    </div>
  );
};

export default Calendar;
