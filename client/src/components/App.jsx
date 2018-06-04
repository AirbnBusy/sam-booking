import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    const date = new Date();
    const year = date.getUTCFullYear().toString();
    const month = date.getUTCMonth() < 10 ? '0' + date.getUTCMonth().toString() : date.getUTCMonth().toString();
  
    this.state = {
      listingId: 1001,
      yearMonth: year + month,
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
          listingId: data.listingId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCalendar() {
    axios.get(`http://localhost:3001/api/listings/${this.state.listingId}/calendar/${this.state.yearMonth}`)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {this.state.listingId}
      </div>
    );
  }
}


export default App;
