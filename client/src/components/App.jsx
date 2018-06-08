import React from 'react';
import axios from 'axios';
import Calendar from './Calendar';

class App extends React.Component {
  constructor(props) {
    super(props);

    const date = new Date();
    const year = date.getUTCFullYear().toString();
    const month = date.getUTCMonth() < 10 ?
      date.getUTCMonth().toString() :
      date.getUTCMonth().toString();

    this.state = {
      listingId: 1001,
      yearMonth: year + month,
      baseRate: 0,
      cleaningFee: 0,
      maxGuests: 0,
      firstDayPosition: 0,
      currentCalendarDatesUnavailable: [],
      currentMonthName: null,
      currentYear: 0,
      numberOfDaysInMonth: 0,
    };
  }

  componentDidMount() {
    this.getListing();
    this.getCalendar();
  }

  getListing() {
    axios.get(`http://localhost:3001/api/listings/${this.state.listingId}`)
      .then((res) => {
        const { data } = res;
        this.setState({
          listingId: data.id,
          baseRate: data.base_rate_per_night,
          cleaningFee: data.cleaning_fee,
          maxGuests: data.max_guests,
        });
      })
      .catch((err) => {
        console.log('ERROR GETTING LISTING DATA: ', err);
      });
  }

  getCalendar() {
    axios.get(`http://localhost:3001/api/listings/${this.state.listingId}/calendar/${this.state.yearMonth}`)
      .then((res) => {
        const { data } = res;
        this.setState({
          currentCalendarDatesUnavailable: data.days,
          firstDayPosition: data.firstDayOfMonth,
          numberOfDaysInMonth: data.numberOfDaysInMonth,
          currentMonthName: data.monthName,
          currentYear: data.year,
        });
      })
      .catch((err) => {
        console.log('ERROR GETTING CALENDAR DATA: ', err);
      });
  }

  render() {
    return (
      <div className="app">
        <Calendar
          daysUnav={this.state.currentCalendarDatesUnavailable}
          firstDayPosition={this.state.firstDayPosition}
          daysInMonth={this.state.numberOfDaysInMonth}
          currentYearMonth={`${this.state.currentMonthName} ${this.state.currentYear}`}
        />
      </div>
    );
  }
}

export default App;
