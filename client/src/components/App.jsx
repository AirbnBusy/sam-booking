import React from 'react';
import axios from 'axios';
import Calendar from './Calendar';

class App extends React.Component {
  constructor(props) {
    super(props);

    const date = new Date();
    const initYear = date.getUTCFullYear();
    const initMonth = date.getUTCMonth();

    this.state = {
      listingId: 1001,
      baseRate: 0,
      cleaningFee: 0,
      maxGuests: 0,

      currentYear: initYear,
      currentMonth: initMonth,

      currentMonthName: null,
      firstDayPosition: 0,
      numberOfDaysInMonth: 0,
      currentCalendarDatesUnavailable: [],
    };

    this.incrementCalendar = this.incrementCalendar.bind(this);
    this.decrementCalendar = this.decrementCalendar.bind(this);
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
    const yearString = this.state.currentYear.toString();
    const monthString = this.state.currentMonth < 10 ?
      `0${this.state.currentMonth.toString()}` :
      `${this.state.currentMonth.toString()}`;
    const yearMonthString = `${yearString}${monthString}`;

    axios.get(`http://localhost:3001/api/listings/${this.state.listingId}/calendar/${yearMonthString}`)
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

  incrementCalendar() {
    if (this.state.currentMonth < 11) {
      this.setState(prevState => ({ currentMonth: prevState.currentMonth + 1 }));
    } else {
      this.setState(prevState => ({
        currentMonth: 0,
        currentYear: prevState.currentYear + 1,
      }));
    }
  }

  decrementCalendar() {
    if (this.state.currentMonth > 0) {
      this.setState(prevState => ({ currentMonth: prevState.currentMonth - 1 }));
    } else {
      this.setState(prevState => ({
        currentMonth: 11,
        currentYear: prevState.currentYear - 1,
      }));
    }
  }

  render() {
    return (
      <div className="app">
        <Calendar
          daysUnav={this.state.currentCalendarDatesUnavailable}
          firstDayPosition={this.state.firstDayPosition}
          daysInMonth={this.state.numberOfDaysInMonth}
          currentYearMonth={`${this.state.currentMonthName} ${this.state.currentYear}`}
          incrementCalendar={this.incrementCalendar}
          decrementCalendar={this.decrementCalendar}
        />
      </div>
    );
  }
}

export default App;
