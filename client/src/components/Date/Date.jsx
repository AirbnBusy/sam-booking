import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DateContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${props => props.hovered ? '#e4e7e7' : 'inherit'};
`;

const AvailableDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: black;
  cursor: pointer;
  font-weight: 600;
`;

const UnavailableDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: grey;
  text-decoration: line-through;
`;

class Date extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
    };
  }

  toggleHovered() {
    this.setState(prevState => ({
      hovered: !prevState.hovered,
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

    const availDate = status === 'available' ? (
      <AvailableDate
        id={`date_${day}`}
        onMouseEnter={() => this.toggleHovered()}
        onMouseLeave={() => this.toggleHovered()}
        onClick={() => {
          selectDate(`${month}/${day}/${year}`);
          toggleCalendar();
        }}
      >
        <span>{day}</span>
      </AvailableDate>) : null;

    const unavailDate = status === 'unavailable' ?
      (<UnavailableDate>
        <span>
          {day}
        </span>
      </UnavailableDate>) : null;

    const blankDate = status === 'blank' ? (<div />) : null;

    return (
      <DateContainer className="date" hovered={this.state.hovered}>
        {availDate}
        {unavailDate}
        {blankDate}
      </DateContainer>
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
