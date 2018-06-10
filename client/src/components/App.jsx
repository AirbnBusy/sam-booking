import React from 'react';
import axios from 'axios';
import CheckIO from './CheckIO';
import Guests from './Guests';
import Summary from './Summary';

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
      baseRateXNights: 0,
      occupancyTaxes: 0,
      serviceFee: 0,
      totalCost: 0,

      currentYear: initYear,
      currentMonth: initMonth,

      currentMonthName: '',
      firstDayPosition: 0,
      numberOfDaysInMonth: 0,
      currentCalendarDatesUnavailable: [],

      selectedCheckInDate: '',
      selectedCheckOutDate: '',
      numberOfNightsSelected: 0,

      currentGuestSum: 0,
      currentAdultSum: 1,
      currentChildSum: 0,
      currentInfantSum: 0,

      allIncButtonsActive: true,
      adultDecButtonActive: false,
      childDecButtonActive: false,
      infantDecButtonActive: false,
    };

    this.incrementCalendar = this.incrementCalendar.bind(this);
    this.decrementCalendar = this.decrementCalendar.bind(this);
    this.selectCheckInDate = this.selectCheckInDate.bind(this);
    this.selectCheckOutDate = this.selectCheckOutDate.bind(this);
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
    } else if (prevState.selectedCheckInDate !== this.state.selectedCheckInDate ||
              prevState.selectedCheckOutDate !== this.state.selectedCheckOutDate) {
      this.sumDates();
    } else if (this.state.numberOfNightsSelected
              && this.state.baseRate
              && prevState.numberOfNightsSelected !== this.state.numberOfNightsSelected) {
      this.setVariableCosts();
    }
  }

  setVariableCosts() {
    const baseRateXNights = this.state.baseRate * this.state.numberOfNightsSelected;
    const serviceFee = Math.ceil(.10 * (baseRateXNights + this.state.cleaningFee));
    const occupancyTaxes = Math.ceil(.11 * (baseRateXNights + this.state.cleaningFee));
    const totalCost = baseRateXNights + serviceFee + occupancyTaxes;
    this.setState({
      baseRateXNights,
      occupancyTaxes,
      serviceFee,
      totalCost,
    });
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

  selectCheckInDate(selectedDate) {
    const inDate = new Date(selectedDate);
    const dateStr = inDate.toLocaleDateString();
    this.setState({
      selectedCheckInDate: dateStr,
    });
  }

  selectCheckOutDate(selectedDate) {
    const outDate = new Date(selectedDate);
    const dateStr = outDate.toLocaleDateString();
    this.setState({
      selectedCheckOutDate: dateStr,
    });
  }

  sumDates() {
    const inDate = new Date(this.state.selectedCheckInDate);
    const outDate = new Date(this.state.selectedCheckOutDate);
    if (inDate && outDate) {
      const numberOfNightsSelected = Math.abs(outDate - inDate) / 86400000;
      this.setState({
        numberOfNightsSelected,
      });
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
      border: '1px solid #e4e4e4',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '25%',
      padding: '.5em',
      fontFamily: 'Roboto',
      color: '#484848',
    };

    const infoStyle = {
      textAlign: 'left',
      width: '90%',
      paddingTop: '.75em',
      paddingBottom: '1em',
      marginBottom: '.5em',
    };

    const priceDivStyle = {
      borderBottom: '1px solid #e4e4e4',
    };

    const bookButtonStyle = {
      backgroundColor: '#FF5A5F',
      color: '#ffffff',
      fontSize: '16px',
      width: '100%',
      height: '50px',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '5px',
      fontWeight: 600,
    };

    const priceSpanStyle = {
      fontSize: '22px',
      fontWeight: 800,
    };

    const perNightSpanStyle = {
      margin: '3px',
      fontSize: '12px',
      fontWeight: 600,
    };

    const calendar = {
      currentCalendarDatesUnavailable: this.state.currentCalendarDatesUnavailable,
      firstDayPosition: this.state.firstDayPosition,
      numberOfDaysInMonth: this.state.numberOfDaysInMonth,
      currentMonthName: this.state.currentMonthName,
      currentMonth: this.state.currentMonth,
      currentYear: this.state.currentYear,
      incrementCalendar: this.incrementCalendar,
      decrementCalendar: this.decrementCalendar,
      selectedCheckInDate: this.state.selectedCheckInDate,
      selectedCheckOutDate: this.state.selectedCheckOutDate,
      selectCheckInDate: this.selectCheckInDate,
      selectCheckOutDate: this.selectCheckOutDate,
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

    const summary = {
      cleaningFee: this.state.cleaningFee,
      baseRate: this.state.baseRate,
      numberOfNightsSelected: this.state.numberOfNightsSelected,
      baseRateXNights: this.state.baseRateXNights,
      occupancyTaxes: this.state.occupancyTaxes,
      serviceFee: this.state.serviceFee,
      totalCost: this.state.totalCost,
    };

    const summaryComponent = (
      this.state.currentGuestSum
      && this.state.selectedCheckInDate
      && this.state.selectedCheckOutDate)
      ? (<Summary summary={summary} />)
      : null;

    return (
      <div style={deleteStyleLater}>
        <form style={containerStyle} className="app">
          <div style={Object.assign(priceDivStyle, infoStyle)}>
            <span style={priceSpanStyle}>{`$${this.state.baseRate}`}</span>
            <span style={perNightSpanStyle}>per night</span>
          </div>
          <CheckIO calendar={calendar} />
          <Guests guests={guests} />
          {summaryComponent}
          <div style={infoStyle}>
            <button style={bookButtonStyle}>Request to Book</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
