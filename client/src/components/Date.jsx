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
    } = this.props;

    const availStyle = {
      color: 'black',
      cursor: 'pointer',
      backgroundColor: this.state.hover ? 'grey' : 'inherit',
    };

    const unavailStyle = {
      color: 'grey',
      textDecoration: 'line-through',
      cursor: 'pointer',
    };

    const blankStyle = {
      backgroundColor: 'grey',
    };

    const availDate = status === 'available' ? (
      <div
        style={availStyle}
        onMouseEnter={() => this.toggleHover()}
        onMouseLeave={() => this.toggleHover()}
        onClick={() => selectDate({
          day,
          month,
          year,
        })}
      >
        {day}
      </div>) : null;

    const unavailDate = status === 'unavailable' ?
      (<div style={unavailStyle}> {day} </div>) : null;

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
};

export default Date;
