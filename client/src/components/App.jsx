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

      currentMonthName: '',
      firstDayPosition: 0,
      numberOfDaysInMonth: 0,
      currentCalendarDatesUnavailable: [],

      currentGuestSum: 0,
      allIncButtonsActive: true,
      currentAdultSum: 1,
      adultDecButtonActive: false,
      currentChildSum: 0,
      childDecButtonActive: false,
      currentInfantSum: 0,
      infantDecButtonActive: false,
    };

    this.incrementCalendar = this.incrementCalendar.bind(this);
    this.decrementCalendar = this.decrementCalendar.bind(this);
    this.incrementGuests = this.incrementGuests.bind(this);
    this.decrementGuests = this.decrementGuests.bind(this);
  }

  componentDidMount() {
    this.getListing();
    this.getCalendar();
    this.sumGuests();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentMonth !== this.state.currentMonth) {
      this.getCalendar();
    } else if (prevState.currentAdultSum !== this.state.currentAdultSum ||
              prevState.currentChildSum !== this.state.currentChildSum ||
              prevState.currentInfantSum !== this.state.currentInfantSum) {
      this.sumGuests();
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

  incrementGuests(guestType) {
    if (guestType === 'adult') {
      this.setState(prevState => ({
        currentAdultSum: prevState.currentAdultSum + 1,
        adultDecButtonActive: true,
      }));
    } else if (guestType === 'child') {
      this.setState(prevState => ({
        currentChildSum: prevState.currentChildSum + 1,
        childDecButtonActive: true,
      }));
    } else {
      this.setState(prevState => ({
        currentInfantSum: prevState.currentInfantSum + 1,
        infantDecButtonActive: true,
      }));
    }
  }

  decrementGuests(guestType) {
    if (guestType === 'adult') {
      this.setState(prevState => ({
        currentAdultSum: prevState.currentAdultSum > 1 ?
          prevState.currentAdultSum - 1 :
          prevState.currentAdultSum,
        adultDecButtonActive: prevState.currentAdultSum !== 2,
        allIncButtonsActive: true,
      }));
    } else if (guestType === 'child') {
      this.setState(prevState => ({
        currentChildSum: prevState.currentChildSum > 0 ?
          prevState.currentChildSum - 1 :
          prevState.currentChildSum,
        childDecButtonActive: prevState.currentChildSum !== 1,
        allIncButtonsActive: true,
      }));
    } else {
      this.setState(prevState => ({
        currentInfantSum: prevState.currentInfantSum > 0 ?
          prevState.currentInfantSum - 1 :
          prevState.currentInfantSum,
        infantDecButtonActive: prevState.currentInfantSum !== 1,
        allIncButtonsActive: true,
      }));
    }
  }

  sumGuests() {
    const guestSum = this.state.currentAdultSum
      + this.state.currentChildSum
      + this.state.currentInfantSum;
    if (guestSum === this.state.maxGuests) {
      this.setState({
        currentGuestSum: guestSum,
        allIncButtonsActive: false,
      });
    } else {
      this.setState({
        currentGuestSum: guestSum,
      });
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
    };

    const guests = {
      currentGuestSum: this.state.currentGuestSum,
      currentAdultSum: this.state.currentAdultSum,
      currentChildSum: this.state.currentChildSum,
      currentInfantSum: this.state.currentInfantSum,
      incrementGuests: this.incrementGuests,
      decrementGuests: this.decrementGuests,
      maxGuests: this.state.maxGuests,
      adultDecButtonActive: this.state.adultDecButtonActive,
      childDecButtonActive: this.state.childDecButtonActive,
      infantDecButtonActive: this.state.infantDecButtonActive,
      allIncButtonsActive: this.state.allIncButtonsActive,
    };

    return (
      <div style={deleteStyleLater}>
        <form style={containerStyle} className="app">
          <div style={Object.assign(priceStyle, infoStyle)}>
            ${this.state.baseRate} per night
          </div>
          <CheckIO calendar={calendar} />
          <Guests guests={guests} />
          <div>
            <button>Request to Book</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;