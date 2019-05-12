import React from "react";
import lufthansaLogo from "./img/lufthansaLogo.png";
import ryanAirLogo from "./img/ryanairLogo.png";
import sasLogo from "./img/sasLogo.png";
import iagLogo from "./img/iagLogo.png";
import errorLogo from "./img/errorLogo.png";
import "./flightitem.css";

// Convert a time in hh:mm format to minutes
function timeToMins(time) {
  var b = time.split(":");
  return b[0] * 60 + +b[1];
}

// Convert minutes to a time in format hh:mm
// Returned value is in range 00  to 24 hrs
function timeFromMins(mins) {
  function z(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var h = ((mins / 60) | 0) % 24;
  var m = mins % 60;
  return z(h) + ":" + z(m);
}

// Add two times in hh:mm format
function addTimes(t0, t1) {
  return timeFromMins(timeToMins(t0) + timeToMins(t1));
}

const FlightItem = ({ e }) => {
  var logo = errorLogo;

  if (e.airline === "Ryanair Ltd") {
    logo = ryanAirLogo;
  }
  if (e.airline === "International Airlines Group") {
    logo = iagLogo;
  }
  if (e.airline === "Scandinavian Airline") {
    logo = sasLogo;
  }
  if (e.airline === "Lufthansa Group") {
    logo = lufthansaLogo;
  }

  return (
    <div className="flight-item grid">
      <div className="left-block__item">
        <div className="head-item">
          <div className="way-item">departure</div>
          <div className="logo-company">
            <img src={logo} alt="" width="90" height="90" />
          </div>
        </div>
      </div>
      <div className="center-block__item">
        <div className="flying-info">
          {e.departureDate} From: {e.startDestination} - To: {e.endDestination}
        </div>
        <div className="flight-line">
          <div className="flight-line__departure">
            <b>Departure</b>
            <span>{e.departureTime}</span>
          </div>
          <div className="divider" />
          <div className="flight-line__arrival">
            <b>Arrival</b>
            <span>{addTimes(e.departureTime, e.duration)}</span>
          </div>
          <div className="divider" />
          <div className="flight-line__time">
            <b>Time</b>
            <span>{e.duration}</span>
          </div>
          <div className="divider" />
          <div className="flight-line__time">
            <b>Seats</b>
            <span>{e.numberOfSeats}</span>
          </div>
        </div>
      </div>
      <div className="right-block__item">
        <div className="item-price">{e.price},-</div>
        <button className="select-now">select now</button>
        <br/>
        <button className="select-wish">wishlist</button>
      </div>
    </div>
  );
};

export default FlightItem;
