import React from 'react';
import PropTypes from 'prop-types';

class Date extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  toggleHover() {
    this.setState(prevState => ({
      hover: !prevState.hover,
    }));
  }

  render() {
    const {
      status,
      day,
      month,
      year,
      selectDate,
      toggleCalendar,
    } = this.props;

    const availStyle = {
      color: 'black',
      cursor: 'pointer',
      backgroundColor: this.state.hover ? '#e4e7e7' : 'inherit',
      fontWeight: 600,
      margin: 'none',
      verticalAlign: 'center',
    };

    const unavailStyle = {
      color: 'grey',
      textDecoration: 'line-through',
      cursor: 'pointer',
      margin: 'none',
      verticalAlign: 'center',
    };

    const blankStyle = {
      margin: 'none',
      verticalAlign: 'center',
    };

    const availDate = status === 'available' ? (
      <div
        id={`date_${day}`}
        style={availStyle}
        onMouseEnter={() => this.toggleHover()}
        onMouseLeave={() => this.toggleHover()}
        onClick={() => {
          selectDate(`${month}/${day}/${year}`);
          toggleCalendar();
        }}
      >
        <span>{day}</span>
      </div>) : null;

    const unavailDate = status === 'unavailable' ?
      (<div style={unavailStyle}><span>{day}</span></div>) : null;

    const blankDate = status === 'blank' ?
      (<div style={blankStyle} />) : null;

    return (
      <div className="date">
        {availDate}
        {unavailDate}
        {blankDate}
      </div>
    );
  }
}

Date.propTypes = {
  status: PropTypes.string.isRequired,
  day: PropTypes.number,
  month: PropTypes.number,
  year: PropTypes.number,
  selectDate: PropTypes.func,
  toggleCalendar: PropTypes.func,
};

export default Date;
