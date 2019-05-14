import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { withRouter } from "react-router-dom";
import { Popover } from "../popover";
import FlightItemWish from "../result/flight-item/flightItemWishes";
import FetchWishes from "../fetch/UserFetch";
import "react-datepicker/dist/react-datepicker.css";
import "rc-slider/assets/index.css";
import "./user.css";


class User extends Component {
  state = {
    flightData: this.props.data.flightData
  };

  fetchFlights = async () => {
    let wishes = await FetchWishes.fetchData();
    this.setState({ flightData: wishes });
    console.log(this.state.flightData);
  };

  departureChange = e => {
    const departureInput = e.target.value;
    this.setState({ departure: departureInput });
  };

  destinationChange = e => {
    const destinationInput = e.target.value;
    this.setState({ destination: destinationInput });
  };

  departDateChange = date => {
    this.setState({ depart: date });
  };

  passengersChange = e => {
    const passengersInput = e.target.value;
    this.setState({ passengers: passengersInput });
  };

  popoverChange = (adults, children, infant) => {
    this.setState({
      adults,
      children,
      infant,
      passengers: adults + children + infant
    });
  };

  popoverClick = () => {
    this.setState(prevState => ({
      popoverPassengers: !prevState.popoverPassengers
    }));
  };

  componentDidMount() {
    this.update();
  };

  update = () => {
    console.log("update");
    this.fetchFlights();
  }

  flightParser = () => {
    if (
      typeof this.state.flightData === "undefined" ||
      this.state.flightData === null
    ) {
      return <h5>Please search again</h5>;
    } else {
      if (this.state.flightData.length > 0) {
        return this.state.flightData.map(e => <FlightItemWish key={e.id} e={e} update={this.update} />);
      }
      return <h5>No flights available</h5>;
    }
  };

  sortFlights = evt => {
    if (evt.target.value === "price") {
      let flightsSort = this.state.flightData.sort((a, b) =>
        Number(a.price) > Number(b.price) ? 1 : -1
      );
      this.setState({ flightData: flightsSort });
    }
    if (evt.target.value === "seats") {
      let flightsSort = this.state.flightData.sort((a, b) =>
        Number(a.numberOfSeats) > Number(b.numberOfSeats) ? 1 : -1
      );
      this.setState({ flightData: flightsSort });
    }
    if (evt.target.value === "airline") {
      let flightsSort = this.state.flightData.sort((a, b) =>
        a.airline > b.airline ? 1 : -1
      );
      this.setState({ flightData: flightsSort });
    }
    if (evt.target.value === "departure_time") {
      //let flightDepartureTimes = this.state.flightData.map(a => a.departureTime);
      //console.log("departureTimes", flightDepartureTimes);
      let flightsSort = this.sortTimes(this.state.flightData, "departure_time");
      this.setState({ flightData: flightsSort });
    }
    if (evt.target.value === "duration") {
      //let duration = this.state.flightData.map(a => a.duration);
      //console.log("duration", duration);
      let flightsSort = this.sortTimes(this.state.flightData, "duration");
      this.setState({ flightData: flightsSort });
    }
  };
  sortTimes(array, sortby) {
    if (sortby === "departure_time") {
      return array.sort(function (a, b) {
        if (parseInt(a.departureTime.split(":")[0]) - parseInt(b.departureTime.split(":")[0]) === 0) {
          return parseInt(a.departureTime.split(":")[1]) - parseInt(b.departureTime.split(":")[1]);
        } else {
          return parseInt(a.departureTime.split(":")[0]) - parseInt(b.departureTime.split(":")[0]);
        }
      })
    } else if (sortby === "duration") {
      return array.sort(function (a, b) {
        if (parseInt(a.duration.split(":")[0]) - parseInt(b.duration.split(":")[0]) === 0) {
          return parseInt(a.duration.split(":")[1]) - parseInt(b.duration.split(":")[1]);
        } else {
          return parseInt(a.duration.split(":")[0]) - parseInt(b.duration.split(":")[0]);
        }
      })
    }

  }
  onChange = evt => {
    this.setState({ [evt.target.id]: evt.target.value });
    this.sortFlights(evt);
  };

  render() {
    const textInputPassengers = `${this.state.passengers} Traveller`;
    return (
      <React.Fragment>
        <div className="page-title">
          Your Wishlist:
        </div>
        <div className="result-block grid">
          <div className="result-block__left">
            <div className="search-result">
              <span>results found.</span>
            </div>
            <div className="side-block">
              <div className="side-block__search2 grid">
                <div>
                  <label>From</label>
                  <input
                    type="text"
                    value={this.state.departure}
                    placeholder="Select destination"
                    onChange={this.departureChange}
                  />
                </div>
                <br />
                <div>
                  <label>To </label>
                  <input
                    type="text"
                    value={this.state.destination}
                    placeholder="Select destination"
                    onChange={this.destinationChange}
                  />
                </div>
                <br />
                <div>
                  <label>Departure</label>
                  <DatePicker
                    selected={this.state.depart}
                    onChange={this.departDateChange}
                  />
                </div>
                <br />
                <div>
                  <label>Passengers</label>
                  <input
                    type="text"
                    onChange={this.passengersChange}
                    onClick={this.popoverClick}
                    value={textInputPassengers}
                    readOnly="readOnly"
                  />
                  {this.state.popoverPassengers ? (
                    <Popover popoverChange={this.popoverChange} />
                  ) : null}
                </div>
                <br />
                <div className="side-block__button">
                  <button onClick={this.handleClick}>Search</button>
                </div>
              </div>
            </div>
            <br />
          </div>
          <div className="result-block__right">
            <div className="result-catalog__filter">
              <label>Sort Your wishlist by: </label>
              <select className="price-select" id="sortData" onChange={this.onChange}>
                <option value="">Please Select an option</option>
                <option value="price">By Price</option>
                <option value="seats">By Seats</option>
                <option value="airline">By Airline</option>
                <option value="departure_time">By Departure time</option>
                <option value="duration">By Duration</option>
              </select>
            </div>
            <div className="result-catalog">
              <this.flightParser />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(User);
