import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { withRouter } from "react-router-dom";
import { Range } from "rc-slider";
import { Popover } from "../popover";
import FlightItem from "./flight-item";
import FetchFlights from "./FetchFlights";

import "react-datepicker/dist/react-datepicker.css";
import "rc-slider/assets/index.css";
import "./result.css";

class Slider extends Component {
  state = {
    min: 0,
    max: 1500,
    currentMin: 200,
    currentMax: 500
  };

  changeSlider = value => {
    const currentMin = value[0];
    const currentMax = value[1];
    this.setState({ currentMax, currentMin });
  };

  render() {
    return (
      <div>
        <Range
          defaultValue={[200, 500]}
          min={this.state.min}
          max={this.state.max}
          onChange={this.changeSlider}
          step={5}
        />
        <div className="price-amounts">
          <input
            type="number"
            readOnly="readOnly"
            placeholder={this.state.currentMin + " DKK"}
          />
          <input
            type="number"
            readOnly="readOnly"
            placeholder={this.state.currentMax + " DKK"}
          />
        </div>
      </div>
    );
  }
}

class Result extends Component {
  state = {
    departure: this.props.data.departure,
    destination: this.props.data.destination,
    depart: this.props.data.depart,
    passengers: this.props.data.passengers,
    adults: this.props.data.adults,
    children: this.props.data.children,
    infant: this.props.data.infant,
    popoverPassengers: false,
    flightData: this.props.data.flightData
  };

  fetchFlights = async () => {
    const url = FetchFlights.directions(
      this.state.departure,
      this.state.destination,
      this.state.depart
    );
    const flights = await FetchFlights.fetchData(url);
    this.setState({ flightData: flights });
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

  handleClick = e => {
    e.preventDefault();
    this.props.startSearch(this.state);
    this.fetchFlights();
    if (this.state.destination.length > 1 && this.state.departure.length > 1) {
      this.props.history.push(
        `${process.env.PUBLIC_URL}/flight/${this.state.departure}`
      );
    }
  };
  flightParser = () => {
    if (
      typeof this.state.flightData === "undefined" ||
      this.state.flightData === null
    ) {
      return <h5>Please search again</h5>;
    } else {
      if (this.state.flightData.length > 0) {
        return this.state.flightData.map(e => <FlightItem key={e.id} e={e} />);
      }
      return <h5>No flights available</h5>;
    }
  };

  render() {
    console.log(this.state.flightData);
    const textInputPassengers = `${this.state.passengers} Traveller`;
    return (
      <React.Fragment>
        <div className="page-title">
          Flights - <span>one way</span>
        </div>
        <div className="result-block grid">
          <div className="result-block__left">
            <div className="search-result">
              <span>results found.</span>
            </div>
            <div className="side-block">
              <div className="side-block__search grid">
                <div>
                  <label>From</label>
                  <input
                    type="text"
                    value={this.state.departure}
                    placeholder="Select destination"
                    onChange={this.departureChange}
                  />
                </div>
                <div>
                  <label>To</label>
                  <input
                    type="text"
                    value={this.state.destination}
                    placeholder="Select destination"
                    onChange={this.destinationChange}
                  />
                </div>
                <div>
                  <label>Departure</label>
                  <DatePicker
                    selected={this.state.depart}
                    onChange={this.departDateChange}
                  />
                </div>
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
                <div className="side-block__button">
                  <button onClick={this.handleClick}>Search</button>
                </div>
              </div>
            </div>
            <br/>
            <div className="side-stops">
              <div className="side-title">Number of stops</div>
              <div className="radio-area">
                <label className="radio-label">
                  <input name="stops" type="radio" />
                  <span className="checkbox-span">
                    <span />
                  </span>
                  All
                </label>
              </div>
              <div className="radio-area">
                <label className="radio-label">
                  <input name="stops" type="radio" />
                  <span className="checkbox-span">
                    <span />
                  </span>
                  Direct
                </label>
              </div>
              <div className="radio-area">
                <label className="radio-label">
                  <input name="stops" type="radio" />
                  <span className="checkbox-span">
                    <span />
                  </span>
                  1 Stop
                </label>
              </div>
              <div className="radio-area">
                <label className="radio-label">
                  <input name="stops" type="radio" />
                  <span className="checkbox-span">
                    <span />
                  </span>
                  2+ Stops
                </label>
              </div>
            </div>
            <div className="slider-price">
              <div className="slider-title">Price</div>
              <Slider />
            </div>
          </div>
          <div className="result-block__right">
            <div className="result-catalog__filter">
              <label>Sort results by: </label>
              <div className="search-select">
                <div className="price-select">Price</div>
              </div>
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

export default withRouter(Result);
