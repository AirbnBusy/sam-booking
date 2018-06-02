import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      listingId: 1001,
    };
  }

  componentDidMount() {
    this.getListing();
  }

  getListing() {
    axios.get(`http://localhost:3001/api/listings/${this.state.listingId}`)
      .then((res) => {
        console.log(res);
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
