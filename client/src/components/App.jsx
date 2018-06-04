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
      currentCalendarDatesUnavailable: [],
      currentMonth: null,
      currentYear: null,
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
        console.log('DATA: ', data);
        this.setState({
          currentCalendarDatesUnavailable: data.days,
          currentMonth: data.month,
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
        <Calendar daysUnav={this.state.currentCalendarDatesUnavailable}/>
        {this.state.listingId}
      </div>
    );
  }
}


export default App;
