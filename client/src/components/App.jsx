import React from 'react';
import axios from 'axios';
import CheckIO from './CheckIO';
import Guests from './Guests';

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

      currentGuestSum: 1,
      currentAdultSum: 1,
      currentChildSum: 0,
      currentInfantSum: 0,
    };

    this.incrementCalendar = this.incrementCalendar.bind(this);
    this.decrementCalendar = this.decrementCalendar.bind(this);
  }

  componentDidMount() {
    this.getListing();
    this.getCalendar();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentMonth !== this.state.currentMonth) {
      this.getCalendar();
    }
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
    const deleteStyleLater = {
      display: 'flex',
      justifyContent: 'center',
    };

    const containerStyle = {
      border: '1px solid black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '25%',
      padding: '.5em',
    };

    const infoStyle = {
      textAlign: 'left',
      width: '80%',
      paddingTop: '.75em',
      paddingBottom: '1em',
      marginBottom: '.5em',
    };

    const priceStyle = {
      borderBottom: '1px solid grey',
    };

    const calendar = {
      currentCalendarDatesUnavailable: this.state.currentCalendarDatesUnavailable,
      firstDayPosition: this.state.firstDayPosition,
      numberOfDaysInMonth: this.state.numberOfDaysInMonth,
      currentMonthName: this.state.currentMonthName,
      currentYear: this.state.currentYear,
      incrementCalendar: this.incrementCalendar,
      decrementCalendar: this.decrementCalendar,
    }

    return (
      <div style={deleteStyleLater}>
        <form style={containerStyle} className="app">
          <div style={Object.assign(priceStyle, infoStyle)}>
            ${this.state.baseRate} per night
          </div>
          <CheckIO calendar={calendar} />
          <Guests currentGuestSum={this.state.currentGuestSum} />
          <div>
            <button>Request to Book</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;