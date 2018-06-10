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

    const wrapperStyle = {
      height: '100%',
      width: '100%',
      backgroundColor: this.state.hover ? '#e4e7e7' : 'inherit',
    };

    const availStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      color: 'black',
      cursor: 'pointer',
      fontWeight: 600,
    };

    const unavailStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      color: 'grey',
      textDecoration: 'line-through',
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
      (<div />) : null;

    return (
      <div className="date" style={wrapperStyle}>
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
