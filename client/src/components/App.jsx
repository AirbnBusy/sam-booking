import React from 'react';
import axios from 'axios';
import Calendar from './Calendar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    const date = new Date();
    const year = date.getUTCFullYear().toString();
    const month = date.getUTCMonth() < 10 ? date.getUTCMonth().toString() : date.getUTCMonth().toString();
  
    this.state = {
      listingId: 1001,
      yearMonth: year + month,
      baseRate: null,
      cleaningFee: null,
      maxGuests: null,
      firstDayPosition: null,
      currentCalendarDatesUnavailable: [],
      currentMonthName: null,
      currentYear: null,
      numberOfDaysInMonth: null,
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
          firstDayPosition: data.firstDayOfMonth - 1,
          numberOfDaysInMonth: data.numberOfDaysInMonth,
          currentMonth: data.monthName,
          currentYear: data.year,
        });
      })
      .catch((err) => {
        console.log('ERROR GETTING CALENDAR DATA: ', err);
      });
  }

  render() {
    return (
      <div>
        <Calendar 
          daysUnav={this.state.currentCalendarDatesUnavailable}
          firstDayPosition={this.state.firstDayPosition} 
          daysInMonth={this.state.numberOfDaysInMonth}
          currentMonthName={this.state.currentMonthName}
          currentYear={this.state.currentYear} 
        />
      </div>
    );
  }
}


export default App;
